export async function login() {
}

export async function login_htmx(evt_documnet:HTMLElement) {
    const login_ok = document.getElementById("login_ok") as HTMLElement;
    const login_no = document.getElementById("login_no") as HTMLElement;
    const login_btn = document.getElementById("login_btn") as HTMLElement;

    if(login_ok) {
        location.reload();
    }else if(login_no) {
        setTimeout(() => login_btn.innerHTML = '<button class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Login</button>', 1000);
    }
}