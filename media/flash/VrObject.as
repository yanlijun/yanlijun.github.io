class VrObject{
    var clip;
    function VrObject()
    {
    }
    function SetTheStage()
    {
        imgX = 0;
    }
    function init()
    {
        clip = _root.createEmptyMovieClip("clip", 100);
    }
    function ShowCurrentImage()
    {
        this.ShowObjectImage(imgX, imgY);
    }
    function ShowObjectImage(px, py)
    {
        var _loc3 = px;
        var _loc2 = py;
        if (revX)
        {
            _loc3 = imgMaxX - _loc3 - 1;
        }
        if (revY)
        {
            _loc2 = imgMaxY - _loc2 - 1;
        }
        var _loc4 = flash.display.BitmapData.loadBitmap("img_" + _loc2 + "_" + _loc3);
        if (_loc4 != undefined)
        {
            clip.attachBitmap(_loc4, 100, "always");
            false;
        }
    }
    function ShowInititialImage()
    {
        imgX = imgStartX;
        imgY = imgStartY;
        this.ShowObjectImage(imgX, imgY);
    }
    function MoveImageX(diff)
    {
        if (swapXY)
        {
            this.MoveImage_Y(diff);
        }
        else
        {
            this.MoveImage_X(diff);
        }
    }
    function MoveImageY(diff)
    {
        if (swapXY)
        {
            this.MoveImage_X(diff);
        }
        else
        {
            this.MoveImage_Y(diff);
        }
    }
    function MoveImage_X(diff)
    {
        imgX = imgX + diff;
        if (wrapX)
        {
            if (imgX < 0)
            {
                imgX = imgX + imgMaxX;
            }
            if (imgX >= imgMaxX)
            {
                imgX = imgX - imgMaxX;
            }
        }
        else
        {
            if (imgX < 0)
            {
                imgX = 0;
            }
            if (imgX >= imgMaxX)
            {
                imgX = imgMaxX - 1;
            }
        }
    }
    function MoveImage_Y(diff)
    {
        imgY = imgY + diff;
        if (wrapY)
        {
            if (imgY < 0)
            {
                imgY = imgY + imgMaxY;
            }
            if (imgY >= imgMaxY)
            {
                imgY = imgY - imgMaxY;
            }
        }
        else
        {
            if (imgY < 0)
            {
                imgY = 0;
            }
            if (imgY >= imgMaxY)
            {
                imgY = imgMaxY - 1;
            }
        }
    }
    function changePan(a)
    {
        if (!isNaN(a))
        {
            this.MoveImageX(a);
        }
        this.ShowCurrentImage();
    }
    function changeTilt(a)
    {
        if (!isNaN(a))
        {
            this.MoveImageY(a);
        }
        this.ShowCurrentImage();
    }
    function setPan(a)
    {
        if (!isNaN(a))
        {
            if (!swapXY)
            {
                imgX = a;
            }
            else
            {
                imgY = a;
            }
        }
        this.ShowCurrentImage();
    }
    function setTilt(a)
    {
        if (!isNaN(a))
        {
            if (!swapXY)
            {
                imgY = a;
            }
            else
            {
                imgX = a;
            }
        }
        this.ShowCurrentImage();
    }
    function getPan()
    {
        if (!swapXY)
        {
            return (imgX);
        }
        else
        {
            return (imgY);
        }
    }
    function getTilt()
    {
        if (!swapXY)
        {
            return (imgY);
        }
        else
        {
            return (imgX);
        }
    }
    function reposElements()
    {
        var _loc4;
        var _loc3;
        _loc4 = Math.floor(controllerPos / 3);
        _loc3 = controllerPos % 3;
        if (_loc4 == 0)
        {
            //_root.cclip._x = 0;
			_root.cclip._x = Stage.width - _root.cclip._width * 1.5;
        }
        if (_loc4 == 1)
        {
            _root.cclip._x = (Stage.width - _root.cclip._width) / 2;
        }
        if (_loc4 == 2)
        {
            _root.cclip._x = Stage.width - _root.cclip._width;
        }
        if (_loc3 == 0)
        {
            _root.cclip._y = 0;
        }
        if (_loc3 == 1)
        {
            _root.cclip._y = (Stage.height - _root.cclip._height) / 2;
        }
        if (_loc3 == 2)
        {
            _root.cclip._y = Stage.height - _root.cclip._height * 1.3;
        }
    }
    function addController(ctrlUrl, pos, alpha)
    {
        var cclip = _root.createEmptyMovieClip("cclip", 10000);
        var _loc7;
        cclip._visible = false;
        cclip._lockroot = true;
        if (pos >= 0 && pos <= 8)
        {
            controllerPos = pos;
        }
        if (alpha > 0)
        {
            controllerAlpha = alpha;
        }
        cclip._alpha = controllerAlpha;
        var _loc3 = new MovieClipLoader();
        var _loc4 = new Object();
        _loc4.onLoadInit = function ()
        {
            cclip.playerControl = Main.controller_callback;
            cclip._visible = true;
            _root.clip.onRollOver = function ()
            {
                Main.isinfocus = true;
            };
            _root.clip.onRollOut = function ()
            {
                Main.isinfocus = false;
            };
            Main.reposElements();
        };
        _loc3.addListener(_loc4);
        _loc3.loadClip(ctrlUrl, cclip);
    }
    var bugNum = 4;
    var imgX = 0;
    var imgY = 0;
    var imgMaxX = 3;
    var imgMaxY = 3;
    var imgStartX = 0;
    var imgStartY = 0;
    var mx_down = 0;
    var my_down = 0;
    var turn = false;
    var autoplay = 0;
    var autodelay = 3;
    var started = false;
    var wrapX = false;
    var wrapY = false;
    var revX = false;
    var revY = false;
    var swapXY = false;
    var control = 0;
    var controllerPos = 2;
    var controllerAlpha = 100;
    var controllerFlags = "";
}