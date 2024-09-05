#include "calendar.h"

Calendar::Calendar() {
    window = val::global("window");
    int lastDay = window["lastDay"].as<int>();
    int month = window["month"].as<int>();
    now_month = window["now_month"].as<int>();
    fristWeek = window["fristWeek"].as<int>();
    nowDay = window["nowDay"].as<int>();

    int day = 1, week = fristWeek;
    for(int i=0; i < 5; i++) {
        for(int j=week; j <= 7; j++) {
            string *table = &calendar_table[i][j];
            string className = "";
            string EVENT_NM = "평일";
        
            if(j == 7 || j == 1) {
                className = "holiday ";
                EVENT_NM = "주말";
            }

            string classTd = "";
            if(nowDay == day && now_month == month) {
                classTd = "current-day";
            }

            *table = "<td class='"+classTd+"'>\
                <div class='day'>\
                    <p class='day_p "+className+"'>"+to_string(day)+"</p>"+
                    EVENT_NM+"<br>"+
                "</div>\
            </td>";
            day++;

            if(day > lastDay) return;

            week = 1;
        }
    }
}

Calendar::~Calendar() {};

void Calendar::run(int day, int month) {
    val row = window["row"];
    string classTd = "";
    string className = "";
    int week = fristWeek, date = 0;

    for(int i=0; i < 5; i++) {
        for(int j=week; j <= 7; j++) {
            date++;
            if(date == day) {
                string* table = &calendar_table[i][j];
                string EVENT_NM = row["EVENT_NM"].as<string>();
                string SBTR_DD_SC_NM = row["SBTR_DD_SC_NM"].as<string>();
                if(SBTR_DD_SC_NM != "해당없음") {
                    className = "holiday";
                }
    
                if(EVENT_NM == "토요휴업일") {
                    EVENT_NM = "주말";
                }

                if(nowDay == day && month == now_month) {
                    classTd = "current-day";
                }

                *table = "<td class='"+classTd+"'>\
                    <div class='day'>\
                        <p class='day_p "+className+"'>"+to_string(day)+"</p>"+
                        EVENT_NM+"<br>"+row["EVENT_CNTNT"].as<string>()+
                    "</div>\
                </td>";
                return;
            }else {
                week = 1;
            }
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