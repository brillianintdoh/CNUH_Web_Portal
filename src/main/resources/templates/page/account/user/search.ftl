<div class="user-item d-flex justify-content-between align-items-center" hx-on:click="show_modal('${username}')">
    <div>
        <img src="/load/profile.png?name=${username}" class="profile-pic">
        <span>${username}</span>
    </div>
    <button class="btn btn-sm btn-primary">팔로우</button>
</div>