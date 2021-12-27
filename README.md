# どのようなプログラムなのか？

Twitch、Openrec、YouTube いずれかのサイトの配信に流れるコメントを、ニコニコ風に流れるコメントとして、ブラウザに表示するプログラムです。  

https://github.com/shigaresso/comment-flow-server  
と組み合わせて利用します。  
こちらは、そのプログラムのクライアント側となります。  

実践的な使い方としては、配信者が OBS Studio のブラウザ機能と組み合わせて利用するものとして考えています。  
背景の緑色はクロマキーを利用し、透過させて下さい。  

以下のように動作します。  

![3qh3q-b47ne](https://user-images.githubusercontent.com/70837100/147489704-0f082eb9-d88d-4cb5-918e-85063773064d.gif)  

## 利用方法  

リポジトリをダウンロードした後、  

```zsh
npm i
```

を実行し、その後  

```zsh
npx webpack
```

を実行します。  
これによって dist フォルダに main.js が作成されます。  

ルート直下の dist フォルダを Chrome 拡張機能で読み込みます。  
これを実行するには、拡張機能管理部分で、デベロッパーモードをオンにし、パッケージ化されていない拡張機能としてフォルダを読み込む必要があります。  

ここまでを終えたら、Twitch、Openrec、YouTube いずれかのサイトの配信をブラウザで開きます。  
デベロッパーツールを開いて頂き、Console タブを開きます。  
一度ブラウザを更新して頂き、ブラウザの配信にコメントが流れた際、Console 側にもコメント内容が表示されれば正常に動作しています。  

ただし、https://github.com/shigaresso/comment-flow-server のプログラムを起動していない時にコメントが流れると、次のようなエラー内容が表示されます。  

```js
POST http://localhost:10010/ net::ERR_CONNECTION_REFUSED
```

や  

```js
Uncaught (in promise) TypeError: Failed to fetch
    at sendComment (http-request.js:13)
    at eval (extract-comment.js:42)
    at NodeList.forEach (<anonymous>)
    at eval (extract-comment.js:41)
    at Array.forEach (<anonymous>)
    at MutationObserver.eval (extract-comment.js:40)
```

このどちらも、サーバー側プログラムを起動させればエラーは解消され、正常に動作します。  