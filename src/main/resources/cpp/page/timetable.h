#include<emscripten/emscripten.h>
#include<emscripten/bind.h>
#include<emscripten/val.h>
#include<iostream>
#include<utility>
#include<stdlib.h>
using namespace std;

typedef struct NODE {
    NODE* left;
    NODE* right;
    map<string, pair<int, int>> data;
}Node;

class TimeTable {
    public:
        Node* head;
        Node* next;
        string checkTable[16] = {
            "지구과학","세계사","고전 읽기","고전 읽기","한문","한문","지구과학","세계사",
            "고전 읽기","세계사","지구과학","고전 읽기","한문","한문","세계사","지구과학"
        };
        string time_table[7][7] = {
            {"<tr><th>1교시</th>","<td></td>","<td></td>","<td></td>","<td></td>","<td></td>","</tr>"},
            {"<tr><th>2교시</th>","<td></td>","<td></td>","<td></td>","<td></td>","<td></td>","</tr>"},
            {"<tr><th>3교시</th>","<td></td>","<td></td>","<td></td>","<td></td>","<td></td>","</tr>"},
            {"<tr><th>4교시</th>","<td></td>","<td></td>","<td></td>","<td></td>","<td></td>","</tr>"},
            {"<tr><th>5교시</th>","<td></td>","<td></td>","<td></td>","<td></td>","<td></td>","</tr>"},
            {"<tr><th>6교시</th>","<td></td>","<td></td>","<td></td>","<td></td>","<td></td>","</tr>"},
            {"<tr><th>7교시</th>","<td></td>","<td></td>","<td></td>","<td></td>","<td></td>","</tr>"}
        };
        string class_nm;
        map<string, string> check_abc;
        map<string, string> default_time;
        map<string, string> my_time;
        map<string, pair<int, int>> xyz;

        TimeTable();
        ~TimeTable();
        Node* add(string itrt, int x, int y);
        int sub_find(string check);
        int node_find(string check);
        void run(char* itrt, int x, int y);
        char* get();
};