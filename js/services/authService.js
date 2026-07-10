import { getCookie } from '../utils/cookie.js';


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
        // credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData) 
    })
}

// 유저 데이터 가져오기
export async function getUser(userId) {

    
    try {
        console.log(`user id: ${userId}로 getUser fetch api 호출`);
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
            method: 'GET',
            credentials: "include",
            headers: { 
            'Content-Type': 'application/json'
         },
        });
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


    // const csrfToken = getCookie("XSRF-TOKEN");

    console.log(`${userId} 유저 삭제(탈퇴) fetch api`);
    return await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'DELETE',
        credentials: "include",
        headers: { 
            'Content-Type': 'application/json',
           // 'X-CSRF-TOKEN': csrfToken
        }
    })
}


// 닉네임 또는 프사 수정 PatchMapping
export async function updateNicknameProfileImg(userId, userData) {

    // const csrfToken = getCookie("XSRF-TOKEN");
    
    return await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'PATCH',
        credentials: "include",
        headers: { 
            'Content-Type': 'application/json',
            // 'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(userData) // 
    })
}

// 비밀번호 수정 PutMapping
export async function updatePassword(userId, userData) {


    // const csrfToken = getCookie("XSRF-TOKEN");

    return await fetch(`http://localhost:8080/users/${userId}/password`, {
        method: 'PUT',
        credentials: "include",
        headers: { 
            'Content-Type': 'application/json',
            // 'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(userData) // 
    })
}