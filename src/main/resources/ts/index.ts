import "./htmx.js";
import "htmx.org/dist/ext/ws";
import { removeClass } from "htmx.org";
import { account, account_htmx } from "./page/account";
import { login, login_htmx } from "./page/login";
import { chat, chat_htmx } from "./page/chat";
import { community } from "./page/community";
import { materials } from "./page/materials";
import { calendar } from "./page/calendar";
interface EmscriptenModule {
    cwrap: (name: string, returnType: string | null, argTypes: string[]) => (...args: any[]) => any;
    onRuntimeInitialized: () => void;
}
declare const Module: EmscriptenModule;
const login_page = document.getElementById("login_page") as HTMLElement;
const account_page = document.getElementById("account_page") as HTMLElement;
const timetable_page = document.getElementById("materials_page") as HTMLElement;
const chat_page = document.getElementById("chat_page") as HTMLElement;
const community_page = document.getElementById("community_page") as HTMLElement;
const calendar_page = document.getElementById("calendar_page") as HTMLElement;

const load = document.querySelector(".load_menu") as HTMLElement;
const plugin_on = document.getElementById("plugin_on") as HTMLElement;
export const assembly = {
    init: (op:number) => {},
    time_push: (itrt:string, x:number, y:number, class_time:number) => {},
    getTimetable: () => "",
    calendar_push: (date:number, month:number) => {},
    getCalendar: () => ""
};

document.addEventListener("DOMContentLoaded", () => {
    if(plugin_on) {
        Module.onRuntimeInitialized = () => {
            assembly.init = Module.cwrap("init", "void", ["number"]);

            assembly.time_push = Module.cwrap("time_push", "void", ["string", "number", "number", "number"]);
            assembly.getTimetable = Module.cwrap("getTimetable", "string", []);

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
    if(login_page) {
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
    }

    if(load && load_is) {
        removeClass(document.body, "load_on");
        load.style.display = 'none';
    }
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