import { checkStreamSite } from "./checkStreamSite";

// サーバーのポート
const port = "10010";
// サーバーのURL
const serverUrl = `http://localhost:${port}/`;

const liveSite = checkStreamSite(location.hostname, serverUrl);
if (liveSite != null) liveSite.extractComment();
