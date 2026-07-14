export function renderSignup() {
    return `
    <div class="signup-page">
        <!-- 디자인을 위한 카드 래퍼 -->
        <div class="signup-card">

            <!-- ── 왼쪽 소개 패널 (통계 테이블 포함) ── -->
            <div class="signup-panel">
                <div>
                    <!-- 로고 -->
                    <div class="signup-panel__logo">
                        <div class="signup-panel__logo-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M2.5 4.5A2 2 0 014.5 2.5h11a2 2 0 012 2v9a2 2 0 01-2 2H12l-2 2.5L8 15.5H4.5a2 2 0 01-2-2v-9z" fill="rgba(255,255,255,0.9)" />
                            </svg>
                        </div>
                        <span class="signup-panel__logo-name">블루커뮤니티</span>
                    </div>

                    <!-- 메인 타이틀 -->
                    <h2 class="signup-panel__heading">
                        지금 바로<br />시작하세요
                    </h2>
                    <p class="signup-panel__desc">
                        우리집 근처부터 전국까지<br />편리한 중고 거래
                    </p>
                </div>

                <!-- 통계 테이블 리스트 -->
                <ul class="signup-panel__stats">
                    <li class="signup-panel__stat">
                        <span class="signup-panel__stat-label">등록 회원</span>
                        <span class="signup-panel__stat-value">12,000+</span>
                    </li>
                    <li class="signup-panel__stat">
                        <span class="signup-panel__stat-label">게시글</span>
                        <span class="signup-panel__stat-value">48,000+</span>
                    </li>
                    <li class="signup-panel__stat">
                        <span class="signup-panel__stat-label">평균 만족도</span>
                        <span class="signup-panel__stat-value">4.9★</span>
                    </li>
                </ul>

                <!-- 푸터 카피라이트 -->
                <div class="signup-panel__footer">
                    <p class="signup-panel__footer-text">© 2026 블루커뮤니티</p>
                </div>
            </div>

            <!-- ── 오른쪽 폼 영역 (기존 회원가입 기능) ── -->
            <div class="signup-form-area">
                <div class="mb-6">
                    <h1 class="signup-form-area__title">회원가입</h1>
                    <p class="signup-form-area__subtitle">정보를 입력하고 커뮤니티에 참여하세요</p>
                </div>

                <form id="signupForm" class="signup-form">
                    
                    <!-- 1. 프로필 이미지 업로드 그룹 -->
                    <div class="profile-upload-group" style="display: flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <div class="profile-preview" id="profilePreview" style="width: 80px; height: 80px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 1px dashed #cbd5e1; font-size: 24px; color: #94a3b8; overflow: hidden;">
                            <span class="upload-placeholder">+</span>
                        </div>
                        <label for="profileImgInput" class="btn-upload" style="font-size: 12px; color: var(--color-primary); font-weight: 600; cursor: pointer;">프로필 사진 선택</label>
                        <input type="file" id="profileImgInput" accept="image/*" style="display: none;">
                        <p class="field__helper field__helper--hint" id="profilImageHelper">*프로필 사진을 추가해주세요.</p>
                    </div>

                    <!-- 2. 이메일 필드 -->
                    <div class="field">
                        <label class="field__label" for="emailInput">이메일</label>
                        <input type="email" id="emailInput" class="field__input" placeholder="example@email.com" autocomplete="off" required>
                        <p class="field__helper field__helper--hint" id="emailHelper">로그인에 사용할 이메일 주소</p>
                    </div>

                    <!-- 3. 비밀번호 필드 (비밀번호 강도 바 추가됨) -->
                    <div class="field">
                        <label class="field__label" for="passwordInput">비밀번호</label>
                        <input type="password" id="passwordInput" class="field__input" placeholder="8자 이상 입력하세요" autocomplete="new-password" required>
                        
                        <!-- 추가된 비밀번호 강도 바 (JS로 제어 가능) 
                        <div class="strength-bar" id="passwordStrengthBar" data-level="0">
                            <div class="strength-bar__segment"></div>
                            <div class="strength-bar__segment"></div>
                            <div class="strength-bar__segment"></div>
                        </div> -->
                        
                        <p class="field__helper field__helper--hint" id="passwordHelper">영문, 숫자 조합 8자 이상 권장</p>
                    </div>

                    <!-- 4. 비밀번호 확인 필드 -->
                    <div class="field">
                        <label class="field__label" for="passwordCheckInput">비밀번호 확인</label>
                        <input type="password" id="passwordCheckInput" class="field__input" placeholder="비밀번호를 다시 입력하세요" autocomplete="new-password" required>
                        <p class="field__helper field__helper--hint" id="passwordCheckHelper">위에 입력한 비밀번호와 동일하게 입력하세요.</p>
                    </div>

                    <!-- 5. 닉네임 필드 -->
                    <div class="field">
                        <label class="field__label" for="nicknameInput">닉네임</label>
                        <input type="text" id="nicknameInput" class="field__input" placeholder="이름 또는 닉네임 입력" required>
                        <p class="field__helper field__helper--hint" id="nicknameHelper">실명 또는 닉네임 (2자 이상)</p>
                    </div>

                    <!-- 가입하기 버튼 -->
                    <button type="submit" id="signupSubmitBtn" class="btn-primary" disabled>회원가입</button>
                </form>

                <!-- 하단 로그인 전환 링크 -->
                <div class="signup-switch">
                    <span>이미 계정이 있으신가요? </span>
                    <button type="button" id="goToLoginBtn" class="signup-switch__link">로그인 하러가기</button>
                </div>
            </div>

        </div>
    </div>
    `;
}