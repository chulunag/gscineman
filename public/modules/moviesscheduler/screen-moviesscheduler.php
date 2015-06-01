<div id="movies-scheduler" style="margin-left:12px;">
    <style scoped>
        div[role=room]{width:2400px;height:85px;background-color:#eee;}
        div[role=room] > div{float:left;}
        //div[role=room] > div:first-child{width:140px;color:#fff;background-color:#000;}
        #movies-queue div{float:left;}
        div[role=queue-selected]{color:#000;height:21px;line-height:21px;margin-right:6px;margin-left:6px;padding-left:6px;padding-right:6px;cursor:pointer;}

        /*TODO*/
        div[role=open]{background-color:#000;text-align:right}
        div[role=open] > input{width:40px;border:none;text-align:center;margin-right:6px;}
        div[role=on-timeline]{background-size:300px 85px;background-image:radial-gradient(circle at top left,#2EB8B8,#29a4a4 50%);background-repeat:no-repeat;}
        div[role=on-timeline] > div{cursor:pointer;color:#fff;margin-left:6px;}
        div[role=start-end] > span:first-child{color:#000;background-color:#fff;font-weight:bold;}
        div[role=rest] > input{width:40px;border:none;text-align:center;color:#fff;background-color:#000;}
        /******/

        //div[role=rest]{background-color:#999;text-align:center;}


        img[role=m-remove]{content:url(/img/icon-remove-movie.png);opacity:0.4}
        .txt-count{font-size:8pt !important;margin-left: 6px}

        .inline > div{float:left}
        .jqx-input-content{background-color:#ddd; color:#000 !important}
        .jqx-dropdownlist-content{font-weight: bold; color:#000 !important;}
        button{cursor:pointer !important}
    </style>

    <div style=""><span style="margin-right:10px">MOVIE</span><span><input id="txt-search" style="border:none;"></span></div>

    <div style="clear:both;margin-top:12px"></div>

    <div id="movies-queue"><div>SELECTED MOVIES</div></div>

    <div style="clear:both;height:12px;"></div>

    <!--R1-->
    <div><span style="background-color:#000;color:#fff;padding:0 10px 0 10px;"><strong>ROOM 01</strong></span></div>
    <div id="_1" style="width:1200px;overflow-x:hidden;float:left" onmouseover="$(this).css({'overflow-x': 'auto'})" onmouseout="$(this).css({'overflow-x': 'hidden'})">
        <div id="room-1" role="room" no="1" accept="2D,3D"></div>
    </div>

    <!--R2-->
    <div style="clear:both;padding-top:12px"><span style="background-color:#000;color:#fff;padding:0 10px 0 10px"><strong>ROOM 02</strong></span></div>
    <div id="_2" style="width:1200px;overflow-x:hidden;float:left" onmouseover="$(this).css({'overflow-x': 'auto'})" onmouseout="$(this).css({'overflow-x': 'hidden'})">
        <div id="room-2" role="room" no="2" accept="2D"></div>
    </div>

    <!--R3-->
    <div style="clear:both;padding-top:12px"><span style="background-color:#000;color:#fff;padding:0 10px 0 10px"><strong>ROOM 03</strong></span></div>
    <div id="_3" style="width:1200px;overflow-x:hidden;float:left" onmouseover="$(this).css({'overflow-x': 'auto'})" onmouseout="$(this).css({'overflow-x': 'hidden'})">
        <div id="room-3" role="room" no="3" accept="2D,3D"></div>
    </div>

    <div style="clear:both;height:12px;"></div>
    <div class="inline" style="line-height:30px">
        <button id="btn-confirm">CONFIRM</button><button id="btn-print">PRINT</button>
    </div>
</div>
<script src="modules/moviesscheduler/moviesscheduler.js"></script>