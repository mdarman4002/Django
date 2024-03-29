; /*FB_PKG_DELIM*/

__d("XLynxAsyncCallbackControllerRouteBuilder", ["jsRouteBuilder"], (function(a, b, c, d, e, f, g) {
    a = c("jsRouteBuilder")("/si/linkclick/ajax_callback/", Object.freeze({}), void 0);
    b = a;
    g["default"] = b
}), 98);
__d("FBLynxLogging", ["AsyncRequest", "ODS", "XLynxAsyncCallbackControllerRouteBuilder"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h;

    function a(a) {
        var b = c("XLynxAsyncCallbackControllerRouteBuilder").buildURL({});
        new(c("AsyncRequest"))(b).setData({
            lynx_uri: a
        }).setErrorHandler(function(a) {
            a = a.getError();
            (h || (h = d("ODS"))).bumpEntityKey(3861, "linkshim", "click_log.post.fail." + a)
        }).setTransportErrorHandler(function(a) {
            a = a.getError();
            (h || (h = d("ODS"))).bumpEntityKey(3861, "linkshim", "click_log.post.transport_fail." + a)
        }).send()
    }
    g.log = a
}), 98);
__d("FBLynxBase", ["$", "FBLynxLogging", "LinkshimHandlerConfig", "URI", "isLinkshimURI"], (function(a, b, c, d, e, f) {
    "use strict";
    var g;

    function h(a) {
        if (!b("isLinkshimURI")(a)) return null;
        a = a.getQueryData().u;
        return !a ? null : a
    }
    var i = {
        logAsyncClick: function(a) {
            i.swapLinkWithUnshimmedLink(a);
            a = a.getAttribute("data-lynx-uri");
            if (!a) return;
            b("FBLynxLogging").log(a)
        },
        originReferrerPolicyClick: function(a) {
            var c = b("$")("meta_referrer");
            c.content = b("LinkshimHandlerConfig").switched_meta_referrer_policy;
            i.logAsyncClick(a);
            setTimeout(function() {
                c.content = b("LinkshimHandlerConfig").default_meta_referrer_policy
            }, 100)
        },
        swapLinkWithUnshimmedLink: function(a) {
            var c = a.href,
                d = h(new(g || (g = b("URI")))(c));
            if (!d) return;
            a.setAttribute("data-lynx-uri", c);
            a.href = d
        },
        revertSwapIfLynxURIPresent: function(a) {
            var b = a.getAttribute("data-lynx-uri");
            if (!b) return;
            a.removeAttribute("data-lynx-uri");
            a.href = b
        }
    };
    e.exports = i
}), null);
__d("FBLynx", ["Base64", "Event", "FBLynxBase", "LinkshimHandlerConfig", "Parent", "URI"], (function(a, b, c, d, e, f) {
    "use strict";
    var g, h = (g || (g = b("URI"))).goURIOnWindow,
        i = {
            alreadySetup: !1,
            setupDelegation: function(a) {
                a === void 0 && (a = !1);
                if (!document.documentElement) return;
                if (document.body == null) {
                    if (a) return;
                    window.setTimeout(function() {
                        i.setupDelegation(!0)
                    }, 100);
                    return
                }
                if (i.alreadySetup) return;
                i.alreadySetup = !0;
                var c = function(a) {
                    var c = i.getMaybeLynxLink(a.target);
                    if (!c) return;
                    var d = c[0];
                    c = c[1];
                    var e = c,
                        f = new(g || (g = b("URI")))(c.href),
                        j;
                    if (b("LinkshimHandlerConfig").ghl_param_link_shim && d !== "hover" && (c.dataset && c.dataset.attributes)) {
                        j = b("Base64").decodeObject(c.dataset.attributes);
                        if (j && j.open_link) {
                            var k;
                            for (k in j) k !== "open_link" && f.addQueryData(k, j[k]);
                            k = c.cloneNode(!0);
                            k.href = f.toString();
                            e = k
                        }
                    }
                    switch (d) {
                        case "async":
                        case "asynclazy":
                            b("FBLynxBase").logAsyncClick(e);
                            break;
                        case "origin":
                            b("FBLynxBase").originReferrerPolicyClick(e);
                            break;
                        case "hover":
                            i.hoverClick(e);
                            break
                    }
                    b("LinkshimHandlerConfig").ghl_param_link_shim && d !== "hover" && j && j.open_link && (a.preventDefault(), h(f, window.open("", e.target), !0))
                };
                b("Event").listen(document.body, "click", c);
                b("LinkshimHandlerConfig").middle_click_requires_event && b("Event").listen(document.body, "mouseup", function(a) {
                    a.button == 1 && c(a)
                });
                b("Event").listen(document.body, "mouseover", function(a) {
                    a = i.getMaybeLynxLink(a.target);
                    if (!a) return;
                    var b = a[0];
                    a = a[1];
                    switch (b) {
                        case "async":
                        case "asynclazy":
                        case "origin":
                        case "hover":
                            i.mouseover(a);
                            break
                    }
                });
                b("Event").listen(document.body, "contextmenu", function(a) {
                    a = i.getMaybeLynxLink(a.target);
                    if (!a) return;
                    var b = a[0];
                    a = a[1];
                    switch (b) {
                        case "async":
                        case "hover":
                        case "origin":
                            i.contextmenu(a);
                            break;
                        case "asynclazy":
                            break
                    }
                })
            },
            getMaybeLynxLink: function(a) {
                a = b("Parent").byAttribute(a, "data-lynx-mode");
                if (a instanceof HTMLAnchorElement) {
                    var c = a.getAttribute("data-lynx-mode");
                    switch (c) {
                        case "async":
                        case "asynclazy":
                        case "hover":
                        case "origin":
                            return [c, a];
                        default:
                            return null
                    }
                }
                return null
            },
            hoverClick: function(a) {
                b("FBLynxBase").revertSwapIfLynxURIPresent(a)
            },
            mouseover: function(a) {
                b("FBLynxBase").swapLinkWithUnshimmedLink(a)
            },
            contextmenu: function(a) {
                b("FBLynxBase").revertSwapIfLynxURIPresent(a)
            }
        };
    e.exports = i
}), null);
__d("FullScreen", ["ArbiterMixin", "BrowserFeatureInstrumentation", "CSS", "Event", "Keys", "UserAgent", "UserAgent_DEPRECATED", "mixin", "throttle"], (function(a, b, c, d, e, f, g) {
    var h = {},
        i = !1;

    function j(a) {
        c("Event").getKeyCode(a) === c("Keys").ESC && a.stopPropagation()
    }

    function k() {
        i || (document.addEventListener("keydown", j, !0), i = !0)
    }

    function l() {
        i && (document.removeEventListener("keydown", j, !0), i = !1)
    }
    a = function(a) {
        babelHelpers.inheritsLoose(b, a);

        function b() {
            var b, c;
            for (var e = arguments.length, f = new Array(e), g = 0; g < e; g++) f[g] = arguments[g];
            return (b = c = a.call.apply(a, [this].concat(f)) || this, c.onChange = function() {
                var a = c.isFullScreen(),
                    b = document.body;
                b && d("CSS").conditionClass(b, "fullScreen", a);
                c.inform("changed");
                a || l()
            }, b) || babelHelpers.assertThisInitialized(c)
        }
        var e = b.prototype;
        e.listenForEvent = function(a) {
            var b = c("throttle")(this.onChange, 0, this);
            h[a.id] || (h[a.id] = !0, c("Event").listen(a, {
                webkitfullscreenchange: b,
                mozfullscreenchange: b,
                MSFullscreenChange: b,
                fullscreenchange: b
            }))
        };
        e.enableFullScreen = function(a) {
            this.listenForEvent(a);
            a = a;
            if (a.webkitRequestFullScreen) d("UserAgent_DEPRECATED").chrome() ? a.webkitRequestFullScreen == null ? void 0 : a.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : a.webkitRequestFullScreen == null ? void 0 : a.webkitRequestFullScreen();
            else if (a.mozRequestFullScreen) a.mozRequestFullScreen();
            else if (a.msRequestFullscreen) k(), a.msRequestFullscreen == null ? void 0 : a.msRequestFullscreen();
            else if (a.requestFullScreen) c("BrowserFeatureInstrumentation")("fullscreen", "FullScreen"), a.requestFullScreen == null ? void 0 : a.requestFullScreen();
            else return !1;
            return !0
        };
        e.disableFullScreen = function() {
            var a = document;
            if (a.webkitCancelFullScreen) a.webkitCancelFullScreen();
            else if (a.mozCancelFullScreen) a.mozCancelFullScreen();
            else if (a.msExitFullscreen) a.msExitFullscreen();
            else if (a.cancelFullScreen) a.cancelFullScreen();
            else if (a.exitFullScreen) a.exitFullScreen();
            else return !1;
            return !0
        };
        e.isFullScreen = function() {
            var a = document;
            return Boolean(a.webkitIsFullScreen || a.fullScreen || a.mozFullScreen || a.msFullscreenElement)
        };
        e.toggleFullScreen = function(a) {
            if (this.isFullScreen()) {
                this.disableFullScreen();
                return !1
            } else return this.enableFullScreen(a)
        };
        e.isSupportedWithKeyboardInput = function() {
            return this.isSupported() && !c("UserAgent").isBrowser("Safari")
        };
        e.isSupported = function() {
            var a = document,
                b = a.webkitFullscreenEnabled || a.mozFullScreenEnabled || a.msFullscreenEnabled || a.fullscreenEnabled;
            return Boolean(b || a.webkitCancelFullScreen || a.mozCancelFullScreen || a.msExitFullscreen || a.cancelFullScreen || a.exitFullScreen)
        };
        return b
    }(c("mixin")(c("ArbiterMixin")));
    b = new a();
    e = c("throttle")(b.onChange, 0, b);
    c("Event").listen(document, {
        webkitfullscreenchange: e,
        mozfullscreenchange: e,
        MSFullscreenChange: e,
        fullscreenchange: e
    });
    f = b;
    g["default"] = f
}), 98);
__d("PageHooks", ["Arbiter", "ErrorUtils", "InitialJSLoader", "PageEvents"], (function(a, b, c, d, e, f) {
    var g;
    f = {
        DOMREADY_HOOK: "domreadyhooks",
        ONLOAD_HOOK: "onloadhooks"
    };

    function h() {
        k(l.DOMREADY_HOOK), window.domready = !0, b("Arbiter").inform("uipage_onload", !0, "state")
    }

    function i() {
        k(l.ONLOAD_HOOK), window.loaded = !0
    }

    function j(a, c) {
        return (g || (g = b("ErrorUtils"))).applyWithGuard(a, null, null, function(a) {
            a.event_type = c, a.category = "runhook"
        }, "PageHooks:" + c)
    }

    function k(a) {
        var b = a == "onbeforeleavehooks" || a == "onbeforeunloadhooks";
        do {
            var c = window[a];
            if (!c) break;
            b || (window[a] = null);
            for (var d = 0; d < c.length; d++) {
                var e = j(c[d], a);
                if (b && e) return e
            }
        } while (!b && window[a])
    }

    function c() {
        window.domready || (window.domready = !0, k("onloadhooks")), window.loaded || (window.loaded = !0, k("onafterloadhooks"))
    }

    function d() {
        var a, c;
        (a = b("Arbiter")).registerCallback(h, [(c = b("PageEvents")).BIGPIPE_DOMREADY, b("InitialJSLoader").INITIAL_JS_READY]);
        a.registerCallback(i, [c.BIGPIPE_DOMREADY, c.BIGPIPE_ONLOAD, b("InitialJSLoader").INITIAL_JS_READY]);
        a.subscribe(c.NATIVE_ONBEFOREUNLOAD, function(a, b) {
            b.warn = k("onbeforeleavehooks") || k("onbeforeunloadhooks"), b.warn || (window.domready = !1, window.loaded = !1)
        }, "new");
        a.subscribe(c.NATIVE_ONUNLOAD, function(a, b) {
            k("onunloadhooks"), k("onafterunloadhooks")
        }, "new")
    }
    var l = babelHelpers["extends"]({
        _domreadyHook: h,
        _onloadHook: i,
        runHook: j,
        runHooks: k,
        keepWindowSetAsLoaded: c
    }, f);
    d();
    a.PageHooks = e.exports = l
}), null);
__d("queryThenMutateDOM", ["ErrorUtils", "Run", "TimeSlice", "emptyFunction", "gkx", "requestAnimationFrame"], (function(a, b, c, d, e, f) {
    var g, h, i, j = [],
        k = {};

    function l(a, c, d) {
        if (!a && !c) return {
            cancel: b("emptyFunction")
        };
        if (d && Object.prototype.hasOwnProperty.call(k, d)) return {
            cancel: b("emptyFunction")
        };
        else d && (k[d] = 1);
        c = b("TimeSlice").guard(c || b("emptyFunction"), "queryThenMutateDOM mutation callback", {
            propagationType: b("TimeSlice").PropagationType.CONTINUATION,
            registerCallStack: !0
        });
        a = b("TimeSlice").guard(a || b("emptyFunction"), "queryThenMutateDOM query callback", {
            propagationType: b("TimeSlice").PropagationType.CONTINUATION,
            registerCallStack: !0
        });
        var e = {
            queryFunction: a,
            mutateFunction: c,
            output: null,
            deleted: !1
        };
        j.push(e);
        n();
        h || (h = !0, b("gkx")("708253") || b("Run").onLeave(function() {
            h = !1, i = !1, k = {}, j.length = 0
        }));
        return {
            cancel: function() {
                e.deleted = !0, d && delete k[d]
            }
        }
    }
    l.prepare = function(a, b, c) {
        return function() {
            for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++) e[f] = arguments[f];
            e.unshift(this);
            var g = Function.prototype.bind.apply(a, e),
                h = b.bind(this);
            l(g, h, c)
        }
    };
    var m = b("TimeSlice").guard(function() {
        while (j.length) {
            k = {};
            var a = [];
            window.document.body.getClientRects();
            while (j.length) {
                var b = j.shift();
                b.deleted || (b.output = o(b.queryFunction), a.push(b))
            }
            while (a.length) {
                b = a.shift();
                b.deleted || o(b.mutateFunction, null, [b.output])
            }
        }
        i = !1
    }, "queryThenMutateDOM runScheduledQueriesAndMutations", {
        propagationType: b("TimeSlice").PropagationType.ORPHAN
    });

    function n() {
        !i && j.length && (i = !0, b("requestAnimationFrame")(m))
    }

    function o(a, c, d, e, f) {
        return (g || (g = b("ErrorUtils"))).applyWithGuard(a, c, d, e, f)
    }
    e.exports = l
}), null);
__d("UITinyViewportAction", ["Arbiter", "ArbiterMixin", "CSS", "Event", "FullScreen", "getDocumentScrollElement", "queryThenMutateDOM", "throttle"], (function(a, b, c, d, e, f) {
    var g = document.documentElement,
        h, i, j, k, l = !1,
        m = !1,
        n = !1,
        o = {
            init: function(a) {
                a = b("throttle")(function() {
                    if (b("FullScreen").isFullScreen()) return;
                    b("queryThenMutateDOM")(function() {
                        k = k || b("getDocumentScrollElement")(), i = g.clientWidth < k.scrollWidth - 1, j = g.clientHeight < 400, h = j || i
                    }, function() {
                        if (h !== l || i !== m || j !== n) {
                            var a;
                            (a = b("CSS")).conditionClass(g, "tinyViewport", h);
                            a.conditionClass(g, "tinyWidth", i);
                            a.conditionClass(g, "tinyHeight", j);
                            a.conditionClass(g, "canHaveFixedElements", !h);
                            o.inform("change", h);
                            b("Arbiter").inform("tinyViewport/change", {
                                tiny: h,
                                tinyWidth: i,
                                tinyHeight: j
                            }, "state");
                            l = h;
                            m = i;
                            n = j
                        }
                    }, "TinyViewport")
                });
                a();
                b("Arbiter").subscribe("quickling/response", a);
                b("Event").listen(window, "resize", a);
                b("FullScreen").subscribe("changed", a)
            },
            isTiny: function() {
                return h
            },
            isTinyWidth: function() {
                return i
            },
            isTinyHeight: function() {
                return j
            }
        };
    Object.assign(o, b("ArbiterMixin"));
    e.exports = o
}), null);
__d("VirtualCursorStatus", ["Event", "UserAgent", "emptyFunction", "setImmediate"], (function(a, b, c, d, e, f) {
    var g = null,
        h = null;

    function i() {
        h || (h = b("Event").listen(window, "blur", function() {
            g = null, j()
        }))
    }

    function j() {
        h && (h.remove(), h = null)
    }

    function a(a) {
        g = a.keyCode, i()
    }

    function c() {
        g = null, j()
    }
    if (typeof window !== "undefined" && window.document && window.document.createElement) {
        d = document.documentElement;
        if (d)
            if (d.addEventListener) d.addEventListener("keydown", a, !0), d.addEventListener("keyup", c, !0);
            else if (d.attachEvent) {
            f = d.attachEvent;
            f("onkeydown", a);
            f("onkeyup", c)
        }
    }
    var k = {
            isKeyDown: function() {
                return !!g
            },
            getKeyDownCode: function() {
                return g
            }
        },
        l = !1,
        m = !1,
        n = null,
        o = !1;

    function p(a) {
        var c = new Set(),
            d = k.isKeyDown(),
            e = a.clientX,
            f = a.clientY,
            g = a.isPrimary,
            h = a.isTrusted,
            i = a.offsetX,
            j = a.offsetY,
            n = a.pointerType,
            o = a.mozInputSource,
            p = a.WEBKIT_FORCE_AT_MOUSE_DOWN,
            q = a.webkitForce;
        a = a.target;
        var r = a.clientWidth;
        a = a.clientHeight;
        e === 0 && f === 0 && i >= 0 && j >= 0 && m && h && o == null && c.add("Chrome");
        l && m && !d && q != null && q < p && i === 0 && j === 0 && o == null && c.add("Safari-edge");
        e === 0 && f === 0 && i < 0 && j < 0 && m && o == null && c.add("Safari-old");
        !l && !m && d && g === !1 && h && n === "" && e === 0 && f === 0 && i === 0 && j === 0 && o == null;
        !l && !m && !d && h && b("UserAgent").isBrowser("IE >= 10") && o == null && (e < 0 && f < 0 ? c.add("IE") : (i < 0 || i > r) && (j < 0 || j > a) && c.add("MSIE"));
        o === 0 && h && c.add("Firefox");
        return c
    }

    function q() {
        l = !0, b("setImmediate")(function() {
            l = !1
        })
    }

    function r() {
        m = !0, b("setImmediate")(function() {
            m = !1
        })
    }

    function s(a, c) {
        n === null && (n = p(a));
        o = n.size > 0;
        a = a.target.getAttribute("data-accessibilityid") === "virtual_cursor_trigger";
        c(o, n, a);
        b("setImmediate")(function() {
            o = !1, n = null
        })
    }
    d = {
        isVirtualCursorTriggered: function() {
            return o
        },
        add: function(a, c) {
            c === void 0 && (c = b("emptyFunction"));
            var d = function(a) {
                return s(a, c)
            };
            a.addEventListener("click", d);
            var e = b("Event").listen(a, "mousedown", q),
                f = b("Event").listen(a, "mouseup", r);
            return {
                remove: function() {
                    a.removeEventListener("click", d), e.remove(), f.remove()
                }
            }
        }
    };
    e.exports = d
}), null);