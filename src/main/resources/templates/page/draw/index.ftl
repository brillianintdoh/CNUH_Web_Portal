<!DOCTYPE html>
<html>
    <head>
        <title>자리 배치</title>
        <meta charset="UTF-8">
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link href="/img/calendar.png" rel="icon">
        <link rel="stylesheet" href="/css/draw.css">
        <script src="/js/boot.js"></script>
    </head>
    <body>
        <main id="draw_page">
            <div class="container">
                <h1 class="text-center mb-4">우리 ${class_nm}반 자리 배치</h1>
                <#if right>
                    <div class="mt-3" style="text-align:right;">
                        <button id="initBtn" class="btn btn-danger">초기화</button>
                        <button id="addDeskBtn" class="btn btn-success">자리 추가</button>
                        <button id="saveButton" class="btn btn-primary">자리 배치 저장</button>
                    </div>
                </#if>
                <br>
                <div class="classroom-container" id="classroomContainer">
                    <div class="classroom" id="classroom">
                        <button class="btn btn-secondary fullscreen-btn" id="fullscreenBtn">
                            <i class="bi bi-arrows-fullscreen"></i>
                        </button>
                        <div class="blackboard">
                            <h2>칠판</h2>
                        </div>
                        <div class="node_list">
                            <div class="desk teacher-desk">선생님</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <script>
            window.layoutJson = '[{"id":"1번","left":"40px","top":"220px"},{"id":"2번","left":"160px","top":"220px"},{"id":"3번","left":"300px","top":"220px"},{"id":"4번","left":"420px","top":"220px"},{"id":"5번","left":"560px","top":"220px"},{"id":"6번","left":"690px","top":"220px"},{"id":"7번","left":"40px","top":"330px"},{"id":"8번","left":"160px","top":"330px"},{"id":"9번","left":"300px","top":"330px"},{"id":"10번","left":"420px","top":"330px"},{"id":"11번","left":"560px","top":"330px"},{"id":"12번","left":"690px","top":"330px"},{"id":"13번","left":"40px","top":"440px"},{"id":"14번","left":"160px","top":"440px"},{"id":"15번","left":"300px","top":"440px"},{"id":"16번","left":"420px","top":"440px"},{"id":"17번","left":"560px","top":"440px"},{"id":"18번","left":"690px","top":"440px"},{"id":"19번","left":"40px","top":"550px"},{"id":"20번","left":"160px","top":"550px"},{"id":"21번","left":"300px","top":"550px"},{"id":"22번","left":"420px","top":"550px"},{"id":"23번","left":"560px","top":"550px"},{"id":"24번","left":"690px","top":"550px"},{"id":"25번","left":"40px","top":"660px"},{"id":"26번","left":"160px","top":"660px"},{"id":"27번","left":"300px","top":"660px"},{"id":"28번","left":"420px","top":"660px"},{"id":"29번","left":"560px","top":"660px"},{"id":"30번","left":"690px","top":"660px"}]';
        </script>
        <script src="/js/index.js"></script>
    </body>
</html>