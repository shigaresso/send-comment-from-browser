"use strict";
import { extractComment } from "./extract-comment";

const port = "10010";

const siteAttribute = {
    "connectServer": `http://localhost:${port}/`,
    "hostname": location.hostname,
    "chatFrame": "",
    "commentFrame": "",
    "textFrame": "",
}

switch (siteAttribute.hostname) {
    case "www.openrec.tv":
        console.log(`Openrecです`)
        siteAttribute.chatFrame = ".chat-list-content";
        siteAttribute.textFrame = ".chat-content";
        extractComment(siteAttribute);
        break;
    case "www.youtube.com":
        console.log("Youtubeです");
        siteAttribute.chatFrame = "#chatframe";
        siteAttribute.commentFrame = "#item-offset > #items";
        siteAttribute.textFrame = "#message"
        extractComment(siteAttribute);
        break;
    default:
        console.log("拡張機能の使用に失敗しました");
        break;
}