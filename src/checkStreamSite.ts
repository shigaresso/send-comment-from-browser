import { LiveSite } from "./class/liveSite";
import { Openrec } from "./class/openrec";
import { Twitch } from "./class/twitch";
import { YouTube } from "./class/YouTube";

// どのサイトに接続しているかの判断し、対応したオブジェクトを作成
export const checkStreamSite = (
  hostname: string,
  serverUrl: string
): LiveSite | null => {
  switch (hostname) {
    case "www.openrec.tv":
      console.log(`Openrecです`);
      return new Openrec(serverUrl);
    case "www.twitch.tv":
      console.log("Twitchです");
      return new Twitch(serverUrl);
    case "www.youtube.com":
      console.log("YouTubeです");
      return new YouTube(serverUrl);
    default:
      console.log("対応していないサイトか、拡張機能の使用に失敗しました");
      return null;
  }
};
