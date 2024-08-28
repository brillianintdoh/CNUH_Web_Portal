import { toggleClass } from "htmx.org";
import { assembly } from "..";
const first = new Map<string,{ itrt:string, class_nm:string }>();
const check = ["1","2","3","4","5","6","null"];
const grade = (window as any).grade as string;
let meals_json:Meals;

export async function materials() {
    const body = new URLSearchParams();
    body.append("grade", grade);

    const sem = (new Date().getMonth()+1 <= 7) ? "1" : "2";
    body.append("sem", sem);
    const post = await fetch("/service/timetable", {
        method:"POST",
        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body: body
    });
    const A = ((window as any).A as string).split(",");
    const B = ((window as any).B as string).split(",");
    const C = ((window as any).C as string).split(",");
    const D = ((window as any).D as string).split(",");
    (window as any).A = A[0];
    (window as any).B = B[0];
    (window as any).C = C[0];
    (window as any).D = D[0];

    first.set("A", { itrt:A[0], class_nm:A[1].toString() });
    first.set("B", { itrt:B[0], class_nm:B[1].toString() });
    first.set("C", { itrt:C[0], class_nm:C[1].toString() });
    first.set("D", { itrt:D[0], class_nm:D[1].toString() });
    (window as any).first = first;
    (window as any).swap_meals = swap_meals;
    var ch = false;

    first.forEach((key, value) => {
        if(check.includes(value)) {
            ch = true;
        }
    });

    meals_json = await (await fetch("/service/meals", { method:"POST" })).json() as Meals;
    const time_json = await post.json() as Timetable;
    const time_error = time_json as unknown as Data_Error;
    const meals_error = meals_json as unknown as Data_Error;
    if(time_error?.RESULT || ch) {
        alert("시간표 조회 실패");
        return;
    }

    if(meals_error?.RESULT) {
        alert("급식 조회 실패");
        return;
    }

    (document.getElementById("default_btn") as HTMLButtonElement).click();

    assembly.init();
    time_json.hisTimetable[1].row.forEach((row) => {
        (window as any).row = row;
        (window as any).CLASS_TIME = String(row.CLASS_NM);
        const itrt = row.ITRT_CNTNT.replace("Ⅰ", "").replace("Ⅱ", "");
        const perio = Number(row.PERIO);
        const year = row.ALL_TI_YMD.substring(0, 4);
        const month = row.ALL_TI_YMD.substring(4, 6);
        const day = row.ALL_TI_YMD.substring(6, 8);
        const date = new Date(year + "-" + month + "-" + day);

        assembly.time_check(itrt, date.getDay(), perio-1);
    });
    (document.getElementById("timetable") as HTMLElement).innerHTML = assembly.getTimetable();
}

let document_now:HTMLElement|null = null;
function swap_meals(evt:any) {
    const evt_documnet = evt.target as HTMLElement;
    if(evt_documnet == document_now) return;

    if(document_now != null) {
        toggleClass(evt_documnet, "active");
        toggleClass(document_now, "active");
    }

    document_now = evt_documnet;
    const mmeal = evt_documnet.innerHTML;
    let meals = "";
    meals_json.mealServiceDietInfo[1].row.forEach((row) => {
        if(row.MMEAL_SC_NM == mmeal) {
            const month = row.MLSV_YMD.substring(4, 6);
            const day = row.MLSV_YMD.substring(6, 8);
            const menu = row.DDISH_NM.split("<br/>").toString().replace((/\s*\([^)]*\)/g), "").split(",");
            meals += "<tr> <td>"+month+"/"+day+"</td> <td>"+row.MMEAL_SC_NM+"</td> <td>";

            menu.forEach((m) => {
                meals += m+", ";
            });
            meals = meals.substring(0, meals.length-2);
            meals+="</td> </tr>";
        }
    });
    (document.getElementById("meals_menu") as HTMLElement).innerHTML = mmeal;
    (document.getElementById("meals") as HTMLElement).innerHTML = meals;
}

export type time_row = {
    ATPT_OFCDC_SC_CODE:string,
    ATPT_OFCDC_SC_NM:string,
    SD_SCHUL_CODE:string,
    SCHUL_NM:string,
    AY:string,
    SEM:string,
    ALL_TI_YMD:string,
    DGHT_CRSE_SC_NM:string,
    ORD_SC_NM:string,
    DDDEP_NM:string,
    GRADE:string,
    CLRM_NM:string,
    CLASS_NM:string,
    PERIO:string,
    ITRT_CNTNT:string,
    LOAD_DTM:string
};

export type Timetable = {
    hisTimetable:[
        {
            head :[
                {
                    list_total_count:number
                },
                {
                    RESULT: {
                        CODE:string,
                        MESSAGE:string
                    }
                }
            ]
        },
        {
            row:time_row[]
        }
    ]
};

export type Data_Error = {
    RESULT:{
        CODE:string,
        MESSAGE:string
    }
}

type meals_row = {
    ATPT_OFCDC_SC_CODE: string,
    ATPT_OFCDC_SC_NM: string,
    SD_SCHUL_CODE: string,
    SCHUL_NM: string,
    MMEAL_SC_CODE: string, 
    MMEAL_SC_NM: string, // 급식 종류 (중식, 석식)
    MLSV_YMD: string, // 급식일자
    MLSV_FGR: number,
    DDISH_NM: string, // 메뉴
    ORPLC_INFO: string, // 원산지정보
    CAL_INFO: string, // 칼로리
    NTR_INFO: string, // 영양정보
    MLSV_FROM_YMD: string,
    MLSV_TO_YMD: string,
    LOAD_DTM: string
};

type Meals = {
    mealServiceDietInfo: [
        {
            head: [
                {
                    list_total_count:number
                },
                {
                    RESULT: {
                        CODE:string,
                        MESSAGE:string
                    }
                }
            ]
        },
        {
            row: meals_row[]
        }
    ]
};