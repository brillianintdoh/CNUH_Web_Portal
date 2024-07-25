import { Modal } from "bootstrap";
import { ajax } from "htmx.org";

export function page_3() {
    const addButton = document.getElementById('addButton') as HTMLElement;
    const followingButton = document.getElementById('followingButton') as HTMLElement;
    const followerButton = document.getElementById('followerButton') as HTMLElement;
    const searchArea = document.getElementById('searchArea') as HTMLElement;
    const followingList = document.getElementById('followingList') as HTMLElement;
    const followerList = document.getElementById('followerList') as HTMLElement;

    addButton.addEventListener('click', () => {
        searchArea.style.display = 'block';
        followingList.style.display = 'none';
        followerList.style.display = 'none';
    });
    
    followingButton.addEventListener('click', () => {
        searchArea.style.display = 'none';
        followingList.style.display = 'block';
        followerList.style.display = 'none';
    });
    
    followerButton.addEventListener('click', () => {
        searchArea.style.display = 'none';
        followingList.style.display = 'none';
        followerList.style.display = 'block';
    });

    async function show_modal(username:string) {
        const document_modal = document.getElementById("profile_modal") as HTMLElement;
        const modal = new Modal(document_modal);
        await ajax("POST", "/account/modal", { target: document_modal, values: { username: username } });
        modal.show();
    }

    (window as any).show_modal = show_modal;
}