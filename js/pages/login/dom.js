export function renderLogin() {
    return `
    <div class="login-page">
        <!-- 디자인을 위해 추가된 카드 래퍼 -->
        <div class="login-card">
            
            <!-- 왼쪽 영역 (디자인용: 없으면 오른쪽 폼만 덩그러니 남아요) -->
            <div class="login-panel">
                <div>
                    <!-- 로고 영역 -->
                    <div class="login-panel__logo">
                        <div class="login-panel__logo-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M2.5 4.5A2 2 0 014.5 2.5h11a2 2 0 012 2v9a2 2 0 01-2 2H12l-2 2.5L8 15.5H4.5a2 2 0 01-2-2v-9z" fill="rgba(255,255,255,0.9)" />
                            </svg>
                        </div>
                        <span class="login-panel__logo-name">블루커뮤니티</span>
                    </div>

                    <!-- 메인 타이틀 -->
                    <h2 class="login-panel__heading">
                        개발자들이<br />모이는 곳
                    </h2>
                    <p class="login-panel__desc">
                        경험을 나누고, 함께 성장하는<br />개발자 커뮤니티에 참여하세요.
                    </p>
                </div>

                <!-- 기능 목록 (FEATURES 리스트 바닐라 JS 변환) -->
                <ul class="login-panel__features">
                    <!-- 기능 1: 신뢰할 수 있는 커뮤니티 -->
                    <li class="login-panel__feature">
                        <div class="login-panel__feature-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2L3 6v4c0 4 3.5 7.5 7 8 3.5-.5 7-4 7-8V6l-7-4z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.8)" stroke-width="1.4" stroke-linejoin="round" />
                                <path d="M7 10l2 2 4-4" stroke="rgba(255,255,255,0.9)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <h4 class="login-panel__feature-title">신뢰할 수 있는 커뮤니티</h4>
                            <p class="login-panel__feature-desc">검증된 개발자들이 모인 안전한 공간</p>
                        </div>
                    </li>

                    <!-- 기능 2: 활발한 지식 공유 -->
                    <li class="login-panel__feature">
                        <div class="login-panel__feature-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="7.5" stroke="rgba(255,255,255,0.8)" stroke-width="1.4" />
                                <path d="M6.5 10a3.5 3.5 0 007 0" stroke="rgba(255,255,255,0.9)" stroke-width="1.4" stroke-linecap="round" />
                                <circle cx="7.5" cy="8" r="1" fill="rgba(255,255,255,0.9)" />
                                <circle cx="12.5" cy="8" r="1" fill="rgba(255,255,255,0.9)" />
                            </svg>
                        </div>
                        <div>
                            <h4 class="login-panel__feature-title">활발한 지식 공유</h4>
                            <p class="login-panel__feature-desc">현직 개발자들의 생생한 경험과 인사이트</p>
                        </div>
                    </li>

                    <!-- 기능 3: 커리어 성장 -->
                    <li class="login-panel__feature">
                        <div class="login-panel__feature-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10h12M10 4l6 6-6 6" stroke="rgba(255,255,255,0.9)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <h4 class="login-panel__feature-title">커리어 성장</h4>
                            <p class="login-panel__feature-desc">취업, 이직, 사이드 프로젝트까지 함께</p>
                        </div>
                    </li>
                </ul>

                <!-- 푸터 카피라이트 -->
                <div class="login-panel__footer">
                    <p class="login-panel__desc-xs">© 2026 블루커뮤니티 · 개발자를 위한 공간</p>
                </div>
            </div>

            <!-- 오른쪽 영역 (기존 폼) -->
            <div class="login-form-area">
                <h2 class="login-form-area__title">로그인</h2>
                <p class="login-form-area__subtitle">계정 정보를 입력하세요.</p>
                
                <form id="loginForm" class="login-form">
                    <div class="field">
                        <label class="field__label" for="loginEmailInput">이메일</label>
                        <input
                            type="email"
                            id="loginEmailInput"
                            class="field__input"
                            placeholder="이메일을 입력하세요"
                            required
                        >
                        <p id="emailHelper" class="field__helper field__helper--error"></p>
                    </div>

                    <div class="field">
                        <label class="field__label" for="loginPasswordInput">비밀번호</label>
                        <input
                            type="password"
                            id="loginPasswordInput"
                            class="field__input"
                            placeholder="비밀번호를 입력하세요"
                            required
                        >
                        <p id="passwordHelper" class="field__helper field__helper--error"></p>
                    </div>

                    <button type="submit" id="loginSubmitBtn" class="btn-primary">
                        로그인
                    </button>
                </form>

                <div class="login-switch">
                    아직 계정이 없으신가요? 
                    <button type="button" id="goToSignupBtn" class="login-switch__link">
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}