#include "calendar.h"

Calendar::Calendar() {
    window = val::global("window");
    int lastDay = window["lastDay"].as<int>();
    now_month = window["now_month"].as<int>();
    fristWeek = window["fristWeek"].as<int>();
    nowDay = window["nowDay"].as<int>();

    int day = 1, week = fristWeek;
    for(int i=0; i < 5; i++) {
        for(int j=week; j <= 7; j++) {
            string className = "";
            string classTd = "";
            string EVENT_NM = "평일";
        
            if(j == 7 || j == 1) {
                className = "holiday";
                EVENT_NM = "주말";
            }

            if(nowDay == day) {
                classTd = "current-day";
            }

            calendar_table[i][j] = "<td class='"+classTd+"'>\
                <div class='day'>\
                    <p class='day_p "+className+"'>"+to_string(day)+"</p>"+
                    EVENT_NM+
                "</div>\
            </td>";
            day++;

            if(day > lastDay) return;

            week = 1;
        }
    }
}

Calendar::~Calendar() {};

void Calendar::run(int date, int month) {
    val row = window["row"];
    int week = fristWeek, day = 0, is = 0;
    string classTd, className, EVENT_NM, EVENT_CNTNT, SBTR_DD_SC_NM;
    string* table = NULL;

    for(int i=0; i < 5; i++) {
        for(int j=week; j <= 7; j++) {
            table = &calendar_table[i][j];
            if(*table == "<td></td>") continue;

            day++;
            if(day == nowDay && month == now_month) {
                if(table->find("<br>") != string::npos) continue;
                is = 2;
                classTd = "current-day";
            }else if(day == date) {
                is = 1;
                classTd = "";
            }

            if(is) {
                if(day == date) {
                    EVENT_NM = row["EVENT_NM"].as<string>();
                    EVENT_CNTNT = row["EVENT_CNTNT"].as<string>();
                    SBTR_DD_SC_NM = row["SBTR_DD_SC_NM"].as<string>();
                    if(is == 2) classTd = "current-day";
                }else {
                    EVENT_NM = "";
                    EVENT_CNTNT = "";
                    SBTR_DD_SC_NM = "해당없음";
                }

                if(SBTR_DD_SC_NM != "해당없음") {
                    className = "holiday";
                }
                
                if(EVENT_NM == "토요휴업일" || j == 7 || j == 1) {
                    className = "holiday";
                    EVENT_NM = "주말";
                }

                *table = "<td class='"+classTd+"'>\
                    <div class='day'>\
                        <p class='day_p "+className+"'>"+to_string(day)+"</p>"+
                        EVENT_NM+"<br>"+EVENT_CNTNT+
                    "</div>\
                </td>";

                if(is != 2) return;
                week = 1;
            }else {
                week = 1;
            }
            is = 0;
        }
    }
    cout << "에러 (날짜를 찾지 못함)" << endl;
}

char* Calendar::get() {
    string result = "";
    for(int i=0; i < 5; i++) {
        for(int j=0; j < 9; j++) {
            result.append(calendar_table[i][j]);
        }
    }
    char* str = const_cast<char*>(result.c_str());
    return str;
}