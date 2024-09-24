<div class="page_n">
    <div class="container mt-5">
        <h2 class="mb-4">유저 목록</h2>
        <table class="table table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">프로필</th>
                    <th scope="col">닉네임</th>
                    <th scope="col">이름</th>
                    <th scope="col">이메일</th>
                </tr>
            </thead>
            <tbody>
                <#list user_list as user>
                    <tr> 
                        <th scope="row">${user.id}</th>
                        <td data-bs-toggle="modal" data-bs-target="#userModal" hx-on:click="userModal('${user.username}')">
                            <img src="/load/profile.png?name=${user.username}" class="img-thumbnail" width="50">
                        </td>
                        <td>${user.username}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                    </tr>
                </#list>
            </tbody>
        </table>
    </div>
</div>

<div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="userModal_title">OOO - 비밀번호 변경</h5>
            </div>
            <div class="modal-body">
                <form hx-post="/admin/edit/password" hx-include="[name=username],[name=new_pass]" hx-swap="afterend">
                    <div class="form-group">
                        <label for="newPassword1">새 비밀번호</label>
                        <input type="password" id="new_password" class="form-control" name="new_pass" placeholder="새 비밀번호">
                    </div>
                    <input type="hidden" name="username" id="userModal_username">
                    <button type="submit" class="btn btn-primary">변경</button>
                </form>
            </div>
        </div>
    </div>
</div>

<#include "/load.ftl" encoding="UTF-8"/>