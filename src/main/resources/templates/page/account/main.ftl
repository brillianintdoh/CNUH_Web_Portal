<div class="row g-5">
    <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3"></h4>
        <div class="card-body pt-0">
            <div class="text-center">
                <br>
                <div class="avatar avatar-lg mt-n5 mb-3">
                    <img class="avatar-img rounded border border-white border-3" src="/load/profile.png">
                </div>
                <h5 class="mb-0"> ${username} </h5>
                <#if teacher>
                    <small>선생님</small>
                    <p class="mt-3">${name}</p>
                <#else>
                    <small>${grade}학년 ${class_nm}반</small>
                    <p class="mt-3">${seat}번 / ${name}</p>
                </#if>
                <div class="hstack gap-2 gap-xl-3 justify-content-center">
                    <div>
                        <h6 class="mb-0">게시물</h6>
                        <small>0</small>
                    </div>
                    <div class="vr"></div>
                    <div>
                        <h6 class="mb-0">팔로워</h6>
                        <small>${follow_count}</small>
                    </div>
                    <div class="vr"></div>
                    <div>
                        <h6 class="mb-0">팔로잉</h6>
                        <small>${following_count}</small>
                    </div>
                </div>
            </div> 
        </div>
    </div>

    <div class="col-md-7 col-lg-8 text-center" id="page">
        <h4 class="mb-3"></h4>
        <div class="row g-3"></div>
        
        <hr class="my-4">

        <div id="page_1" page="1" hx-post="/menu/1" hx-trigger="load">
        </div>

        <div id="page_2" page="2" style="display:none;">
        </div>

        <div id="page_3" page="3" style="display:none;">
        </div>

        <div id="page_4" page="4" style="display:none;">
        </div>

        <div id="page_5" page="5" style="display:none;">
        </div>

        <div id="page_admin" page="admin" style="display:none;">
        </div>
    </div>
</div>