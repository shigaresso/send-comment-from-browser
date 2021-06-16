window.onload = function () {
    "use strict";
    // チャット欄のDOMが存在することを確認する為に必要
    let board = document.querySelector('#chatframe');
    // DOMを読み込むまで待機する関数
    initialize();

    // 対象とするノードを取得
    const target = board.contentWindow.document.querySelector('#item-offset > #items');
    // コメントのDOM部分の選択
    function getMessage(node) {return node.querySelector('#message') }

    const xhr = new XMLHttpRequest();
    // POSTでデータを送信した時のサーバーからのレスポンスを取得する
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log(xhr.responseText)
        }
    }
    // オブザーバインスタンスを作成
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                //console.log(node);
                let message = getMessage(node);
                xhrSend(message.textContent);
                console.log(message.textContent);
            });
        });
    });

    // オブザーバの設定
    const config = { attributes: true, childList: true, characterData: true };

    // 対象ノードとオブザーバの設定を渡す
    observer.observe(target, config);

    // チャットのDOMを読み込むまで繰り返す
    function initialize() {
        board = document.querySelector('#chatframe');
        if (!board) {
            window.setTimeout(initialize(), 1000);
            return;
        }
    }
    // サーバーにDOMからパースしたコメントを送信
    function xhrSend(comment){
        xhr.open("POST", "https://localhost:65500/", true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        xhr.send(comment);
    }
};