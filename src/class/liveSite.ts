class LiveSite {
    private serverUrl: string;
    protected chatFrame: string;
    protected textFrame: string;
    private targetCommentArea: any;

    constructor(serverUrl: string) {
        this.serverUrl = serverUrl;
    }

    // 引数の秒数待たせる
    private sleep(sec: number) {
        return new Promise(resolve => setTimeout(resolve, sec * 1000));
    }

    // コメントエリアを取得するためのメソッド
    private getCommentArea() {
        const frame: any = document.querySelector(this.chatFrame);
        if (frame == null) {
            this.reGet();
            return;
        }

        this.targetCommentArea = frame;
        // YouTube の場合は、取得する手順が増える
        if (location.hostname == "www.youtube.com") {
            this.targetCommentArea = frame.contentWindow.document.querySelector("#item-offset > #items");
            if (this.targetCommentArea == null) {
                this.reGet();
                return;
            }
        }
    }

    // HTML 要素が取得出来なかった際に再取得を試みる
    private async reGet() {
        const reConnectTime = 2;
        console.log(`${reConnectTime}秒後に再取得します`);
        await this.sleep(reConnectTime);
        this.extractComment();
    }

    // コメントエリアのDOMの変更を検出するメソッド
    extractComment() {
        this.getCommentArea();
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    this.sendServerComment(this.serverUrl, { comment: this.getMessage(node, this.textFrame).textContent });
                });
            });
        });
        // オブザーバの設定
        const config = { attributes: true, childList: true, characterData: true };
        observer.observe(this.targetCommentArea, config);
    }

    private async sendServerComment(serverURL: string, json: any) {
        const response: any = await fetch(serverURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(json),
        });
        const data = await response.json();
        console.log(data);
    }

    private getMessage(message: any, textFrame: any) {
        return message.querySelector(textFrame);
    }
}

export { LiveSite }