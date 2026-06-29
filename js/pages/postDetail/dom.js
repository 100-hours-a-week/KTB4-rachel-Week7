export function formatCount(count) {
    if (count >= 100000) return Math.floor(count / 1000) + 'k';
    if (count >= 10000) return Math.floor(count / 1000) + 'k';
    if (count >= 1000) return Math.floor(count / 1000) + 'k';
    return count;
}

// 상세 페이지 전체 기본 레이아웃 렌더링
export function renderPostDetailLayout(post) {
    
    // 게시글 이미지(있을 시에만 렌더링)
    const imageHtml = post.images && post.images.length > 0 
        ? `<div class="post-detail-image-box"><img src="${post.images[0]}" alt="게시글 이미지" class="post-detail-image"></div>`
        : '';

    const formattedDate = post.createdAt 
    ? post.createdAt.replace('T', ' ').substring(0, 19) 
    : '2021-01-01 00:00:00';

    return `
    <div class="post-detail-container">
        <header class="post-detail-header">
            <h1 class="post-detail-title">${post.title}</h1>
            <div class="post-author-row">
                <div class="author-meta">
                    <div class="author-profile-circle"></div>
                    <span class="author-name">${post.nickname || '더미 작성자'}</span>
                    <span class="post-date">${formattedDate}</span>
                </div>
                <div class="post-actions">
                    <button type="button" id="editPostBtn" class="btn-outline-small">수정</button>
                    <button type="button" id="deletePostBtn" class="btn-outline-small">삭제</button>
                </div>
            </div>
        </header>

        <hr class="divider">

        <main class="post-detail-body">
            ${imageHtml}
            <div class="post-detail-content">${post.content}</div>
        </main>

        <section class="post-stats-section">
            <button type="button" id="likeToggleBtn" class="stat-card" data-liked="false">
                <span class="stat-value" id="likeCountValue">${formatCount(post.likeCount)}</span>
                <span class="stat-label">좋아요수</span>
            </button>
            <div class="stat-card">
                <span class="stat-value">${formatCount(post.viewCount || 0)}</span>
                <span class="stat-label">조회수</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="commentCountValue">${formatCount(post.commentCount)}</span>
                <span class="stat-label">댓글</span>
            </div>
        </section>

        <hr class="divider">

        <section class="comment-input-section">
            <div class="comment-input-wrapper">
                <textarea id="commentTextArea" placeholder="댓글을 입력하세요!"></textarea>
                <div class="comment-submit-row">
                    <button type="button" id="commentSubmitBtn" class="btn-comment-submit" disabled>댓글 등록</button>
                </div>
            </div>
        </section>

        <section id="commentListContainer" class="comment-list-section">
            </section>
    </div>

    <div id="globalModalOverlay" class="modal-overlay hidden">
        <div class="modal-content">
            <h2 id="modalTitle" class="modal-title">게시글을 삭제하겠습니까?</h2>
            <p class="modal-subtitle">삭제한 내용은 복구 할 수 없습니다.</p>
            <div class="modal-actions">
                <button type="button" id="modalCancelBtn" class="btn-modal-cancel">취소</button>
                <button type="button" id="modalConfirmBtn" class="btn-modal-confirm">확인</button>
            </div>
        </div>
    </div>
    `;
}

// 댓글 목록 리스트 아이템 컴포넌트
export function renderCommentItems(comments) {
    if (!comments || comments.length === 0) {
        return `<div class="empty-comments">첫 댓글을 남겨보세요!</div>`;
    }

    return comments.map(comment => {
        const formattedDate = comment.createdAt 
        ? comment.createdAt.replace('T', ' ').substring(0, 19) 
        : '2021-01-01 00:00:00';
        
        return `
        <article class="comment-item" data-comment-id="${comment.commentId}">
            <div class="comment-item-header">
                <div class="comment-author-meta">
                    <div class="author-profile-circle small"></div>
                    <span class="comment-author-name">${comment.nickname || '더미 작성자'}</span>
                    <span class="comment-date">${formattedDate}</span>
                </div>
                <div class="comment-actions">
                    <button type="button" class="btn-comment-edit btn-text-small">수정</button>
                    <button type="button" class="btn-comment-delete btn-text-small">삭제</button>
                </div>
            </div>
            <div class="comment-item-body">
                <p class="comment-text">${comment.content}</p>
            </div>
        </article>
        `;
    }).join('');
}