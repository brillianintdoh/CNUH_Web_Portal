<html>
    <head>
        <title> 학사일정 </title>
        <meta charset="UTF-8">
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <script src="/js/boot.js"></script>
        <link href="/img/calendar.png" rel="icon">
        <link href="/css/calendar.css" rel="stylesheet">
    </head>
    <body>
        <main id="calendar_page">
            <div class="calendar-header">
                <select class="form-select" style="width:55%;" onchange="swap_calendar(this.value)">
                    <#list 1..12 as i>
                        <#if i == month>
                            <option value="${i}" id="option_${i}" selected>${year?c}년 ${i}월</option>
                        <#else>
                            <option value="${i}" id="option_${i}">${year?c}년 ${i}월</option>
                        </#if>
                    </#list>
                </select>
            </div>

            <#list 1..12 as i>
                <#assign display="none"/>

                <#if i == month>
                    <#assign display="block"/>
                </#if>
                <div class="calendar-container" id="calendar_${i}" style="display:${display};">
                    <table class="calendar_table">
                        <thead>
                            <tr>
                                <th class="holiday">일</th>
                                <th>월</th>
                                <th>화</th>
                                <th>수</th>
                                <th>목</th>
                                <th>금</th>
                                <th style="color:blue;">토</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tbody id="calendarTable_${i}"></tbody>
                        </tbody>
                    </table>
                </div>
            </#list>
            <button class="exit-button" onclick="location.href='/'">페이지 나가기</button>
        </main>

        <#include "/page/load.ftl" encoding="UTF-8"/>
        <script src="/plugin/index.js" id="plugin_on"></script>
        <script src="/js/index.js"></script>
    </body>
</html>