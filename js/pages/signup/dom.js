// HTML를 조각내 브라우저가 
// 화면(DOM) 변경 및 업데이트
export function renderSignup() {
    return `
    <div class="signup-container">
    <header class="signup-header">
        <button type="button" id="backBtn" class="btn-icon">←</button>
        <h2>회원가입</h2>
    </header>

    <form id="signupForm" class="signup-form">
        <div class="profile-upload-group">
            <div class="profile-preview" id="profilePreview">
                <span class="upload-placeholder">+</span>
            </div>
            <label for="profileImgInput" class="btn-upload">프로필 사진 선택</label>
            <input type="file" id="profileImgInput" accept="image/*" style="display: none;">
            <p class="helper-text" id="profilImageHelper">*프로필 사진을 추가해주세요.</p>
        </div>

        <div class="input-group">
            <label for="emailInput">이메일</label>
            <input type="email" id="emailInput" placeholder="example@email.com" required>
            <p class="helper-text" id="emailHelper"></p>
        </div>

        <div class="input-group">
            <label for="passwordInput">비밀번호</label>
            <input type="password" id="passwordInput" required>
            <p class="helper-text" id="passwordHelper">*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.</p>
        </div>

        <div class="input-group">
            <label for="passwordCheckInput">비밀번호 확인</label>
            <input type="password" id="passwordCheckInput" required>
            <p class="helper-text" id="passwordCheckHelper"></p>
        </div>

        <div class="input-group">
            <label for="nicknameInput">닉네임</label>
            <input type="text" id="nicknameInput"  required>
            <p class="helper-text" id="nicknameHelper"></p>
        </div>

        <button type="submit" id="signupSubmitBtn" class="btn btn-primary">회원가입</button>
    </form>

    <div class="signup-footer">
        <span>이미 계정이 있으신가요?</span>
        <button type="button" id="goToLoginBtn" class="btn-link">로그인 하러가기</button>
    </div>
</div>
    `;
}