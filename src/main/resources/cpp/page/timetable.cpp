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
    this->default_time["동아리활동"] = "1";
    this->default_time["진로활동"] = "1";
    this->default_time["스포츠 생활"] = "1";
    this->default_time["자율활동"] = "1";

    class_nm = val::global("class_nm").as<string>();
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

void TimeTable::run(char* itrt, int x, int y) {
    val row = val::global("row");
    val first = val::global("first");
    string CLASS_TIME  = val::global("CLASS_TIME").as<string>();

    if(default_time[itrt].compare("1") == 0) {
        if(CLASS_TIME == class_nm) {
            time_table[y][x] = "<td>"+row["ITRT_CNTNT"].as<string>()+"</td>";
            return;
        } 
    }

    if(CLASS_TIME == "1") {
        int index = sub_find(itrt);
        if(index != -1) {
            checkTable[index] = "null";
            next = add(check_abc[itrt], x,y);
        }
    }

    if(my_time.find(itrt) != my_time.end()) {
        string check = my_time[itrt];
        string first_class_nm = first.call<val>("get", check)["class_nm"].as<string>();
        if(atoi(CLASS_TIME.c_str()) == 0) CLASS_TIME = "null";

        if(CLASS_TIME == first_class_nm) {
            if(node_find(check)) {
                time_table[xyz[check].second][xyz[check].first] = "<td>"+row["ITRT_CNTNT"].as<string>()+"</td>";
            }
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

int TimeTable::sub_find(string itrt) {
    for(int i = 0; i < 16; i++) {
        if(checkTable[i] == itrt) {
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