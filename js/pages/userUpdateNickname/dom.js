export function renderEditProfileLayout(user) {
    // 기본값 처리
    const email = user?.email || 'startupcode@gmail.com';
    const nickname = user?.nickname || '스타트업코드';
    const profileImage = user?.profileImage || '../../../images/default-profile.png';

    return `
    <div class="edit-profile-container">
        <h1 class="edit-profile-title">회원정보수정</h1>
        
        <form id="editProfileForm" class="edit-profile-form">
            <div class="profile-image-section">
                <label class="profile-label">프로필 사진*</label>
                <div class="profile-image-wrapper">
                    <img src="${profileImage}" alt="프로필 사진" id="profilePreviewImage" class="profile-preview-img">
                    <label for="profileImageInput" class="btn-change-image">변경</label>
                    <input type="file" id="profileImageInput" accept="image/*" class="hidden-file-input">
                </div>
            </div>

            <div class="form-info-group">
                <div class="info-item">
                    <span class="info-label">이메일</span>
                    <span id="userEmailText" class="info-value-text">${email}</span>
                </div>

                <div class="form-control-group">
                    <label for="nicknameInput" class="info-label">닉네임</label>
                    <input 
                        type="text" 
                        id="nicknameInput" 
                        class="form-input" 
                        value="${nickname}" 
                        placeholder="닉네임을 입력해주세요"
                        required
                    >
                    <p id="nicknameHelperText" class="helper-text">* 중복된 닉네임입니다. (또는 알맞은 헬퍼 텍스트)</p>
                </div>
            </div>

            <div class="form-action-row">
                <button type="submit" id="btnSubmitEdit" class="btn-primary-purple">수정하기</button>
            </div>

            <div class="leave-action-row">
                <button type="button" id="btnWithdrawal" class="btn-text-link">회원 탈퇴</button>
            </div>
        </form>

        <div id="editCompleteToast" class="toast-complete-wrapper hidden">
            <button type="button" id="btnToastConfirm" class="btn-toast-purple">수정완료</button>
        </div>
    </div>

    <div id="withdrawalModalOverlay" class="modal-overlay hidden">
        <dialog id="withdrawalDialog" class="modal-content">
            <h2 id="withdrawalModalTitle" class="modal-title">회원탈퇴 하시겠습니까?</h2>
            <p class="modal-subtitle">작성된 게시글과 댓글은 삭제됩니다.</p>
            <div class="modal-actions">
                <button type="button" id="withdrawalCancelBtn" class="btn-modal-cancel">취소</button>
                <button type="button" id="withdrawalConfirmBtn" class="btn-modal-confirm">확인</button>
            </div>
        </dialog>
    </div>
    `;
}