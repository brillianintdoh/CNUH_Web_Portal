<!doctype html>
<html>
    <head>
        <title> 시간표 </title>
        <meta charset="UTF-8">
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link rel="icon" href="/img/icon.png">
        <script src="/js/boot.js"></script>
    </head>
    <body>
        <main id="timetable_page">
            <#include "main.ftl" encoding="UTF-8"/>
            <#include "/page/load.ftl" encoding="UTF-8"/>
        </main>

        <#list timetable?keys as key>
            <script>
                window.${key} = "${timetable[key]}";
            </script>
        </#list>
        <script>
            window.grade = "${grade}";
            window.class_nm = "${class_nm}"
        </script>
        <script src="/js/index.js"></script>
    </body>
</html>