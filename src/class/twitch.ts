import { LiveSite } from "./liveSite";

class Twitch extends LiveSite {
    constructor(serverUrl: string) {
        super(serverUrl);
        this.chatFrame = ".chat-scrollable-area__message-container"
        this.textFrame = ".text-fragment";
    }
}

export { Twitch }