import { getPostDetail } from '../../services/postService.js';
import { getUser } from '../../services/authService.js';
import { renderEditProfileLayout } from './dom.js'; 


export function initUserUpdateNicknamePage(currentUserId) {
    // 유저 데이터 찾아오기
    if (currentUserId !== null) {

        getUser(currentUserId)
        .then((response) => {
            console.log(`response 내용: ${response}`);
            console.log(`response data 내용: ${response.data}`);
            
            document.getElementById('app').innerHTML = renderEditProfileLayout(response.data);
            document.body.classList.add('logged-in');
        });
    }

    // initUserUpdateNicknameEvents(currentUserId);

}