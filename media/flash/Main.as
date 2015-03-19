class Main{
    static var obj, autofwd, autoplaypause;
    
    function Main()
    {
        Main.init();
        Main.obj.ShowObjectImage(0, 0);
    }
    static function init()
    {
        obj = new VrObject();
        Main.obj.SetTheStage();
        Main.obj.init();
        autofwd = true;
        _root.onEnterFrame = function ()
        {
        };
        var _loc2 = new Object();
        _loc2.onMouseDown = function ()
        {
            if (Main.isinfocus)
            {
                Main.obj.mx_down = _root._xmouse;
                Main.obj.my_down = _root._ymouse;
                Main.obj.turn = true;
                Main.obj.autoplay = 0;
            }
        };
        _loc2.onMouseUp = function ()
        {
            var _loc2 = Main.obj.mx_down - _root._xmouse;
            Main.obj.turn = false;
        };
        _root.onKillFocus = function ()
        {
            Main.obj.turn = false;
        };
        _root.onRelease = function ()
        {
            Main.obj.turn = false;
        };
        _root.onDragOver = function ()
        {
            Main.obj.turn = false;
        };
        _root.onDragOut = function ()
        {
            Main.obj.turn = false;
        };
        Mouse.addListener(_loc2);
        var _loc3 = new Object();
        _loc3.onKeyDown = function ()
        {
            Main.obj.autoplay = 0;
            if (Key.getCode() == 39)
            {
                Main.obj.changePan(-1);
            }
            if (Key.getCode() == 37)
            {
                Main.obj.changePan(1);
            }
            if (Key.getCode() == 40)
            {
                Main.obj.changeTilt(-1);
            }
            if (Key.getCode() == 38)
            {
                Main.obj.changeTilt(1);
            }
        };
        Key.addListener(_loc3);
        _root.focusEnabled = true;
    }
    static function doEnterFrame()
    {
        if (Main.obj.autoplay >= 1)
        {
            if (Main.autoplaypause > 0)
            {
                autoplaypause = --Main.autoplaypause;
            }
            else
            {
                if (Main.obj.autoplay == 1)
                {
                    Main.obj.MoveImage_X(1);
                }
                else if (Main.autofwd)
                {
                    ++Main.obj.imgX;
                    if (Main.obj.imgX >= Main.obj.imgMaxX)
                    {
                        Main.obj.imgX = Main.obj.imgX - 2;
                        autofwd = false;
                    }
                }
                else
                {
                    --Main.obj.imgX;
                    if (Main.obj.imgX < 0)
                    {
                        Main.obj.imgX = Main.obj.imgX + 2;
                        autofwd = true;
                    }
                }
                autoplaypause = Main.obj.autodelay;
                Main.obj.ShowCurrentImage();
            }
        }
        if (Main.obj.turn)
        {
            if (Main.obj.control == 2)
            {
                var _loc2 = 15;
                Main.obj.autoplay = 0;
                if (Main.obj.mx_down - _root._xmouse > _loc2)
                {
                    Main.obj.MoveImageX(1);
                }
                if (Main.obj.mx_down - _root._xmouse < -_loc2)
                {
                    Main.obj.MoveImageX(-1);
                }
                if (Main.obj.my_down - _root._ymouse > _loc2)
                {
                    Main.obj.MoveImageY(1);
                }
                if (Main.obj.my_down - _root._ymouse < -_loc2)
                {
                    Main.obj.MoveImageY(-1);
                }
            }
            else if (Main.obj.control == 3)
            {
                Main.obj.imgX = Main.obj.imgMaxX - 1 - Math.floor(_root._xmouse * Main.obj.imgMaxX / _root._width);
                if (Main.obj.imgX < 0)
                {
                    Main.obj.imgX = 0;
                }
                if (Main.obj.imgX >= Main.obj.imgMaxX)
                {
                    Main.obj.imgX = Main.obj.imgMaxX - 1;
                }
                Main.obj.imgY = Main.obj.imgMaxY - 1 - Math.floor(_root._ymouse * Main.obj.imgMaxY / _root._height);
                if (Main.obj.imgY < 0)
                {
                    Main.obj.imgY = 0;
                }
                if (Main.obj.imgY >= Main.obj.imgMaxY)
                {
                    Main.obj.imgY = Main.obj.imgMaxY - 1;
                }
            }
            else
            {
                _loc2 = 15;
                Main.obj.autoplay = 0;
                if (Main.obj.mx_down - _root._xmouse > _loc2)
                {
                    Main.obj.MoveImageX(1);
                    Main.obj.mx_down = Main.obj.mx_down - _loc2;
                }
                if (Main.obj.mx_down - _root._xmouse < -_loc2)
                {
                    Main.obj.MoveImageX(-1);
                    Main.obj.mx_down = Main.obj.mx_down + _loc2;
                }
                if (Main.obj.my_down - _root._ymouse > _loc2)
                {
                    Main.obj.MoveImageY(1);
                    Main.obj.my_down = Main.obj.my_down - _loc2;
                }
                if (Main.obj.my_down - _root._ymouse < -_loc2)
                {
                    Main.obj.MoveImageY(-1);
                    Main.obj.my_down = Main.obj.my_down + _loc2;
                }
            }
            Main.obj.ShowCurrentImage();
        }
    }
    static function controller_callback(id, v)
    {
        if (v != undefined)
        {
            if (id == "pan")
            {
                Main.obj.changePan(v > 0 ? (1) : (-1));
            }
            if (id == "tilt")
            {
                Main.obj.changeTilt(v > 0 ? (1) : (-1));
            }
            if (id == "autorotate")
            {
                Main.obj.autoplay = v;
            }
            if (id == "autoplay")
            {
                Main.obj.autoplay = v;
            }
        }
        else
        {
            if (id == "pan")
            {
                return (Main.obj.getPan());
            }
            if (id == "tilt")
            {
                return (Main.obj.getTilt());
            }
            if (id == "autoplay")
            {
                return (Main.obj.autoplay ? (1) : (0));
            }
            if (id == "autorotate")
            {
                return (Main.obj.autoplay ? (1) : (0));
            }
            if (id == "userdata.copyright")
            {
                return (Main.userdata_copyright);
            }
            if (id == "userdata.author")
            {
                return (Main.userdata_author);
            }
            if (id == "userdata.source")
            {
                return (Main.userdata_source);
            }
            if (id == "userdata.date")
            {
                return (Main.userdata_date);
            }
            if (id == "userdata.title")
            {
                return (Main.userdata_title);
            }
            if (id == "userdata.comment")
            {
                return (Main.userdata_comment);
            }
            if (id == "userdata.description")
            {
                return (Main.userdata_description);
            }
            if (id == "userdata.information")
            {
                return (Main.userdata_information);
            }
            if (id == "userdata.software")
            {
                return (Main.userdata_software);
            }
            if (id == "flags")
            {
                return (Main.obj.controllerFlags);
            }
            if (id == "isobject")
            {
                return (1);
            }
        }
    }
    static function reposElements()
    {
        Main.obj.reposElements();
    }
    static var windowScale = true;
    static var windowWidth = 400;
    static var windowHeight = 300;
    static var userdata_copyright = "";
    static var userdata_author = "";
    static var userdata_source = "";
    static var userdata_date = "";
    static var userdata_title = "";
    static var userdata_comment = "";
    static var userdata_description = "";
    static var userdata_information = "";
    static var userdata_software = "";
    static var isinfocus = true;
}