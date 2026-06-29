// 사용자 행동 처리하는 파일 - event.js
// signup 페이지에서 해당 페이지의 로직(이벤트, API, 유효성)처리

import { signup } from '../../services/authService.js';
import { router } from '../../../main.js';

export function initSignupEvents() {
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const passwordCheckInput = document.getElementById("passwordCheckInput");
    const nicknameInput = document.getElementById("nicknameInput");
    const profileImgInput = document.getElementById("profileImgInput");
    // const signupSubmitBtn = document.getElementById("signupSubmitBtn"); // <form> html 문법 특성사 버튼을 누르는 순간 화면이 새로고침되면서 모든 콘솔과 네트워크 기록이 날아감
    const form = document.getElementById("signupForm");
    const goToLoginBtn = document.getElementById("goToLoginBtn");
    const backBtn = document.getElementById("backBtn");
   
    //이메일 유효성 검사
    emailInput.addEventListener("input", () => {
        validateEmail(emailInput.value.trim());
    });

    //비밀번호 유효성 검사 
    passwordInput.addEventListener("input", () => {
        validatePassword(passwordInput.value.trim());
        validatePasswordCheck(passwordInput.value.trim(), passwordCheckInput.value.trim());

    });

    
    //닉네임 유효성 검사
    nicknameInput.addEventListener("input", () => {
        validateNickname(nicknameInput.value.trim());
    });

    // 프로필 이미지 넣기
    profileImgInput.addEventListener("change", () => { // 1. change가 무엇인지 2.이미지값은 어떻게 받아올지
        console.log("이미지 변경됨");
    })

    // 로그인 하기 버튼 눌렀을 때 로그인 페이지로 이동
    goToLoginBtn.addEventListener("click", () => {
        window.history.pushState({},'','/login');
        router();
    })

    //뒤로가기
    if (backBtn) { // 그냥 if문없이 addEventListener랑 if있는거랑 차이
    backBtn.addEventListener("click", () => {
        window.history.pushState({}, '', '/login');
        router();
    });
}


    // '회원 가입' 버튼 눌렀을 떄 서버에 데이터가 전송
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userRequest = {
            email: emailInput.value.trim(),
            password : passwordInput.value.trim(),
            passwordCheck : passwordCheckInput.value.trim(),
            nickname : nicknameInput.value.trim(),
            profileImg: profileImgInput.value.trim(),
        }

        signup(userRequest).then((response) => {
        //응답을 json으로 파싱
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        return response.json();
        })
        .then((data) => {
        console.log("서버가 준 응답: ", data);
        //
        })
        .catch((error) => {
        console.error(error.message);
        });
    })

}

function validateEmail(email) {
    const emailHelper = document.getElementById("emailHelper");    
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
    // 이메일이 비었을 떄
    if (email === "") {
        emailHelper.textContent = `*이메일을 입력해주세요`;
        emailHelper.classList.add("helper-error");
    }

    // 이메일 형식이 유효하지 않을때
    else if (!EMAIL_REGEX.test(email)) {
        emailHelper.textContent = "*올바른 이메일 주소 형식을 입력해주세요.(예: example@example.com)";
        emailHelper.classList.add("helper-error");
    }

        // 정상적으로 작성하였을 떄
    else {
        emailHelper.textContent = "";
        emailHelper.classList.remove("helper-error");
    }

}

function validatePassword(password) {
    const passwordHelper = document.getElementById("passwordHelper");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
            
        
    // 비밀번호가 비어있을 때
    if(password === ""){
        passwordHelper.textContent = "*비밀번호를 입력해주세요.";
        passwordHelper.classList.add("helper-error");
    }
    // 비밀번호 유효성 검사에 맞지 않을 때
    else if (!passwordRegex.test(password)) {
        passwordHelper.textContent = "*비밀번호는 8~20자이며 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
        passwordHelper.classList.add("helper-error");
    }
    // 비밀번호 정상적으로 작성했을 때
    else {
        passwordHelper.textContent = "";
        passwordHelper.classList.remove("helper-error");
    }

}

function validatePasswordCheck(password, passwordCheck) {
    const passwordHelper = document.getElementById("passwordHelper");
    const passwordCheckHelper = document.getElementById("passwordCheckHelper");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
          
    // 비밀 번호 확인 비어있을 때
    if(passwordCheck === ""){
        passwordCheckHelper.textContent = "*비밀번호를 한번더 입력해주세요";
        passwordCheckHelper.classList.add("helper-error");
    }

    // 비밀번호 유효성 검사에 맞지 않을 때
    else if (!passwordRegex.test(passwordCheck)) {
        passwordCheckHelper.textContent = "*"
        passwordCheckHelper.classList.add("helper-error");
    }

    // 비밀 번호 확인과 다를 때
    else if (password !== passwordCheck){
        passwordCheckHelper.textContent = "*비밀번호가 다릅니다.";
        passwordCheckHelper.classList.add("helper-error");
    }
    else {
        passwordCheckHelper.textContent = "";
        passwordCheckHelper.classList.remove("helper-error");
    }
}

function validateNickname(nickname) {
    const nicknameHelper = document.getElementById("nicknameHelper");
    
    // 닉네임이 비어있을 때
    if(nickname === ""){
        nicknameHelper.textContent = "*닉네임을 입력해주세요";
        nicknameHelper.classList.add("helper-error");
    }
    else if(nickname.includes(" ")){
        nicknameHelper.textContent = "*띄어쓰기를 없애주세요";
        nicknameHelper.classList.add("helper-error");
    }
    else if(nickname.length > 10){
        nicknameHelper.textContent= "*닉네임은 최대 10자까지 작성 가능합니다";
        nicknameHelper.classList.add("helper-error");    
    }
    else {
        nicknameHelper.textContent = "";
        nicknameHelper.classList.remove("helper-error");
    }



}


