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
    const profilePreview = document.getElementById("profilePreview");
    const form = document.getElementById("signupForm");
    const goToLoginBtn = document.getElementById("goToLoginBtn");
    const backBtn = document.getElementById("backBtn");
    const signupSubmitBtn = document.getElementById("signupSubmitBtn");

    let isEmailValid = false;
    let isPasswordValid = false;
    let isNicknameValid = false;
    
    //이메일 유효성 검사
    emailInput.addEventListener("input", () => {
        isEmailValid = validateEmail(emailInput.value.trim());
        checkFormValidity();
    });

    //비밀번호 유효성 검사 
    passwordInput.addEventListener("input", () => {
        if (validatePassword(passwordInput.value.trim()) && validatePasswordCheck(passwordInput.value.trim(), passwordCheckInput.value.trim())) {
            isPasswordValid = true;
        }
        checkFormValidity();
    });

    //닉네임 유효성 검사
    nicknameInput.addEventListener("input", () => {
        isNicknameValid = validateNickname(nicknameInput.value.trim());
        checkFormValidity();
    });

    // 프로필 이미지 넣기 - 1. '프로필 사진 선택' 버튼 누를 때
    profileImgInput.addEventListener("change", (e) => { 
        ImageUpload(e);
        console.log("이미지 변경됨");
    })

    // 프로필 이미지 넣기 - 2. '+' 이미지 누를때
    document.querySelector('.upload-placeholder').addEventListener("click", function() {
        profileImgInput.click();
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
            alert('회원가입에 성공하였습니다.');

            window.history.pushState({},"", "/login");
            router();
        
        })
        .catch((error) => {
            console.error(error.message);
            alert(`회원가입 실패 ${error.message}`);
        });
    })

    function ImageUpload(event) {
        
        // 사용자가 선택한 파일 가져오기
        const file = event.target.files[0];

        if(file) { // files이 있다면
            const reader = new FileReader();
            
            // file 다 읽었을때
            reader.onload = function(e) {
                const imageUrl = e.target.result; // 이미지 임시 주소가 해당 변수에 담긴다.
                profilePreview.innerHTML = `
                <img src="${imageUrl}" alt="프로필 미리보기" style="width: 100%; height: 100%; object-fit: cover;">
            `; // TODO // 미리보기 영역에 <img> 태그를 동적으로 넣어준다.
            };

            reader.readAsDataURL(file); // 파일을 이미지 주소(Data url) 형태로 읽어오라고 명령


        };

        
    }

    // 이메일, 비번, 닉네임 유효성 검사 및 회원가입 버튼 활성화
    function checkFormValidity() {
    
        if (isEmailValid && isPasswordValid && isNicknameValid) { 
            signupSubmitBtn.disabled = false;    
        } else {
            signupSubmitBtn.disabled = true;
        }
    }

}

function validateEmail(email) {
    const emailHelper = document.getElementById("emailHelper");    
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
    const passwordHelper = document.getElementById("passwordHelper");
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

function validatePasswordCheck(password, passwordCheck) {
    const passwordHelper = document.getElementById("passwordHelper");
    const passwordCheckHelper = document.getElementById("passwordCheckHelper");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
          
    // 비밀 번호 확인 비어있을 때
    if(passwordCheck === ""){
        passwordCheckHelper.textContent = "*비밀번호를 한번더 입력해주세요";
        passwordCheckHelper.classList.add("helper-error");
        return false;
    }

    // 비밀번호 유효성 검사에 맞지 않을 때
    else if (!passwordRegex.test(passwordCheck)) {
        passwordCheckHelper.textContent = "*"
        passwordCheckHelper.classList.add("helper-error");
        return false;
    }

    // 비밀 번호 확인과 다를 때
    else if (password !== passwordCheck){
        passwordCheckHelper.textContent = "*비밀번호가 다릅니다.";
        passwordCheckHelper.classList.add("helper-error");
        return false;
    }
    else {
        passwordCheckHelper.textContent = "";
        passwordCheckHelper.classList.remove("helper-error");
        return true;
    }
}

function validateNickname(nickname) {
    const nicknameHelper = document.getElementById("nicknameHelper");
    
    // 닉네임이 비어있을 때
    if(nickname === ""){
        nicknameHelper.textContent = "*닉네임을 입력해주세요";
        nicknameHelper.classList.add("helper-error");
        return false;
    }
    else if(nickname.includes(" ")){
        nicknameHelper.textContent = "*띄어쓰기를 없애주세요";
        nicknameHelper.classList.add("helper-error");
        return false;
    }
    else if(nickname.length > 10){
        nicknameHelper.textContent= "*닉네임은 최대 10자까지 작성 가능합니다";
        nicknameHelper.classList.add("helper-error");    
        return false;
    }
    else {
        nicknameHelper.textContent = "";
        nicknameHelper.classList.remove("helper-error");
        return true;
    }



}


