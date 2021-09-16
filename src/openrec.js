"use strict";
import {sendComment} from "./http-request";

const openrec = (serverURL) => {
    console.log("読み込みを開始");
    let target = document.querySelector('.chat-list-content');
    if (target == null) setTimeout(() => {openrec(serverURL)}, 1000);
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                sendComment(serverURL, {comment:getMessage(node).textContent});
            });
        });
    });
    // オブザーバの設定
    const config = { attributes: true, childList: true, characterData: true };
    observer.observe(target, config);
}

const getMessage = (message) => message.querySelector('.chat-content');

export {openrec};