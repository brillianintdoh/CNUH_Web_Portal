<div class="page_n">
    <div class="container">
        <div class="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
            <img class="me-3" src="/img/chat.png" alt="" width="48" height="38">
            <div class="lh-1 text-black">
                <small>채팅방을 이용해 다른 사용자와 소통하세요.</small>
            </div>
        </div>
        <div class="my-3 p-3 bg-body rounded shadow-sm">
            <#list chatList as username>
                <a class="d-flex text-body-secondary pt-3" href="/chat/room/${username}">
                    <img class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" src="/load/profile.png?name=${username}" aria-label="Placeholder: 32x32">
                    <p class="pb-3 mb-0 small lh-sm border-bottom">
                        <strong class="d-block text-gray-dark">@${username}</strong>
                        <br>
                    </p>
                </a>
            </#list>
        </div>
    </div>
</div>

<#include "/page/load.ftl" encoding="UTF-8"/>