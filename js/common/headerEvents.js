import { router } from '../../main.js'; // 현재는 js/common/headerEvents.js;

export function headerEvents(userId) {
    console.log('headerEvents 진입');
    const profileBtn = document.getElementById('headerProfileBtn');
    const dropdownMenu = document.getElementById('headerDropdownMenu');
    const backBtn = document.getElementById('headerBackBtn');

    if (!profileBtn || !dropdownMenu) return;

    backBtn.addEventListener('click', (e) => {
        window.history.back(); // 이건 공통 헤더 이벤트라서 꼭 뒤로가기가 게시글 전체조회가 아닐 수도 있어
    })

    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
    })

    // 화면의 다른 곳을 누르면 드롭다운 닫기
    document.addEventListener('click', (e) => {
        if (!dropdownMenu.classList.contains('hidden') && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });

    // 각 메뉴 클릭 이벤트 바인딩
    document.getElementById('menuEditInfo')?.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('닉네임 수정 페이지 이동 되었습니다.');
        window.history.pushState({userId : userId}, '', '/user/edit');
        router();
    });


    document.getElementById('menuEditPwd')?.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('비밀번호 수정 페이지 이동 되었습니다.');
        window.history.pushState({userId : userId}, '', '/user/password');
        router();
    });


    document.getElementById('menuLogout')?.addEventListener('click', () => {
        alert('로그아웃 되었습니다.');

        sessionStorage.clear(); // sessionStorage의 모든 데이터 삭제
        document.body.classList.remove('logged-in');

        window.history.pushState({}, '', '/login');
        router();

    });


}