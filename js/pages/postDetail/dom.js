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

    const authorInitial = post.nickname ? post.nickname.charAt(0) : 'U';

    return `
    <div class="post-detail-page">
        <main class="post-detail-main">
            
            <!-- 목록으로 가기 버튼 (피그마 구조 반영) -->
            <button type="button" id="goToPostsBtn" class="back-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right: 4px;">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                목록으로
            </button>

            <!-- 본문 아티클 카드 -->
            <article class="post-article">
                <header class="post-article__header">
                    <h1 class="post-article__title">${post.title}</h1>
                    
                    <!-- 작성자 프로필 + 액션 버튼 행 -->
                    <div class="post-article__byline">
                        <div class="post-article__author">
                            <div class="post-article__avatar">${authorInitial}</div>
                            <div>
                                <p class="post-article__author-name">${post.nickname || '작성자'}</p>
                                <p class="post-article__author-date">${formattedDate}</p>
                            </div>
                        </div>
                        
                        <!-- 수정/삭제 버튼 그룹 -->
                        <div class="post-article__actions">
                            <button type="button" id="editPostBtn" class="btn-edit">
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style="margin-right: 2px;">
                                    <path d="M9.5 1.5l2 2-7 7H2.5v-2l7-7z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" />
                                </svg>
                                수정
                            </button>
                            <button type="button" id="deletePostBtn" class="btn-delete">
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style="margin-right: 2px;">
                                    <path d="M2 3.5h9M4.5 3.5V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v1M5 6v4M8 6v4M3 3.5l.5 7a.5.5 0 00.5.5h5a.5.5 0 00.5-.5l.5-7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                삭제
                            </button>
                        </div>
                    </div>
                </header>

                <hr class="post-article__divider">

                <!-- 본문 내용 내역 -->
                <div class="post-article__content">
                    ${imageHtml}
                    <div class="post-article__paragraph">${post.content}</div>
                </div>

                <!-- 하단 통계 피드 (좋아요 활성화 토글 연동용 구조 보존) -->
                <div class="post-article__footer">
                    <span class="post-article__stat" id="likeToggleBtn" style="cursor: pointer;" data-liked="false">
                        <span style="color: #ef4444; margin-right: 2px;">♥</span> 좋아요 <span id="likeCountValue">${formatCount(post.likeCount)}</span>
                    </span>
                    <span class="post-article__stat">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="margin-right: 2px;">
                            <path d="M1 6C1 6 2.5 2 6 2s5 4 5 4-1.5 4-5 4-5-4-5-4z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
                            <circle cx="6" cy="6" r="1.5" stroke="currentColor" stroke-width="1.2" />
                        </svg>
                        조회 ${formatCount(post.viewCount || 0)}
                    </span>
                    <span class="post-article__stat">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="margin-right: 2px;">
                            <path d="M1.5 2.5A1 1 0 012.5 1.5h7a1 1 0 011 1V8a1 1 0 01-1 1H7.5L6 11 4.5 9H2.5a1 1 0 01-1-1V2.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
                        </svg>
                        댓글 <span id="commentCountValue">${formatCount(post.commentCount)}</span>
                    </span>
                </div>
            </article>

            <!-- ── 댓글 섹션 전체 껍데기 ── -->
            <section class="comments">
                <h3 class="comments__title">댓글</h3>

                <!-- 댓글 입력 행 영역 (피그마 디자인 이식) -->
                <div class="comment-input-row">
                    <!-- 임시 이니셜 노출 혹은 공통 아이콘 -->
                    <div class="comment-input-row__avatar">Me</div>
                    <div class="comment-input-row__inner">
                        <!-- 기존 textarea 역할을 바꾼 가로형 input창 (id 보존) -->
                        <input type="text" id="commentTextArea" class="comment-input" placeholder="댓글을 입력하세요...">
                        <button type="button" id="commentSubmitBtn" class="comment-submit" disabled>등록</button>
                    </div>
                </div>

                <!-- 실시간 동적 주입 리스트 컨테이너 -->
                <div id="commentListContainer" class="comment-list"></div>
            </section>
        </main>
    </div>

    <!-- 기존 삭제 확인 모달 레이아웃 구조 보존 -->
    <div id="globalModalOverlay" class="modal-overlay hidden" style="position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; z-index: 9999;">
        <dialog id="PostDetailDialog" class="modal-content" style="background: white; border: none; padding: var(--space-6); border-radius: var(--radius-2xl); max-width: 24rem; width: 90%; box-shadow: var(--shadow-xl);">
            <h2 id="modalTitle" class="modal-title" style="font-size: var(--font-size-md); font-weight:700; margin-bottom: 8px;">게시글을 삭제하겠습니까?</h2>
            <p class="modal-subtitle" style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-bottom: 20px;">삭제한 내용은 복구 할 수 없습니다.</p>
            <div class="modal-actions" style="display: flex; justify-content: flex-end; gap: 8px;">
                <button type="button" id="modalCancelBtn" class="btn-edit" style="padding: 6px 12px;">취소</button>
                <button type="button" id="modalConfirmBtn" class="btn-delete" style="padding: 6px 12px; background: var(--color-error); color: white;">확인</button>
            </div>
        </dialog>
    </div>
    `;
}

// 댓글 목록 리스트 아이템 컴포넌트
export function renderCommentItems(comments) {
    if (!comments || comments.length === 0) {
        return `<div class="empty-comments" style="text-align: center; padding: 20px; color: var(--color-text-secondary); font-size: 14px;">첫 댓글을 남겨보세요!</div>`;
    }

    return comments.map(comment => {
        const formattedDate = comment.createdAt 
        ? comment.createdAt.replace('T', ' ').substring(0, 19) 
        : '2021-01-01 00:00:00';

        const commentInitial = comment.author ? comment.author.charAt(0) : 'U';
       
        return `
        <article class="comment-item" data-comment-id="${comment.commentId}" data-author-id="${comment.userId}">
            <!-- 좌측 프로필 아바타 -->
            <div class="comment-item__avatar">${commentInitial}</div>
            
            <!-- 우측 댓글 본문 내용 영역 -->
            <div class="comment-item__body">
                <div class="comment-item__meta">
                    <span class="comment-item__name">${comment.author || '작성자'}</span>
                    <span class="comment-item__time">${formattedDate}</span>
                    
                    <!-- 수정/삭제 버튼 인라인 제어 영역 -->
                    <div class="comment-actions" style="margin-left: auto; display: flex; gap: 6px;">
                        <button type="button" class="btn-comment-edit" style="background: none; border: none; font-size: 11px; color: var(--blue-600); cursor: pointer;">수정</button>
                        <button type="button" class="btn-comment-delete" style="background: none; border: none; font-size: 11px; color: var(--color-error); cursor: pointer;">삭제</button>
                    </div>
                </div>
                <p class="comment-item__text">${comment.content}</p>
            </div>
        </article>
        `;;
    }).join('');
}