<div style="margin-left:12px;">
    <style scoped>
        div[role=room] div{float:left;}
        div[role=room] div:first-child{
            background-color:gray;
            background-image:repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,.5) 8px, rgba(255,255,255,.5) 20px);
        }
       
    </style>

    <div style="line-height:30px"><span>MOVIE : </span><span><input id="txt-search" style="border:none;background-color:#eee"></span><span><button id="btn-add" style="margin-left:12px;cursor:pointer;">ADD</button></span></div>

    <div style="clear:both;margin-top:12px"></div>

    <div id="selected-movies"><span>SELECTED MOVIES : </span></div>

    <div style="clear:both;margin-top:12px"></div>

    <div role="room" value="1" style="height:100px;line-height:100px;background-color:#eee;">
        <div style="width:120px;color:#000;margin-right:12px;background-color:#d0e5f5"><span>ROOM<strong> 01 </strong></span><span role="time-start" contenteditable style="float:right">00:00</span></div>
    </div>

    <div style="clear:both;margin-top:12px"></div>

    <div role="room" value="2" style="height:100px;line-height:100px;background-color:#eee;">
        <div style="width:220px;color:#000;margin-right:12px;background-color:#d0e5f5"><span>ROOM<strong> 02 </strong></span><span role="time-start" contenteditable style="float:right">00:00</span></div>
    </div>

    <div style="clear:both;margin-top:12px"></div>

    <div role="room" value="3" style="height:100px;line-height:100px;background-color:#eee;">
        <div style="width:120px;color:#000;margin-right:12px;background-color:#d0e5f5"><span>ROOM<strong> 03 </strong></span><span role="time-start" contenteditable style="float:right">00:00</span></div>
    </div>
</div>

<script src="modules/moviesscheduler/moviesscheduler.js"></script>