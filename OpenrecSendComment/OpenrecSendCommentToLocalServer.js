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
    // // POSTでデータを送信した時のサーバーからのレスポンスを取得する
    // xhr.onreadystatechange = () => {
    //     if(xhr.readyState == 4 && xhr.status == 200){
    //         console.log(JSON.parse(xhr.responseText));
    //     }
    // }
    
    // オブザーバインスタンスを作成
    let observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                //console.log(node);
                let message = getMessage(node);
                commentSend(message.textContent);
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

    
    // サーバーにDOMからパースしたコメントを送信
    function commentSend(comment){
        xhr.open("POST", "http://localhost:10010/", true);
        let data = {data:comment};
        let json = JSON.stringify(data);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(json);
        console.log(data);
        xhr.onload = () => {
            console.log("xhr.textContent");
        }
    }
};