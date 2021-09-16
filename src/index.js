"use strict";
import {openrec} from "./openrec";
import {youtube} from "./youtube";

const port = "10010";
const serverURL = `http://localhost:${port}/`;
const siteURL = location.hostname;

switch (siteURL) {
    case "www.openrec.tv":
        console.log(`Openrecです URL:${serverURL}`)
        openrec(serverURL);
        break;
    case "www.youtube.com":
        console.log("Youtubeです");
        youtube(serverURL);
        break;
    default:
        console.log("拡張機能の使用に失敗しました");
        break;
}