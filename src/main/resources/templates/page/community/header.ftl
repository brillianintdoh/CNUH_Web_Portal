<div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
    <button class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center bg-info" aria-expanded="false" data-bs-toggle="dropdown">
        <i class="bi bi-menu-button-wide"></i>
    </button>
    <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
        <li>
            <button type="button" class="dropdown-item d-flex align-items-center">
                <i class="bi bi-plus-circle-fill me-2"></i>
                게시물 추가
            </button>
        </li>
    </ul>
</div>

<nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" style="height: 3.5rem;">
    <div class="container-fluid">
        <a class="navbar-brand" href="/community">게시판</a>
        <button class="navbar-toggler p-0 border-0" type="button" id="collapse_menu_btn">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse menu" id="collapse_menu">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="">공지</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">익명게시판</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="" data-bs-toggle="dropdown" aria-expanded="false">주제 게시판</a>
                    <ul class="dropdown-menu">
                        <#list topic as value>
                            <li><a class="dropdown-item" href="/community/topic/${value['id']}">${value['title']}</a></li>
                        </#list>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/">홈페이지</a>
                </li>
            </ul>
            <div class="navbar-brand">
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">검색</button>
                </form>
            </div>
        </div>
    </div>
</nav>

<div class="sub_menu bg-body shadow-sm">
    <nav class="nav">
        <a class="nav-link" href="">홈</a>
        <a class="nav-link" href="">
            새 글
            <span class="badge text-bg-light rounded-pill align-text-bottom">27</span>
        </a>
        <a class="nav-link" href="#">내 글</a>
    </nav>
</div>