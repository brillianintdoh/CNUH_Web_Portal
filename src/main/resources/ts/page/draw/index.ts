import { remove } from "htmx.org";
        
export function draw() {
    const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
    const addDeskBtn = document.getElementById('addDeskBtn') as HTMLButtonElement;
    const fullscreenBtn = document.getElementById('fullscreenBtn') as HTMLButtonElement;
    const classroomContainer = document.getElementById('classroomContainer') as HTMLElement;
    const node_list = document.querySelector(".node_list") as HTMLElement;
    let dragged: HTMLElement | null = null;
    let deskCount = 0;

    function init() {
        deskCount = 0;
        const layoutJson = (window as any).layoutJson;
        const json = JSON.parse(layoutJson) as DeskData[];
        const desks = document.querySelectorAll('.desk:not(.teacher-desk)') as NodeListOf<HTMLElement>;
        desks.forEach(desk => remove(desk));
        json.forEach(data => {
            addDesk(null, data.left, data.top);
        });
        deskCount = json.length;
    }
    
    init();
    (document.getElementById("initBtn") as HTMLButtonElement).addEventListener("click", init);

    function addDesk(evt?:any, left?: string, top?: string) {
        deskCount++;
        if(!left) left = `${120}px`;
        if(!top) top = `${80}px`;

        const newDesk = document.createElement('div');
        newDesk.className = 'desk';
        newDesk.draggable = true;
        newDesk.textContent = `${deskCount}번`;
        node_list.appendChild(newDesk);
        
        newDesk.style.left = left;
        newDesk.style.top = top;
    }
    
    addDeskBtn.addEventListener('click', addDesk);
    
    node_list.addEventListener('dragstart', (e) => {
        if (!(e.target as HTMLElement).classList.contains('teacher-desk')) {
            dragged = e.target as HTMLElement;
            dragged.style.opacity = "0.5";
        }
    });
    
    node_list.addEventListener('dragend', (e) => {
        if (!(e.target as HTMLElement).classList.contains('teacher-desk')) {
            (e.target as HTMLElement).style.opacity = '';
        }
    });
    
    node_list.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    
    node_list.addEventListener('drop', (e) => {
        e.preventDefault();
        if (dragged && !dragged.classList.contains('teacher-desk')) {
            const rect = node_list.getBoundingClientRect();
            const x = e.clientX - rect.left - dragged.offsetWidth / 2;
            const y = e.clientY - rect.top - dragged.offsetHeight / 2;
            
            const maxX = rect.width - dragged.offsetWidth;
            const maxY = rect.height - dragged.offsetHeight;
            dragged.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
            dragged.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
        }
    });
    
    saveButton.addEventListener('click', () => {
        const desks = document.querySelectorAll('.desk:not(.teacher-desk)') as NodeListOf<HTMLElement>;
        const seatingArrangement = Array.from(desks).map(desk => ({
            id: desk.textContent,
            left: desk.style.left,
            top: desk.style.top
        }));
        
        const jsonData = JSON.stringify(seatingArrangement);
        (window as any).layoutJson = jsonData;
    });
    
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            classroomContainer.requestFullscreen();
            fullscreenBtn.innerHTML = '<i class="bi bi-fullscreen-exit"></i>';
        } else {
            document.exitFullscreen();
            fullscreenBtn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
        }
    });
    
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            fullscreenBtn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
        }
    });
}

type DeskData = {
    id: string;
    left: string;
    top: string;
}