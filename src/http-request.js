"use strict";

/**
 * ローカルサーバーにコメントをJSON形式で送信する
 * @param {JSONオブジェクト} json
 */
const sendComment = async (connectURL, json) => {
    const response = await fetch(connectURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(json)
    });
    const data = await response.json();
    console.log(data);
}

// const sendComment = (json) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", "http://localhost:10010/", true);
//     xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     ;
//     xhr.send(JSON.stringify(json));
//     console.log(json);
// }

export { sendComment };