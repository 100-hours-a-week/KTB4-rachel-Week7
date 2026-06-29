import { createPost, updatePost, getPostDetail } from '../../services/postService.js';
import { router } from '/main.js';

export async function initPostWriteEvents(targetPostId = null) { // 없으면 null
    const postWriteForm = document.getElementById('postWriteForm');
    const postTitleInput = document.getElementById('postTitleInput');
    const postContentInput = document.getElementById('postContentInput');
    const writeHelperText = document.getElementById('writeHelperText');
    const postImageInput = document.getElementById('postImageInput');
    const postSubmitBtn = document.getElementById('postSubmitBtn');
    const currentUserId = sessionStorage.getItem('userId');
    

    function checkFormValidity() {
        const isTitleExist = postTitleInput.value.trim() !== "";
        const isContentExist = postContentInput.value.trim() !== "";

        if (isTitleExist && isContentExist) {
            postSubmitBtn.disabled = false;
            postSubmitBtn.classList.add("active");
            writeHelperText.classList.add("hidden");
        } else {
            postSubmitBtn.disabled = true;
            postSubmitBtn.classList.remove("active");
            writeHelperText.classList.remove("hidden");
        }
}

    // 기존 내용 채워주기
    if (targetPostId !== null) {
        getPostDetail(targetPostId)
            .then((response) => response.json())
            .then((data) => {
                postTitleInput.value = data.title;
                postContentInput.value = data.content;
                checkFormValidity();
            });
    }


    postTitleInput.addEventListener("input", () => {
        checkFormValidity();
    });

    postContentInput.addEventListener("input", () => {
        checkFormValidity();
    });


    postWriteForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const titleValue = postTitleInput.value.trim();
        const contentValue = postContentInput.value.trim();

        // 헬퍼 텍스트 제어..
        if (titleValue.length === 0 || contentValue.length === 0) {
            writeHelperText.classList.remove("hidden");
            return;
        }

        if (!currentUserId) {
            alert("로그인이 필요한 서비스입니다.");
            return;
        }

        
        const postRequestData = {
            title: titleValue,
            content: contentValue
        };

        // 이미지를 어떻게 넣어야할지 모르겠다.        
        // if (postImageInput.files && postImageInput.files[0]) {
        // }

        // 생성 또는 수정 - api 분기
        if (targetPostId !== null) {
            updatePost(targetPostId, postRequestData)
                .then((response) => {
                    if(!response.ok) throw new Error(`Response status: ${response.status}`);
                    return response.json();
                })
                .then((data) => {
                    console.log("서버가 준 수정 응답: ", data);
                    window.history.pushState({}, "", `/post/${targetPostId}`); // 상세페이지로 복귀
                    router();
                })
                .catch((error) => console.error(error.message));
        } else {
            createPost(currentUserId, postRequestData)
                .then((response) => {
                    if(!response.ok) throw new Error(`Response status: ${response.status}`);
                    return response.json();
                })
                .then((data) => {
                    console.log("서버가 준 생성 응답: ", data);
                    window.history.pushState({}, "", "/post");
                    router();
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
        
        });

    // 이미지 최대 1장만 가능
    postImageInput.addEventListener("change", () => {
        const files = postImageInput.files;
        if (files.length > 1) {
            alert("이미지는 최대 1개까지만 첨부할 수 있습니다.");
            postImageInput.value = ""; 
        }
    });
}