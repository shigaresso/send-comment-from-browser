window.onload = function () {
    "use strict";
    // チャット欄のDOMが存在することを確認する為に必要
    let board = document.querySelector('#chatframe');
    // DOMを読み込むまで待機する関数
    const initialize = () => {
        if(!board) {
            window.setTimeout(initialize(), 1000);
            console.log("確認中");
        }
    }

    initialize();

    // 対象とするノードを取得
    const target = board.contentWindow.document.querySelector('#item-offset > #items');
    // コメントのDOM部分の選択
    function getMessage(node) {return node.querySelector('#message') }

    const xhr = new XMLHttpRequest();

    // オブザーバインスタンスを作成
    let observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                console.log(node);
                let message = getMessage(node);
                commentSend(message.textContent);
            });
        });
    });

    // オブザーバの設定
    const config = { attributes: true, childList: true, characterData: true };

    // 対象ノードとオブザーバの設定を渡す
    observer.observe(target, config);

    // サーバーにDOMからパースしたコメントを送信
    function commentSend(comment){
        xhr.open("POST", "http://localhost:3000/", true);
        let data = {data:comment};
        let json = JSON.stringify(data);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(json);
        console.log("data");
        xhr.onload = () => {
            console.log("xhr.textContent");
        }
    }
};