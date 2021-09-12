"use strict";

/**
 * ローカルサーバーにコメントをJSON形式で送信する
 * @param {JSONオブジェクト} message 
 */
const sendComment = (message) => {
    xhr.open("POST", "http://localhost:10010/", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const json = JSON.stringify(message);
    xhr.send(json);
    console.log(message);
}

// 今のところfetchでコメントの取得を継続させるのは難しいが、インスタンス化が不要なためいつかXMLHttpRequestから変更したい
// const sendComment = async (message) => {
    //     const response = await fetch("http://localhost:10010/", {
    //         mode: "no-cors",
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json;charset=UTF-8"
    //         },
    //         body: JSON.stringify(message)
    //     });
    //     const data = await response.json();
    //     console.log(data);
    // }

export { sendComment };