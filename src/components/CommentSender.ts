export const sleep = (waitSecond: number) => {
  return new Promise((resolve) => setTimeout(resolve, waitSecond * 1000));
};

/**
 *
 * @param sendUrl コメント送信先の HTML の URL
 * @returns コメント送信先の HTML の window
 */
export const getHtmlSubmittedComment = (sendUrl: string): Window => {
  return window.open(sendUrl);
};

/**
 *
 * @param hostname URL のドメイン部分
 * @returns コメントが表示される枠の DOM(非同期処理なので型は Promise でラップされることに注意)
 */
export const getCommentArea = async (
  hostname: string
): Promise<HTMLElement> => {
  let commentArea: HTMLElement;
  switch (hostname) {
    case "www.openrec.tv":
      commentArea = document.querySelector(".chat-list-content");
      break;
    case "www.twitch.tv":
      commentArea = document.querySelector(
        ".chat-scrollable-area__message-container"
      );
      break;
    case "www.youtube.com":
      // YouTube のコメント欄は iframe 内なので取得方法が他のサイトとは異なる
      const iframe = <HTMLIFrameElement>document.getElementById("chatframe");
      commentArea = iframe?.contentWindow.document.querySelector(
        "#item-offset > #items"
      );
      break;
  }
  if (commentArea == null) {
    await sleep(2);
    commentArea = await getCommentArea(hostname);
  }
  return commentArea;
};
