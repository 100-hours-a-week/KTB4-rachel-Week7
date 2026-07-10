import { getCookie } from '../utils/cookie.js';


//게시글 전체 가져오기
export async function Allposts() {
    
    console.log(document.cookie);
    try {
        const response = await fetch(`http://localhost:8080/posts`, { // 여기빨간줄
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            
        }
        
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error.message);

        return []; // 에러 발생 시 빈 배열 반환하여 프론트 터지지 않게 방지
    }

} 

//상세 게시글 가져오기 (댓글, 좋아요, 조회수 조회도 가능)
export async function getPostDetail(postId) {
    
    try {
        const response = await fetch(`http://localhost:8080/posts/${postId}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error.message);
        return []; // 에러 발생 시 빈 배열 반환하여 프론트 터지지 않게 방지
    }
}

// 게시글 생성하기
export async function createPost(userId, userData){

    // const csrfToken = getCookie("XSRF-TOKEN");
    
    console.log("실제 서버로 날아가는 데이터:", JSON.stringify(userData));
    return await fetch(`http://localhost:8080/posts/users/${userId}`, 
    {
        method: 'POST',
        credentials: "include",
        headers : { 
            'Content-Type' : 'application/json',
            // "X-CSRF-TOKEN": csrfToken
        },
        body : JSON.stringify(userData)
    })
}


// 게시글 수정하기
export async function updatePost(postId, userData) {
    
    // const csrfToken = getCookie("XSRF-TOKEN");
    
    return await fetch(`http://localhost:8080/posts/${postId}`, {
        method: 'PATCH',
        credentials: "include",
        headers: { 
            'Content-Type': 'application/json',
            // "X-CSRF-TOKEN": csrfToken
        },
        body: JSON.stringify(userData) // 
    })
}


// 게시글 삭제하기
export async function deletePost(postId,userData){
    console.log(`${postId} 게시글 삭제 fetch api`);
   //  const csrfToken = getCookie("XSRF-TOKEN");
    
    return await fetch(`http://localhost:8080/posts/${postId}`, {
        method: 'DELETE',
        credentials: "include",
        headers: { 
            'Content-Type': 'application/json',
           // "X-CSRF-TOKEN": csrfToken
        },
        body: JSON.stringify(userData)
    })
}



// 좋아요 생성
export async function createLike(postId, userId, userData){
    
    console.log(`유저 아이디: ${userId}, 게시글 번호 ${postId} 좋아요 생성 업데이트 service.js 진입`);
    // const csrfToken = getCookie("XSRF-TOKEN");
    
    return await fetch(`http://localhost:8080/posts/${postId}/${userId}/likes`, {
        method: 'POST',
        credentials: "include",
        headers: { 
            'Content-Type': 'application/json',
            // "X-CSRF-TOKEN": csrfToken
        },
        body: JSON.stringify(userData) // 
    })

}

// 좋아요 취소
export async function deleteLike(postId, userId, userData) {
    console.log(`유저 아이디: ${userId}, 게시글 번호 ${postId} 좋아요 삭제 업데이트 service.js 진입`);
    // const csrfToken = getCookie("XSRF-TOKEN");
    
    return await fetch(`http://localhost:8080/posts/${postId}/${userId}/likes`,{
        method: "DELETE",
        credentials: "include",
        headers: { 
            'Content-Type': 'application/json',
           // "X-CSRF-TOKEN": csrfToken
         },
        body: JSON.stringify(userData)
    })
}


// 댓글 생성
export async function createComment(postId, userData){ // userData 안에 userId있음
    console.log(`유저 아이디: ${userData['userId']}, 게시글 번호 ${postId} 좋아요 생성 업데이트 service.js 진입`);
    // const csrfToken = getCookie("XSRF-TOKEN");
    
    return await fetch(`http://localhost:8080/posts/${postId}/comments`, {
        method: 'POST',
        credentials: "include",
        headers: { 
            'Content-Type': 'application/json',
            // "X-CSRF-TOKEN": csrfToken
        },
        body: JSON.stringify(userData) 
    })
}


// 댓글 수정 
export async function updateComment(commentId, userData){
    console.log(`유저 아이디: ${userData['userId']}, 댓글 번호 ${commentId} 좋아요 생성 업데이트 service.js 진입`);
    // const csrfToken = getCookie("XSRF-TOKEN");
    
    return await fetch(`http://localhost:8080/posts/${postId}/comments/${commentId}`, {
        method: 'PATCH',
        credentials: "include",
        headers: { 
            'Content-Type': 'application/json',
            // "X-CSRF-TOKEN": csrfToken
         },
        body: JSON.stringify(userData) 
    })
}

// 댓글 삭제
export async function deleteComment(commentId, userData){
    console.log(`유저 아이디: ${userData['userId']}, 댓글 번호 ${commentId} 좋아요 생성 업데이트 service.js 진입`);
    // const csrfToken = getCookie("XSRF-TOKEN");
    
    return await fetch(`http://localhost:8080/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        credentials: "include",
        headers: { 
            'Content-Type': 'application/json',
            // "X-CSRF-TOKEN": csrfToken
         },
        body: JSON.stringify(userData) // 
    })
}