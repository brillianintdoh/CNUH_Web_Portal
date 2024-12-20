import "./htmx.js";
import "htmx.org/dist/ext/ws";
import { addClass, removeClass } from "htmx.org";
import { gsap } from "gsap";
import { account, account_htmx } from "./page/account";
import { login, login_htmx } from "./page/login";
import { chat, chat_htmx } from "./page/chat";
import { community } from "./page/community";
import { materials } from "./page/materials";
import { calendar } from "./page/calendar";
import { draw } from "./page/draw";
interface EmscriptenModule {
    cwrap: (name: string, returnType: string | null, argTypes: string[]) => (...args: any[]) => any;
    onRuntimeInitialized: () => void;
}
declare const Module: EmscriptenModule;
const index_page = document.getElementById("index_page") as HTMLElement;
const login_page = document.getElementById("login_page") as HTMLElement;
const account_page = document.getElementById("account_page") as HTMLElement;
const timetable_page = document.getElementById("materials_page") as HTMLElement;
const draw_page = document.getElementById("draw_page") as HTMLElement;
const chat_page = document.getElementById("chat_page") as HTMLElement;
const community_page = document.getElementById("community_page") as HTMLElement;
const calendar_page = document.getElementById("calendar_page") as HTMLElement;

const load = document.querySelector(".load_menu") as HTMLElement;
const plugin_on = document.getElementById("plugin_on") as HTMLElement;
export const assembly = {
    timetable_init: () => {},
    calendar_init: (month:number) => {},
    time_push: (itrt:string, x:number, y:number, class_time:number) => {},
    getTimetable: () => "",
    calendar_push: (date:number, month:number) => {},
    getCalendar: () => ""
};
function iosPwa() {
    if(isIOS()) {
        alert("ios 기기는 설치 방법이 다릅니다");
        appBtn.innerHTML = "ios 설치 방법";
        appBtn.href = "https://jeon0160.tistory.com/79";
    }
}

const appBtn = document.getElementById("appBtn_install") as HTMLLinkElement;
window.addEventListener('beforeinstallprompt', (event) => {
    if(index_page) {
        if(event) {
            appBtn.style.visibility = "visible";
            addClass(appBtn, "btn_a");
        }
        appBtn.removeEventListener("click", iosPwa);
        appBtn.addEventListener("click", () => {
            if(event) {
                (event as any).prompt();
            }else {
                alert("현재 브라우저에서 PWA를 지원하지 않습니다");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if(plugin_on) {
        Module.onRuntimeInitialized = () => {
            assembly.timetable_init = Module.cwrap("timetable_init", "void", []);
            assembly.time_push = Module.cwrap("time_push", "void", ["string", "number", "number", "number"]);
            assembly.getTimetable = Module.cwrap("getTimetable", "string", []);

            assembly.calendar_init = Module.cwrap("calendar_init", "void", ["number"]);
            assembly.calendar_push = Module.cwrap("calendar_push", "void", ["number", "number"]);
            assembly.getCalendar = Module.cwrap("getCalendar", "string", []);
            DOM_load();
        }
    }else {
        DOM_load();
    }
});

var load_is = true;
async function DOM_load() {
    if(index_page) {
        localStorage.getItem
        gsap.fromTo(".head_menu", {opacity: 0, y: -50}, {opacity: 1, y: 0, duration: 0.5});
        if(isIOS()) appBtn.style.visibility = "visible";
        appBtn.addEventListener("click", iosPwa);
    }else if(login_page) {
        await login();
    }else if(timetable_page) {
        await materials();
    }else if(account_page) {
        await account();
        load_is = false;
    }else if(chat_page) {
        chat();
    }else if(community_page) {
        community();
    }else if(calendar_page) {
        await calendar();
    }else if(draw_page) {
        draw();
    }

    if(load && load_is) {
        removeClass(document.body, "load_on");
        gsap.fromTo(load, {opacity: 1}, {opacity: 0, duration: 1, display: "none"});
    }
}

export function isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

document.addEventListener("htmx:afterSettle", (evt:any) => {
    const evt_documnet = evt.detail.elt as HTMLElement;

    if(login_page) {
        login_htmx(evt_documnet);
    }else if(account_page) {
        account_htmx(evt_documnet);
    }else if(chat_page) {
        chat_htmx(evt_documnet);
    }
});