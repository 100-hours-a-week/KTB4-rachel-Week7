export function renderEditPasswordLayout() {
    return `
    <div class="password-edit-page">
        <main class="password-edit-main">
            <!-- ── 섹션 제목 ── -->
            <h1 class="password-edit-main__title">비밀번호 수정</h1>
            
            <!-- ── 카드 ── -->
            <div class="password-edit-card">
                <p class="password-edit-card__desc">안전한 서비스 이용을 위해 비밀번호를 정기적으로 변경해 주세요.</p>
                
                <!-- ── 폼 ── -->
                <form id="editPasswordForm" class="password-edit-form">
                    
                    <!-- 1. 비밀번호 입력 필드 -->
                    <div class="field">
                        <label for="passwordInput" class="field__label">비밀번호</label>
                        <div class="field__input-wrap">
                            <input 
                                type="password" 
                                id="passwordInput" 
                                class="field__input" 
                                placeholder="비밀번호를 입력하세요"
                                required
                            >
                        </div>
                        <!-- 초기 상태 조율을 위해 기존 헬퍼 ID 매칭 및 피그마 헬퍼 클래스 부여 -->
                        <p id="passwordHelperText" class="field__helper field__helper--error hidden">*비밀번호를 입력해주세요.</p>
                    </div>

                    <!-- 2. 비밀번호 확인 필드 -->
                    <div class="field">
                        <label for="passwordConfirmInput" class="field__label">비밀번호 확인</label>
                        <div class="field__input-wrap">
                            <input 
                                type="password" 
                                id="passwordConfirmInput" 
                                class="field__input" 
                                placeholder="비밀번호를 한번 더 입력하세요"
                                required
                            >
                        </div>
                        <p id="passwordConfirmHelperText" class="field__helper field__helper--error hidden">*비밀번호를 한번 더 입력해주세요.</p>
                    </div>

                    <!-- ── 하단 버튼 영역 ── -->
                    <div class="password-edit-actions">
                        <button type="submit" id="btnSubmitPassword" class="btn-save" disabled>수정하기</button>
                    </div>
                </form>
            </div>

            <!-- 토스트 메시지 영역 스타일 보존 -->
            <div id="passwordToastMessage" class="toast-complete-wrapper hidden" style="position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); z-index: 1000;">
                <div class="btn-toast-purple" style="background: var(--blue-900); color: #ffffff; padding: var(--space-3) var(--space-8); border-radius: var(--radius-full); font-size: var(--font-size-sm); font-weight: 600; box-shadow: var(--shadow-lg);">수정완료</div>
            </div>
        </main>
    </div>
    `;
}