#include "page/timetable.h"
#include "page/calendar.h"
TimeTable* timetable;
Calendar* calendar;

extern "C" {
    void init(int op) {
        if(op == 1) {
            timetable = new TimeTable();
        }else if(op == 2) {
            calendar = new Calendar();
        }
    }

    void time_push(char* itrt, int x, int y, int class_time) {
        timetable->run(itrt, x, y, class_time);
    }

    char* getTimetable() {
        return timetable->get();
    }

    void calendar_push(int date, int month) {
        calendar->run(date, month);
    }

    char* getCalendar() {
        char* result = calendar->get();
        delete calendar;
        return result;
    }
}