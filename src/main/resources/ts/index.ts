import "./htmx.js";
import "htmx.org/dist/ext/ws";
import { removeClass } from "htmx.org";
import { account, account_htmx } from "./page/account";
import { login, login_htmx } from "./page/login";
import { chat, chat_htmx } from "./page/chat";
import { community } from "./page/community";
import { materials } from "./page/materials";
interface EmscriptenModule {
    cwrap: (name: string, returnType: string | null, argTypes: string[]) => (...args: any[]) => any;
    onRuntimeInitialized: () => void;
}
declare const Module: EmscriptenModule;
const plugin_on = document.getElementById("plugin_on") as HTMLElement;
const login_page = document.getElementById("login_page") as HTMLElement;
const account_page = document.getElementById("account_page") as HTMLElement;
const timetable_page = document.getElementById("materials_page") as HTMLElement;
const chat_page = document.getElementById("chat_page") as HTMLElement;
const community_page = document.getElementById("community_page") as HTMLElement;
const load = document.querySelector(".load_menu") as HTMLElement;
class Assembly {
    init!: () => void;
    time_check!: (itrt:string, x:number, y:number) => void;
    getTimetable!: () => string;

    push(fun:Function, funName:string) {
        if(funName == "init") {
            this.init = fun as () => void;
        }else if(funName == "time_check") {
            this.time_check = fun as (itrt:string, x:number, y:number) => void;
        }else if(funName == "getTimetable") {
            this.getTimetable = fun as () => string;
        }
    }
};
export const assembly = new Assembly();

document.addEventListener("DOMContentLoaded", () => {
    if(plugin_on) {
        Module.onRuntimeInitialized = () => {
            assembly.push(Module.cwrap("init", "void", []), "init");
            assembly.push(Module.cwrap("time_check", "void", ["string", "number", "number"]), "time_check");
            assembly.push(Module.cwrap("getTimetable", "string", []), "getTimetable");
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