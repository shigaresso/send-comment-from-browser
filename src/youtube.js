"use strict";
setTimeout(main, 5000);


function main() {
    console.log("読み込みを開始");
    let chatFrame = document.querySelector('#chatframe');
    if (chatFrame == null) setTimeout(main, 1000);
    let target = chatFrame.contentWindow.document.querySelector('#item-offset > #items');
    console.log(target);


    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                sendComment("http://localhost:10010/", {comment:getMessage(node).textContent});
            });
        });
    });

    

    // オブザーバの設定
    const config = { attributes: true, childList: true, characterData: true };
    observer.observe(target, config);
}

// コメント1つ1つのDOMを取得
const getMessage = (message) => message.querySelector("#message");

const sendComment = async (connectURL, json) => {
    const response = await fetch(connectURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(json)
    });
    const data = await response.json();
    console.log(data);
}