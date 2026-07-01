import { getPostDetail } from '../../services/postService.js';
import { getUser } from '../../services/authService.js';
import { renderEditPasswordLayout } from './dom.js'; 
import { initUserUpdatePasswordEvents } from './event.js';

export function initUserUpdatePassword(currentUserId) {
    // 유저 데이터 찾아오기
    if (currentUserId !== null) {

        getUser(currentUserId)
        .then((response) => {
            console.log(`response 내용: ${response}`);
            console.log(`response data 내용: ${response.data}`);
            
            document.getElementById('app').innerHTML = renderEditPasswordLayout();
            document.body.classList.add('logged-in');


            initUserUpdatePasswordEvents(currentUserId);
        })
        .catch((error) => {
            console.log('getUser 로드 실패1. updatepassword index.js는 왔는데 에러발생');
        })

    }
    else {
        console.log('getUser 로드 실패2. updatepassword index.js는 왔는데 에러발생');
        
        document.getElementById('app').innerHTML = renderEditPasswordLayout();
        initUserUpdatePasswordEvents(currentUserId);
    }

    
}