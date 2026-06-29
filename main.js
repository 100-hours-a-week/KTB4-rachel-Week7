import { initSignupPage } from './js/pages/signup/index.js';
import { initLoginPage } from './js/pages/login/index.js';
import { initPostsPage } from './js/pages/posts/index.js';
import { initPostDetailPage } from './js/pages/postDetail/index.js';
import { initPostWritePage } from './js/pages/postWrite/index.js';



const routes = {
    '/': 'signup',
    '/signup' : 'signup',
    '/login' : 'login',
    // '/user/userInfo' : renderUserInfo, 
    // '/user/password' : renderUserPassword, 
    '/posts' : 'post',
    '/post/write' : 'postWrite'
};

// 라우터 함수: 현재 주소에 맞는 페이지를 화면에 렌더링
export function router() {
    const path = window.location.pathname; // 유저가 처음 브라우저에 접속했을 때 url
    
    
    if (routes[path]) {
        render(routes[path]);
        return;
    }

    if (path.startsWith("/post/")) {
        render("postDetail");
        return;
    }

    render('signup'); // 아무것도 매핑되는 것이 없을 떄

    }



async function render(pageKey) {

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

    if (pageKey === "postDetail") {
        try {
            const module = await import("./js/pages/postDetail/index.js");
            module.initPostDetailPage();
        } catch (error) {
            console.error("상세 페이지를 불러오는 중 오류가 발생하였습니다:  ",error);
        }
    }

    if (pageKey === "postWrite") {
        try {
            const module = await import("./js/pages/postWrite/index.js");
            module.initPostWritePage();
        } catch (error) {
            console.error("상세 페이지를 불러오는 중 오류가 발생하였습니다:  ",error);
        }
    }

}


// 첫화면 로드
window.addEventListener('DOMContentLoaded', router); 

// 뒤로가기
window.addEventListener('popstate', router);


// 테스트용
// window.addEventListener('DOMContentLoaded', () => {
//     // 주소창은 /posts로 강제로 바꾸고
//     history.pushState(null, '', '/posts');
//     // 라우터를 실행해 게시글 페이지를 그리게 만듭니다.
//     router();
// });