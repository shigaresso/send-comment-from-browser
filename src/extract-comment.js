"use stract";
import { sendComment } from "./http-request";
import { getMessage } from "./get-message";


const extractComment = (siteAttribute) => {
    console.log(siteAttribute.hostname);
    console.log(siteAttribute.commentFrame);
    let frame = document.querySelector(siteAttribute.chatFrame);
    console.log(`frame:${frame}`)
    if (frame == null) setTimeout(() =>{extractComment(siteAttribute)}, 1000);
    let target;
    if (siteAttribute.hostname == "www.openrec.tv") {
        target = frame;
    } else if (siteAttribute.hostname == "www.youtube.com") {
        target = frame.contentWindow.document.querySelector(siteAttribute.commentFrame);
    }
    console.log(target)
    if (target == null) setTimeout(() =>{extractComment(siteAttribute)}, 1000);
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                sendComment(siteAttribute.connectServer, {comment:getMessage(node, siteAttribute.textFrame).textContent});
            });
        });
    });
    // オブザーバの設定
    const config = { attributes: true, childList: true, characterData: true };
    observer.observe(target, config);
}

export {extractComment};