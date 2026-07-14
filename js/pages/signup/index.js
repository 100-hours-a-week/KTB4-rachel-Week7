// 페이지를 초기화 하는 파일 - index.js
/*
- dom를 그린다.
- event를 연결한다.
- service와 연결한다.
- 필요한 초기 작업을 한다.
*/

import {renderSignup} from './dom.js';
import {initSignupEvents} from './event.js';

export function initSignupPage() {
    
    console.log("signup 진입 index");
    document.getElementById('app').innerHTML = renderSignup(); // dom.js에 있는 화면 그려주기(dom 생성)
    document.body.classList.remove('logged-in');
    initSignupEvents(); 
     
}