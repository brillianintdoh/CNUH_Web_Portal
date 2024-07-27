<#list user_list as username>
    <div class="user-item d-flex justify-content-between align-items-center">
        <div hx-on:click="show_modal('${username}')">
            <img src="/load/profile.png?name=${username}" class="profile-pic">
            <span>${username}</span>
        </div>
        <button class="btn btn-sm btn-primary" hx-post="/service/friend/follow" hx-vals='{"username": "${username}"}' hx-swap="afterend">팔로우</button>
    </div>
</#list>