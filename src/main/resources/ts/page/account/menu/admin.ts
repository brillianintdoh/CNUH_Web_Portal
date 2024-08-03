export function admin() {
    function userModal(username:string) {
        (document.getElementById("userModal_title") as HTMLElement).innerHTML = username + " - 비밀번호 변경";
        (document.getElementById("userModal_username") as HTMLInputElement).value = username;
    }

    (window as any).userModal = userModal;
}