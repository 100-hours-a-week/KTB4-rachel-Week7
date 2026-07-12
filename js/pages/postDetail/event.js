import {createLike, deletePost, deleteLike, createComment, updateComment, deleteComment } from '../../services/postService.js';
import { router } from '/main.js'; 
import { formatCount, renderCommentItems } from './dom.js';

export function initPostDetailEvents(postId, currentUserId, authorId) {
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
    let currentEditingCommentId = null;

    // 수정 클릭시 수정페이지로 이동
    editPostBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // 작성자 authorId가 현재 접속자 currentuserId와 같은지 확인
        if (authorId === currentUserId) {
            window.history.pushState({postId : postId}, '', '/post/write/${postId}');
            router(); 
        }
        else {
            alert("본인이 작성한 글이 아닙니다.");
        }
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

            // 작성자 authorId가 현재 접속자 currentuserId와 같은지 확인
            if (String(authorId) !== String(currentUserId)) {
                alert("본인이 작성한 글이 아닙니다.");
                return;
        }
            
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
        
        // 이미 눌렀는지 안눌렀지 확인은 어케해? api get해야한느건가? 어카지?

        let curLike = (likeToggleBtn.getAttribute('data-liked') === 'true'); // 괄호와 일치하면 true, 일치하지않으면 false 반환 //html의 속성가져오는건 dataset. 근데 boolean이 아니라 무조건 문자열
        let likeCountValue = document.getElementById("likeCountValue");

        // 좋아요 생성
        if (!curLike)
        {
            
            if (!currentUserId) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }

            console.log("현재 좋아요 누르는 유저 ID:", currentUserId);
            
            if(String(authorId) === String(currentUserId)) {
                alert("본인글에 좋아요를 누를 수 없습니다.");
                return;
            }

            const LikeRequestDto = {
                isLike : true
            }

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
                likeToggleBtn.setAttribute('data-liked', true);
                
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
        
            console.log('좋아요취소에 접근');
            
            
            if (!currentUserId) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }

            console.log("현재 좋아요 누르는 유저 ID:", currentUserId);


            deleteLike(postId,currentUserId).then((response) => {
                    
                    if(!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
                    
                    return response.json();
                    })
                    .then((data) => {

                    console.log("서버가 준 응답: ", data);
                    likeToggleBtn.setAttribute('data-liked', false);


                    //바로 좋아요 html이 보이도록
                    let currentLikeCount = parseInt(likeCountValue.textContent.replace('k', '000'), 10) || 0;
                    likeCountValue.textContent = formatCount(currentLikeCount - 1);
                    
                    })
                    .catch((error) => {
                    console.error(error.message);
                    });


        }

        
    });

    
    
    // 댓글 유효성 검사 및 버튼 활성화/비활성화 함수
    function toggleSubmitButton() {
        const hasContent = commentTextArea.value.trim().length > 0;
        
        if (hasContent) {
            commentSubmitBtn.disabled = false;
            commentSubmitBtn.classList.add("active"); // 활성화
        } else {
            commentSubmitBtn.disabled = true;
            commentSubmitBtn.classList.remove("active"); // 비활성화
        }
    }

    // 실시간 텍스트 입력 감지
    commentTextArea.addEventListener("input", toggleSubmitButton);

    
    // 댓글 생성
    commentSubmitBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        if (!currentUserId) {
            alert("로그인이 필요한 서비스입니다.");
            return;
        }

        const commentRequestDto = {
            commentContent: commentTextArea.value,
            userId: currentUserId
        };

        // 수정 모드(currentEditingCommentId값이 있을떄)
        if (currentEditingCommentId !== null) {
            updateComment(postId, currentEditingCommentId, commentRequestDto)
                .then((response) => {
                    if (!response.ok) throw new Error(`Response status: ${response.status}`);
                    return response.json();
                })
                .then((data) => {
                    console.log("서버가 준 응답 (수정): ", data);

                    // TODO: 댓글 생성 후 바로 화면에 보이도록
                    const commentItem = document.querySelector(`.comment-item[data-comment-id="${currentEditingCommentId}"]`);
                    
                    if (commentItem) {
                    
                        commentItem.querySelector(".comment-text").textContent = commentRequestDto.commentContent;
                        
                    }

                    // 폼 초기화
                    resetCommentForm();
                    
                    // 폼 초기화
                    currentEditingCommentId = null;
                    commentTextArea.value = "";
                    commentSubmitBtn.textContent = "댓글 등록";
                    toggleSubmitButton();

                    
                })
                .catch((error) => {
                    console.error(error.message);
                });
                
        // 생성 모드(currentEditingCommentId가 null일때)
        } else {
            createComment(postId, commentRequestDto)
                .then((response) => {
                    if (!response.ok) throw new Error(`Response status: ${response.status}`);
                    return response.json();
                })
                .then((data) => {
                    console.log("서버가 준 응답 (생성): ", data);
                    
                    if (data.message === "COMMENT_CREATED" && data.data) {
                    
                    
                    const newCommentHtml = renderCommentItems([{
                        commentId: data.data.commentId,
                        nickname: data.data.nickname, 
                        createdAt: data.data.createdAt,
                        content: commentRequestDto.commentContent 
                    }]);

                    
                    const emptyMessage = commentListContainer.querySelector(".empty-comments");
                    if (emptyMessage) {
                        emptyMessage.remove();
                    }

                    // 가장 위에 'afterbegin' / 가장 아래 'beforeend'
                    commentListContainer.insertAdjacentHTML('beforeend', newCommentHtml);
                }

                commentTextArea.value = "";
                toggleSubmitButton();
            })
            .catch((error) => {
                console.error(error.message);
            });
        }
    });


    
    commentListContainer.addEventListener("click", (e) => {
        const commentItem = e.target.closest(".comment-item");
        if (!commentItem) return;

        const commentId = commentItem.getAttribute("data-comment-id");

        // 수정 모드
        if (e.target.classList.contains("btn-comment-edit")) {
            const originText = commentItem.querySelector(".comment-text").textContent;
            commentTextArea.value = originText;
            
            toggleSubmitButton();
            
            commentSubmitBtn.textContent = "댓글 수정";
            currentEditingCommentId = commentId; 
            
            commentTextArea.focus();
        }

        // 댓글 삭제
        if (e.target.classList.contains("btn-comment-delete")) {
            if (!confirm("정말 삭제하시겠습니까?")) return;

            const commentDeleteReqeustDto = {
                userId: currentUserId
            };

            deleteComment(postId, commentId, commentDeleteReqeustDto)
                .then((response) => {
                    if (!response.ok) throw new Error(`Response status: ${response.status}`);
                    return response.json();
                })
                .then((data) => {
                    console.log("서버가 준 응답 (삭제): ", data);
                    
                    // 화면에서 지우기
                    commentItem.remove();
                    
                    if (currentEditingCommentId === commentId) {
                        resetCommentForm();
                    }
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
    });


    function resetCommentForm() {
        currentEditingCommentId = null;
        commentTextArea.value = "";
        commentSubmitBtn.textContent = "댓글 등록";
        validateCommentInput();
    }

}