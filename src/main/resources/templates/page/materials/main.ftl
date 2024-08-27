<nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">학교 정보 시스템</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#timetable">시간표</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#menu">급식 메뉴</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container">
    <div class="content">
        <h2 class="text-center mb-4">학교 시간표</h2>
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>시간</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                    </tr>
                </thead>
                <tbody id="timetable">
                </tbody>
            </table>
        </div>
    </div>
    
    <div id="menu" class="content">
        <h2 class="text-center mb-4">이번 달 급식 메뉴</h2>
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>메뉴</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>8/1</td>
                        <td>김치찌개,제육볶음,멸치볶음,김,밥</td>
                    </tr>
                    <tr>
                        <td>8/2</td>
                        <td>된장찌개,고등어구이,시금치나물,깍두기,밥</td>
                    </tr>
                    <tr>
                        <td>8/3</td>
                        <td>미역국,불고기,오이무침,배추김치,밥</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>