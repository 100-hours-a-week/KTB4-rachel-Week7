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

// 유저 데이터 가져오기
export async function getUser(userId) {
    try {
        console.log(`user id: ${userId}로 getUser fetch api 호출햇어요`);
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error.message);
        return []; 
    }
}

// 유저 삭제
export async function deleteUser(userId){
    console.log(`${userId} 유저 삭제(탈퇴) fetch api`);
    return await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' } 
    })
}


// 닉네임 또는 프사 수정 PatchMapping
export async function updateNicknameProfileImg(userId, userData) {
    return await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData) // 
    })
}

// 비밀번호 수정 PutMapping
export async function updatePassword(userId, userData) {
    return await fetch(`http://localhost:8080/users/${userId}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData) // 
    })
}