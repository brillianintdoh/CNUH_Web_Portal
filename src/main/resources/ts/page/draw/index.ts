import { seating } from "./seating";

export function draw() {
    function load() {
        const seating_page = document.getElementById("seating_page") as HTMLElement;
        if(seating_page) {
            seating();
        }
    }

    document.addEventListener("htmx:afterSwap", () => {
        if((window as any).isMove) {
            load();
        }
    });
    load();
}
