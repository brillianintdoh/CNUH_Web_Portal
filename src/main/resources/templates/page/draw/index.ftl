<!DOCTYPE html>
<html>
    <head>
        <title> 뽑기 </title>
        <meta charset="UTF-8">
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link href="/img/icon.png" rel="icon">
        <link rel="stylesheet" href="/css/draw.css">
        <script src="/js/boot.js"></script>
    </head>
    <body>
	<main id="draw_page">
            <div class="p-5 text-center bg-body-tertiary rounded-3" style="margin-top:10vh;">
                <h1 class="text-body-emphasis">자리 && 번호 뽑기</h1>
                <p class="col-lg-8 mx-auto fs-5 text-muted">
                </p>
                <div class="d-inline-flex gap-2 mb-5" hx-boost="true">
                    <a class="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" href="/draw/seating">
                        자리 뽑기
                    </a>
                    <a class="btn btn-outline-secondary btn-lg px-4 rounded-pill">
                        번호 뽑기
                    </a>
                </div>
            </div>
        </main>
        <script>
            window.layoutJson = '${seating}';
            window.isMove = true;
        </script>
        <script src="/js/index.js"></script>
    </body>
</html>
