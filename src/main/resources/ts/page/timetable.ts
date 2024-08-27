import { assembly } from "..";
const first = new Map<string,{ itrt:string, class_nm:string }>();
const check = ["1","2","3","4","5","6","null"];
const grade = (window as any).grade as string;

export async function timetable() {
    const body = new URLSearchParams();
    body.append("grade", grade);

    const sem = (new Date().getMonth()+1 <= 7) ? "1" : "2";
    body.append("sem", sem);
    const post = await fetch("/service/timetable", {
        method:"POST",
        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body: body.toString()
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
    var ch = false;

    first.forEach((key, value) => {
        if(check.includes(value)) {
            ch = true;
        }
    });

    const json = await post.json() as SchoolTime;
    const error = json as unknown as Time_Error;
    if(error?.RESULT || ch) {
        alert("시간표 조회 실패");
        return;
    }
    (window as any).json = json;
    assembly.init();

    json.hisTimetable[1].row.forEach((row) => {
        (window as any).row = row;
        (window as any).CLASS_TIME = String(row.CLASS_NM);
        const itrt = row.ITRT_CNTNT.replace("Ⅰ", "").replace("Ⅱ", "");
        const perio = Number(row.PERIO);
        const year = row.ALL_TI_YMD.substring(0, 4);
        const month = row.ALL_TI_YMD.substring(4, 6);
        const day = row.ALL_TI_YMD.substring(6, 8);
        const date = new Date(year + "-" + month + "-" + day);

        console.log(itrt, date.getDay(), perio-1);
        assembly.time_check(itrt, date.getDay(), perio-1);
    });
    (document.getElementById("timetable") as HTMLElement).innerHTML = assembly.getTimetable();
}

export type row = {
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

export type SchoolTime = {
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
            row:row[]
        }
    ]
};

export type Time_Error = {
    RESULT:{
        CODE:string,
        MESSAGE:string
    }
}