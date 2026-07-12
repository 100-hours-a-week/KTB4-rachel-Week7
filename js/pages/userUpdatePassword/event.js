
import { updatePassword } from '../../services/authService.js';
import { router } from '../../../main.js';

export function initUserUpdatePasswordEvents(currentUserId) {
    const passwordInput = document.getElementById('passwordInput');
    const passwordConfirmInput = document.getElementById('passwordConfirmInput');
    const editPasswordForm = document.getElementById('editPasswordForm');
    const btnSubmitPassword = document.getElementById('btnSubmitPassword');

    let isPwdValid = false;
    let isPwdCheckValid = false;


     //비밀번호 유효성 검사 
    passwordInput.addEventListener("input", () => {
        isPwdValid = validatePassword(passwordInput.value.trim());
        toggleSubmitButton();
    });

    // 비밀번호 확인 유효성 검사
    passwordConfirmInput.addEventListener("input", () => {
        isPwdCheckValid = validatePasswordCheck(passwordInput.value.trim(), passwordConfirmInput.value.trim());
        toggleSubmitButton();
    });


    editPasswordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const PasswordUpdateRequestDto = {
            password : passwordInput.value.trim(),
            passwordCheck : passwordConfirmInput.value.trim()
        }

        updatePassword(currentUserId, PasswordUpdateRequestDto)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("서버가 준 응답: ", data);
                // 토스트메시지 어케해?
                const toast = document.getElementById('passwordToastMessage');
                
                if (toast) {
                    toast.classList.remove('hidden');
                    
                    // 💡 3초 뒤에 자동으로 토스트 숨기고 페이지 이동시키는 꿀팁 문법
                    setTimeout(() => {
                        toast.classList.add('hidden');
                        window.history.pushState({}, "", "/posts");
                        if (typeof router === 'function') router();
                    }, 3000); 
                }
            })
            .catch((error) => {
                console.error(error.message);
            });

    
    });


    // 비밀번호 이벤트 감지 + 버튼 활성화
    function toggleSubmitButton() {

        // 비밀번호와 비밀번호 확인 모두 유효성 검사를 통과할때 css 변경
        if (isPwdValid && isPwdCheckValid) {
            btnSubmitPassword.disabled = false;
        } else {
            btnSubmitPassword.disabled = true;
        }
    }
    
}
//비밀번호 유효성 검사

function validatePassword(password) {
    const passwordHelper = document.getElementById("passwordHelperText");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
            
        
    // 비밀번호가 비어있을 때
    if(password === ""){
        passwordHelper.textContent = "*비밀번호를 입력해주세요.";
        passwordHelper.classList.remove("hidden");
        return false;
    }
    // 비밀번호 유효성 검사에 맞지 않을 때
    else if (!passwordRegex.test(password)) {
        passwordHelper.textContent = "*비밀번호는 8~20자이며 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
        passwordHelper.classList.remove("hidden");
        return false;
    }
    // 비밀번호 정상적으로 작성했을 때
    else {
        passwordHelper.textContent = "";
        passwordHelper.classList.add("hidden");
        return true;
    }

}

function validatePasswordCheck(password, passwordCheck) {
    const passwordHelper = document.getElementById("passwordHelperText");
    const passwordCheckHelper = document.getElementById("passwordConfirmHelperText");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
          
    // 비밀 번호 확인 비어있을 때
    if(passwordCheck === ""){
        passwordCheckHelper.textContent = "*비밀번호를 한번더 입력해주세요";
        passwordCheckHelper.classList.remove("hidden");
        return false;
    }

    // 비밀번호 유효성 검사에 맞지 않을 때
    else if (!passwordRegex.test(passwordCheck)) {
        passwordCheckHelper.textContent = "*"
        passwordCheckHelper.classList.remove("hidden");
        return false;
    }

    // 비밀 번호 확인과 다를 때
    else if (password !== passwordCheck){
        passwordCheckHelper.textContent = "*비밀번호가 다릅니다.";
        passwordCheckHelper.classList.remove("hidden");
        return false;
    }
    else {
        passwordCheckHelper.textContent = "";
        passwordCheckHelper.classList.add("hidden");
        return true;
    }

}
