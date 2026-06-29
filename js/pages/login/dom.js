export function renderLogin() {
    return `
    <div class="login-container">
        <h2 class="login-title">로그인</h2>

        <form id="loginForm" class="login-form">

            <div class="input-group">
                <label for="loginEmailInput">이메일</label>

                <input
                    type="email"
                    id="loginEmailInput"
                    placeholder="이메일을 입력하세요"
                    required
                >

                <p id="emailHelper" class="helper-text"></p>
            </div>

            <div class="input-group">
                <label for="loginPasswordInput">비밀번호</label>

                <input
                    type="password"
                    id="loginPasswordInput"
                    placeholder="비밀번호를 입력하세요"
                    required
                >

                <p id="passwordHelper" class="helper-text"></p>
            </div>

            <!-- 서버 로그인 실패 -->
            <p id="loginGlobalHelper" class="helper-text global-error"></p>

            <button
                type="submit"
                id="loginSubmitBtn"
                class="btn-login-submit"
                disabled
            >
                로그인
            </button>

        </form>

        <div class="login-footer">
            <button
                type="button"
                id="goToSignupBtn"
                class="btn-link"
            >
                회원가입
            </button>
        </div>

    </div>
    `;
}