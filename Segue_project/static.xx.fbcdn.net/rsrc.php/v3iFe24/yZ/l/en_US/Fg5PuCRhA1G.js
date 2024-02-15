; /*FB_PKG_DELIM*/

__d("Newline.react", [], (function(a, b, c, d, e, f) {
    "use strict";
    a = "br";
    f["default"] = a
}), 66);
__d("LiveTimer", ["csx", "cx", "fbt", "CSS", "DOM", "ODS", "Run", "ServerTime", "TimeSlice", "clearTimeout", "gkx", "killswitch", "setTimeout", "setTimeoutAcrossTransitions"], (function(a, b, c, d, e, f, g, h, i) {
    var j, k = 1e3,
        l = 60,
        m = 3600;
    a = 43200;
    var n = 86400,
        o = 60,
        p = 24,
        q = 7,
        r = 365,
        s = 6e4,
        t = function(a) {
            a.text === "" && (a.text = null);
            return a
        },
        u = [],
        v = null,
        w = !0,
        x = {
            restart: function(a) {
                b("ServerTime").update(a * 1e3), this.updateTimeStamps()
            },
            registerLiveTimestamp: function(a) {
                if (!b("killswitch")("GHL_LIVE_TIMER_SERVER_REGISTERED_TIMESTAMP")) {
                    u.length === 0 && (x.delayUpdatingServerRegisteredLiveTimestamps(), x.cleanupServerRegisteredLiveTimestampsOnLeave());
                    var c = "";
                    if (b("gkx")("837029")) {
                        var d = x.render(a.serverTime, a.time, a.size);
                        c = d != null ? String(d.text) : ""
                    }
                    u.push(babelHelpers["extends"]({}, a, {
                        initialText: c
                    }))
                }
            },
            delayUpdatingServerRegisteredLiveTimestamps: function() {
                w = !0, b("setTimeout")(function() {
                    w = !1, x.startLoop(0)
                }, 30 * k)
            },
            cleanupServerRegisteredLiveTimestampsOnLeave: function() {
                v != null && (v = b("Run").onLeave(function() {
                    u.length = 0, v = null
                }))
            },
            getApproximateServerTime: function() {
                return b("ServerTime").get()
            },
            getServerTimeOffset: function() {
                return -1 * b("ServerTime").getSkew()
            },
            updateTimeStamps: function() {
                this.timestamps = b("DOM").scry(document.body, "abbr.livetimestamp"), this.startLoop(s)
            },
            addTimeStamps: function(a) {
                if (!a) return;
                this.timestamps = this.timestamps || [];
                if (b("DOM").isNodeOfType(a, "abbr") && b("CSS").hasClass(a, "livetimestamp")) this.timestamps.push(a);
                else {
                    a = b("DOM").scry(a, "abbr.livetimestamp");
                    for (var c = 0; c < a.length; ++c) this.timestamps.push(a[c])
                }
                this.startLoop(0)
            },
            removeTimestamp: function(a) {
                if (!this.timestamps || !a) return;
                a = this.timestamps.indexOf(a);
                a > -1 && this.timestamps.splice(a, 1)
            },
            startLoop: function(a) {
                this.stop(), this.createTimeout(a)
            },
            createTimeout: function(a) {
                var c = this;
                this.timeout = b("setTimeoutAcrossTransitions")(b("TimeSlice").guard(function() {
                    c.loop()
                }, "LiveTimer.loop", {
                    propagationType: b("TimeSlice").PropagationType.EXECUTION
                }), a)
            },
            stop: function() {
                b("clearTimeout")(this.timeout)
            },
            loop: function(a) {
                var c = this;
                a && this.updateTimeStamps();
                var d = Math.floor(b("ServerTime").get() / k),
                    e = -1;
                this.timestamps && this.timestamps.forEach(function(a) {
                    var f = a.getAttribute("data-utime"),
                        g = a.getAttribute("data-shorten"),
                        h = a.getAttribute("data-minimize");
                    g = c.renderRelativeTime(d, f, g, h);
                    if (g.text) {
                        h = b("DOM").scry(a, ".timestampContent")[0];
                        h == null ? b("DOM").setContent(a, b("DOM").create("span", {
                            "class": "timestampContent"
                        }, g.text)) : h.textContent !== g.text.toString() && (h.textContent = g.text);
                        h = c.renderRelativeTime(d, f, !1, !1, !0);
                        h.text && b("DOM").setAttributes(a, {
                            "aria-label": h.text
                        })
                    }
                    g.next != -1 && (g.next < e || e == -1) && (e = g.next)
                });
                !b("killswitch")("GHL_LIVE_TIMER_SERVER_REGISTERED_TIMESTAMP") && !w && u.forEach(function(a) {
                    var f = c.render(d, a.time, a.size);
                    f.next != -1 && (f.next < e || e == -1) && (e = f.next);
                    if (b("gkx")("837029")) {
                        var g = String(f.text) === a.initialText;
                        (j || (j = b("ODS"))).bumpEntityKey(2966, "feed_ads", "LiveTimer.smart_update_" + String(g));
                        if (g) return
                    }
                    b("DOM").setContent(a.ref, f.text)
                });
                if (e != -1) {
                    a = Math.max(s, e * k);
                    this.createTimeout(a)
                }
            },
            renderRelativeTime: function(a, b, c, d, e) {
                var f = {
                    text: "",
                    next: -1
                };
                if (a - b > n && !e) return f;
                e = a - b;
                a = Math.floor(e / l);
                b = Math.floor(a / o);
                var g = Math.floor(b / p),
                    h = Math.floor(g / q),
                    j = Math.floor(g / r);
                if (a < 1) {
                    d ? (f.text = i._("1m"), f.next = 20 - e % 20) : c ? (f.text = i._("Just now"), f.next = 20 - e % 20) : (f.text = i._("a few seconds ago"), f.next = l - e % l);
                    return f
                }
                if (b < 1) {
                    d ? f.text = i._({
                        "*": "{number}m"
                    }, [i._param("number", a, [0])]) : c && a == 1 ? f.text = i._("1 min") : c ? f.text = i._({
                        "*": "{number} mins"
                    }, [i._param("number", a, [0])]) : f.text = i._({
                        "*": "{number} minutes ago",
                        "_1": "about a minute ago"
                    }, [i._plural(a, "number")]);
                    f.next = l - e % l;
                    return f
                }
                b < 11 && (f.next = m - e % m);
                if (b < 24) {
                    d ? f.text = i._({
                        "*": "{number}h"
                    }, [i._param("number", b, [0])]) : c && b == 1 ? f.text = i._("1 hr") : c ? f.text = i._({
                        "*": "{number} hrs"
                    }, [i._param("number", b, [0])]) : f.text = i._({
                        "*": "{number} hours ago",
                        "_1": "about an hour ago"
                    }, [i._plural(b, "number")]);
                    return f
                }
                if (g < 7) {
                    d ? f.text = i._({
                        "*": "{number}d"
                    }, [i._param("number", g, [0])]) : f.text = g === 1 ? i._("a day ago") : i._({
                        "*": "{number} days ago"
                    }, [i._param("number", g, [0])]);
                    return f
                }
                if (g >= 7 && g < 365) {
                    d ? f.text = i._({
                        "*": "{number}w"
                    }, [i._param("number", h, [0])]) : f.text = h === 1 ? i._("a week ago") : i._({
                        "*": "{number} weeks ago"
                    }, [i._param("number", h, [0])]);
                    return f
                }
                d ? f.text = i._({
                    "*": "{number}y"
                }, [i._param("number", j, [0])]) : f.text = j === 1 ? i._("a year ago") : i._({
                    "*": "{number} years ago"
                }, [i._param("number", j, [0])]);
                return f
            },
            renderRelativeTimeToServer: function(a, c, d, e) {
                return this.renderRelativeTime(Math.floor(b("ServerTime").get() / k), a, c, d, e)
            },
            render: function(a, b, c, d) {
                d === void 0 && (d = !1);
                return t(x.renderRelativeTime(a, b, c === "short", c === "minimal", d))
            },
            renderNow: function(a, b, c) {
                c === void 0 && (c = !1);
                return t(x.renderRelativeTimeToServer(a, b === "short", b === "minimal", c))
            },
            CONSTS: {
                MS_IN_SEC: k,
                SEC_IN_MIN: l,
                SEC_IN_HOUR: m,
                SEC_IN_12_HOUR: a,
                SEC_IN_24_HOUR: n,
                MIN_IN_HOUR: o,
                HEARTBEAT: s
            }
        };
    e.exports = x
}), null);