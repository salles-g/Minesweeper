import { TILE_STATUSES } from "../model.js";

export class Tile {
  public x: number;
  public y: number;
  public status: string;
  public element: HTMLElement;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.status = TILE_STATUSES.HIDDEN;

    this.element = document.createElement("div");
    this.element.dataset.status = this.status;
    this.element.textContent = " ";
  }
}