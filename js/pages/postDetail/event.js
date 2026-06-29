import {createLike, deleteLike, createComment, deleteComment } from '../../services/postService.js';

export function initPostDetailEvents(postId) {
    const editPostBtn = document.getElementById('editPostBtn');
    const deletePostBtn = document.getElementById('deletePostBtn');
    const likeToggleBtn = document.getElementById('likeToggleBtn');
    const currentUserId = sessionStorage.getItem('userId');
    const commentTextArea = document.getElementById('commentTextArea');
    const commentSubmitBtn = document.getElementById('commentSubmitBtn');
    const commentListContainer = document.getElementById('commentListContainer');
    const commentEdit = document.getElementById('btn-comment-edit');
    
    // 상태 관리 변수들
    let isLike = likeToggleBtn.dataset.like; //html의 속성가져오는건 dataset. 근데 boolean이 아니라 무조건 문자열
    let isEditMode = false;
    let editingCommentId = null;

    // 수정 클릭시 수정페이지로 이동
    editPostBtn.addEventListener("click", () => {
        window.history.pushState({}, '', '/post/write'); // 왜 수정페이지 제대로 안가지
        render();
    });

    // 삭제 클릭시 확인 모달
    deletePostBtn.addEventListener("click", () => {
        document.getElementById('globalModalOverlay').classList.remove('hidden');
    });
    
    //좋아요 클릭 활성화 및 카운트 변경 fetch
    likeToggleBtn.addEventListener("click", async () => {
        //TODO: 바로 바로 업데이트 되는게 맞는지? fetch 지연로딩이면 프론트에서 처리따로 안하고 일반적으로 fetch하면 되는건지?
        
        // 좋아요 생성
        if (isLike == "false")
        {
            isLike = "true";

            const LikeRequestDto = {
                isLike : true
            }

            
            if (!currentUserId) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }

            console.log("내 유저 ID:", currentUserId);


            createLike(postId,currentUserId, LikeRequestDto).then((response) => {
                    
                    if(!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
                    
                    return response.json();
                    })
                    .then((data) => {
                    console.log("서버가 준 응답: ", data);
                    //
                    })
                    .catch((error) => {
                    console.error(error.message);
                    });
        }
        // 좋아요 취소
        else {
            isLike = "false";

            const LikeRequestDto = {
                isLike : false
            }

            
            if (!currentUserId) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }

            console.log("내 유저 ID:", currentUserId);


            createLike(postId,currentUserId, LikeRequestDto).then((response) => {
                    
                    if(!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
                    
                    return response.json();
                    })
                    .then((data) => {
                    console.log("서버가 준 응답: ", data);
                    //
                    })
                    .catch((error) => {
                    console.error(error.message);
                    });



        }

        
    });

    // 댓글 부분..
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