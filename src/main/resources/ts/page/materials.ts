import { toggleClass } from "htmx.org";
import { assembly } from "..";
import { change } from "./account/menu/1";
const grade = Number((window as any).grade as string);
let meals_json:Meals;

export async function materials() {
    (window as any).swap_meals = swap_meals;
    const time_json = await (await fetch("/service/timetable", { method:"POST" })).json() as Timetable;
    meals_json = await (await fetch("/service/meals", { method:"POST" })).json() as Meals;

    const meals_error = meals_json as unknown as Data_Error;
    if(meals_error?.RESULT) {
        alert("급식 조회 실패");
        return;
    }

    let meals_now = "";
    meals_json.mealServiceDietInfo[1].row.forEach((row) => {
        const date = new Date();
        const month = row.MLSV_YMD.substring(4, 6);
        const day = row.MLSV_YMD.substring(6, 8);

        if(Number(month) == date.getMonth()+1 && Number(day) == date.getDate()) {
            const menu = row.DDISH_NM.split("<br/>").toString().replace((/\s*\([^)]*\)/g), "").split(",");
            meals_now += "<tr> <td>"+row.MMEAL_SC_NM+"</td> <td>";

            menu.forEach((m) => {
                meals_now += m+", ";
            });
            meals_now = meals_now.substring(0, meals_now.length-2);
            meals_now+="</td> </tr>";
        }
    });
    (document.getElementById("meals_now") as HTMLElement).innerHTML = meals_now;

    (document.getElementById("default_btn") as HTMLButtonElement).click();
    
    assembly.init(1);
    time_json.자료147[grade].forEach((class_nm, c_in) => {
        if(!Array.isArray(class_nm)) return;
        class_nm.forEach((day, d_in) => {
            if(!Array.isArray(day)) return;
            day.forEach((perio, p_in) => {
                if(perio != 0) {
                    const it = mSb(perio, time_json.분리) % time_json.분리;
                    let itrt = time_json.자료492[it];
                    if(typeof itrt == "string") {
                        itrt = itrt.replace(/\d+/g, "");
                        if(change[itrt]) itrt = change[itrt];
                        assembly.time_push(itrt, d_in, p_in-1, c_in);
                    }
                }
            });
        });
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

export function mSb(mm:number, m2:number) {
    if (m2 == 100) {
        return mm % m2;
    }
    return Math.floor(mm / m2);
}

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

export type Timetable = {
    교사수: number;
    자료446: string[];
    학급수: number[];
    요일별시수: number[][];
    자료492: string[] | number[];
    자료481: (number | (number | (number | number[])[])[])[];
    전일제: number[];
    버젼: string;
    동시수업수: number;
    담임: number[][];
    가상학급수: number[];
    특별실수: number;
    열람제한일: string;
    자료244: string;
    학기시작일자: string;
    학교명: string;
    지역명: string;
    학년도: number;
    분리: number;
    강의실: number;
    시작일: string;
    일과시간: string[];
    일자자료: (number | string)[][];
    오늘r: number;
    자료147: number[][][][]; 
    자료542: (number | (number | (number | number[])[])[])[];
    자료245: (number | (number | (number | number[])[])[])[];
    동시그룹: number[][];
};