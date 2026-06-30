import { renderPostDetailLayout, renderCommentItems } from "./dom.js";
import { initPostDetailEvents } from "./event.js";
import { getPostDetail } from "../../services/postService.js"; // 처음부터 가져와야 해서

export async function initPostDetailPage(postId) {
    console.log(postId); 

    const response = await getPostDetail(postId);

    document.getElementById("app").innerHTML = renderPostDetailLayout(response.data); // 게시글 리본 레이아웃
    document.getElementById("commentListContainer").innerHTML = renderCommentItems(response.data.comments); // 댓글

    initPostDetailEvents(postId); //유저아이디어케넘겨주지
}