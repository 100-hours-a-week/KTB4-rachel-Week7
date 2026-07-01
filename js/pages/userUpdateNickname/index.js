import { getPostDetail } from '../../services/postService.js';
import { getUser } from '../../services/authService.js';
import { renderEditProfileLayout } from './dom.js'; 
// import { initUserUpdateNicknameEvents } from './events';


export function initUserUpdateNicknamePage(currentUserId) {
    // 유저 데이터 찾아오기
    if (currentUserId !== null) {

        // 원래는 GET으로 유저의 정보(닉네임, 이메일, 프로필 이미지, 비밀번호)를 가지고 올 수 있어야 한다. 하지만 본인의 dto는 해당조건을 충족하는 dto가 없고 컨트롤러의 dto를 수정하면 다른 곳도 많이 수정해야해서.. 다른 방법으로 대체함
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