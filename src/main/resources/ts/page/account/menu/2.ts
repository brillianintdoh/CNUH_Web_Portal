import { addClass, removeClass } from "htmx.org";
import { isIOS } from "../../..";

export async function page_2() {
    if(isIOS() && !window.matchMedia('(display-mode: standalone)').matches) {
    }

    if (window.Notification) {
        Notification.requestPermission();
    }

    const chat = (window as any).chat == 'true' ? true : false;
    const news = (window as any).news == "true" ? true : false;
    const mission = (window as any).mission == "true" ? true : false;
    const is_push = (window as any).is_push == "true" ? true : false;
    const publicKey = (window as any).publicKey;

    const notifications_toggle = document.getElementById("notifications_toggle") as HTMLButtonElement;
    const load_2 = document.getElementById("load_2") as HTMLElement;

    if(is_push) {
        notifications_toggle.addEventListener("click", async () => {
            btn_off(notifications_toggle);
            load_2.style.display = 'block';
            const reg = await navigator.serviceWorker.ready;
            const webpush = await reg.pushManager.getSubscription();
            webpush?.unsubscribe();
            await fetch("/push/unsubscribe", {
                method: "POST",
            });
            location.reload();
        });
    }else {
        notifications_toggle.addEventListener("click", async () => {
            if (Notification.permission == 'denied') {
                alert("알림을 허용해 주세요 사이트 설정에서 할수 있습니다");
                return;
            }
            btn_on(notifications_toggle);
            load_2.style.display = 'block';

            const reg = await navigator.serviceWorker.register("./woker.js");
            const webpush = await reg.pushManager.subscribe({
                applicationServerKey: publicKey,
                userVisibleOnly: true
            });
            const keyArrayBuffer = webpush.getKey("p256dh");
            const authArrayBuffer = webpush.getKey("auth");
            
            const key = encode(keyArrayBuffer);
            const auth = encode(authArrayBuffer);
            const endpoint = webpush.endpoint;
            
            const reg_body = new URLSearchParams();
            reg_body.append("key", key);
            reg_body.append("auth", auth);
            reg_body.append("endpoint", endpoint);

            await fetch("/push/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: reg_body
            });

            location.reload();
        });
    }
}

function btn_off(notifications_toggle:HTMLButtonElement) {
    removeClass(notifications_toggle, "btn-danger");
    addClass(notifications_toggle, "btn-primary");
    notifications_toggle.innerHTML = "알림 활성화";
}

function btn_on(notifications_toggle:HTMLButtonElement) {
    removeClass(notifications_toggle, "btn-primary");
    addClass(notifications_toggle, "btn-danger");
    notifications_toggle.innerHTML = "알림 비활성화";
}

function encode(arrayBuffer: ArrayBuffer | null): string {
    const uint8Array = new Uint8Array(arrayBuffer as ArrayBuffer);
    const base64String = btoa(String.fromCharCode(...uint8Array));
    return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}