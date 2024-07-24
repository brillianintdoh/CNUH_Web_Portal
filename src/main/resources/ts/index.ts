import "./htmx.js";
import "htmx.org/dist/ext/ws";
import { removeClass } from "htmx.org";
import { account, account_htmx } from "./page/account";
import { login, login_htmx } from "./page/login";
import { timetable } from "./page/timetable";
import { chat, chat_htmx } from "./page/chat";
interface EmscriptenModule {
    cwrap: (name: string, returnType: string | null, argTypes: string[]) => (...args: any[]) => any;
    onRuntimeInitialized: () => void;
}
declare const Module: EmscriptenModule;
const plugin_on = document.getElementById("plugin_on") as HTMLElement;
const login_page = document.getElementById("login_page") as HTMLElement;
const account_page = document.getElementById("account_page") as HTMLElement;
const timetable_page = document.getElementById("timetable_page") as HTMLElement;
const chat_page = document.getElementById("chat_page") as HTMLElement;
const load = document.querySelector(".load_menu") as HTMLElement;

var load_is = true;
document.addEventListener("DOMContentLoaded", async () => {
    if(login_page) {
        await login();
    }else if(timetable_page) {
        await timetable();
    }else if(account_page) {
        await account();
        load_is = false;
    }else if(chat_page) {
        chat();
    }

    if(plugin_on) {
        Module.onRuntimeInitialized = () => {
        }
    }

    if(load && load_is) {
        removeClass(document.body, "load_on");
        load.style.display = 'none';
    }
});

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