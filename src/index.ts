import {
  getCommentArea,
  getHtmlSubmittedComment,
} from "./components/CommentSender";

// 実行したい処理の一連のまとめ
const sendCommentToBrowser = async (): Promise<void> => {
  // VSCode の拡張機能 Live Server を使った時のポート番号
//   const port: string = "5500";
//   const origin: string = `http://localhost:${port}`;
//   const urlOpenedByBrowser: string = `${origin}/index.html`;

//   const windowSubmittedComment = getHtmlSubmittedComment(urlOpenedByBrowser);

  const commentArea = await getCommentArea(location.hostname);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        console.log(node);
      });
    });
  });
  // オブザーバの設定
  const config = { childList: true };
  observer.observe(commentArea, config);

//   windowSubmittedComment.postMessage({}, origin);
};

sendCommentToBrowser();
