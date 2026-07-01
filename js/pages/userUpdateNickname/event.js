import { updateNicknameProfileImg } from '../../services/authService.js';
import { router } from '../../../main.js';

export function initUserUpdateNicknameEvents(currentUserId) {
    const profileImageInput = document.getElementById('profileImageInput');
    const nicknameInput = document.getElementById('nicknameInput');
    const btnSubmitEdit = document.getElementById('btnSubmitEdit');
    const editProfileForm = document.getElementById('editProfileForm');
    const btnWithdrawal = document.getElementById('btnWithdrawal'); // 회원 탈퇴 버튼

    let isEditable = true;
    
    // 수정 버튼 눌렀을때 - 유효성 검사 + 버튼 활성화/비활성화
    nicknameInput.addEventListener("input", () => {
        isEditable = validateNickname((nicknameInput.value.trim()));
    })

    profileImageInput.addEventListener("input", () => {
        profileImageInput.innerText = profileImageInput.value.trim(); // 프로필은 바로 바꾸는거 가능
    })

    //수정 버튼 눌렀을때, 근데 활성화 버튼 어카지
    btnSubmitEdit.addEventListener("click", (e) => {
        console.log("btnSubmitEdit 이벤트 안에는 들어가네요. 브라우저 콘솔에 찍히나요?"); // 👈 이거 찍히는지 확인!
        e.preventDefault();
        // 버튼 활성화여부
        if(isEditable){
            document.getElementById('toast-complete-wrapper').classList.remove('hidden');
        }
        else{
            document.getElementById('toast-complete-wrapper').classList.add('hidden');
        }


        const UserUpdateRequestDto = {
            nickname : nicknameInput.value.trim(),
            profileImage : profileImageInput.value ? profileImageInput.value.trim() : ""
        }

        updateNicknameProfileImg(currentUserId, UserUpdateRequestDto)
            .then((response) => {
                if(!response.ok) throw new Error(`Response status: ${response.status}`); // throw new IllegalArgumentException("이미 존재하는 닉네임입니다."); 이것만 따로 처리 못하나?
                return response.json();
            })  
            .then((data) => {
                console.log("서버가 준 생성 응답: ", data);
                window.history.pushState({}, "", "/posts");
                router();
            })
            .catch((error) => {
                console.error(error.message);
            });
    })

    // 회원 탈퇴 모달
    btnWithdrawal.addEventListener("click", () => {
        const withdrawalDialog = document.getElementById('withdrawalDialog');

        withdrawalDialog.showModal();
        document.getElementById('withdrawalModalOverlay').classList.remove('hidden');
        
        // 취소 
        document.getElementById('withdrawalCancelBtn').addEventListener("click", () => {
            withdrawalDialog.close();
            document.getElementById('withdrawalModalOverlay').classList.add('hidden');
        
        }) 

        // 확인(삭제)
        document.getElementById('withdrawalConfirmBtn').addEventListener("click", () => {

            deleteUser(currentUserId)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("서버가 준 응답: ", data);
                window.history.pushState({},"", "/login");
                router();
            })
            .catch((error) => {
                console.error(error.message);
            });
            
            withdrawalDialog.close();
            document.getElementById('withdrawalModalOverlay').classList.add('hidden');
            
        })
        

    })

}

// 닉네임 유효성 검사
function validateNickname(nickname, userData) {
    const nicknameHelperText = document.getElementById('nicknameHelperText');


    // 닉네임 비었을 때
    if(nickname ===""){
        nicknameHelperText.textContent = "*닉네임을 입력해주세요.";
        nicknameHelperText.classList.add("helper-error");
        return false;
    }
    // 닉네임 11자 이상 작성시: *닉네임은 최대 10자까지 작성 가능합니다.
    if(nickname.length > 10){
        nicknameHelperText.textContent = "* *닉네임은 최대 10자까지 작성 가능합니다..";
        nicknameHelperText.classList.add("helper-error");
        return false;
    }

    return true;
}

