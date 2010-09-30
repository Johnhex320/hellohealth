(function($) {
/***************************************************/
// jQuery function: setDropDownVisibility() *** NOT COMPLETED ***
//
// Developped by: Son Pham
//
// description: will hidden/visible all select element
//              this is usually used in IE6 when you have overlays
//              on top of select elements which are always on top
//              typical scenarios involves lightBox, flyouts, etc...
//
// requirement: jQuery 1.3.2
//
// usage:   1) $.setDropDownVisibility(true, params); // will show all selects in the page
//          2) $.setDropDownVisibility(false, params); // will hidden all selects in the page
//
// params:
//  @1 state (boolean): sets the visibility state
//  @2 context (string): context selector of the select tags
//  @3 exclude (string/array): exlcude from the context selector select tags
/**********************************************************/
/*global jQuery*/
jQuery.setDropDownVisibility = function(state, context) {
    var $element;
    
    if (typeof context === "undefined") { context = "body"; }
    
    $("select", context).each(function() {
        $element = $(this);
        if ($element[0].nodeName === "SELECT") {
            if (state) {
                $element.css("visibility","visible");
            } else {
                $element.css("visibility","hidden");            
            }
        }
    });
};

/***************************************************/
// jQuery function: hasLayout() TODO: rework this function
//
// Developped by: Son Pham
//
// description: gives the element a css property of zoom = 1
//              use this for IE6 only
//
// requirement: jQuery 1.3.2
//              $.removeInlineCssProp()
//
// usage:   1) $.hasLayout("#myDiv");
//          2) $.hasLayout(".cBox, .cFoot");
/**********************************************************/
jQuery.hasLayout = function(selector) {
    if (selector && $.isIE("<9")) {
        var $selector = $(selector),
            $element, $elementParent,
            hasLayoutTimerId; 

        if ($selector.length === 0) { selector = "body"; }

        $selector.each(function() {
            $element = $(this);
            $elementParent = $element.parent();
            
            if ($element.attr("style")) {
                $.removeInlineCSSProp($element,"zoom");
            }

            if ($elementParent.length && $elementParent.get(0).nodeName !== "HTML") {
                if ($elementParent.attr('style')) {
                    $.removeInlineCSSProp($elementParent,"zoom");
                }
            } else {
                $elementParent = [];    
            }
            
			/*global setTimeout*/
            hasLayoutTimerId = setTimeout(function() {
                $element.css("zoom", 1);
                if ($elementParent.length) {
                    $elementParent.css("zoom", 1);
                }
				/*global clearTimeout*/
                clearTimeout(hasLayoutTimerId);
            }, 200);
        });
    }
};
/**************************************************************/
//  jQuery function : $.removeInlineCSSProp();
//
//  Developped by: Son Pham 
//
//  Date: november 2009
//
//  Description: removes a specific inline style on an element
//              
//  requirement: jQuery 1.3.2
//
//  usage:  1) $.removeInlineCSSProp("#myId","width");
//          2) $.removeInlineCSSProp($("#myId"),"display");
//          3) $.removeInlineCSSProp($("#myId .className"),"margin-left");
//
/**************************************************************/    
jQuery.removeInlineCSSProp = function(selector, cssProperty) {
    try {
        if (cssProperty) {
            if ($.trim(cssProperty) !== "") {
                var $element = $(selector),
                    $this, toRemove, styleArrTmp, styleArr,
                    trimmedValue, arrValue, i, styles;
                    
                $element.each(function() {
                    if (this.nodeType === 1) { // nodeType must be an element
                        $this = $(this); 
                        if ($this.attr("style")) {
                            toRemove = false;
                            styleArrTmp = $this.attr("style").split(";");
                            styleArr = [];
                            
                            // styles cleanup
                            $.each(styleArrTmp, function(i, value) {
                                trimmedValue = $.trim(value);
                                if(trimmedValue !== "") {
                                    styleArr.push(trimmedValue);
                                }
                            });
                            
                            // cssProp lookUp
                            styleArrTmp = styleArr.slice();
                            $.each(styleArr, function(i, value) {
                                arrValue = value.split(":");
                                if ($.trim(arrValue[0].toLowerCase()) === cssProperty.toLowerCase()) {
                                    styleArrTmp.splice(i, 1);
                                    toRemove = true;
                                }
                            });
                            
                            styleArr = styleArrTmp;

                            if (toRemove) {
                                // now rewrite styles
                                styles = "";
                                for (i=0;i<styleArr.length;i++) {
                                    styles += styleArr[i]+";";  
                                }
                                $this.removeAttr("style").attr("style", styles);
                            }
                        }
                    }
                });
            }
        }
    } catch(e) {}
};
/**************************************************************/
//  jQuery function : $.getCallBack.() *** Internal use DO NOT USE ***
//
//  Developped by: Son Pham 
//  Description: returns the first function found in the args parameters
//               We use this function for callBack parameters
//
//  requirement: jQuery 1.3.2
//
//  usage: $.getCallBack(arguments);
/**************************************************************/
jQuery.getCallBack = function(args) {
    var fn = null, i;
    for (i=0;i<args.length;i++) {
        if ($.isFunction(args[i])) {
            return args[i]; 
        }
    }
    return fn;
};
jQuery.runCallBack = function(args) {
    var fn = $.getCallBack(args);
    if (fn !== null) {
        fn.call();
    }       
};
/**************************************************************/
//  jQuery plugin : $.lightBox.[methods]  TODO: validate params
//
//  version: 1.0
//
//  Developped by: Son Pham 
//
//  requirement:    1) jQuery 1.3.2+
//                  2) $.hasLayout
//                  3) $.getRandomNumber
//
//  TODO: add more information
/**************************************************************/
jQuery.lightBox = {
    defaults : {
        ajax: false,
        autoScroll: false, //height control
        colClassName: "", // Grid base [col1,col2,...]
        frameSpeed: 200,        
        image: false,
        modal: false,
        maxWidth: 935,
        minWidth: 619,
        minHeight: 200,
        overlay: true,
        overlaySpeed: 200,
        overlayOpacity: 60,
        overlayColor: '#000000',
        hideCallBack: null
    },  
    animateBox : function(lightBox, args) {
        var $lightBox = $(lightBox),
            $overlay = this.generateOverlay($lightBox),
            /*global window*/
			config = window.lightBoxSettings[$lightBox.attr("id")],
            isIE = $.isIE(), isIE6 = $.isIE(6), isIELowerThan9 = $.isIE("<9"),
            setVisibilityEnabled = false;


        // IE6 select always on top fix
        if (isIE6) {
            if ($.isFunction($.setDropDownVisibility)) {
                setVisibilityEnabled = true;
                $.setDropDownVisibility(false);
            }
        }   

        // Animate background
        if (config.overlay) {
            $overlay.stop().show().animate({opacity: config.overlayOpacity/100},config.overlaySpeed, function() {
                // Animate lightBox
                if (!isIE || !isIELowerThan9) {
                    $lightBox.fadeIn(config.frameSpeed, function() {
                        $.lightBox.runCallBack(args,$lightBox);
                    });
                } else {
                    // IE: jQuery 1.3.2 will fade will black stoke  -> we dont want that it's ugly
                    $lightBox.show();
                    $.lightBox.runCallBack(args,$lightBox);
                        
                    // IE6 select always on top fix
                    if (isIE6) {
                        if (setVisibilityEnabled) {
                            $.setDropDownVisibility(true, $lightBox);
                        }
                        $lightBox.find(".lbContent:first").css("zoom", 1);                      
                    }
                }
                
                // NOTE: Specific to BELL.ca.  otherwise you can safely remove this part                
                $.lightBox.render($lightBox);

                /* run scripts and set the position */
                $.lightBox.setPosition($lightBox);
            });
        } else {
            if (!isIE || !isIELowerThan9) {
                $lightBox.fadeIn(config.frameSpeed, function() {
                    $.lightBox.runCallBack(args,$lightBox);                     
                });
            } else {
                // IE: jQuery 1.3.2 will fade will black stoke  -> we dont want that it's ugly
                $lightBox.show();
                $.lightBox.runCallBack(args,$lightBox);                 
            }           
        }

        this.bindWindowResize($lightBox);
        
        return $lightBox;
    },
    bindWindowResize: function($lightBox) {
        if ($lightBox && $lightBox.length) {
            var config = window.lightBoxSettings[$lightBox.attr("id")],
                $window = $(window), windowW, windowH,
                $updatedWindow, updatedWindowW, updatedWindowH,
                resizeTimeout;
    
            //  window dimension
            windowW = $window.width();
            windowH = $window.height(); 
            
            // Resize window handling
            $window.unbind("resize").resize(function() {
                var onResize = function() {
                    if ($lightBox.is(":visible")) {
                        var $overlay = $.lightBox.generateOverlay($lightBox);
                        $overlay.css({
                            opacity: config.overlayOpacity/100,
                            "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity="+config.overlayOpacity+")",
                            filter: "alpha(opacity="+config.overlayOpacity+")",
                            display: "block"         
                        });
                        $.lightBox.resize($lightBox);
                        $.lightBox.setPosition($lightBox);
                    }
                };
    
                $updatedWindow = $(window);
                updatedWindowW = $updatedWindow.width();
                updatedWindowH = $updatedWindow.height();
                
                // compare the new height and width with old one
                if(windowW!==updatedWindowW || windowH!==updatedWindowH)
                {
                    window.clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(onResize, 10);
                }
                //Update the width and height
                windowW = updatedWindowW;
                windowH = updatedWindowH;
            });
        }
    },
    hide: function(lightBox) {
        var $lightBox, config, fn,
            isIE = $.isIE(), isIE6 = $.isIE(6), isIELowerThan9 = $.isIE("<9");
        
        if (typeof(lightBox) === "undefined") {
            $lightBox = this.getObject();
        } else if (typeof(lightBox) === "object") {
            $lightBox = $(lightBox);
        }      
        
        if ($lightBox && $lightBox.length) {
            config = window.lightBoxSettings[$lightBox.attr("id")];

            if (!isIE || !isIELowerThan9) {
                $lightBox.fadeOut(config.frameSpeed, function() {
                    $("#lbOverlay").fadeOut(config.overlaySpeed, function() {
                        if (typeof (config.showInPage) === "undefined") {
                            $(this).remove();
                        }

                        if ($.isFunction(config.hideCallBack)) {
                            config.hideCallBack.apply(this, [$lightBox]);           
                        }
                    });
                });
            } else {
                // IE: jQuery 1.3.2 will fade will black stoke  -> we dont want that it's ugly          
                $lightBox.hide();
                $("#lbOverlay").fadeOut(config.overlaySpeed, function() {
                    $(this).remove();

                    if ($.isFunction(config.hideCallBack)) {
                        config.hideCallBack.apply(this, [$lightBox]);           
                    }
                });
            }
            // IE6 select always on top fix
            if (isIE6) {
                if ($.isFunction($.setDropDownVisibility)) {
                    $.setDropDownVisibility(true);
                }
            }
            return $lightBox;
        } else {
            $lightBox = this.getObject();

            fn = $.getCallBack(arguments);
            if (fn !== null) {
                window.lightBoxSettings[$lightBox.attr("id")].hideCallBack = fn;
            }
            this.hide($lightBox);
        }
    },
    fadeEnable : function() {
        if ($.isIE("<9")) {
            return false;   
        } else {
            return true;    
        }
    },
    getInnerWidth: function($lightBox) {
        var width = 0, $lining;
        
        if (typeof($lightBox) === "undefined") {
            $lightBox = this.getObject();       
        } 

        if ($lightBox.length) {
            $lining = $lightBox.find(".lbBoxLining:first");         
            if ($lining.length) {
                width += parseInt($lining.css("paddingLeft"),10)+parseInt($lining.css("paddingRight"),10);
                width = $lightBox.width() - width - 1;
            }
        }
        
        return width;
    },
    getObject: function() {
        var $lightBox = null;
        $(".lbFrame").each(function() {
            if ($(this).is(":visible")) {
                $lightBox = $(this);
                return false;   
            }
        });
        return $lightBox;
    },
    getOverlay: function() {
        return $("#lbOverlay");
    },
    generateBoxHTML: function(lightBoxId) {
        var $lightBox = $("<div id='"+lightBoxId+"' class='lbFrame'><div class='lbBordRight'><div class='lbBordLeft'><div class='lbBoxLining'><div class='lbTitle'><div class='lining'><h2 class='txtRep'>loading ...</h2></div></div><div class='lbContent lbInnerWrap'></div></div></div></div><div class='lbTopRight'><div class='lbTopLeft'><!-- --></div></div><div class='lbBottomRight'><div class='lbBottomLeft'><!-- --></div></div></div>");

        $lightBox.css({
            zIndex: 999999,//$.getHighestZIndex(),
            display: "none"
        });
            
        $("body").append($lightBox);
        
        return $lightBox;   
    },
    generateOverlay: function(lightBox) {
        // remove previous overlay
        $("#lbOverlay").remove();
        
        // Define background html markup
        // width 100% looks to work well in all browser (old : $(window).width()+"px")
        var $overlay = $("<div id='lbOverlay' class='lbOverlay'></div>"),
            $lightBox, config;
        
        $overlay.css({
			/*global document*/
            height: $(document).height()+"px",
            width: "100%",
            opacity: 0,
            backgroundColor: "#000",
            display: "none"
        });
        $('body').append($overlay);

        if (lightBox) {
            $lightBox = $(lightBox);
            config = window.lightBoxSettings[$lightBox.attr("id")]; 
            
            $overlay.css({
                zIndex: $lightBox.css("zIndex")-1,
                backgroundColor: config.overlayColor,
                filter: "alpha(opacity="+config.overlayOpacity+")"
            });
            
            // Close actions
            if (!config.modal) {
                $overlay.unbind("click").click(function() {
                    $.lightBox.hide($(lightBox));
                    return false;
                });
            }
        } 
        return $overlay;
    },
    getCallBack : function(args) {
        var fn = null, i;
        for (i=0;i<args.length;i++) {
            if ($.isFunction(args[i])) {
                return args[i]; 
            }
        }
        return fn;
    },
    preRender: function(lightBoxId) {
        // lightbox html markup
        var $lightBox = $.lightBox.generateBoxHTML(lightBoxId),
            $overlay, config, $content;
        
        // Adds and bind close action
        this.setCloseAction($lightBox);

        $overlay = this.generateOverlay($lightBox);
        config = window.lightBoxSettings[$lightBox.attr("id")];

        // set initial dimension
        $content = $lightBox.find(".lbContent:first");
        $content.height(config.minHeight);

        // loader animation
        if (typeof($.ajaxLoader) === "object") { 
            $.ajaxLoader.show({targetId:$content});
        }
        $lightBox.width(config.minWidth);
        $.lightBox.render($lightBox);

        // Animate background
        if (config.overlay) {
            $overlay.stop().show().animate({opacity: config.overlayOpacity/100},config.overlaySpeed, function() {
                if ($.lightBox.fadeEnable()) {
                    $.lightBox.setPosition($lightBox).fadeIn();                 
                } else {
                    $.lightBox.setPosition($lightBox).show();
                }
            });
        } else {
            if ($.lightBox.fadeEnable()) {
                $.lightBox.setPosition($lightBox).fadeIn();                 
            } else {
                $.lightBox.setPosition($lightBox).show();
            }
        }
        return $lightBox;
    },
    render: function(selector) {
        if (typeof($.pageRender) === "function") {
            $.pageRender(selector, "lightBox");
        }
    },
    resize : function(lightBox) {
        var $lightBox, $window, windowW, windowH,
            newWidth, gridBased, $col, elementWidth,
            $content, top, config,
            extraHeights, $lbTopRight, $lbBottomRight, lightBoxH, heightDiff,
            isIFrame, $iFrame, iFrame, $iFrameInnerWrap,
            isIE6 = $.isIE(6);
        
        if (!lightBox) {
            $lightBox = this.getObject();
        } else {
            $lightBox = $(lightBox);
        }
        if ($lightBox.length) {
            config = window.lightBoxSettings[$lightBox.attr("id")]; 
    
            $iFrame = $lightBox.find("iframe:first");
            isIFrame = $iFrame.length?true:false;
            
            //  window dimension
            $window = $(window);
            windowW = $window.width();
            windowH = $window.height();     
    
            // Content ajustment depending on the height
            $content = $lightBox.find(".lbContent:first");
            $content.removeAttr("style"); // reset content styles
    
            //  width validation
            newWidth = config.minWidth;
    
            //  Grid base seetings?
            gridBased = false;
            if (config.colClassName !== "") {
                $col = $("<div id='temp-will-be-destroyed-anyways' class='"+config.colClassName+" lbBoxLining'></div>");
                $("body").append($col);
                if ($col.width()) {
                    gridBased = true;
                    newWidth = $col.width()+parseInt($col.css("paddingLeft"),10)+parseInt($col.css("paddingRight"),10);             
                }
                $col.remove();
            }
            
            elementWidth = $lightBox.outerWidth();
            
            if (isIFrame) { 
                if ($content.length) {
                    $content.removeClass("lbInnerWrap");
                }
                // try to access iframe content
                try {
                    iFrame = $iFrame[0].contentDocument || $iFrame[0].contentWindow.document;           
                } catch(e) {}
                
                if (iFrame) {
                    $iFrameInnerWrap = $(iFrame).find(".lbInnerWrap:first");
                    if ($iFrameInnerWrap.length) {
                        $iFrameInnerWrap.width($iFrame.width());    
                    }
                } else {
                    elementWidth += 20; // 20 is the approximative browser scroller width
                }
            }
    
            if (gridBased) { elementWidth = newWidth; }
            
            // Width check
            if (elementWidth < config.minWidth) {
                $lightBox.width(config.minWidth);
            } else if (elementWidth > windowW) {
                $lightBox.width(windowW-(elementWidth-windowW)*2);
            } else if (elementWidth > config.maxWidth) {
                $lightBox.width(config.maxWidth);           
            } else {
                $lightBox.width(elementWidth);
            }
            
            // Height check
            if (config.autoScroll) {
                extraHeights = 0;
                $lbTopRight = $lightBox.find(".lbTopRight:first");
                if ($lbTopRight.length) {
                    extraHeights += parseInt($lbTopRight.css("height"),10); 
                }
                $lbBottomRight = $lightBox.find(".lbBottomRight:first");
                if ($lbBottomRight.length) {
                    extraHeights += parseInt($lbBottomRight.css("height"),10);
                }
                
                lightBoxH = ($lightBox.height()+extraHeights+extraHeights/2);
                if(lightBoxH>windowH) {
                    heightDiff = lightBoxH - windowH;
                    $content.height($lightBox.height()-heightDiff*2).css("overflow-y","scroll");
                }
            }
    
            if (isIE6) {
                top = $(document).scrollTop();
                windowH = windowH/2;
                if (top === 0) { 
                    top = windowH; 
                } else {
                    top = (windowH+top);
                }
                $lightBox.css("top",top-$lightBox.outerHeight(true)/2+"px");
            }
    
            // position the lightBox
            this.setPosition($lightBox);
            
            // IE6 hasLayout
            if (isIE6) {
                if ($.isFunction($.hasLayout)) {
                    $.hasLayout($lightBox); 
                }
            }
        }
        return $lightBox;
    },
    runCallBack: function(args, $lightBox) {
        // callBack handling if present
        var fn = this.getCallBack(args);
        if ($.isFunction(fn)) {
            fn.apply(this, [$lightBox]);            
        }
    },
    // callBack argument is supported
    showInPage: function(element, elementSettings) {
        var $element = $(element),
            lightBoxId, $lightBox, $content, contentId = $element.attr("id"),
            $movedElement = $("#"+contentId+"-tpl"),
            $iFrame, isIFrame, iFrameSrc, iFrameParam, iFrameArray,
            dataSettings, settings;

        if ($movedElement.length) {
            lightBoxId = $.data($movedElement.get(0),"lbId");
        } else {
            lightBoxId = $.data($element.get(0),"lbId");
        }
        
        if (!lightBoxId) {
            lightBoxId = 911;
            if ($.isFunction($.getRandomNumber)) {
                lightBoxId = $.getRandomNumber();
            }
            lightBoxId = "bell-lightBox-"+lightBoxId;           
        }
        $lightBox = $("#"+lightBoxId);
        // settings
        dataSettings = $.data($element.get(0),"settings");
        if (!$.isFunction(elementSettings)) {
            if (typeof(elementSettings) !== "object" && !dataSettings) {
                settings = this.defaults;
            } else if (dataSettings) {
                settings = $.extend(false, dataSettings, elementSettings);          
            } else {
                settings = $.extend(false, this.defaults, elementSettings);
            }
        } else {
            settings = this.defaults;
        }
        settings.lightBoxId = lightBoxId;
        settings.showInPage = true;
        if (typeof(window.lightBoxSettings) === "undefined") { window.lightBoxSettings = {}; }
        window.lightBoxSettings[lightBoxId] = settings;
        
        if ($lightBox.length === 0) {
            // lightbox html markup
            $lightBox = $.lightBox.generateBoxHTML(lightBoxId);

            // title
            $lightBox.find(".lbTitle h2").empty().append($element.find(".lightBoxTitleJs:first").text()).addClass("txtRep hType2");
            
            // content
            $content = $lightBox.find(".lbContent:first");
            $content.append($element.removeClass("accessAlt").show());
            // hide title from content since it has been moved into the lightBox header
            $content.find(".lightBoxTitleJs:first").remove();
            // move id of content to higher level to control the lightBox externaly
            if (contentId) {
                $lightBox.find(".lbBoxLining").attr("id", contentId);   
                $element.attr("id", contentId+"-tpl");
            }

            $iFrame = $lightBox.find("iframe:first");
            isIFrame = $iFrame.length?true:false;

            if (isIFrame) {
                iFrameSrc = $iFrame.attr("src");
                iFrameParam = "?rand="+$.getRandomNumber();
                if (iFrameSrc.indexOf("?") === -1) {
                    if (iFrameSrc.indexOf("#") === -1) {
                        iFrameSrc += iFrameParam; 
                    }
                } else if (iFrameSrc.indexOf("&") === -1) {
                    iFrameSrc += "&"+iFrameParam;
                } else if (iFrameSrc.indexOf("&") !== -1)  {
                    if (iFrameSrc.indexOf("#") !== -1) {
                        iFrameArray = iFrameSrc.split("#");
                        iFrameSrc = iFrameArray[0]+"&rand="+$.getRandomNumber()+"#"+iFrameArray[1];
                    } else {
                        iFrameSrc += +"&rand="+$.getRandomNumber(); 
                    }
                } 
                $iFrame.attr("src", iFrameSrc);
            }

            // resize lightbox now that its has the content
            window.lightBoxAjaxTimer = setTimeout(function() {
                clearTimeout(window.lightBoxAjaxTimer);
                $.lightBox.resize($lightBox);
            }, 0);

            // Adds and bind close action
            this.setCloseAction($lightBox);
        }
        
        $.data($element.get(0),"lbId", lightBoxId);

        // Animate background       
        return this.animateBox($lightBox, arguments);
    },
    // callBack argument is supported   
    showAjax: function(element, elementSettings) {
        var $element = $(element),
            rand = Math.floor(Math.random()*100),
            url, lightBoxId, $lightBox,
            $content, args, dataSettings, settings;
        
        // Get url to send to AJAX
        url = $element.attr('href');
        
        // Set element id
        lightBoxId = $.data($element.get(0),"lbId");
        
        if (!lightBoxId) {
            lightBoxId = rand;
            if ($.isFunction($.getRandomNumber)) {
                lightBoxId = $.getRandomNumber();
            }
            lightBoxId = "bell-lightBox-"+lightBoxId;           
        }       
        $lightBox = $("#"+lightBoxId);

        // settings
        dataSettings = $.data($element.get(0),"settings");
        if (!$.isFunction(elementSettings)) {
            if (typeof(elementSettings) !== "object" && !dataSettings) {
                settings = this.defaults;
            } else if (dataSettings) {
                settings = $.extend(false, dataSettings, elementSettings);          
            } else {
                settings = $.extend(false, this.defaults, elementSettings);
            }
        } else {
            settings = this.defaults;
        }
        if (typeof(window.lightBoxSettings) === "undefined") { window.lightBoxSettings = {}; }      
        window.lightBoxSettings[lightBoxId] = settings;

        if ($lightBox.length === 0){
            // lightbox html markup
            $lightBox = this.preRender(lightBoxId);
            
            $content = $lightBox.find(".lbContent:first");
            
            // Loads data synchronously. 
            // Blocks the browser while the requests is active. 
            // It is better to block user interaction by other means when synchronization is necessary.
            if (url.indexOf("&") !== -1) {
                url += "&refreshxyz="+rand;
            } else if (url.indexOf("?") === -1) {
                url += "?refreshxyz="+rand;
            }

            // callBack?
            args = arguments;
            
            $.ajax({
                url: url,
                async: false,
                success: function(data) {
                    // IE6 select always on top fix
                    if ($.isIE(6)) {
                        if ($.isFunction($.setDropDownVisibility)) {
                            $.setDropDownVisibility(false);
                        }
                    }
                    
                    $lightBox.css("visibility","hidden");

                    $content.html(data);
                    
                    // title
                    var $contentTitle = $content.find(".lightBoxTitleJs:first");
                    if ($contentTitle.length) {
                        $lightBox.find(".lbTitle h2").empty().append($contentTitle.text()).addClass("txtRep hType2");
                        $contentTitle.remove();             
                    }
                    // Adds and bind close action
                    $.lightBox.setCloseAction($lightBox);                   
                    $.lightBox.runCallBack(args, $lightBox);

                    $.lightBox.render($lightBox);
                    $.lightBox.resize($lightBox);

                    window.lightBoxAjaxTimer = setTimeout(function() {
                        $(".hScrollBarJs", $lightBox).scroller({fillSpace:true, toggle: false});
                        clearTimeout(window.lightBoxAjaxTimer);
                        $lightBox.css("visibility","visible");
                        $.lightBox.resize($lightBox);
                    }, 250);

                    $.data($element.get(0),"lbId",lightBoxId);
                },
                error: function() {
                    var defErrorText = "Error";
                    if ($.isFunction($.getText)) {
                        defErrorText = $.getText("error");
                    }
					/*global alert*/
                    alert(defErrorText);
                    $.lightBox.hide($lightBox);
                    $lightBox.remove();                 
                }
            });
        } else {
            $.data($element.get(0),"lbId",lightBoxId);
            
            return this.animateBox($lightBox, arguments);
        }
    },
    showImage: function(element, elementSettings) {
        var $element = $(element),
            rand = Math.floor(Math.random()*10000),
            url, lightBoxId, triggerId, $lightBox, img,
            imageTitle, $child, $content, $overlay, args;
        
        // Get url of image
        url = $element.attr('href');
        
        // Set element id
        lightBoxId = "bell-lightBox";
        triggerId = $element.attr("id");
        if (triggerId === "" || triggerId === "undefined") {
            $element.attr("id",lightBoxId+"-image-"+rand);
            lightBoxId += "-"+rand;
        } else {
            lightBoxId = triggerId.replace("-image","");
        }
        $lightBox = $("#"+lightBoxId);

        // share the settings
        if (typeof(elementSettings) === "undefined") { 
            elementSettings = this.defaults; 
        } else if (typeof(elementSettings.onDemand) === "undefined") {
            elementSettings = $.extend(false, this.defaults, elementSettings);          
        }
        if (typeof(window.lightBoxSettings) === "undefined") { window.lightBoxSettings = {}; }      
        window.lightBoxSettings[lightBoxId] = elementSettings;

        if ($lightBox.length === 0) {
            // lightbox html markup
            $lightBox = $.lightBox.generateBoxHTML(lightBoxId);

            // LightBox image title
            imageTitle = $element.attr('title');            
            $child = $element.children();
            if ($child.length) {
                img = $child.get(0);
                if (img.nodeName === "IMG") {
                    imageTitle = $(img).attr("alt");
                }
            }
            if (imageTitle === "") { imageTitle = "Image"; }
            
            $content = $lightBox.find(".lbContent:first");
            $content.append("<div class='lbLining'><div class='lining'><img src='"+$element.attr('href')+"' alt='"+imageTitle+"' /></div></div>");
            
            $overlay = $.lightBox.generateOverlay($lightBox);
            
            if ($.isIE("<9")) {
                $.loadImages($content.find("img:first"));               
                $.lightBox.resize($lightBox);
            }
            
            $.lightBox.animateBox($lightBox, arguments);

            // callBack?
            args = arguments;
            
            $lightBox.find(".lbTitle h2").empty().append(imageTitle).addClass("txtRep hType2");

            $.lightBox.setCloseAction($lightBox);
            return $.lightBox.animateBox($lightBox, arguments);                             
        } else {
            return this.animateBox($lightBox, arguments);
        }
    },
	showVideo: function(url) {
		var html, videoId = "lightBox-video-"+$.getRandomNumber();
		html = '<div id="'+videoId+'" class="hide">';
		html += '<object width="640" height="385"><param name="movie" value="'+url+'?fs=1&amp;hl=en_US&amp;autoplay=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="'+url+'?fs=1&amp;hl=en_US&amp;autoplay=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="385"></embed></object>';
		html += '</div>';
		$("body").append(html);
		$.lightBox.showInPage("#"+videoId);
	},
    setCloseAction: function(lightBox) {
        var $lightBox = $(lightBox),
            config = window.lightBoxSettings[$lightBox.attr("id")];
            
        if (!config.modal) {
            if ($lightBox.find(".lbTitle a:first").length === 0) {
                $lightBox.find(".lbTitle:first").append("<a href='#' class='lightBoxCloseJs'>Close</a>");
            }
        }

        $lightBox.find(".lightBoxCloseJs").each(function() {
            $(this).click(function() {
                $.lightBox.hide($lightBox);
                return false;
            });
        });     
    },
    setPosition: function(lightBox) {
        var $lightBox = $(lightBox),
            winH = $(window).height(), $lbTopRight,
            lightBoxH = $lightBox.outerHeight(true),
            top = (winH - lightBoxH) / 2;

        if (lightBoxH>winH) {
            $lbTopRight = $lightBox.find(".lbTopRight:first");
            if ($lbTopRight.length) {
                top = parseInt($lbTopRight.css("height"),10);   
            }
        }

        $lightBox.css({
            left: ($(window).width() - $lightBox.width()) / 2+"px",
            top: top+"px"
        });

        if ($.isIE(6)) {
            top = $(document).scrollTop();
            winH = winH/2;
            if (top === 0) { 
                top = winH; 
            } else {
                top = (winH+top);
            }
            $lightBox.css("top",top-lightBoxH/2+"px");
        }
        return $lightBox;
    },
    setSize: function(width, height) {
        var $lightBox = this.getObject(),
            $iFrame,isIFrame;

        if ($lightBox) {
            $iFrame = $lightBox.find("iframe:first");
            isIFrame = $iFrame.length?true:false;

            // different process for iFrame
            if (isIFrame) {     
                $iFrame.attr("width",width).attr("height",height);
    
                if ($.isFunction($.hasLayout)) {
                    $.hasLayout($lightBox);
                }
            } else {
                $lightBox.width(width).height(height);
            }
                
            this.resize($lightBox);
        }
    }
};
/**************************************************************/
//  jQuery plugin : $().lightBox()
//
//  version: 1.0
//
//  Developped by: Son Pham 
//
//  Date: november 2009
//
//  Description: ... to be completed
//
//  content ActionClassName: lightBoxTitleJs, lightBoxCloseJs ...
//              
//  requirement: jQuery 1.3.2
//
//  knowned issues: IE overlay transparency not working
//
//  usage:  1) $(".lightBoxModalJs").lightBox({modal:true})
//          2) $(".lightBoxInPageJs").lightBox({ajax:true})
//
//  TODO: add more information
/**************************************************************/    
jQuery.fn.lightBox = function(settings) {
    settings = $.extend(false, $.lightBox.defaults, settings);

    return this.each(function(idx) {
        var $element = $(this);
        
        // create overlay
        $.lightBox.generateOverlay();

        $.data(this,"settings", settings);

        // bind click event
        $element.click(function() {
            // flag to indicate that the lightBox is using the initialization method
            settings.onDemand = false;
            
			if ($element.attr("rel")==="video") {
				$.lightBox.showVideo($element.attr("href"));
			} else {
				if (settings.image) {
					$.lightBox.showImage(this);
				} else if (!settings.ajax) {
					// content is in the page
					var targetId = $element.attr("href").split("#")[1];
					$.lightBox.showInPage("#"+targetId, $.data(this,"settings"));
				} else {
					// content is from url (AJAX)
					$.lightBox.showAjax($(this), $.data(this,"settings"));
				}
			}
            return false;                      
        });
    });
};
/***************************************************/
//  Function: $.isIE()
//
//  Developped by: Son Pham
//
//  description: Tells if the browser is Internet Explorer and optionally
//               tells if it's IE version x
// 
//  requirement: jQuery 1.3.2+
//
//  usage:  1) $.isIE();
//          2) $.isIE(6); // returns true if the browser is IE6
//          3) $.isIE("6+"); // returns true if IE version is greater than IE6 (IE6 not included)
//          4) $.isIE("9-"); // returns true if IE version is less than IE9 (IE9 not included)
//          5) $.isIE(">6"); // returns true if IE version is greater than IE6 (IE6 not included)
//          6) $.isIE("<9"); // returns true if IE version is less than IE9 (IE9 not included)
//
//  params:
//  @1 (integer): Number of the internet explorer's version to check
/**********************************************************/
jQuery.isIE = function(version) {
    var ieDetected = false,
        toValidateVersion = false,
        valideVersion = false,
        browserVersion, versionStr;
    
    if ($.browser.msie) { ieDetected = true;}
    
    if (typeof(version) !== "undefined") {
        browserVersion = parseInt($.browser.version,10);
        versionStr = String(version);

        if (versionStr.indexOf("+") !== -1 || versionStr.indexOf("-") !== -1 || versionStr.indexOf("<") !== -1 || versionStr.indexOf(">") !== -1) {
            toValidateVersion = true;

            if (versionStr.indexOf("+") !== -1 || versionStr.indexOf(">") !== -1) {
                versionStr = versionStr.replace(new RegExp(">","gi"),"");
                if (browserVersion > parseInt(versionStr,10)) {
                    valideVersion = true;                   
                }
            } else {
                versionStr = versionStr.replace(new RegExp("<","gi"),"");
                if (browserVersion < parseInt(versionStr,10)) {
                    valideVersion = true;
                }
            }
        } else {
            version = parseInt(version,10);
            if (!isNaN(version)) { // number
                toValidateVersion = true;
                if (browserVersion === version) {
                    valideVersion = true;       
                }
            }
        }
    }
    if (toValidateVersion) {
        return (ieDetected && valideVersion);
    } else {
        return ieDetected;
    }
};
//*****************************************************
//  jQuery function: $.getRandomNumber()
//
//  developed by: Son Pham
//
//  description: will generate a random number (defaults 1-999)
//
//  scenario: You need to create unique random ID
//
//  Requirement: jQuery 1.3.2
//
//  usage:  1) $.getRandomNumber(); // 1-999
//          2) $.getRandomNumber(5); // 1-99999
//
//  params:
//  @1 numberLength (integer): number range
//  @2 randomType (string): type of random (by "max" / length "null/undefined" (default))
//***************************************************** 
jQuery.getRandomNumber = function(numberLength, randomType) {
    var strLength = "1", i;
    if (isNaN(numberLength)) { numberLength = 3; }

    if ((typeof(randomType) === "undefined") || (randomType !== "max") || (randomType === null)) {
        for (i=0; i<numberLength; i++) {
            strLength += i;
        }
        return Math.floor(Math.random()*parseInt(strLength,10));
    } else {
       return Math.round(Math.random()*numberLength);       
    }
};
/***************************************************/
// plugin: toggleShowHide
//
// Developped by: Son Pham
//
// description: Toggles the Show / Hide the anchor link 
//
//              Note: if you do not want the toggle behavior, please see toRemove() and toShow()
// 
// requirement: 1) jQuery 1.3.2+
//              2) $.isIE()
//
// usage:   1) $(".selector").toggleShowHide()
//
// Note: if you want to toggle the text use the following rule:
//       rel value must match the toggle text you want in the anchor link text
//       <a href="#content" rel="show/hide">show/hide options</a>
//
// params : 
//  @slide: (boolean) indicate if slide effect is applied  default: true
//          note: slide is not supported on IE
/**********************************************************/
jQuery.fn.toggleShowHide = function(settings) {
    var validateParams, bindClickEvent, runExternalProcess, elements = this;
    settings = $.extend(false, $.toggleShowHide.defaults, settings);

    // Validate Params
    validateParams = function() {
        if (typeof(settings.slide) !== "boolean") {
            settings.slide = false;
        }       
    };

    bindClickEvent = function() {
        elements.live("click", function() {
            var $element = $(this),
                $content = [], contentId,
                href = $element.attr("href"),
                rev = $element.attr("rev"),
                isInPage = true;
            
            if (href) {
                if (href.substr(0,1) !== "#") { 
                    if (rev) {
                        isInPage = false;
                        contentId = rev;
                    } else if (href.indexOf("#") !== -1) {
                        contentId = href.split("#")[1];
                    } 
                } else {
                    contentId = href.split("#")[1];
                }
                if (contentId && contentId !== "") {
                    $content = $("#"+contentId);
                }
                
                if ($content.length) {
                    if (!isInPage && !$.data($element.get(0),"loaded")) {
                        $.ajaxLoader.show();
                        $.ajax({
                            url: href,
                            success: function(data) {
                                $.ajaxLoader.hide();                                    
                                $content.html(data);
                                // TODO: remove hardcoded value here
                                $(".tglJs", $content).toggleShowHide();
                                
                                $.toggleShowHide.animateText($element, $content);
                                $.data($element.get(0),"loaded",settings);
                            },
                            error: function() {
                                $.ajaxLoader.hide();
                                var defErrorText = "Error";
                                if ($.isFunction($.getText)) {
                                    $content.html($.getText("error"));
                                } else {
                                    $content.html(defErrorText);
                                }
                                $.data($element.get(0),"loaded",true);                                  
                            }
                        });
                    } else {
                        $.toggleShowHide.animateText($element, $content);
                    }
                    runExternalProcess($content);
                }
            }
            
            return false;
        });
        
        // Third-Party optional process
        runExternalProcess = function($content) {

        };
    };

    return this.each(function(idx){
        var $element = $(this),
            $content, widgetClassName,
            isInPage = true,
            href = $element.attr("href");

        // validateParams
        if (idx ===0) { validateParams(); }

        if (href) {
            if (href.substr(0,1) !== "#") { isInPage = false; }

            $content = $.toggleShowHide.getContent($element);

            if ($content.length) {
                widgetClassName = "";
                if ($.isFunction($.getJsClassName)) {
                    widgetClassName = $.getJsClassName($element);
                    $element.addClass(widgetClassName);
                    
                    // default state opened?closed
                    if (!$element.hasClass(widgetClassName+"Open")) {
                        $content.hide();
                    } else if (!isInPage) {
                        $.ajaxLoader.show();
                        $.ajax({
                            url: href,
                            success: function(data) {
                                $.ajaxLoader.hide();                                    
                                $content.html(data);
                                // TODO: remove hardcoded value here
                                $(".tglJs", $content).toggleShowHide();
                                
                                $.data($element.get(0),"loaded",true);
                            },
                            error: function() {
                                $.ajaxLoader.hide();
                                var defErrorText = "Error";
                                if ($.isFunction($.getText)) {
                                    $content.html($.getText("error"));
                                } else {
                                    $content.html(defErrorText);
                                }
                                $.data($element.get(0),"loaded",true);                                  
                            }
                        });
                    } 
                }
                
                settings.widgetClassName = widgetClassName;
        
                // Toggle text handling
                if (!$.data($element.get(0),"settings")) {
                    $element.attr("title", $element.text());
                    if ($.toggleShowHide.toToggleText($element)) {
                        $.toggleShowHide.toggleText(-1,$element);
                        if ($element.hasClass(widgetClassName+"Open")){
                            $.toggleShowHide.toggleText(1,$element); 
                        }
                    }
                    $.data($element.get(0),"settings", settings);                   
                }
                
                if (idx===0) { bindClickEvent(); }
            }
        }
    });
};
jQuery.toggleShowHide = {
    defaults : {
        slide: true,
		callBack: null
    },
    update: function(params) {
        var $link, settings, $content, defaults,
            goodIE = $.isIE(">8");
        
        if (typeof(params) === "object") {
            // defaults are there for security only
            defaults = {
                linkElement: [],
                ajax: false,
                inPage: true,
                text: false,                
                url: "",
                targetId: "",
                content: ""
            };
            
            params = $.extend(false,defaults,params);
            
            $link = $(params.linkElement);
            
            if ($link.length) {
                settings = $.data($link.get(0),"settings");             
                if (settings) {
                    settings = $.extend(false,params,settings);
                    $content = this.getContent($link);
                    
                    $.removeData($link.get(0),"loaded");
                    
                    if (settings.ajax) {
                        $link.attr("rev", $content.attr("id"));
                        $link.attr("href",settings.url);
                    }else if (settings.inPage) {
                        $link.attr("href","#"+settings.targetId);
                    }

                    if ($content.length) {
                        if ((settings.slide && !$.isIE()) || (settings.slide && goodIE)) {
                            $content.animate({opacity:0},100).slideUp(function() {
                                $content.empty();                                                  
                            });
                        } else {
                            $content.hide().empty();
                        }
                        if ($link.hasClass("tglActiveJs")) {
                            $link.removeClass("tglActiveJs");
                            if (settings.widgetClassName !== "") {
                                $link.removeClass(settings.widgetClassName+"Open");
                            }
                        }
                        this.toggleText(0,$link);                       
                        
                        if (settings.text) {
                            $content.html(settings.content);    
                        }
                    }
                }
            }
        }
    },
    getContent: function(linkElement) {
        var $link = $(linkElement),
            href = $link.attr("href"),
            rev =  $link.attr("rev"), contentId,
            $content = [];
            
        if ($link.length) {
            if (href) {
                if (href.substr(0,1) !== "#") { 
                    if (rev) {
                        contentId = rev;
                    } else if (href.indexOf("#") !== -1) {
                        contentId = href.split("#")[1];
                    } 
                } else {
                    contentId = href.split("#")[1];
                }
                if (contentId && contentId !== "") {
                    $content = $("#"+contentId);
                }
            }
        }
        return $content;
    },
    toToggleText: function(element) { // find toggle text
        var $element = $(element),
            str = $element.attr("title"),
            rel = $element.attr("rel"),
            toggleTextFounded = false;
            
        if (str.indexOf(rel) !== -1) {
            toggleTextFounded = true;
        }
        return toggleTextFounded;
    },
    replaceText: function(searchText, newText, element) {
        var $element = $(element);
        $element.html($element.html().replace(searchText, newText));
    },
    toggleText: function(showState,element) {
        var $element = $(element),
            rel, originaltext,
            arrRel, text;
        
        if (this.toToggleText($element)) {
            rel = $element.attr("rel");
            originaltext = $element.attr("title");

            if (rel !== "") {
                if (rel.indexOf("/") !== 0) {
                    arrRel = rel.split("/");
                    
                    if (arrRel.length) {
                        switch(showState) {
                            case -1: // initial state
                                text = originaltext.replace(arrRel[1], arrRel[0]);
                                text = text.replace(arrRel[0]+"/","");
                                this.replaceText(originaltext, text, $element);
                                break;
                            case 0: // Show state
                                
                                text = originaltext.replace(arrRel[showState+1], arrRel[showState]);    
                                text = text.replace(arrRel[showState]+"/","");
                                this.replaceText($element.text(), text,  $element);
                                $element.removeClass("tglActiveJs");
                                break;
                            case 1: // Hide state
                                text = originaltext.replace(arrRel[showState-1], arrRel[showState]);    
                                text = text.replace("/"+arrRel[showState],"");
                                this.replaceText($element.text(), text,  $element);                         
                                $element.addClass("tglActiveJs");
                                break;
                        }
                    }
                }
            }
        }
    },
    animateText: function($element, $content) {
        var widgetClassName = "",
            settings = $.data($element.get(0),"settings"),
            isIE = $.isIE(), goodIE = $.isIE(">8");
        
        if (!settings) { 
            settings = this.defaults;
            $.data($element.get(0),"settings", settings);
        }
        
        if ($.isFunction($.getJsClassName)) {
            widgetClassName = $.getJsClassName($element);
            $element.addClass(widgetClassName);
            
            // default state opened?closed
            if (!$element.hasClass(widgetClassName+"Open")) {
                $content.hide();
            }           
        }

        if (widgetClassName !== "") {
            $element.toggleClass(widgetClassName+"Open");
        }
        
        if (!$content.is(":visible")) {
            if ((settings.slide && !$.isIE()) || (settings.slide && goodIE)) {
                $content.css("opacity",0).slideDown(function() {
                    $content.animate({opacity:1},"fast");
                });
            } else {
                $content.css("opacity",1).show();
                if (isIE) { 
                    $.removeInlineCSSProp($content, "filter");
                    $.hasLayout($content);                  
                }
            }
        } else {
            if ((settings.slide && !$.isIE()) || (settings.slide && goodIE)) {
                $content.animate({opacity:0},100).slideUp();
            } else {            
                $content.hide();
                if (isIE) { 
                    $.removeInlineCSSProp($content, "filter");                  
                    $.hasLayout($content);
                }
            }
        }
        $.hasLayout($content);

        this.toggleText($element.hasClass("tglActiveJs")?0:1,$element);
		
		if ($.isFunction(settings.callBack)) {
			settings.callBack.apply(this,[$element]);	
		}
    }
};
/**************************************************************/
// jQuery function: getJsClassName()
//
// Developped by: Son Pham
//
// Description: Extract className use for JS trigger to the CSS
//              ClassName
//
// Exemple: hScrollBarJs -> will become hScrollBar
//
// requirement: 1) jQuery 1.3.2
//              2) selector (can be a string or object)
//
// Note: 1) if you have multiple instance of className with Js
//          example: <div class='hScrollBarJs toolTip'></div>
//          the first occurence of Js will be returned e.g hScrollBar
//
//       2) specific for Bell.ca
//
// usage:   1) $.getJsClassName(".hScrollBarJs");
//          2) $.getJsClassName("hScrollBarJs");
//          3) $.getJsClassName($(".cBox"));
/**************************************************************/    
jQuery.getJsClassName =  function(selector) {
    var strSelector = selector,
        objClass, hasJs, i;
    
    if (typeof(selector) === "object") {
        objClass = $(selector).attr("class").split(" ");
        hasJs = false;
        for (i=0;i<objClass.length;i++) {
            if (objClass[i].indexOf("Js") !== -1) {
                strSelector = objClass[i];
                hasJs = true;
                break;
            }
        }
        if (!hasJs) {
            strSelector = "";   
        }
    } 
    if (strSelector.indexOf(".") !== -1) {
        strSelector = strSelector.substr(1,strSelector.length-3);
    } else {
        strSelector = strSelector.substr(0,strSelector.length-2);
    }
    return strSelector;
};
/***************************************************/
//  Function: $.setClassToNthChild()
//
//  Developped by: Son Pham
//
//  description: Set a className to a nth-position of a selector
//
//  requirement: 1) jQuery 1.3.2+
//
//  usage:  1) $.setClassToNthPosition("ul li",3,"colLast");
//          2) $.setClassToNthPosition($("ul>li"),5,"endOfRow");
//
// params : 
//  @selector : (string/object) list of html elements to apply className
//  @nTh : (number) nth number for each to apply the className
//  @className: (string) css className to apply when nth-child is founded
/**********************************************************/
jQuery.setClassToNthPosition = function(selector, nTh, className) {
    var $element;
    if (selector && !isNaN(nTh)) {      
        $(selector).each(function(idx) {
            $element = $(this);
			$element.removeClass(className);
			if (idx!==0 && (idx+1)%nTh===0) {
                $element.addClass(className);
            }
        });
    }
};
})(jQuery);