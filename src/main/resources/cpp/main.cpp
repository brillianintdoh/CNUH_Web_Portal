#include "page/timetable.h"
TimeTable* timetable;

extern "C" {
    void init() {
        timetable = new TimeTable();
    }

    void time_check(char* itrt, int x, int y, int class_time) {
        timetable->run(itrt, x, y, class_time);
    }

    char* getTimetable() {
        return timetable->get();
    }
}