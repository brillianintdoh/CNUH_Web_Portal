
export function index() {
    const appBtn = document.getElementById("appBtn_install") as HTMLElement;
    const match = window.matchMedia('(display-mode: standalone)');

    if(!match.matches) {
        appBtn.style.display = 'block';
        appBtn.addEventListener("click", () => {
            const app_install = (window as any).appInstall as Window;
            if(app_install) {
                app_install.prompt();
            }else {
                alert("현재 사용자님의 브라우저는 PWA를 지원하지 않습니다");
            }
        });
    }
}