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
            <input type="text" class="form-control mb-3" id="searchInput" placeholder="사용자 검색">
            <div class="user-list" id="searchResults"></div>
        </div>

        <div id="followingList" class="user-list">
            <h5>팔로잉</h5>
            <div class="user-item">
                <img src="https://via.placeholder.com/40" class="profile-pic">
                <span>사용자1</span>
            </div>
            <div class="user-item">
                <img src="https://via.placeholder.com/40" class="profile-pic">
                <span>사용자2</span>
            </div>
            <div class="user-item">
                <img src="https://via.placeholder.com/40" class="profile-pic">
                <span>사용자3</span>
            </div>
        </div>

        <div id="followerList" class="user-list" style="display: none;">
            <h5>팔로워</h5>
            <div class="user-item">
                <img src="https://via.placeholder.com/40" class="profile-pic">
                <span>팔로워1</span>
            </div>
            <div class="user-item">
                <img src="https://via.placeholder.com/40" class="profile-pic">
                <span>팔로워2</span>
            </div>
            <div class="user-item">
                <img src="https://via.placeholder.com/40" class="profile-pic">
                <span>팔로워3</span>
            </div>
        </div>
    </div>
</div>

<#include "/page/load.ftl" encoding="UTF-8"/>