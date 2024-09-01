<div class="page_n">
    <h4 class="mb-3">유저이름: ${username}</h4>
    <div class="my-3">
        <#if !teacher>
            <label class="form-check-label" for="debit">${grade}학년</label>
            <label class="form-check-label" for="credit">${class_nm}반</label>
            <label class="form-check-label" for="credit">${seat}번</label>
        </#if>
        <label class="form-check-label" for="paypal">이름: ${name}</label>
    </div>
    
    <div class="row gy-3">
        <div class="col-md-6">
            <h4 class="mb-3">비번 변경</h4>
            <label class="form-label">현재 비번</label>
            <input type="password" class="form-control" name="pass" required>
        </div>
        
        <div class="col-md-6"></div>
        
        <div class="col-md-6">
            <label class="form-label">새로운 비번</label>
            <input type="password" class="form-control" name="pass_new" required>
            <br>
            <button class="col-md-10 btn btn-primary btn-lg" hx-include="[name=pass],[name=pass_new]" hx-post="/service/edit/password" hx-swap="afterbegin">변경</button>
        </div>
        
        <div class="col-md-6">
            <br>
            <form hx-include="[name=img_profile]" hx-post="/upload/profile" hx-encoding='multipart/form-data' hx-swap="afterend">
                <div class="avatar avatar-lg mt-n5 mb-3">
                    <img class="avatar-img rounded border border-white border-3" src="/load/profile.png">
                </div>
                <button class="col-md-8 btn btn-primary btn-lg">사진 프로필 변경</button>
                <input type="file" class="form-control" name="img_profile" accept=".png" required>
            </form>
        </div>
    </div>
    
    <hr class="my-4">
    
    <div class="row gy-3">
        <div class="col-md-6">
            <h4 class="mb-3">현재 선택과목:</h4>
        </div>
        
        <div class="col-md-6">
            <p style="font-size:13px;">시간표 기능 사용하시려면 이 설정을 해야합니다 원쪽 위부터 1,2,3,4 를 a,b,c,d 로 하시면 됩니다</p>
        </div>
        
        <#list dropdown as n>
            <#assign index = n?index+1 />
            <div class="col-md-6">
                <label class="form-label">(${index} 번째 선택과목)</label>
                <input type="text" class="form-control text-center" placeholder="${n} 과목" name="${n}" list="itrt_cntnt" required>
            </div>
        </#list>
        
        <datalist id="itrt_cntnt">
        </datalist>
        
        <div class="col-12">
            <form hx-post="/service/edit/timetable" hx-swap="afterbegin" hx-include="[name=a],[name=b],[name=c],[name=d]">
                <button class="w-100 btn btn-primary">변경</button>
            </form>
        </div>
        
        <div class="col-md-6">
        </div>
    </div>
</div>
    
<script>
    window.a = "${a!'미입력'}";
    window.b = "${b!'미입력'}";
    window.c = "${c!'미입력'}";
    window.d = "${d!'미입력'}";
    window.grade = "${grade}";
</script>