describe("Testing pizzas routes", () => {

    test("1º test route", async () => {

        const res = await fetch(
            'http://localhost:1445/pizzas',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        const data = await res.json()

        expect(res.status).toBe(400)
        expect(data).toBeTruthy()

    })
})