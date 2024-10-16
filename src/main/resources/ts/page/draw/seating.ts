import { ajax, remove, toggleClass } from "htmx.org";
        
export function seating() {
    const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
    const addDeskBtn = document.getElementById('addDeskBtn') as HTMLButtonElement;
    const fullscreenBtn = document.getElementById('fullscreenBtn') as HTMLButtonElement;
    const randomBtn = document.getElementById('randomBtn') as HTMLButtonElement;
    const classroomContainer = document.getElementById('classroomContainer') as HTMLElement;
    const classroom = document.getElementById('classroom') as HTMLElement;
    const node_list = document.querySelector(".node_list") as HTMLElement;
    const range_max = document.getElementById("range_max") as HTMLInputElement;
    const range_min = document.getElementById("range_min") as HTMLInputElement;
    const exception_input = document.getElementById("exception_input") as HTMLInputElement;
    let dragged: HTMLElement | null = null;
    let deskCount = 0;
    let isFullscreen = false;
    let isDrag_type = true;

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
        range_max.value = deskCount.toString();
        range_min.value = "1";
        exception_input.value = "";
    }

    init();
    (document.getElementById("initBtn") as HTMLButtonElement).addEventListener("click", init);

    function seating_print() {
        (document.querySelector(".btn_container") as HTMLElement).style.display = "none";
        fullscreenBtn.style.display = "none";
        document.body.innerHTML = classroomContainer.outerHTML;
        print();
        location.reload();
    }

    let btn_brk = document.getElementById("change_btn") as HTMLButtonElement;
    function change_drag(evt:any, type:boolean) {
        if(isDrag_type == type) return;
        const btn = evt.target as HTMLButtonElement;
        isDrag_type = type;
        toggleClass(btn, "btn-danger");
        toggleClass(btn, "btn-success");
        toggleClass(btn_brk, "btn-success");
        toggleClass(btn_brk, "btn-danger");
        btn_brk = btn;

        const desks = document.querySelectorAll('.desk:not(.teacher-desk)') as NodeListOf<HTMLElement>;
        desks.forEach(desk => {
            if(type) {
                const input = desk.querySelector(".node_input") as HTMLInputElement;
                desk.draggable = false;
                input.draggable = true;
            }else {
                const input = desk.querySelector(".node_input") as HTMLInputElement;
                desk.draggable = true;
                input.draggable = false;
            }
        });
    }
    (window as any).seating_print = seating_print;
    (window as any).change_drag = change_drag;

    function addDesk(evt:any, left?: string, top?: string) {
        deskCount++;
        if(!left) left = `${120}px`;
        if(!top) top = `${80}px`;

        const newDesk = document.createElement('div');
        newDesk.className = 'desk';
        newDesk.draggable = true;
        newDesk.innerHTML = "<input class='node_input' value='"+deskCount+"번' oninput=\"this.value = this.value.replace(/[^0-9]/g, '')+'번'\">";

        newDesk.addEventListener("keydown", (evt) => {
            if(evt.key == "Delete") {
                remove(newDesk);
            }
        });
        node_list.appendChild(newDesk);
        
        newDesk.style.left = left;
        newDesk.style.top = top;
    }
    
    addDeskBtn.addEventListener('click', addDesk);
    
    node_list.addEventListener('dragstart', (e) => {
        if (!(e.target as HTMLElement).classList.contains('teacher-desk') && !isFullscreen) {
            dragged = e.target as HTMLElement;
            dragged.style.opacity = "0.5";
        }
    });
    
    node_list.addEventListener('dragend', (e) => {
        if (!(e.target as HTMLElement).classList.contains('teacher-desk') && !isFullscreen) {
            (e.target as HTMLElement).style.opacity = '';
        }
    });
    
    node_list.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    
    node_list.addEventListener('drop', (e) => {
        e.preventDefault();
        if(!dragged) return;
        if (isDrag_type && !dragged.classList.contains('teacher-desk')) {
            dragged.style.left = (e.offsetX - (dragged.offsetWidth/2)) + "px";
            dragged.style.top = (e.offsetY - (dragged.offsetHeight/2)) + "px";
            setTimeout(() => {
                const desks = document.querySelectorAll('.desk:not(.teacher-desk)') as NodeListOf<HTMLElement>;
                for(const desk of desks) {
                    if(desk == dragged) continue;
                    if(!dragged) continue;
                    if(isLapping(dragged, desk)) {
                        dragged.style.left = (Number(desk.style.left.replace("px", "")) + 90) + "px";
                        dragged.style.top = desk.style.top;
                        break;
                    }
                }
            },500);
        }else if(!isDrag_type) {
            const value = e.dataTransfer?.getData("value");
            console.log(value);
            if(value) {
                (e.target as HTMLInputElement).value = value;
            }
        }
    });
    
    function isLapping(node1:HTMLElement, node2:HTMLElement) {
        const rect1 = node1.getBoundingClientRect();
        const rect2 = node2.getBoundingClientRect();
        return (
            rect1.right > rect2.left &&
            rect1.left < rect2.right &&
            rect1.bottom > rect2.top &&
            rect1.top < rect2.bottom
        );
    }
    
    saveButton.addEventListener('click', () => {
        if(isRandom) return;
        const desks = document.querySelectorAll('.desk:not(.teacher-desk)') as NodeListOf<HTMLElement>;
        const seatingArrangement = Array.from(desks).map(desk => ({
            id: desk.textContent,
            left: desk.style.left,
            top: desk.style.top
        }));
        
        const jsonData = JSON.stringify(seatingArrangement);
        ajax("POST", "/service/edit/seating", {
            values: {
                seat_json: jsonData
            },
            target: document.getElementById("script") as HTMLElement
        });
    });
    
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            classroomContainer.requestFullscreen();
            fullscreenBtn.innerHTML = '<i class="bi bi-fullscreen-exit"></i>';
            isFullscreen = true;
        } else {
            document.exitFullscreen();
            fullscreenBtn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
            isFullscreen = false;
        }
    });
    
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            fullscreenBtn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
            isFullscreen = false;
        }
    });

    let is_shaking = true;
    function shake() {
        function shake_right() {
            setTimeout(() => {
                toggleClass(classroom, "shake_right");
                if(is_shaking) shake_left();
            },400);
        }
        
        function shake_left() {
            setTimeout(() => {
                toggleClass(classroom, "shake_left");
                if(is_shaking) shake_right();
            },400);
        }

        toggleClass(classroom, "shake_right");
        shake_left();
    }

    var isRandom = false;
    randomBtn.addEventListener('click', () => {
        if(isRandom) return;
        if(!isFullscreen) fullscreenBtn.click();
        fullscreenBtn.style.opacity = "0";
        isRandom = true;
        let deskData:HTMLElement[] = [];
        const desks = document.querySelectorAll('.desk:not(.teacher-desk)') as NodeListOf<HTMLElement>;
        desks.forEach((desk) => {
            const node_input = desk.querySelector(".node_input") as HTMLInputElement;
            const num = Number(node_input.value.replace("번", ""));
            deskData[0] = desk;
            deskData[num] = desk;
        });    
        is_shaking = true;
        const min = Number(range_min.value);
        const max = Number(range_max.value);

        shake();
        setTimeout(() => {
            is_shaking = false;
            let exception:number[] = [];
            exception_input.value.split(",").forEach((str) => {
                if(!str) return;
                const num = Number(str);
                if(num >= min && num <= max) {
                    (deskData[num].querySelector(".node_input") as HTMLInputElement).value = "";
                    exception.push(num);
                }else {
                    alert("예외 숫자중 범위를 벗어난 숫자가 있습니다");
                    isRandom = false;
                    return;
                }
            });

            function change() {
                if(!isRandom) return;
                let index = Math.floor(Math.random() * max) + min;
                while(exception.includes(index)) {
                    index = Math.floor(Math.random() * max) + min;
                }

                let i = 0, random = Math.floor(Math.random() * max) + min;
                while(index == random && exception.includes(i) && i < 100) {
                    random = Math.floor(Math.random() * max) + min;
                    i++;
                }
                setTimeout(() => {
                    if(i >= 100) {
                        const node_input = deskData[index].querySelector(".node_input") as HTMLInputElement;
                        node_input.value = "";
                    }else {
                        const left = deskData[index].style.left;
                        const top = deskData[index].style.top;
                        deskData[index].style.left = deskData[random].style.left;
                        deskData[index].style.top = deskData[random].style.top;
                        deskData[random].style.left = left;
                        deskData[random].style.top = top;
                        exception.push(index);
                    }

                    if(exception.length < max) {
                        change();
                    }else {
                        isRandom = false;
                    }
                }, 500);
            }
            for(let i=0; i < 5; i++) {
                change();
            }

            fullscreenBtn.style.opacity = "1";
        }, 5000);
    });
}

type DeskData = {
    id: string;
    left: string;
    top: string;
}
