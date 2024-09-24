<div class="page_n">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="signup-container">
                    <h2 class="text-center mb-4">계정정보 변경</h2>
                    <form hx-post="/service/edit/account" hx-swap="afterbegin">
                        <div class="mb-3">
                            <label for="username" class="form-label">사용자 이름</label>
                            <input type="text" class="form-control" name="username" autocomplete="off" value="${username}" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">실제 이름</label>
                            <input type="text" class="form-control" name="name" autocomplete="off" value="${name}" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">이메일 주소</label>
                            <input type="email" class="form-control" name="email" value="${email}" required>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="grade" class="form-label">학년</label>
                                <select class="form-select" name="grade" required>
                                    <#if grade == "1">
                                        <option value="1" selected>1학년</option>
                                    <#else>
                                        <option value="1">1학년</option>
                                    </#if>

                                    <#if grade == "2">
                                        <option value="2" selected>2학년</option>
                                    <#else>
                                        <option value="2">2학년</option>
                                    </#if>

                                    <#if grade == "3">
                                        <option value="3" selected>3학년</option>
                                    <#else>
                                        <option value="3">3학년</option>
                                    </#if>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label for="class" class="form-label">반</label>
                                <select class="form-select" name="class_nm" required>
                                    <#if class_nm == "1">
                                        <option value="1" selected>1반</option>
                                    <#else>
                                        <option value="1">1반</option>
                                    </#if>

                                    <#if class_nm == "2">
                                        <option value="2" selected>2반</option>
                                    <#else>
                                        <option value="2">2반</option>
                                    </#if>

                                    <#if class_nm == "3">
                                        <option value="3" selected>3반</option>
                                    <#else>
                                        <option value="3">3반</option>
                                    </#if>

                                    <#if class_nm == "4">
                                        <option value="4" selected>4반</option>
                                    <#else>
                                        <option value="4">4반</option>
                                    </#if>

                                    <#if class_nm == "5">
                                        <option value="5" selected>5반</option>
                                    <#else>
                                        <option value="5">5반</option>
                                    </#if>

                                    <#if class_nm == "6">
                                        <option value="6" selected>6반</option>
                                    <#else>
                                        <option value="6">6반</option>
                                    </#if>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label for="number" class="form-label">번호</label>
                                <input type="number" class="form-control" name="seat" min="1" max="50" value="${seat}" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="confirm-password" class="form-label">비밀번호 확인</label>
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