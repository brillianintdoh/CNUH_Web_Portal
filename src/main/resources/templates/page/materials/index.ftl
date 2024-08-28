<!doctype html>
<html>
    <head>
        <title> 우리학교 정보 </title>
        <meta charset="UTF-8">
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <script src="/js/boot.js"></script>
        <link rel="icon" href="/img/icon.png">
        <link rel="stylesheet" href="/css/materials.css">
    </head>
    <body>
        <main id="materials_page">
            <#include "main.html" encoding="UTF-8"/>
        </main>
        <#include "/page/load.ftl" encoding="UTF-8"/>

        <#list timetable?keys as key>
            <script>
                window.${key} = "${timetable[key]}";
            </script>
        </#list>
        <script>
            window.grade = "${grade}";
            window.class_nm = "${class_nm}"
        </script>
        <script src="/plugin/index.js" id="plugin_on"></script>
        <script src="/js/index.js"></script>
    </body>
</html>