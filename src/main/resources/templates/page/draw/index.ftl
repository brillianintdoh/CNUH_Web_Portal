<!DOCTYPE html>
<html>
    <head>
        <title>자리 배치</title>
        <meta charset="UTF-8">
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link href="/img/icon.png" rel="icon">
        <link rel="stylesheet" href="/css/draw.css">
        <script src="/js/boot.js"></script>
    </head>
    <body>
        <main id="draw_page">
            <div class="container">
                <h1 class="text-center mb-4">${data['grade']}학년 ${data['class_nm']}반 자리 배치</h1>
                <#if right || is_edit>
                    <div class="mt-3" style="text-align:right;">
                        <button id="initBtn" class="btn btn-danger">초기화</button>
                        <button id="addDeskBtn" class="btn btn-success">자리 추가</button>
                        <button id="saveButton" class="btn btn-primary">자리 배치 저장</button>
                        <button class="btn btn-light" onclick="seating_print()">자리 배치 인쇄</button>
                    </div>
                </#if>
                <br>
                <div class="classroom-container" id="classroomContainer">
                    <div class="classroom" id="classroom">
                        <button class="btn btn-secondary fullscreen-btn" id="fullscreenBtn">
                            <i class="bi bi-arrows-fullscreen"></i>
                        </button>
                        <div class="blackboard">
                            <h1>칠판</h1>
                        </div>
                        <div class="btn_container">
                            <button id="clearBtn" class="btn btn-secondary" style="margin: 0 5px;" data-bs-toggle="modal" data-bs-target="#Modal2">
                                <i class="bi bi-gear"></i>
                                설정
                            </button>
                            <button id="randomBtn" class="btn btn-primary" style="margin: 0 5px;"> 
                                <i class="bi bi-shuffle"></i>
                                랜덤 배치
                            </button>
                            <button class="btn btn-primary" style="margin: 0 5px;" data-bs-toggle="modal" data-bs-target="#Modal">
                                <i class="bi bi-arrow-up-left-square"></i>
                                랜덤배치 사용법
                            </button>
                        </div>
                        <div class="node_list">
                            <div class="desk teacher-desk">선생님</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <#include "./modal.html" encoding="UTF-8" />
        <script>
            window.layoutJson = '${data["seating"]}';
        </script>
        <script src="/js/index.js"></script>
    </body>
</html>