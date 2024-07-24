<!doctype html>
<html>
    <head>
        <title> ${username}님의 계정 </title>
        <meta charset="UTF-8">
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <script src="/js/boot.js"></script>
        <link rel="stylesheet" href="/css/account.css">
        <link rel="icon" href="/img/icon.png">
    </head>
    <body>
        <header class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="/">충대부고 웹 포털</a>
            <ul class="navbar-nav flex-row d-md-none">
                <li class="nav-item text-nowrap">
                    <button class="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="bi bi-list"></i>
                    </button>
                </li>
            </ul>
        </header>
        <div class="container-fluid">
            <div class="row">
                <#include "menu.ftl"/>
                <main id="account_page" class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <#include "main.ftl"/>
                </main>
            </div>
        </div>
        <#assign page="1"/>
        <#include "/page/load.ftl" encoding="UTF-8"/>
        <script src="/js/index.js"></script>
    </body>
</html>