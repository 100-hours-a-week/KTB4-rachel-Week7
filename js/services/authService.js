// API 명세서의 URL과 Method, Data 형식을 그대로 매칭

export async function signup(userData) {

    return await fetch('http://localhost:8080/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData) // 
    })
}

export async function login(userData) {

    return await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData) 
    })
}