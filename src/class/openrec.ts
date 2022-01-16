import { LiveSite } from "./liveSite";

class Openrec extends LiveSite {
    constructor(serverUrl: string) {
        super(serverUrl);
        this.chatFrame = ".chat-list-content";
        this.textFrame = ".chat-content";
    }
}

export { Openrec }