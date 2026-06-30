export function renderEditPasswordLayout() {
    return `
    <div class="edit-password-container">
        <h1 class="edit-password-title">비밀번호 수정</h1>
        
        <form id="editPasswordForm" class="edit-password-form">
            <div class="form-info-group">
                <div class="form-control-group">
                    <label for="passwordInput" class="info-label">비밀번호</label>
                    <input 
                        type="password" 
                        id="passwordInput" 
                        class="form-input" 
                        placeholder="비밀번호를 입력하세요"
                        required
                    >
                    <p id="passwordHelperText" class="helper-text hidden">*비밀번호를 입력해주세요.</p>
                </div>

                <div class="form-control-group margin-top-md">
                    <label for="passwordConfirmInput" class="info-label">비밀번호 확인</label>
                    <input 
                        type="password" 
                        id="passwordConfirmInput" 
                        class="form-input" 
                        placeholder="비밀번호를 한번 더 입력하세요"
                        required
                    >
                    <p id="passwordConfirmHelperText" class="helper-text hidden">*비밀번호를 한번 더 입력해주세요.</p>
                </div>
            </div>

            <div class="form-action-row">
                <button type="submit" id="btnSubmitPassword" class="btn-primary-purple" disabled>수정하기</button>
            </div>
        </form>

        <div id="passwordToastMessage" class="toast-complete-wrapper hidden">
            <div class="btn-toast-purple">수정완료</div>
        </div>
    </div>
    `;
}