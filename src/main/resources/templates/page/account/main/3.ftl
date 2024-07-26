<div class="page_n">
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <a class="navbar-brand">유저</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link btn_a" id="addButton">추가</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn_a" id="followingButton">팔로잉</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn_a" id="followerButton">팔로워</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="content">
        <div id="searchArea" style="display: none;">
            <input type="text" name="search_value" class="form-control mb-3" hx-post="/account/search" hx-target="#search_result" hx-trigger="keyup changed delay:1s" placeholder="사용자 검색">
            <div class="user-list" id="search_result"></div>
        </div>

        <div id="followingList" class="user-list">
            <h5>팔로잉</h5>
            <#list following_list as username>
                <div class="user-item" hx-on:click="show_modal('${username}')">
                    <img src="/load/profile.png?name=${username}" class="profile-pic">
                    <span>${username}</span>
                </div>
            </#list>
        </div>

        <div id="followerList" class="user-list" style="display: none;">
            <h5>팔로워</h5>
            <#list follow_list as username>
                <div class="user-item" hx-on:click="show_modal('${username}')">
                    <img src="/load/profile.png?name=${username}" class="profile-pic">
                    <span>${username}</span>
                </div>
            </#list>
        </div>
    </div>
</div>

<#include "/page/account/user/modal.html" encoding="UTF-8"/>
<#include "/page/load.ftl" encoding="UTF-8"/>