import { LiveSite } from "./liveSite";

class YouTube extends LiveSite {
    constructor(serverUrl: string) {
        super(serverUrl);
        this.chatFrame = "#chatframe";
        this.textFrame = "#message";
    }
}

export { YouTube }