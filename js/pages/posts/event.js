import { router } from '/main.js'; 

export function initPostsEvents() {
    console.log('posts의 event.js 진입')
    const writeBtn = document.getElementById('goToPostWriteBtn');
    const postListContainer = document.getElementById('postListContainer');
   
    // 게시글 작성 페이지로 이동
    writeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            history.pushState(null, '', '/post/write'); // 왜 다시 회원가입 페이지로 오지
            router(); 
    });

    // 상세 페이지로 이동
    postListContainer.addEventListener('click', (e) => {
            // 클릭된 요소와 가장 가까운 .post-item 요소를 찾음
            const postItem = e.target.closest('.post-item');
            if (postItem) {
                const postId = postItem.dataset.id; // data-id="${post.postId}"
                history.pushState(null, '', `/post/${postId}`);
                router();
            }
        });
}