import {login} from '../../services/authService.js';
import { router } from '../../../main.js';


export function initLoginEvents() {
    const emailInput = document.getElementById('loginEmailInput');
    const passwordInput = document.getElementById("loginPasswordInput");
    const loginForm = document.getElementById("loginForm");
    const goToSignupBtn = document.getElementById("goToSignupBtn");
    const loginSubmitBtn = document.getElementById("loginSubmitBtn");
   
    let isEmailValid = false;
    let isPasswordValid = false;


    //이메일 유효성 검사
    emailInput.addEventListener("input", () => {
        isEmailValid = validateEmail(emailInput.value.trim());
        checkFormValidity();
    });

    //비밀번호 유효성 검사 
    passwordInput.addEventListener("input", () => {
        isPasswordValid = validatePassword(passwordInput.value.trim());
        checkFormValidity();
    });

    

    // 로그인 버튼 클릭 시 - fetch 서버 확인 및 post 페이지이동
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const loginRequest = {
            email: emailInput.value.trim(),
            password : passwordInput.value.trim(),
    
        }

        // TODO: 서버 예외별로 alert처리해야함
        login(loginRequest).then((response) => {
                
                if(!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                
                return response.json(); // 받아온 데이터를 posts에 넘겨줘야 하는데 어떻게 넘기지?
                })
                .then((data) => {
                console.log("서버가 준 응답: ", data);
                
                // 이후에 회원 정보를 이용하기위함
                sessionStorage.setItem('userId', data.data.userId);
                sessionStorage.setItem('nickname', data.data.nickname);


                // 게시글 전체 조회 페이지로 이동
                window.history.pushState({},"", "/posts");
                router();
                })
                .catch((error) => {
                console.error(error.message);
                window.alert("이메일과 비밀번호를 확인해주세요.");
                });
            }
        
        
        )
    

    // '회원 가입' 페이지 이동
    goToSignupBtn.addEventListener("click", () => {
        window.history.pushState({},'','/signup');
        router();
    })

    // 이메일+비번 유효성검사 및 로그인버튼 활성화
    function checkFormValidity() {
    
        // 이메일과 비밀번호가 모두 유효성 검사를 통과할때 css 변경
        if (isEmailValid && isPasswordValid) { 
            loginSubmitBtn.disabled = false;    
        } else {
            loginSubmitBtn.disabled = true;
        }
    }

    

}



function validateEmail(email) {
    const emailHelper = document.getElementById("emailHelper");    // id 맞춰
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
    // 이메일이 비었을 떄
    if (email === "") {
        emailHelper.textContent = `*이메일을 입력해주세요`;
        emailHelper.classList.add("helper-error");
        return false;
    }

    // 이메일 형식이 유효하지 않을때
    else if (!EMAIL_REGEX.test(email)) {
        emailHelper.textContent = "*올바른 이메일 주소 형식을 입력해주세요.(예: example@example.com)";
        emailHelper.classList.add("helper-error");
        return false;
    }

        // 정상적으로 작성하였을 떄
    else {
        emailHelper.textContent = "";
        emailHelper.classList.remove("helper-error");
        return true;
    }

}

function validatePassword(password) {
    const passwordHelper = document.getElementById("passwordHelper"); // id 맞춰
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
            
        
    // 비밀번호가 비어있을 때
    if(password === ""){
        passwordHelper.textContent = "*비밀번호를 입력해주세요.";
        passwordHelper.classList.add("helper-error");
        return false;
    }
    // 비밀번호 유효성 검사에 맞지 않을 때
    else if (!passwordRegex.test(password)) {
        passwordHelper.textContent = "*비밀번호는 8~20자이며 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
        passwordHelper.classList.add("helper-error");
        return false;
    }
    // 비밀번호 정상적으로 작성했을 때
    else {
        passwordHelper.textContent = "";
        passwordHelper.classList.remove("helper-error");
        return true;
    }

}
