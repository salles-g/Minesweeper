import { TILE_STATUSES } from "../model.js";
export class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.status = TILE_STATUSES.HIDDEN;
        this.element = document.createElement("div");
        this.element.dataset.status = this.status;
        this.element.textContent = " ";
    }
}
