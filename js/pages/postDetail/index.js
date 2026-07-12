import { renderPostDetailLayout, renderCommentItems } from "./dom.js";
import { initPostDetailEvents } from "./event.js";
import { getPostDetail } from "../../services/postService.js"; // 처음부터 가져와야 해서
import { headerEvents } from "../../common/headerEvents.js";

export async function initPostDetailPage(postId) {
    console.log(postId); 

    const response = await getPostDetail(postId);
    const authorId = response.data.authorId; // 게시글 작성자.
    const userId = sessionStorage.getItem('userId'); // 현재 로그인한 사람
    console.log(`현재 로그인 한 사람: ${userId}, 게시글 작성자: ${authorId}`);

    // 내가 해당 게시글에 좋아요를 눌렀는지에 대한 api 호출 메서드를 따로 만들어야 하나?


    document.getElementById("app").innerHTML = renderPostDetailLayout(response.data); // 게시글 리본 레이아웃
    document.getElementById("commentListContainer").innerHTML = renderCommentItems(response.data.comments); // 댓글
    
    document.body.classList.add('logged-in');
    headerEvents(userId);
    initPostDetailEvents(postId, userId, authorId); //유저아이디어케넘겨주지
}