<div style="margin-left:12px;">
    <style scoped>
        div[role=room]{width:2400px;height:85px;background-color:#eee;}
        div[role=room] > div{float:left;}
        div[role=room] > div:first-child{width:120px;color:#fff;background-color:#000;}
        #selected-movies div{float:left;}
        div[role=queue-selected]{color:#fff;height:21px;line-height:21px;margin-right:6px;margin-left:6px;padding-left:6px;padding-right:6px;cursor:pointer;}
        input[role=time-start]{width:40px;border:none;text-align:center}
        div[role=movie-on-timeline]{cursor:pointer;color:#fff;}
        div[role=rest] input{width:40px;border:none;text-align:center;color:#fff;background-color:#000;}
        img[role=m-remove]{content:url(/img/icon-remove-movie.png);opacity:0.4}
    </style>

    <div style="line-height:30px"><span style="margin-right:10px">MOVIE</span><span><input id="txt-search" style="border:none;background-color:#eee"></span><span><button id="btn-add" style="margin-left:12px;cursor:pointer;">ADD</button></span></div>

    <div style="clear:both;margin-top:12px"></div>

    <div id="selected-movies"><div style="margin-right:10px">SELECTED MOVIES</div></div>

    <div style="clear:both;height:24px;"></div>

    <div onmouseover="$(this).css({'overflow-x': 'auto'})" onmouseout="$(this).css({'overflow-x': 'hidden'})" style="width:1200px;overflow-x:hidden;">
        <div role="room" no="1" accept="2D,3D">
            <div><span><strong>ROOM 01</strong></span><input role="time-start" value="07:00" maxlength="5" style="margin-left:10px"></div>
        </div>
    </div>

    <div style="clear:both;height:12px;"></div>

    <div onmouseover="$(this).css({'overflow-x': 'auto'})" onmouseout="$(this).css({'overflow-x': 'hidden'})" style="width:1200px;overflow-x:hidden;">
        <div role="room" no="2" accept="2D">
            <div><span><strong>ROOM 02</strong></span><input role="time-start" value="07:00" maxlength="5" style="margin-left:10px"></div>
        </div>
    </div>

    <div style="clear:both;height:12px;"></div>

    <div onmouseover="$(this).css({'overflow-x': 'auto'})" onmouseout="$(this).css({'overflow-x': 'hidden'})" style="width:1200px;overflow-x:hidden;">
        <div role="room" no="3" accept="2D,3D">
            <div><span><strong>ROOM 03</strong></span><input role="time-start" value="07:00" maxlength="5" style="margin-left:10px"></div>
        </div>
    </div>

    <div style="clear:both;height:24px;"></div>
    <div>SUMMARY : </div>
</div>
<script src="modules/moviesscheduler/moviesscheduler.js"></script>