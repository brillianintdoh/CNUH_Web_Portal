import { assembly } from "..";

export async function calendar() {
    const json = await (await fetch("/service/calendar", { method: "POST" })).json() as Calendar;
    const date = new Date();
    const year = date.getFullYear();
    let su_month = date.getMonth()+1;

    (window as any).nowDay = date.getDate();
    (window as any).now_month = su_month;
    (window as any).swap_calendar = swap_calendar;
    (document.getElementById("calendarTable_"+su_month) as HTMLElement).innerHTML = getCalendar(su_month);

    function getCalendar(month:number) {
        (window as any).lastDay = new Date(year, month, 0).getDate();
        (window as any).fristWeek = new Date(year, month-1, 1).getDay()+1;
        (window as any).month = month;
        assembly.init(2);
        
        json.SchoolSchedule[1].row.forEach((row) => {
            const month_str = row.AA_YMD.substring(4, 6);
            const day = row.AA_YMD.substring(6, 8);
            
            if(Number(month_str) == month) {
                (window as any).row = row;
                const date = new Date(year +"-"+ month_str +"-"+ day);
                assembly.calendar_push(date.getDate(), month);
            }
        });

        return assembly.getCalendar();
    }

    function swap_calendar(month:string|number) {
        const month_nmb = Number(month);
        const calendar_table = document.getElementById("calendarTable_"+month) as HTMLElement;
        if(calendar_table.innerHTML == '') {
            calendar_table.innerHTML = getCalendar(month_nmb);
        }
        (document.getElementById("calendar_"+month) as HTMLElement).style.display = 'block';

        (document.getElementById("calendar_"+su_month) as HTMLElement).style.display = 'none';
        su_month = month_nmb
    }
}




type GRADE_EVENT = "Y" | "N" | "*";

type row = {
    ATPT_OFCDC_SC_CODE:string,
    SD_SCHUL_CODE:string,
    AY:string,
    AA_YMD:string, // 학사일자
    ATPT_OFCDC_SC_NM:string,
    SCHUL_NM:string,
    DGHT_CRSE_SC_NM:string,
    SCHUL_CRSE_SC_NM:string,
    EVENT_NM:string, // 행사명
    EVENT_CNTNT:string, // 행사내용
    ONE_GRADE_EVENT_YN: GRADE_EVENT, // 1학년행사여부
    TW_GRADE_EVENT_YN: GRADE_EVENT, // 2학년행사여부
    THREE_GRADE_EVENT_YN: GRADE_EVENT, // 3학년행사여부
    FR_GRADE_EVENT_YN: GRADE_EVENT, // 4학년행사여부
    FIV_GRADE_EVENT_YN: GRADE_EVENT, // 5학년행사여부
    SIX_GRADE_EVENT_YN: GRADE_EVENT, // 6학년행사여부
    SBTR_DD_SC_NM: "공휴일" | "휴업일" | "해당없음",
    LOAD_DTM: string
}

type Calendar = {
    SchoolSchedule: [
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
            row:row[]
        }
    ]
}