window.onload = function () {
    "use strict";

    // チャット欄のDOMが存在することを確認する為に必要
    let board = document.querySelector('.chat-list-content');

    // チャットのDOMを読み込むまで繰り返す
    const initialize = () => {
        board = document.querySelector('.chat-list-content');
        if (!board) {
            window.setTimeout(initialize(), 1000);
        }
    }

    // チャットのDOMを読み込むまで待機する関数
    initialize();

    // コメントのDOM部分の選択
    function getMessage(node) { return node.querySelector('.chat-content') }

    const xhr = new XMLHttpRequest();
    
    // オブザーバインスタンスを作成
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                sendComment({comment:getMessage(node).textContent});
            });
        });
    });

    // 対象とするノードを取得
    const target = board;
    // オブザーバの設定
    const config = { attributes: true, childList: true, characterData: true };

    /* 
      対象ノードとオブザーバの設定を渡す
      1つ目の引数は監視するノード、2つ目は設定
    */
    observer.observe(target, config);

    const sendComment = (message) => {
        xhr.open("POST", "http://localhost:10010/", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        const json = JSON.stringify(message);
        xhr.send(json);
        console.log(message);
    }
};