import { renderPostWriteLayout } from './dom.js';
import { initPostWriteEvents } from './event.js';
import { getPostDetail } from '../../services/postService.js';
import { headerEvents } from "../../common/headerEvents.js";


export function initPostWritePage(postId) {
    document.getElementById('app').innerHTML = renderPostWriteLayout();
    document.body.classList.add('logged-in');

    const userId = sessionStorage.getItem('userId');
    
    // 기존 내용 채워주기
    if (postId !== null) {
        getPostDetail(postId)
            .then((response) => {
                document.getElementById('postTitleInput').value = response.data.title;
                document.getElementById('postContentInput').value = response.data.content;
                
                // 당연히 제목이랑 내용이 있을거란 가정 하에 일단 버튼 활성화 함. 만약에 input이 시작되면 initPostWriteEvents에서 처리
                document.getElementById('postSubmitBtn').classList.add("active");
                document.getElementById('writeHelperText').classList.add("hidden");
            });
    }

    document.body.classList.add('logged-in');
    headerEvents(userId);
    

    initPostWriteEvents(postId);

}