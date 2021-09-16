"use strict";
import {sendComment} from "./http-request";

const youtube = (serverURL) => {
    console.log("読み込みを開始");
    let chatFrame = document.querySelector('#chatframe');
    if (chatFrame == null) setTimeout(() =>{youtube(serverURL)}, 1000);
    let target = chatFrame.contentWindow.document.querySelector('#item-offset > #items');
    if (target == null) setTimeout(() =>{youtube(serverURL)}, 1000);
    console.log(target);


    
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

// コメント1つ1つのDOMを取得
const getMessage = (message) => message.querySelector("#message");

export {youtube};