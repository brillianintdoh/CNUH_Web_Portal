import { removeClass, toggleClass } from "htmx.org";
import { gsap } from "gsap";
import { page_1 } from "./menu/1";
import { page_2 } from "./menu/2";
import { page_3 } from "./menu/3";
import { admin } from "./menu/admin";
var page_btn:HTMLElement;

export async function account() {
    page_btn = document.getElementById("defualt_page") as HTMLElement;
    function menu(evt:any) {
        const btn = evt.target as HTMLElement;
        if(btn == page_btn) return;
        const nm = Number(btn.getAttribute("page"));
        const page_nm = Number(page_btn.getAttribute("page"));

        const page_now = document.getElementById("page_"+page_nm) as HTMLElement;
        const page = document.getElementById("page_"+nm) as HTMLElement;
        if(page_nm < nm) {
            gsap.to(page_now, { opacity: 0, duration: 0.5, x:1000, display:"none", onComplete: () => {
                page.style.display = "block";
            }});
        }else {
            gsap.fromTo(page, { opacity:0, display: "block", x:1000 }, { opacity: 1, duration: 1, x:0, onComplete: () => {
                page_now.style.display = "none";
            }});
        }


        toggleClass(btn, "opacity-50");
        toggleClass(page_btn, "opacity-50");

        page_btn = btn;
    }

    (window as any).menu = menu;
}

export async function account_htmx(evt_documnet:HTMLElement) {
    const p = evt_documnet.getAttribute("page");
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
        
        removeClass(document.body, "load_on");
        gsap.fromTo("#load_"+p, {opacity: 1}, {opacity: 0, duration: 1, display: "none"});
    }
}