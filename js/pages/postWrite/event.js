import { createPost, updatePost, getPostDetail } from '../../services/postService.js';
import { router } from '/main.js';


export async function initPostWriteEvents(postId = null) { 
    const postWriteForm = document.getElementById('postWriteForm');
    const postTitleInput = document.getElementById('postTitleInput');
    const postContentInput = document.getElementById('postContentInput');
    const writeHelperText = document.getElementById('writeHelperText');
    const postImageInput = document.getElementById('postImageInput');
    const postSubmitBtn = document.getElementById('postSubmitBtn');
    const currentUserId = sessionStorage.getItem('userId');
        
    
    // // 사용자로부터 받은 이미지를 js가 이해할 수 있게 url 전환하는 함수
    // function createUrl(files) {
    //     // 이미지 파일 순회 // 요구사항은 최대 1개까지이지만, 이후에 이미지 여러장을 대비하여 for문으로 순회한다.
    //     for(file of postImageInput.files) {
    //         let imgUrl = URL.createObjectURL(file); // 서버한테 보내지는 못함
    //         ImgArray.push(imgUrl);
    //     }

    // }



    // 제목(필수)
    postTitleInput.addEventListener("input", () => {
        checkFormValidity();
    });

    // 내용(필수)
    postContentInput.addEventListener("input", () => {
        checkFormValidity();
    });


    // 이미지(선택, 최대 1장만 가능)
    postImageInput.addEventListener("change", () => {
        const files = postImageInput.files; 
        if (files.length > 1) {
            alert("이미지는 최대 1개까지만 첨부할 수 있습니다.");
            postImageInput.value = ""; 
        }

    });

    postWriteForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log(`제출버튼이 눌렸어요`);

        const titleValue = postTitleInput.value.trim(); // 이거랑 postTitleInput.textContext랑 textHTML 뭐가달라?
        const contentValue = postContentInput.value.trim();

        // 헬퍼 텍스트 제어
        if (titleValue.length === 0 || contentValue.length === 0) {
            writeHelperText.classList.add("hidden");
            return;
        }

        // 로그인 한 유저 확인
        if (!currentUserId) {
            alert("로그인이 필요한 서비스입니다.");
            return;
        }

        // 이미지 url 배열로 받아오기
        // createUrl(files); // 만약 postImageInput.addEventListener이 안일어나도 files은 있어야 하는거아냐?


        const postRequestData = {
            title: titleValue,
            content: contentValue,
            //images: postImageInput.files // // HTMLInputElement.files은 파일이 없어도 FileList의 인스턴스를 반환한다. 단 직접 호출할때만
            images : Array.from(postImageInput.files).map(file => URL.createObjectURL(file)) // 이거때문에 이미지를 수정하면 서로 다른 요청으로 보는데?
        };

        // 생성 또는 수정 - api 분기
        if (postId !== null) {
            console.log(`수정 서버에 보낼게요. 보낼 데이터: ${JSON.stringify(postRequestData)}`);
            updatePost(postId, postRequestData)
                .then((response) => {
                    if(!response.ok) throw new Error(`Response status: ${response.status}`);
                    return response.json();
                })
                .then((data) => {
                    console.log("서버가 준 수정 응답: ", data);
                    window.history.pushState({postId: postId}, "", `/post/${postId}`); // 상세페이지로 복귀
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
                    window.history.pushState({}, "", "/posts");
                    router();
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
        
        });

}

// 버튼 활성화/비활성화는 함수로 따로 뺴고 이벤트 발생 시, 호출
function checkFormValidity() {
    const isTitleExist = postTitleInput.value.trim() !== ""; // 비어있지 않다면 true
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