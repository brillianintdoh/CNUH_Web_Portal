import { toggleClass } from "htmx.org";

export function community() {
    const btn = document.getElementById("collapse_menu_btn") as HTMLButtonElement;
    btn.addEventListener("click", () => {
        toggleClass(document.getElementById("collapse_menu") as HTMLElement, "open");
    });
}