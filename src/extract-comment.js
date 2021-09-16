"use stract";
import { sendComment } from "./http-request";
import { getMessage } from "./get-message";


const extractComment = (serverURL, chatFrame, textFrame, commentFrame = "") => {
    console.log("読み込みを開始");
    let frame = document.querySelector(chatFrame);
    console.log(`frame:${frame}`)
    if (frame == null) setTimeout(() =>{extractComment(serverURL, chatFrame, textFrame, commentFrame)}, 1000);
    let target;
    if (commentFrame == "#item-offset > #items") {
        target = frame.contentWindow.document.querySelector(commentFrame);
    } else {
        target = frame;
    }
    console.log(target)
    if (target == null) setTimeout(() =>{extractComment(serverURL, chatFrame, textFrame, commentFrame)}, 1000);
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                sendComment(serverURL, {comment:getMessage(node, textFrame).textContent});
            });
        });
    });
    // オブザーバの設定
    const config = { attributes: true, childList: true, characterData: true };
    observer.observe(target, config);
}

export {extractComment};