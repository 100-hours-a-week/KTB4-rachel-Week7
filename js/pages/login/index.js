import {renderLogin} from './dom.js';
import {initLoginEvents} from './event.js';

export function initLoginPage() {
    document.getElementById('app').innerHTML = renderLogin();
    initLoginEvents();
}


