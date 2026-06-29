export function renderPostsLayout() {
    return `
    <div class="board-container">
        <header class="board-header">
            <h1 class="board-title">안녕하세요,<br>아무 말 대잔치 <span>게시판</span> 입니다.</h1>
            <div class="action-area">
                <button type="button" id="goToPostWriteBtn" class="btn-post-write">게시글 작성</button>
            </div>
        </header>

        <div id="postListContainer" class="post-list"></div>
    </div>
    `;
}

// posts 파라미터로 스프링 부트에서 받아온 List<PostResponseDto> 배열이 들어옵니다.
export function renderPostItems(posts) {
    if (!posts || posts.length === 0) {
        return `<div class="empty-msg">등록된 게시글이 없습니다.</div>`;
    }

    return posts.data.map(post => {
        
        const truncatedTitle = post.title.length > 26 
            ? post.title.substring(0, 26) + '...' 
            : post.title;

            const formattedDate = post.createdAt 
            ? post.createdAt.replace('T', ' ').substring(0, 19) 
            : '2021-01-01 00:00:00';


        // DTO에 조회수가 주석 -> 일다 제외 처리
        return `
        <article class="post-item" data-id="${post.postId}">
            <h2 class="post-item-title">${truncatedTitle}</h2>
            <div class="post-item-info">
                <span class="author">작성자: ${post.nickname}</span>
                <span class="likes">좋아요 ${post.likeCount}</span>
                <span class="comments">댓글 ${post.commentCount}</span>
                <span class="comments">댓글 ${post.viewCount}</span>
                <span class="comments">댓글 ${formattedDate}</span>
                
            </div>
        </article>
        `;
    }).join('');
}