#include<emscripten/emscripten.h>
#include<emscripten/bind.h>
#include<emscripten/val.h>
#include<iostream>
using namespace std;
using namespace emscripten;

class Calendar {
    public:
        val window;
        int nowDay, fristWeek, now_month;
        string calendar_table[5][9] = {
            {"<tr>","<td></td>","<td></td>","<td></td>","<td></td>","<td></td>", "<td></td>", "<td></td>", "</tr>"},
            {"<tr>","<td></td>","<td></td>","<td></td>","<td></td>","<td></td>", "<td></td>", "<td></td>", "</tr>"},
            {"<tr>","<td></td>","<td></td>","<td></td>","<td></td>","<td></td>", "<td></td>", "<td></td>", "</tr>"},
            {"<tr>","<td></td>","<td></td>","<td></td>","<td></td>","<td></td>", "<td></td>", "<td></td>", "</tr>"},
            {"<tr>","<td></td>","<td></td>","<td></td>","<td></td>","<td></td>", "<td></td>", "<td></td>", "</tr>"}
        };
        Calendar();
        ~Calendar();

        void run(int day, int week);
        char* get();
};