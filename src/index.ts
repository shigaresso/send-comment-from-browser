import { LiveSite } from "./class/liveSite";
import { Openrec } from "./class/openrec"
import { Twitch } from "./class/twitch"
import { YouTube } from "./class/YouTube"

// サーバーのポート
const port = "10010";
// サーバーのURL
const serverUrl = `http://localhost:${port}/`;

// extractComment() の記述を一箇所にまとめたいのでここで変数を宣言する
let liveSite: LiveSite;

// どのサイトに接続しているかの判断
switch (location.hostname) {
    case "www.openrec.tv":
        console.log(`Openrecです`)
        liveSite = new Openrec(serverUrl)
        break;
    case "www.twitch.tv":
        console.log("Twitchです")
        liveSite = new Twitch(serverUrl)
        break;
    case "www.youtube.com":
        console.log("YouTubeです");
        liveSite = new YouTube(serverUrl);
        break;
    default:
        console.log("拡張機能の使用に失敗しました");
        break;
}
if (liveSite != null) liveSite.extractComment();