import { renderPostsLayout, renderPostItems } from './dom.js';
import { initPostsEvents, loadMorePosts } from './event.js';
import { Allposts } from '../../services/postService.js';
import { headerEvents } from "../../common/headerEvents.js";


export async function initPostsPage() {
    
    const userId = sessionStorage.getItem('userId');
    
    
    try {
        document.getElementById('app').innerHTML = renderPostsLayout();

        // document.body.classList.add('logged-in'); // login한 유저다.
        headerEvents(userId);

        
        initPostsEvents();

        // 초기 10개 게시글 로드 
        await loadMorePosts();
    }
    catch (error) {
        console.error('게시글 전체 조회 중 오류:', error);
    } 

   
}


