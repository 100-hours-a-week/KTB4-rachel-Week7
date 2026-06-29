import { renderPostWriteLayout } from './dom.js';
import { initPostWriteEvents } from './event.js';

export function initPostWritePage() {
    document.getElementById('app').innerHTML = renderPostWriteLayout();
    initPostWriteEvents();

}