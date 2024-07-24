import { SchoolTime, Time_Error } from "../../timetable";
const exception = ["진로활동", "동아리활동","자율활동"];

export async function page_1() {
    const a = document.getElementsByName("a").item(0) as HTMLInputElement;
    const a_class = document.getElementsByName("a_class").item(0) as HTMLInputElement;

    const b = document.getElementsByName("b").item(0) as HTMLInputElement;
    const b_class = document.getElementsByName("b_class").item(0) as HTMLInputElement;

    const c = document.getElementsByName("c").item(0) as HTMLInputElement;
    const c_class = document.getElementsByName("c_class").item(0) as HTMLInputElement;

    const d = document.getElementsByName("d").item(0) as HTMLInputElement;
    const d_class = document.getElementsByName("d_class").item(0) as HTMLInputElement;

    const a_value = ((window as any).a as string).split(",");
    const b_value = ((window as any).b as string).split(",");
    const c_value = ((window as any).c as string).split(",");
    const d_value = ((window as any).d as string).split(",");

    a.value = a_value[0];
    b.value = b_value[0];
    c.value = c_value[0];
    d.value = d_value[0];

    a_class.value = a_value[1];
    b_class.value = b_value[1];
    c_class.value = c_value[1];
    d_class.value = d_value[1];

    await timetable_list();
}

async function timetable_list() {
    const grade = (window as any).grade as string;

    var itrt:string[] = [];
    const itrt_cntnt = document.getElementById("itrt_cntnt") as HTMLDataListElement;

    const body = new URLSearchParams();
    body.append("grade", grade);

    const sem = (new Date().getMonth() <= 7) ? "1" : "2";
    body.append("sem", sem);
    const post = await fetch("/service/timetable", {
        method:"POST",
        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body: body.toString()
    });

    const json = await post.json() as SchoolTime;
    const error = json as unknown as Time_Error;
    if(error?.RESULT) {
        alert("선택과목 조회 실패");
        return;
    }
    
    json.hisTimetable[1].row.forEach((row) => {
        const list = row.ITRT_CNTNT.replace("Ⅰ", "");
        if(list && !itrt.includes(list) && !exception.includes(list)) {
            itrt.push(list);
        }
    });

    itrt.forEach((value) => {
        const option = document.createElement("option") as HTMLOptionElement;
        option.innerHTML = value;
        itrt_cntnt.appendChild(option);
    });
}