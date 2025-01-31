
export enum PizzaSizes {
    tiny = 1,
    middle,
    medium,
    big
}

export enum SizeQuoeficient {
    tiny = 0.3,
    middle = 0.5,
    medium = 0.8,
    big = 1.0
}

export const SizeQuoeficientMap = {
    [PizzaSizes.tiny]: SizeQuoeficient.tiny,
    [PizzaSizes.middle]: SizeQuoeficient.middle,
    [PizzaSizes.medium]: SizeQuoeficient.medium,
    [PizzaSizes.big]: SizeQuoeficient.big
}