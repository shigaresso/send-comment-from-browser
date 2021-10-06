"use strict";

/**
 * 
 * @param {*接続先のサーバーURL} connectURL 
 * @param {*JSONオブジェクト} json 
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

export { sendComment };