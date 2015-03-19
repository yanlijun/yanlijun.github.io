class loading { 
	private var mc:MovieClip;
	private var loadmc:MovieClip;

	public function loading(mymc:MovieClip, myloadmc:MovieClip) { 
		mc = mymc;
		loadmc = myloadmc;
		//定义一个MC来放进度条和文本,定义一个空的loadmc放外部的SWF 
	} 

	public function attchBarandText(loadbar:String, mytext:String, states:String, x:Number, y:Number, depth:Number):Void { 
		//定义一个方法来摆放位置 
		mc.attachMovie(loadbar, "loadbar", depth);
		mc.attachMovie(mytext, "mytext", depth+10);
		mc.attachMovie(states, "states", depth+20);
		mc.loadbar._x = x;
		mc.loadbar._y = y;
		//mc.mytext._x = mc.loadbar._x+mc.loadbar._width-mc.mytext._width;
		//将百份比放到最右边
		//mc.mytext._y = mc.loadbar._y+mc.loadbar._height;
		mc.mytext._y = mc.loadbar._y - 6;
		//mc.mytext.pecText.text是里面的文本
		mc.states._x = mc.loadbar._x - 2;
		mc.states._y = mc.loadbar._y - 2 - mc.states._height;
		mc.loadbar._xscale = 0;
		//不能放到前面。不能不能放到文本不能放到右边
		return;
	}

	private function loadOutswf(swfname:String):Void {
		mc._visible = true;
		loadmc.loadMovie(swfname);
		loadmc._alpha = 0;
		//加载外部的文本
		return;
	}
	
	public function getPec(num:Number, swfname:String):Void {
		loadOutswf(swfname);
		//调用内部函数
		mc.onEnterFrame = function() {
			var myloadingmc:MovieClip = this._parent.loadmc;
			//定义和取得数据
			var total:Number = myloadingmc.getBytesTotal();
			var loaded:Number = myloadingmc.getBytesLoaded();
			var pec:Number = Math.floor((loaded*100)/total);
			//百份比
			if (total>5 && loaded>5) {
			this.mytext._x = this.loadbar._x+pec*2;
			this.mytext.pecText.text = pec+"%";
			this.loadbar._xscale = pec;
			}
			if (total>5) {
				if (pec>=100) {
					this._visible = false;
					if (myloadingmc._alpha<100) {
						myloadingmc._alpha += num;
					} else {
						delete this.onEnterFrame;
					}
				}
			}
		};
	}
}