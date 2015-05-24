<div style="margin-left:12px;">
    <style scoped>
        div[role=room]{width:2400px;height:85px;background-color:#eee;}
        div[role=room] > div{float:left;}
        div[role=room] > div:first-child{width:140px;color:#fff;background-color:#000;}
        #movies-queue div{float:left;}
        div[role=queue-selected]{color:#fff;height:21px;line-height:21px;margin-right:6px;margin-left:6px;padding-left:6px;padding-right:6px;cursor:pointer;}
        div[role=time-start] > input{width:40px;border:none;text-align:center}
        div[role=on-timeline]{cursor:pointer;color:#fff;}
        div[role=rest] input{width:40px;border:none;text-align:center;color:#fff;background-color:#999;}
        img[role=m-remove]{content:url(/img/icon-remove-movie.png);opacity:0.4}

        .txt-count{font-size:8pt !important;margin-left: 6px}
        .btn-NP{width:21px;height:21px;cursor:pointer;display:inline-block;background-color:#ccc;text-align: center}
    </style>

    <div style=""><span style="margin-right:10px">MOVIE</span><span><input id="txt-search" style="border:none;"></span></div>

    <div style="clear:both;margin-top:12px"></div>

    <div id="movies-queue"><div>SELECTED MOVIES</div></div>

    <div style="clear:both;height:24px;"></div>

    <div>
        <div><span style="background-color:#000;color:#fff;padding:0 10px 0 10px"><strong>ROOM 01</strong></span><span class="btn-NP" val="1">P</span><span class="btn-NP" val="1">N</span></div>
        <div id="_1" style="width:1200px;overflow-x:hidden;float:left">
            <div role="room" no="1" accept="2D,3D">
                <div role="time-start"><input value="07:00" maxlength="5" style="margin-left:10px"></div>
            </div>
        </div>
    </div>

    <div style="clear:both;height:12px;"></div>

    <div>
        <div><span style="background-color:#000;color:#fff;padding:0 10px 0 10px"><strong>ROOM 02</strong></span><span class="btn-NP" val="2">P</span><span class="btn-NP" val="2">N</span></div>
        <div id="_2" style="width:1200px;overflow-x:hidden;float:left">
            <div role="room" no="2" accept="2D">
                <div role="time-start"><input value="07:00" maxlength="5" style="margin-left:10px"></div>
            </div>
        </div>
    </div>

    <div style="clear:both;height:12px;"></div>

    <div>
        <div><span style="background-color:#000;color:#fff;padding:0 10px 0 10px"><strong>ROOM 03</strong></span><span class="btn-NP" val="3">P</span><span class="btn-NP" val="3">N</span></div>
        <div id="_3" style="width:1200px;overflow-x:hidden;float:left">
            <div role="room" no="3" accept="2D,3D">
                <div role="time-start"><input value="07:00" maxlength="5" style="margin-left:10px"></div>
            </div>
        </div>
    </div>

    <div style="clear:both;height:24px;"></div>
    <div>SUMMARY : </div>
    <div>APPLY THIS SCHEDULE [ TODAY ] AND NEXT [ x ] DAYS</div>
</div>
<script src="modules/moviesscheduler/moviesscheduler.js"></script>