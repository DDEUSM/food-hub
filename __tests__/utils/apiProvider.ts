const BASE_URL = 'http://localhost:1445'

async function post<T>(path: string = '', body: T){
    return await fetch(`${BASE_URL}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

async function get(path: string = ''){
    return await fetch(`${BASE_URL}${path}`);
}

export const api = {
    post,
    get
}