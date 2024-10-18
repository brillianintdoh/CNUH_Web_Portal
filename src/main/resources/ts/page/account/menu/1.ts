import { Timetable, mSb } from "../../materials";
const exception = [
    "국어", "독서", "수학", "영어", "진로", "통합사회", "한국사", "과학탐구", "미술", "음악", "체육", "스포츠 생활", "기술가정", 
    "정보", "자율", "창체"
];
export const change: { [key: string]: string } = {
    "세계": "세계사",
    "한국": "한국사",
    "세지": "세계지리",
    "여지": "여행지리",
    "동아": "동아시아사",
    "기가": "기술가정",
    "스생": "스포츠 생활",
    "생과": "생활과학",
    "물리": "물리학",
    "윤사": "윤리와사상",
    "생명": "생명과학",
    "인지": "인공지능 기초",
    "중문": "중국 문화",
    "통사": "통합사회",
    "고전": "고전 읽기",
    "지구": "지구과학",
    "생한": "생활과 한문",
    "통과": "통합과학",
    "과탐": "과학탐구",
}

export async function page_1() {
    const grade = (window as any).grade as string;
    if(grade == "1") return;
    const a = document.getElementsByName("a").item(0) as HTMLInputElement;
    const b = document.getElementsByName("b").item(0) as HTMLInputElement;
    const c = document.getElementsByName("c").item(0) as HTMLInputElement;
    const d = document.getElementsByName("d").item(0) as HTMLInputElement;

    a.value = (window as any).a as string;
    b.value = (window as any).b as string;
    c.value = (window as any).c as string;
    d.value = (window as any).d as string;
    await timetable_list(Number(grade));
}

async function timetable_list(grade:number) {
    var itrt:string[] = [];
    const itrt_cntnt = document.getElementById("itrt_cntnt") as HTMLDataListElement;

    const post = await fetch("/service/timetable", {method:"POST"});
    const json = await post.json() as Timetable;

    json.자료147[grade].forEach((class_nm) => {
        if(!Array.isArray(class_nm)) return;
        class_nm.forEach((day) => {
            if(!Array.isArray(day)) return;
            day.forEach((perio) => {
                if(perio != 0) {
                    const it = mSb(perio, json.분리) % json.분리;
                    let itrt_c = json.자료492[it];
                    if(typeof itrt_c == "string") {
                        itrt_c = itrt_c.replace(/\d+/g, "");
                        if(change[itrt_c]) itrt_c = change[itrt_c];
                        if(exception.includes(itrt_c) || itrt.includes(itrt_c)) return;
                        itrt.push(itrt_c);
                    }
                }
            });
        });
    });
    
    itrt.forEach((value) => {
        const option = document.createElement("option") as HTMLOptionElement;
        option.innerHTML = value;
        itrt_cntnt.appendChild(option);
    });
}