//게시글 전체 가져오기
export async function Allposts() {
    console.log('Allposts 진입');
    try {
        const response = await fetch(`http://localhost:8080/posts`);
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
    console.log(`${getPostDetail}번 상세페이지 진입`);
    try {
        const response = await fetch(`http://localhost:8080/posts/${postId}`);
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
    console.log("실제 서버로 날아가는 데이터:", JSON.stringify(userData));
    return await fetch(`http://localhost:8080/posts/users/${userId}`, 
    {
        method: 'POST',
        headers : { 'Content-Type' : 'application/json'},
        body : JSON.stringify(userData)
    })
}


// 게시글 수정하기
export async function updatePost(postId, userData) {
    return await fetch(`http://localhost:8080/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData) // 
    })
}


// 게시글 삭제하기
export async function deletePost(postId){
    console.log(`${postId} 게시글 삭제 fetch api`);
    return await fetch(`http://localhost:8080/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' } 
    })
}



// 좋아요 생성
export async function createLike(postId, userId, userData){
    console.log(`유저 아이디: ${userId}, 게시글 번호 ${postId} 좋아요 생성 업데이트 service.js 진입`);
    return await fetch(`http://localhost:8080/users/posts/${postId}/${userId}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData) // 
    })

}

// 좋아요 취소
export async function deleteLike(postId, userId, userData) {
    console.log(`유저 아이디: ${userId}, 게시글 번호 ${postId} 좋아요 삭제 업데이트 service.js 진입`);
    return await fetch(`http://localhost:8080/posts/${postId}/${userId}/likes`,{
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
}


// 댓글 생성
export async function createComment(postId, userData){ // userData 안에 userId있음
    console.log(`유저 아이디: ${userData['userId']}, 게시글 번호 ${postId} 좋아요 생성 업데이트 service.js 진입`);
    return await fetch(`http://localhost:8080/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData) // 
    })
}


// 댓글 수정 
export async function updateComment(commentId, userData){
    console.log(`유저 아이디: ${userData['userId']}, 댓글 번호 ${commentId} 좋아요 생성 업데이트 service.js 진입`);
    return await fetch(`http://localhost:8080/posts/${postId}/comments/${commentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData) // 
    })
}

// 댓글 삭제
export async function deleteComment(commentId, userData){
    console.log(`유저 아이디: ${userData['userId']}, 댓글 번호 ${commentId} 좋아요 생성 업데이트 service.js 진입`);
    return await fetch(`http://localhost:8080/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData) // 
    })
}