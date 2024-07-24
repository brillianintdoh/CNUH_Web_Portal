<!doctype html>
<html>
    <head>
        <title> 로그인 </title>
        <meta charset="UTF-8">
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <script src="/js/boot.js"></script>
        <link rel="icon" href="/img/icon.png">
        <link rel="stylesheet" href="/css/login.css">
    </head>
    <body>
        <main id="login_page" class="h-100">
            <div class="container-fluid h-100">
                <div class="row no-gutter h-100">
                    <div class="col-md-6 d-flex align-items-center bg-white">
                        <div class="d-flex align-items-center py-5 w-100">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-10 col-xl-7 mx-auto">
                                        <h3 class="display-4">Login</h3>
                                        <a class="text-muted mb-4" href="/signup">계정이 없으면 여기로</a>
                                        <form hx-post="service/login" hx-target="#login_btn" hx-include="[name=username],[name=password]">
                                            <div class="form-group mb-3">
                                                <input type="text" name="username" placeholder="username" class="form-control rounded-pill border-0 shadow-sm px-4" autocomplete="off" required>
                                            </div>
                                            <div class="form-group mb-3">
                                                <input type="password" name="password" placeholder="Password" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" autocomplete="off" required>
                                            </div>
                                            <div id="login_btn">
                                                <button class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Login</button>
                                            </div>
                                            <div class="text-center d-flex justify-content-between mt-4">
                                                <p style="font-size:13px">
                                                    비번 또는 아이디를 잃어버렸나요? (개발자한테 문의하거나 2-1반으로 오세요)
                                                    <a href="https://matilto:palanghwi@gmail.com" class="font-italic text-muted">
                                                        <u>이메일 보내기</u>
                                                    </a>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 d-none d-md-flex bg-gradient-primary">
                        <div class="text-center px-3 mx-auto">
                            <div class="top-50 translate-middle-y position-relative">
                                <h1 class="display-4 font-weight-bold text-white"> 충대부고 웹포털 사이트 </h1>
                                <p class="text-white mb-4">학생과 선생님들의 편리함을 위해 제작되었습니다</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <script src="/js/index.js"></script>
    </body>
</html>