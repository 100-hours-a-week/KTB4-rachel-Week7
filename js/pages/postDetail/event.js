import {createLike, deletePost, deleteLike, createComment, deleteComment } from '../../services/postService.js';
import { router } from '/main.js'; 
import { formatCount } from './dom.js';

export function initPostDetailEvents(postId, currentUserId) {
    const editPostBtn = document.getElementById('editPostBtn');
    const deletePostBtn = document.getElementById('deletePostBtn');
    const likeToggleBtn = document.getElementById('likeToggleBtn');
    const commentTextArea = document.getElementById('commentTextArea');
    const commentSubmitBtn = document.getElementById('commentSubmitBtn');
    const commentListContainer = document.getElementById('commentListContainer');
    const commentEdit = document.getElementById('btn-comment-edit');
    
    // 상태 관리 변수들
    let isEditMode = false;
    let editingCommentId = null;

    // 수정 클릭시 수정페이지로 이동
    editPostBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.history.pushState({postId : postId}, '', '/post/write/${postId}');
        router(); 
    });


    // 삭제 클릭시 확인 모달
    deletePostBtn.addEventListener("click", () => {
        const PostDetailDialog = document.getElementById("PostDetailDialog");
        
        PostDetailDialog.showModal();
        document.getElementById('globalModalOverlay').classList.remove('hidden');
        
        // 취소 
        document.getElementById('modalCancelBtn').addEventListener("click", () => {
            PostDetailDialog.close();
            document.getElementById('globalModalOverlay').classList.add('hidden');
        
        }) 

        // 확인(삭제)
        document.getElementById('modalConfirmBtn').addEventListener("click", () => {
            
            const PostDeleteRequestDto = {
                userId : currentUserId
            }

            deletePost(postId, PostDeleteRequestDto)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }  
                return response.json();
            })
            .then((data) => {
                console.log("서버가 준 응답: ", data);

                window.history.pushState({},"", "/posts");
                router();
                    
            })
            .catch((error) => {
                console.error(error.message);
            });

            PostDetailDialog.close();
            document.getElementById('globalModalOverlay').classList.add('hidden');
            
            
        })
    });
    
    //좋아요 클릭 활성화 및 카운트 변경 fetch
    likeToggleBtn.addEventListener("click", async () => {
        //TODO: 바로 바로 업데이트 되는게 맞는지? fetch 지연로딩이면 프론트에서 처리따로 안하고 일반적으로 fetch하면 되는건지?
        
        let curLike = (likeToggleBtn.dataset.liked === "true"); // 괄호와 일치하면 true, 일치하지않으면 false 반환 //html의 속성가져오는건 dataset. 근데 boolean이 아니라 무조건 문자열
        let likeCountValue = document.getElementById("likeCountValue");

        // 좋아요 생성
        if (!curLike)
        {

            const LikeRequestDto = {
                isLike : true
            }

            
            if (!currentUserId) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }

            console.log("내 유저 ID:", currentUserId);


            createLike(postId, currentUserId, LikeRequestDto)
            .then((response) => {
                    
                if(!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                } 
                return response.json();
            })
            .then((data) => {
                console.log(`정상적으로 서버에게 응답을 받았고, 내가 보낸 좋아요는: ${LikeRequestDto} 혹시나 ${JSON.stringify(LikeRequestDto)}`);
                console.log("서버가 준 응답: ", data);
                likeToggleBtn.dataset.liked = "true";
                
                //바로 좋아요 html이 보이도록
                let currentLikeCount = parseInt(likeCountValue.textContent.replace('k', '000'), 10) || 0;
                likeCountValue.textContent = formatCount(currentLikeCount + 1);
                    
            })
            .catch((error) => {
                console.error(error.message);
            });
        }
        // 좋아요 취소
        else {
        
            
            const LikeRequestDto = {
                isLike : false
            }

            
            if (!currentUserId) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }

            console.log("내 유저 ID:", currentUserId);


            deleteLike(postId,currentUserId, LikeRequestDto).then((response) => {
                    
                    if(!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
                    
                    return response.json();
                    })
                    .then((data) => {

                    console.log(`정상적으로 서버에게 응답을 받았고, 내가 보낸 좋아요는: ${LikeRequestDto} 혹시나 ${JSON.stringify(LikeRequestDto)}`);
                    console.log("서버가 준 응답: ", data);
                    likeToggleBtn.dataset.liked = "false";


                    //바로 좋아요 html이 보이도록
                    let currentLikeCount = parseInt(likeCountValue.textContent.replace('k', '000'), 10) || 0;
                    likeCountValue.textContent = formatCount(currentLikeCount - 1);
                    
                    })
                    .catch((error) => {
                    console.error(error.message);
                    });



        }

        
    });

    
    // 댓글 생성과 수정을 동시에 + fetch
    commentTextArea.addEventListener("input", () => {
        const hashContent = commentTextArea.value.length > 0;
        commentSubmitBtn.disabled = !hashContent; //true or false로 들어감. 해제가 false
    });

    commentSubmitBtn.addEventListener("click", async(e) => {
        e.preventDefault();


        if (!currentUserId) {
            alert("로그인이 필요한 서비스입니다.");
            return;
        }

        console.log("내 유저 ID:", currentUserId);


        const CommentRequestDto = {
            commentContent : commentTextArea.value(),
            userId : currentUserId
        }

        createComment(postId, CommentRequestDto).then((response) => {
            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
                    
            return response.json();
            })
            .then((data) => {
            console.log("서버가 준 응답: ", data);
                    
            })
            .catch((error) => {
            console.error(error.message);
            });
    

    });




}