#include "page/timetable.h"
TimeTable* timetable;

extern "C" {
    void init() {
        timetable = new TimeTable();
    }

    void time_check(char* itrt, int x, int y) {
        timetable->run(itrt, x, y);
    }

    char* getTimetable() {
        return timetable->get();
    }
}