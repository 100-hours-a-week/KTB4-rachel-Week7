export function renderPostsLayout() {
    return `
    <div class="post-list-page">
        <main class="post-list-main">
            <!-- 페이지 상단 헤더 영역 -->
            <header class="post-list-top">
                <div>
                    <h1 class="post-list-top__heading">전체 게시글</h1>
                    <p class="post-list-top__count" id="postTotalCount">안녕하세요, 아무 말 대잔치 게시판 입니다.</p>
                </div>
                <div class="action-area">
                    <button type="button" id="goToPostWriteBtn" class="btn-write">
                        <!-- 피그마 + 플러스 아이콘 SVG -->
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="margin-right: 4px;">
                            <path d="M7 1v12M1 7h12" stroke="white" stroke-width="2" stroke-linecap="round" />
                        </svg>
                        게시글 작성
                    </button>
                </div>
            </header>

            <!-- 실제 게시글 아이템들이 리스트업되는 공간 -->
            <div id="postListContainer" class="post-list"></div>
        </main>
    </div>
    `;
}


export function renderPostItems(posts) {
    console.log(`dom.js에 들어온 post: ${posts}`);

    if (!posts || !posts.data || posts.data.length === 0) {
        return `<div class="empty-msg" style="text-align: center; padding: 40px; color: var(--color-text-secondary);">등록된 게시글이 없습니다.</div>`;
    }

    return posts.data.map(post => {
        
        const truncatedTitle = post.title.length > 26 
            ? post.title.substring(0, 26) + '...' 
            : post.title;

        const formattedDate = post.createdAt 
            ? post.createdAt.replace('T', ' ').substring(0, 19) 
            : '2021-01-01 00:00:00';

        const avatarInitial = post.nickname ? post.nickname.charAt(0) : 'User';

        
        return `
        <article class="post-card" data-id="${post.postId}">
            <div class="post-card__top">
                <div class="post-card__body">
                    
                    <!-- 게시글 제목 -->
                    <h2 class="post-card__title">${truncatedTitle}</h2>
                    
                    <!-- 내용 본문 일부 미리보기 (피그마 내용 반영)
                    <p class="post-card__preview">${post.content ? post.content.substring(0, 80) : ''}...</p> 
                    -->
                </div>
            </div>

            <!-- 하단 메타 정보 (작성자 정보 및 스탯 영역) -->
            <div class="post-card__meta">
                <!-- 작성자 정보 -->
                <div class="post-card__author">
                    <div class="post-card__avatar">${avatarInitial}</div>
                    <span class="post-card__author-name">${post.nickname}</span>
                </div>
                
                <span class="post-card__dot">·</span>
                <span class="post-card__date">${formattedDate}</span>
                
                <!-- 조회수, 댓글수, 좋아요 스탯 목록 (SVG 아이콘 적용) -->
                <div class="post-card__stats">
                    <!-- 조회수 -->
                    <span class="post-card__stat">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M1 6C1 6 2.5 2 6 2s5 4 5 4-1.5 4-5 4-5-4-5-4z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
                            <circle cx="6" cy="6" r="1.5" stroke="currentColor" stroke-width="1.2" />
                        </svg>
                        ${post.viewCount || 0}
                    </span>
                    
                    <!-- 댓글수 -->
                    <span class="post-card__stat">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M1.5 2.5A1 1 0 012.5 1.5h7a1 1 0 011 1V8a1 1 0 01-1 1H7.5L6 11 4.5 9H2.5a1 1 0 01-1-1V2.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
                        </svg>
                        ${post.commentCount || 0}
                    </span>

                    <!-- 좋아요수 -->
                    <span class="post-card__stat">
                        <span style="font-size: 10px;">♥</span>
                        ${post.likeCount || 0}
                    </span>
                </div>
            </div>
        </article>
        `;
    }).join('');
}