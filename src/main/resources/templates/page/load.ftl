<div class="load_menu" id="load_${page!'w'}">
    <div class="load">
        <div class="spinner-border" role="status">
            <span class="sr-only"></span>
        </div>
    </div>
</div>

<style>
.load {
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:70%;
    height:70%;
    margin:0 auto;
    width:50px;
    height:50px;
}

.load_menu {
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:100%;
    height:100%;
    background-color:#ffffff;
    opacity:0.6;
    text-align:center;
}

.load_on {
    overflow:hidden;
}
</style>
<script>
    document.body.classList.add("load_on");
</script>