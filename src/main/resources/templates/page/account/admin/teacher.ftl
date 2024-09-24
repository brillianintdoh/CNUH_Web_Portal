<div class="page_n">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="signup-container">
                    <h2 class="text-center mb-4">선생님 계정 추가</h2>
                    <form hx-post="/service/teacher/signup" hx-swap="afterbegin">
                        <div class="mb-3">
                            <label for="username" class="form-label">사용자 이름</label>
                            <input type="text" class="form-control" name="username" autocomplete="off" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">실제 이름</label>
                            <input type="text" class="form-control" name="name" autocomplete="off" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">이메일 주소</label>
                            <input type="email" class="form-control" name="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="confirm-password" class="form-label">비밀번호</label>
                            <input type="password" class="form-control" name="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">변경</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<#include "/load.ftl" encoding="UTF-8"/>