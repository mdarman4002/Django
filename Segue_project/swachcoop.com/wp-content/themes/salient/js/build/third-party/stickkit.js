! function(i) {
    var t = function() {
        this.scrollTop = i(document).scrollTop(), this.scrollLeft = 0, this.bindEvents()
    };
    t.prototype.bindEvents = function() {
        var t = this;
        i(document).on("scroll", function() {
            t.scrollTop = window.scrollY || i(document).scrollTop(), t.scrollLeft = 0
        })
    };
    var e = new t;
    i.fn.theiaStickySidebar = function(t) {
        function o(t, o) {
            return !0 === t.initialized || !(i("body").width() < t.minWidth) && (function(t, o) {
                t.initialized = !0, o.each(function() {
                    var o = {};
                    if (o.sidebar = i(this), o.options = t || {}, o.container = i(o.options.containerSelector), 0 == o.container.length && (o.container = o.sidebar.parent()), o.sidebar.parents().css("-webkit-transform", "none"), o.sidebar.css({
                            position: o.options.defaultPosition,
                            overflow: "visible",
                            "-webkit-box-sizing": "border-box",
                            "-moz-box-sizing": "border-box",
                            "box-sizing": "border-box"
                        }), o.stickySidebar = o.sidebar.find(".theiaStickySidebar"), 0 == o.stickySidebar.length) {
                        var a = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                        o.sidebar.find("script").filter(function(i, t) {
                            return 0 === t.type.length || t.type.match(a)
                        }).remove(), o.stickySidebar = i("<div>").addClass("n-sticky").addClass("theiaStickySidebar").append(o.sidebar.children()), o.sidebar.append(o.stickySidebar)
                    }
                    o.marginBottom = parseInt(o.sidebar.css("margin-bottom")), o.paddingTop = parseInt(o.sidebar.css("padding-top")), o.paddingBottom = parseInt(o.sidebar.css("padding-bottom"));
                    var d = o.stickySidebar.offset().top,
                        s = o.stickySidebar.outerHeight();

                    function r() {
                        o.fixedScrollTop = 0, o.sidebar.css({
                            "min-height": "1px"
                        }), o.stickySidebar.css({
                            position: "static",
                            width: "",
                            transform: "none"
                        })
                    }

                    function c(t) {
                        var e = t.height();
                        return t.children().each(function() {
                            e = Math.max(e, i(this).height())
                        }), e
                    }
                    o.stickySidebar.css("padding-top", 1), o.stickySidebar.css("padding-bottom", 1), d -= o.stickySidebar.offset().top, s = o.stickySidebar.outerHeight() - s - d, 0 == d ? (o.stickySidebar.css("padding-top", 0), o.stickySidebarPaddingTop = 0) : o.stickySidebarPaddingTop = 1, 0 == s ? (o.stickySidebar.css("padding-bottom", 0), o.stickySidebarPaddingBottom = 0) : o.stickySidebarPaddingBottom = 1, o.stickySidebarVisible = o.stickySidebar.is(":visible"), o.windowHeight = i(window).height(), o.windowWidth = window.innerWidth, o.cachedOffsetTop = o.sidebar.offset().top, o.cachedOuterHeight = o.stickySidebar.outerHeight(), o.cachedContainerHeight = c(o.container), setInterval(function() {
                        window.nectarState && window.nectarState.materialOffCanvasOpen || (o.cachedOffsetTop = o.sidebar.offset().top, o.cachedOuterHeight = o.stickySidebar.outerHeight(), o.cachedContainerHeight = c(o.container))
                    }, 1e3), o.prevPosition = "", o.previousScrollTop = null, o.fixedScrollTop = 0, r(), o.onScroll = function(i) {
                        if (e.scrollTop < i.cachedOffsetTop - i.windowHeight - 200 || e.scrollTop > i.cachedContainerHeight + i.cachedOffsetTop + i.paddingTop + i.options.additionalMarginTop || window.nectarState && window.nectarState.materialOffCanvasOpen || !i.stickySidebarVisible) return i.stickySidebar[0].style.opacity = "0", void(i.stickySidebar[0].style.pointerEvents = "none");
                        if (i.stickySidebar[0].style.opacity = "1", i.stickySidebar[0].style.pointerEvents = "all", i.options.disableOnResponsiveLayouts && i.windowWidth < 1e3) r();
                        else {
                            var o = e.scrollTop,
                                a = "static";
                            if (o >= i.cachedOffsetTop + (i.paddingTop - i.options.additionalMarginTop)) {
                                var d, s = i.cachedOuterHeight,
                                    c = i.paddingTop + t.additionalMarginTop,
                                    p = i.paddingBottom + i.marginBottom + t.additionalMarginBottom,
                                    l = i.cachedContainerHeight,
                                    b = i.cachedOffsetTop,
                                    h = i.cachedOffsetTop + l,
                                    f = 0 + t.additionalMarginTop;
                                if (l > s + t.additionalMarginTop) {
                                    var g = s + c + p < i.windowHeight;
                                    d = g ? f + s : i.windowHeight - i.marginBottom - i.paddingBottom - t.additionalMarginBottom;
                                    var u = b - o + i.paddingTop,
                                        S = h - o - i.paddingBottom - i.marginBottom,
                                        y = i.stickySidebar.offset().top - o,
                                        m = i.previousScrollTop - o;
                                    "fixed" == i.stickySidebar.css("position") && "modern" == i.options.sidebarBehavior && (y += m), "stick-to-top" == i.options.sidebarBehavior && (y = t.additionalMarginTop), "stick-to-bottom" == i.options.sidebarBehavior && (y = d - s), y = m > 0 ? Math.min(y, f) : Math.max(y, d - s), y = Math.max(y, u), y = Math.min(y, S - s);
                                    var w = l == s;
                                    a = (w || y != f) && (w || y != d - s) ? o + y - i.cachedOffsetTop - i.paddingTop <= t.additionalMarginTop ? "static" : "absolute" : "fixed"
                                }
                            }
                            if ("fixed" == a && "fixed" != i.prevPosition) {
                                i.stickySidebar.css({
                                    position: "fixed",
                                    width: n(i.sidebar) + "px",
                                    transform: "translateY(" + y + "px)",
                                    left: i.sidebar.offset().left + parseInt(i.sidebar.css("padding-left")) - 0 + "px",
                                    top: "0px"
                                })
                            } else if ("absolute" == a && "absolute" != i.prevPosition) {
                                var k = {};
                                "absolute" != i.stickySidebar.css("position") && (k.position = "absolute", k.transform = "translateY(" + (o + y - i.sidebar.offset().top - i.stickySidebarPaddingTop - i.stickySidebarPaddingBottom) + "px)", k.top = "0px"), k.width = n(i.sidebar) + "px", k.left = "", i.stickySidebar.css(k)
                            } else "static" == a && "static" != i.prevPosition && r();
                            i.prevPosition = a, i.previousScrollTop = o
                        }
                    }, o.onScroll(o), i(document).on("scroll." + o.options.namespace, function(i) {
                        return function() {
                            i.onScroll(i)
                        }
                    }(o)), i(window).on("load." + o.options.namespace, function(t) {
                        t.stickySidebarVisible = t.stickySidebar.is(":visible"), t.windowHeight = i(window).height(), t.windowWidth = window.innerWidth, t.cachedOffsetTop = t.sidebar.offset().top, t.cachedOuterHeight = t.stickySidebar.outerHeight(), t.cachedContainerHeight = c(t.container)
                    }(o)), i(window).on("nectar-tab-changed", function() {
                        o.cachedOffsetTop = o.sidebar.offset().top, o.cachedOuterHeight = o.stickySidebar.outerHeight(), o.cachedContainerHeight = c(o.container), o.onScroll(o)
                    }), i(window).on("resize." + o.options.namespace, function(t) {
                        return function() {
                            t.stickySidebarVisible = t.stickySidebar.is(":visible"), t.paddingTop = parseInt(t.sidebar.css("padding-top")), t.paddingBottom = parseInt(t.sidebar.css("padding-bottom")), t.windowHeight = i(window).height(), t.windowWidth = window.innerWidth, t.cachedOffsetTop = t.sidebar.offset().top, t.cachedOuterHeight = t.stickySidebar.outerHeight(), t.cachedContainerHeight = c(t.container), t.prevPosition = "", t.stickySidebar.css({
                                position: "static"
                            }), t.onScroll(t)
                        }
                    }(o)), "undefined" != typeof ResizeSensor && new ResizeSensor(o.stickySidebar[0], function(i) {
                        return function() {
                            i.onScroll(i)
                        }
                    }(o))
                })
            }(t, o), !0)
        }

        function n(i) {
            return i.width()
        }
        return (t = i.extend({
                containerSelector: "",
                additionalMarginTop: 0,
                additionalMarginBottom: 0,
                updateSidebarHeight: !0,
                minWidth: 0,
                disableOnResponsiveLayouts: !0,
                sidebarBehavior: "modern",
                defaultPosition: "relative",
                namespace: "TSS"
            }, t)).additionalMarginTop = parseInt(t.additionalMarginTop) || 0, t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0,
            function(t, e) {
                o(t, e) || (console.log("TSS: Body width smaller than options.minWidth. Init is delayed."), i(document).on("scroll." + t.namespace, function(t, e) {
                    return function(n) {
                        var a = o(t, e);
                        a && i(this).unbind(n)
                    }
                }(t, e)), i(window).on("resize." + t.namespace, function(t, e) {
                    return function(n) {
                        var a = o(t, e);
                        a && i(this).unbind(n)
                    }
                }(t, e)))
            }(t, this), this
    }
}(jQuery);