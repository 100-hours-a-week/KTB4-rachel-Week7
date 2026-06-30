import { initSignupPage } from './js/pages/signup/index.js';
import { initLoginPage } from './js/pages/login/index.js';
import { initPostsPage } from './js/pages/posts/index.js';
import { initPostDetailPage } from './js/pages/postDetail/index.js';
import { initPostWritePage } from './js/pages/postWrite/index.js';


const routes = {
    '/': 'signup',
    '/signup' : 'signup',
    '/login' : 'login',
    '/user/edit' : 'userUpdateNickname',
    '/user/password' : 'userUpdatePassword',
    '/posts' : 'post',
    '/post/write' : 'postWrite'
};

// 라우터 함수: 현재 주소에 맞는 페이지를 화면에 렌더링
export function router() {
    const path = window.location.pathname; // 유저가 처음 브라우저에 접속했을 때 url
    const state = window.history.state;
    
    console.log(`현재 지금 path는 ${path}이고, state는 ${JSON.stringify(state)} 이면서..`);

    // 경우의 수 1: postId으로 상세페이지 접근할때 /post/2111, 경우의 수2: postId으로 상세페이지에서 '수정 페이지'에 갈때 post/write
    if(state && state.postId) { // state 상태 객체가 존재하고, 그 안에 postId도 넘겨왓을 때
        const postId = state.postId;
        
        if (path.startsWith("/post/write")) {
            render("postWrite", postId);
            return;
        }
        
        render("postDetail", postId, null);
        return;
    } 

    // 유저 id 가져올때
    if(state && state.userId) {

        const userId = state.userId;

        console.log(`user id: ${JSON.stringify(userId)}가지고, 원래 ${userId} router함수 내부에오.`);
        
        if(path.startsWith("/user/edit")) {
            render("userUpdateNickname", null ,userId);
            return;
        }
        

        if(path.startsWith("/user/password")) {
            render("userUpdatePassword", null ,userId);
            return;
        }
    }

    // if (path.startsWith("/post/")) {

    //     //const postId = window.location.pathname.split("/")[2]; // 꼭 이거 아닐 수 있는데 어떻게 id만 가져오지
    //     const postId = state.postId;

    //     render("postDetail", postId);
    //     return;
    // }


    if (routes[path]) {
        render(routes[path]);
        return;
    }

    render('signup'); // 아무것도 매핑되는 것이 없을 떄
    
    }



async function render(pageKey, postId = null, userId = null) {

    // 회원가입 화면 렌더링
    if (pageKey == 'signup') {
        try {
            const module = await import("./js/pages/signup/index.js"); 
            module.initSignupPage();
        } catch (error) {
            console.error("회원가입 페이지를 불러오는 중 오류가 발생했습니다:", error);
        }
    }

    // 로그인 화면 렌더링
    if (pageKey == 'login') {
        try{
            const module = await import("./js/pages/login/index.js");
            module.initLoginPage();
        }
        catch (error) {
            console.error("회원가입 페이지를 불러오는 중 오류가 발생했습니다:", error);
        }
    }

    //게시글 목록 렌더링
    if (pageKey === 'post') {
        try {
            const module = await import("./js/pages/posts/index.js");
            module.initPostsPage();
        } catch (error) {
            console.error("게시글 페이지를 불러오는 중 오류가 발생했습니다:", error);
        }
    }

    // 게시글 상세 페이지 렌더링
    if (pageKey === "postDetail") {
        try {
            const module = await import("./js/pages/postDetail/index.js");
            module.initPostDetailPage(postId);
        } catch (error) {
            console.error("상세 페이지를 불러오는 중 오류가 발생하였습니다:  ",error);
        }
    }

    // 게시글 수정 페이지 렌더링
    if (pageKey === "postWrite") {
        try {
            const module = await import("./js/pages/postWrite/index.js");
            module.initPostWritePage(postId);
        } catch (error) {
            console.error("게시글 수정 페이지를 불러오는 중 오류가 발생하였습니다:  ",error);
        }
    }

    // 회원정보수정 - 닉네임 수정 페이지 렌더링
    if (pageKey === "userUpdateNickname") {
        console.log(`유저 아이디: ${userId}를 가지고 닉네임 수정 페이지를 렌더링`);
        try {
            const module = await import("./js/pages/userUpdateNickname/index.js");
            module.initUserUpdateNicknamePage(userId);
        } catch (error) {
            console.error("유저 닉네임 수정 페이지를 불러오는 중 오류가 발생하였습니다:  ",error);
        }
    }

    // 회원정보수정 - 비밀번호 수정 페이지 렌더링 
    if (pageKey === "userUpdatePassword") {
        console.log(`유저 아이디: ${userId}를 가지고 비밀번호 수정 페이지를 렌더링`);
        try {
            const module = await import("./js/pages/userUpdatePassword/index.js");
            module.initUserUpdatePassword(userId);
        } catch (error) {
            console.error("유저 비밀번호 수정 페이지를 불러오는 중 오류가 발생하였습니다:  ",error);
        }
    }

}



// 첫화면 로드
window.addEventListener('DOMContentLoaded', router); 

// 뒤로가기
window.addEventListener('popstate', router);


