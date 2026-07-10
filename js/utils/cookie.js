export function getCookie(name) {
    /*
    사이트(도메인)마다 쿠키가 다르다
    */
   console.log(document.cookie);

    const cookies = document.cookie.split(';'); // 이렇게 문자열단위로 끊기는게 맞음?

    for(const cookie of cookies) {
        const [key, value] = cookie.split('=');

        if(key === name) return value;
    }

    return null; // cookie가 없으면 null 반환
}

