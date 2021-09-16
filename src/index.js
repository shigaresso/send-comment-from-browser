"use strict";
import { extractComment } from "./extract-comment";

const port = "10010";
const serverURL = `http://localhost:${port}/`;
const siteURL = location.hostname;

switch (siteURL) {
    case "www.openrec.tv":
        console.log(`Openrecです`)
        extractComment(serverURL, '.chat-list-content', '.chat-content');
        break;
    case "www.youtube.com":
        console.log("Youtubeです");
        extractComment(serverURL, '#chatframe', "#message", '#item-offset > #items');
        break;
    default:
        console.log("拡張機能の使用に失敗しました");
        break;
}