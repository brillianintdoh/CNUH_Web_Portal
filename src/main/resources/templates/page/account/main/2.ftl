<div class="page_n" style="top:15vh">
    <div class="container">
        <div class="allow_menu">
            <div class="row">
                <div class="col-md-12">
                    <h1>알림 설정</h1>
                    <p>아래에서 알림 환경설정 구성</p>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-12">
                    <#if is_push>
                        <button class="btn btn-danger" id="notifications_toggle">알림 비활성화</button>
                    <#else>
                        <button class="btn btn-primary" id="notifications_toggle">알림 허용</button>
                    </#if>
                </div>
            </div>
        </div>
        
        <#if is_push>
            <#assign vw=""/>
            <#assign vop=""/>
        <#else>
            <#assign vw="disabled"/>
            <#assign vop="opacity-50"/>
        </#if>

        <div id="setting_menu" class="${vop}">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">웹 푸시 알림</h5>
                            <p class="card-text">다음에 대한 앱 내 알림 수신:</p>
                            <div class="form-check">
                                <input class="form-check-input" value="1" name="news" type="checkbox" id="app_news" ${vw} ${news?then("checked","")}>
                                <label class="form-check-label" for="in-app-news">뉴스 및 업데이트 수신</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" value="1" name="chat" type="checkbox" id="app_promotions" ${vw} ${chat?then("checked","")}>
                                <label class="form-check-label" for="in-app-promotions">채팅 알림</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" value="1" name="mission" type="checkbox" id="app_query" ${vw} ${mission?then("checked","")}>
                                <label class="form-check-label" for="in-app-security">숙제 알림</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-12">
                    <br>
                    <button class="btn btn-primary" ${vw} hx-post="/service/edit/webpush">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
</div>

<#include "/load.ftl" encoding="UTF-8"/>

<script>
    window.publicKey = "${publicKey}";
    window.is_push = "${is_push?c}";
    window.news = "${news?c}";
    window.chat = "${chat?c}";
    window.mission = "${mission?c}";
</script>