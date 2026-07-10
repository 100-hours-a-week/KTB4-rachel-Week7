import { renderPostsLayout, renderPostItems } from './dom.js';
import { initPostsEvents } from './event.js';
import { Allposts } from '../../services/postService.js';
import { headerEvents } from "../../common/headerEvents.js";


export async function initPostsPage() {
    console.log('post index.js 진입');
    // 초기 10개 게시글만 보임(제목 26자로 잘림, 좋아요 수/댓글수/조회수/작성자이름)
    document.getElementById('app').innerHTML = renderPostsLayout();
    document.body.classList.add('logged-in');
    console.log(document.cookie);
    const userId = sessionStorage.getItem('userId');
    
    console.log(`try 구문 밖, posts index.js는 들어왔음`);
    try {
        
        console.log(`try 구문 안, posts index.js는 들어왔음`);    
        const posts = await Allposts(); // TODO: posts 조회해보기
        const postListContainer= document.getElementById('postListContainer');
        
        const limitedPosts = posts && posts.length > 0 ? posts.slice(0, 10) : []; 
        postListContainer.innerHTML = renderPostItems(posts);
    }
    catch (error) {
        console.error("게시글 목록을 화면에 표시하는 중 오류 발생:", error);
    }

    document.body.classList.add('logged-in');
    headerEvents(userId);
    
    initPostsEvents(); // TODO: 이벤트는 무한 스크롤, 개별 페이지로 이동
   
}


