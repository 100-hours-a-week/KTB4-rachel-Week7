export function renderEditProfileLayout(user) {
    // 기본값 처리
    const email = user?.email || 'startupcode@gmail.com';
    const nickname = user?.nickname || '스타트업코드';
    const profileImage = user?.profileImage || '../../../images/default-profile.png';
    const avatarInitial = nickname ? nickname.charAt(0) : 'U';

    return `
    <div class="user-edit-page">
        <main class="user-edit-main">
            <!-- ── 섹션 제목 ── -->
            <h1 class="user-edit-main__title">회원정보수정</h1>
            
            <!-- ── 카드 ── -->
            <div class="user-edit-card">
                
                <!-- ── 프로필 이미지 수정 영역 ── -->
                <div class="profile-edit">
                    <div class="profile-edit__img-wrap">
                        <img src="${profileImage}" alt="프로필 사진" id="profilePreviewImage" class="profile-edit__img">
                        <!-- 카메라 오버레이 역할 버튼 -->
                        <label for="profileImageInput" class="profile-edit__overlay-btn">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M9.5 1.5l2 2-7 7H2.5v-2l7-7z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" />
                            </svg>
                        </label>
                        <input type="file" id="profileImageInput" accept="image/*" class="profile-edit__file-input">
                    </div>
                    <p class="profile-edit__hint">프로필 사진을 변경하려면 카메라 버튼을 누르세요.</p>
                </div>

                <!-- ── 폼 영역 ── -->
                <form id="editProfileForm" class="user-edit-form">
                    
                    <!-- 1. 이메일 필드 (읽기 전용) -->
                    <div class="field">
                        <label class="field__label">
                            이메일
                            <span class="field__badge-readonly">Read Only</span>
                        </label>
                        <!-- readonly 속성 주입하여 피그마 읽기전용 스타일 연결 -->
                        <input type="text" id="userEmailText" class="field__input" value="${email}" readonly>
                    </div>

                    <!-- 2. 닉네임 필드 -->
                    <div class="field">
                        <label for="nicknameInput" class="field__label">닉네임</label>
                        <input 
                            type="text" 
                            id="nicknameInput" 
                            class="field__input" 
                            value="${nickname}" 
                            placeholder="닉네임을 입력해주세요"
                            required
                        >
                        <!-- 피그마 헬퍼 텍스트 디자인 클래스 연결 -->
                        <p id="nicknameHelperText" class="field__helper field__helper--error">* 중복된 닉네임입니다.</p>
                    </div>

                    <!-- ── 하단 버튼 영역 ── -->
                    <div class="user-edit-actions">
                        <button type="submit" id="btnSubmitEdit" class="btn-save">수정하기</button>
                        <button type="button" id="btnWithdrawal" class="btn-withdraw">회원 탈퇴</button>
                    </div>
                </form>
            </div>

            <!-- 기존 토스트 컴포넌트 마크업 구조 보존 -->
            <div id="editCompleteToast" class="toast-complete-wrapper hidden" style="position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); z-index: 1000;">
                <button type="button" id="btnToastConfirm" style="background: var(--blue-900); color: #ffffff; padding: var(--space-3) var(--space-8); border-radius: var(--radius-full); border: none; font-size: var(--font-size-sm); font-weight: 600; box-shadow: var(--shadow-lg); cursor: pointer;">수정완료</button>
            </div>
        </main>
    </div>

    <!-- 기존 회원 탈퇴 모달 오버레이 구조 보존 (dialog open 속성은 이전 에러 예방을 위해 제거 상태 유지) -->
    <div id="withdrawalModalOverlay" class="modal-overlay hidden" style="position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(15, 31, 92, 0.4); display:flex; align-items:center; justify-content:center; z-index: 9999;">
        <dialog id="withdrawalDialog" class="modal-content" style="background: white; border: none; padding: var(--space-6); border-radius: var(--radius-2xl); max-width: 24rem; width: 90%; box-shadow: var(--shadow-xl);">
            <h2 id="withdrawalModalTitle" class="modal-title" style="font-size: var(--font-size-md); font-weight:700; margin-bottom: 6px;">회원탈퇴 하시겠습니까?</h2>
            <p class="modal-subtitle" style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-bottom: 20px;">작성된 게시글과 댓글은 삭제됩니다.</p>
            <div class="modal-actions" style="display: flex; justify-content: flex-end; gap: 8px;">
                <button type="button" id="withdrawalCancelBtn" class="btn-save" style="padding: 6px 12px; background: var(--blue-50); border: 1px solid var(--color-border); color: var(--color-text-body); width: auto;">취소</button>
                <button type="button" id="withdrawalConfirmBtn" class="btn-withdraw" style="padding: 6px 12px; width: auto;">확인</button>
            </div>
        </dialog>
    </div>
    `;
}