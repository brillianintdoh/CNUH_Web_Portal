<div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
    <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="sidebarMenuLabel">메뉴</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2 active btn_a opacity-50" page="1" hx-on:click="menu(event)" id="defualt_page">
                        <i class="bi bi-person"></i>
                        계정 설정
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2 btn_a" page="2" hx-on:click="menu(event)" hx-post="/menu/2" hx-trigger="click once" hx-target="#page_2">
                        <i class="bi bi-bell"></i>
                        알림
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2 btn_a" page="3" hx-on:click="menu(event)" hx-post="/menu/3" hx-trigger="click once" hx-target="#page_3">
                    <i class="bi bi-people"></i>
                        팔로우
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2 btn_a" page="4" hx-on:click="menu(event)" hx-post="/menu/4" hx-trigger="click once" hx-target="#page_4">
                        <i class="bi bi-chat-dots"></i>
                        채팅
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2 btn_a" page="5" hx-on:click="menu(event)" hx-post="/menu/5" hx-trigger="click once" hx-target="#page_5">
                        <i class="bi bi-fingerprint"></i>
                        계정 및 정보
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2 btn_a" href="/">
                        <i class="bi bi-house"></i>
                        홈페이지로 돌아가기
                    </a>
                </li>
            </ul>

            <#if teacher>
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                    <span>선생님 페널</span>
                </h6>
                <ul class="nav flex-column mb-auto">
                </ul>
            <#elseif manager>
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                    <span>관리자 페널</span>
                </h6>
                <ul class="nav flex-column mb-auto">
                    <li class="nav-item">
                        <a class="nav-link d-flex align-items-center gap-2 btn_a" href="#">
                            <i class="bi bi-person-add"></i>
                            선생님 계정 추가
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link d-flex align-items-center gap-2 btn_a" page="admin" hx-on:click="menu(event)" hx-post="/menu/admin" hx-trigger="click once" hx-target="#page_admin">
                            <i class="bi bi-person-vcard"></i>
                            계정 리스트
                        </a>
                    </li>
                </ul>
            </#if>

            <hr class="my-3">
            
            <ul class="nav flex-column mb-auto">
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2 btn_a" href="/service/log_out">
                        <i class="bi bi-door-open"></i>
                        Log Out
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>