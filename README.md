# brillianintdoh (개발자) <img src="https://avatars.githubusercontent.com/u/133849984?v=4" align=left width=100> 
> 학생 개발자 • **백엔드**
<hr>
<br>
<p align="center">
    <a href="https://cberi.ourgram.co.kr">
        <img src="./diagram/img/badge.png" width="80" >
    </a>
</p>
<h1 align="center">충북대사범대학부설고등학교 웹포털 사이트</h1>

<br>
<br>

# 📝 프로젝트 설명

## 프로젝트 명칭
- 충북대사범대학부설고등학교 웹포털 사이트

## 프로젝트 설명
- 충북대사범대학부설고등학교의 웹포털 사이트를 제작하는 프로젝트입니다
- 이 웹사이트는 학생과 선생님의 편의를 위해 제작되었습니다
- 웹사이트를 제작하기 위해 HTML, CSS, TypeScript, FreeMarker, C++ 등의 프로그래밍 언어를 사용하였습니다
- 웹사이트의 기능은 다음과 같습니다
    - 사용자가 회원가입 및 로그인이 가능합니다
    - 사용자가 자신의 정보를 관리할 수 있습니다
    - 사용자끼리 실시간 채팅을 할 수 있습니다
    - 학교 수업시간표, 급식표를 조회할수 있습니다

<br>

# 프로젝트 요소

## WebAssembly 사용
- WebAssembly는 애플리케이션의 성능을 향상시키기 위해 사용되었습니다
- C++로 작성된 코드를 WebAssembly로 컴파일하여 브라우저에서 실행할 수 있게 하였습니다.
- 정보과학 시간에 배운 리스트를 사용했고 쉬운 관리를 위해 class도 사용되었습니다
- 시간표 정리은 1반 시간표를 기준으로 만들어졌습니다
- WebAssembly로 컴파일된 코드는 브라우저에서 직접 실행되어 빠른 성능을 제공합니다.

- ### 원리
    - `init` 함수를 먼저 실행해 class `TimeTable`를 준비합니다
    - `timetable.ts`에서 실시간 시간표 값을 json 형태로 받아오고 정보가 있는 row 배열을 `forEach`으로 모든 값을 돌려봅니다
    - row 값에 과목명을 c++에 `time_check` 라는 함수에 파리미터로 보냅니다
    - 그 후 아래 작업을 반복한후 `getTimetable`를 호출해 시간표를 가져옵니다
```cpp
if(default_time[itrt] == "1" && class_time == class_nm) { // 필수 과목이고 자신의 반 수업이라면
    time_table[y][x] = "<td>"+string(itrt)+"</td>";
    return; // 추가후 리턴
}

if(class_time == 1) { // 1반을 기준으로 잡는다
    int index = sub_find(itrt); // 1반의 과목의 디폴트 선택과목들인지 확인한다 (고전 읽기: A, 한문:B, 지구과학:C, 세계사:D) 를 기준
    if(index != -1) {
        checkTable[index] = "null"; // 삭제
        next = add(check_abc[itrt], x,y); // 현재 x,y 좌표가 A,B,C,D 과목 중 하나라면 그 위치를 이중연결리스트에 저장합니다
    }
}

if(my_time.find(itrt) != my_time.end()) { // 과목명이 자신의 선택과목인지 확인합니다
    string check = my_time[itrt]; // 맞다면 그 과목의 알파벳을 가져옵니다
    if(node_find(check)) { // 리스트에서 그 과목이 없다면 0(false)를 리턴하고 만약 있다면 xyz 변수에 좌표를 저장한후 1(true)를 리턴합니다
        time_table[xyz[check].second][xyz[check].first] = "<td>"+string(itrt)+"</td>";
    }
}
```
<hr>
<br>

# 프로젝트 목표
- 프로젝트를 문제없이 완성하고 배포하는 것

<br>
<br>

# 💻 사용된 기술
<div align="center">
    <img src="https://img.shields.io/badge/springboot-6DB33F?style=flat-square&logo=springBoot&logoColor=white"> <img src="https://img.shields.io/badge/webassembly-654FF0?style=flat-square&logo=webassembly&logoColor=white"> <img src="https://img.shields.io/badge/webpack-8DD6F9?style=flat-square&logo=webpack&logoColor=white">
    <br>
    <img src="https://img.shields.io/badge/htmx-3366CC?style=flat-square&logo=htmx&logoColor=white"> <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=Bootstrap&logoColor=white">
    <br>
    <img src="https://img.shields.io/badge/MySql-4479A1?style=flat-square&logo=MySql&logoColor=white">
</div>

<br>
<br>

# 🏭 시스템
<div align="center">
    <img src="./diagram/img/System.png" width="900">
</div>

<br>

# Author
<a href="https://matilto:palanghwi@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-F051385?style=flat-square&logo=Gmail&logoColor=white"/>
</a>