import { removeClass, toggleClass } from "htmx.org";
import { page_1 } from "./menu/1";
import { page_2 } from "./menu/2";
import { page_3 } from "./menu/3";
import { admin } from "./menu/admin";
var page_now:HTMLElement;

export async function account() {
    page_now = document.getElementById("defualt_page") as HTMLElement;
    function menu(evt:any) {
        const btn = evt.target as HTMLElement;
        if(btn == page_now) return;
        const nm = btn.getAttribute("page");
        const page_nm = page_now.getAttribute("page");
        const page = document.getElementById("page_"+page_nm) as HTMLElement;
        page.style.display = 'none';
        (document.getElementById("page_"+nm) as HTMLElement).style.display = 'block';

        toggleClass(btn, "opacity-50");
        toggleClass(page_now, "opacity-50");

        page_now = btn;
    }

    (window as any).menu = menu;
}

export async function account_htmx(evt_documnet:HTMLElement) {
    const p = evt_documnet.getAttribute("page");
    var load:HTMLElement = document.body;
    if(p) {
        if(p == "1") {
            await page_1();
        }else if(p == "2") {
            await page_2();
        }else if(p == "3") {
            page_3();
        }else if(p == "admin") {
            admin();
        }
        
        load = document.getElementById("load_"+p) as HTMLElement
        removeClass(document.body, "load_on");
        load.style.display = 'none';
    }
}