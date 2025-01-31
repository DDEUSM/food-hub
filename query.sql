
/* QUERY PARA VERIFICAR SE HÁ QUANTIDADE DE INGREDIENTS O SUFICIENTE PARA AS PIZZAS */

WITH pizza_ingredients AS (
	SELECT 
		pizza_requirements.pizza_id,
		pizza_requirements.resource_id,		
		SUM(
			CASE
				WHEN pizza_requirements.pizza_id = '01JG2X920N1FPJZX04WKVAFV7Q' THEN 2.5 * pizza_requirements.quantity_required
				ELSE 0.0 * pizza_requirements.quantity_required
			END
		) AS resources_required
	FROM pizza_requirements
	GROUP BY pizza_requirements.pizza_id, pizza_requirements.resource_id
) 
SELECT 
	resources.id,
	resources.quantity - SUM(resources_required)
FROM pizza_ingredients 
JOIN resources ON resources.id = pizza_ingredients.resource_id
GROUP BY resources.id;


WITH pizza_ingredients AS (
	SELECT 
		pizza_id,
		resource_id,
		SUM(
			CASE
				${Prisma.join(pizzaCases, ' ')}
				ELSE 0.0
			END
		) AS quantity_required
	FROM pizza_requirements
	WHERE pizza_id IN (${Prisma.join(pizzaIds)})
	GROUP BY pizza_id, resource_id
)
SELECT 
	resources.id,
	resources.quantity - COALESCE(SUM(pizza_ingredients.quantity_required), 0) AS resources_diff
FROM pizza_ingredients 
JOIN resources ON pizza_ingredients.resource_id = resources.id
GROUP BY resources.id
HAVING resources.quantity - COALESCE(SUM(pizza_ingredients.quantity_required), 0) < 0;



BEGIN;

-- Common Table Expression (CTE) para calcular os recursos necessários
WITH pizza_ingredients AS (
    SELECT 
        pizza_requirements.pizza_id,
        pizza_requirements.resource_id,		
        SUM(
            CASE
                WHEN pizza_requirements.pizza_id = '01JG2X920N1FPJZX04WKVAFV7Q' THEN 2.5 * pizza_requirements.quantity_required
                ELSE 0.0
            END
        ) AS resources_required
    FROM pizza_requirements
    WHERE pizza_requirements.pizza_id IN ('01JG2X920N1FPJZX04WKVAFV7Q')
    GROUP BY pizza_requirements.pizza_id, pizza_requirements.resource_id
),

-- Subconsulta para calcular a quantidade total por recurso
resource_requirements AS (
    SELECT 
        resources.id AS resource_id,
        SUM(pizza_ingredients.resources_required) AS quantity
    FROM pizza_ingredients 
    JOIN resources ON resources.id = pizza_ingredients.resource_id
    GROUP BY resources.id
)

-- Atualiza os recursos com base nos requisitos calculados
UPDATE resources
SET quantity = resources.quantity - resource_requirements.quantity
FROM resource_requirements
WHERE resources.id = resource_requirements.resource_id;

-- Verifica se algum recurso ficou com quantidade negativa
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM resources WHERE quantity < 0) THEN 
        ROLLBACK;
        RAISE EXCEPTION 'Insufficient Resources for this Order!';
    END IF;
END$$;

COMMIT;
