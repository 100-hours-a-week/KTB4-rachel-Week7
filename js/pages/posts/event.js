import { router } from '/main.js'; 
import { Allposts } from '../../services/postService.js';
import { renderPostItems } from './dom.js';


// 상태 변수 정의
let currentPage = 1; // 현재 페이지 번호
const limit = 10; // 한번에 가져올 데이터 개수
let isLoading = false;  // 현재 데이터를 가져오는 중인지 여부(중복 실행 방지)
let hasMore = true; // 더 가져올 데이터가 남아있는지 여부

export function initPostsEvents() {
    console.log('posts의 event.js 진입')
    const writeBtn = document.getElementById('goToPostWriteBtn');
    const postListContainer = document.getElementById('postListContainer');

   
    // 게시글 작성 페이지로 이동
    writeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            history.pushState(null, '', '/post/write');
            router(); 
    });

    // 상세 페이지로 이동
    postListContainer.addEventListener('click', (e) => {
            // 클릭된 요소와 가장 가까운 .post-item 요소를 찾음
            const postItem = e.target.closest('.post-card');
            if (postItem) {
                const postId = postItem.dataset.id; // data-id="${post.postId}"
                history.pushState({postId: postId}, '', `/post/${postId}`);
                router();
            }
        });


    // 스크롤 이벤트 감지
    window.addEventListener("scroll", () => {
        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 150) {
            loadMorePosts();
        }
    })

}

// 인피니티 스크롤
export async function loadMorePosts() {
    if (isLoading || !hasMore) return // 이미 로딩 중이거나 더 가져올 데이터가 없으면 중단

    isLoading = true;

    try{
        const posts = await Allposts(); // 여기 시작하기전에

        console.log(`posts 데이터: ${posts}`);
        console.log(`posts의 길이: ${posts.data.length}`);
        // 더이상 가져올 데이터 없을 때
        if(posts.data.length < limit) {
            hasMore = false;
        }

        const postListContainer = document.getElementById('postListContainer');

        postListContainer.insertAdjacentHTML("beforeend", renderPostItems(posts));


    } catch (error) {
        console.error("데이터 로드 실패: ", error);
    } finally {
        isLoading = false; // 로딩끝. try구문에서오든, catch에서오든 finally을 거쳐간다 // 여기 방어막이 있어야 서버에 데이터 가져오기 전에 스크롤 내려도 isLoading을 제어
    }
}    
