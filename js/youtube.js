"use strict";
const xhr = new XMLHttpRequest();
window.addEventListener("load", main, false);

function main() {
    let chatFrame = document.querySelector('#chatframe');
    if (chatFrame == null) setTimeout(main, 1000);
    let target = chatFrame.contentWindow.document.querySelector('#item-offset > #items');
    console.log(target);


    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                sendComment({comment:getMessage(node).textContent});
            });
        });
    });

    

    // オブザーバの設定
    const config = { attributes: true, childList: true, characterData: true };
    observer.observe(target, config);
}

// コメント1つ1つのDOMを取得
const getMessage = (message) => message.querySelector("#message");

const sendComment = (message) => {
    xhr.open("POST", "http://localhost:10010/", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const json = JSON.stringify(message);
    xhr.send(json);
    console.log(message);
}