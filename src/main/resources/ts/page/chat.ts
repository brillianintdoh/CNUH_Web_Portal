var follow_name:string;

export function chat() {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    follow_name = (document.getElementById("follow_name") as HTMLInputElement).value;
    const chat_reload = document.getElementById("chat_reload") as HTMLButtonElement;
    const input_mess = document.getElementById("input_mess") as HTMLInputElement;
    document.addEventListener("htmx:wsBeforeMessage", async (event:any) => {
        const json = JSON.parse(event.detail.message as string) as { username:string, getName:string };
        if(json.username == username && json.getName == follow_name) {
            if(input_mess.value == "") return;
            const body = new URLSearchParams();
            body.append("username", username);
            body.append("follow_name", follow_name);
            body.append("message", input_mess.value);
            await fetch("/chat/save", {
                method:"POST",
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                body: body
            });
            input_mess.value = "";
            chat_reload.click();
        }else if(json.username == follow_name && json.getName == username) {
            const body = new URLSearchParams();
            body.append("follow_name", follow_name);
            await fetch("/chat/unpush", {
                method:"POST",
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                body:body
            });
            chat_reload.click();
        }
    });
}

export function chat_htmx(evt_documnet:HTMLElement) {
    const chat_body = document.querySelector(".chat-body") as HTMLElement;
    chat_body.scrollTo(0, chat_body.scrollHeight);
    setTimeout(() => {
        const body = new URLSearchParams();
        body.append("follow_name", follow_name);
        fetch("/chat/push", {
            method:"POST",
            headers: {
                "Content-Type":"application/x-www-form-urlencoded"
            },
            body: body
        });
    },8000);
}