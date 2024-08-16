var time_table:string[][] = [
    ["<tr><th>1교시</th>","<th></th>","<th></th>","<th></th>","<th></th>","<th></th>"],
    ["<tr><th>2교시</th>","<th></th>","<th></th>","<th></th>","<th></th>","<th></th>"],
    ["<tr><th>3교시</th>","<th></th>","<th></th>","<th></th>","<th></th>","<th></th>"],
    ["<tr><th>4교시</th>","<th></th>","<th></th>","<th></th>","<th></th>","<th></th>"],
    ["<tr><th>5교시</th>","<th></th>","<th></th>","<th></th>","<th></th>","<th></th>"],
    ["<tr><th>6교시</th>","<th></th>","<th></th>","<th></th>","<th></th>","<th></th>"],
    ["<tr><th>7교시</th>","<th>창체</th>","<th></th>","<th></th>","<th></th>","<th></th>","</tr>"]
];
const first = new Map<string,string>();
const default_first = ["수학","문학","영어","동아리활동","진로활동","스포츠 생활"];
const check = ["1","2","3","4","5","6","null"];
const class_nm = (window as any).class_nm;
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
    first.set(A[0], A[1]);
    first.set(B[0], B[1]);
    first.set(C[0], C[1]);
    first.set(D[0], D[1]);
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
    json.hisTimetable[1].row.forEach((row) => {
        const perio = Number(row.PERIO);
        if(time_check(row)) {
            const year = row.ALL_TI_YMD.substring(0, 4);
            const month = row.ALL_TI_YMD.substring(4, 6);
            const day = row.ALL_TI_YMD.substring(6, 8);
            
            const date = new Date(year + "-" + month + "-" + day);
            time_table[perio-1][date.getDay()] = "<th>"+row.ITRT_CNTNT+"</th>";
        }
    });
    (document.getElementById("timetable") as HTMLElement).innerHTML = time_table.toString().replace(/,/g,"");
}

function time_check(row:row):boolean {
    var result = false;
    const itrt = row.ITRT_CNTNT.replace("Ⅰ", "");
    if(default_first.includes(itrt) && row.CLASS_NM == class_nm) {
        result = true;
    }else {
        const is = first.get(itrt);
        if(is) {
            if(is == "null" || is == row.CLASS_NM) {
                result = true;
            }
        }
    }
    return result;
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