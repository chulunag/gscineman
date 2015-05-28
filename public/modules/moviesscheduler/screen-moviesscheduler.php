<div id="movies-scheduler" style="margin-left:12px;">
    <style scoped>
        div[role=room]{width:2400px;height:85px;background-color:#eee;}
        div[role=room] > div{float:left;}
        div[role=room] > div:first-child{width:140px;color:#fff;background-color:#000;}
        #movies-queue div{float:left;}
        div[role=queue-selected]{color:#fff;height:21px;line-height:21px;margin-right:6px;margin-left:6px;padding-left:6px;padding-right:6px;cursor:pointer;}
        div[role=time-start] > input{width:40px;border:none;text-align:center}
        div[role=on-timeline]{cursor:pointer;color:#fff;}

        div[role=rest]{background-color:#999;text-align:center;}
        div[role=rest] input{width:40px;border:none;text-align:center;color:#fff;background-color:#999;}

        img[role=m-remove]{content:url(/img/icon-remove-movie.png);opacity:0.4}
        .txt-count{font-size:8pt !important;margin-left: 6px}
        .btn-NP{width:21px;height:21px;padding: 0 0 0 0;margin: 0 0 0 0;border: none;display:inline-block;background-color:#ccc;text-align:center}
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
    <div><span style="background-color:#000;color:#fff;padding:0 10px 0 10px"><strong>ROOM 01</strong></span><button class="btn-NP" val="1">P</button><button class="btn-NP" val="1">N</button></div>
    <div id="_1" style="width:1200px;overflow-x:hidden;float:left" onmouseover="$(this).css({'overflow-x': 'auto'})" onmouseout="$(this).css({'overflow-x': 'hidden'})">
        <div id="room-1" role="room" no="1" accept="2D,3D">
            <div role="time-start"><input value="07:00" maxlength="5" style="margin-left:10px"></div>
        </div>
    </div>

    <!--R2-->
    <div style="clear:both;"><span style="background-color:#000;color:#fff;padding:0 10px 0 10px"><strong>ROOM 02</strong></span><button class="btn-NP" val="2">P</button><button class="btn-NP" val="2">N</button></div>
    <div id="_2" style="width:1200px;overflow-x:hidden;float:left" onmouseover="$(this).css({'overflow-x': 'auto'})" onmouseout="$(this).css({'overflow-x': 'hidden'})">
        <div id="room-2" role="room" no="2" accept="2D">
            <div role="time-start"><input value="07:00" maxlength="5" style="margin-left:10px"></div>
        </div>
    </div>

    <!--R3-->
    <div style="clear:both;"><span style="background-color:#000;color:#fff;padding:0 10px 0 10px"><strong>ROOM 03</strong></span><button class="btn-NP" val="3">P</button><button class="btn-NP" val="3">N</button></div>
    <div id="_3" style="width:1200px;overflow-x:hidden;float:left" onmouseover="$(this).css({'overflow-x': 'auto'})" onmouseout="$(this).css({'overflow-x': 'hidden'})">
        <div id="room-3" role="room" no="3" accept="2D,3D">
            <div role="time-start"><input value="07:00" maxlength="5" style="margin-left:10px"></div>
        </div>
    </div>

    <div style="clear:both;height:12px;"></div>
    <div class="inline" style="line-height:30px">
        <div>APPLY THIS SCHEDULE FROM</div>
        <div id="from-date" style="border:none;margin: 0 6px 0 6px;"></div>
        <div>AND NEXT</div>
        <div id="days" style="border:none;margin: 0 6px 0 6px;"></div>
        <div>DAYS</div>
        <div style="margin: 0 6px 0 6px;"><button id="btn-confirm">CONFIRM</button></div>
    </div>
</div>
<script src="modules/moviesscheduler/moviesscheduler.js"></script>