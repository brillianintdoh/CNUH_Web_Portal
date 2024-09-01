#include "timetable.h"
#include<string.h>
using namespace emscripten;

TimeTable::TimeTable() {
    head = NULL;

    this->check_abc["고전 읽기"] = "A";
    this->check_abc["한문"] = "B";
    this->check_abc["지구과학"] = "C";
    this->check_abc["세계사"] = "D";

    this->default_time["수학"] = "1";
    this->default_time["문학"] = "1";
    this->default_time["영어"] = "1";
    this->default_time["독서"] = "1";
    this->default_time["진로"] = "1";
    this->default_time["스포츠 생활"] = "1";
    this->default_time["창체"] = "1";
    this->default_time["자율"] = "1";

    class_nm = val::global("class_nm").as<int>();
    my_time[val::global("A").as<string>()] = "A";
    my_time[val::global("B").as<string>()] = "B";
    my_time[val::global("C").as<string>()] = "C";
    my_time[val::global("D").as<string>()] = "D";
}

TimeTable::~TimeTable() {
    Node* tmp = head->right;
    while (tmp != head) {
        tmp = tmp->right;
        delete tmp;
    }
    delete tmp;
}

void TimeTable::run(char* itrt, int x, int y, int class_time) {
    if(default_time[itrt] == "1") {
        if(class_time == class_nm) {
            time_table[y][x] = "<td>"+string(itrt)+"</td>";
            return;
        } 
    }

    if(class_time == 1) {
        int index = sub_find(itrt);
        if(index != -1) {
            checkTable[index] = "null";
            next = add(check_abc[itrt], x,y);
        }
    }

    if(my_time.find(itrt) != my_time.end()) {
        string check = my_time[itrt];

        if(node_find(check)) {
            time_table[xyz[check].second][xyz[check].first] = "<td>"+string(itrt)+"</td>";
        }
    }
}

Node* TimeTable::add(string check, int x, int y) {
    Node* newNode = new Node();
    if(head == NULL) {
        newNode->right = NULL;
        newNode->left = NULL;
        newNode->data[check].first = x;
        newNode->data[check].second = y;
        head = newNode;
    }else {
        newNode->data[check].first = x;
        newNode->data[check].second = y;

        newNode->right = next->right;
        newNode->left = next;
        next->right->left = newNode;
        next->right = newNode;
    }
    return newNode;
}

char* TimeTable::get() {
    string result = "";
    for(int i = 0; i < 7; i++) {
        for(int j = 0; j < 7; j++) {
            result.append(time_table[i][j]);
        }
    }
    char* str = const_cast<char*>(result.c_str());
    return str;
}

int TimeTable::sub_find(string itrt_c) {
    for(int i = 0; i < 16; i++) {
        if(checkTable[i] == itrt_c) {
            return i;
        }
    }
    return -1;
}

int TimeTable::node_find(string check) {
    Node* tmp = head;
    while(tmp != NULL) {
        if(tmp->data.find(check) != tmp->data.end()) {
            if(tmp == head) {
                head = tmp->right;
                tmp->left->right = head;
                head->left = tmp->left;
            }else {
                tmp->left->right = tmp->right;
                tmp->right->left = tmp->left;
            }
            xyz[check] = tmp->data[check];
            delete tmp;
            return 1;
        }
        tmp = tmp->right;
    }
    return 0;
}