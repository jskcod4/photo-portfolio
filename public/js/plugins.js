/*
	01. WAYPOINTS
	02. NICESCROLL
	03. ISOTOPE
	04. MAGNIFIC POPUP
	05. STICKY SIDEBAR
	06. RESIZESENSOR
	07. JARALLAX
	08. JARALLAX VIDEO
	09. COLLAGEPLUS
	
		09.1 Remove White Space
	
	10. ACCORDION (COPYRIGHT)
	11. EASYTABS
	12. asPieProgress (CIRCLE PROGRESS BAR)
	13. TWENTYTWENTY
	14. EVENT MOVE
	15. CAROUSEL
	16. FLEXSLIDER

*/
// 01. WAYPOINTS

/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!(function () {
  "use strict";
  function t(o) {
    if (!o) throw new Error("No options passed to Waypoint constructor");
    if (!o.element)
      throw new Error("No element option passed to Waypoint constructor");
    if (!o.handler)
      throw new Error("No handler option passed to Waypoint constructor");
    (this.key = "waypoint-" + e),
      (this.options = t.Adapter.extend({}, t.defaults, o)),
      (this.element = this.options.element),
      (this.adapter = new t.Adapter(this.element)),
      (this.callback = o.handler),
      (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
      (this.enabled = this.options.enabled),
      (this.triggerPoint = null),
      (this.group = t.Group.findOrCreate({
        name: this.options.group,
        axis: this.axis,
      })),
      (this.context = t.Context.findOrCreateByElement(this.options.context)),
      t.offsetAliases[this.options.offset] &&
        (this.options.offset = t.offsetAliases[this.options.offset]),
      this.group.add(this),
      this.context.add(this),
      (i[this.key] = this),
      (e += 1);
  }
  var e = 0,
    i = {};
  (t.prototype.queueTrigger = function (t) {
    this.group.queueTrigger(this, t);
  }),
    (t.prototype.trigger = function (t) {
      this.enabled && this.callback && this.callback.apply(this, t);
    }),
    (t.prototype.destroy = function () {
      this.context.remove(this), this.group.remove(this), delete i[this.key];
    }),
    (t.prototype.disable = function () {
      return (this.enabled = !1), this;
    }),
    (t.prototype.enable = function () {
      return this.context.refresh(), (this.enabled = !0), this;
    }),
    (t.prototype.next = function () {
      return this.group.next(this);
    }),
    (t.prototype.previous = function () {
      return this.group.previous(this);
    }),
    (t.invokeAll = function (t) {
      var e = [];
      for (var o in i) e.push(i[o]);
      for (var n = 0, r = e.length; r > n; n++) e[n][t]();
    }),
    (t.destroyAll = function () {
      t.invokeAll("destroy");
    }),
    (t.disableAll = function () {
      t.invokeAll("disable");
    }),
    (t.enableAll = function () {
      t.Context.refreshAll();
      for (var e in i) i[e].enabled = !0;
      return this;
    }),
    (t.refreshAll = function () {
      t.Context.refreshAll();
    }),
    (t.viewportHeight = function () {
      return window.innerHeight || document.documentElement.clientHeight;
    }),
    (t.viewportWidth = function () {
      return document.documentElement.clientWidth;
    }),
    (t.adapters = []),
    (t.defaults = {
      context: window,
      continuous: !0,
      enabled: !0,
      group: "default",
      horizontal: !1,
      offset: 0,
    }),
    (t.offsetAliases = {
      "bottom-in-view": function () {
        return this.context.innerHeight() - this.adapter.outerHeight();
      },
      "right-in-view": function () {
        return this.context.innerWidth() - this.adapter.outerWidth();
      },
    }),
    (window.Waypoint = t);
})(),
  (function () {
    "use strict";
    function t(t) {
      window.setTimeout(t, 1e3 / 60);
    }
    function e(t) {
      (this.element = t),
        (this.Adapter = n.Adapter),
        (this.adapter = new this.Adapter(t)),
        (this.key = "waypoint-context-" + i),
        (this.didScroll = !1),
        (this.didResize = !1),
        (this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop(),
        }),
        (this.waypoints = { vertical: {}, horizontal: {} }),
        (t.waypointContextKey = this.key),
        (o[t.waypointContextKey] = this),
        (i += 1),
        n.windowContext ||
          ((n.windowContext = !0), (n.windowContext = new e(window))),
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler();
    }
    var i = 0,
      o = {},
      n = window.Waypoint,
      r = window.onload;
    (e.prototype.add = function (t) {
      var e = t.options.horizontal ? "horizontal" : "vertical";
      (this.waypoints[e][t.key] = t), this.refresh();
    }),
      (e.prototype.checkEmpty = function () {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          e = this.Adapter.isEmptyObject(this.waypoints.vertical),
          i = this.element == this.element.window;
        t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key]);
      }),
      (e.prototype.createThrottledResizeHandler = function () {
        function t() {
          e.handleResize(), (e.didResize = !1);
        }
        var e = this;
        this.adapter.on("resize.waypoints", function () {
          e.didResize || ((e.didResize = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.createThrottledScrollHandler = function () {
        function t() {
          e.handleScroll(), (e.didScroll = !1);
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function () {
          (!e.didScroll || n.isTouch) &&
            ((e.didScroll = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.handleResize = function () {
        n.Context.refreshAll();
      }),
      (e.prototype.handleScroll = function () {
        var t = {},
          e = {
            horizontal: {
              newScroll: this.adapter.scrollLeft(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
            },
            vertical: {
              newScroll: this.adapter.scrollTop(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
            },
          };
        for (var i in e) {
          var o = e[i],
            n = o.newScroll > o.oldScroll,
            r = n ? o.forward : o.backward;
          for (var s in this.waypoints[i]) {
            var a = this.waypoints[i][s];
            if (null !== a.triggerPoint) {
              var l = o.oldScroll < a.triggerPoint,
                h = o.newScroll >= a.triggerPoint,
                p = l && h,
                u = !l && !h;
              (p || u) && (a.queueTrigger(r), (t[a.group.id] = a.group));
            }
          }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll };
      }),
      (e.prototype.innerHeight = function () {
        return this.element == this.element.window
          ? n.viewportHeight()
          : this.adapter.innerHeight();
      }),
      (e.prototype.remove = function (t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty();
      }),
      (e.prototype.innerWidth = function () {
        return this.element == this.element.window
          ? n.viewportWidth()
          : this.adapter.innerWidth();
      }),
      (e.prototype.destroy = function () {
        var t = [];
        for (var e in this.waypoints)
          for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy();
      }),
      (e.prototype.refresh = function () {
        var t,
          e = this.element == this.element.window,
          i = e ? void 0 : this.adapter.offset(),
          o = {};
        this.handleScroll(),
          (t = {
            horizontal: {
              contextOffset: e ? 0 : i.left,
              contextScroll: e ? 0 : this.oldScroll.x,
              contextDimension: this.innerWidth(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
              offsetProp: "left",
            },
            vertical: {
              contextOffset: e ? 0 : i.top,
              contextScroll: e ? 0 : this.oldScroll.y,
              contextDimension: this.innerHeight(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
              offsetProp: "top",
            },
          });
        for (var r in t) {
          var s = t[r];
          for (var a in this.waypoints[r]) {
            var l,
              h,
              p,
              u,
              c,
              d = this.waypoints[r][a],
              f = d.options.offset,
              w = d.triggerPoint,
              y = 0,
              g = null == w;
            d.element !== d.element.window &&
              (y = d.adapter.offset()[s.offsetProp]),
              "function" == typeof f
                ? (f = f.apply(d))
                : "string" == typeof f &&
                  ((f = parseFloat(f)),
                  d.options.offset.indexOf("%") > -1 &&
                    (f = Math.ceil((s.contextDimension * f) / 100))),
              (l = s.contextScroll - s.contextOffset),
              (d.triggerPoint = Math.floor(y + l - f)),
              (h = w < s.oldScroll),
              (p = d.triggerPoint >= s.oldScroll),
              (u = h && p),
              (c = !h && !p),
              !g && u
                ? (d.queueTrigger(s.backward), (o[d.group.id] = d.group))
                : !g && c
                ? (d.queueTrigger(s.forward), (o[d.group.id] = d.group))
                : g &&
                  s.oldScroll >= d.triggerPoint &&
                  (d.queueTrigger(s.forward), (o[d.group.id] = d.group));
          }
        }
        return (
          n.requestAnimationFrame(function () {
            for (var t in o) o[t].flushTriggers();
          }),
          this
        );
      }),
      (e.findOrCreateByElement = function (t) {
        return e.findByElement(t) || new e(t);
      }),
      (e.refreshAll = function () {
        for (var t in o) o[t].refresh();
      }),
      (e.findByElement = function (t) {
        return o[t.waypointContextKey];
      }),
      (window.onload = function () {
        r && r(), e.refreshAll();
      }),
      (n.requestAnimationFrame = function (e) {
        var i =
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          t;
        i.call(window, e);
      }),
      (n.Context = e);
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      return t.triggerPoint - e.triggerPoint;
    }
    function e(t, e) {
      return e.triggerPoint - t.triggerPoint;
    }
    function i(t) {
      (this.name = t.name),
        (this.axis = t.axis),
        (this.id = this.name + "-" + this.axis),
        (this.waypoints = []),
        this.clearTriggerQueues(),
        (o[this.axis][this.name] = this);
    }
    var o = { vertical: {}, horizontal: {} },
      n = window.Waypoint;
    (i.prototype.add = function (t) {
      this.waypoints.push(t);
    }),
      (i.prototype.clearTriggerQueues = function () {
        this.triggerQueues = { up: [], down: [], left: [], right: [] };
      }),
      (i.prototype.flushTriggers = function () {
        for (var i in this.triggerQueues) {
          var o = this.triggerQueues[i],
            n = "up" === i || "left" === i;
          o.sort(n ? e : t);
          for (var r = 0, s = o.length; s > r; r += 1) {
            var a = o[r];
            (a.options.continuous || r === o.length - 1) && a.trigger([i]);
          }
        }
        this.clearTriggerQueues();
      }),
      (i.prototype.next = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
          o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1];
      }),
      (i.prototype.previous = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null;
      }),
      (i.prototype.queueTrigger = function (t, e) {
        this.triggerQueues[e].push(t);
      }),
      (i.prototype.remove = function (t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1);
      }),
      (i.prototype.first = function () {
        return this.waypoints[0];
      }),
      (i.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1];
      }),
      (i.findOrCreate = function (t) {
        return o[t.axis][t.name] || new i(t);
      }),
      (n.Group = i);
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.$element = e(t);
    }
    var e = window.jQuery,
      i = window.Waypoint;
    e.each(
      [
        "innerHeight",
        "innerWidth",
        "off",
        "offset",
        "on",
        "outerHeight",
        "outerWidth",
        "scrollLeft",
        "scrollTop",
      ],
      function (e, i) {
        t.prototype[i] = function () {
          var t = Array.prototype.slice.call(arguments);
          return this.$element[i].apply(this.$element, t);
        };
      }
    ),
      e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
        t[o] = e[o];
      }),
      i.adapters.push({ name: "jquery", Adapter: t }),
      (i.Adapter = t);
  })(),
  (function () {
    "use strict";
    function t(t) {
      return function () {
        var i = [],
          o = arguments[0];
        return (
          t.isFunction(arguments[0]) &&
            ((o = t.extend({}, arguments[1])), (o.handler = arguments[0])),
          this.each(function () {
            var n = t.extend({}, o, { element: this });
            "string" == typeof n.context &&
              (n.context = t(this).closest(n.context)[0]),
              i.push(new e(n));
          }),
          i
        );
      };
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
      window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
  })();

//	02.	NICESCROLL

/* jquery.nicescroll 3.2.0 InuYaksa*2013 MIT http://areaaperta.com/nicescroll */
(function (e) {
  var y = !1,
    D = !1,
    J = 5e3,
    K = 2e3,
    x = 0,
    L = (function () {
      var e = document.getElementsByTagName("script"),
        e = e[e.length - 1].src.split("?")[0];
      return 0 < e.split("/").length
        ? e.split("/").slice(0, -1).join("/") + "/"
        : "";
    })();
  Array.prototype.forEach ||
    (Array.prototype.forEach = function (e, c) {
      for (var h = 0, l = this.length; h < l; ++h) e.call(c, this[h], h, this);
    });
  var v = window.requestAnimationFrame || !1,
    w = window.cancelAnimationFrame || !1;
  ["ms", "moz", "webkit", "o"].forEach(function (e) {
    v || (v = window[e + "RequestAnimationFrame"]);
    w ||
      (w =
        window[e + "CancelAnimationFrame"] ||
        window[e + "CancelRequestAnimationFrame"]);
  });
  var z = window.MutationObserver || window.WebKitMutationObserver || !1,
    F = {
      zindex: "auto",
      cursoropacitymin: 0,
      cursoropacitymax: 1,
      cursorcolor: "#424242",
      cursorwidth: "5px",
      cursorborder: "1px solid #fff",
      cursorborderradius: "5px",
      scrollspeed: 60,
      mousescrollstep: 24,
      touchbehavior: !1,
      hwacceleration: !0,
      usetransition: !0,
      boxzoom: !1,
      dblclickzoom: !0,
      gesturezoom: !0,
      grabcursorenabled: !0,
      autohidemode: !0,
      background: "",
      iframeautoresize: !0,
      cursorminheight: 32,
      preservenativescrolling: !0,
      railoffset: !1,
      bouncescroll: !0,
      spacebarenabled: !0,
      railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
      disableoutline: !0,
      horizrailenabled: !0,
      railalign: "right",
      railvalign: "bottom",
      enabletranslate3d: !0,
      enablemousewheel: !0,
      enablekeyboard: !0,
      smoothscroll: !0,
      sensitiverail: !0,
      enablemouselockapi: !0,
      cursorfixedheight: !1,
      directionlockdeadzone: 6,
      hidecursordelay: 400,
      nativeparentscrolling: !0,
      enablescrollonselection: !0,
      overflowx: !0,
      overflowy: !0,
      cursordragspeed: 0.3,
      rtlmode: !1,
      cursordragontouch: !1,
    },
    E = !1,
    M = function () {
      if (E) return E;
      var e = document.createElement("DIV"),
        c = {
          haspointerlock:
            "pointerLockElement" in document ||
            "mozPointerLockElement" in document ||
            "webkitPointerLockElement" in document,
        };
      c.isopera = "opera" in window;
      c.isopera12 = c.isopera && "getUserMedia" in navigator;
      c.isie = "all" in document && "attachEvent" in e && !c.isopera;
      c.isieold = c.isie && !("msInterpolationMode" in e.style);
      c.isie7 =
        c.isie &&
        !c.isieold &&
        (!("documentMode" in document) || 7 == document.documentMode);
      c.isie8 =
        c.isie && "documentMode" in document && 8 == document.documentMode;
      c.isie9 = c.isie && "performance" in window && 9 <= document.documentMode;
      c.isie10 =
        c.isie && "performance" in window && 10 <= document.documentMode;
      c.isie9mobile = /iemobile.9/i.test(navigator.userAgent);
      c.isie9mobile && (c.isie9 = !1);
      c.isie7mobile =
        !c.isie9mobile && c.isie7 && /iemobile/i.test(navigator.userAgent);
      c.ismozilla = "MozAppearance" in e.style;
      c.iswebkit = "WebkitAppearance" in e.style;
      c.ischrome = "chrome" in window;
      c.ischrome22 = c.ischrome && c.haspointerlock;
      c.ischrome26 = c.ischrome && "transition" in e.style;
      c.cantouch =
        "ontouchstart" in document.documentElement || "ontouchstart" in window;
      c.hasmstouch = window.navigator.msPointerEnabled || !1;
      c.ismac = /^mac$/i.test(navigator.platform);
      c.isios = c.cantouch && /iphone|ipad|ipod/i.test(navigator.platform);
      c.isios4 = c.isios && !("seal" in Object);
      c.isandroid = /android/i.test(navigator.userAgent);
      c.trstyle = !1;
      c.hastransform = !1;
      c.hastranslate3d = !1;
      c.transitionstyle = !1;
      c.hastransition = !1;
      c.transitionend = !1;
      for (
        var h = [
            "transform",
            "msTransform",
            "webkitTransform",
            "MozTransform",
            "OTransform",
          ],
          l = 0;
        l < h.length;
        l++
      )
        if ("undefined" != typeof e.style[h[l]]) {
          c.trstyle = h[l];
          break;
        }
      c.hastransform = !1 != c.trstyle;
      c.hastransform &&
        ((e.style[c.trstyle] = "translate3d(1px,2px,3px)"),
        (c.hastranslate3d = /translate3d/.test(e.style[c.trstyle])));
      c.transitionstyle = !1;
      c.prefixstyle = "";
      c.transitionend = !1;
      for (
        var h =
            "transition webkitTransition MozTransition OTransition OTransition msTransition KhtmlTransition".split(
              " "
            ),
          n = " -webkit- -moz- -o- -o -ms- -khtml-".split(" "),
          t =
            "transitionend webkitTransitionEnd transitionend otransitionend oTransitionEnd msTransitionEnd KhtmlTransitionEnd".split(
              " "
            ),
          l = 0;
        l < h.length;
        l++
      )
        if (h[l] in e.style) {
          c.transitionstyle = h[l];
          c.prefixstyle = n[l];
          c.transitionend = t[l];
          break;
        }
      c.ischrome26 && (c.prefixstyle = n[1]);
      c.hastransition = c.transitionstyle;
      a: {
        h = ["-moz-grab", "-webkit-grab", "grab"];
        if ((c.ischrome && !c.ischrome22) || c.isie) h = [];
        for (l = 0; l < h.length; l++)
          if (((n = h[l]), (e.style.cursor = n), e.style.cursor == n)) {
            h = n;
            break a;
          }
        h =
          "url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize";
      }
      c.cursorgrabvalue = h;
      c.hasmousecapture = "setCapture" in e;
      c.hasMutationObserver = !1 !== z;
      return (E = c);
    },
    N = function (k, c) {
      function h() {
        var d = b.win;
        if ("zIndex" in d) return d.zIndex();
        for (; 0 < d.length && 9 != d[0].nodeType; ) {
          var c = d.css("zIndex");
          if (!isNaN(c) && 0 != c) return parseInt(c);
          d = d.parent();
        }
        return !1;
      }
      function l(d, c, g) {
        c = d.css(c);
        d = parseFloat(c);
        return isNaN(d)
          ? ((d = u[c] || 0),
            (g =
              3 == d
                ? g
                  ? b.win.outerHeight() - b.win.innerHeight()
                  : b.win.outerWidth() - b.win.innerWidth()
                : 1),
            b.isie8 && d && (d += 1),
            g ? d : 0)
          : d;
      }
      function n(d, c, g, e) {
        b._bind(
          d,
          c,
          function (b) {
            b = b ? b : window.event;
            var e = {
              original: b,
              target: b.target || b.srcElement,
              type: "wheel",
              deltaMode: "MozMousePixelScroll" == b.type ? 0 : 1,
              deltaX: 0,
              deltaZ: 0,
              preventDefault: function () {
                b.preventDefault ? b.preventDefault() : (b.returnValue = !1);
                return !1;
              },
              stopImmediatePropagation: function () {
                b.stopImmediatePropagation
                  ? b.stopImmediatePropagation()
                  : (b.cancelBubble = !0);
              },
            };
            "mousewheel" == c
              ? ((e.deltaY = -0.025 * b.wheelDelta),
                b.wheelDeltaX && (e.deltaX = -0.025 * b.wheelDeltaX))
              : (e.deltaY = b.detail);
            return g.call(d, e);
          },
          e
        );
      }
      function t(d, c, g) {
        var e, f;
        0 == d.deltaMode
          ? ((e = -Math.floor(d.deltaX * (b.opt.mousescrollstep / 54))),
            (f = -Math.floor(d.deltaY * (b.opt.mousescrollstep / 54))))
          : 1 == d.deltaMode &&
            ((e = -Math.floor(d.deltaX * b.opt.mousescrollstep)),
            (f = -Math.floor(d.deltaY * b.opt.mousescrollstep)));
        c && 0 == e && f && ((e = f), (f = 0));
        e &&
          (b.scrollmom && b.scrollmom.stop(),
          (b.lastdeltax += e),
          b.debounced(
            "mousewheelx",
            function () {
              var d = b.lastdeltax;
              b.lastdeltax = 0;
              b.rail.drag || b.doScrollLeftBy(d);
            },
            120
          ));
        if (f) {
          if (b.opt.nativeparentscrolling && g && !b.ispage && !b.zoomactive)
            if (0 > f) {
              if (b.getScrollTop() >= b.page.maxh) return !0;
            } else if (0 >= b.getScrollTop()) return !0;
          b.scrollmom && b.scrollmom.stop();
          b.lastdeltay += f;
          b.debounced(
            "mousewheely",
            function () {
              var d = b.lastdeltay;
              b.lastdeltay = 0;
              b.rail.drag || b.doScrollBy(d);
            },
            120
          );
        }
        d.stopImmediatePropagation();
        return d.preventDefault();
      }
      var b = this;
      this.version = "3.4.0";
      this.name = "nicescroll";
      this.me = c;
      this.opt = { doc: e("body"), win: !1 };
      e.extend(this.opt, F);
      this.opt.snapbackspeed = 80;
      if (k)
        for (var q in b.opt) "undefined" != typeof k[q] && (b.opt[q] = k[q]);
      this.iddoc =
        (this.doc = b.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "";
      this.ispage = /BODY|HTML/.test(
        b.opt.win ? b.opt.win[0].nodeName : this.doc[0].nodeName
      );
      this.haswrapper = !1 !== b.opt.win;
      this.win = b.opt.win || (this.ispage ? e(window) : this.doc);
      this.docscroll = this.ispage && !this.haswrapper ? e(window) : this.win;
      this.body = e("body");
      this.iframe = this.isfixed = this.viewport = !1;
      this.isiframe =
        "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName;
      this.istextarea = "TEXTAREA" == this.win[0].nodeName;
      this.forcescreen = !1;
      this.canshowonmouseevent = "scroll" != b.opt.autohidemode;
      this.page =
        this.view =
        this.onzoomout =
        this.onzoomin =
        this.onscrollcancel =
        this.onscrollend =
        this.onscrollstart =
        this.onclick =
        this.ongesturezoom =
        this.onkeypress =
        this.onmousewheel =
        this.onmousemove =
        this.onmouseup =
        this.onmousedown =
          !1;
      this.scroll = { x: 0, y: 0 };
      this.scrollratio = { x: 0, y: 0 };
      this.cursorheight = 20;
      this.scrollvaluemax = 0;
      this.observerremover =
        this.observer =
        this.scrollmom =
        this.scrollrunning =
        this.checkrtlmode =
          !1;
      do this.id = "ascrail" + K++;
      while (document.getElementById(this.id));
      this.hasmousefocus =
        this.hasfocus =
        this.zoomactive =
        this.zoom =
        this.selectiondrag =
        this.cursorfreezed =
        this.cursor =
        this.rail =
          !1;
      this.visibility = !0;
      this.hidden = this.locked = !1;
      this.cursoractive = !0;
      this.overflowx = b.opt.overflowx;
      this.overflowy = b.opt.overflowy;
      this.nativescrollingarea = !1;
      this.checkarea = 0;
      this.events = [];
      this.saved = {};
      this.delaylist = {};
      this.synclist = {};
      this.lastdeltay = this.lastdeltax = 0;
      this.detected = M();
      var f = e.extend({}, this.detected);
      this.ishwscroll =
        (this.canhwscroll = f.hastransform && b.opt.hwacceleration) &&
        b.haswrapper;
      this.istouchcapable = !1;
      f.cantouch &&
        f.ischrome &&
        !f.isios &&
        !f.isandroid &&
        ((this.istouchcapable = !0), (f.cantouch = !1));
      f.cantouch &&
        f.ismozilla &&
        !f.isios &&
        ((this.istouchcapable = !0), (f.cantouch = !1));
      b.opt.enablemouselockapi ||
        ((f.hasmousecapture = !1), (f.haspointerlock = !1));
      this.delayed = function (d, c, g, e) {
        var f = b.delaylist[d],
          h = new Date().getTime();
        if (!e && f && f.tt) return !1;
        f && f.tt && clearTimeout(f.tt);
        if (f && f.last + g > h && !f.tt)
          b.delaylist[d] = {
            last: h + g,
            tt: setTimeout(function () {
              b.delaylist[d].tt = 0;
              c.call();
            }, g),
          };
        else if (!f || !f.tt)
          (b.delaylist[d] = { last: h, tt: 0 }),
            setTimeout(function () {
              c.call();
            }, 0);
      };
      this.debounced = function (d, c, g) {
        var f = b.delaylist[d];
        new Date().getTime();
        b.delaylist[d] = c;
        f ||
          setTimeout(function () {
            var c = b.delaylist[d];
            b.delaylist[d] = !1;
            c.call();
          }, g);
      };
      this.synched = function (d, c) {
        b.synclist[d] = c;
        (function () {
          b.onsync ||
            (v(function () {
              b.onsync = !1;
              for (d in b.synclist) {
                var c = b.synclist[d];
                c && c.call(b);
                b.synclist[d] = !1;
              }
            }),
            (b.onsync = !0));
        })();
        return d;
      };
      this.unsynched = function (d) {
        b.synclist[d] && (b.synclist[d] = !1);
      };
      this.css = function (d, c) {
        for (var g in c) b.saved.css.push([d, g, d.css(g)]), d.css(g, c[g]);
      };
      this.scrollTop = function (d) {
        return "undefined" == typeof d ? b.getScrollTop() : b.setScrollTop(d);
      };
      this.scrollLeft = function (d) {
        return "undefined" == typeof d ? b.getScrollLeft() : b.setScrollLeft(d);
      };
      BezierClass = function (b, c, g, f, e, h, l) {
        this.st = b;
        this.ed = c;
        this.spd = g;
        this.p1 = f || 0;
        this.p2 = e || 1;
        this.p3 = h || 0;
        this.p4 = l || 1;
        this.ts = new Date().getTime();
        this.df = this.ed - this.st;
      };
      BezierClass.prototype = {
        B2: function (b) {
          return 3 * b * b * (1 - b);
        },
        B3: function (b) {
          return 3 * b * (1 - b) * (1 - b);
        },
        B4: function (b) {
          return (1 - b) * (1 - b) * (1 - b);
        },
        getNow: function () {
          var b = 1 - (new Date().getTime() - this.ts) / this.spd,
            c = this.B2(b) + this.B3(b) + this.B4(b);
          return 0 > b ? this.ed : this.st + Math.round(this.df * c);
        },
        update: function (b, c) {
          this.st = this.getNow();
          this.ed = b;
          this.spd = c;
          this.ts = new Date().getTime();
          this.df = this.ed - this.st;
          return this;
        },
      };
      if (this.ishwscroll) {
        this.doc.translate = { x: 0, y: 0, tx: "0px", ty: "0px" };
        f.hastranslate3d &&
          f.isios &&
          this.doc.css("-webkit-backface-visibility", "hidden");
        var r = function () {
          var d = b.doc.css(f.trstyle);
          return d && "matrix" == d.substr(0, 6)
            ? d
                .replace(/^.*\((.*)\)$/g, "$1")
                .replace(/px/g, "")
                .split(/, +/)
            : !1;
        };
        this.getScrollTop = function (d) {
          if (!d) {
            if ((d = r())) return 16 == d.length ? -d[13] : -d[5];
            if (b.timerscroll && b.timerscroll.bz)
              return b.timerscroll.bz.getNow();
          }
          return b.doc.translate.y;
        };
        this.getScrollLeft = function (d) {
          if (!d) {
            if ((d = r())) return 16 == d.length ? -d[12] : -d[4];
            if (b.timerscroll && b.timerscroll.bh)
              return b.timerscroll.bh.getNow();
          }
          return b.doc.translate.x;
        };
        this.notifyScrollEvent = document.createEvent
          ? function (b) {
              var c = document.createEvent("UIEvents");
              c.initUIEvent("scroll", !1, !0, window, 1);
              b.dispatchEvent(c);
            }
          : document.fireEvent
          ? function (b) {
              var c = document.createEventObject();
              b.fireEvent("onscroll");
              c.cancelBubble = !0;
            }
          : function (b, c) {};
        f.hastranslate3d && b.opt.enabletranslate3d
          ? ((this.setScrollTop = function (d, c) {
              b.doc.translate.y = d;
              b.doc.translate.ty = -1 * d + "px";
              b.doc.css(
                f.trstyle,
                "translate3d(" +
                  b.doc.translate.tx +
                  "," +
                  b.doc.translate.ty +
                  ",0px)"
              );
              c || b.notifyScrollEvent(b.win[0]);
            }),
            (this.setScrollLeft = function (d, c) {
              b.doc.translate.x = d;
              b.doc.translate.tx = -1 * d + "px";
              b.doc.css(
                f.trstyle,
                "translate3d(" +
                  b.doc.translate.tx +
                  "," +
                  b.doc.translate.ty +
                  ",0px)"
              );
              c || b.notifyScrollEvent(b.win[0]);
            }))
          : ((this.setScrollTop = function (d, c) {
              b.doc.translate.y = d;
              b.doc.translate.ty = -1 * d + "px";
              b.doc.css(
                f.trstyle,
                "translate(" +
                  b.doc.translate.tx +
                  "," +
                  b.doc.translate.ty +
                  ")"
              );
              c || b.notifyScrollEvent(b.win[0]);
            }),
            (this.setScrollLeft = function (d, c) {
              b.doc.translate.x = d;
              b.doc.translate.tx = -1 * d + "px";
              b.doc.css(
                f.trstyle,
                "translate(" +
                  b.doc.translate.tx +
                  "," +
                  b.doc.translate.ty +
                  ")"
              );
              c || b.notifyScrollEvent(b.win[0]);
            }));
      } else
        (this.getScrollTop = function () {
          return b.docscroll.scrollTop();
        }),
          (this.setScrollTop = function (d) {
            return b.docscroll.scrollTop(d);
          }),
          (this.getScrollLeft = function () {
            return b.docscroll.scrollLeft();
          }),
          (this.setScrollLeft = function (d) {
            return b.docscroll.scrollLeft(d);
          });
      this.getTarget = function (b) {
        return !b ? !1 : b.target ? b.target : b.srcElement ? b.srcElement : !1;
      };
      this.hasParent = function (b, c) {
        if (!b) return !1;
        for (var g = b.target || b.srcElement || b || !1; g && g.id != c; )
          g = g.parentNode || !1;
        return !1 !== g;
      };
      var u = { thin: 1, medium: 3, thick: 5 };
      this.getOffset = function () {
        if (b.isfixed)
          return {
            top: parseFloat(b.win.css("top")),
            left: parseFloat(b.win.css("left")),
          };
        if (!b.viewport) return b.win.offset();
        var d = b.win.offset(),
          c = b.viewport.offset();
        return {
          top: d.top - c.top + b.viewport.scrollTop(),
          left: d.left - c.left + b.viewport.scrollLeft(),
        };
      };
      this.updateScrollBar = function (d) {
        if (b.ishwscroll)
          b.rail.css({ height: b.win.innerHeight() }),
            b.railh && b.railh.css({ width: b.win.innerWidth() });
        else {
          var c = b.getOffset(),
            g = c.top,
            f = c.left,
            g = g + l(b.win, "border-top-width", !0);
          b.win.outerWidth();
          b.win.innerWidth();
          var f =
              f +
              (b.rail.align
                ? b.win.outerWidth() -
                  l(b.win, "border-right-width") -
                  b.rail.width
                : l(b.win, "border-left-width")),
            e = b.opt.railoffset;
          e && (e.top && (g += e.top), b.rail.align && e.left && (f += e.left));
          b.locked ||
            b.rail.css({
              top: g,
              left: f,
              height: d ? d.h : b.win.innerHeight(),
            });
          b.zoom &&
            b.zoom.css({
              top: g + 1,
              left: 1 == b.rail.align ? f - 20 : f + b.rail.width + 4,
            });
          b.railh &&
            !b.locked &&
            ((g = c.top),
            (f = c.left),
            (d = b.railh.align
              ? g +
                l(b.win, "border-top-width", !0) +
                b.win.innerHeight() -
                b.railh.height
              : g + l(b.win, "border-top-width", !0)),
            (f += l(b.win, "border-left-width")),
            b.railh.css({ top: d, left: f, width: b.railh.width }));
        }
      };
      this.doRailClick = function (d, c, g) {
        var f;
        b.locked ||
          (b.cancelEvent(d),
          c
            ? ((c = g ? b.doScrollLeft : b.doScrollTop),
              (f = g
                ? (d.pageX - b.railh.offset().left - b.cursorwidth / 2) *
                  b.scrollratio.x
                : (d.pageY - b.rail.offset().top - b.cursorheight / 2) *
                  b.scrollratio.y),
              c(f))
            : ((c = g ? b.doScrollLeftBy : b.doScrollBy),
              (f = g ? b.scroll.x : b.scroll.y),
              (d = g
                ? d.pageX - b.railh.offset().left
                : d.pageY - b.rail.offset().top),
              (g = g ? b.view.w : b.view.h),
              f >= d ? c(g) : c(-g)));
      };
      b.hasanimationframe = v;
      b.hascancelanimationframe = w;
      b.hasanimationframe
        ? b.hascancelanimationframe ||
          (w = function () {
            b.cancelAnimationFrame = !0;
          })
        : ((v = function (b) {
            return setTimeout(b, 15 - (Math.floor(+new Date() / 1e3) % 16));
          }),
          (w = clearInterval));
      this.init = function () {
        b.saved.css = [];
        if (f.isie7mobile) return !0;
        f.hasmstouch &&
          b.css(b.ispage ? e("html") : b.win, { "-ms-touch-action": "none" });
        b.zindex = "auto";
        b.zindex =
          !b.ispage && "auto" == b.opt.zindex ? h() || "auto" : b.opt.zindex;
        !b.ispage && "auto" != b.zindex && b.zindex > x && (x = b.zindex);
        b.isie &&
          0 == b.zindex &&
          "auto" == b.opt.zindex &&
          (b.zindex = "auto");
        if (!b.ispage || (!f.cantouch && !f.isieold && !f.isie9mobile)) {
          var d = b.docscroll;
          b.ispage && (d = b.haswrapper ? b.win : b.doc);
          f.isie9mobile || b.css(d, { "overflow-y": "hidden" });
          b.ispage &&
            f.isie7 &&
            ("BODY" == b.doc[0].nodeName
              ? b.css(e("html"), { "overflow-y": "hidden" })
              : "HTML" == b.doc[0].nodeName &&
                b.css(e("body"), { "overflow-y": "hidden" }));
          f.isios &&
            !b.ispage &&
            !b.haswrapper &&
            b.css(e("body"), { "-webkit-overflow-scrolling": "touch" });
          var c = e(document.createElement("div"));
          c.css({
            position: "relative",
            top: 0,
            float: "right",
            width: b.opt.cursorwidth,
            height: "0px",
            "background-color": b.opt.cursorcolor,
            border: b.opt.cursorborder,
            "background-clip": "padding-box",
            "-webkit-border-radius": b.opt.cursorborderradius,
            "-moz-border-radius": b.opt.cursorborderradius,
            "border-radius": b.opt.cursorborderradius,
          });
          c.hborder = parseFloat(c.outerHeight() - c.innerHeight());
          b.cursor = c;
          var g = e(document.createElement("div"));
          g.attr("id", b.id);
          g.addClass("nicescroll-rails");
          var l,
            k,
            n = ["left", "right"],
            G;
          for (G in n)
            (k = n[G]),
              (l = b.opt.railpadding[k])
                ? g.css("padding-" + k, l + "px")
                : (b.opt.railpadding[k] = 0);
          g.append(c);
          g.width =
            Math.max(parseFloat(b.opt.cursorwidth), c.outerWidth()) +
            b.opt.railpadding.left +
            b.opt.railpadding.right;
          g.css({
            width: g.width + "px",
            zIndex: b.zindex,
            background: b.opt.background,
            cursor: "default",
          });
          g.visibility = !0;
          g.scrollable = !0;
          g.align = "left" == b.opt.railalign ? 0 : 1;
          b.rail = g;
          c = b.rail.drag = !1;
          b.opt.boxzoom &&
            !b.ispage &&
            !f.isieold &&
            ((c = document.createElement("div")),
            b.bind(c, "click", b.doZoom),
            (b.zoom = e(c)),
            b.zoom.css({
              cursor: "pointer",
              "z-index": b.zindex,
              backgroundImage: "url(" + L + "zoomico.png)",
              height: 18,
              width: 18,
              backgroundPosition: "0px 0px",
            }),
            b.opt.dblclickzoom && b.bind(b.win, "dblclick", b.doZoom),
            f.cantouch &&
              b.opt.gesturezoom &&
              ((b.ongesturezoom = function (d) {
                1.5 < d.scale && b.doZoomIn(d);
                0.8 > d.scale && b.doZoomOut(d);
                return b.cancelEvent(d);
              }),
              b.bind(b.win, "gestureend", b.ongesturezoom)));
          b.railh = !1;
          if (b.opt.horizrailenabled) {
            b.css(d, { "overflow-x": "hidden" });
            c = e(document.createElement("div"));
            c.css({
              position: "relative",
              top: 0,
              height: b.opt.cursorwidth,
              width: "0px",
              "background-color": b.opt.cursorcolor,
              border: b.opt.cursorborder,
              "background-clip": "padding-box",
              "-webkit-border-radius": b.opt.cursorborderradius,
              "-moz-border-radius": b.opt.cursorborderradius,
              "border-radius": b.opt.cursorborderradius,
            });
            c.wborder = parseFloat(c.outerWidth() - c.innerWidth());
            b.cursorh = c;
            var m = e(document.createElement("div"));
            m.attr("id", b.id + "-hr");
            m.addClass("nicescroll-rails");
            m.height = Math.max(parseFloat(b.opt.cursorwidth), c.outerHeight());
            m.css({
              height: m.height + "px",
              zIndex: b.zindex,
              background: b.opt.background,
            });
            m.append(c);
            m.visibility = !0;
            m.scrollable = !0;
            m.align = "top" == b.opt.railvalign ? 0 : 1;
            b.railh = m;
            b.railh.drag = !1;
          }
          b.ispage
            ? (g.css({ position: "fixed", top: "0px", height: "100%" }),
              g.align ? g.css({ right: "0px" }) : g.css({ left: "0px" }),
              b.body.append(g),
              b.railh &&
                (m.css({ position: "fixed", left: "0px", width: "100%" }),
                m.align ? m.css({ bottom: "0px" }) : m.css({ top: "0px" }),
                b.body.append(m)))
            : (b.ishwscroll
                ? ("static" == b.win.css("position") &&
                    b.css(b.win, { position: "relative" }),
                  (d = "HTML" == b.win[0].nodeName ? b.body : b.win),
                  b.zoom &&
                    (b.zoom.css({
                      position: "absolute",
                      top: 1,
                      right: 0,
                      "margin-right": g.width + 4,
                    }),
                    d.append(b.zoom)),
                  g.css({ position: "absolute", top: 0 }),
                  g.align ? g.css({ right: 0 }) : g.css({ left: 0 }),
                  d.append(g),
                  m &&
                    (m.css({ position: "absolute", left: 0, bottom: 0 }),
                    m.align ? m.css({ bottom: 0 }) : m.css({ top: 0 }),
                    d.append(m)))
                : ((b.isfixed = "fixed" == b.win.css("position")),
                  (d = b.isfixed ? "fixed" : "absolute"),
                  b.isfixed || (b.viewport = b.getViewport(b.win[0])),
                  b.viewport &&
                    ((b.body = b.viewport),
                    !1 ==
                      /relative|absolute/.test(b.viewport.css("position")) &&
                      b.css(b.viewport, { position: "relative" })),
                  g.css({ position: d }),
                  b.zoom && b.zoom.css({ position: d }),
                  b.updateScrollBar(),
                  b.body.append(g),
                  b.zoom && b.body.append(b.zoom),
                  b.railh && (m.css({ position: d }), b.body.append(m))),
              f.isios &&
                b.css(b.win, {
                  "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                  "-webkit-touch-callout": "none",
                }),
              f.isie && b.opt.disableoutline && b.win.attr("hideFocus", "true"),
              f.iswebkit &&
                b.opt.disableoutline &&
                b.win.css({ outline: "none" }));
          !1 === b.opt.autohidemode
            ? ((b.autohidedom = !1),
              b.rail.css({ opacity: b.opt.cursoropacitymax }),
              b.railh && b.railh.css({ opacity: b.opt.cursoropacitymax }))
            : !0 === b.opt.autohidemode
            ? ((b.autohidedom = e().add(b.rail)),
              f.isie8 && (b.autohidedom = b.autohidedom.add(b.cursor)),
              b.railh && (b.autohidedom = b.autohidedom.add(b.railh)),
              b.railh &&
                f.isie8 &&
                (b.autohidedom = b.autohidedom.add(b.cursorh)))
            : "scroll" == b.opt.autohidemode
            ? ((b.autohidedom = e().add(b.rail)),
              b.railh && (b.autohidedom = b.autohidedom.add(b.railh)))
            : "cursor" == b.opt.autohidemode
            ? ((b.autohidedom = e().add(b.cursor)),
              b.railh && (b.autohidedom = b.autohidedom.add(b.cursorh)))
            : "hidden" == b.opt.autohidemode &&
              ((b.autohidedom = !1), b.hide(), (b.locked = !1));
          if (f.isie9mobile)
            (b.scrollmom = new H(b)),
              (b.onmangotouch = function (d) {
                d = b.getScrollTop();
                var c = b.getScrollLeft();
                if (
                  d == b.scrollmom.lastscrolly &&
                  c == b.scrollmom.lastscrollx
                )
                  return !0;
                var g = d - b.mangotouch.sy,
                  f = c - b.mangotouch.sx;
                if (
                  0 != Math.round(Math.sqrt(Math.pow(f, 2) + Math.pow(g, 2)))
                ) {
                  var p = 0 > g ? -1 : 1,
                    e = 0 > f ? -1 : 1,
                    h = +new Date();
                  b.mangotouch.lazy && clearTimeout(b.mangotouch.lazy);
                  80 < h - b.mangotouch.tm ||
                  b.mangotouch.dry != p ||
                  b.mangotouch.drx != e
                    ? (b.scrollmom.stop(),
                      b.scrollmom.reset(c, d),
                      (b.mangotouch.sy = d),
                      (b.mangotouch.ly = d),
                      (b.mangotouch.sx = c),
                      (b.mangotouch.lx = c),
                      (b.mangotouch.dry = p),
                      (b.mangotouch.drx = e),
                      (b.mangotouch.tm = h))
                    : (b.scrollmom.stop(),
                      b.scrollmom.update(
                        b.mangotouch.sx - f,
                        b.mangotouch.sy - g
                      ),
                      (b.mangotouch.tm = h),
                      (g = Math.max(
                        Math.abs(b.mangotouch.ly - d),
                        Math.abs(b.mangotouch.lx - c)
                      )),
                      (b.mangotouch.ly = d),
                      (b.mangotouch.lx = c),
                      2 < g &&
                        (b.mangotouch.lazy = setTimeout(function () {
                          b.mangotouch.lazy = !1;
                          b.mangotouch.dry = 0;
                          b.mangotouch.drx = 0;
                          b.mangotouch.tm = 0;
                          b.scrollmom.doMomentum(30);
                        }, 100)));
                }
              }),
              (g = b.getScrollTop()),
              (m = b.getScrollLeft()),
              (b.mangotouch = {
                sy: g,
                ly: g,
                dry: 0,
                sx: m,
                lx: m,
                drx: 0,
                lazy: !1,
                tm: 0,
              }),
              b.bind(b.docscroll, "scroll", b.onmangotouch);
          else {
            if (
              f.cantouch ||
              b.istouchcapable ||
              b.opt.touchbehavior ||
              f.hasmstouch
            ) {
              b.scrollmom = new H(b);
              b.ontouchstart = function (d) {
                if (d.pointerType && 2 != d.pointerType) return !1;
                if (!b.locked) {
                  if (f.hasmstouch)
                    for (var c = d.target ? d.target : !1; c; ) {
                      var g = e(c).getNiceScroll();
                      if (0 < g.length && g[0].me == b.me) break;
                      if (0 < g.length) return !1;
                      if ("DIV" == c.nodeName && c.id == b.id) break;
                      c = c.parentNode ? c.parentNode : !1;
                    }
                  b.cancelScroll();
                  if (
                    (c = b.getTarget(d)) &&
                    /INPUT/i.test(c.nodeName) &&
                    /range/i.test(c.type)
                  )
                    return b.stopPropagation(d);
                  !("clientX" in d) &&
                    "changedTouches" in d &&
                    ((d.clientX = d.changedTouches[0].clientX),
                    (d.clientY = d.changedTouches[0].clientY));
                  b.forcescreen &&
                    ((g = d),
                    (d = { original: d.original ? d.original : d }),
                    (d.clientX = g.screenX),
                    (d.clientY = g.screenY));
                  b.rail.drag = {
                    x: d.clientX,
                    y: d.clientY,
                    sx: b.scroll.x,
                    sy: b.scroll.y,
                    st: b.getScrollTop(),
                    sl: b.getScrollLeft(),
                    pt: 2,
                    dl: !1,
                  };
                  if (b.ispage || !b.opt.directionlockdeadzone)
                    b.rail.drag.dl = "f";
                  else {
                    var g = e(window).width(),
                      p = e(window).height(),
                      h = Math.max(
                        document.body.scrollWidth,
                        document.documentElement.scrollWidth
                      ),
                      l = Math.max(
                        document.body.scrollHeight,
                        document.documentElement.scrollHeight
                      ),
                      p = Math.max(0, l - p),
                      g = Math.max(0, h - g);
                    b.rail.drag.ck =
                      !b.rail.scrollable && b.railh.scrollable
                        ? 0 < p
                          ? "v"
                          : !1
                        : b.rail.scrollable && !b.railh.scrollable
                        ? 0 < g
                          ? "h"
                          : !1
                        : !1;
                    b.rail.drag.ck || (b.rail.drag.dl = "f");
                  }
                  b.opt.touchbehavior &&
                    b.isiframe &&
                    f.isie &&
                    ((g = b.win.position()),
                    (b.rail.drag.x += g.left),
                    (b.rail.drag.y += g.top));
                  b.hasmoving = !1;
                  b.lastmouseup = !1;
                  b.scrollmom.reset(d.clientX, d.clientY);
                  if (!f.cantouch && !this.istouchcapable && !f.hasmstouch) {
                    if (!c || !/INPUT|SELECT|TEXTAREA/i.test(c.nodeName))
                      return (
                        !b.ispage && f.hasmousecapture && c.setCapture(),
                        b.cancelEvent(d)
                      );
                    /SUBMIT|CANCEL|BUTTON/i.test(e(c).attr("type")) &&
                      ((pc = { tg: c, click: !1 }), (b.preventclick = pc));
                  }
                }
              };
              b.ontouchend = function (d) {
                if (d.pointerType && 2 != d.pointerType) return !1;
                if (
                  b.rail.drag &&
                  2 == b.rail.drag.pt &&
                  (b.scrollmom.doMomentum(),
                  (b.rail.drag = !1),
                  b.hasmoving &&
                    ((b.hasmoving = !1),
                    (b.lastmouseup = !0),
                    b.hideCursor(),
                    f.hasmousecapture && document.releaseCapture(),
                    !f.cantouch))
                )
                  return b.cancelEvent(d);
              };
              var q = b.opt.touchbehavior && b.isiframe && !f.hasmousecapture;
              b.ontouchmove = function (d, c) {
                if (d.pointerType && 2 != d.pointerType) return !1;
                if (b.rail.drag && 2 == b.rail.drag.pt) {
                  if (f.cantouch && "undefined" == typeof d.original) return !0;
                  b.hasmoving = !0;
                  b.preventclick &&
                    !b.preventclick.click &&
                    ((b.preventclick.click = b.preventclick.tg.onclick || !1),
                    (b.preventclick.tg.onclick = b.onpreventclick));
                  d = e.extend({ original: d }, d);
                  "changedTouches" in d &&
                    ((d.clientX = d.changedTouches[0].clientX),
                    (d.clientY = d.changedTouches[0].clientY));
                  if (b.forcescreen) {
                    var g = d;
                    d = { original: d.original ? d.original : d };
                    d.clientX = g.screenX;
                    d.clientY = g.screenY;
                  }
                  g = ofy = 0;
                  if (q && !c) {
                    var p = b.win.position(),
                      g = -p.left;
                    ofy = -p.top;
                  }
                  var h = d.clientY + ofy,
                    p = h - b.rail.drag.y,
                    l = d.clientX + g,
                    k = l - b.rail.drag.x,
                    s = b.rail.drag.st - p;
                  b.ishwscroll && b.opt.bouncescroll
                    ? 0 > s
                      ? (s = Math.round(s / 2))
                      : s > b.page.maxh &&
                        (s = b.page.maxh + Math.round((s - b.page.maxh) / 2))
                    : (0 > s && (h = s = 0),
                      s > b.page.maxh && ((s = b.page.maxh), (h = 0)));
                  if (b.railh && b.railh.scrollable) {
                    var m = b.rail.drag.sl - k;
                    b.ishwscroll && b.opt.bouncescroll
                      ? 0 > m
                        ? (m = Math.round(m / 2))
                        : m > b.page.maxw &&
                          (m = b.page.maxw + Math.round((m - b.page.maxw) / 2))
                      : (0 > m && (l = m = 0),
                        m > b.page.maxw && ((m = b.page.maxw), (l = 0)));
                  }
                  g = !1;
                  if (b.rail.drag.dl)
                    (g = !0),
                      "v" == b.rail.drag.dl
                        ? (m = b.rail.drag.sl)
                        : "h" == b.rail.drag.dl && (s = b.rail.drag.st);
                  else {
                    var p = Math.abs(p),
                      k = Math.abs(k),
                      n = b.opt.directionlockdeadzone;
                    if ("v" == b.rail.drag.ck) {
                      if (p > n && k <= 0.3 * p) return (b.rail.drag = !1), !0;
                      k > n &&
                        ((b.rail.drag.dl = "f"),
                        e("body").scrollTop(e("body").scrollTop()));
                    } else if ("h" == b.rail.drag.ck) {
                      if (k > n && p <= 0.3 * az) return (b.rail.drag = !1), !0;
                      p > n &&
                        ((b.rail.drag.dl = "f"),
                        e("body").scrollLeft(e("body").scrollLeft()));
                    }
                  }
                  b.synched("touchmove", function () {
                    b.rail.drag &&
                      2 == b.rail.drag.pt &&
                      (b.prepareTransition && b.prepareTransition(0),
                      b.rail.scrollable && b.setScrollTop(s),
                      b.scrollmom.update(l, h),
                      b.railh && b.railh.scrollable
                        ? (b.setScrollLeft(m), b.showCursor(s, m))
                        : b.showCursor(s),
                      f.isie10 && document.selection.clear());
                  });
                  f.ischrome && b.istouchcapable && (g = !1);
                  if (g) return b.cancelEvent(d);
                }
              };
            }
            b.onmousedown = function (d, c) {
              if (!(b.rail.drag && 1 != b.rail.drag.pt)) {
                if (b.locked) return b.cancelEvent(d);
                b.cancelScroll();
                b.rail.drag = {
                  x: d.clientX,
                  y: d.clientY,
                  sx: b.scroll.x,
                  sy: b.scroll.y,
                  pt: 1,
                  hr: !!c,
                };
                var g = b.getTarget(d);
                !b.ispage && f.hasmousecapture && g.setCapture();
                b.isiframe &&
                  !f.hasmousecapture &&
                  ((b.saved.csspointerevents = b.doc.css("pointer-events")),
                  b.css(b.doc, { "pointer-events": "none" }));
                return b.cancelEvent(d);
              }
            };
            b.onmouseup = function (d) {
              if (
                b.rail.drag &&
                (f.hasmousecapture && document.releaseCapture(),
                b.isiframe &&
                  !f.hasmousecapture &&
                  b.doc.css("pointer-events", b.saved.csspointerevents),
                1 == b.rail.drag.pt)
              )
                return (b.rail.drag = !1), b.cancelEvent(d);
            };
            b.onmousemove = function (d) {
              if (b.rail.drag && 1 == b.rail.drag.pt) {
                if (f.ischrome && 0 == d.which) return b.onmouseup(d);
                b.cursorfreezed = !0;
                if (b.rail.drag.hr) {
                  b.scroll.x = b.rail.drag.sx + (d.clientX - b.rail.drag.x);
                  0 > b.scroll.x && (b.scroll.x = 0);
                  var c = b.scrollvaluemaxw;
                  b.scroll.x > c && (b.scroll.x = c);
                } else
                  (b.scroll.y = b.rail.drag.sy + (d.clientY - b.rail.drag.y)),
                    0 > b.scroll.y && (b.scroll.y = 0),
                    (c = b.scrollvaluemax),
                    b.scroll.y > c && (b.scroll.y = c);
                b.synched("mousemove", function () {
                  b.rail.drag &&
                    1 == b.rail.drag.pt &&
                    (b.showCursor(),
                    b.rail.drag.hr
                      ? b.doScrollLeft(
                          Math.round(b.scroll.x * b.scrollratio.x),
                          b.opt.cursordragspeed
                        )
                      : b.doScrollTop(
                          Math.round(b.scroll.y * b.scrollratio.y),
                          b.opt.cursordragspeed
                        ));
                });
                return b.cancelEvent(d);
              }
            };
            if (f.cantouch || b.opt.touchbehavior)
              (b.onpreventclick = function (d) {
                if (b.preventclick)
                  return (
                    (b.preventclick.tg.onclick = b.preventclick.click),
                    (b.preventclick = !1),
                    b.cancelEvent(d)
                  );
              }),
                b.bind(b.win, "mousedown", b.ontouchstart),
                (b.onclick = f.isios
                  ? !1
                  : function (d) {
                      return b.lastmouseup
                        ? ((b.lastmouseup = !1), b.cancelEvent(d))
                        : !0;
                    }),
                b.opt.grabcursorenabled &&
                  f.cursorgrabvalue &&
                  (b.css(b.ispage ? b.doc : b.win, {
                    cursor: f.cursorgrabvalue,
                  }),
                  b.css(b.rail, { cursor: f.cursorgrabvalue }));
            else {
              var r = function (d) {
                if (b.selectiondrag) {
                  if (d) {
                    var c = b.win.outerHeight();
                    d = d.pageY - b.selectiondrag.top;
                    0 < d && d < c && (d = 0);
                    d >= c && (d -= c);
                    b.selectiondrag.df = d;
                  }
                  0 != b.selectiondrag.df &&
                    (b.doScrollBy(2 * -Math.floor(b.selectiondrag.df / 6)),
                    b.debounced(
                      "doselectionscroll",
                      function () {
                        r();
                      },
                      50
                    ));
                }
              };
              b.hasTextSelected =
                "getSelection" in document
                  ? function () {
                      return 0 < document.getSelection().rangeCount;
                    }
                  : "selection" in document
                  ? function () {
                      return "None" != document.selection.type;
                    }
                  : function () {
                      return !1;
                    };
              b.onselectionstart = function (d) {
                b.ispage || (b.selectiondrag = b.win.offset());
              };
              b.onselectionend = function (d) {
                b.selectiondrag = !1;
              };
              b.onselectiondrag = function (d) {
                b.selectiondrag &&
                  b.hasTextSelected() &&
                  b.debounced(
                    "selectionscroll",
                    function () {
                      r(d);
                    },
                    250
                  );
              };
            }
            f.hasmstouch &&
              (b.css(b.rail, { "-ms-touch-action": "none" }),
              b.css(b.cursor, { "-ms-touch-action": "none" }),
              b.bind(b.win, "MSPointerDown", b.ontouchstart),
              b.bind(document, "MSPointerUp", b.ontouchend),
              b.bind(document, "MSPointerMove", b.ontouchmove),
              b.bind(b.cursor, "MSGestureHold", function (b) {
                b.preventDefault();
              }),
              b.bind(b.cursor, "contextmenu", function (b) {
                b.preventDefault();
              }));
            this.istouchcapable &&
              (b.bind(b.win, "touchstart", b.ontouchstart),
              b.bind(document, "touchend", b.ontouchend),
              b.bind(document, "touchcancel", b.ontouchend),
              b.bind(document, "touchmove", b.ontouchmove));
            b.bind(b.cursor, "mousedown", b.onmousedown);
            b.bind(b.cursor, "mouseup", b.onmouseup);
            b.railh &&
              (b.bind(b.cursorh, "mousedown", function (d) {
                b.onmousedown(d, !0);
              }),
              b.bind(b.cursorh, "mouseup", function (d) {
                if (!(b.rail.drag && 2 == b.rail.drag.pt))
                  return (
                    (b.rail.drag = !1),
                    (b.hasmoving = !1),
                    b.hideCursor(),
                    f.hasmousecapture && document.releaseCapture(),
                    b.cancelEvent(d)
                  );
              }));
            if (
              b.opt.cursordragontouch ||
              (!f.cantouch && !b.opt.touchbehavior)
            )
              b.rail.css({ cursor: "default" }),
                b.railh && b.railh.css({ cursor: "default" }),
                b.jqbind(b.rail, "mouseenter", function () {
                  b.canshowonmouseevent && b.showCursor();
                  b.rail.active = !0;
                }),
                b.jqbind(b.rail, "mouseleave", function () {
                  b.rail.active = !1;
                  b.rail.drag || b.hideCursor();
                }),
                b.opt.sensitiverail &&
                  (b.bind(b.rail, "click", function (d) {
                    b.doRailClick(d, !1, !1);
                  }),
                  b.bind(b.rail, "dblclick", function (d) {
                    b.doRailClick(d, !0, !1);
                  }),
                  b.bind(b.cursor, "click", function (d) {
                    b.cancelEvent(d);
                  }),
                  b.bind(b.cursor, "dblclick", function (d) {
                    b.cancelEvent(d);
                  })),
                b.railh &&
                  (b.jqbind(b.railh, "mouseenter", function () {
                    b.canshowonmouseevent && b.showCursor();
                    b.rail.active = !0;
                  }),
                  b.jqbind(b.railh, "mouseleave", function () {
                    b.rail.active = !1;
                    b.rail.drag || b.hideCursor();
                  }),
                  b.opt.sensitiverail &&
                    (b.bind(b.railh, "click", function (d) {
                      b.doRailClick(d, !1, !0);
                    }),
                    b.bind(b.railh, "dblclick", function (d) {
                      b.doRailClick(d, !0, !0);
                    }),
                    b.bind(b.cursorh, "click", function (d) {
                      b.cancelEvent(d);
                    }),
                    b.bind(b.cursorh, "dblclick", function (d) {
                      b.cancelEvent(d);
                    })));
            !f.cantouch && !b.opt.touchbehavior
              ? (b.bind(
                  f.hasmousecapture ? b.win : document,
                  "mouseup",
                  b.onmouseup
                ),
                b.bind(document, "mousemove", b.onmousemove),
                b.onclick && b.bind(document, "click", b.onclick),
                !b.ispage &&
                  b.opt.enablescrollonselection &&
                  (b.bind(b.win[0], "mousedown", b.onselectionstart),
                  b.bind(document, "mouseup", b.onselectionend),
                  b.bind(b.cursor, "mouseup", b.onselectionend),
                  b.cursorh && b.bind(b.cursorh, "mouseup", b.onselectionend),
                  b.bind(document, "mousemove", b.onselectiondrag)),
                b.zoom &&
                  (b.jqbind(b.zoom, "mouseenter", function () {
                    b.canshowonmouseevent && b.showCursor();
                    b.rail.active = !0;
                  }),
                  b.jqbind(b.zoom, "mouseleave", function () {
                    b.rail.active = !1;
                    b.rail.drag || b.hideCursor();
                  })))
              : (b.bind(
                  f.hasmousecapture ? b.win : document,
                  "mouseup",
                  b.ontouchend
                ),
                b.bind(document, "mousemove", b.ontouchmove),
                b.onclick && b.bind(document, "click", b.onclick),
                b.opt.cursordragontouch &&
                  (b.bind(b.cursor, "mousedown", b.onmousedown),
                  b.bind(b.cursor, "mousemove", b.onmousemove),
                  b.cursorh && b.bind(b.cursorh, "mousedown", b.onmousedown),
                  b.cursorh && b.bind(b.cursorh, "mousemove", b.onmousemove)));
            b.opt.enablemousewheel &&
              (b.isiframe ||
                b.bind(
                  f.isie && b.ispage ? document : b.docscroll,
                  "mousewheel",
                  b.onmousewheel
                ),
              b.bind(b.rail, "mousewheel", b.onmousewheel),
              b.railh && b.bind(b.railh, "mousewheel", b.onmousewheelhr));
            !b.ispage &&
              !f.cantouch &&
              !/HTML|BODY/.test(b.win[0].nodeName) &&
              (b.win.attr("tabindex") || b.win.attr({ tabindex: J++ }),
              b.jqbind(b.win, "focus", function (d) {
                y = b.getTarget(d).id || !0;
                b.hasfocus = !0;
                b.canshowonmouseevent && b.noticeCursor();
              }),
              b.jqbind(b.win, "blur", function (d) {
                y = !1;
                b.hasfocus = !1;
              }),
              b.jqbind(b.win, "mouseenter", function (d) {
                D = b.getTarget(d).id || !0;
                b.hasmousefocus = !0;
                b.canshowonmouseevent && b.noticeCursor();
              }),
              b.jqbind(b.win, "mouseleave", function () {
                D = !1;
                b.hasmousefocus = !1;
              }));
          }
          b.onkeypress = function (d) {
            if (b.locked && 0 == b.page.maxh) return !0;
            d = d ? d : window.e;
            var c = b.getTarget(d);
            if (
              c &&
              /INPUT|TEXTAREA|SELECT|OPTION/.test(c.nodeName) &&
              ((!c.getAttribute("type") && !c.type) ||
                !/submit|button|cancel/i.tp)
            )
              return !0;
            if (
              b.hasfocus ||
              (b.hasmousefocus && !y) ||
              (b.ispage && !y && !D)
            ) {
              c = d.keyCode;
              if (b.locked && 27 != c) return b.cancelEvent(d);
              var g = d.ctrlKey || !1,
                p = d.shiftKey || !1,
                f = !1;
              switch (c) {
                case 38:
                case 63233:
                  b.doScrollBy(72);
                  f = !0;
                  break;
                case 40:
                case 63235:
                  b.doScrollBy(-72);
                  f = !0;
                  break;
                case 37:
                case 63232:
                  b.railh &&
                    (g ? b.doScrollLeft(0) : b.doScrollLeftBy(72), (f = !0));
                  break;
                case 39:
                case 63234:
                  b.railh &&
                    (g ? b.doScrollLeft(b.page.maxw) : b.doScrollLeftBy(-72),
                    (f = !0));
                  break;
                case 33:
                case 63276:
                  b.doScrollBy(b.view.h);
                  f = !0;
                  break;
                case 34:
                case 63277:
                  b.doScrollBy(-b.view.h);
                  f = !0;
                  break;
                case 36:
                case 63273:
                  b.railh && g ? b.doScrollPos(0, 0) : b.doScrollTo(0);
                  f = !0;
                  break;
                case 35:
                case 63275:
                  b.railh && g
                    ? b.doScrollPos(b.page.maxw, b.page.maxh)
                    : b.doScrollTo(b.page.maxh);
                  f = !0;
                  break;
                case 32:
                  b.opt.spacebarenabled &&
                    (p ? b.doScrollBy(b.view.h) : b.doScrollBy(-b.view.h),
                    (f = !0));
                  break;
                case 27:
                  b.zoomactive && (b.doZoom(), (f = !0));
              }
              if (f) return b.cancelEvent(d);
            }
          };
          b.opt.enablekeyboard &&
            b.bind(
              document,
              f.isopera && !f.isopera12 ? "keypress" : "keydown",
              b.onkeypress
            );
          b.bind(window, "resize", b.lazyResize);
          b.bind(window, "orientationchange", b.lazyResize);
          b.bind(window, "load", b.lazyResize);
          if (f.ischrome && !b.ispage && !b.haswrapper) {
            var t = b.win.attr("style"),
              g = parseFloat(b.win.css("width")) + 1;
            b.win.css("width", g);
            b.synched("chromefix", function () {
              b.win.attr("style", t);
            });
          }
          b.onAttributeChange = function (d) {
            b.lazyResize(250);
          };
          !b.ispage &&
            !b.haswrapper &&
            (!1 !== z
              ? ((b.observer = new z(function (d) {
                  d.forEach(b.onAttributeChange);
                })),
                b.observer.observe(b.win[0], {
                  childList: !0,
                  characterData: !1,
                  attributes: !0,
                  subtree: !1,
                }),
                (b.observerremover = new z(function (d) {
                  d.forEach(function (d) {
                    if (0 < d.removedNodes.length)
                      for (var c in d.removedNodes)
                        if (d.removedNodes[c] == b.win[0]) return b.remove();
                  });
                })),
                b.observerremover.observe(b.win[0].parentNode, {
                  childList: !0,
                  characterData: !1,
                  attributes: !1,
                  subtree: !1,
                }))
              : (b.bind(
                  b.win,
                  f.isie && !f.isie9 ? "propertychange" : "DOMAttrModified",
                  b.onAttributeChange
                ),
                f.isie9 &&
                  b.win[0].attachEvent("onpropertychange", b.onAttributeChange),
                b.bind(b.win, "DOMNodeRemoved", function (d) {
                  d.target == b.win[0] && b.remove();
                })));
          !b.ispage && b.opt.boxzoom && b.bind(window, "resize", b.resizeZoom);
          b.istextarea && b.bind(b.win, "mouseup", b.lazyResize);
          b.checkrtlmode = !0;
          b.lazyResize(30);
        }
        if ("IFRAME" == this.doc[0].nodeName) {
          var I = function (d) {
            b.iframexd = !1;
            try {
              var c =
                "contentDocument" in this
                  ? this.contentDocument
                  : this.contentWindow.document;
            } catch (g) {
              (b.iframexd = !0), (c = !1);
            }
            if (b.iframexd)
              return (
                "console" in window &&
                  console.log("NiceScroll error: policy restriced iframe"),
                !0
              );
            b.forcescreen = !0;
            b.isiframe &&
              ((b.iframe = {
                doc: e(c),
                html: b.doc.contents().find("html")[0],
                body: b.doc.contents().find("body")[0],
              }),
              (b.getContentSize = function () {
                return {
                  w: Math.max(
                    b.iframe.html.scrollWidth,
                    b.iframe.body.scrollWidth
                  ),
                  h: Math.max(
                    b.iframe.html.scrollHeight,
                    b.iframe.body.scrollHeight
                  ),
                };
              }),
              (b.docscroll = e(b.iframe.body)));
            !f.isios &&
              b.opt.iframeautoresize &&
              !b.isiframe &&
              (b.win.scrollTop(0),
              b.doc.height(""),
              (d = Math.max(
                c.getElementsByTagName("html")[0].scrollHeight,
                c.body.scrollHeight
              )),
              b.doc.height(d));
            b.lazyResize(30);
            f.isie7 && b.css(e(b.iframe.html), { "overflow-y": "hidden" });
            b.css(e(b.iframe.body), { "overflow-y": "hidden" });
            "contentWindow" in this
              ? b.bind(this.contentWindow, "scroll", b.onscroll)
              : b.bind(c, "scroll", b.onscroll);
            b.opt.enablemousewheel && b.bind(c, "mousewheel", b.onmousewheel);
            b.opt.enablekeyboard &&
              b.bind(c, f.isopera ? "keypress" : "keydown", b.onkeypress);
            if (f.cantouch || b.opt.touchbehavior)
              b.bind(c, "mousedown", b.onmousedown),
                b.bind(c, "mousemove", function (d) {
                  b.onmousemove(d, !0);
                }),
                b.opt.grabcursorenabled &&
                  f.cursorgrabvalue &&
                  b.css(e(c.body), { cursor: f.cursorgrabvalue });
            b.bind(c, "mouseup", b.onmouseup);
            b.zoom &&
              (b.opt.dblclickzoom && b.bind(c, "dblclick", b.doZoom),
              b.ongesturezoom && b.bind(c, "gestureend", b.ongesturezoom));
          };
          this.doc[0].readyState &&
            "complete" == this.doc[0].readyState &&
            setTimeout(function () {
              I.call(b.doc[0], !1);
            }, 500);
          b.bind(this.doc, "load", I);
        }
      };
      this.showCursor = function (d, c) {
        b.cursortimeout &&
          (clearTimeout(b.cursortimeout), (b.cursortimeout = 0));
        if (b.rail) {
          b.autohidedom &&
            (b.autohidedom.stop().css({ opacity: b.opt.cursoropacitymax }),
            (b.cursoractive = !0));
          if (!b.rail.drag || 1 != b.rail.drag.pt)
            "undefined" != typeof d &&
              !1 !== d &&
              (b.scroll.y = Math.round((1 * d) / b.scrollratio.y)),
              "undefined" != typeof c &&
                (b.scroll.x = Math.round((1 * c) / b.scrollratio.x));
          b.cursor.css({ height: b.cursorheight, top: b.scroll.y });
          b.cursorh &&
            (!b.rail.align && b.rail.visibility
              ? b.cursorh.css({
                  width: b.cursorwidth,
                  left: b.scroll.x + b.rail.width,
                })
              : b.cursorh.css({ width: b.cursorwidth, left: b.scroll.x }),
            (b.cursoractive = !0));
          b.zoom && b.zoom.stop().css({ opacity: b.opt.cursoropacitymax });
        }
      };
      this.hideCursor = function (d) {
        !b.cursortimeout &&
          b.rail &&
          b.autohidedom &&
          (b.cursortimeout = setTimeout(function () {
            if (!b.rail.active || !b.showonmouseevent)
              b.autohidedom.stop().animate({ opacity: b.opt.cursoropacitymin }),
                b.zoom &&
                  b.zoom.stop().animate({ opacity: b.opt.cursoropacitymin }),
                (b.cursoractive = !1);
            b.cursortimeout = 0;
          }, d || b.opt.hidecursordelay));
      };
      this.noticeCursor = function (d, c, g) {
        b.showCursor(c, g);
        b.rail.active || b.hideCursor(d);
      };
      this.getContentSize = b.ispage
        ? function () {
            return {
              w: Math.max(
                document.body.scrollWidth,
                document.documentElement.scrollWidth
              ),
              h: Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
              ),
            };
          }
        : b.haswrapper
        ? function () {
            return {
              w:
                b.doc.outerWidth() +
                parseInt(b.win.css("paddingLeft")) +
                parseInt(b.win.css("paddingRight")),
              h:
                b.doc.outerHeight() +
                parseInt(b.win.css("paddingTop")) +
                parseInt(b.win.css("paddingBottom")),
            };
          }
        : function () {
            return {
              w: b.docscroll[0].scrollWidth,
              h: b.docscroll[0].scrollHeight,
            };
          };
      this.onResize = function (d, c) {
        if (!b.win) return !1;
        if (!b.haswrapper && !b.ispage) {
          if ("none" == b.win.css("display"))
            return b.visibility && b.hideRail().hideRailHr(), !1;
          !b.hidden && !b.visibility && b.showRail().showRailHr();
        }
        var g = b.page.maxh,
          f = b.page.maxw,
          e = b.view.w;
        b.view = {
          w: b.ispage ? b.win.width() : parseInt(b.win[0].clientWidth),
          h: b.ispage ? b.win.height() : parseInt(b.win[0].clientHeight),
        };
        b.page = c ? c : b.getContentSize();
        b.page.maxh = Math.max(0, b.page.h - b.view.h);
        b.page.maxw = Math.max(0, b.page.w - b.view.w);
        if (b.page.maxh == g && b.page.maxw == f && b.view.w == e) {
          if (b.ispage) return b;
          g = b.win.offset();
          if (
            b.lastposition &&
            ((f = b.lastposition), f.top == g.top && f.left == g.left)
          )
            return b;
          b.lastposition = g;
        }
        0 == b.page.maxh
          ? (b.hideRail(),
            (b.scrollvaluemax = 0),
            (b.scroll.y = 0),
            (b.scrollratio.y = 0),
            (b.cursorheight = 0),
            b.setScrollTop(0),
            (b.rail.scrollable = !1))
          : (b.rail.scrollable = !0);
        0 == b.page.maxw
          ? (b.hideRailHr(),
            (b.scrollvaluemaxw = 0),
            (b.scroll.x = 0),
            (b.scrollratio.x = 0),
            (b.cursorwidth = 0),
            b.setScrollLeft(0),
            (b.railh.scrollable = !1))
          : (b.railh.scrollable = !0);
        b.locked = 0 == b.page.maxh && 0 == b.page.maxw;
        if (b.locked) return b.ispage || b.updateScrollBar(b.view), !1;
        !b.hidden && !b.visibility
          ? b.showRail().showRailHr()
          : !b.hidden && !b.railh.visibility && b.showRailHr();
        b.istextarea &&
          b.win.css("resize") &&
          "none" != b.win.css("resize") &&
          (b.view.h -= 20);
        b.cursorheight = Math.min(
          b.view.h,
          Math.round(b.view.h * (b.view.h / b.page.h))
        );
        b.cursorheight = b.opt.cursorfixedheight
          ? b.opt.cursorfixedheight
          : Math.max(b.opt.cursorminheight, b.cursorheight);
        b.cursorwidth = Math.min(
          b.view.w,
          Math.round(b.view.w * (b.view.w / b.page.w))
        );
        b.cursorwidth = b.opt.cursorfixedheight
          ? b.opt.cursorfixedheight
          : Math.max(b.opt.cursorminheight, b.cursorwidth);
        b.scrollvaluemax = b.view.h - b.cursorheight - b.cursor.hborder;
        b.railh &&
          ((b.railh.width =
            0 < b.page.maxh ? b.view.w - b.rail.width : b.view.w),
          (b.scrollvaluemaxw =
            b.railh.width - b.cursorwidth - b.cursorh.wborder));
        b.checkrtlmode &&
          b.railh &&
          ((b.checkrtlmode = !1),
          b.opt.rtlmode && 0 == b.scroll.x && b.setScrollLeft(b.page.maxw));
        b.ispage || b.updateScrollBar(b.view);
        b.scrollratio = {
          x: b.page.maxw / b.scrollvaluemaxw,
          y: b.page.maxh / b.scrollvaluemax,
        };
        b.getScrollTop() > b.page.maxh
          ? b.doScrollTop(b.page.maxh)
          : ((b.scroll.y = Math.round(
              b.getScrollTop() * (1 / b.scrollratio.y)
            )),
            (b.scroll.x = Math.round(
              b.getScrollLeft() * (1 / b.scrollratio.x)
            )),
            b.cursoractive && b.noticeCursor());
        b.scroll.y &&
          0 == b.getScrollTop() &&
          b.doScrollTo(Math.floor(b.scroll.y * b.scrollratio.y));
        return b;
      };
      this.resize = b.onResize;
      this.lazyResize = function (d) {
        d = isNaN(d) ? 30 : d;
        b.delayed("resize", b.resize, d);
        return b;
      };
      this._bind = function (d, c, g, f) {
        b.events.push({ e: d, n: c, f: g, b: f, q: !1 });
        d.addEventListener
          ? d.addEventListener(c, g, f || !1)
          : d.attachEvent
          ? d.attachEvent("on" + c, g)
          : (d["on" + c] = g);
      };
      this.jqbind = function (d, c, g) {
        b.events.push({ e: d, n: c, f: g, q: !0 });
        e(d).bind(c, g);
      };
      this.bind = function (d, c, g, e) {
        var h = "jquery" in d ? d[0] : d;
        "mousewheel" == c
          ? "onwheel" in b.win
            ? b._bind(h, "wheel", g, e || !1)
            : ((d =
                "undefined" != typeof document.onmousewheel
                  ? "mousewheel"
                  : "DOMMouseScroll"),
              n(h, d, g, e || !1),
              "DOMMouseScroll" == d && n(h, "MozMousePixelScroll", g, e || !1))
          : h.addEventListener
          ? (f.cantouch &&
              /mouseup|mousedown|mousemove/.test(c) &&
              b._bind(
                h,
                "mousedown" == c
                  ? "touchstart"
                  : "mouseup" == c
                  ? "touchend"
                  : "touchmove",
                function (b) {
                  if (b.touches) {
                    if (2 > b.touches.length) {
                      var d = b.touches.length ? b.touches[0] : b;
                      d.original = b;
                      g.call(this, d);
                    }
                  } else
                    b.changedTouches &&
                      ((d = b.changedTouches[0]),
                      (d.original = b),
                      g.call(this, d));
                },
                e || !1
              ),
            b._bind(h, c, g, e || !1),
            f.cantouch &&
              "mouseup" == c &&
              b._bind(h, "touchcancel", g, e || !1))
          : b._bind(h, c, function (d) {
              if ((d = d || window.event || !1) && d.srcElement)
                d.target = d.srcElement;
              "pageY" in d ||
                ((d.pageX = d.clientX + document.documentElement.scrollLeft),
                (d.pageY = d.clientY + document.documentElement.scrollTop));
              return !1 === g.call(h, d) || !1 === e ? b.cancelEvent(d) : !0;
            });
      };
      this._unbind = function (b, c, g, f) {
        b.removeEventListener
          ? b.removeEventListener(c, g, f)
          : b.detachEvent
          ? b.detachEvent("on" + c, g)
          : (b["on" + c] = !1);
      };
      this.unbindAll = function () {
        for (var d = 0; d < b.events.length; d++) {
          var c = b.events[d];
          c.q ? c.e.unbind(c.n, c.f) : b._unbind(c.e, c.n, c.f, c.b);
        }
      };
      this.cancelEvent = function (b) {
        b = b.original ? b.original : b ? b : window.event || !1;
        if (!b) return !1;
        b.preventDefault && b.preventDefault();
        b.stopPropagation && b.stopPropagation();
        b.preventManipulation && b.preventManipulation();
        b.cancelBubble = !0;
        b.cancel = !0;
        return (b.returnValue = !1);
      };
      this.stopPropagation = function (b) {
        b = b.original ? b.original : b ? b : window.event || !1;
        if (!b) return !1;
        if (b.stopPropagation) return b.stopPropagation();
        b.cancelBubble && (b.cancelBubble = !0);
        return !1;
      };
      this.showRail = function () {
        if (0 != b.page.maxh && (b.ispage || "none" != b.win.css("display")))
          (b.visibility = !0),
            (b.rail.visibility = !0),
            b.rail.css("display", "block");
        return b;
      };
      this.showRailHr = function () {
        if (!b.railh) return b;
        if (0 != b.page.maxw && (b.ispage || "none" != b.win.css("display")))
          (b.railh.visibility = !0), b.railh.css("display", "block");
        return b;
      };
      this.hideRail = function () {
        b.visibility = !1;
        b.rail.visibility = !1;
        b.rail.css("display", "none");
        return b;
      };
      this.hideRailHr = function () {
        if (!b.railh) return b;
        b.railh.visibility = !1;
        b.railh.css("display", "none");
        return b;
      };
      this.show = function () {
        b.hidden = !1;
        b.locked = !1;
        return b.showRail().showRailHr();
      };
      this.hide = function () {
        b.hidden = !0;
        b.locked = !0;
        return b.hideRail().hideRailHr();
      };
      this.toggle = function () {
        return b.hidden ? b.show() : b.hide();
      };
      this.remove = function () {
        b.stop();
        b.cursortimeout && clearTimeout(b.cursortimeout);
        b.doZoomOut();
        b.unbindAll();
        !1 !== b.observer && b.observer.disconnect();
        !1 !== b.observerremover && b.observerremover.disconnect();
        b.events = [];
        b.cursor && (b.cursor.remove(), (b.cursor = null));
        b.cursorh && (b.cursorh.remove(), (b.cursorh = null));
        b.rail && (b.rail.remove(), (b.rail = null));
        b.railh && (b.railh.remove(), (b.railh = null));
        b.zoom && (b.zoom.remove(), (b.zoom = null));
        for (var d = 0; d < b.saved.css.length; d++) {
          var c = b.saved.css[d];
          c[0].css(c[1], "undefined" == typeof c[2] ? "" : c[2]);
        }
        b.saved = !1;
        b.me.data("__nicescroll", "");
        b.me = null;
        b.doc = null;
        b.docscroll = null;
        b.win = null;
        return b;
      };
      this.scrollstart = function (d) {
        this.onscrollstart = d;
        return b;
      };
      this.scrollend = function (d) {
        this.onscrollend = d;
        return b;
      };
      this.scrollcancel = function (d) {
        this.onscrollcancel = d;
        return b;
      };
      this.zoomin = function (d) {
        this.onzoomin = d;
        return b;
      };
      this.zoomout = function (d) {
        this.onzoomout = d;
        return b;
      };
      this.isScrollable = function (b) {
        b = b.target ? b.target : b;
        if ("OPTION" == b.nodeName) return !0;
        for (; b && 1 == b.nodeType && !/BODY|HTML/.test(b.nodeName); ) {
          var c = e(b),
            c =
              c.css("overflowY") ||
              c.css("overflowX") ||
              c.css("overflow") ||
              "";
          if (/scroll|auto/.test(c)) return b.clientHeight != b.scrollHeight;
          b = b.parentNode ? b.parentNode : !1;
        }
        return !1;
      };
      this.getViewport = function (b) {
        for (
          b = b && b.parentNode ? b.parentNode : !1;
          b && 1 == b.nodeType && !/BODY|HTML/.test(b.nodeName);

        ) {
          var c = e(b),
            g =
              c.css("overflowY") ||
              c.css("overflowX") ||
              c.css("overflow") ||
              "";
          if (
            (/scroll|auto/.test(g) && b.clientHeight != b.scrollHeight) ||
            0 < c.getNiceScroll().length
          )
            return c;
          b = b.parentNode ? b.parentNode : !1;
        }
        return !1;
      };
      this.onmousewheel = function (d) {
        if (b.locked) return !0;
        if (b.rail.drag) return b.cancelEvent(d);
        if (!b.rail.scrollable)
          return b.railh && b.railh.scrollable ? b.onmousewheelhr(d) : !0;
        var c = +new Date(),
          g = !1;
        b.opt.preservenativescrolling &&
          b.checkarea + 600 < c &&
          ((b.nativescrollingarea = b.isScrollable(d)), (g = !0));
        b.checkarea = c;
        if (b.nativescrollingarea) return !0;
        if ((d = t(d, !1, g))) b.checkarea = 0;
        return d;
      };
      this.onmousewheelhr = function (d) {
        if (b.locked || !b.railh.scrollable) return !0;
        if (b.rail.drag) return b.cancelEvent(d);
        var c = +new Date(),
          g = !1;
        b.opt.preservenativescrolling &&
          b.checkarea + 600 < c &&
          ((b.nativescrollingarea = b.isScrollable(d)), (g = !0));
        b.checkarea = c;
        return b.nativescrollingarea
          ? !0
          : b.locked
          ? b.cancelEvent(d)
          : t(d, !0, g);
      };
      this.stop = function () {
        b.cancelScroll();
        b.scrollmon && b.scrollmon.stop();
        b.cursorfreezed = !1;
        b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y));
        b.noticeCursor();
        return b;
      };
      this.getTransitionSpeed = function (c) {
        var f = Math.round(10 * b.opt.scrollspeed);
        c = Math.min(f, Math.round((c / 20) * b.opt.scrollspeed));
        return 20 < c ? c : 0;
      };
      b.opt.smoothscroll
        ? b.ishwscroll && f.hastransition && b.opt.usetransition
          ? ((this.prepareTransition = function (c, e) {
              var g = e ? (20 < c ? c : 0) : b.getTransitionSpeed(c),
                h = g ? f.prefixstyle + "transform " + g + "ms ease-out" : "";
              if (!b.lasttransitionstyle || b.lasttransitionstyle != h)
                (b.lasttransitionstyle = h), b.doc.css(f.transitionstyle, h);
              return g;
            }),
            (this.doScrollLeft = function (c, f) {
              var g = b.scrollrunning ? b.newscrolly : b.getScrollTop();
              b.doScrollPos(c, g, f);
            }),
            (this.doScrollTop = function (c, f) {
              var g = b.scrollrunning ? b.newscrollx : b.getScrollLeft();
              b.doScrollPos(g, c, f);
            }),
            (this.doScrollPos = function (c, e, g) {
              var h = b.getScrollTop(),
                l = b.getScrollLeft();
              (0 > (b.newscrolly - h) * (e - h) ||
                0 > (b.newscrollx - l) * (c - l)) &&
                b.cancelScroll();
              !1 == b.opt.bouncescroll &&
                (0 > e ? (e = 0) : e > b.page.maxh && (e = b.page.maxh),
                0 > c ? (c = 0) : c > b.page.maxw && (c = b.page.maxw));
              if (b.scrollrunning && c == b.newscrollx && e == b.newscrolly)
                return !1;
              b.newscrolly = e;
              b.newscrollx = c;
              b.newscrollspeed = g || !1;
              if (b.timer) return !1;
              b.timer = setTimeout(function () {
                var g = b.getScrollTop(),
                  h = b.getScrollLeft(),
                  l,
                  k;
                l = c - h;
                k = e - g;
                l = Math.round(Math.sqrt(Math.pow(l, 2) + Math.pow(k, 2)));
                l =
                  b.newscrollspeed && 1 < b.newscrollspeed
                    ? b.newscrollspeed
                    : b.getTransitionSpeed(l);
                b.newscrollspeed &&
                  1 >= b.newscrollspeed &&
                  (l *= b.newscrollspeed);
                b.prepareTransition(l, !0);
                b.timerscroll &&
                  b.timerscroll.tm &&
                  clearInterval(b.timerscroll.tm);
                0 < l &&
                  (!b.scrollrunning &&
                    b.onscrollstart &&
                    b.onscrollstart.call(b, {
                      type: "scrollstart",
                      current: { x: h, y: g },
                      request: { x: c, y: e },
                      end: { x: b.newscrollx, y: b.newscrolly },
                      speed: l,
                    }),
                  f.transitionend
                    ? b.scrollendtrapped ||
                      ((b.scrollendtrapped = !0),
                      b.bind(b.doc, f.transitionend, b.onScrollEnd, !1))
                    : (b.scrollendtrapped && clearTimeout(b.scrollendtrapped),
                      (b.scrollendtrapped = setTimeout(b.onScrollEnd, l))),
                  (b.timerscroll = {
                    bz: new BezierClass(g, b.newscrolly, l, 0, 0, 0.58, 1),
                    bh: new BezierClass(h, b.newscrollx, l, 0, 0, 0.58, 1),
                  }),
                  b.cursorfreezed ||
                    (b.timerscroll.tm = setInterval(function () {
                      b.showCursor(b.getScrollTop(), b.getScrollLeft());
                    }, 60)));
                b.synched("doScroll-set", function () {
                  b.timer = 0;
                  b.scrollendtrapped && (b.scrollrunning = !0);
                  b.setScrollTop(b.newscrolly);
                  b.setScrollLeft(b.newscrollx);
                  if (!b.scrollendtrapped) b.onScrollEnd();
                });
              }, 50);
            }),
            (this.cancelScroll = function () {
              if (!b.scrollendtrapped) return !0;
              var c = b.getScrollTop(),
                e = b.getScrollLeft();
              b.scrollrunning = !1;
              f.transitionend || clearTimeout(f.transitionend);
              b.scrollendtrapped = !1;
              b._unbind(b.doc, f.transitionend, b.onScrollEnd);
              b.prepareTransition(0);
              b.setScrollTop(c);
              b.railh && b.setScrollLeft(e);
              b.timerscroll &&
                b.timerscroll.tm &&
                clearInterval(b.timerscroll.tm);
              b.timerscroll = !1;
              b.cursorfreezed = !1;
              b.showCursor(c, e);
              return b;
            }),
            (this.onScrollEnd = function () {
              b.scrollendtrapped &&
                b._unbind(b.doc, f.transitionend, b.onScrollEnd);
              b.scrollendtrapped = !1;
              b.prepareTransition(0);
              b.timerscroll &&
                b.timerscroll.tm &&
                clearInterval(b.timerscroll.tm);
              b.timerscroll = !1;
              var c = b.getScrollTop(),
                e = b.getScrollLeft();
              b.setScrollTop(c);
              b.railh && b.setScrollLeft(e);
              b.noticeCursor(!1, c, e);
              b.cursorfreezed = !1;
              0 > c ? (c = 0) : c > b.page.maxh && (c = b.page.maxh);
              0 > e ? (e = 0) : e > b.page.maxw && (e = b.page.maxw);
              if (c != b.newscrolly || e != b.newscrollx)
                return b.doScrollPos(e, c, b.opt.snapbackspeed);
              b.onscrollend &&
                b.scrollrunning &&
                b.onscrollend.call(b, {
                  type: "scrollend",
                  current: { x: e, y: c },
                  end: { x: b.newscrollx, y: b.newscrolly },
                });
              b.scrollrunning = !1;
            }))
          : ((this.doScrollLeft = function (c, f) {
              var g = b.scrollrunning ? b.newscrolly : b.getScrollTop();
              b.doScrollPos(c, g, f);
            }),
            (this.doScrollTop = function (c, f) {
              var g = b.scrollrunning ? b.newscrollx : b.getScrollLeft();
              b.doScrollPos(g, c, f);
            }),
            (this.doScrollPos = function (c, f, g) {
              function e() {
                if (b.cancelAnimationFrame) return !0;
                b.scrollrunning = !0;
                if ((r = 1 - r)) return (b.timer = v(e) || 1);
                var c = 0,
                  d = (sy = b.getScrollTop());
                if (b.dst.ay) {
                  var d = b.bzscroll
                      ? b.dst.py + b.bzscroll.getNow() * b.dst.ay
                      : b.newscrolly,
                    g = d - sy;
                  if (
                    (0 > g && d < b.newscrolly) ||
                    (0 < g && d > b.newscrolly)
                  )
                    d = b.newscrolly;
                  b.setScrollTop(d);
                  d == b.newscrolly && (c = 1);
                } else c = 1;
                var f = (sx = b.getScrollLeft());
                if (b.dst.ax) {
                  f = b.bzscroll
                    ? b.dst.px + b.bzscroll.getNow() * b.dst.ax
                    : b.newscrollx;
                  g = f - sx;
                  if (
                    (0 > g && f < b.newscrollx) ||
                    (0 < g && f > b.newscrollx)
                  )
                    f = b.newscrollx;
                  b.setScrollLeft(f);
                  f == b.newscrollx && (c += 1);
                } else c += 1;
                2 == c
                  ? ((b.timer = 0),
                    (b.cursorfreezed = !1),
                    (b.bzscroll = !1),
                    (b.scrollrunning = !1),
                    0 > d ? (d = 0) : d > b.page.maxh && (d = b.page.maxh),
                    0 > f ? (f = 0) : f > b.page.maxw && (f = b.page.maxw),
                    f != b.newscrollx || d != b.newscrolly
                      ? b.doScrollPos(f, d)
                      : b.onscrollend &&
                        b.onscrollend.call(b, {
                          type: "scrollend",
                          current: { x: sx, y: sy },
                          end: { x: b.newscrollx, y: b.newscrolly },
                        }))
                  : (b.timer = v(e) || 1);
              }
              f = "undefined" == typeof f || !1 === f ? b.getScrollTop(!0) : f;
              if (b.timer && b.newscrolly == f && b.newscrollx == c) return !0;
              b.timer && w(b.timer);
              b.timer = 0;
              var h = b.getScrollTop(),
                l = b.getScrollLeft();
              (0 > (b.newscrolly - h) * (f - h) ||
                0 > (b.newscrollx - l) * (c - l)) &&
                b.cancelScroll();
              b.newscrolly = f;
              b.newscrollx = c;
              if (!b.bouncescroll || !b.rail.visibility)
                0 > b.newscrolly
                  ? (b.newscrolly = 0)
                  : b.newscrolly > b.page.maxh && (b.newscrolly = b.page.maxh);
              if (!b.bouncescroll || !b.railh.visibility)
                0 > b.newscrollx
                  ? (b.newscrollx = 0)
                  : b.newscrollx > b.page.maxw && (b.newscrollx = b.page.maxw);
              b.dst = {};
              b.dst.x = c - l;
              b.dst.y = f - h;
              b.dst.px = l;
              b.dst.py = h;
              var k = Math.round(
                Math.sqrt(Math.pow(b.dst.x, 2) + Math.pow(b.dst.y, 2))
              );
              b.dst.ax = b.dst.x / k;
              b.dst.ay = b.dst.y / k;
              var n = 0,
                q = k;
              0 == b.dst.x
                ? ((n = h), (q = f), (b.dst.ay = 1), (b.dst.py = 0))
                : 0 == b.dst.y &&
                  ((n = l), (q = c), (b.dst.ax = 1), (b.dst.px = 0));
              k = b.getTransitionSpeed(k);
              g && 1 >= g && (k *= g);
              b.bzscroll =
                0 < k
                  ? b.bzscroll
                    ? b.bzscroll.update(q, k)
                    : new BezierClass(n, q, k, 0, 1, 0, 1)
                  : !1;
              if (!b.timer) {
                ((h == b.page.maxh && f >= b.page.maxh) ||
                  (l == b.page.maxw && c >= b.page.maxw)) &&
                  b.checkContentSize();
                var r = 1;
                b.cancelAnimationFrame = !1;
                b.timer = 1;
                b.onscrollstart &&
                  !b.scrollrunning &&
                  b.onscrollstart.call(b, {
                    type: "scrollstart",
                    current: { x: l, y: h },
                    request: { x: c, y: f },
                    end: { x: b.newscrollx, y: b.newscrolly },
                    speed: k,
                  });
                e();
                ((h == b.page.maxh && f >= h) ||
                  (l == b.page.maxw && c >= l)) &&
                  b.checkContentSize();
                b.noticeCursor();
              }
            }),
            (this.cancelScroll = function () {
              b.timer && w(b.timer);
              b.timer = 0;
              b.bzscroll = !1;
              b.scrollrunning = !1;
              return b;
            }))
        : ((this.doScrollLeft = function (c, f) {
            var g = b.getScrollTop();
            b.doScrollPos(c, g, f);
          }),
          (this.doScrollTop = function (c, f) {
            var g = b.getScrollLeft();
            b.doScrollPos(g, c, f);
          }),
          (this.doScrollPos = function (c, f, g) {
            var e = c > b.page.maxw ? b.page.maxw : c;
            0 > e && (e = 0);
            var h = f > b.page.maxh ? b.page.maxh : f;
            0 > h && (h = 0);
            b.synched("scroll", function () {
              b.setScrollTop(h);
              b.setScrollLeft(e);
            });
          }),
          (this.cancelScroll = function () {}));
      this.doScrollBy = function (c, f) {
        var g = 0,
          g = f
            ? Math.floor((b.scroll.y - c) * b.scrollratio.y)
            : (b.timer ? b.newscrolly : b.getScrollTop(!0)) - c;
        if (b.bouncescroll) {
          var e = Math.round(b.view.h / 2);
          g < -e ? (g = -e) : g > b.page.maxh + e && (g = b.page.maxh + e);
        }
        b.cursorfreezed = !1;
        py = b.getScrollTop(!0);
        if (0 > g && 0 >= py) return b.noticeCursor();
        if (g > b.page.maxh && py >= b.page.maxh)
          return b.checkContentSize(), b.noticeCursor();
        b.doScrollTop(g);
      };
      this.doScrollLeftBy = function (c, f) {
        var g = 0,
          g = f
            ? Math.floor((b.scroll.x - c) * b.scrollratio.x)
            : (b.timer ? b.newscrollx : b.getScrollLeft(!0)) - c;
        if (b.bouncescroll) {
          var e = Math.round(b.view.w / 2);
          g < -e ? (g = -e) : g > b.page.maxw + e && (g = b.page.maxw + e);
        }
        b.cursorfreezed = !1;
        px = b.getScrollLeft(!0);
        if ((0 > g && 0 >= px) || (g > b.page.maxw && px >= b.page.maxw))
          return b.noticeCursor();
        b.doScrollLeft(g);
      };
      this.doScrollTo = function (c, f) {
        f && Math.round(c * b.scrollratio.y);
        b.cursorfreezed = !1;
        b.doScrollTop(c);
      };
      this.checkContentSize = function () {
        var c = b.getContentSize();
        (c.h != b.page.h || c.w != b.page.w) && b.resize(!1, c);
      };
      b.onscroll = function (c) {
        b.rail.drag ||
          b.cursorfreezed ||
          b.synched("scroll", function () {
            b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y));
            b.railh &&
              (b.scroll.x = Math.round(
                b.getScrollLeft() * (1 / b.scrollratio.x)
              ));
            b.noticeCursor();
          });
      };
      b.bind(b.docscroll, "scroll", b.onscroll);
      this.doZoomIn = function (c) {
        if (!b.zoomactive) {
          b.zoomactive = !0;
          b.zoomrestore = { style: {} };
          var h =
              "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(
                " "
              ),
            g = b.win[0].style,
            l;
          for (l in h) {
            var k = h[l];
            b.zoomrestore.style[k] = "undefined" != typeof g[k] ? g[k] : "";
          }
          b.zoomrestore.style.width = b.win.css("width");
          b.zoomrestore.style.height = b.win.css("height");
          b.zoomrestore.padding = {
            w: b.win.outerWidth() - b.win.width(),
            h: b.win.outerHeight() - b.win.height(),
          };
          f.isios4 &&
            ((b.zoomrestore.scrollTop = e(window).scrollTop()),
            e(window).scrollTop(0));
          b.win.css({
            position: f.isios4 ? "absolute" : "fixed",
            top: 0,
            left: 0,
            "z-index": x + 100,
            margin: "0px",
          });
          h = b.win.css("backgroundColor");
          ("" == h ||
            /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(h)) &&
            b.win.css("backgroundColor", "#fff");
          b.rail.css({ "z-index": x + 101 });
          b.zoom.css({ "z-index": x + 102 });
          b.zoom.css("backgroundPosition", "0px -18px");
          b.resizeZoom();
          b.onzoomin && b.onzoomin.call(b);
          return b.cancelEvent(c);
        }
      };
      this.doZoomOut = function (c) {
        if (b.zoomactive)
          return (
            (b.zoomactive = !1),
            b.win.css("margin", ""),
            b.win.css(b.zoomrestore.style),
            f.isios4 && e(window).scrollTop(b.zoomrestore.scrollTop),
            b.rail.css({ "z-index": b.zindex }),
            b.zoom.css({ "z-index": b.zindex }),
            (b.zoomrestore = !1),
            b.zoom.css("backgroundPosition", "0px 0px"),
            b.onResize(),
            b.onzoomout && b.onzoomout.call(b),
            b.cancelEvent(c)
          );
      };
      this.doZoom = function (c) {
        return b.zoomactive ? b.doZoomOut(c) : b.doZoomIn(c);
      };
      this.resizeZoom = function () {
        if (b.zoomactive) {
          var c = b.getScrollTop();
          b.win.css({
            width: e(window).width() - b.zoomrestore.padding.w + "px",
            height: e(window).height() - b.zoomrestore.padding.h + "px",
          });
          b.onResize();
          b.setScrollTop(Math.min(b.page.maxh, c));
        }
      };
      this.init();
      e.nicescroll.push(this);
    },
    H = function (e) {
      var c = this;
      this.nc = e;
      this.steptime =
        this.lasttime =
        this.speedy =
        this.speedx =
        this.lasty =
        this.lastx =
          0;
      this.snapy = this.snapx = !1;
      this.demuly = this.demulx = 0;
      this.lastscrolly = this.lastscrollx = -1;
      this.timer = this.chky = this.chkx = 0;
      this.time = function () {
        return +new Date();
      };
      this.reset = function (e, l) {
        c.stop();
        var k = c.time();
        c.steptime = 0;
        c.lasttime = k;
        c.speedx = 0;
        c.speedy = 0;
        c.lastx = e;
        c.lasty = l;
        c.lastscrollx = -1;
        c.lastscrolly = -1;
      };
      this.update = function (e, l) {
        var k = c.time();
        c.steptime = k - c.lasttime;
        c.lasttime = k;
        var k = l - c.lasty,
          t = e - c.lastx,
          b = c.nc.getScrollTop(),
          q = c.nc.getScrollLeft(),
          b = b + k,
          q = q + t;
        c.snapx = 0 > q || q > c.nc.page.maxw;
        c.snapy = 0 > b || b > c.nc.page.maxh;
        c.speedx = t;
        c.speedy = k;
        c.lastx = e;
        c.lasty = l;
      };
      this.stop = function () {
        c.nc.unsynched("domomentum2d");
        c.timer && clearTimeout(c.timer);
        c.timer = 0;
        c.lastscrollx = -1;
        c.lastscrolly = -1;
      };
      this.doSnapy = function (e, l) {
        var k = !1;
        0 > l
          ? ((l = 0), (k = !0))
          : l > c.nc.page.maxh && ((l = c.nc.page.maxh), (k = !0));
        0 > e
          ? ((e = 0), (k = !0))
          : e > c.nc.page.maxw && ((e = c.nc.page.maxw), (k = !0));
        k && c.nc.doScrollPos(e, l, c.nc.opt.snapbackspeed);
      };
      this.doMomentum = function (e) {
        var l = c.time(),
          k = e ? l + e : c.lasttime;
        e = c.nc.getScrollLeft();
        var t = c.nc.getScrollTop(),
          b = c.nc.page.maxh,
          q = c.nc.page.maxw;
        c.speedx = 0 < q ? Math.min(60, c.speedx) : 0;
        c.speedy = 0 < b ? Math.min(60, c.speedy) : 0;
        k = k && 50 >= l - k;
        if (0 > t || t > b || 0 > e || e > q) k = !1;
        e = c.speedx && k ? c.speedx : !1;
        if ((c.speedy && k && c.speedy) || e) {
          var f = Math.max(16, c.steptime);
          50 < f && ((e = f / 50), (c.speedx *= e), (c.speedy *= e), (f = 50));
          c.demulxy = 0;
          c.lastscrollx = c.nc.getScrollLeft();
          c.chkx = c.lastscrollx;
          c.lastscrolly = c.nc.getScrollTop();
          c.chky = c.lastscrolly;
          var r = c.lastscrollx,
            u = c.lastscrolly,
            d = function () {
              var e = 600 < c.time() - l ? 0.04 : 0.02;
              if (
                c.speedx &&
                ((r = Math.floor(c.lastscrollx - c.speedx * (1 - c.demulxy))),
                (c.lastscrollx = r),
                0 > r || r > q)
              )
                e = 0.1;
              if (
                c.speedy &&
                ((u = Math.floor(c.lastscrolly - c.speedy * (1 - c.demulxy))),
                (c.lastscrolly = u),
                0 > u || u > b)
              )
                e = 0.1;
              c.demulxy = Math.min(1, c.demulxy + e);
              c.nc.synched("domomentum2d", function () {
                c.speedx &&
                  (c.nc.getScrollLeft() != c.chkx && c.stop(),
                  (c.chkx = r),
                  c.nc.setScrollLeft(r));
                c.speedy &&
                  (c.nc.getScrollTop() != c.chky && c.stop(),
                  (c.chky = u),
                  c.nc.setScrollTop(u));
                c.timer || (c.nc.hideCursor(), c.doSnapy(r, u));
              });
              1 > c.demulxy
                ? (c.timer = setTimeout(d, f))
                : (c.stop(), c.nc.hideCursor(), c.doSnapy(r, u));
            };
          d();
        } else c.doSnapy(c.nc.getScrollLeft(), c.nc.getScrollTop());
      };
    },
    A = e.fn.scrollTop;
  e.cssHooks.pageYOffset = {
    get: function (k, c, h) {
      return (c = e.data(k, "__nicescroll") || !1) && c.ishwscroll
        ? c.getScrollTop()
        : A.call(k);
    },
    set: function (k, c) {
      var h = e.data(k, "__nicescroll") || !1;
      h && h.ishwscroll ? h.setScrollTop(parseInt(c)) : A.call(k, c);
      return this;
    },
  };
  e.fn.scrollTop = function (k) {
    if ("undefined" == typeof k) {
      var c = this[0] ? e.data(this[0], "__nicescroll") || !1 : !1;
      return c && c.ishwscroll ? c.getScrollTop() : A.call(this);
    }
    return this.each(function () {
      var c = e.data(this, "__nicescroll") || !1;
      c && c.ishwscroll ? c.setScrollTop(parseInt(k)) : A.call(e(this), k);
    });
  };
  var B = e.fn.scrollLeft;
  e.cssHooks.pageXOffset = {
    get: function (k, c, h) {
      return (c = e.data(k, "__nicescroll") || !1) && c.ishwscroll
        ? c.getScrollLeft()
        : B.call(k);
    },
    set: function (k, c) {
      var h = e.data(k, "__nicescroll") || !1;
      h && h.ishwscroll ? h.setScrollLeft(parseInt(c)) : B.call(k, c);
      return this;
    },
  };
  e.fn.scrollLeft = function (k) {
    if ("undefined" == typeof k) {
      var c = this[0] ? e.data(this[0], "__nicescroll") || !1 : !1;
      return c && c.ishwscroll ? c.getScrollLeft() : B.call(this);
    }
    return this.each(function () {
      var c = e.data(this, "__nicescroll") || !1;
      c && c.ishwscroll ? c.setScrollLeft(parseInt(k)) : B.call(e(this), k);
    });
  };
  var C = function (k) {
    var c = this;
    this.length = 0;
    this.name = "nicescrollarray";
    this.each = function (e) {
      for (var h = 0; h < c.length; h++) e.call(c[h]);
      return c;
    };
    this.push = function (e) {
      c[c.length] = e;
      c.length++;
    };
    this.eq = function (e) {
      return c[e];
    };
    if (k)
      for (a = 0; a < k.length; a++) {
        var h = e.data(k[a], "__nicescroll") || !1;
        h && ((this[this.length] = h), this.length++);
      }
    return this;
  };
  (function (e, c, h) {
    for (var l = 0; l < c.length; l++) h(e, c[l]);
  })(
    C.prototype,
    "show hide toggle onResize resize remove stop doScrollPos".split(" "),
    function (e, c) {
      e[c] = function () {
        var e = arguments;
        return this.each(function () {
          this[c].apply(this, e);
        });
      };
    }
  );
  e.fn.getNiceScroll = function (k) {
    return "undefined" == typeof k
      ? new C(this)
      : e.data(this[k], "__nicescroll") || !1;
  };
  e.extend(e.expr[":"], {
    nicescroll: function (k) {
      return e.data(k, "__nicescroll") ? !0 : !1;
    },
  });
  e.fn.niceScroll = function (k, c) {
    "undefined" == typeof c &&
      "object" == typeof k &&
      !("jquery" in k) &&
      ((c = k), (k = !1));
    var h = new C();
    "undefined" == typeof c && (c = {});
    k && ((c.doc = e(k)), (c.win = e(this)));
    var l = !("doc" in c);
    !l && !("win" in c) && (c.win = e(this));
    this.each(function () {
      var k = e(this).data("__nicescroll") || !1;
      k ||
        ((c.doc = l ? e(this) : c.doc),
        (k = new N(c, e(this))),
        e(this).data("__nicescroll", k));
      h.push(k);
    });
    return 1 == h.length ? h[0] : h;
  };
  window.NiceScroll = {
    getjQuery: function () {
      return e;
    },
  };
  e.nicescroll || ((e.nicescroll = new C()), (e.nicescroll.options = F));
})(jQuery);

// 03. ISOTOPE
/*!
 * Isotope PACKAGED v2.2.2
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2015 Metafizzy
 */

!(function (a) {
  function b() {}
  function c(a) {
    function c(b) {
      b.prototype.option ||
        (b.prototype.option = function (b) {
          a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b));
        });
    }
    function e(b, c) {
      a.fn[b] = function (e) {
        if ("string" == typeof e) {
          for (
            var g = d.call(arguments, 1), h = 0, i = this.length;
            i > h;
            h++
          ) {
            var j = this[h],
              k = a.data(j, b);
            if (k)
              if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                var l = k[e].apply(k, g);
                if (void 0 !== l) return l;
              } else f("no such method '" + e + "' for " + b + " instance");
            else
              f(
                "cannot call methods on " +
                  b +
                  " prior to initialization; attempted to call '" +
                  e +
                  "'"
              );
          }
          return this;
        }
        return this.each(function () {
          var d = a.data(this, b);
          d
            ? (d.option(e), d._init())
            : ((d = new c(this, e)), a.data(this, b, d));
        });
      };
    }
    if (a) {
      var f =
        "undefined" == typeof console
          ? b
          : function (a) {
              console.error(a);
            };
      return (
        (a.bridget = function (a, b) {
          c(b), e(a, b);
        }),
        a.bridget
      );
    }
  }
  var d = Array.prototype.slice;
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery.bridget", ["jquery"], c)
    : c("object" == typeof exports ? require("jquery") : a.jQuery);
})(window),
  (function (a) {
    function b(b) {
      var c = a.event;
      return (c.target = c.target || c.srcElement || b), c;
    }
    var c = document.documentElement,
      d = function () {};
    c.addEventListener
      ? (d = function (a, b, c) {
          a.addEventListener(b, c, !1);
        })
      : c.attachEvent &&
        (d = function (a, c, d) {
          (a[c + d] = d.handleEvent
            ? function () {
                var c = b(a);
                d.handleEvent.call(d, c);
              }
            : function () {
                var c = b(a);
                d.call(a, c);
              }),
            a.attachEvent("on" + c, a[c + d]);
        });
    var e = function () {};
    c.removeEventListener
      ? (e = function (a, b, c) {
          a.removeEventListener(b, c, !1);
        })
      : c.detachEvent &&
        (e = function (a, b, c) {
          a.detachEvent("on" + b, a[b + c]);
          try {
            delete a[b + c];
          } catch (d) {
            a[b + c] = void 0;
          }
        });
    var f = { bind: d, unbind: e };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", f)
      : "object" == typeof exports
      ? (module.exports = f)
      : (a.eventie = f);
  })(window),
  function () {
    "use strict";
    function a() {}
    function b(a, b) {
      for (var c = a.length; c--; ) if (a[c].listener === b) return c;
      return -1;
    }
    function c(a) {
      return function () {
        return this[a].apply(this, arguments);
      };
    }
    var d = a.prototype,
      e = this,
      f = e.EventEmitter;
    (d.getListeners = function (a) {
      var b,
        c,
        d = this._getEvents();
      if (a instanceof RegExp) {
        b = {};
        for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c]);
      } else b = d[a] || (d[a] = []);
      return b;
    }),
      (d.flattenListeners = function (a) {
        var b,
          c = [];
        for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
        return c;
      }),
      (d.getListenersAsObject = function (a) {
        var b,
          c = this.getListeners(a);
        return c instanceof Array && ((b = {}), (b[a] = c)), b || c;
      }),
      (d.addListener = function (a, c) {
        var d,
          e = this.getListenersAsObject(a),
          f = "object" == typeof c;
        for (d in e)
          e.hasOwnProperty(d) &&
            -1 === b(e[d], c) &&
            e[d].push(f ? c : { listener: c, once: !1 });
        return this;
      }),
      (d.on = c("addListener")),
      (d.addOnceListener = function (a, b) {
        return this.addListener(a, { listener: b, once: !0 });
      }),
      (d.once = c("addOnceListener")),
      (d.defineEvent = function (a) {
        return this.getListeners(a), this;
      }),
      (d.defineEvents = function (a) {
        for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
        return this;
      }),
      (d.removeListener = function (a, c) {
        var d,
          e,
          f = this.getListenersAsObject(a);
        for (e in f)
          f.hasOwnProperty(e) &&
            ((d = b(f[e], c)), -1 !== d && f[e].splice(d, 1));
        return this;
      }),
      (d.off = c("removeListener")),
      (d.addListeners = function (a, b) {
        return this.manipulateListeners(!1, a, b);
      }),
      (d.removeListeners = function (a, b) {
        return this.manipulateListeners(!0, a, b);
      }),
      (d.manipulateListeners = function (a, b, c) {
        var d,
          e,
          f = a ? this.removeListener : this.addListener,
          g = a ? this.removeListeners : this.addListeners;
        if ("object" != typeof b || b instanceof RegExp)
          for (d = c.length; d--; ) f.call(this, b, c[d]);
        else
          for (d in b)
            b.hasOwnProperty(d) &&
              (e = b[d]) &&
              ("function" == typeof e
                ? f.call(this, d, e)
                : g.call(this, d, e));
        return this;
      }),
      (d.removeEvent = function (a) {
        var b,
          c = typeof a,
          d = this._getEvents();
        if ("string" === c) delete d[a];
        else if (a instanceof RegExp)
          for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
        else delete this._events;
        return this;
      }),
      (d.removeAllListeners = c("removeEvent")),
      (d.emitEvent = function (a, b) {
        var c,
          d,
          e,
          f,
          g = this.getListenersAsObject(a);
        for (e in g)
          if (g.hasOwnProperty(e))
            for (d = g[e].length; d--; )
              (c = g[e][d]),
                c.once === !0 && this.removeListener(a, c.listener),
                (f = c.listener.apply(this, b || [])),
                f === this._getOnceReturnValue() &&
                  this.removeListener(a, c.listener);
        return this;
      }),
      (d.trigger = c("emitEvent")),
      (d.emit = function (a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(a, b);
      }),
      (d.setOnceReturnValue = function (a) {
        return (this._onceReturnValue = a), this;
      }),
      (d._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue")
          ? this._onceReturnValue
          : !0;
      }),
      (d._getEvents = function () {
        return this._events || (this._events = {});
      }),
      (a.noConflict = function () {
        return (e.EventEmitter = f), a;
      }),
      "function" == typeof define && define.amd
        ? define("eventEmitter/EventEmitter", [], function () {
            return a;
          })
        : "object" == typeof module && module.exports
        ? (module.exports = a)
        : (e.EventEmitter = a);
  }.call(this),
  (function (a) {
    function b(a) {
      if (a) {
        if ("string" == typeof d[a]) return a;
        a = a.charAt(0).toUpperCase() + a.slice(1);
        for (var b, e = 0, f = c.length; f > e; e++)
          if (((b = c[e] + a), "string" == typeof d[b])) return b;
      }
    }
    var c = "Webkit Moz ms Ms O".split(" "),
      d = document.documentElement.style;
    "function" == typeof define && define.amd
      ? define("get-style-property/get-style-property", [], function () {
          return b;
        })
      : "object" == typeof exports
      ? (module.exports = b)
      : (a.getStyleProperty = b);
  })(window),
  (function (a, b) {
    function c(a) {
      var b = parseFloat(a),
        c = -1 === a.indexOf("%") && !isNaN(b);
      return c && b;
    }
    function d() {}
    function e() {
      for (
        var a = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          b = 0,
          c = h.length;
        c > b;
        b++
      ) {
        var d = h[b];
        a[d] = 0;
      }
      return a;
    }
    function f(b) {
      function d() {
        if (!m) {
          m = !0;
          var d = a.getComputedStyle;
          if (
            ((j = (function () {
              var a = d
                ? function (a) {
                    return d(a, null);
                  }
                : function (a) {
                    return a.currentStyle;
                  };
              return function (b) {
                var c = a(b);
                return (
                  c ||
                    g(
                      "Style returned " +
                        c +
                        ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
                    ),
                  c
                );
              };
            })()),
            (k = b("boxSizing")))
          ) {
            var e = document.createElement("div");
            (e.style.width = "200px"),
              (e.style.padding = "1px 2px 3px 4px"),
              (e.style.borderStyle = "solid"),
              (e.style.borderWidth = "1px 2px 3px 4px"),
              (e.style[k] = "border-box");
            var f = document.body || document.documentElement;
            f.appendChild(e);
            var h = j(e);
            (l = 200 === c(h.width)), f.removeChild(e);
          }
        }
      }
      function f(a) {
        if (
          (d(),
          "string" == typeof a && (a = document.querySelector(a)),
          a && "object" == typeof a && a.nodeType)
        ) {
          var b = j(a);
          if ("none" === b.display) return e();
          var f = {};
          (f.width = a.offsetWidth), (f.height = a.offsetHeight);
          for (
            var g = (f.isBorderBox = !(!k || !b[k] || "border-box" !== b[k])),
              m = 0,
              n = h.length;
            n > m;
            m++
          ) {
            var o = h[m],
              p = b[o];
            p = i(a, p);
            var q = parseFloat(p);
            f[o] = isNaN(q) ? 0 : q;
          }
          var r = f.paddingLeft + f.paddingRight,
            s = f.paddingTop + f.paddingBottom,
            t = f.marginLeft + f.marginRight,
            u = f.marginTop + f.marginBottom,
            v = f.borderLeftWidth + f.borderRightWidth,
            w = f.borderTopWidth + f.borderBottomWidth,
            x = g && l,
            y = c(b.width);
          y !== !1 && (f.width = y + (x ? 0 : r + v));
          var z = c(b.height);
          return (
            z !== !1 && (f.height = z + (x ? 0 : s + w)),
            (f.innerWidth = f.width - (r + v)),
            (f.innerHeight = f.height - (s + w)),
            (f.outerWidth = f.width + t),
            (f.outerHeight = f.height + u),
            f
          );
        }
      }
      function i(b, c) {
        if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
        var d = b.style,
          e = d.left,
          f = b.runtimeStyle,
          g = f && f.left;
        return (
          g && (f.left = b.currentStyle.left),
          (d.left = c),
          (c = d.pixelLeft),
          (d.left = e),
          g && (f.left = g),
          c
        );
      }
      var j,
        k,
        l,
        m = !1;
      return f;
    }
    var g =
        "undefined" == typeof console
          ? d
          : function (a) {
              console.error(a);
            },
      h = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ];
    "function" == typeof define && define.amd
      ? define(
          "get-size/get-size",
          ["get-style-property/get-style-property"],
          f
        )
      : "object" == typeof exports
      ? (module.exports = f(require("desandro-get-style-property")))
      : (a.getSize = f(a.getStyleProperty));
  })(window),
  (function (a) {
    function b(a) {
      "function" == typeof a && (b.isReady ? a() : g.push(a));
    }
    function c(a) {
      var c = "readystatechange" === a.type && "complete" !== f.readyState;
      b.isReady || c || d();
    }
    function d() {
      b.isReady = !0;
      for (var a = 0, c = g.length; c > a; a++) {
        var d = g[a];
        d();
      }
    }
    function e(e) {
      return (
        "complete" === f.readyState
          ? d()
          : (e.bind(f, "DOMContentLoaded", c),
            e.bind(f, "readystatechange", c),
            e.bind(a, "load", c)),
        b
      );
    }
    var f = a.document,
      g = [];
    (b.isReady = !1),
      "function" == typeof define && define.amd
        ? define("doc-ready/doc-ready", ["eventie/eventie"], e)
        : "object" == typeof exports
        ? (module.exports = e(require("eventie")))
        : (a.docReady = e(a.eventie));
  })(window),
  (function (a) {
    "use strict";
    function b(a, b) {
      return a[g](b);
    }
    function c(a) {
      if (!a.parentNode) {
        var b = document.createDocumentFragment();
        b.appendChild(a);
      }
    }
    function d(a, b) {
      c(a);
      for (
        var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length;
        f > e;
        e++
      )
        if (d[e] === a) return !0;
      return !1;
    }
    function e(a, d) {
      return c(a), b(a, d);
    }
    var f,
      g = (function () {
        if (a.matches) return "matches";
        if (a.matchesSelector) return "matchesSelector";
        for (
          var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length;
          d > c;
          c++
        ) {
          var e = b[c],
            f = e + "MatchesSelector";
          if (a[f]) return f;
        }
      })();
    if (g) {
      var h = document.createElement("div"),
        i = b(h, "div");
      f = i ? b : e;
    } else f = d;
    "function" == typeof define && define.amd
      ? define("matches-selector/matches-selector", [], function () {
          return f;
        })
      : "object" == typeof exports
      ? (module.exports = f)
      : (window.matchesSelector = f);
  })(Element.prototype),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["doc-ready/doc-ready", "matches-selector/matches-selector"],
          function (c, d) {
            return b(a, c, d);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("doc-ready"),
          require("desandro-matches-selector")
        ))
      : (a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector));
  })(window, function (a, b, c) {
    var d = {};
    (d.extend = function (a, b) {
      for (var c in b) a[c] = b[c];
      return a;
    }),
      (d.modulo = function (a, b) {
        return ((a % b) + b) % b;
      });
    var e = Object.prototype.toString;
    (d.isArray = function (a) {
      return "[object Array]" == e.call(a);
    }),
      (d.makeArray = function (a) {
        var b = [];
        if (d.isArray(a)) b = a;
        else if (a && "number" == typeof a.length)
          for (var c = 0, e = a.length; e > c; c++) b.push(a[c]);
        else b.push(a);
        return b;
      }),
      (d.indexOf = Array.prototype.indexOf
        ? function (a, b) {
            return a.indexOf(b);
          }
        : function (a, b) {
            for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
            return -1;
          }),
      (d.removeFrom = function (a, b) {
        var c = d.indexOf(a, b);
        -1 != c && a.splice(c, 1);
      }),
      (d.isElement =
        "function" == typeof HTMLElement || "object" == typeof HTMLElement
          ? function (a) {
              return a instanceof HTMLElement;
            }
          : function (a) {
              return (
                a &&
                "object" == typeof a &&
                1 == a.nodeType &&
                "string" == typeof a.nodeName
              );
            }),
      (d.setText = (function () {
        function a(a, c) {
          (b =
            b ||
            (void 0 !== document.documentElement.textContent
              ? "textContent"
              : "innerText")),
            (a[b] = c);
        }
        var b;
        return a;
      })()),
      (d.getParent = function (a, b) {
        for (; a != document.body; )
          if (((a = a.parentNode), c(a, b))) return a;
      }),
      (d.getQueryElement = function (a) {
        return "string" == typeof a ? document.querySelector(a) : a;
      }),
      (d.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
      }),
      (d.filterFindElements = function (a, b) {
        a = d.makeArray(a);
        for (var e = [], f = 0, g = a.length; g > f; f++) {
          var h = a[f];
          if (d.isElement(h))
            if (b) {
              c(h, b) && e.push(h);
              for (
                var i = h.querySelectorAll(b), j = 0, k = i.length;
                k > j;
                j++
              )
                e.push(i[j]);
            } else e.push(h);
        }
        return e;
      }),
      (d.debounceMethod = function (a, b, c) {
        var d = a.prototype[b],
          e = b + "Timeout";
        a.prototype[b] = function () {
          var a = this[e];
          a && clearTimeout(a);
          var b = arguments,
            f = this;
          this[e] = setTimeout(function () {
            d.apply(f, b), delete f[e];
          }, c || 100);
        };
      }),
      (d.toDashed = function (a) {
        return a
          .replace(/(.)([A-Z])/g, function (a, b, c) {
            return b + "-" + c;
          })
          .toLowerCase();
      });
    var f = a.console;
    return (
      (d.htmlInit = function (c, e) {
        b(function () {
          for (
            var b = d.toDashed(e),
              g = document.querySelectorAll(".js-" + b),
              h = "data-" + b + "-options",
              i = 0,
              j = g.length;
            j > i;
            i++
          ) {
            var k,
              l = g[i],
              m = l.getAttribute(h);
            try {
              k = m && JSON.parse(m);
            } catch (n) {
              f &&
                f.error(
                  "Error parsing " +
                    h +
                    " on " +
                    l.nodeName.toLowerCase() +
                    (l.id ? "#" + l.id : "") +
                    ": " +
                    n
                );
              continue;
            }
            var o = new c(l, k),
              p = a.jQuery;
            p && p.data(l, e, o);
          }
        });
      }),
      d
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          [
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "get-style-property/get-style-property",
            "fizzy-ui-utils/utils",
          ],
          function (c, d, e, f) {
            return b(a, c, d, e, f);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("desandro-get-style-property"),
          require("fizzy-ui-utils")
        ))
      : ((a.Outlayer = {}),
        (a.Outlayer.Item = b(
          a,
          a.EventEmitter,
          a.getSize,
          a.getStyleProperty,
          a.fizzyUIUtils
        )));
  })(window, function (a, b, c, d, e) {
    "use strict";
    function f(a) {
      for (var b in a) return !1;
      return (b = null), !0;
    }
    function g(a, b) {
      a &&
        ((this.element = a),
        (this.layout = b),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function h(a) {
      return a.replace(/([A-Z])/g, function (a) {
        return "-" + a.toLowerCase();
      });
    }
    var i = a.getComputedStyle,
      j = i
        ? function (a) {
            return i(a, null);
          }
        : function (a) {
            return a.currentStyle;
          },
      k = d("transition"),
      l = d("transform"),
      m = k && l,
      n = !!d("perspective"),
      o = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        transition: "transitionend",
      }[k],
      p = [
        "transform",
        "transition",
        "transitionDuration",
        "transitionProperty",
      ],
      q = (function () {
        for (var a = {}, b = 0, c = p.length; c > b; b++) {
          var e = p[b],
            f = d(e);
          f && f !== e && (a[e] = f);
        }
        return a;
      })();
    e.extend(g.prototype, b.prototype),
      (g.prototype._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (g.prototype.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
      }),
      (g.prototype.getSize = function () {
        this.size = c(this.element);
      }),
      (g.prototype.css = function (a) {
        var b = this.element.style;
        for (var c in a) {
          var d = q[c] || c;
          b[d] = a[c];
        }
      }),
      (g.prototype.getPosition = function () {
        var a = j(this.element),
          b = this.layout.options,
          c = b.isOriginLeft,
          d = b.isOriginTop,
          e = a[c ? "left" : "right"],
          f = a[d ? "top" : "bottom"],
          g = this.layout.size,
          h =
            -1 != e.indexOf("%")
              ? (parseFloat(e) / 100) * g.width
              : parseInt(e, 10),
          i =
            -1 != f.indexOf("%")
              ? (parseFloat(f) / 100) * g.height
              : parseInt(f, 10);
        (h = isNaN(h) ? 0 : h),
          (i = isNaN(i) ? 0 : i),
          (h -= c ? g.paddingLeft : g.paddingRight),
          (i -= d ? g.paddingTop : g.paddingBottom),
          (this.position.x = h),
          (this.position.y = i);
      }),
      (g.prototype.layoutPosition = function () {
        var a = this.layout.size,
          b = this.layout.options,
          c = {},
          d = b.isOriginLeft ? "paddingLeft" : "paddingRight",
          e = b.isOriginLeft ? "left" : "right",
          f = b.isOriginLeft ? "right" : "left",
          g = this.position.x + a[d];
        (c[e] = this.getXValue(g)), (c[f] = "");
        var h = b.isOriginTop ? "paddingTop" : "paddingBottom",
          i = b.isOriginTop ? "top" : "bottom",
          j = b.isOriginTop ? "bottom" : "top",
          k = this.position.y + a[h];
        (c[i] = this.getYValue(k)),
          (c[j] = ""),
          this.css(c),
          this.emitEvent("layout", [this]);
      }),
      (g.prototype.getXValue = function (a) {
        var b = this.layout.options;
        return b.percentPosition && !b.isHorizontal
          ? (a / this.layout.size.width) * 100 + "%"
          : a + "px";
      }),
      (g.prototype.getYValue = function (a) {
        var b = this.layout.options;
        return b.percentPosition && b.isHorizontal
          ? (a / this.layout.size.height) * 100 + "%"
          : a + "px";
      }),
      (g.prototype._transitionTo = function (a, b) {
        this.getPosition();
        var c = this.position.x,
          d = this.position.y,
          e = parseInt(a, 10),
          f = parseInt(b, 10),
          g = e === this.position.x && f === this.position.y;
        if ((this.setPosition(a, b), g && !this.isTransitioning))
          return void this.layoutPosition();
        var h = a - c,
          i = b - d,
          j = {};
        (j.transform = this.getTranslate(h, i)),
          this.transition({
            to: j,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (g.prototype.getTranslate = function (a, b) {
        var c = this.layout.options;
        return (
          (a = c.isOriginLeft ? a : -a),
          (b = c.isOriginTop ? b : -b),
          n
            ? "translate3d(" + a + "px, " + b + "px, 0)"
            : "translate(" + a + "px, " + b + "px)"
        );
      }),
      (g.prototype.goTo = function (a, b) {
        this.setPosition(a, b), this.layoutPosition();
      }),
      (g.prototype.moveTo = m ? g.prototype._transitionTo : g.prototype.goTo),
      (g.prototype.setPosition = function (a, b) {
        (this.position.x = parseInt(a, 10)),
          (this.position.y = parseInt(b, 10));
      }),
      (g.prototype._nonTransition = function (a) {
        this.css(a.to), a.isCleaning && this._removeStyles(a.to);
        for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this);
      }),
      (g.prototype._transition = function (a) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(a);
        var b = this._transn;
        for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
        for (c in a.to)
          (b.ingProperties[c] = !0), a.isCleaning && (b.clean[c] = !0);
        if (a.from) {
          this.css(a.from);
          var d = this.element.offsetHeight;
          d = null;
        }
        this.enableTransition(a.to),
          this.css(a.to),
          (this.isTransitioning = !0);
      });
    var r = "opacity," + h(q.transform || "transform");
    (g.prototype.enableTransition = function () {
      this.isTransitioning ||
        (this.css({
          transitionProperty: r,
          transitionDuration: this.layout.options.transitionDuration,
        }),
        this.element.addEventListener(o, this, !1));
    }),
      (g.prototype.transition =
        g.prototype[k ? "_transition" : "_nonTransition"]),
      (g.prototype.onwebkitTransitionEnd = function (a) {
        this.ontransitionend(a);
      }),
      (g.prototype.onotransitionend = function (a) {
        this.ontransitionend(a);
      });
    var s = {
      "-webkit-transform": "transform",
      "-moz-transform": "transform",
      "-o-transform": "transform",
    };
    (g.prototype.ontransitionend = function (a) {
      if (a.target === this.element) {
        var b = this._transn,
          c = s[a.propertyName] || a.propertyName;
        if (
          (delete b.ingProperties[c],
          f(b.ingProperties) && this.disableTransition(),
          c in b.clean &&
            ((this.element.style[a.propertyName] = ""), delete b.clean[c]),
          c in b.onEnd)
        ) {
          var d = b.onEnd[c];
          d.call(this), delete b.onEnd[c];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (g.prototype.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(o, this, !1),
          (this.isTransitioning = !1);
      }),
      (g.prototype._removeStyles = function (a) {
        var b = {};
        for (var c in a) b[c] = "";
        this.css(b);
      });
    var t = { transitionProperty: "", transitionDuration: "" };
    return (
      (g.prototype.removeTransitionStyles = function () {
        this.css(t);
      }),
      (g.prototype.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (g.prototype.remove = function () {
        if (!k || !parseFloat(this.layout.options.transitionDuration))
          return void this.removeElem();
        var a = this;
        this.once("transitionEnd", function () {
          a.removeElem();
        }),
          this.hide();
      }),
      (g.prototype.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var a = this.layout.options,
          b = {},
          c = this.getHideRevealTransitionEndProperty("visibleStyle");
        (b[c] = this.onRevealTransitionEnd),
          this.transition({
            from: a.hiddenStyle,
            to: a.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: b,
          });
      }),
      (g.prototype.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (g.prototype.getHideRevealTransitionEndProperty = function (a) {
        var b = this.layout.options[a];
        if (b.opacity) return "opacity";
        for (var c in b) return c;
      }),
      (g.prototype.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var a = this.layout.options,
          b = {},
          c = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (b[c] = this.onHideTransitionEnd),
          this.transition({
            from: a.visibleStyle,
            to: a.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: b,
          });
      }),
      (g.prototype.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (g.prototype.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      g
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "eventie/eventie",
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (c, d, e, f, g) {
            return b(a, c, d, e, f, g);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("eventie"),
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (a.Outlayer = b(
          a,
          a.eventie,
          a.EventEmitter,
          a.getSize,
          a.fizzyUIUtils,
          a.Outlayer.Item
        ));
  })(window, function (a, b, c, d, e, f) {
    "use strict";
    function g(a, b) {
      var c = e.getQueryElement(a);
      if (!c)
        return void (
          h &&
          h.error(
            "Bad element for " + this.constructor.namespace + ": " + (c || a)
          )
        );
      (this.element = c),
        i && (this.$element = i(this.element)),
        (this.options = e.extend({}, this.constructor.defaults)),
        this.option(b);
      var d = ++k;
      (this.element.outlayerGUID = d),
        (l[d] = this),
        this._create(),
        this.options.isInitLayout && this.layout();
    }
    var h = a.console,
      i = a.jQuery,
      j = function () {},
      k = 0,
      l = {};
    return (
      (g.namespace = "outlayer"),
      (g.Item = f),
      (g.defaults = {
        containerStyle: { position: "relative" },
        isInitLayout: !0,
        isOriginLeft: !0,
        isOriginTop: !0,
        isResizeBound: !0,
        isResizingContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      }),
      e.extend(g.prototype, c.prototype),
      (g.prototype.option = function (a) {
        e.extend(this.options, a);
      }),
      (g.prototype._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          e.extend(this.element.style, this.options.containerStyle),
          this.options.isResizeBound && this.bindResize();
      }),
      (g.prototype.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (g.prototype._itemize = function (a) {
        for (
          var b = this._filterFindItemElements(a),
            c = this.constructor.Item,
            d = [],
            e = 0,
            f = b.length;
          f > e;
          e++
        ) {
          var g = b[e],
            h = new c(g, this);
          d.push(h);
        }
        return d;
      }),
      (g.prototype._filterFindItemElements = function (a) {
        return e.filterFindElements(a, this.options.itemSelector);
      }),
      (g.prototype.getItemElements = function () {
        for (var a = [], b = 0, c = this.items.length; c > b; b++)
          a.push(this.items[b].element);
        return a;
      }),
      (g.prototype.layout = function () {
        this._resetLayout(), this._manageStamps();
        var a =
          void 0 !== this.options.isLayoutInstant
            ? this.options.isLayoutInstant
            : !this._isLayoutInited;
        this.layoutItems(this.items, a), (this._isLayoutInited = !0);
      }),
      (g.prototype._init = g.prototype.layout),
      (g.prototype._resetLayout = function () {
        this.getSize();
      }),
      (g.prototype.getSize = function () {
        this.size = d(this.element);
      }),
      (g.prototype._getMeasurement = function (a, b) {
        var c,
          f = this.options[a];
        f
          ? ("string" == typeof f
              ? (c = this.element.querySelector(f))
              : e.isElement(f) && (c = f),
            (this[a] = c ? d(c)[b] : f))
          : (this[a] = 0);
      }),
      (g.prototype.layoutItems = function (a, b) {
        (a = this._getItemsForLayout(a)),
          this._layoutItems(a, b),
          this._postLayout();
      }),
      (g.prototype._getItemsForLayout = function (a) {
        for (var b = [], c = 0, d = a.length; d > c; c++) {
          var e = a[c];
          e.isIgnored || b.push(e);
        }
        return b;
      }),
      (g.prototype._layoutItems = function (a, b) {
        if ((this._emitCompleteOnItems("layout", a), a && a.length)) {
          for (var c = [], d = 0, e = a.length; e > d; d++) {
            var f = a[d],
              g = this._getItemLayoutPosition(f);
            (g.item = f), (g.isInstant = b || f.isLayoutInstant), c.push(g);
          }
          this._processLayoutQueue(c);
        }
      }),
      (g.prototype._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (g.prototype._processLayoutQueue = function (a) {
        for (var b = 0, c = a.length; c > b; b++) {
          var d = a[b];
          this._positionItem(d.item, d.x, d.y, d.isInstant);
        }
      }),
      (g.prototype._positionItem = function (a, b, c, d) {
        d ? a.goTo(b, c) : a.moveTo(b, c);
      }),
      (g.prototype._postLayout = function () {
        this.resizeContainer();
      }),
      (g.prototype.resizeContainer = function () {
        if (this.options.isResizingContainer) {
          var a = this._getContainerSize();
          a &&
            (this._setContainerMeasure(a.width, !0),
            this._setContainerMeasure(a.height, !1));
        }
      }),
      (g.prototype._getContainerSize = j),
      (g.prototype._setContainerMeasure = function (a, b) {
        if (void 0 !== a) {
          var c = this.size;
          c.isBorderBox &&
            (a += b
              ? c.paddingLeft +
                c.paddingRight +
                c.borderLeftWidth +
                c.borderRightWidth
              : c.paddingBottom +
                c.paddingTop +
                c.borderTopWidth +
                c.borderBottomWidth),
            (a = Math.max(a, 0)),
            (this.element.style[b ? "width" : "height"] = a + "px");
        }
      }),
      (g.prototype._emitCompleteOnItems = function (a, b) {
        function c() {
          e.dispatchEvent(a + "Complete", null, [b]);
        }
        function d() {
          g++, g === f && c();
        }
        var e = this,
          f = b.length;
        if (!b || !f) return void c();
        for (var g = 0, h = 0, i = b.length; i > h; h++) {
          var j = b[h];
          j.once(a, d);
        }
      }),
      (g.prototype.dispatchEvent = function (a, b, c) {
        var d = b ? [b].concat(c) : c;
        if ((this.emitEvent(a, d), i))
          if (((this.$element = this.$element || i(this.element)), b)) {
            var e = i.Event(b);
            (e.type = a), this.$element.trigger(e, c);
          } else this.$element.trigger(a, c);
      }),
      (g.prototype.ignore = function (a) {
        var b = this.getItem(a);
        b && (b.isIgnored = !0);
      }),
      (g.prototype.unignore = function (a) {
        var b = this.getItem(a);
        b && delete b.isIgnored;
      }),
      (g.prototype.stamp = function (a) {
        if ((a = this._find(a))) {
          this.stamps = this.stamps.concat(a);
          for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b];
            this.ignore(d);
          }
        }
      }),
      (g.prototype.unstamp = function (a) {
        if ((a = this._find(a)))
          for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b];
            e.removeFrom(this.stamps, d), this.unignore(d);
          }
      }),
      (g.prototype._find = function (a) {
        return a
          ? ("string" == typeof a && (a = this.element.querySelectorAll(a)),
            (a = e.makeArray(a)))
          : void 0;
      }),
      (g.prototype._manageStamps = function () {
        if (this.stamps && this.stamps.length) {
          this._getBoundingRect();
          for (var a = 0, b = this.stamps.length; b > a; a++) {
            var c = this.stamps[a];
            this._manageStamp(c);
          }
        }
      }),
      (g.prototype._getBoundingRect = function () {
        var a = this.element.getBoundingClientRect(),
          b = this.size;
        this._boundingRect = {
          left: a.left + b.paddingLeft + b.borderLeftWidth,
          top: a.top + b.paddingTop + b.borderTopWidth,
          right: a.right - (b.paddingRight + b.borderRightWidth),
          bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth),
        };
      }),
      (g.prototype._manageStamp = j),
      (g.prototype._getElementOffset = function (a) {
        var b = a.getBoundingClientRect(),
          c = this._boundingRect,
          e = d(a),
          f = {
            left: b.left - c.left - e.marginLeft,
            top: b.top - c.top - e.marginTop,
            right: c.right - b.right - e.marginRight,
            bottom: c.bottom - b.bottom - e.marginBottom,
          };
        return f;
      }),
      (g.prototype.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
      }),
      (g.prototype.bindResize = function () {
        this.isResizeBound ||
          (b.bind(a, "resize", this), (this.isResizeBound = !0));
      }),
      (g.prototype.unbindResize = function () {
        this.isResizeBound && b.unbind(a, "resize", this),
          (this.isResizeBound = !1);
      }),
      (g.prototype.onresize = function () {
        function a() {
          b.resize(), delete b.resizeTimeout;
        }
        this.resizeTimeout && clearTimeout(this.resizeTimeout);
        var b = this;
        this.resizeTimeout = setTimeout(a, 100);
      }),
      (g.prototype.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (g.prototype.needsResizeLayout = function () {
        var a = d(this.element),
          b = this.size && a;
        return b && a.innerWidth !== this.size.innerWidth;
      }),
      (g.prototype.addItems = function (a) {
        var b = this._itemize(a);
        return b.length && (this.items = this.items.concat(b)), b;
      }),
      (g.prototype.appended = function (a) {
        var b = this.addItems(a);
        b.length && (this.layoutItems(b, !0), this.reveal(b));
      }),
      (g.prototype.prepended = function (a) {
        var b = this._itemize(a);
        if (b.length) {
          var c = this.items.slice(0);
          (this.items = b.concat(c)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(b, !0),
            this.reveal(b),
            this.layoutItems(c);
        }
      }),
      (g.prototype.reveal = function (a) {
        this._emitCompleteOnItems("reveal", a);
        for (var b = a && a.length, c = 0; b && b > c; c++) {
          var d = a[c];
          d.reveal();
        }
      }),
      (g.prototype.hide = function (a) {
        this._emitCompleteOnItems("hide", a);
        for (var b = a && a.length, c = 0; b && b > c; c++) {
          var d = a[c];
          d.hide();
        }
      }),
      (g.prototype.revealItemElements = function (a) {
        var b = this.getItems(a);
        this.reveal(b);
      }),
      (g.prototype.hideItemElements = function (a) {
        var b = this.getItems(a);
        this.hide(b);
      }),
      (g.prototype.getItem = function (a) {
        for (var b = 0, c = this.items.length; c > b; b++) {
          var d = this.items[b];
          if (d.element === a) return d;
        }
      }),
      (g.prototype.getItems = function (a) {
        a = e.makeArray(a);
        for (var b = [], c = 0, d = a.length; d > c; c++) {
          var f = a[c],
            g = this.getItem(f);
          g && b.push(g);
        }
        return b;
      }),
      (g.prototype.remove = function (a) {
        var b = this.getItems(a);
        if ((this._emitCompleteOnItems("remove", b), b && b.length))
          for (var c = 0, d = b.length; d > c; c++) {
            var f = b[c];
            f.remove(), e.removeFrom(this.items, f);
          }
      }),
      (g.prototype.destroy = function () {
        var a = this.element.style;
        (a.height = ""), (a.position = ""), (a.width = "");
        for (var b = 0, c = this.items.length; c > b; b++) {
          var d = this.items[b];
          d.destroy();
        }
        this.unbindResize();
        var e = this.element.outlayerGUID;
        delete l[e],
          delete this.element.outlayerGUID,
          i && i.removeData(this.element, this.constructor.namespace);
      }),
      (g.data = function (a) {
        a = e.getQueryElement(a);
        var b = a && a.outlayerGUID;
        return b && l[b];
      }),
      (g.create = function (a, b) {
        function c() {
          g.apply(this, arguments);
        }
        return (
          Object.create
            ? (c.prototype = Object.create(g.prototype))
            : e.extend(c.prototype, g.prototype),
          (c.prototype.constructor = c),
          (c.defaults = e.extend({}, g.defaults)),
          e.extend(c.defaults, b),
          (c.prototype.settings = {}),
          (c.namespace = a),
          (c.data = g.data),
          (c.Item = function () {
            f.apply(this, arguments);
          }),
          (c.Item.prototype = new f()),
          e.htmlInit(c, a),
          i && i.bridget && i.bridget(a, c),
          c
        );
      }),
      (g.Item = f),
      g
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("isotope/js/item", ["outlayer/outlayer"], b)
      : "object" == typeof exports
      ? (module.exports = b(require("outlayer")))
      : ((a.Isotope = a.Isotope || {}), (a.Isotope.Item = b(a.Outlayer)));
  })(window, function (a) {
    "use strict";
    function b() {
      a.Item.apply(this, arguments);
    }
    (b.prototype = new a.Item()),
      (b.prototype._create = function () {
        (this.id = this.layout.itemGUID++),
          a.Item.prototype._create.call(this),
          (this.sortData = {});
      }),
      (b.prototype.updateSortData = function () {
        if (!this.isIgnored) {
          (this.sortData.id = this.id),
            (this.sortData["original-order"] = this.id),
            (this.sortData.random = Math.random());
          var a = this.layout.options.getSortData,
            b = this.layout._sorters;
          for (var c in a) {
            var d = b[c];
            this.sortData[c] = d(this.element, this);
          }
        }
      });
    var c = b.prototype.destroy;
    return (
      (b.prototype.destroy = function () {
        c.apply(this, arguments), this.css({ display: "" });
      }),
      b
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "isotope/js/layout-mode",
          ["get-size/get-size", "outlayer/outlayer"],
          b
        )
      : "object" == typeof exports
      ? (module.exports = b(require("get-size"), require("outlayer")))
      : ((a.Isotope = a.Isotope || {}),
        (a.Isotope.LayoutMode = b(a.getSize, a.Outlayer)));
  })(window, function (a, b) {
    "use strict";
    function c(a) {
      (this.isotope = a),
        a &&
          ((this.options = a.options[this.namespace]),
          (this.element = a.element),
          (this.items = a.filteredItems),
          (this.size = a.size));
    }
    return (
      (function () {
        function a(a) {
          return function () {
            return b.prototype[a].apply(this.isotope, arguments);
          };
        }
        for (
          var d = [
              "_resetLayout",
              "_getItemLayoutPosition",
              "_manageStamp",
              "_getContainerSize",
              "_getElementOffset",
              "needsResizeLayout",
            ],
            e = 0,
            f = d.length;
          f > e;
          e++
        ) {
          var g = d[e];
          c.prototype[g] = a(g);
        }
      })(),
      (c.prototype.needsVerticalResizeLayout = function () {
        var b = a(this.isotope.element),
          c = this.isotope.size && b;
        return c && b.innerHeight != this.isotope.size.innerHeight;
      }),
      (c.prototype._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments);
      }),
      (c.prototype.getColumnWidth = function () {
        this.getSegmentSize("column", "Width");
      }),
      (c.prototype.getRowHeight = function () {
        this.getSegmentSize("row", "Height");
      }),
      (c.prototype.getSegmentSize = function (a, b) {
        var c = a + b,
          d = "outer" + b;
        if ((this._getMeasurement(c, d), !this[c])) {
          var e = this.getFirstItemSize();
          this[c] = (e && e[d]) || this.isotope.size["inner" + b];
        }
      }),
      (c.prototype.getFirstItemSize = function () {
        var b = this.isotope.filteredItems[0];
        return b && b.element && a(b.element);
      }),
      (c.prototype.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments);
      }),
      (c.prototype.getSize = function () {
        this.isotope.getSize(), (this.size = this.isotope.size);
      }),
      (c.modes = {}),
      (c.create = function (a, b) {
        function d() {
          c.apply(this, arguments);
        }
        return (
          (d.prototype = new c()),
          b && (d.options = b),
          (d.prototype.namespace = a),
          (c.modes[a] = d),
          d
        );
      }),
      c
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "masonry/masonry",
          ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"],
          b
        )
      : "object" == typeof exports
      ? (module.exports = b(
          require("outlayer"),
          require("get-size"),
          require("fizzy-ui-utils")
        ))
      : (a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils));
  })(window, function (a, b, c) {
    var d = a.create("masonry");
    return (
      (d.prototype._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns();
        var a = this.cols;
        for (this.colYs = []; a--; ) this.colYs.push(0);
        this.maxY = 0;
      }),
      (d.prototype.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var a = this.items[0],
            c = a && a.element;
          this.columnWidth = (c && b(c).outerWidth) || this.containerWidth;
        }
        var d = (this.columnWidth += this.gutter),
          e = this.containerWidth + this.gutter,
          f = e / d,
          g = d - (e % d),
          h = g && 1 > g ? "round" : "floor";
        (f = Math[h](f)), (this.cols = Math.max(f, 1));
      }),
      (d.prototype.getContainerWidth = function () {
        var a = this.options.isFitWidth
            ? this.element.parentNode
            : this.element,
          c = b(a);
        this.containerWidth = c && c.innerWidth;
      }),
      (d.prototype._getItemLayoutPosition = function (a) {
        a.getSize();
        var b = a.size.outerWidth % this.columnWidth,
          d = b && 1 > b ? "round" : "ceil",
          e = Math[d](a.size.outerWidth / this.columnWidth);
        e = Math.min(e, this.cols);
        for (
          var f = this._getColGroup(e),
            g = Math.min.apply(Math, f),
            h = c.indexOf(f, g),
            i = { x: this.columnWidth * h, y: g },
            j = g + a.size.outerHeight,
            k = this.cols + 1 - f.length,
            l = 0;
          k > l;
          l++
        )
          this.colYs[h + l] = j;
        return i;
      }),
      (d.prototype._getColGroup = function (a) {
        if (2 > a) return this.colYs;
        for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
          var e = this.colYs.slice(d, d + a);
          b[d] = Math.max.apply(Math, e);
        }
        return b;
      }),
      (d.prototype._manageStamp = function (a) {
        var c = b(a),
          d = this._getElementOffset(a),
          e = this.options.isOriginLeft ? d.left : d.right,
          f = e + c.outerWidth,
          g = Math.floor(e / this.columnWidth);
        g = Math.max(0, g);
        var h = Math.floor(f / this.columnWidth);
        (h -= f % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h));
        for (
          var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight,
            j = g;
          h >= j;
          j++
        )
          this.colYs[j] = Math.max(i, this.colYs[j]);
      }),
      (d.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var a = { height: this.maxY };
        return (
          this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a
        );
      }),
      (d.prototype._getContainerFitWidth = function () {
        for (var a = 0, b = this.cols; --b && 0 === this.colYs[b]; ) a++;
        return (this.cols - a) * this.columnWidth - this.gutter;
      }),
      (d.prototype.needsResizeLayout = function () {
        var a = this.containerWidth;
        return this.getContainerWidth(), a !== this.containerWidth;
      }),
      d
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "isotope/js/layout-modes/masonry",
          ["../layout-mode", "masonry/masonry"],
          b
        )
      : "object" == typeof exports
      ? (module.exports = b(
          require("../layout-mode"),
          require("masonry-layout")
        ))
      : b(a.Isotope.LayoutMode, a.Masonry);
  })(window, function (a, b) {
    "use strict";
    function c(a, b) {
      for (var c in b) a[c] = b[c];
      return a;
    }
    var d = a.create("masonry"),
      e = d.prototype._getElementOffset,
      f = d.prototype.layout,
      g = d.prototype._getMeasurement;
    c(d.prototype, b.prototype),
      (d.prototype._getElementOffset = e),
      (d.prototype.layout = f),
      (d.prototype._getMeasurement = g);
    var h = d.prototype.measureColumns;
    d.prototype.measureColumns = function () {
      (this.items = this.isotope.filteredItems), h.call(this);
    };
    var i = d.prototype._manageStamp;
    return (
      (d.prototype._manageStamp = function () {
        (this.options.isOriginLeft = this.isotope.options.isOriginLeft),
          (this.options.isOriginTop = this.isotope.options.isOriginTop),
          i.apply(this, arguments);
      }),
      d
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], b)
      : "object" == typeof exports
      ? (module.exports = b(require("../layout-mode")))
      : b(a.Isotope.LayoutMode);
  })(window, function (a) {
    "use strict";
    var b = a.create("fitRows");
    return (
      (b.prototype._resetLayout = function () {
        (this.x = 0),
          (this.y = 0),
          (this.maxY = 0),
          this._getMeasurement("gutter", "outerWidth");
      }),
      (b.prototype._getItemLayoutPosition = function (a) {
        a.getSize();
        var b = a.size.outerWidth + this.gutter,
          c = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && b + this.x > c && ((this.x = 0), (this.y = this.maxY));
        var d = { x: this.x, y: this.y };
        return (
          (this.maxY = Math.max(this.maxY, this.y + a.size.outerHeight)),
          (this.x += b),
          d
        );
      }),
      (b.prototype._getContainerSize = function () {
        return { height: this.maxY };
      }),
      b
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], b)
      : "object" == typeof exports
      ? (module.exports = b(require("../layout-mode")))
      : b(a.Isotope.LayoutMode);
  })(window, function (a) {
    "use strict";
    var b = a.create("vertical", { horizontalAlignment: 0 });
    return (
      (b.prototype._resetLayout = function () {
        this.y = 0;
      }),
      (b.prototype._getItemLayoutPosition = function (a) {
        a.getSize();
        var b =
            (this.isotope.size.innerWidth - a.size.outerWidth) *
            this.options.horizontalAlignment,
          c = this.y;
        return (this.y += a.size.outerHeight), { x: b, y: c };
      }),
      (b.prototype._getContainerSize = function () {
        return { height: this.y };
      }),
      b
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          [
            "outlayer/outlayer",
            "get-size/get-size",
            "matches-selector/matches-selector",
            "fizzy-ui-utils/utils",
            "isotope/js/item",
            "isotope/js/layout-mode",
            "isotope/js/layout-modes/masonry",
            "isotope/js/layout-modes/fit-rows",
            "isotope/js/layout-modes/vertical",
          ],
          function (c, d, e, f, g, h) {
            return b(a, c, d, e, f, g, h);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("outlayer"),
          require("get-size"),
          require("desandro-matches-selector"),
          require("fizzy-ui-utils"),
          require("./item"),
          require("./layout-mode"),
          require("./layout-modes/masonry"),
          require("./layout-modes/fit-rows"),
          require("./layout-modes/vertical")
        ))
      : (a.Isotope = b(
          a,
          a.Outlayer,
          a.getSize,
          a.matchesSelector,
          a.fizzyUIUtils,
          a.Isotope.Item,
          a.Isotope.LayoutMode
        ));
  })(window, function (a, b, c, d, e, f, g) {
    function h(a, b) {
      return function (c, d) {
        for (var e = 0, f = a.length; f > e; e++) {
          var g = a[e],
            h = c.sortData[g],
            i = d.sortData[g];
          if (h > i || i > h) {
            var j = void 0 !== b[g] ? b[g] : b,
              k = j ? 1 : -1;
            return (h > i ? 1 : -1) * k;
          }
        }
        return 0;
      };
    }
    var i = a.jQuery,
      j = String.prototype.trim
        ? function (a) {
            return a.trim();
          }
        : function (a) {
            return a.replace(/^\s+|\s+$/g, "");
          },
      k = document.documentElement,
      l = k.textContent
        ? function (a) {
            return a.textContent;
          }
        : function (a) {
            return a.innerText;
          },
      m = b.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0,
      });
    (m.Item = f),
      (m.LayoutMode = g),
      (m.prototype._create = function () {
        (this.itemGUID = 0),
          (this._sorters = {}),
          this._getSorters(),
          b.prototype._create.call(this),
          (this.modes = {}),
          (this.filteredItems = this.items),
          (this.sortHistory = ["original-order"]);
        for (var a in g.modes) this._initLayoutMode(a);
      }),
      (m.prototype.reloadItems = function () {
        (this.itemGUID = 0), b.prototype.reloadItems.call(this);
      }),
      (m.prototype._itemize = function () {
        for (
          var a = b.prototype._itemize.apply(this, arguments),
            c = 0,
            d = a.length;
          d > c;
          c++
        ) {
          var e = a[c];
          e.id = this.itemGUID++;
        }
        return this._updateItemsSortData(a), a;
      }),
      (m.prototype._initLayoutMode = function (a) {
        var b = g.modes[a],
          c = this.options[a] || {};
        (this.options[a] = b.options ? e.extend(b.options, c) : c),
          (this.modes[a] = new b(this));
      }),
      (m.prototype.layout = function () {
        return !this._isLayoutInited && this.options.isInitLayout
          ? void this.arrange()
          : void this._layout();
      }),
      (m.prototype._layout = function () {
        var a = this._getIsInstant();
        this._resetLayout(),
          this._manageStamps(),
          this.layoutItems(this.filteredItems, a),
          (this._isLayoutInited = !0);
      }),
      (m.prototype.arrange = function (a) {
        function b() {
          d.reveal(c.needReveal), d.hide(c.needHide);
        }
        this.option(a), this._getIsInstant();
        var c = this._filter(this.items);
        this.filteredItems = c.matches;
        var d = this;
        this._bindArrangeComplete(),
          this._isInstant ? this._noTransition(b) : b(),
          this._sort(),
          this._layout();
      }),
      (m.prototype._init = m.prototype.arrange),
      (m.prototype._getIsInstant = function () {
        var a =
          void 0 !== this.options.isLayoutInstant
            ? this.options.isLayoutInstant
            : !this._isLayoutInited;
        return (this._isInstant = a), a;
      }),
      (m.prototype._bindArrangeComplete = function () {
        function a() {
          b &&
            c &&
            d &&
            e.dispatchEvent("arrangeComplete", null, [e.filteredItems]);
        }
        var b,
          c,
          d,
          e = this;
        this.once("layoutComplete", function () {
          (b = !0), a();
        }),
          this.once("hideComplete", function () {
            (c = !0), a();
          }),
          this.once("revealComplete", function () {
            (d = !0), a();
          });
      }),
      (m.prototype._filter = function (a) {
        var b = this.options.filter;
        b = b || "*";
        for (
          var c = [],
            d = [],
            e = [],
            f = this._getFilterTest(b),
            g = 0,
            h = a.length;
          h > g;
          g++
        ) {
          var i = a[g];
          if (!i.isIgnored) {
            var j = f(i);
            j && c.push(i),
              j && i.isHidden ? d.push(i) : j || i.isHidden || e.push(i);
          }
        }
        return { matches: c, needReveal: d, needHide: e };
      }),
      (m.prototype._getFilterTest = function (a) {
        return i && this.options.isJQueryFiltering
          ? function (b) {
              return i(b.element).is(a);
            }
          : "function" == typeof a
          ? function (b) {
              return a(b.element);
            }
          : function (b) {
              return d(b.element, a);
            };
      }),
      (m.prototype.updateSortData = function (a) {
        var b;
        a ? ((a = e.makeArray(a)), (b = this.getItems(a))) : (b = this.items),
          this._getSorters(),
          this._updateItemsSortData(b);
      }),
      (m.prototype._getSorters = function () {
        var a = this.options.getSortData;
        for (var b in a) {
          var c = a[b];
          this._sorters[b] = n(c);
        }
      }),
      (m.prototype._updateItemsSortData = function (a) {
        for (var b = a && a.length, c = 0; b && b > c; c++) {
          var d = a[c];
          d.updateSortData();
        }
      });
    var n = (function () {
      function a(a) {
        if ("string" != typeof a) return a;
        var c = j(a).split(" "),
          d = c[0],
          e = d.match(/^\[(.+)\]$/),
          f = e && e[1],
          g = b(f, d),
          h = m.sortDataParsers[c[1]];
        return (a = h
          ? function (a) {
              return a && h(g(a));
            }
          : function (a) {
              return a && g(a);
            });
      }
      function b(a, b) {
        var c;
        return (c = a
          ? function (b) {
              return b.getAttribute(a);
            }
          : function (a) {
              var c = a.querySelector(b);
              return c && l(c);
            });
      }
      return a;
    })();
    (m.sortDataParsers = {
      parseInt: function (a) {
        return parseInt(a, 10);
      },
      parseFloat: function (a) {
        return parseFloat(a);
      },
    }),
      (m.prototype._sort = function () {
        var a = this.options.sortBy;
        if (a) {
          var b = [].concat.apply(a, this.sortHistory),
            c = h(b, this.options.sortAscending);
          this.filteredItems.sort(c),
            a != this.sortHistory[0] && this.sortHistory.unshift(a);
        }
      }),
      (m.prototype._mode = function () {
        var a = this.options.layoutMode,
          b = this.modes[a];
        if (!b) throw new Error("No layout mode: " + a);
        return (b.options = this.options[a]), b;
      }),
      (m.prototype._resetLayout = function () {
        b.prototype._resetLayout.call(this), this._mode()._resetLayout();
      }),
      (m.prototype._getItemLayoutPosition = function (a) {
        return this._mode()._getItemLayoutPosition(a);
      }),
      (m.prototype._manageStamp = function (a) {
        this._mode()._manageStamp(a);
      }),
      (m.prototype._getContainerSize = function () {
        return this._mode()._getContainerSize();
      }),
      (m.prototype.needsResizeLayout = function () {
        return this._mode().needsResizeLayout();
      }),
      (m.prototype.appended = function (a) {
        var b = this.addItems(a);
        if (b.length) {
          var c = this._filterRevealAdded(b);
          this.filteredItems = this.filteredItems.concat(c);
        }
      }),
      (m.prototype.prepended = function (a) {
        var b = this._itemize(a);
        if (b.length) {
          this._resetLayout(), this._manageStamps();
          var c = this._filterRevealAdded(b);
          this.layoutItems(this.filteredItems),
            (this.filteredItems = c.concat(this.filteredItems)),
            (this.items = b.concat(this.items));
        }
      }),
      (m.prototype._filterRevealAdded = function (a) {
        var b = this._filter(a);
        return (
          this.hide(b.needHide),
          this.reveal(b.matches),
          this.layoutItems(b.matches, !0),
          b.matches
        );
      }),
      (m.prototype.insert = function (a) {
        var b = this.addItems(a);
        if (b.length) {
          var c,
            d,
            e = b.length;
          for (c = 0; e > c; c++)
            (d = b[c]), this.element.appendChild(d.element);
          var f = this._filter(b).matches;
          for (c = 0; e > c; c++) b[c].isLayoutInstant = !0;
          for (this.arrange(), c = 0; e > c; c++) delete b[c].isLayoutInstant;
          this.reveal(f);
        }
      });
    var o = m.prototype.remove;
    return (
      (m.prototype.remove = function (a) {
        a = e.makeArray(a);
        var b = this.getItems(a);
        o.call(this, a);
        var c = b && b.length;
        if (c)
          for (var d = 0; c > d; d++) {
            var f = b[d];
            e.removeFrom(this.filteredItems, f);
          }
      }),
      (m.prototype.shuffle = function () {
        for (var a = 0, b = this.items.length; b > a; a++) {
          var c = this.items[a];
          c.sortData.random = Math.random();
        }
        (this.options.sortBy = "random"), this._sort(), this._layout();
      }),
      (m.prototype._noTransition = function (a) {
        var b = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var c = a.call(this);
        return (this.options.transitionDuration = b), c;
      }),
      (m.prototype.getFilteredItemElements = function () {
        for (var a = [], b = 0, c = this.filteredItems.length; c > b; b++)
          a.push(this.filteredItems[b].element);
        return a;
      }),
      m
    );
  });

//	04. MAGNIFIC POPUP

/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
!(function (e) {
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : e(
        "object" == typeof exports
          ? require("jquery")
          : window.jQuery || window.Zepto
      );
})(function (e) {
  var t,
    n,
    i,
    o,
    r,
    a,
    s = "Close",
    l = "BeforeClose",
    c = "AfterClose",
    d = "BeforeAppend",
    u = "MarkupParse",
    p = "Open",
    f = "Change",
    m = "mfp",
    g = "." + m,
    v = "mfp-ready",
    h = "mfp-removing",
    y = "mfp-prevent-close",
    C = function () {},
    w = !!window.jQuery,
    b = e(window),
    I = function (e, n) {
      t.ev.on(m + e + g, n);
    },
    x = function (t, n, i, o) {
      var r = document.createElement("div");
      return (
        (r.className = "mfp-" + t),
        i && (r.innerHTML = i),
        o ? n && n.appendChild(r) : ((r = e(r)), n && r.appendTo(n)),
        r
      );
    },
    k = function (n, i) {
      t.ev.triggerHandler(m + n, i),
        t.st.callbacks &&
          ((n = n.charAt(0).toLowerCase() + n.slice(1)),
          t.st.callbacks[n] &&
            t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]));
    },
    T = function (n) {
      return (
        (n === a && t.currTemplate.closeBtn) ||
          ((t.currTemplate.closeBtn = e(
            t.st.closeMarkup.replace("%title%", t.st.tClose)
          )),
          (a = n)),
        t.currTemplate.closeBtn
      );
    },
    _ = function () {
      e.magnificPopup.instance ||
        ((t = new C()), t.init(), (e.magnificPopup.instance = t));
    },
    P = function () {
      var e = document.createElement("p").style,
        t = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== e.transition) return !0;
      for (; t.length; ) if (t.pop() + "Transition" in e) return !0;
      return !1;
    };
  (C.prototype = {
    constructor: C,
    init: function () {
      var n = navigator.appVersion;
      (t.isLowIE = t.isIE8 = document.all && !document.addEventListener),
        (t.isAndroid = /android/gi.test(n)),
        (t.isIOS = /iphone|ipad|ipod/gi.test(n)),
        (t.supportsTransition = P()),
        (t.probablyMobile =
          t.isAndroid ||
          t.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (i = e(document)),
        (t.popupsCache = {});
    },
    open: function (n) {
      var o;
      if (n.isObj === !1) {
        (t.items = n.items.toArray()), (t.index = 0);
        var a,
          s = n.items;
        for (o = 0; o < s.length; o++)
          if (((a = s[o]), a.parsed && (a = a.el[0]), a === n.el[0])) {
            t.index = o;
            break;
          }
      } else
        (t.items = e.isArray(n.items) ? n.items : [n.items]),
          (t.index = n.index || 0);
      if (t.isOpen) return void t.updateItemHTML();
      (t.types = []),
        (r = ""),
        n.mainEl && n.mainEl.length ? (t.ev = n.mainEl.eq(0)) : (t.ev = i),
        n.key
          ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}),
            (t.currTemplate = t.popupsCache[n.key]))
          : (t.currTemplate = {}),
        (t.st = e.extend(!0, {}, e.magnificPopup.defaults, n)),
        (t.fixedContentPos =
          "auto" === t.st.fixedContentPos
            ? !t.probablyMobile
            : t.st.fixedContentPos),
        t.st.modal &&
          ((t.st.closeOnContentClick = !1),
          (t.st.closeOnBgClick = !1),
          (t.st.showCloseBtn = !1),
          (t.st.enableEscapeKey = !1)),
        t.bgOverlay ||
          ((t.bgOverlay = x("bg").on("click" + g, function () {
            t.close();
          })),
          (t.wrap = x("wrap")
            .attr("tabindex", -1)
            .on("click" + g, function (e) {
              t._checkIfClose(e.target) && t.close();
            })),
          (t.container = x("container", t.wrap))),
        (t.contentContainer = x("content")),
        t.st.preloader &&
          (t.preloader = x("preloader", t.container, t.st.tLoading));
      var l = e.magnificPopup.modules;
      for (o = 0; o < l.length; o++) {
        var c = l[o];
        (c = c.charAt(0).toUpperCase() + c.slice(1)), t["init" + c].call(t);
      }
      k("BeforeOpen"),
        t.st.showCloseBtn &&
          (t.st.closeBtnInside
            ? (I(u, function (e, t, n, i) {
                n.close_replaceWith = T(i.type);
              }),
              (r += " mfp-close-btn-in"))
            : t.wrap.append(T())),
        t.st.alignTop && (r += " mfp-align-top"),
        t.fixedContentPos
          ? t.wrap.css({
              overflow: t.st.overflowY,
              overflowX: "hidden",
              overflowY: t.st.overflowY,
            })
          : t.wrap.css({ top: b.scrollTop(), position: "absolute" }),
        (t.st.fixedBgPos === !1 ||
          ("auto" === t.st.fixedBgPos && !t.fixedContentPos)) &&
          t.bgOverlay.css({ height: i.height(), position: "absolute" }),
        t.st.enableEscapeKey &&
          i.on("keyup" + g, function (e) {
            27 === e.keyCode && t.close();
          }),
        b.on("resize" + g, function () {
          t.updateSize();
        }),
        t.st.closeOnContentClick || (r += " mfp-auto-cursor"),
        r && t.wrap.addClass(r);
      var d = (t.wH = b.height()),
        f = {};
      if (t.fixedContentPos && t._hasScrollBar(d)) {
        var m = t._getScrollbarSize();
        m && (f.marginRight = m);
      }
      t.fixedContentPos &&
        (t.isIE7
          ? e("body, html").css("overflow", "hidden")
          : (f.overflow = "hidden"));
      var h = t.st.mainClass;
      return (
        t.isIE7 && (h += " mfp-ie7"),
        h && t._addClassToMFP(h),
        t.updateItemHTML(),
        k("BuildControls"),
        e("html").css(f),
        t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)),
        (t._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          t.content
            ? (t._addClassToMFP(v), t._setFocus())
            : t.bgOverlay.addClass(v),
            i.on("focusin" + g, t._onFocusIn);
        }, 16),
        (t.isOpen = !0),
        t.updateSize(d),
        k(p),
        n
      );
    },
    close: function () {
      t.isOpen &&
        (k(l),
        (t.isOpen = !1),
        t.st.removalDelay && !t.isLowIE && t.supportsTransition
          ? (t._addClassToMFP(h),
            setTimeout(function () {
              t._close();
            }, t.st.removalDelay))
          : t._close());
    },
    _close: function () {
      k(s);
      var n = h + " " + v + " ";
      if (
        (t.bgOverlay.detach(),
        t.wrap.detach(),
        t.container.empty(),
        t.st.mainClass && (n += t.st.mainClass + " "),
        t._removeClassFromMFP(n),
        t.fixedContentPos)
      ) {
        var o = { marginRight: "" };
        t.isIE7 ? e("body, html").css("overflow", "") : (o.overflow = ""),
          e("html").css(o);
      }
      i.off("keyup" + g + " focusin" + g),
        t.ev.off(g),
        t.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        t.bgOverlay.attr("class", "mfp-bg"),
        t.container.attr("class", "mfp-container"),
        !t.st.showCloseBtn ||
          (t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0) ||
          (t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach()),
        t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(),
        (t.currItem = null),
        (t.content = null),
        (t.currTemplate = null),
        (t.prevHeight = 0),
        k(c);
    },
    updateSize: function (e) {
      if (t.isIOS) {
        var n = document.documentElement.clientWidth / window.innerWidth,
          i = window.innerHeight * n;
        t.wrap.css("height", i), (t.wH = i);
      } else t.wH = e || b.height();
      t.fixedContentPos || t.wrap.css("height", t.wH), k("Resize");
    },
    updateItemHTML: function () {
      var n = t.items[t.index];
      t.contentContainer.detach(),
        t.content && t.content.detach(),
        n.parsed || (n = t.parseEl(t.index));
      var i = n.type;
      if (
        (k("BeforeChange", [t.currItem ? t.currItem.type : "", i]),
        (t.currItem = n),
        !t.currTemplate[i])
      ) {
        var r = t.st[i] ? t.st[i].markup : !1;
        k("FirstMarkupParse", r),
          r ? (t.currTemplate[i] = e(r)) : (t.currTemplate[i] = !0);
      }
      o && o !== n.type && t.container.removeClass("mfp-" + o + "-holder");
      var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](
        n,
        t.currTemplate[i]
      );
      t.appendContent(a, i),
        (n.preloaded = !0),
        k(f, n),
        (o = n.type),
        t.container.prepend(t.contentContainer),
        k("AfterChange");
    },
    appendContent: function (e, n) {
      (t.content = e),
        e
          ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0
            ? t.content.find(".mfp-close").length || t.content.append(T())
            : (t.content = e)
          : (t.content = ""),
        k(d),
        t.container.addClass("mfp-" + n + "-holder"),
        t.contentContainer.append(t.content);
    },
    parseEl: function (n) {
      var i,
        o = t.items[n];
      if (
        (o.tagName
          ? (o = { el: e(o) })
          : ((i = o.type), (o = { data: o, src: o.src })),
        o.el)
      ) {
        for (var r = t.types, a = 0; a < r.length; a++)
          if (o.el.hasClass("mfp-" + r[a])) {
            i = r[a];
            break;
          }
        (o.src = o.el.attr("data-mfp-src")),
          o.src || (o.src = o.el.attr("href"));
      }
      return (
        (o.type = i || t.st.type || "inline"),
        (o.index = n),
        (o.parsed = !0),
        (t.items[n] = o),
        k("ElementParse", o),
        t.items[n]
      );
    },
    addGroup: function (e, n) {
      var i = function (i) {
        (i.mfpEl = this), t._openClick(i, e, n);
      };
      n || (n = {});
      var o = "click.magnificPopup";
      (n.mainEl = e),
        n.items
          ? ((n.isObj = !0), e.off(o).on(o, i))
          : ((n.isObj = !1),
            n.delegate
              ? e.off(o).on(o, n.delegate, i)
              : ((n.items = e), e.off(o).on(o, i)));
    },
    _openClick: function (n, i, o) {
      var r =
        void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick;
      if (
        r ||
        !(2 === n.which || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey)
      ) {
        var a =
          void 0 !== o.disableOn
            ? o.disableOn
            : e.magnificPopup.defaults.disableOn;
        if (a)
          if (e.isFunction(a)) {
            if (!a.call(t)) return !0;
          } else if (b.width() < a) return !0;
        n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()),
          (o.el = e(n.mfpEl)),
          o.delegate && (o.items = i.find(o.delegate)),
          t.open(o);
      }
    },
    updateStatus: function (e, i) {
      if (t.preloader) {
        n !== e && t.container.removeClass("mfp-s-" + n),
          i || "loading" !== e || (i = t.st.tLoading);
        var o = { status: e, text: i };
        k("UpdateStatus", o),
          (e = o.status),
          (i = o.text),
          t.preloader.html(i),
          t.preloader.find("a").on("click", function (e) {
            e.stopImmediatePropagation();
          }),
          t.container.addClass("mfp-s-" + e),
          (n = e);
      }
    },
    _checkIfClose: function (n) {
      if (!e(n).hasClass(y)) {
        var i = t.st.closeOnContentClick,
          o = t.st.closeOnBgClick;
        if (i && o) return !0;
        if (
          !t.content ||
          e(n).hasClass("mfp-close") ||
          (t.preloader && n === t.preloader[0])
        )
          return !0;
        if (n === t.content[0] || e.contains(t.content[0], n)) {
          if (i) return !0;
        } else if (o && e.contains(document, n)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (e) {
      t.bgOverlay.addClass(e), t.wrap.addClass(e);
    },
    _removeClassFromMFP: function (e) {
      this.bgOverlay.removeClass(e), t.wrap.removeClass(e);
    },
    _hasScrollBar: function (e) {
      return (
        (t.isIE7 ? i.height() : document.body.scrollHeight) > (e || b.height())
      );
    },
    _setFocus: function () {
      (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus();
    },
    _onFocusIn: function (n) {
      return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target)
        ? void 0
        : (t._setFocus(), !1);
    },
    _parseMarkup: function (t, n, i) {
      var o;
      i.data && (n = e.extend(i.data, n)),
        k(u, [t, n, i]),
        e.each(n, function (n, i) {
          if (void 0 === i || i === !1) return !0;
          if (((o = n.split("_")), o.length > 1)) {
            var r = t.find(g + "-" + o[0]);
            if (r.length > 0) {
              var a = o[1];
              "replaceWith" === a
                ? r[0] !== i[0] && r.replaceWith(i)
                : "img" === a
                ? r.is("img")
                  ? r.attr("src", i)
                  : r.replaceWith(
                      e("<img>").attr("src", i).attr("class", r.attr("class"))
                    )
                : r.attr(o[1], i);
            }
          } else t.find(g + "-" + n).html(i);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === t.scrollbarSize) {
        var e = document.createElement("div");
        (e.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(e),
          (t.scrollbarSize = e.offsetWidth - e.clientWidth),
          document.body.removeChild(e);
      }
      return t.scrollbarSize;
    },
  }),
    (e.magnificPopup = {
      instance: null,
      proto: C.prototype,
      modules: [],
      open: function (t, n) {
        return (
          _(),
          (t = t ? e.extend(!0, {}, t) : {}),
          (t.isObj = !0),
          (t.index = n || 0),
          this.instance.open(t)
        );
      },
      close: function () {
        return e.magnificPopup.instance && e.magnificPopup.instance.close();
      },
      registerModule: function (t, n) {
        n.options && (e.magnificPopup.defaults[t] = n.options),
          e.extend(this.proto, n.proto),
          this.modules.push(t);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0,
      },
    }),
    (e.fn.magnificPopup = function (n) {
      _();
      var i = e(this);
      if ("string" == typeof n)
        if ("open" === n) {
          var o,
            r = w ? i.data("magnificPopup") : i[0].magnificPopup,
            a = parseInt(arguments[1], 10) || 0;
          r.items
            ? (o = r.items[a])
            : ((o = i), r.delegate && (o = o.find(r.delegate)), (o = o.eq(a))),
            t._openClick({ mfpEl: o }, i, r);
        } else
          t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
      else
        (n = e.extend(!0, {}, n)),
          w ? i.data("magnificPopup", n) : (i[0].magnificPopup = n),
          t.addGroup(i, n);
      return i;
    });
  var S,
    E,
    z,
    O = "inline",
    M = function () {
      z && (E.after(z.addClass(S)).detach(), (z = null));
    };
  e.magnificPopup.registerModule(O, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        t.types.push(O),
          I(s + "." + O, function () {
            M();
          });
      },
      getInline: function (n, i) {
        if ((M(), n.src)) {
          var o = t.st.inline,
            r = e(n.src);
          if (r.length) {
            var a = r[0].parentNode;
            a &&
              a.tagName &&
              (E || ((S = o.hiddenClass), (E = x(S)), (S = "mfp-" + S)),
              (z = r.after(E).detach().removeClass(S))),
              t.updateStatus("ready");
          } else t.updateStatus("error", o.tNotFound), (r = e("<div>"));
          return (n.inlineElement = r), r;
        }
        return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i;
      },
    },
  });
  var B,
    L = "ajax",
    H = function () {
      B && e(document.body).removeClass(B);
    },
    A = function () {
      H(), t.req && t.req.abort();
    };
  e.magnificPopup.registerModule(L, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax: function () {
        t.types.push(L),
          (B = t.st.ajax.cursor),
          I(s + "." + L, A),
          I("BeforeChange." + L, A);
      },
      getAjax: function (n) {
        B && e(document.body).addClass(B), t.updateStatus("loading");
        var i = e.extend(
          {
            url: n.src,
            success: function (i, o, r) {
              var a = { data: i, xhr: r };
              k("ParseAjax", a),
                t.appendContent(e(a.data), L),
                (n.finished = !0),
                H(),
                t._setFocus(),
                setTimeout(function () {
                  t.wrap.addClass(v);
                }, 16),
                t.updateStatus("ready"),
                k("AjaxContentAdded");
            },
            error: function () {
              H(),
                (n.finished = n.loadError = !0),
                t.updateStatus(
                  "error",
                  t.st.ajax.tError.replace("%url%", n.src)
                );
            },
          },
          t.st.ajax.settings
        );
        return (t.req = e.ajax(i)), "";
      },
    },
  });
  var F,
    j = function (n) {
      if (n.data && void 0 !== n.data.title) return n.data.title;
      var i = t.st.image.titleSrc;
      if (i) {
        if (e.isFunction(i)) return i.call(t, n);
        if (n.el) return n.el.attr(i) || "";
      }
      return "";
    };
  e.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage: function () {
        var n = t.st.image,
          i = ".image";
        t.types.push("image"),
          I(p + i, function () {
            "image" === t.currItem.type &&
              n.cursor &&
              e(document.body).addClass(n.cursor);
          }),
          I(s + i, function () {
            n.cursor && e(document.body).removeClass(n.cursor),
              b.off("resize" + g);
          }),
          I("Resize" + i, t.resizeImage),
          t.isLowIE && I("AfterChange", t.resizeImage);
      },
      resizeImage: function () {
        var e = t.currItem;
        if (e && e.img && t.st.image.verticalFit) {
          var n = 0;
          t.isLowIE &&
            (n =
              parseInt(e.img.css("padding-top"), 10) +
              parseInt(e.img.css("padding-bottom"), 10)),
            e.img.css("max-height", t.wH - n);
        }
      },
      _onImageHasSize: function (e) {
        e.img &&
          ((e.hasSize = !0),
          F && clearInterval(F),
          (e.isCheckingImgSize = !1),
          k("ImageHasSize", e),
          e.imgHidden &&
            (t.content && t.content.removeClass("mfp-loading"),
            (e.imgHidden = !1)));
      },
      findImageSize: function (e) {
        var n = 0,
          i = e.img[0],
          o = function (r) {
            F && clearInterval(F),
              (F = setInterval(function () {
                return i.naturalWidth > 0
                  ? void t._onImageHasSize(e)
                  : (n > 200 && clearInterval(F),
                    n++,
                    void (3 === n
                      ? o(10)
                      : 40 === n
                      ? o(50)
                      : 100 === n && o(500)));
              }, r));
          };
        o(1);
      },
      getImage: function (n, i) {
        var o = 0,
          r = function () {
            n &&
              (n.img[0].complete
                ? (n.img.off(".mfploader"),
                  n === t.currItem &&
                    (t._onImageHasSize(n), t.updateStatus("ready")),
                  (n.hasSize = !0),
                  (n.loaded = !0),
                  k("ImageLoadComplete"))
                : (o++, 200 > o ? setTimeout(r, 100) : a()));
          },
          a = function () {
            n &&
              (n.img.off(".mfploader"),
              n === t.currItem &&
                (t._onImageHasSize(n),
                t.updateStatus("error", s.tError.replace("%url%", n.src))),
              (n.hasSize = !0),
              (n.loaded = !0),
              (n.loadError = !0));
          },
          s = t.st.image,
          l = i.find(".mfp-img");
        if (l.length) {
          var c = document.createElement("img");
          (c.className = "mfp-img"),
            n.el &&
              n.el.find("img").length &&
              (c.alt = n.el.find("img").attr("alt")),
            (n.img = e(c).on("load.mfploader", r).on("error.mfploader", a)),
            (c.src = n.src),
            l.is("img") && (n.img = n.img.clone()),
            (c = n.img[0]),
            c.naturalWidth > 0 ? (n.hasSize = !0) : c.width || (n.hasSize = !1);
        }
        return (
          t._parseMarkup(i, { title: j(n), img_replaceWith: n.img }, n),
          t.resizeImage(),
          n.hasSize
            ? (F && clearInterval(F),
              n.loadError
                ? (i.addClass("mfp-loading"),
                  t.updateStatus("error", s.tError.replace("%url%", n.src)))
                : (i.removeClass("mfp-loading"), t.updateStatus("ready")),
              i)
            : (t.updateStatus("loading"),
              (n.loading = !0),
              n.hasSize ||
                ((n.imgHidden = !0),
                i.addClass("mfp-loading"),
                t.findImageSize(n)),
              i)
        );
      },
    },
  });
  var N,
    W = function () {
      return (
        void 0 === N &&
          (N = void 0 !== document.createElement("p").style.MozTransform),
        N
      );
    };
  e.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (e) {
        return e.is("img") ? e : e.find("img");
      },
    },
    proto: {
      initZoom: function () {
        var e,
          n = t.st.zoom,
          i = ".zoom";
        if (n.enabled && t.supportsTransition) {
          var o,
            r,
            a = n.duration,
            c = function (e) {
              var t = e
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                i = "all " + n.duration / 1e3 + "s " + n.easing,
                o = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden",
                },
                r = "transition";
              return (
                (o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i),
                t.css(o),
                t
              );
            },
            d = function () {
              t.content.css("visibility", "visible");
            };
          I("BuildControls" + i, function () {
            if (t._allowZoom()) {
              if (
                (clearTimeout(o),
                t.content.css("visibility", "hidden"),
                (e = t._getItemToZoom()),
                !e)
              )
                return void d();
              (r = c(e)),
                r.css(t._getOffset()),
                t.wrap.append(r),
                (o = setTimeout(function () {
                  r.css(t._getOffset(!0)),
                    (o = setTimeout(function () {
                      d(),
                        setTimeout(function () {
                          r.remove(), (e = r = null), k("ZoomAnimationEnded");
                        }, 16);
                    }, a));
                }, 16));
            }
          }),
            I(l + i, function () {
              if (t._allowZoom()) {
                if ((clearTimeout(o), (t.st.removalDelay = a), !e)) {
                  if (((e = t._getItemToZoom()), !e)) return;
                  r = c(e);
                }
                r.css(t._getOffset(!0)),
                  t.wrap.append(r),
                  t.content.css("visibility", "hidden"),
                  setTimeout(function () {
                    r.css(t._getOffset());
                  }, 16);
              }
            }),
            I(s + i, function () {
              t._allowZoom() && (d(), r && r.remove(), (e = null));
            });
        }
      },
      _allowZoom: function () {
        return "image" === t.currItem.type;
      },
      _getItemToZoom: function () {
        return t.currItem.hasSize ? t.currItem.img : !1;
      },
      _getOffset: function (n) {
        var i;
        i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
        var o = i.offset(),
          r = parseInt(i.css("padding-top"), 10),
          a = parseInt(i.css("padding-bottom"), 10);
        o.top -= e(window).scrollTop() - r;
        var s = {
          width: i.width(),
          height: (w ? i.innerHeight() : i[0].offsetHeight) - a - r,
        };
        return (
          W()
            ? (s["-moz-transform"] = s.transform =
                "translate(" + o.left + "px," + o.top + "px)")
            : ((s.left = o.left), (s.top = o.top)),
          s
        );
      },
    },
  });
  var Z = "iframe",
    q = "//about:blank",
    R = function (e) {
      if (t.currTemplate[Z]) {
        var n = t.currTemplate[Z].find("iframe");
        n.length &&
          (e || (n[0].src = q),
          t.isIE8 && n.css("display", e ? "block" : "none"));
      }
    };
  e.magnificPopup.registerModule(Z, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
      },
    },
    proto: {
      initIframe: function () {
        t.types.push(Z),
          I("BeforeChange", function (e, t, n) {
            t !== n && (t === Z ? R() : n === Z && R(!0));
          }),
          I(s + "." + Z, function () {
            R();
          });
      },
      getIframe: function (n, i) {
        var o = n.src,
          r = t.st.iframe;
        e.each(r.patterns, function () {
          return o.indexOf(this.index) > -1
            ? (this.id &&
                (o =
                  "string" == typeof this.id
                    ? o.substr(
                        o.lastIndexOf(this.id) + this.id.length,
                        o.length
                      )
                    : this.id.call(this, o)),
              (o = this.src.replace("%id%", o)),
              !1)
            : void 0;
        });
        var a = {};
        return (
          r.srcAction && (a[r.srcAction] = o),
          t._parseMarkup(i, a, n),
          t.updateStatus("ready"),
          i
        );
      },
    },
  });
  var K = function (e) {
      var n = t.items.length;
      return e > n - 1 ? e - n : 0 > e ? n + e : e;
    },
    D = function (e, t, n) {
      return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n);
    };
  e.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },
    proto: {
      initGallery: function () {
        var n = t.st.gallery,
          o = ".mfp-gallery";
        return (
          (t.direction = !0),
          n && n.enabled
            ? ((r += " mfp-gallery"),
              I(p + o, function () {
                n.navigateByImgClick &&
                  t.wrap.on("click" + o, ".mfp-img", function () {
                    return t.items.length > 1 ? (t.next(), !1) : void 0;
                  }),
                  i.on("keydown" + o, function (e) {
                    37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next();
                  });
              }),
              I("UpdateStatus" + o, function (e, n) {
                n.text &&
                  (n.text = D(n.text, t.currItem.index, t.items.length));
              }),
              I(u + o, function (e, i, o, r) {
                var a = t.items.length;
                o.counter = a > 1 ? D(n.tCounter, r.index, a) : "";
              }),
              I("BuildControls" + o, function () {
                if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                  var i = n.arrowMarkup,
                    o = (t.arrowLeft = e(
                      i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")
                    ).addClass(y)),
                    r = (t.arrowRight = e(
                      i
                        .replace(/%title%/gi, n.tNext)
                        .replace(/%dir%/gi, "right")
                    ).addClass(y));
                  o.click(function () {
                    t.prev();
                  }),
                    r.click(function () {
                      t.next();
                    }),
                    t.container.append(o.add(r));
                }
              }),
              I(f + o, function () {
                t._preloadTimeout && clearTimeout(t._preloadTimeout),
                  (t._preloadTimeout = setTimeout(function () {
                    t.preloadNearbyImages(), (t._preloadTimeout = null);
                  }, 16));
              }),
              void I(s + o, function () {
                i.off(o),
                  t.wrap.off("click" + o),
                  (t.arrowRight = t.arrowLeft = null);
              }))
            : !1
        );
      },
      next: function () {
        (t.direction = !0), (t.index = K(t.index + 1)), t.updateItemHTML();
      },
      prev: function () {
        (t.direction = !1), (t.index = K(t.index - 1)), t.updateItemHTML();
      },
      goTo: function (e) {
        (t.direction = e >= t.index), (t.index = e), t.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var e,
          n = t.st.gallery.preload,
          i = Math.min(n[0], t.items.length),
          o = Math.min(n[1], t.items.length);
        for (e = 1; e <= (t.direction ? o : i); e++)
          t._preloadItem(t.index + e);
        for (e = 1; e <= (t.direction ? i : o); e++)
          t._preloadItem(t.index - e);
      },
      _preloadItem: function (n) {
        if (((n = K(n)), !t.items[n].preloaded)) {
          var i = t.items[n];
          i.parsed || (i = t.parseEl(n)),
            k("LazyLoad", i),
            "image" === i.type &&
              (i.img = e('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  i.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (i.hasSize = !0), (i.loadError = !0), k("LazyLoadError", i);
                })
                .attr("src", i.src)),
            (i.preloaded = !0);
        }
      },
    },
  });
  var U = "retina";
  e.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (e) {
        return e.src.replace(/\.\w+$/, function (e) {
          return "@2x" + e;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var e = t.st.retina,
            n = e.ratio;
          (n = isNaN(n) ? n() : n),
            n > 1 &&
              (I("ImageHasSize." + U, function (e, t) {
                t.img.css({
                  "max-width": t.img[0].naturalWidth / n,
                  width: "100%",
                });
              }),
              I("ElementParse." + U, function (t, i) {
                i.src = e.replaceSrc(i, n);
              }));
        }
      },
    },
  }),
    _();
});

// 05. STICKY SIDEBAR

/*!
 * Theia Sticky Sidebar v1.6.0
 * https://github.com/WeCodePixels/theia-sticky-sidebar
 *
 * Glues your website's sidebars, making them permanently visible while scrolling.
 *
 * Copyright 2013-2016 WeCodePixels and other contributors
 * Released under the MIT license
 */
!(function (i) {
  i.fn.theiaStickySidebar = function (t) {
    function o(t, o) {
      var a = e(t, o);
      a ||
        (console.log(
          "TSS: Body width smaller than options.minWidth. Init is delayed."
        ),
        i(document).scroll(
          (function (t, o) {
            return function (a) {
              var n = e(t, o);
              n && i(this).unbind(a);
            };
          })(t, o)
        ),
        i(window).resize(
          (function (t, o) {
            return function (a) {
              var n = e(t, o);
              n && i(this).unbind(a);
            };
          })(t, o)
        ));
    }
    function e(t, o) {
      return t.initialized === !0
        ? !0
        : i("body").width() < t.minWidth
        ? !1
        : (a(t, o), !0);
    }
    function a(t, o) {
      (t.initialized = !0),
        i("head").append(
          i(
            '<style>.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'
          )
        ),
        o.each(function () {
          function o() {
            (a.fixedScrollTop = 0),
              a.sidebar.css({ "min-height": "1px" }),
              a.stickySidebar.css({
                position: "static",
                width: "",
                transform: "none",
              });
          }
          function e(t) {
            var o = t.height();
            return (
              t.children().each(function () {
                o = Math.max(o, i(this).height());
              }),
              o
            );
          }
          var a = {};
          if (
            ((a.sidebar = i(this)),
            (a.options = t || {}),
            (a.container = i(a.options.containerSelector)),
            0 == a.container.length && (a.container = a.sidebar.parent()),
            a.sidebar.parents().css("-webkit-transform", "none"),
            a.sidebar.css({
              position: "relative",
              overflow: "visible",
              "-webkit-box-sizing": "border-box",
              "-moz-box-sizing": "border-box",
              "box-sizing": "border-box",
            }),
            (a.stickySidebar = a.sidebar.find(".theiaStickySidebar")),
            0 == a.stickySidebar.length)
          ) {
            var r = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
            a.sidebar
              .find("script")
              .filter(function (i, t) {
                return 0 === t.type.length || t.type.match(r);
              })
              .remove(),
              (a.stickySidebar = i("<div>")
                .addClass("theiaStickySidebar")
                .append(a.sidebar.children())),
              a.sidebar.append(a.stickySidebar);
          }
          (a.marginBottom = parseInt(a.sidebar.css("margin-bottom"))),
            (a.paddingTop = parseInt(a.sidebar.css("padding-top"))),
            (a.paddingBottom = parseInt(a.sidebar.css("padding-bottom")));
          var d = a.stickySidebar.offset().top,
            s = a.stickySidebar.outerHeight();
          a.stickySidebar.css("padding-top", 1),
            a.stickySidebar.css("padding-bottom", 1),
            (d -= a.stickySidebar.offset().top),
            (s = a.stickySidebar.outerHeight() - s - d),
            0 == d
              ? (a.stickySidebar.css("padding-top", 0),
                (a.stickySidebarPaddingTop = 0))
              : (a.stickySidebarPaddingTop = 1),
            0 == s
              ? (a.stickySidebar.css("padding-bottom", 0),
                (a.stickySidebarPaddingBottom = 0))
              : (a.stickySidebarPaddingBottom = 1),
            (a.previousScrollTop = null),
            (a.fixedScrollTop = 0),
            o(),
            (a.onScroll = function (a) {
              if (a.stickySidebar.is(":visible")) {
                if (i("body").width() < a.options.minWidth) return void o();
                if (a.options.disableOnResponsiveLayouts) {
                  var r = a.sidebar.outerWidth(
                    "none" == a.sidebar.css("float")
                  );
                  if (r + 50 > a.container.width()) return void o();
                }
                var d = i(document).scrollTop(),
                  s = "static";
                if (
                  d >=
                  a.sidebar.offset().top +
                    (a.paddingTop - a.options.additionalMarginTop)
                ) {
                  var c,
                    p = a.paddingTop + t.additionalMarginTop,
                    b =
                      a.paddingBottom +
                      a.marginBottom +
                      t.additionalMarginBottom,
                    l = a.sidebar.offset().top,
                    f = a.sidebar.offset().top + e(a.container),
                    h = 0 + t.additionalMarginTop,
                    g =
                      a.stickySidebar.outerHeight() + p + b <
                      i(window).height();
                  c = g
                    ? h + a.stickySidebar.outerHeight()
                    : i(window).height() -
                      a.marginBottom -
                      a.paddingBottom -
                      t.additionalMarginBottom;
                  var u = l - d + a.paddingTop,
                    S = f - d - a.paddingBottom - a.marginBottom,
                    y = a.stickySidebar.offset().top - d,
                    m = a.previousScrollTop - d;
                  "fixed" == a.stickySidebar.css("position") &&
                    "modern" == a.options.sidebarBehavior &&
                    (y += m),
                    "stick-to-top" == a.options.sidebarBehavior &&
                      (y = t.additionalMarginTop),
                    "stick-to-bottom" == a.options.sidebarBehavior &&
                      (y = c - a.stickySidebar.outerHeight()),
                    (y =
                      m > 0
                        ? Math.min(y, h)
                        : Math.max(y, c - a.stickySidebar.outerHeight())),
                    (y = Math.max(y, u)),
                    (y = Math.min(y, S - a.stickySidebar.outerHeight()));
                  var k = a.container.height() == a.stickySidebar.outerHeight();
                  s =
                    (k || y != h) &&
                    (k || y != c - a.stickySidebar.outerHeight())
                      ? d + y - a.sidebar.offset().top - a.paddingTop <=
                        t.additionalMarginTop
                        ? "static"
                        : "absolute"
                      : "fixed";
                }
                if ("fixed" == s) {
                  var v = i(document).scrollLeft();
                  a.stickySidebar.css({
                    position: "fixed",
                    width: n(a.stickySidebar) + "px",
                    transform: "translateY(" + y + "px)",
                    left:
                      a.sidebar.offset().left +
                      parseInt(a.sidebar.css("padding-left")) -
                      v +
                      "px",
                    top: "0px",
                  });
                } else if ("absolute" == s) {
                  var x = {};
                  "absolute" != a.stickySidebar.css("position") &&
                    ((x.position = "absolute"),
                    (x.transform =
                      "translateY(" +
                      (d +
                        y -
                        a.sidebar.offset().top -
                        a.stickySidebarPaddingTop -
                        a.stickySidebarPaddingBottom) +
                      "px)"),
                    (x.top = "0px")),
                    (x.width = n(a.stickySidebar) + "px"),
                    (x.left = ""),
                    a.stickySidebar.css(x);
                } else "static" == s && o();
                "static" != s &&
                  1 == a.options.updateSidebarHeight &&
                  a.sidebar.css({
                    "min-height":
                      a.stickySidebar.outerHeight() +
                      a.stickySidebar.offset().top -
                      a.sidebar.offset().top +
                      a.paddingBottom,
                  }),
                  (a.previousScrollTop = d);
              }
            }),
            a.onScroll(a),
            i(document).scroll(
              (function (i) {
                return function () {
                  i.onScroll(i);
                };
              })(a)
            ),
            i(window).resize(
              (function (i) {
                return function () {
                  i.stickySidebar.css({ position: "static" }), i.onScroll(i);
                };
              })(a)
            ),
            "undefined" != typeof ResizeSensor &&
              new ResizeSensor(
                a.stickySidebar[0],
                (function (i) {
                  return function () {
                    i.onScroll(i);
                  };
                })(a)
              );
        });
    }
    function n(i) {
      var t;
      try {
        t = i[0].getBoundingClientRect().width;
      } catch (o) {}
      return "undefined" == typeof t && (t = i.width()), t;
    }
    var r = {
      containerSelector: "",
      additionalMarginTop: 0,
      additionalMarginBottom: 0,
      updateSidebarHeight: !0,
      minWidth: 0,
      disableOnResponsiveLayouts: !0,
      sidebarBehavior: "modern",
    };
    (t = i.extend(r, t)),
      (t.additionalMarginTop = parseInt(t.additionalMarginTop) || 0),
      (t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0),
      o(t, this);
  };
})(jQuery);

//	06. RESIZESENSOR

!(function () {
  var e = function (t, i) {
    function s() {
      (this.q = []),
        (this.add = function (e) {
          this.q.push(e);
        });
      var e, t;
      this.call = function () {
        for (e = 0, t = this.q.length; e < t; e++) this.q[e].call();
      };
    }
    function o(e, t) {
      return e.currentStyle
        ? e.currentStyle[t]
        : window.getComputedStyle
        ? window.getComputedStyle(e, null).getPropertyValue(t)
        : e.style[t];
    }
    function n(e, t) {
      if (e.resizedAttached) {
        if (e.resizedAttached) return void e.resizedAttached.add(t);
      } else (e.resizedAttached = new s()), e.resizedAttached.add(t);
      (e.resizeSensor = document.createElement("div")),
        (e.resizeSensor.className = "resize-sensor");
      var i =
          "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;",
        n = "position: absolute; left: 0; top: 0; transition: 0s;";
      (e.resizeSensor.style.cssText = i),
        (e.resizeSensor.innerHTML =
          '<div class="resize-sensor-expand" style="' +
          i +
          '"><div style="' +
          n +
          '"></div></div><div class="resize-sensor-shrink" style="' +
          i +
          '"><div style="' +
          n +
          ' width: 200%; height: 200%"></div></div>'),
        e.appendChild(e.resizeSensor),
        { fixed: 1, absolute: 1 }[o(e, "position")] ||
          (e.style.position = "relative");
      var d,
        r,
        l = e.resizeSensor.childNodes[0],
        c = l.childNodes[0],
        h = e.resizeSensor.childNodes[1],
        a =
          (h.childNodes[0],
          function () {
            (c.style.width = l.offsetWidth + 10 + "px"),
              (c.style.height = l.offsetHeight + 10 + "px"),
              (l.scrollLeft = l.scrollWidth),
              (l.scrollTop = l.scrollHeight),
              (h.scrollLeft = h.scrollWidth),
              (h.scrollTop = h.scrollHeight),
              (d = e.offsetWidth),
              (r = e.offsetHeight);
          });
      a();
      var f = function () {
          e.resizedAttached && e.resizedAttached.call();
        },
        u = function (e, t, i) {
          e.attachEvent ? e.attachEvent("on" + t, i) : e.addEventListener(t, i);
        },
        p = function () {
          (e.offsetWidth == d && e.offsetHeight == r) || f(), a();
        };
      u(l, "scroll", p), u(h, "scroll", p);
    }
    var d = Object.prototype.toString.call(t),
      r =
        "[object Array]" === d ||
        "[object NodeList]" === d ||
        "[object HTMLCollection]" === d ||
        ("undefined" != typeof jQuery && t instanceof jQuery) ||
        ("undefined" != typeof Elements && t instanceof Elements);
    if (r) for (var l = 0, c = t.length; l < c; l++) n(t[l], i);
    else n(t, i);
    this.detach = function () {
      if (r) for (var i = 0, s = t.length; i < s; i++) e.detach(t[i]);
      else e.detach(t);
    };
  };
  (e.detach = function (e) {
    e.resizeSensor &&
      (e.removeChild(e.resizeSensor),
      delete e.resizeSensor,
      delete e.resizedAttached);
  }),
    "undefined" != typeof module && "undefined" != typeof module.exports
      ? (module.exports = e)
      : (window.ResizeSensor = e);
})();
//# sourceMappingURL=maps/ResizeSensor.min.js.map

// 07. JARALLAX

/*!
 * Name    : Just Another Parallax [Jarallax]
 * Version : 1.7.3
 * Author  : _nK https://nkdev.info
 * GitHub  : https://github.com/nk-o/jarallax
 */
!(function (e) {
  "use strict";
  function t() {
    (i = e.innerWidth || document.documentElement.clientWidth),
      (a = e.innerHeight || document.documentElement.clientHeight);
  }
  function n(e, t, n) {
    e.addEventListener
      ? e.addEventListener(t, n)
      : e.attachEvent("on" + t, function () {
          n.call(e);
        });
  }
  function o(n) {
    e.requestAnimationFrame(function () {
      "scroll" !== n.type && t();
      for (var e = 0, o = g.length; o > e; e++)
        "scroll" !== n.type && (g[e].coverImage(), g[e].clipContainer()),
          g[e].onScroll();
    });
  }
  Date.now ||
    (Date.now = function () {
      return new Date().getTime();
    }),
    e.requestAnimationFrame ||
      !(function () {
        for (
          var t = ["webkit", "moz"], n = 0;
          n < t.length && !e.requestAnimationFrame;
          ++n
        ) {
          var o = t[n];
          (e.requestAnimationFrame = e[o + "RequestAnimationFrame"]),
            (e.cancelAnimationFrame =
              e[o + "CancelAnimationFrame"] ||
              e[o + "CancelRequestAnimationFrame"]);
        }
        if (
          /iP(ad|hone|od).*OS 6/.test(e.navigator.userAgent) ||
          !e.requestAnimationFrame ||
          !e.cancelAnimationFrame
        ) {
          var i = 0;
          (e.requestAnimationFrame = function (e) {
            var t = Date.now(),
              n = Math.max(i + 16, t);
            return setTimeout(function () {
              e((i = n));
            }, n - t);
          }),
            (e.cancelAnimationFrame = clearTimeout);
        }
      })();
  var i,
    a,
    r = (function () {
      if (!e.getComputedStyle) return !1;
      var t,
        n = document.createElement("p"),
        o = {
          webkitTransform: "-webkit-transform",
          OTransform: "-o-transform",
          msTransform: "-ms-transform",
          MozTransform: "-moz-transform",
          transform: "transform",
        };
      (document.body || document.documentElement).insertBefore(n, null);
      for (var i in o)
        "undefined" != typeof n.style[i] &&
          ((n.style[i] = "translate3d(1px,1px,1px)"),
          (t = e.getComputedStyle(n).getPropertyValue(o[i])));
      return (
        (document.body || document.documentElement).removeChild(n),
        "undefined" != typeof t && t.length > 0 && "none" !== t
      );
    })(),
    s = navigator.userAgent.toLowerCase().indexOf("android") > -1,
    l = /iPad|iPhone|iPod/.test(navigator.userAgent) && !e.MSStream,
    m = !!e.opera,
    c = /Edge\/\d+/.test(navigator.userAgent),
    p = /Trident.*rv[ :]*11\./.test(navigator.userAgent),
    u = !!Function("/*@cc_on return document.documentMode===10@*/")(),
    d = document.all && !e.atob;
  t();
  var g = [],
    f = (function () {
      function e(e, n) {
        var o,
          i = this;
        if (
          ((i.$item = e),
          (i.defaults = {
            type: "scroll",
            speed: 0.5,
            imgSrc: null,
            imgWidth: null,
            imgHeight: null,
            enableTransform: !0,
            elementInViewport: null,
            zIndex: -100,
            noAndroid: !1,
            noIos: !0,
            onScroll: null,
            onInit: null,
            onDestroy: null,
            onCoverImage: null,
          }),
          (o = JSON.parse(i.$item.getAttribute("data-jarallax") || "{}")),
          (i.options = i.extend({}, i.defaults, o, n)),
          !((s && i.options.noAndroid) || (l && i.options.noIos)))
        ) {
          i.options.speed = Math.min(
            2,
            Math.max(-1, parseFloat(i.options.speed))
          );
          var a = i.options.elementInViewport;
          a &&
            "object" == typeof a &&
            "undefined" != typeof a.length &&
            (a = a[0]),
            !a instanceof Element && (a = null),
            (i.options.elementInViewport = a),
            (i.instanceID = t++),
            (i.image = {
              src: i.options.imgSrc || null,
              $container: null,
              $item: null,
              width: i.options.imgWidth || null,
              height: i.options.imgHeight || null,
              useImgTag: l || s || m || p || u || c,
            }),
            i.initImg() && i.init();
        }
      }
      var t = 0;
      return e;
    })();
  (f.prototype.css = function (t, n) {
    if ("string" == typeof n)
      return e.getComputedStyle
        ? e.getComputedStyle(t).getPropertyValue(n)
        : t.style[n];
    n.transform && (n.WebkitTransform = n.MozTransform = n.transform);
    for (var o in n) t.style[o] = n[o];
    return t;
  }),
    (f.prototype.extend = function (e) {
      e = e || {};
      for (var t = 1; t < arguments.length; t++)
        if (arguments[t])
          for (var n in arguments[t])
            arguments[t].hasOwnProperty(n) && (e[n] = arguments[t][n]);
      return e;
    }),
    (f.prototype.initImg = function () {
      var e = this;
      return (
        null === e.image.src &&
          (e.image.src = e
            .css(e.$item, "background-image")
            .replace(/^url\(['"]?/g, "")
            .replace(/['"]?\)$/g, "")),
        !(!e.image.src || "none" === e.image.src)
      );
    }),
    (f.prototype.init = function () {
      function e() {
        t.coverImage(),
          t.clipContainer(),
          t.onScroll(!0),
          t.options.onInit && t.options.onInit.call(t),
          setTimeout(function () {
            t.$item &&
              t.css(t.$item, {
                "background-image": "none",
                "background-attachment": "scroll",
                "background-size": "auto",
              });
          }, 0);
      }
      var t = this,
        n = {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none",
        },
        o = { position: "fixed" };
      t.$item.setAttribute(
        "data-jarallax-original-styles",
        t.$item.getAttribute("style")
      ),
        "static" === t.css(t.$item, "position") &&
          t.css(t.$item, { position: "relative" }),
        "auto" === t.css(t.$item, "z-index") && t.css(t.$item, { zIndex: 0 }),
        (t.image.$container = document.createElement("div")),
        t.css(t.image.$container, n),
        t.css(t.image.$container, {
          visibility: "hidden",
          "z-index": t.options.zIndex,
        }),
        t.image.$container.setAttribute(
          "id",
          "jarallax-container-" + t.instanceID
        ),
        t.$item.appendChild(t.image.$container),
        t.image.useImgTag && r && t.options.enableTransform
          ? ((t.image.$item = document.createElement("img")),
            t.image.$item.setAttribute("src", t.image.src),
            (o = t.extend({ "max-width": "none" }, n, o)))
          : ((t.image.$item = document.createElement("div")),
            (o = t.extend(
              {
                "background-position": "50% 50%",
                "background-size": "100% auto",
                "background-repeat": "no-repeat no-repeat",
                "background-image": 'url("' + t.image.src + '")',
              },
              n,
              o
            ))),
        d && (o.backgroundAttachment = "fixed"),
        (t.parentWithTransform = 0);
      for (
        var i = t.$item;
        null !== i && i !== document && 0 === t.parentWithTransform;

      ) {
        var a =
          t.css(i, "-webkit-transform") ||
          t.css(i, "-moz-transform") ||
          t.css(i, "transform");
        a &&
          "none" !== a &&
          ((t.parentWithTransform = 1),
          t.css(t.image.$container, {
            transform: "translateX(0) translateY(0)",
          })),
          (i = i.parentNode);
      }
      t.css(t.image.$item, o),
        t.image.$container.appendChild(t.image.$item),
        t.image.width && t.image.height
          ? e()
          : t.getImageSize(t.image.src, function (n, o) {
              (t.image.width = n), (t.image.height = o), e();
            }),
        g.push(t);
    }),
    (f.prototype.destroy = function () {
      for (var e = this, t = 0, n = g.length; n > t; t++)
        if (g[t].instanceID === e.instanceID) {
          g.splice(t, 1);
          break;
        }
      var o = e.$item.getAttribute("data-jarallax-original-styles");
      e.$item.removeAttribute("data-jarallax-original-styles"),
        "null" === o
          ? e.$item.removeAttribute("style")
          : e.$item.setAttribute("style", o),
        e.$clipStyles && e.$clipStyles.parentNode.removeChild(e.$clipStyles),
        e.image.$container.parentNode.removeChild(e.image.$container),
        e.options.onDestroy && e.options.onDestroy.call(e),
        delete e.$item.jarallax;
      for (var i in e) delete e[i];
    }),
    (f.prototype.getImageSize = function (e, t) {
      if (e && t) {
        var n = new Image();
        (n.onload = function () {
          t(n.width, n.height);
        }),
          (n.src = e);
      }
    }),
    (f.prototype.clipContainer = function () {
      if (!d) {
        var e = this,
          t = e.image.$container.getBoundingClientRect(),
          n = t.width,
          o = t.height;
        if (!e.$clipStyles) {
          (e.$clipStyles = document.createElement("style")),
            e.$clipStyles.setAttribute("type", "text/css"),
            e.$clipStyles.setAttribute("id", "#jarallax-clip-" + e.instanceID);
          var i = document.head || document.getElementsByTagName("head")[0];
          i.appendChild(e.$clipStyles);
        }
        var a = [
          "#jarallax-container-" + e.instanceID + " {",
          "   clip: rect(0 " + n + "px " + o + "px 0);",
          "   clip: rect(0, " + n + "px, " + o + "px, 0);",
          "}",
        ].join("\n");
        e.$clipStyles.styleSheet
          ? (e.$clipStyles.styleSheet.cssText = a)
          : (e.$clipStyles.innerHTML = a);
      }
    }),
    (f.prototype.coverImage = function () {
      var e = this;
      if (e.image.width && e.image.height) {
        var t = e.image.$container.getBoundingClientRect(),
          n = t.width,
          o = t.height,
          i = t.left,
          s = e.image.width,
          l = e.image.height,
          m = e.options.speed,
          c =
            "scroll" === e.options.type || "scroll-opacity" === e.options.type,
          p = 0,
          u = 0,
          d = o,
          g = 0,
          f = 0;
        c &&
          ((p = 0 > m ? m * Math.max(o, a) : m * (o + a)),
          m > 1
            ? (d = Math.abs(p - a))
            : 0 > m
            ? (d = p / m + Math.abs(p))
            : (d += Math.abs(a - o) * (1 - m)),
          (p /= 2)),
          (u = (d * s) / l),
          n > u && ((u = n), (d = (u * l) / s)),
          (e.bgPosVerticalCenter = 0),
          !(c && a > d) ||
            (r && e.options.enableTransform) ||
            ((e.bgPosVerticalCenter = (a - d) / 2), (d = a)),
          c
            ? ((g = i + (n - u) / 2), (f = (a - d) / 2))
            : ((g = (n - u) / 2), (f = (o - d) / 2)),
          r && e.options.enableTransform && e.parentWithTransform && (g -= i),
          (e.parallaxScrollDistance = p),
          e.css(e.image.$item, {
            width: u + "px",
            height: d + "px",
            marginLeft: g + "px",
            marginTop: f + "px",
          }),
          e.options.onCoverImage && e.options.onCoverImage.call(e);
      }
    }),
    (f.prototype.isVisible = function () {
      return this.isElementInViewport || !1;
    }),
    (f.prototype.onScroll = function (e) {
      var t = this;
      if (t.image.width && t.image.height) {
        var n = t.$item.getBoundingClientRect(),
          o = n.top,
          s = n.height,
          l = {
            position: "absolute",
            visibility: "visible",
            backgroundPosition: "50% 50%",
          },
          m = n;
        if (
          (t.options.elementInViewport &&
            (m = t.options.elementInViewport.getBoundingClientRect()),
          (t.isElementInViewport =
            m.bottom >= 0 && m.right >= 0 && m.top <= a && m.left <= i),
          e ? 1 : t.isElementInViewport)
        ) {
          var c = Math.max(0, o),
            p = Math.max(0, s + o),
            u = Math.max(0, -o),
            g = Math.max(0, o + s - a),
            f = Math.max(0, s - (o + s - a)),
            h = Math.max(0, -o + a - s),
            y = 1 - (2 * (a - o)) / (a + s),
            v = 1;
          if (
            (a > s
              ? (v = 1 - (u || g) / s)
              : a >= p
              ? (v = p / a)
              : a >= f && (v = f / a),
            ("opacity" === t.options.type ||
              "scale-opacity" === t.options.type ||
              "scroll-opacity" === t.options.type) &&
              ((l.transform = "translate3d(0, 0, 0)"), (l.opacity = v)),
            "scale" === t.options.type || "scale-opacity" === t.options.type)
          ) {
            var x = 1;
            t.options.speed < 0
              ? (x -= t.options.speed * v)
              : (x += t.options.speed * (1 - v)),
              (l.transform = "scale(" + x + ") translate3d(0, 0, 0)");
          }
          if (
            "scroll" === t.options.type ||
            "scroll-opacity" === t.options.type
          ) {
            var b = t.parallaxScrollDistance * y;
            r && t.options.enableTransform
              ? (t.parentWithTransform && (b -= o),
                (l.transform = "translate3d(0, " + b + "px, 0)"))
              : t.image.useImgTag
              ? (l.top = b + "px")
              : (t.bgPosVerticalCenter && (b += t.bgPosVerticalCenter),
                (l.backgroundPosition = "50% " + b + "px")),
              (l.position = d ? "absolute" : "fixed");
          }
          t.css(t.image.$item, l),
            t.options.onScroll &&
              t.options.onScroll.call(t, {
                section: n,
                beforeTop: c,
                beforeTopEnd: p,
                afterTop: u,
                beforeBottom: g,
                beforeBottomEnd: f,
                afterBottom: h,
                visiblePercent: v,
                fromViewportCenter: y,
              });
        }
      }
    }),
    n(e, "scroll", o),
    n(e, "resize", o),
    n(e, "orientationchange", o),
    n(e, "load", o);
  var h = function (e) {
    ("object" == typeof HTMLElement
      ? e instanceof HTMLElement
      : e &&
        "object" == typeof e &&
        null !== e &&
        1 === e.nodeType &&
        "string" == typeof e.nodeName) && (e = [e]);
    var t,
      n = arguments[1],
      o = Array.prototype.slice.call(arguments, 2),
      i = e.length,
      a = 0;
    for (a; i > a; a++)
      if (
        ("object" == typeof n || "undefined" == typeof n
          ? e[a].jarallax || (e[a].jarallax = new f(e[a], n))
          : e[a].jarallax && (t = e[a].jarallax[n].apply(e[a].jarallax, o)),
        "undefined" != typeof t)
      )
        return t;
    return e;
  };
  h.constructor = f;
  var y = e.jarallax;
  if (
    ((e.jarallax = h),
    (e.jarallax.noConflict = function () {
      return (e.jarallax = y), this;
    }),
    "undefined" != typeof jQuery)
  ) {
    var v = function () {
      var t = arguments || [];
      Array.prototype.unshift.call(t, this);
      var n = h.apply(e, t);
      return "object" != typeof n ? n : this;
    };
    v.constructor = f;
    var x = jQuery.fn.jarallax;
    (jQuery.fn.jarallax = v),
      (jQuery.fn.jarallax.noConflict = function () {
        return (jQuery.fn.jarallax = x), this;
      });
  }
  n(e, "DOMContentLoaded", function () {
    h(document.querySelectorAll("[data-jarallax], [data-jarallax-video]"));
  });
})(window);

// 08. JARALLAX VIDEO

/*!
 * Name    : Video Worker (wrapper for Youtube, Vimeo and Local videos)
 * Version : 1.2.1
 * Author  : _nK https://nkdev.info
 * GitHub  : https://github.com/nk-o/jarallax
 */
!(function (e) {
  "use strict";
  function t(e) {
    e = e || {};
    for (var t = 1; t < arguments.length; t++)
      if (arguments[t])
        for (var i in arguments[t])
          arguments[t].hasOwnProperty(i) && (e[i] = arguments[t][i]);
    return e;
  }
  function i() {
    (this._done = []), (this._fail = []);
  }
  function o(e, t, i) {
    e.addEventListener
      ? e.addEventListener(t, i)
      : e.attachEvent("on" + t, function () {
          i.call(e);
        });
  }
  i.prototype = {
    execute: function (e, t) {
      var i = e.length;
      for (t = Array.prototype.slice.call(t); i--; ) e[i].apply(null, t);
    },
    resolve: function () {
      this.execute(this._done, arguments);
    },
    reject: function () {
      this.execute(this._fail, arguments);
    },
    done: function (e) {
      this._done.push(e);
    },
    fail: function (e) {
      this._fail.push(e);
    },
  };
  var a = (function () {
    function e(e, o) {
      var a = this;
      (a.url = e),
        (a.options_default = {
          autoplay: 1,
          loop: 1,
          mute: 1,
          controls: 0,
          startTime: 0,
          endTime: 0,
        }),
        (a.options = t({}, a.options_default, o)),
        (a.videoID = a.parseURL(e)),
        a.videoID && ((a.ID = i++), a.loadAPI(), a.init());
    }
    var i = 0;
    return e;
  })();
  (a.prototype.parseURL = function (e) {
    function t(e) {
      var t = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
        i = e.match(t);
      return i && 11 === i[1].length ? i[1] : !1;
    }
    function i(e) {
      var t =
          /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/,
        i = e.match(t);
      return i && i[3] ? i[3] : !1;
    }
    function o(e) {
      for (
        var t = e.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/), i = {}, o = 0, a = 0;
        a < t.length;
        a++
      ) {
        var n = t[a].match(/^(mp4|webm|ogv|ogg)\:(.*)/);
        n &&
          n[1] &&
          n[2] &&
          ((i["ogv" === n[1] ? "ogg" : n[1]] = n[2]), (o = 1));
      }
      return o ? i : !1;
    }
    var a = t(e),
      n = i(e),
      r = o(e);
    return a
      ? ((this.type = "youtube"), a)
      : n
      ? ((this.type = "vimeo"), n)
      : r
      ? ((this.type = "local"), r)
      : !1;
  }),
    (a.prototype.isValid = function () {
      return !!this.videoID;
    }),
    (a.prototype.on = function (e, t) {
      (this.userEventsList = this.userEventsList || []),
        (this.userEventsList[e] || (this.userEventsList[e] = [])).push(t);
    }),
    (a.prototype.off = function (e, t) {
      if (this.userEventsList && this.userEventsList[e])
        if (t)
          for (var i = 0; i < this.userEventsList[e].length; i++)
            this.userEventsList[e][i] === t && (this.userEventsList[e][i] = !1);
        else delete this.userEventsList[e];
    }),
    (a.prototype.fire = function (e) {
      var t = [].slice.call(arguments, 1);
      if (this.userEventsList && "undefined" != typeof this.userEventsList[e])
        for (var i in this.userEventsList[e])
          this.userEventsList[e][i] && this.userEventsList[e][i].apply(this, t);
    }),
    (a.prototype.play = function (e) {
      var t = this;
      t.player &&
        ("youtube" === t.type &&
          t.player.playVideo &&
          ("undefined" != typeof e && t.player.seekTo(e || 0),
          t.player.playVideo()),
        "vimeo" === t.type &&
          ("undefined" != typeof e && t.player.setCurrentTime(e),
          t.player.getPaused().then(function (e) {
            e && t.player.play();
          })),
        "local" === t.type &&
          ("undefined" != typeof e && (t.player.currentTime = e),
          t.player.play()));
    }),
    (a.prototype.pause = function () {
      this.player &&
        ("youtube" === this.type &&
          this.player.pauseVideo &&
          this.player.pauseVideo(),
        "vimeo" === this.type && this.player.pause(),
        "local" === this.type && this.player.pause());
    }),
    (a.prototype.getImageURL = function (e) {
      var t = this;
      if (t.videoImage) return void e(t.videoImage);
      if ("youtube" === t.type) {
        var i = ["maxresdefault", "sddefault", "hqdefault", "0"],
          o = 0,
          a = new Image();
        (a.onload = function () {
          120 !== (this.naturalWidth || this.width) || o === i.length - 1
            ? ((t.videoImage =
                "https://img.youtube.com/vi/" +
                t.videoID +
                "/" +
                i[o] +
                ".jpg"),
              e(t.videoImage))
            : (o++,
              (this.src =
                "https://img.youtube.com/vi/" +
                t.videoID +
                "/" +
                i[o] +
                ".jpg"));
        }),
          (a.src =
            "https://img.youtube.com/vi/" + t.videoID + "/" + i[o] + ".jpg");
      }
      if ("vimeo" === t.type) {
        var n = new XMLHttpRequest();
        n.open(
          "GET",
          "https://vimeo.com/api/v2/video/" + t.videoID + ".json",
          !0
        ),
          (n.onreadystatechange = function () {
            if (
              4 === this.readyState &&
              this.status >= 200 &&
              this.status < 400
            ) {
              var i = JSON.parse(this.responseText);
              (t.videoImage = i[0].thumbnail_large), e(t.videoImage);
            }
          }),
          n.send(),
          (n = null);
      }
    }),
    (a.prototype.getIframe = function (t) {
      var i = this;
      return i.$iframe
        ? void t(i.$iframe)
        : void i.onAPIready(function () {
            function a(e, t, i) {
              var o = document.createElement("source");
              (o.src = t), (o.type = i), e.appendChild(o);
            }
            var n;
            if (
              (i.$iframe ||
                ((n = document.createElement("div")),
                (n.style.display = "none")),
              "youtube" === i.type)
            ) {
              (i.playerOptions = {}),
                (i.playerOptions.videoId = i.videoID),
                (i.playerOptions.playerVars = {
                  autohide: 1,
                  rel: 0,
                  autoplay: 0,
                }),
                i.options.controls ||
                  ((i.playerOptions.playerVars.iv_load_policy = 3),
                  (i.playerOptions.playerVars.modestbranding = 1),
                  (i.playerOptions.playerVars.controls = 0),
                  (i.playerOptions.playerVars.showinfo = 0),
                  (i.playerOptions.playerVars.disablekb = 1));
              var r, p;
              i.playerOptions.events = {
                onReady: function (e) {
                  i.options.mute && e.target.mute(),
                    i.options.autoplay && i.play(i.options.startTime),
                    i.fire("ready", e);
                },
                onStateChange: function (e) {
                  i.options.loop &&
                    e.data === YT.PlayerState.ENDED &&
                    i.play(i.options.startTime),
                    r ||
                      e.data !== YT.PlayerState.PLAYING ||
                      ((r = 1), i.fire("started", e)),
                    e.data === YT.PlayerState.PLAYING && i.fire("play", e),
                    e.data === YT.PlayerState.PAUSED && i.fire("pause", e),
                    e.data === YT.PlayerState.ENDED && i.fire("end", e),
                    i.options.endTime &&
                      (e.data === YT.PlayerState.PLAYING
                        ? (p = setInterval(function () {
                            i.options.endTime &&
                              i.player.getCurrentTime() >= i.options.endTime &&
                              (i.options.loop
                                ? i.play(i.options.startTime)
                                : i.pause());
                          }, 150))
                        : clearInterval(p));
                },
              };
              var s = !i.$iframe;
              if (s) {
                var l = document.createElement("div");
                l.setAttribute("id", i.playerID),
                  n.appendChild(l),
                  document.body.appendChild(n);
              }
              (i.player =
                i.player || new e.YT.Player(i.playerID, i.playerOptions)),
                s &&
                  ((i.$iframe = document.getElementById(i.playerID)),
                  (i.videoWidth =
                    parseInt(i.$iframe.getAttribute("width"), 10) || 1280),
                  (i.videoHeight =
                    parseInt(i.$iframe.getAttribute("height"), 10) || 720));
            }
            if ("vimeo" === i.type) {
              (i.playerOptions = ""),
                (i.playerOptions += "player_id=" + i.playerID),
                (i.playerOptions += "&autopause=0"),
                i.options.controls ||
                  (i.playerOptions += "&badge=0&byline=0&portrait=0&title=0"),
                (i.playerOptions +=
                  "&autoplay=" + (i.options.autoplay ? "1" : "0")),
                (i.playerOptions += "&loop=" + (i.options.loop ? 1 : 0)),
                i.$iframe ||
                  ((i.$iframe = document.createElement("iframe")),
                  i.$iframe.setAttribute("id", i.playerID),
                  i.$iframe.setAttribute(
                    "src",
                    "https://player.vimeo.com/video/" +
                      i.videoID +
                      "?" +
                      i.playerOptions
                  ),
                  i.$iframe.setAttribute("frameborder", "0"),
                  n.appendChild(i.$iframe),
                  document.body.appendChild(n)),
                (i.player = i.player || new Vimeo.Player(i.$iframe)),
                i.player.getVideoWidth().then(function (e) {
                  i.videoWidth = e || 1280;
                }),
                i.player.getVideoHeight().then(function (e) {
                  i.videoHeight = e || 720;
                }),
                i.player.setVolume(i.options.mute ? 0 : 100);
              var d;
              i.player.on("timeupdate", function (e) {
                d || i.fire("started", e),
                  (d = 1),
                  i.options.endTime &&
                    i.options.endTime &&
                    e.seconds >= i.options.endTime &&
                    (i.options.loop ? i.play(i.options.startTime) : i.pause());
              }),
                i.player.on("play", function (e) {
                  i.fire("play", e),
                    i.options.startTime &&
                      0 === e.seconds &&
                      i.play(i.options.startTime);
                }),
                i.player.on("pause", function (e) {
                  i.fire("pause", e);
                }),
                i.player.on("ended", function (e) {
                  i.fire("end", e);
                }),
                i.player.on("loaded", function (e) {
                  i.fire("ready", e);
                });
            }
            if ("local" === i.type) {
              if (!i.$iframe) {
                (i.$iframe = document.createElement("video")),
                  i.options.mute && (i.$iframe.muted = !0),
                  i.options.loop && (i.$iframe.loop = !0),
                  i.$iframe.setAttribute("id", i.playerID),
                  n.appendChild(i.$iframe),
                  document.body.appendChild(n);
                for (var u in i.videoID)
                  a(i.$iframe, i.videoID[u], "video/" + u);
              }
              i.player = i.player || i.$iframe;
              var y;
              o(i.player, "playing", function (e) {
                y || i.fire("started", e), (y = 1);
              }),
                o(i.player, "timeupdate", function () {
                  i.options.endTime &&
                    i.options.endTime &&
                    this.currentTime >= i.options.endTime &&
                    (i.options.loop ? i.play(i.options.startTime) : i.pause());
                }),
                o(i.player, "play", function (e) {
                  i.fire("play", e);
                }),
                o(i.player, "pause", function (e) {
                  i.fire("pause", e);
                }),
                o(i.player, "ended", function (e) {
                  i.fire("end", e);
                }),
                o(i.player, "loadedmetadata", function () {
                  (i.videoWidth = this.videoWidth || 1280),
                    (i.videoHeight = this.videoHeight || 720),
                    i.fire("ready"),
                    i.options.autoplay && i.play(i.options.startTime);
                });
            }
            t(i.$iframe);
          });
    }),
    (a.prototype.init = function () {
      var e = this;
      e.playerID = "VideoWorker-" + e.ID;
    });
  var n = 0,
    r = 0;
  a.prototype.loadAPI = function () {
    var t = this;
    if (!n || !r) {
      var i = "";
      if (
        ("youtube" !== t.type ||
          n ||
          ((n = 1), (i = "//www.youtube.com/iframe_api")),
        "vimeo" !== t.type ||
          r ||
          ((r = 1), (i = "//player.vimeo.com/api/player.js")),
        i)
      ) {
        "file://" === e.location.origin && (i = "http:" + i);
        var o = document.createElement("script"),
          a = document.getElementsByTagName("head")[0];
        (o.src = i), a.appendChild(o), (a = null), (o = null);
      }
    }
  };
  var p = 0,
    s = 0,
    l = new i(),
    d = new i();
  (a.prototype.onAPIready = function (t) {
    var i = this;
    if (
      ("youtube" === i.type &&
        (("undefined" != typeof YT && 0 !== YT.loaded) || p
          ? "object" == typeof YT && 1 === YT.loaded
            ? t()
            : l.done(function () {
                t();
              })
          : ((p = 1),
            (e.onYouTubeIframeAPIReady = function () {
              (e.onYouTubeIframeAPIReady = null), l.resolve("done"), t();
            }))),
      "vimeo" === i.type)
    )
      if ("undefined" != typeof Vimeo || s)
        "undefined" != typeof Vimeo
          ? t()
          : d.done(function () {
              t();
            });
      else {
        s = 1;
        var o = setInterval(function () {
          "undefined" != typeof Vimeo &&
            (clearInterval(o), d.resolve("done"), t());
        }, 20);
      }
    "local" === i.type && t();
  }),
    (e.VideoWorker = a);
})(window),
  (function () {
    "use strict";
    if ("undefined" != typeof jarallax) {
      var e = jarallax.constructor,
        t = e.prototype.init;
      e.prototype.init = function () {
        var e = this;
        t.apply(e),
          e.video &&
            e.video.getIframe(function (t) {
              var i = t.parentNode;
              e.css(t, {
                position: "fixed",
                top: "0px",
                left: "0px",
                right: "0px",
                bottom: "0px",
                width: "100%",
                height: "100%",
                maxWidth: "none",
                maxHeight: "none",
                visibility: "visible",
                margin: 0,
                zIndex: -1,
              }),
                (e.$video = t),
                e.image.$container.appendChild(t),
                i.parentNode.removeChild(i);
            });
      };
      var i = e.prototype.coverImage;
      e.prototype.coverImage = function () {
        var e = this;
        i.apply(e),
          e.video &&
            "IFRAME" === e.image.$item.nodeName &&
            e.css(e.image.$item, {
              height: e.image.$item.getBoundingClientRect().height + 400 + "px",
              marginTop:
                -200 + parseFloat(e.css(e.image.$item, "margin-top")) + "px",
            });
      };
      var o = e.prototype.initImg;
      e.prototype.initImg = function () {
        var e = this,
          t = o.apply(e);
        if (
          (e.options.videoSrc ||
            (e.options.videoSrc =
              e.$item.getAttribute("data-jarallax-video") || !1),
          e.options.videoSrc)
        ) {
          var i = new VideoWorker(e.options.videoSrc, {
            startTime: e.options.videoStartTime || 0,
            endTime: e.options.videoEndTime || 0,
          });
          if (
            (i.isValid() &&
              ((e.image.useImgTag = !0),
              i.on("ready", function () {
                var t = e.onScroll;
                e.onScroll = function () {
                  t.apply(e), e.isVisible() ? i.play() : i.pause();
                };
              }),
              i.on("started", function () {
                (e.image.$default_item = e.image.$item),
                  (e.image.$item = e.$video),
                  (e.image.width = e.options.imgWidth =
                    e.video.videoWidth || 1280),
                  (e.image.height = e.options.imgHeight =
                    e.video.videoHeight || 720),
                  e.coverImage(),
                  e.clipContainer(),
                  e.onScroll(),
                  e.image.$default_item &&
                    (e.image.$default_item.style.display = "none");
              }),
              (e.video = i),
              "local" !== i.type &&
                i.getImageURL(function (t) {
                  (e.image.src = t), e.init();
                })),
            "local" !== i.type)
          )
            return !1;
          if (!t)
            return (
              (e.image.src =
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),
              !0
            );
        }
        return t;
      };
      var a = e.prototype.destroy;
      e.prototype.destroy = function () {
        var e = this;
        a.apply(e);
      };
    }
  })();

// 09. COLLAGEPLUS

/*!
 *
 * jQuery collagePlus Plugin v0.3.3
 * https://github.com/ed-lea/jquery-collagePlus
 *
 * Copyright 2012, Ed Lea twitter.com/ed_lea
 *
 * built for http://qiip.me
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 *
 */
(function (e) {
  e.fn.collagePlus = function (t) {
    function n(t, n, i, s) {
      var o = i.padding * (t.length - 1) + t.length * t[0][3],
        u = i.albumWidth - o,
        a = u / (n - o),
        f = o,
        l = n < i.albumWidth ? true : false;
      for (var c = 0; c < t.length; c++) {
        var h = e(t[c][0]),
          p = Math.floor(t[c][1] * a),
          d = Math.floor(t[c][2] * a),
          v = !!(c < t.length - 1);
        if (i.allowPartialLastRow === true && l === true) {
          p = t[c][1];
          d = t[c][2];
        }
        f += p;
        if (!v && f < i.albumWidth) {
          if (i.allowPartialLastRow === true && l === true) {
            p = p;
          } else {
            p = p + (i.albumWidth - f);
          }
        }
        p--;
        var m = h.is("img") ? h : h.find("img");
        m.width(p);
        if (!h.is("img")) {
          h.width(p + t[c][3]);
        }
        m.height(d);
        if (!h.is("img")) {
          h.height(d + t[c][4]);
        }
        r(h, v, i);
        m.one(
          "load",
          (function (e) {
            return function () {
              if (i.effect == "default") {
                e.animate({ opacity: "1" }, { duration: i.fadeSpeed });
              } else {
                if (i.direction == "vertical") {
                  var t = s <= 10 ? s : 10;
                } else {
                  var t = c <= 9 ? c + 1 : 10;
                }
                e.removeClass(function (e, t) {
                  return (t.match(/\beffect-\S+/g) || []).join(" ");
                });
                e.addClass(i.effect);
                e.addClass("effect-duration-" + t);
              }
            };
          })(h)
        ).each(function () {
          if (this.complete) e(this).trigger("load");
        });
      }
    }
    function r(e, t, n) {
      var r = {
        "margin-bottom": n.padding + "px",
        "margin-right": t ? n.padding + "px" : "0px",
        display: n.display,
        "vertical-align": "bottom",
        overflow: "hidden",
      };
      return e.css(r);
    }
    function i(t) {
      $img = e(t);
      var n = new Array();
      n["w"] =
        parseFloat($img.css("border-left-width")) +
        parseFloat($img.css("border-right-width"));
      n["h"] =
        parseFloat($img.css("border-top-width")) +
        parseFloat($img.css("border-bottom-width"));
      return n;
    }
    return this.each(function () {
      var r = 0,
        s = [],
        o = 1,
        u = e(this);
      e.fn.collagePlus.defaults.albumWidth = u.width();
      e.fn.collagePlus.defaults.padding = parseFloat(u.css("padding-left"));
      e.fn.collagePlus.defaults.images = u.children();
      var a = e.extend({}, e.fn.collagePlus.defaults, t);
      a.images.each(function (t) {
        var u = e(this),
          f = u.is("img") ? u : e(this).find("img");
        var l =
            typeof f.data("width") != "undefined" ? f.data("width") : f.width(),
          c =
            typeof f.data("height") != "undefined"
              ? f.data("height")
              : f.height();
        var h = i(f);
        f.data("width", l);
        f.data("height", c);
        var p = Math.ceil((l / c) * a.targetHeight),
          d = Math.ceil(a.targetHeight);
        s.push([this, p, d, h["w"], h["h"]]);
        r += p + h["w"] + a.padding;
        if (r > a.albumWidth && s.length != 0) {
          n(s, r - a.padding, a, o);
          //   delete r;
          //   delete s;
          r = 0;
          s = [];
          o += 1;
        }
        if (a.images.length - 1 == t && s.length != 0) {
          n(s, r, a, o);
          //   delete r;
          //   delete s;
          r = 0;
          s = [];
          o += 1;
        }
      });
    });
  };
  e.fn.collagePlus.defaults = {
    targetHeight: 400,
    fadeSpeed: "fast",
    display: "inline-block",
    effect: "default",
    direction: "vertical",
    allowPartialLastRow: false,
  };
})(jQuery);

// 09.1 Remove White Space
(function (a) {
  a.fn.removeWhitespace = function () {
    this.contents()
      .filter(function () {
        return this.nodeType == 3 && !/\S/.test(this.nodeValue);
      })
      .remove();
    return this;
  };
})(jQuery);

// 10. ACCORDION (COPYRIGHT)

/* ----------------------------------------------------
 * Accordion
 * ----------------------------------------------------
 * Author: friendslab
 * Author URL: http://themeforest.net/user/friendslab
 */
!(function (c) {
  c.fn.friendslab_accordion = function (a) {
    if (this.length > 1)
      return (
        this.each(function () {
          c(this).friendslab_accordion(a);
        }),
        this
      );
    var e = c.extend(
      {
        animation: !0,
        showIcon: !0,
        closeAble: !1,
        closeOther: !0,
        slideSpeed: 150,
        activeIndex: !1,
      },
      a
    );
    c(this).data("close-able") && (e.closeAble = c(this).data("close-able")),
      c(this).data("animation") && (e.animation = c(this).data("animation")),
      c(this).data("show-icon") && (e.showIcon = c(this).data("show-icon")),
      c(this).data("close-other") &&
        (e.closeOther = c(this).data("close-other")),
      c(this).data("slide-speed") &&
        (e.slideSpeed = c(this).data("slide-speed")),
      c(this).data("active-index") &&
        (e.activeIndex = c(this).data("active-index"));
    var i = this,
      n = function () {
        i.createStructure(), i.clickHead();
      };
    return (
      (this.createStructure = function () {
        i.addClass("starter_fl_accordion"),
          e.showIcon && i.addClass("acc_with_icon"),
          i.find(".accordion_in").length < 1 &&
            i.children().addClass("accordion_in"),
          i.find(".accordion_in").each(function (a, e) {
            var i = c(e).children();
            c(i[0]).addClass("acc_head"), c(i[1]).addClass("acc_content");
          }),
          e.showIcon &&
            i.find(".acc_head").prepend('<div class="acc_icon_expand"></div>'),
          i
            .find(".accordion_in .acc_content")
            .not(".acc_active .acc_content")
            .hide(),
          e.activeIndex === parseInt(e.activeIndex) &&
            (0 === e.activeIndex
              ? (i.find(".accordion_in").addClass("acc_active").show(),
                i
                  .find(".accordion_in .acc_content")
                  .addClass("acc_active")
                  .show())
              : (i
                  .find(".accordion_in")
                  .eq(e.activeIndex - 1)
                  .addClass("acc_active")
                  .show(),
                i
                  .find(".accordion_in .acc_content")
                  .eq(e.activeIndex - 1)
                  .addClass("acc_active")
                  .show()));
      }),
      (this.clickHead = function () {
        i.on("click", ".acc_head", function () {
          var a = c(this).parent();
          0 == a.hasClass("acc_active") &&
            e.closeOther &&
            (i.find(".acc_content").slideUp(e.slideSpeed),
            i.find(".accordion_in").removeClass("acc_active")),
            a.hasClass("acc_active")
              ? !1 !== e.closeAble &&
                (a.children(".acc_content").slideUp(e.slideSpeed),
                a.removeClass("acc_active"))
              : (c(this).next(".acc_content").slideDown(e.slideSpeed),
                a.addClass("acc_active"));
        });
      }),
      n(),
      this
    );
  };
})(jQuery);

// 11. EASYTABS

/* --------------------------------------------------------------
 * jQuery EasyTabs plugin 3.2.0
 *
 * copyright (c) 2010-2011 Steve Schwartz (JangoSteve)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: Thu May 09 17:30:00 2013 -0500
 */
(function (a) {
  a.easytabs = function (j, e) {
    var f = this,
      q = a(j),
      i = {
        animate: true,
        panelActiveClass: "active",
        tabActiveClass: "active",
        defaultTab: "li:first-child",
        animationSpeed: "normal",
        tabs: "> ul > li",
        updateHash: true,
        cycle: false,
        collapsible: false,
        collapsedClass: "collapsed",
        collapsedByDefault: true,
        uiTabs: false,
        transitionIn: "fadeIn",
        transitionOut: "fadeOut",
        transitionInEasing: "swing",
        transitionOutEasing: "swing",
        transitionCollapse: "slideUp",
        transitionUncollapse: "slideDown",
        transitionCollapseEasing: "swing",
        transitionUncollapseEasing: "swing",
        containerClass: "",
        tabsClass: "",
        tabClass: "",
        panelClass: "",
        cache: true,
        event: "click",
        panelContext: q,
      },
      h,
      l,
      v,
      m,
      d,
      t = { fast: 200, normal: 400, slow: 600 },
      r;
    f.init = function () {
      f.settings = r = a.extend({}, i, e);
      r.bind_str = r.event + ".easytabs";
      if (r.uiTabs) {
        r.tabActiveClass = "ui-tabs-selected";
        r.containerClass = "ui-tabs ui-widget ui-widget-content ui-corner-all";
        r.tabsClass =
          "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all";
        r.tabClass = "ui-state-default ui-corner-top";
        r.panelClass = "ui-tabs-panel ui-widget-content ui-corner-bottom";
      }
      if (
        r.collapsible &&
        e.defaultTab !== undefined &&
        e.collpasedByDefault === undefined
      ) {
        r.collapsedByDefault = false;
      }
      if (typeof r.animationSpeed === "string") {
        r.animationSpeed = t[r.animationSpeed];
      }
      a("a.anchor").remove().prependTo("body");
      q.data("easytabs", {});
      f.setTransitions();
      f.getTabs();
      b();
      g();
      w();
      n();
      c();
      q.attr("data-easytabs", true);
    };
    f.setTransitions = function () {
      v = r.animate
        ? {
            show: r.transitionIn,
            hide: r.transitionOut,
            speed: r.animationSpeed,
            collapse: r.transitionCollapse,
            uncollapse: r.transitionUncollapse,
            halfSpeed: r.animationSpeed / 2,
          }
        : {
            show: "show",
            hide: "hide",
            speed: 0,
            collapse: "hide",
            uncollapse: "show",
            halfSpeed: 0,
          };
    };
    f.getTabs = function () {
      var x;
      (f.tabs = q.find(r.tabs)),
        (f.panels = a()),
        f.tabs.each(function () {
          var A = a(this),
            z = A.children("a"),
            y = A.children("a").data("target");
          A.data("easytabs", {});
          if (y !== undefined && y !== null) {
            A.data("easytabs").ajax = z.attr("href");
          } else {
            y = z.attr("href");
          }
          y = y.match(/#([^\?]+)/)[1];
          x = r.panelContext.find("#" + y);
          if (x.length) {
            x.data("easytabs", {
              position: x.css("position"),
              visibility: x.css("visibility"),
            });
            x.not(r.panelActiveClass).hide();
            f.panels = f.panels.add(x);
            A.data("easytabs").panel = x;
          } else {
            f.tabs = f.tabs.not(A);
            if ("console" in window) {
              console.warn(
                "Warning: tab without matching panel for selector '#" +
                  y +
                  "' removed from set"
              );
            }
          }
        });
    };
    f.selectTab = function (x, C) {
      var y = window.location,
        B = y.hash.match(/^[^\?]*/)[0],
        z = x.parent().data("easytabs").panel,
        A = x.parent().data("easytabs").ajax;
      if (
        r.collapsible &&
        !d &&
        (x.hasClass(r.tabActiveClass) || x.hasClass(r.collapsedClass))
      ) {
        f.toggleTabCollapse(x, z, A, C);
      } else {
        if (!x.hasClass(r.tabActiveClass) || !z.hasClass(r.panelActiveClass)) {
          o(x, z, A, C);
        } else {
          if (!r.cache) {
            o(x, z, A, C);
          }
        }
      }
    };
    f.toggleTabCollapse = function (x, y, z, A) {
      f.panels.stop(true, true);
      if (u(q, "easytabs:before", [x, y, r])) {
        f.tabs
          .filter("." + r.tabActiveClass)
          .removeClass(r.tabActiveClass)
          .children()
          .removeClass(r.tabActiveClass);
        if (x.hasClass(r.collapsedClass)) {
          if (z && (!r.cache || !x.parent().data("easytabs").cached)) {
            q.trigger("easytabs:ajax:beforeSend", [x, y]);
            y.load(z, function (C, B, D) {
              x.parent().data("easytabs").cached = true;
              q.trigger("easytabs:ajax:complete", [x, y, C, B, D]);
            });
          }
          x.parent()
            .removeClass(r.collapsedClass)
            .addClass(r.tabActiveClass)
            .children()
            .removeClass(r.collapsedClass)
            .addClass(r.tabActiveClass);
          y.addClass(r.panelActiveClass)[v.uncollapse](
            v.speed,
            r.transitionUncollapseEasing,
            function () {
              q.trigger("easytabs:midTransition", [x, y, r]);
              if (typeof A == "function") {
                A();
              }
            }
          );
        } else {
          x.addClass(r.collapsedClass).parent().addClass(r.collapsedClass);
          y.removeClass(r.panelActiveClass)[v.collapse](
            v.speed,
            r.transitionCollapseEasing,
            function () {
              q.trigger("easytabs:midTransition", [x, y, r]);
              if (typeof A == "function") {
                A();
              }
            }
          );
        }
      }
    };
    f.matchTab = function (x) {
      return f.tabs
        .find("[href='" + x + "'],[data-target='" + x + "']")
        .first();
    };
    f.matchInPanel = function (x) {
      return x && f.validId(x)
        ? f.panels.filter(":has(" + x + ")").first()
        : [];
    };
    f.validId = function (x) {
      return x.substr(1).match(/^[A-Za-z]+[A-Za-z0-9\-_:\.].$/);
    };
    f.selectTabFromHashChange = function () {
      var y = window.location.hash.match(/^[^\?]*/)[0],
        x = f.matchTab(y),
        z;
      if (r.updateHash) {
        if (x.length) {
          d = true;
          f.selectTab(x);
        } else {
          z = f.matchInPanel(y);
          if (z.length) {
            y = "#" + z.attr("id");
            x = f.matchTab(y);
            d = true;
            f.selectTab(x);
          } else {
            if (!h.hasClass(r.tabActiveClass) && !r.cycle) {
              if (y === "" || f.matchTab(m).length || q.closest(y).length) {
                d = true;
                f.selectTab(l);
              }
            }
          }
        }
      }
    };
    f.cycleTabs = function (x) {
      if (r.cycle) {
        x = x % f.tabs.length;
        $tab = a(f.tabs[x]).children("a").first();
        d = true;
        f.selectTab($tab, function () {
          setTimeout(function () {
            f.cycleTabs(x + 1);
          }, r.cycle);
        });
      }
    };
    f.publicMethods = {
      select: function (x) {
        var y;
        if ((y = f.tabs.filter(x)).length === 0) {
          if ((y = f.tabs.find("a[href='" + x + "']")).length === 0) {
            if ((y = f.tabs.find("a" + x)).length === 0) {
              if ((y = f.tabs.find("[data-target='" + x + "']")).length === 0) {
                if ((y = f.tabs.find("a[href$='" + x + "']")).length === 0) {
                  a.error("Tab '" + x + "' does not exist in tab set");
                }
              }
            }
          }
        } else {
          y = y.children("a").first();
        }
        f.selectTab(y);
      },
    };
    var u = function (A, x, z) {
      var y = a.Event(x);
      A.trigger(y, z);
      return y.result !== false;
    };
    var b = function () {
      q.addClass(r.containerClass);
      f.tabs.parent().addClass(r.tabsClass);
      f.tabs.addClass(r.tabClass);
      f.panels.addClass(r.panelClass);
    };
    var g = function () {
      var y = window.location.hash.match(/^[^\?]*/)[0],
        x = f.matchTab(y).parent(),
        z;
      if (x.length === 1) {
        h = x;
        r.cycle = false;
      } else {
        z = f.matchInPanel(y);
        if (z.length) {
          y = "#" + z.attr("id");
          h = f.matchTab(y).parent();
        } else {
          h = f.tabs.parent().find(r.defaultTab);
          if (h.length === 0) {
            a.error(
              "The specified default tab ('" +
                r.defaultTab +
                "') could not be found in the tab set ('" +
                r.tabs +
                "') out of " +
                f.tabs.length +
                " tabs."
            );
          }
        }
      }
      l = h.children("a").first();
      p(x);
    };
    var p = function (z) {
      var y, x;
      if (r.collapsible && z.length === 0 && r.collapsedByDefault) {
        h.addClass(r.collapsedClass).children().addClass(r.collapsedClass);
      } else {
        y = a(h.data("easytabs").panel);
        x = h.data("easytabs").ajax;
        if (x && (!r.cache || !h.data("easytabs").cached)) {
          q.trigger("easytabs:ajax:beforeSend", [l, y]);
          y.load(x, function (B, A, C) {
            h.data("easytabs").cached = true;
            q.trigger("easytabs:ajax:complete", [l, y, B, A, C]);
          });
        }
        h.data("easytabs").panel.show().addClass(r.panelActiveClass);
        h.addClass(r.tabActiveClass).children().addClass(r.tabActiveClass);
      }
      q.trigger("easytabs:initialised", [l, y]);
    };
    var w = function () {
      f.tabs.children("a").bind(r.bind_str, function (x) {
        r.cycle = false;
        d = false;
        f.selectTab(a(this));
        x.preventDefault ? x.preventDefault() : (x.returnValue = false);
      });
    };
    var o = function (z, D, E, H) {
      f.panels.stop(true, true);
      if (u(q, "easytabs:before", [z, D, r])) {
        var A = f.panels.filter(":visible"),
          y = D.parent(),
          F,
          x,
          C,
          G,
          B = window.location.hash.match(/^[^\?]*/)[0];
        if (r.animate) {
          F = s(D);
          x = A.length ? k(A) : 0;
          C = F - x;
        }
        m = B;
        G = function () {
          q.trigger("easytabs:midTransition", [z, D, r]);
          if (r.animate && r.transitionIn == "fadeIn") {
            if (C < 0) {
              y.animate({ height: y.height() + C }, v.halfSpeed).css({
                "min-height": "",
              });
            }
          }
          if (r.updateHash && !d) {
            window.location.hash = "#" + D.attr("id");
          } else {
            d = false;
          }
          D[v.show](v.speed, r.transitionInEasing, function () {
            y.css({ height: "", "min-height": "" });
            q.trigger("easytabs:after", [z, D, r]);
            if (typeof H == "function") {
              H();
            }
          });
        };
        if (E && (!r.cache || !z.parent().data("easytabs").cached)) {
          q.trigger("easytabs:ajax:beforeSend", [z, D]);
          D.load(E, function (J, I, K) {
            z.parent().data("easytabs").cached = true;
            q.trigger("easytabs:ajax:complete", [z, D, J, I, K]);
          });
        }
        if (r.animate && r.transitionOut == "fadeOut") {
          if (C > 0) {
            y.animate({ height: y.height() + C }, v.halfSpeed);
          } else {
            y.css({ "min-height": y.height() });
          }
        }
        f.tabs
          .filter("." + r.tabActiveClass)
          .removeClass(r.tabActiveClass)
          .children()
          .removeClass(r.tabActiveClass);
        f.tabs
          .filter("." + r.collapsedClass)
          .removeClass(r.collapsedClass)
          .children()
          .removeClass(r.collapsedClass);
        z.parent()
          .addClass(r.tabActiveClass)
          .children()
          .addClass(r.tabActiveClass);
        f.panels
          .filter("." + r.panelActiveClass)
          .removeClass(r.panelActiveClass);
        D.addClass(r.panelActiveClass);
        if (A.length) {
          A[v.hide](v.speed, r.transitionOutEasing, G);
        } else {
          D[v.uncollapse](v.speed, r.transitionUncollapseEasing, G);
        }
      }
    };
    var s = function (z) {
      if (z.data("easytabs") && z.data("easytabs").lastHeight) {
        return z.data("easytabs").lastHeight;
      }
      var B = z.css("display"),
        y,
        x;
      try {
        y = a("<div></div>", {
          position: "absolute",
          visibility: "hidden",
          overflow: "hidden",
        });
      } catch (A) {
        y = a("<div></div>", { visibility: "hidden", overflow: "hidden" });
      }
      x = z
        .wrap(y)
        .css({ position: "relative", visibility: "hidden", display: "block" })
        .outerHeight();
      z.unwrap();
      z.css({
        position: z.data("easytabs").position,
        visibility: z.data("easytabs").visibility,
        display: B,
      });
      z.data("easytabs").lastHeight = x;
      return x;
    };
    var k = function (y) {
      var x = y.outerHeight();
      if (y.data("easytabs")) {
        y.data("easytabs").lastHeight = x;
      } else {
        y.data("easytabs", { lastHeight: x });
      }
      return x;
    };
    var n = function () {
      if (typeof a(window).hashchange === "function") {
        a(window).hashchange(function () {
          f.selectTabFromHashChange();
        });
      } else {
        if (a.address && typeof a.address.change === "function") {
          a.address.change(function () {
            f.selectTabFromHashChange();
          });
        }
      }
    };
    var c = function () {
      var x;
      if (r.cycle) {
        x = f.tabs.index(h);
        setTimeout(function () {
          f.cycleTabs(x + 1);
        }, r.cycle);
      }
    };
    f.init();
  };
  a.fn.easytabs = function (c) {
    var b = arguments;
    return this.each(function () {
      var e = a(this),
        d = e.data("easytabs");
      if (undefined === d) {
        d = new a.easytabs(this, c);
        e.data("easytabs", d);
      }
      if (d.publicMethods[c]) {
        return d.publicMethods[c](Array.prototype.slice.call(b, 1));
      }
    });
  };
})(jQuery);

// 12. asPieProgress (CIRCLE PROGRESS BAR)
/**
 * jQuery asPieProgress v0.4.6
 * https://github.com/amazingSurge/jquery-asPieProgress
 *
 * Copyright (c) amazingSurge
 * Released under the LGPL-3.0 license
 */
!(function (t, e) {
  if ("function" == typeof define && define.amd) define(["jquery"], e);
  else if ("undefined" != typeof exports) e(require("jquery"));
  else {
    var i = { exports: {} };
    e(t.jQuery), (t.jqueryAsPieProgressEs = i.exports);
  }
})(this, function (t) {
  "use strict";
  function e(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function i(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  var n = e(t),
    s =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          },
    r = (function () {
      function t(t, e) {
        for (var i = 0; i < e.length; i++) {
          var n = e[i];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      return function (e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
      };
    })(),
    a = function (t, e) {
      var i = document.createElementNS("http://www.w3.org/2000/svg", t);
      if (!e) return i;
      for (var n in e)
        Object.hasOwnProperty.call(e, n) && i.setAttribute(n, e[n]);
      return i;
    };
  Date.now ||
    (Date.now = function () {
      return new Date().getTime();
    });
  for (
    var o = ["webkit", "moz"], u = 0;
    u < o.length && !window.requestAnimationFrame;
    ++u
  ) {
    var h = o[u];
    (window.requestAnimationFrame = window[h + "RequestAnimationFrame"]),
      (window.cancelAnimationFrame =
        window[h + "CancelAnimationFrame"] ||
        window[h + "CancelRequestAnimationFrame"]);
  }
  (!/iP(ad|hone|od).*OS (6|7|8)/.test(window.navigator.userAgent) &&
    window.requestAnimationFrame &&
    window.cancelAnimationFrame) ||
    !(function () {
      var t = 0;
      (window.requestAnimationFrame = function (e) {
        var i = l(),
          n = Math.max(t + 16, i);
        return setTimeout(function () {
          e((t = n));
        }, n - i);
      }),
        (window.cancelAnimationFrame = clearTimeout);
    })();
  var l = function () {
      return "undefined" != typeof window.performance && window.performance.now
        ? window.performance.now()
        : Date.now();
    },
    f = function (t) {
      return "string" == typeof t && t.indexOf("%") !== -1;
    },
    c = "createElementNS" in document && new a("svg", {}).createSVGRect,
    m = function (t, e, i, n) {
      var s = function (t, e) {
          return 1 - 3 * e + 3 * t;
        },
        r = function (t, e) {
          return 3 * e - 6 * t;
        },
        a = function (t) {
          return 3 * t;
        },
        o = function (t, e, i) {
          return ((s(e, i) * t + r(e, i)) * t + a(e)) * t;
        },
        u = function (t, e, i) {
          return 3 * s(e, i) * t * t + 2 * r(e, i) * t + a(e);
        },
        h = function (e) {
          for (var n = e, s = 0; s < 4; ++s) {
            var r = u(n, t, i);
            if (0 === r) return n;
            var a = o(n, t, i) - e;
            n -= a / r;
          }
          return n;
        };
      return t === e && i === n
        ? {
            css: "linear",
            fn: function (t) {
              return t;
            },
          }
        : {
            css: "cubic-bezier(" + t + "," + e + "," + i + "," + n + ")",
            fn: function (t) {
              return o(h(t), e, n);
            },
          };
    },
    d = {
      ease: m(0.25, 0.1, 0.25, 1),
      linear: m(0, 0, 1, 1),
      "ease-in": m(0.42, 0, 1, 1),
      "ease-out": m(0, 0, 0.58, 1),
      "ease-in-out": m(0.42, 0, 0.58, 1),
    },
    p = {
      namespace: "asPieProgress",
      classes: {
        svg: "pie_progress__svg",
        element: "pie_progress",
        number: "pie_progress__number",
        content: "pie_progress__content",
      },
      min: 0,
      max: 100,
      goal: 100,
      size: 160,
      speed: 15,
      barcolor: "#ef1e25",
      barsize: "4",
      trackcolor: "#f2f2f2",
      fillcolor: "none",
      easing: "ease",
      numberCallback: function (t) {
        var e = Math.round(this.getPercentage(t));
        return e + "%";
      },
      contentCallback: null,
    },
    g = "asPieProgress",
    v = (function () {
      function t(e, s) {
        i(this, t),
          (this.element = e),
          (this.$element = (0, n.default)(e)),
          (this.options = n.default.extend(!0, {}, p, s, this.$element.data())),
          (this.namespace = this.options.namespace),
          (this.classes = this.options.classes),
          (this.easing = d[this.options.easing] || d.ease),
          this.$element.addClass(this.classes.element),
          (this.min = this.$element.attr("aria-valuemin")),
          (this.max = this.$element.attr("aria-valuemax")),
          (this.min = this.min ? parseInt(this.min, 10) : this.options.min),
          (this.max = this.max ? parseInt(this.max, 10) : this.options.max),
          (this.first = this.$element.attr("aria-valuenow")),
          (this.first = this.first
            ? parseInt(this.first, 10)
            : this.options.first
            ? this.options.first
            : this.min),
          (this.now = this.first),
          (this.goal = this.options.goal),
          (this._frameId = null),
          (this.initialized = !1),
          this._trigger("init"),
          this.init();
      }
      return (
        r(
          t,
          [
            {
              key: "init",
              value: function () {
                (this.$number = this.$element.find("." + this.classes.number)),
                  (this.$content = this.$element.find(
                    "." + this.classes.content
                  )),
                  (this.size = this.options.size),
                  (this.width = this.size),
                  (this.height = this.size),
                  this.prepare(),
                  (this.initialized = !0),
                  this._trigger("ready");
              },
            },
            {
              key: "prepare",
              value: function () {
                c &&
                  ((this.svg = new a("svg", {
                    version: "1.1",
                    preserveAspectRatio: "xMinYMin meet",
                    viewBox: "0 0 " + this.width + " " + this.height,
                  })),
                  this.buildTrack(),
                  this.buildBar(),
                  (0, n.default)('<div class="' + this.classes.svg + '"></div>')
                    .append(this.svg)
                    .appendTo(this.$element));
              },
            },
            {
              key: "buildTrack",
              value: function () {
                var t = this.size,
                  e = this.size,
                  i = e / 2,
                  n = t / 2,
                  s = this.options.barsize,
                  r = new a("ellipse", {
                    rx: i - s / 2,
                    ry: n - s / 2,
                    cx: i,
                    cy: n,
                    stroke: this.options.trackcolor,
                    fill: this.options.fillcolor,
                    "stroke-width": s,
                  });
                this.svg.appendChild(r);
              },
            },
            {
              key: "buildBar",
              value: function () {
                if (c) {
                  var t = new a("path", {
                    fill: "none",
                    "stroke-width": this.options.barsize,
                    stroke: this.options.barcolor,
                  });
                  (this.bar = t),
                    this.svg.appendChild(t),
                    this._drawBar(this.first),
                    this._updateBar();
                }
              },
            },
            {
              key: "_drawBar",
              value: function (t) {
                if (c) {
                  this.barGoal = t;
                  var e = this.size,
                    i = this.size,
                    n = i / 2,
                    s = e / 2,
                    r = 0,
                    a = this.options.barsize,
                    o = Math.min(n, s) - a / 2;
                  this.r = o;
                  var u = this.getPercentage(t);
                  100 === u && (u -= 1e-4);
                  var h = r + (u * Math.PI * 2) / 100,
                    l = n + o * Math.sin(r),
                    f = n + o * Math.sin(h),
                    m = s - o * Math.cos(r),
                    d = s - o * Math.cos(h),
                    p = 0;
                  h - r > Math.PI && (p = 1);
                  var g =
                    "M" +
                    l +
                    "," +
                    m +
                    " A" +
                    o +
                    "," +
                    o +
                    " 0 " +
                    p +
                    " 1 " +
                    f +
                    "," +
                    d;
                  this.bar.setAttribute("d", g);
                }
              },
            },
            {
              key: "_updateBar",
              value: function () {
                if (c) {
                  var t = this.getPercentage(this.now),
                    e = this.bar.getTotalLength(),
                    i = e * (1 - t / this.getPercentage(this.barGoal));
                  (this.bar.style.strokeDasharray = e + " " + e),
                    (this.bar.style.strokeDashoffset = i);
                }
              },
            },
            {
              key: "_trigger",
              value: function (t) {
                for (
                  var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), n = 1;
                  n < e;
                  n++
                )
                  i[n - 1] = arguments[n];
                var s = [this].concat(i);
                this.$element.trigger(g + "::" + t, s),
                  (t = t.replace(/\b\w+\b/g, function (t) {
                    return t.substring(0, 1).toUpperCase() + t.substring(1);
                  }));
                var r = "on" + t;
                "function" == typeof this.options[r] &&
                  this.options[r].apply(this, i);
              },
            },
            {
              key: "getPercentage",
              value: function (t) {
                return (100 * (t - this.min)) / (this.max - this.min);
              },
            },
            {
              key: "go",
              value: function (t) {
                var e = this;
                this._clear(),
                  f(t) &&
                    ((t = parseInt(t.replace("%", ""), 10)),
                    (t = Math.round(
                      this.min + (t / 100) * (this.max - this.min)
                    ))),
                  "undefined" == typeof t && (t = this.goal),
                  t > this.max
                    ? (t = this.max)
                    : t < this.min && (t = this.min),
                  this.barGoal < t && this._drawBar(t);
                var i = e.now,
                  n = l(),
                  s =
                    n +
                    (100 * Math.abs(i - t) * e.options.speed) / (e.max - e.min),
                  r = function r(a) {
                    var o = void 0;
                    if (a > s) o = t;
                    else {
                      var u = (a - n) / e.options.speed;
                      (o = Math.round(e.easing.fn(u / 100) * (e.max - e.min))),
                        t > i
                          ? ((o = i + o), o > t && (o = t))
                          : ((o = i - o), o < t && (o = t));
                    }
                    e._update(o),
                      o === t
                        ? (window.cancelAnimationFrame(e._frameId),
                          (e._frameId = null),
                          e.now === e.goal && e._trigger("finish"))
                        : (e._frameId = window.requestAnimationFrame(r));
                  };
                e._frameId = window.requestAnimationFrame(r);
              },
            },
            {
              key: "_update",
              value: function (t) {
                (this.now = t),
                  this._updateBar(),
                  this.$element.attr("aria-valuenow", this.now),
                  this.$number.length > 0 &&
                    "function" == typeof this.options.numberCallback &&
                    this.$number.html(
                      this.options.numberCallback.call(this, [this.now])
                    ),
                  this.$content.length > 0 &&
                    "function" == typeof this.options.contentCallback &&
                    this.$content.html(
                      this.options.contentCallback.call(this, [this.now])
                    ),
                  this._trigger("update", t);
              },
            },
            {
              key: "_clear",
              value: function () {
                this._frameId &&
                  (window.cancelAnimationFrame(this._frameId),
                  (this._frameId = null));
              },
            },
            {
              key: "get",
              value: function () {
                return this.now;
              },
            },
            {
              key: "start",
              value: function () {
                this._clear(), this._trigger("start"), this.go(this.goal);
              },
            },
            {
              key: "reset",
              value: function () {
                this._clear(),
                  this._drawBar(this.first),
                  this._update(this.first),
                  this._trigger("reset");
              },
            },
            {
              key: "stop",
              value: function () {
                this._clear(), this._trigger("stop");
              },
            },
            {
              key: "finish",
              value: function () {
                this._clear(), this._update(this.goal), this._trigger("finish");
              },
            },
            {
              key: "destroy",
              value: function () {
                this.$element.data(g, null), this._trigger("destroy");
              },
            },
          ],
          [
            {
              key: "registerEasing",
              value: function (t) {
                for (
                  var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), n = 1;
                  n < e;
                  n++
                )
                  i[n - 1] = arguments[n];
                d[t] = m.apply(void 0, i);
              },
            },
            {
              key: "getEasing",
              value: function (t) {
                return d[t];
              },
            },
            {
              key: "setDefaults",
              value: function (t) {
                n.default.extend(!0, p, n.default.isPlainObject(t) && t);
              },
            },
          ]
        ),
        t
      );
    })(),
    w = { version: "0.4.6" },
    y = "asPieProgress",
    b = n.default.fn.asPieProgress,
    _ = function (t) {
      for (
        var e = this, i = arguments.length, r = Array(i > 1 ? i - 1 : 0), a = 1;
        a < i;
        a++
      )
        r[a - 1] = arguments[a];
      if ("string" == typeof t) {
        var o = (function () {
          var i = t;
          if (/^_/.test(i)) return { v: !1 };
          if (!/^(get)/.test(i))
            return {
              v: e.each(function () {
                var t = n.default.data(this, y);
                t && "function" == typeof t[i] && t[i].apply(t, r);
              }),
            };
          var s = e.first().data(y);
          return s && "function" == typeof s[i]
            ? { v: s[i].apply(s, r) }
            : void 0;
        })();
        if ("object" === ("undefined" == typeof o ? "undefined" : s(o)))
          return o.v;
      }
      return this.each(function () {
        (0, n.default)(this).data(y) ||
          (0, n.default)(this).data(y, new v(this, t));
      });
    };
  (n.default.fn.asPieProgress = _),
    (n.default.asPieProgress = n.default.extend(
      {
        setDefaults: v.setDefaults,
        registerEasing: v.registerEasing,
        getEasing: v.getEasing,
        noConflict: function () {
          return (n.default.fn.asPieProgress = b), _;
        },
      },
      w
    ));
});

//  13. TWENTYTWENTY

// image comparison. twentytwenty
!(function (t) {
  t.fn.twentytwenty = function (e) {
    var e = t.extend({ default_offset_pct: 0.5, orientation: "horizontal" }, e);
    return this.each(function () {
      var n = e.default_offset_pct,
        i = t(this),
        a = e.orientation,
        s = "vertical" === a ? "down" : "left",
        d = "vertical" === a ? "up" : "right";
      i.wrap("<div class='twentytwenty-wrapper twentytwenty-" + a + "'></div>"),
        i.append("<div class='twentytwenty-overlay'></div>");
      var r = i.find("img:first"),
        w = i.find("img:last");
      i.append("<div class='twentytwenty-handle'></div>");
      var c = i.find(".twentytwenty-handle");
      c.append("<span class='twentytwenty-" + s + "-arrow'></span>"),
        c.append("<span class='twentytwenty-" + d + "-arrow'></span>"),
        i.addClass("twentytwenty-container"),
        r.addClass("twentytwenty-before"),
        w.addClass("twentytwenty-after");
      var o = i.find(".twentytwenty-overlay"),
        f = i.data("before"),
        l = i.data("after");
      o.append("<div class='twentytwenty-before-label'>" + f + "</div>"),
        o.append("<div class='twentytwenty-after-label'>" + l + "</div>");
      var v = function (t) {
          var e = r.width(),
            n = r.height();
          return {
            w: e + "px",
            h: n + "px",
            cw: t * e + "px",
            ch: t * n + "px",
          };
        },
        p = function (t) {
          "vertical" === a
            ? r.css("clip", "rect(0," + t.w + "," + t.ch + ",0)")
            : r.css("clip", "rect(0," + t.cw + "," + t.h + ",0)"),
            i.css("height", t.h);
        },
        y = function (t) {
          var e = v(t);
          c.css(
            "vertical" === a ? "top" : "left",
            "vertical" === a ? e.ch : e.cw
          ),
            p(e);
        };
      t(window).on("resize.twentytwenty", function () {
        y(n);
      });
      var h = 0,
        u = 0;
      c.on("movestart", function (t) {
        ((t.distX > t.distY && t.distX < -t.distY) ||
          (t.distX < t.distY && t.distX > -t.distY)) &&
        "vertical" !== a
          ? t.preventDefault()
          : ((t.distX < t.distY && t.distX < -t.distY) ||
              (t.distX > t.distY && t.distX > -t.distY)) &&
            "vertical" === a &&
            t.preventDefault(),
          i.addClass("active"),
          (h = i.offset().left),
          (offsetY = i.offset().top),
          (u = r.width()),
          (imgHeight = r.height());
      }),
        c.on("moveend", function () {
          i.removeClass("active");
        }),
        c.on("move", function (t) {
          i.hasClass("active") &&
            ((n =
              "vertical" === a
                ? (t.pageY - offsetY) / imgHeight
                : (t.pageX - h) / u),
            0 > n && (n = 0),
            n > 1 && (n = 1),
            y(n));
        }),
        i.find("img").on("mousedown", function (t) {
          t.preventDefault();
        }),
        t(window).trigger("resize.twentytwenty");
    });
  };
})(jQuery);

// 14. EVENT MOVE

!(function (e) {
  "function" == typeof define && define.amd
    ? define([], e)
    : "undefined" != typeof module && null !== module && module.exports
    ? (module.exports = e)
    : e();
})(function () {
  function e(e) {
    return new CustomEvent(e, P);
  }
  function t(e) {
    return e[B] || (e[B] = {});
  }
  function n(e, n, i, o, a) {
    function c(e) {
      i(e, o);
    }
    n = n.split(O);
    for (var u, r, d = t(e), m = n.length; m--; )
      (r = n[m]),
        (u = d[r] || (d[r] = [])),
        u.push([i, c]),
        e.addEventListener(r, c);
  }
  function i(e, n, i, o) {
    n = n.split(O);
    var a,
      c,
      u,
      r = t(e),
      d = n.length;
    if (r)
      for (; d--; )
        if (((a = n[d]), (c = r[a])))
          for (u = c.length; u--; )
            c[u][0] === i &&
              (e.removeEventListener(a, c[u][1]), c.splice(u, 1));
  }
  function o(t, n, i) {
    var o = e(n);
    i && L(o, i), t.dispatchEvent(o);
  }
  function a(e) {
    function t(e) {
      i ? (n(), C(t), (o = !0), (i = !1)) : (o = !1);
    }
    var n = e,
      i = !1,
      o = !1;
    (this.kick = function (e) {
      (i = !0), o || t();
    }),
      (this.end = function (e) {
        var t = n;
        e &&
          (o
            ? ((n = i
                ? function () {
                    t(), e();
                  }
                : e),
              (i = !0))
            : e());
      });
  }
  function c() {}
  function u(e) {
    e.preventDefault();
  }
  function r(e) {
    return !!D[e.target.tagName.toLowerCase()];
  }
  function d(e) {
    return 1 === e.which && !e.ctrlKey && !e.altKey;
  }
  function m(e, t) {
    var n, i;
    if (e.identifiedTouch) return e.identifiedTouch(t);
    for (n = -1, i = e.length; ++n < i; )
      if (e[n].identifier === t) return e[n];
  }
  function f(e, t) {
    var n = m(e.changedTouches, t.identifier);
    if (n && (n.pageX !== t.pageX || n.pageY !== t.pageY)) return n;
  }
  function v(e) {
    d(e) && (r(e) || (n(document, N.move, s, e), n(document, N.cancel, l, e)));
  }
  function s(e, t) {
    y(e, t, e, g);
  }
  function l(e, t) {
    g();
  }
  function g() {
    i(document, N.move, s), i(document, N.cancel, l);
  }
  function p(e) {
    if (!D[e.target.tagName.toLowerCase()]) {
      var t = e.changedTouches[0],
        i = {
          target: t.target,
          pageX: t.pageX,
          pageY: t.pageY,
          identifier: t.identifier,
          touchmove: function (e, t) {
            h(e, t);
          },
          touchend: function (e, t) {
            X(e, t);
          },
        };
      n(document, z.move, i.touchmove, i), n(document, z.cancel, i.touchend, i);
    }
  }
  function h(e, t) {
    var n = f(e, t);
    n && y(e, t, n, Y);
  }
  function X(e, t) {
    var n = m(e.changedTouches, t.identifier);
    n && Y(t);
  }
  function Y(e) {
    i(document, z.move, e.touchmove), i(document, z.cancel, e.touchend);
  }
  function y(e, t, n, i) {
    var o = n.pageX - t.pageX,
      a = n.pageY - t.pageY;
    R * R > o * o + a * a || w(e, t, n, o, a, i);
  }
  function w(e, t, n, i, a, u) {
    var r = e.targetTouches,
      d = e.timeStamp - t.timeStamp,
      m = {
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        startX: t.pageX,
        startY: t.pageY,
        distX: i,
        distY: a,
        deltaX: i,
        deltaY: a,
        pageX: n.pageX,
        pageY: n.pageY,
        velocityX: i / d,
        velocityY: a / d,
        identifier: t.identifier,
        targetTouches: r,
        finger: r ? r.length : 1,
        enableMove: function () {
          (this.moveEnabled = !0), (this.enableMove = c), e.preventDefault();
        },
      };
    o(t.target, "movestart", m), u(t);
  }
  function T(e, t) {
    var n = t.timer;
    (t.touch = e), (t.timeStamp = e.timeStamp), n.kick();
  }
  function b(e, t) {
    var n = t.target,
      o = t.event,
      a = t.timer;
    S(),
      Q(n, o, a, function () {
        setTimeout(function () {
          i(n, "click", u);
        }, 0);
      });
  }
  function S() {
    i(document, N.move, T), i(document, N.end, b);
  }
  function k(e, t) {
    var n = t.event,
      i = t.timer,
      o = f(e, n);
    o &&
      (e.preventDefault(),
      (n.targetTouches = e.targetTouches),
      (t.touch = o),
      (t.timeStamp = e.timeStamp),
      i.kick());
  }
  function K(e, t) {
    var n = t.target,
      i = t.event,
      o = t.timer,
      a = m(e.changedTouches, i.identifier);
    a && (j(t), Q(n, i, o));
  }
  function j(e) {
    i(document, z.move, e.activeTouchmove),
      i(document, z.end, e.activeTouchend);
  }
  function E(e, t, n) {
    var i = n - e.timeStamp;
    (e.distX = t.pageX - e.startX),
      (e.distY = t.pageY - e.startY),
      (e.deltaX = t.pageX - e.pageX),
      (e.deltaY = t.pageY - e.pageY),
      (e.velocityX = 0.3 * e.velocityX + (0.7 * e.deltaX) / i),
      (e.velocityY = 0.3 * e.velocityY + (0.7 * e.deltaY) / i),
      (e.pageX = t.pageX),
      (e.pageY = t.pageY);
  }
  function Q(e, t, n, i) {
    n.end(function () {
      return o(e, "moveend", t), i && i();
    });
  }
  function q(e) {
    function t(e) {
      E(i, c.touch, c.timeStamp), o(c.target, "move", i);
    }
    if (!e.defaultPrevented && e.moveEnabled) {
      var i = {
          startX: e.startX,
          startY: e.startY,
          pageX: e.pageX,
          pageY: e.pageY,
          distX: e.distX,
          distY: e.distY,
          deltaX: e.deltaX,
          deltaY: e.deltaY,
          velocityX: e.velocityX,
          velocityY: e.velocityY,
          identifier: e.identifier,
          targetTouches: e.targetTouches,
          finger: e.finger,
        },
        c = {
          target: e.target,
          event: i,
          timer: new a(t),
          touch: void 0,
          timeStamp: e.timeStamp,
        };
      void 0 === e.identifier
        ? (n(e.target, "click", u),
          n(document, N.move, T, c),
          n(document, N.end, b, c))
        : ((c.activeTouchmove = function (e, t) {
            k(e, t);
          }),
          (c.activeTouchend = function (e, t) {
            K(e, t);
          }),
          n(document, z.move, c.activeTouchmove, c),
          n(document, z.end, c.activeTouchend, c));
    }
  }
  function A(e) {
    e.enableMove();
  }
  function F(e) {
    e.enableMove();
  }
  function M(e) {
    e.enableMove();
  }
  function x(e) {
    var t = e.handler;
    e.handler = function (e) {
      for (var n, i = G.length; i--; ) (n = G[i]), (e[n] = e.originalEvent[n]);
      t.apply(this, arguments);
    };
  }
  var L = Object.assign || (window.jQuery && jQuery.extend),
    R = 8,
    C = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (e, t) {
          return window.setTimeout(function () {
            e();
          }, 25);
        }
      );
    })(),
    D = { textarea: !0, input: !0, select: !0, button: !0 },
    N = { move: "mousemove", cancel: "mouseup dragstart", end: "mouseup" },
    z = { move: "touchmove", cancel: "touchend", end: "touchend" },
    O = /\s+/,
    P = { bubbles: !0, cancelable: !0 },
    B = Symbol("events");
  if (
    (n(document, "mousedown", v),
    n(document, "touchstart", p),
    n(document, "movestart", q),
    window.jQuery)
  ) {
    var G =
      "startX startY pageX pageY distX distY deltaX deltaY velocityX velocityY".split(
        " "
      );
    (jQuery.event.special.movestart = {
      setup: function () {
        return n(this, "movestart", A), !1;
      },
      teardown: function () {
        return i(this, "movestart", A), !1;
      },
      add: x,
    }),
      (jQuery.event.special.move = {
        setup: function () {
          return n(this, "movestart", F), !1;
        },
        teardown: function () {
          return i(this, "movestart", F), !1;
        },
        add: x,
      }),
      (jQuery.event.special.moveend = {
        setup: function () {
          return n(this, "movestart", M), !1;
        },
        teardown: function () {
          return i(this, "movestart", M), !1;
        },
        add: x,
      });
  }
});

// 15. CAROUSEL
/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
!(function (a, b, c, d) {
  function e(b, c) {
    (this.settings = null),
      (this.options = a.extend({}, e.Defaults, c)),
      (this.$element = a(b)),
      (this._handlers = {}),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._widths = []),
      (this._invalidated = {}),
      (this._pipe = []),
      (this._drag = {
        time: null,
        target: null,
        pointer: null,
        stage: { start: null, current: null },
        direction: null,
      }),
      (this._states = {
        current: {},
        tags: {
          initializing: ["busy"],
          animating: ["busy"],
          dragging: ["interacting"],
        },
      }),
      a.each(
        ["onResize", "onThrottledResize"],
        a.proxy(function (b, c) {
          this._handlers[c] = a.proxy(this[c], this);
        }, this)
      ),
      a.each(
        e.Plugins,
        a.proxy(function (a, b) {
          this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
        }, this)
      ),
      a.each(
        e.Workers,
        a.proxy(function (b, c) {
          this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
        }, this)
      ),
      this.setup(),
      this.initialize();
  }
  (e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: "swing",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab",
  }),
    (e.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
    (e.Type = { Event: "event", State: "state" }),
    (e.Plugins = {}),
    (e.Workers = [
      {
        filter: ["width", "settings"],
        run: function () {
          this._width = this.$element.width();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current = this._items && this._items[this.relative(this._current)];
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          this.$stage.children(".cloned").remove();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b = this.settings.margin || "",
            c = !this.settings.autoWidth,
            d = this.settings.rtl,
            e = {
              width: "auto",
              "margin-left": d ? b : "",
              "margin-right": d ? "" : b,
            };
          !c && this.$stage.children().css(e), (a.css = e);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b =
              (this.width() / this.settings.items).toFixed(3) -
              this.settings.margin,
            c = null,
            d = this._items.length,
            e = !this.settings.autoWidth,
            f = [];
          for (a.items = { merge: !1, width: b }; d--; )
            (c = this._mergers[d]),
              (c =
                (this.settings.mergeFit && Math.min(c, this.settings.items)) ||
                c),
              (a.items.merge = c > 1 || a.items.merge),
              (f[d] = e ? b * c : this._items[d].width());
          this._widths = f;
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var b = [],
            c = this._items,
            d = this.settings,
            e = Math.max(2 * d.items, 4),
            f = 2 * Math.ceil(c.length / 2),
            g = d.loop && c.length ? (d.rewind ? e : Math.max(e, f)) : 0,
            h = "",
            i = "";
          for (g /= 2; g--; )
            b.push(this.normalize(b.length / 2, !0)),
              (h += c[b[b.length - 1]][0].outerHTML),
              b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
              (i = c[b[b.length - 1]][0].outerHTML + i);
          (this._clones = b),
            a(h).addClass("cloned").appendTo(this.$stage),
            a(i).addClass("cloned").prependTo(this.$stage);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          for (
            var a = this.settings.rtl ? 1 : -1,
              b = this._clones.length + this._items.length,
              c = -1,
              d = 0,
              e = 0,
              f = [];
            ++c < b;

          )
            (d = f[c - 1] || 0),
              (e = this._widths[this.relative(c)] + this.settings.margin),
              f.push(d + e * a);
          this._coordinates = f;
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var a = this.settings.stagePadding,
            b = this._coordinates,
            c = {
              width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
              "padding-left": a || "",
              "padding-right": a || "",
            };
          this.$stage.css(c);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b = this._coordinates.length,
            c = !this.settings.autoWidth,
            d = this.$stage.children();
          if (c && a.items.merge)
            for (; b--; )
              (a.css.width = this._widths[this.relative(b)]),
                d.eq(b).css(a.css);
          else c && ((a.css.width = a.items.width), d.css(a.css));
        },
      },
      {
        filter: ["items"],
        run: function () {
          this._coordinates.length < 1 && this.$stage.removeAttr("style");
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          (a.current = a.current ? this.$stage.children().index(a.current) : 0),
            (a.current = Math.max(
              this.minimum(),
              Math.min(this.maximum(), a.current)
            )),
            this.reset(a.current);
        },
      },
      {
        filter: ["position"],
        run: function () {
          this.animate(this.coordinates(this._current));
        },
      },
      {
        filter: ["width", "position", "items", "settings"],
        run: function () {
          var a,
            b,
            c,
            d,
            e = this.settings.rtl ? 1 : -1,
            f = 2 * this.settings.stagePadding,
            g = this.coordinates(this.current()) + f,
            h = g + this.width() * e,
            i = [];
          for (c = 0, d = this._coordinates.length; c < d; c++)
            (a = this._coordinates[c - 1] || 0),
              (b = Math.abs(this._coordinates[c]) + f * e),
              ((this.op(a, "<=", g) && this.op(a, ">", h)) ||
                (this.op(b, "<", g) && this.op(b, ">", h))) &&
                i.push(c);
          this.$stage.children(".active").removeClass("active"),
            this.$stage
              .children(":eq(" + i.join("), :eq(") + ")")
              .addClass("active"),
            this.settings.center &&
              (this.$stage.children(".center").removeClass("center"),
              this.$stage.children().eq(this.current()).addClass("center"));
        },
      },
    ]),
    (e.prototype.initialize = function () {
      if (
        (this.enter("initializing"),
        this.trigger("initialize"),
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
        this.settings.autoWidth && !this.is("pre-loading"))
      ) {
        var b, c, e;
        (b = this.$element.find("img")),
          (c = this.settings.nestedItemSelector
            ? "." + this.settings.nestedItemSelector
            : d),
          (e = this.$element.children(c).width()),
          b.length && e <= 0 && this.preloadAutoWidthImages(b);
      }
      this.$element.addClass(this.options.loadingClass),
        (this.$stage = a(
          "<" +
            this.settings.stageElement +
            ' class="' +
            this.settings.stageClass +
            '"/>'
        ).wrap('<div class="' + this.settings.stageOuterClass + '"/>')),
        this.$element.append(this.$stage.parent()),
        this.replace(this.$element.children().not(this.$stage.parent())),
        this.$element.is(":visible")
          ? this.refresh()
          : this.invalidate("width"),
        this.$element
          .removeClass(this.options.loadingClass)
          .addClass(this.options.loadedClass),
        this.registerEventHandlers(),
        this.leave("initializing"),
        this.trigger("initialized");
    }),
    (e.prototype.setup = function () {
      var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
      c
        ? (a.each(c, function (a) {
            a <= b && a > d && (d = Number(a));
          }),
          (e = a.extend({}, this.options, c[d])),
          "function" == typeof e.stagePadding &&
            (e.stagePadding = e.stagePadding()),
          delete e.responsive,
          e.responsiveClass &&
            this.$element.attr(
              "class",
              this.$element
                .attr("class")
                .replace(
                  new RegExp(
                    "(" + this.options.responsiveClass + "-)\\S+\\s",
                    "g"
                  ),
                  "$1" + d
                )
            ))
        : (e = a.extend({}, this.options)),
        this.trigger("change", { property: { name: "settings", value: e } }),
        (this._breakpoint = d),
        (this.settings = e),
        this.invalidate("settings"),
        this.trigger("changed", {
          property: { name: "settings", value: this.settings },
        });
    }),
    (e.prototype.optionsLogic = function () {
      this.settings.autoWidth &&
        ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    }),
    (e.prototype.prepare = function (b) {
      var c = this.trigger("prepare", { content: b });
      return (
        c.data ||
          (c.data = a("<" + this.settings.itemElement + "/>")
            .addClass(this.options.itemClass)
            .append(b)),
        this.trigger("prepared", { content: c.data }),
        c.data
      );
    }),
    (e.prototype.update = function () {
      for (
        var b = 0,
          c = this._pipe.length,
          d = a.proxy(function (a) {
            return this[a];
          }, this._invalidated),
          e = {};
        b < c;

      )
        (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
          this._pipe[b].run(e),
          b++;
      (this._invalidated = {}), !this.is("valid") && this.enter("valid");
    }),
    (e.prototype.width = function (a) {
      switch ((a = a || e.Width.Default)) {
        case e.Width.Inner:
        case e.Width.Outer:
          return this._width;
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          );
      }
    }),
    (e.prototype.refresh = function () {
      this.enter("refreshing"),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave("refreshing"),
        this.trigger("refreshed");
    }),
    (e.prototype.onThrottledResize = function () {
      b.clearTimeout(this.resizeTimer),
        (this.resizeTimer = b.setTimeout(
          this._handlers.onResize,
          this.settings.responsiveRefreshRate
        ));
    }),
    (e.prototype.onResize = function () {
      return (
        !!this._items.length &&
        this._width !== this.$element.width() &&
        !!this.$element.is(":visible") &&
        (this.enter("resizing"),
        this.trigger("resize").isDefaultPrevented()
          ? (this.leave("resizing"), !1)
          : (this.invalidate("width"),
            this.refresh(),
            this.leave("resizing"),
            void this.trigger("resized")))
      );
    }),
    (e.prototype.registerEventHandlers = function () {
      a.support.transition &&
        this.$stage.on(
          a.support.transition.end + ".owl.core",
          a.proxy(this.onTransitionEnd, this)
        ),
        this.settings.responsive !== !1 &&
          this.on(b, "resize", this._handlers.onThrottledResize),
        this.settings.mouseDrag &&
          (this.$element.addClass(this.options.dragClass),
          this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
          this.$stage.on(
            "dragstart.owl.core selectstart.owl.core",
            function () {
              return !1;
            }
          )),
        this.settings.touchDrag &&
          (this.$stage.on(
            "touchstart.owl.core",
            a.proxy(this.onDragStart, this)
          ),
          this.$stage.on(
            "touchcancel.owl.core",
            a.proxy(this.onDragEnd, this)
          ));
    }),
    (e.prototype.onDragStart = function (b) {
      var d = null;
      3 !== b.which &&
        (a.support.transform
          ? ((d = this.$stage
              .css("transform")
              .replace(/.*\(|\)| /g, "")
              .split(",")),
            (d = {
              x: d[16 === d.length ? 12 : 4],
              y: d[16 === d.length ? 13 : 5],
            }))
          : ((d = this.$stage.position()),
            (d = {
              x: this.settings.rtl
                ? d.left +
                  this.$stage.width() -
                  this.width() +
                  this.settings.margin
                : d.left,
              y: d.top,
            })),
        this.is("animating") &&
          (a.support.transform ? this.animate(d.x) : this.$stage.stop(),
          this.invalidate("position")),
        this.$element.toggleClass(
          this.options.grabClass,
          "mousedown" === b.type
        ),
        this.speed(0),
        (this._drag.time = new Date().getTime()),
        (this._drag.target = a(b.target)),
        (this._drag.stage.start = d),
        (this._drag.stage.current = d),
        (this._drag.pointer = this.pointer(b)),
        a(c).on(
          "mouseup.owl.core touchend.owl.core",
          a.proxy(this.onDragEnd, this)
        ),
        a(c).one(
          "mousemove.owl.core touchmove.owl.core",
          a.proxy(function (b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on(
              "mousemove.owl.core touchmove.owl.core",
              a.proxy(this.onDragMove, this)
            ),
              (Math.abs(d.x) < Math.abs(d.y) && this.is("valid")) ||
                (b.preventDefault(),
                this.enter("dragging"),
                this.trigger("drag"));
          }, this)
        ));
    }),
    (e.prototype.onDragMove = function (a) {
      var b = null,
        c = null,
        d = null,
        e = this.difference(this._drag.pointer, this.pointer(a)),
        f = this.difference(this._drag.stage.start, e);
      this.is("dragging") &&
        (a.preventDefault(),
        this.settings.loop
          ? ((b = this.coordinates(this.minimum())),
            (c = this.coordinates(this.maximum() + 1) - b),
            (f.x = ((((f.x - b) % c) + c) % c) + b))
          : ((b = this.settings.rtl
              ? this.coordinates(this.maximum())
              : this.coordinates(this.minimum())),
            (c = this.settings.rtl
              ? this.coordinates(this.minimum())
              : this.coordinates(this.maximum())),
            (d = this.settings.pullDrag ? (-1 * e.x) / 5 : 0),
            (f.x = Math.max(Math.min(f.x, b + d), c + d))),
        (this._drag.stage.current = f),
        this.animate(f.x));
    }),
    (e.prototype.onDragEnd = function (b) {
      var d = this.difference(this._drag.pointer, this.pointer(b)),
        e = this._drag.stage.current,
        f = (d.x > 0) ^ this.settings.rtl ? "left" : "right";
      a(c).off(".owl.core"),
        this.$element.removeClass(this.options.grabClass),
        ((0 !== d.x && this.is("dragging")) || !this.is("valid")) &&
          (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
          this.invalidate("position"),
          this.update(),
          (this._drag.direction = f),
          (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
            this._drag.target.one("click.owl.core", function () {
              return !1;
            })),
        this.is("dragging") &&
          (this.leave("dragging"), this.trigger("dragged"));
    }),
    (e.prototype.closest = function (b, c) {
      var d = -1,
        e = 30,
        f = this.width(),
        g = this.coordinates();
      return (
        this.settings.freeDrag ||
          a.each(
            g,
            a.proxy(function (a, h) {
              return (
                "left" === c && b > h - e && b < h + e
                  ? (d = a)
                  : "right" === c && b > h - f - e && b < h - f + e
                  ? (d = a + 1)
                  : this.op(b, "<", h) &&
                    this.op(b, ">", g[a + 1] || h - f) &&
                    (d = "left" === c ? a + 1 : a),
                d === -1
              );
            }, this)
          ),
        this.settings.loop ||
          (this.op(b, ">", g[this.minimum()])
            ? (d = b = this.minimum())
            : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())),
        d
      );
    }),
    (e.prototype.animate = function (b) {
      var c = this.speed() > 0;
      this.is("animating") && this.onTransitionEnd(),
        c && (this.enter("animating"), this.trigger("translate")),
        a.support.transform3d && a.support.transition
          ? this.$stage.css({
              transform: "translate3d(" + b + "px,0px,0px)",
              transition: this.speed() / 1e3 + "s",
            })
          : c
          ? this.$stage.animate(
              { left: b + "px" },
              this.speed(),
              this.settings.fallbackEasing,
              a.proxy(this.onTransitionEnd, this)
            )
          : this.$stage.css({ left: b + "px" });
    }),
    (e.prototype.is = function (a) {
      return this._states.current[a] && this._states.current[a] > 0;
    }),
    (e.prototype.current = function (a) {
      if (a === d) return this._current;
      if (0 === this._items.length) return d;
      if (((a = this.normalize(a)), this._current !== a)) {
        var b = this.trigger("change", {
          property: { name: "position", value: a },
        });
        b.data !== d && (a = this.normalize(b.data)),
          (this._current = a),
          this.invalidate("position"),
          this.trigger("changed", {
            property: { name: "position", value: this._current },
          });
      }
      return this._current;
    }),
    (e.prototype.invalidate = function (b) {
      return (
        "string" === a.type(b) &&
          ((this._invalidated[b] = !0),
          this.is("valid") && this.leave("valid")),
        a.map(this._invalidated, function (a, b) {
          return b;
        })
      );
    }),
    (e.prototype.reset = function (a) {
      (a = this.normalize(a)),
        a !== d &&
          ((this._speed = 0),
          (this._current = a),
          this.suppress(["translate", "translated"]),
          this.animate(this.coordinates(a)),
          this.release(["translate", "translated"]));
    }),
    (e.prototype.normalize = function (a, b) {
      var c = this._items.length,
        e = b ? 0 : this._clones.length;
      return (
        !this.isNumeric(a) || c < 1
          ? (a = d)
          : (a < 0 || a >= c + e) &&
            (a = ((((a - e / 2) % c) + c) % c) + e / 2),
        a
      );
    }),
    (e.prototype.relative = function (a) {
      return (a -= this._clones.length / 2), this.normalize(a, !0);
    }),
    (e.prototype.maximum = function (a) {
      var b,
        c,
        d,
        e = this.settings,
        f = this._coordinates.length;
      if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
      else if (e.autoWidth || e.merge) {
        for (
          b = this._items.length,
            c = this._items[--b].width(),
            d = this.$element.width();
          b-- &&
          ((c += this._items[b].width() + this.settings.margin), !(c > d));

        );
        f = b + 1;
      } else
        f = e.center ? this._items.length - 1 : this._items.length - e.items;
      return a && (f -= this._clones.length / 2), Math.max(f, 0);
    }),
    (e.prototype.minimum = function (a) {
      return a ? 0 : this._clones.length / 2;
    }),
    (e.prototype.items = function (a) {
      return a === d
        ? this._items.slice()
        : ((a = this.normalize(a, !0)), this._items[a]);
    }),
    (e.prototype.mergers = function (a) {
      return a === d
        ? this._mergers.slice()
        : ((a = this.normalize(a, !0)), this._mergers[a]);
    }),
    (e.prototype.clones = function (b) {
      var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function (a) {
          return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2;
        };
      return b === d
        ? a.map(this._clones, function (a, b) {
            return f(b);
          })
        : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null;
          });
    }),
    (e.prototype.speed = function (a) {
      return a !== d && (this._speed = a), this._speed;
    }),
    (e.prototype.coordinates = function (b) {
      var c,
        e = 1,
        f = b - 1;
      return b === d
        ? a.map(
            this._coordinates,
            a.proxy(function (a, b) {
              return this.coordinates(b);
            }, this)
          )
        : (this.settings.center
            ? (this.settings.rtl && ((e = -1), (f = b + 1)),
              (c = this._coordinates[b]),
              (c += ((this.width() - c + (this._coordinates[f] || 0)) / 2) * e))
            : (c = this._coordinates[f] || 0),
          (c = Math.ceil(c)));
    }),
    (e.prototype.duration = function (a, b, c) {
      return 0 === c
        ? 0
        : Math.min(Math.max(Math.abs(b - a), 1), 6) *
            Math.abs(c || this.settings.smartSpeed);
    }),
    (e.prototype.to = function (a, b) {
      var c = this.current(),
        d = null,
        e = a - this.relative(c),
        f = (e > 0) - (e < 0),
        g = this._items.length,
        h = this.minimum(),
        i = this.maximum();
      this.settings.loop
        ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g),
          (a = c + e),
          (d = ((((a - h) % g) + g) % g) + h),
          d !== a &&
            d - e <= i &&
            d - e > 0 &&
            ((c = d - e), (a = d), this.reset(c)))
        : this.settings.rewind
        ? ((i += 1), (a = ((a % i) + i) % i))
        : (a = Math.max(h, Math.min(i, a))),
        this.speed(this.duration(c, a, b)),
        this.current(a),
        this.$element.is(":visible") && this.update();
    }),
    (e.prototype.next = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) + 1, a);
    }),
    (e.prototype.prev = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) - 1, a);
    }),
    (e.prototype.onTransitionEnd = function (a) {
      if (
        a !== d &&
        (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
      )
        return !1;
      this.leave("animating"), this.trigger("translated");
    }),
    (e.prototype.viewport = function () {
      var d;
      return (
        this.options.responsiveBaseElement !== b
          ? (d = a(this.options.responsiveBaseElement).width())
          : b.innerWidth
          ? (d = b.innerWidth)
          : c.documentElement && c.documentElement.clientWidth
          ? (d = c.documentElement.clientWidth)
          : console.warn("Can not detect viewport width."),
        d
      );
    }),
    (e.prototype.replace = function (b) {
      this.$stage.empty(),
        (this._items = []),
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector &&
          (b = b.find("." + this.settings.nestedItemSelector)),
        b
          .filter(function () {
            return 1 === this.nodeType;
          })
          .each(
            a.proxy(function (a, b) {
              (b = this.prepare(b)),
                this.$stage.append(b),
                this._items.push(b),
                this._mergers.push(
                  1 *
                    b
                      .find("[data-merge]")
                      .addBack("[data-merge]")
                      .attr("data-merge") || 1
                );
            }, this)
          ),
        this.reset(
          this.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0
        ),
        this.invalidate("items");
    }),
    (e.prototype.add = function (b, c) {
      var e = this.relative(this._current);
      (c = c === d ? this._items.length : this.normalize(c, !0)),
        (b = b instanceof jQuery ? b : a(b)),
        this.trigger("add", { content: b, position: c }),
        (b = this.prepare(b)),
        0 === this._items.length || c === this._items.length
          ? (0 === this._items.length && this.$stage.append(b),
            0 !== this._items.length && this._items[c - 1].after(b),
            this._items.push(b),
            this._mergers.push(
              1 *
                b
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            ))
          : (this._items[c].before(b),
            this._items.splice(c, 0, b),
            this._mergers.splice(
              c,
              0,
              1 *
                b
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            )),
        this._items[e] && this.reset(this._items[e].index()),
        this.invalidate("items"),
        this.trigger("added", { content: b, position: c });
    }),
    (e.prototype.remove = function (a) {
      (a = this.normalize(a, !0)),
        a !== d &&
          (this.trigger("remove", { content: this._items[a], position: a }),
          this._items[a].remove(),
          this._items.splice(a, 1),
          this._mergers.splice(a, 1),
          this.invalidate("items"),
          this.trigger("removed", { content: null, position: a }));
    }),
    (e.prototype.preloadAutoWidthImages = function (b) {
      b.each(
        a.proxy(function (b, c) {
          this.enter("pre-loading"),
            (c = a(c)),
            a(new Image())
              .one(
                "load",
                a.proxy(function (a) {
                  c.attr("src", a.target.src),
                    c.css("opacity", 1),
                    this.leave("pre-loading"),
                    !this.is("pre-loading") &&
                      !this.is("initializing") &&
                      this.refresh();
                }, this)
              )
              .attr(
                "src",
                c.attr("src") || c.attr("data-src") || c.attr("data-src-retina")
              );
        }, this)
      );
    }),
    (e.prototype.destroy = function () {
      this.$element.off(".owl.core"),
        this.$stage.off(".owl.core"),
        a(c).off(".owl.core"),
        this.settings.responsive !== !1 &&
          (b.clearTimeout(this.resizeTimer),
          this.off(b, "resize", this._handlers.onThrottledResize));
      for (var d in this._plugins) this._plugins[d].destroy();
      this.$stage.children(".cloned").remove(),
        this.$stage.unwrap(),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$element
          .removeClass(this.options.refreshClass)
          .removeClass(this.options.loadingClass)
          .removeClass(this.options.loadedClass)
          .removeClass(this.options.rtlClass)
          .removeClass(this.options.dragClass)
          .removeClass(this.options.grabClass)
          .attr(
            "class",
            this.$element
              .attr("class")
              .replace(
                new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
                ""
              )
          )
          .removeData("owl.carousel");
    }),
    (e.prototype.op = function (a, b, c) {
      var d = this.settings.rtl;
      switch (b) {
        case "<":
          return d ? a > c : a < c;
        case ">":
          return d ? a < c : a > c;
        case ">=":
          return d ? a <= c : a >= c;
        case "<=":
          return d ? a >= c : a <= c;
      }
    }),
    (e.prototype.on = function (a, b, c, d) {
      a.addEventListener
        ? a.addEventListener(b, c, d)
        : a.attachEvent && a.attachEvent("on" + b, c);
    }),
    (e.prototype.off = function (a, b, c, d) {
      a.removeEventListener
        ? a.removeEventListener(b, c, d)
        : a.detachEvent && a.detachEvent("on" + b, c);
    }),
    (e.prototype.trigger = function (b, c, d, f, g) {
      var h = { item: { count: this._items.length, index: this.current() } },
        i = a.camelCase(
          a
            .grep(["on", b, d], function (a) {
              return a;
            })
            .join("-")
            .toLowerCase()
        ),
        j = a.Event(
          [b, "owl", d || "carousel"].join(".").toLowerCase(),
          a.extend({ relatedTarget: this }, h, c)
        );
      return (
        this._supress[b] ||
          (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(j);
          }),
          this.register({ type: e.Type.Event, name: b }),
          this.$element.trigger(j),
          this.settings &&
            "function" == typeof this.settings[i] &&
            this.settings[i].call(this, j)),
        j
      );
    }),
    (e.prototype.enter = function (b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function (a, b) {
          this._states.current[b] === d && (this._states.current[b] = 0),
            this._states.current[b]++;
        }, this)
      );
    }),
    (e.prototype.leave = function (b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function (a, b) {
          this._states.current[b]--;
        }, this)
      );
    }),
    (e.prototype.register = function (b) {
      if (b.type === e.Type.Event) {
        if (
          (a.event.special[b.name] || (a.event.special[b.name] = {}),
          !a.event.special[b.name].owl)
        ) {
          var c = a.event.special[b.name]._default;
          (a.event.special[b.name]._default = function (a) {
            return !c ||
              !c.apply ||
              (a.namespace && a.namespace.indexOf("owl") !== -1)
              ? a.namespace && a.namespace.indexOf("owl") > -1
              : c.apply(this, arguments);
          }),
            (a.event.special[b.name].owl = !0);
        }
      } else
        b.type === e.Type.State &&
          (this._states.tags[b.name]
            ? (this._states.tags[b.name] = this._states.tags[b.name].concat(
                b.tags
              ))
            : (this._states.tags[b.name] = b.tags),
          (this._states.tags[b.name] = a.grep(
            this._states.tags[b.name],
            a.proxy(function (c, d) {
              return a.inArray(c, this._states.tags[b.name]) === d;
            }, this)
          )));
    }),
    (e.prototype.suppress = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          this._supress[b] = !0;
        }, this)
      );
    }),
    (e.prototype.release = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          delete this._supress[b];
        }, this)
      );
    }),
    (e.prototype.pointer = function (a) {
      var c = { x: null, y: null };
      return (
        (a = a.originalEvent || a || b.event),
        (a =
          a.touches && a.touches.length
            ? a.touches[0]
            : a.changedTouches && a.changedTouches.length
            ? a.changedTouches[0]
            : a),
        a.pageX
          ? ((c.x = a.pageX), (c.y = a.pageY))
          : ((c.x = a.clientX), (c.y = a.clientY)),
        c
      );
    }),
    (e.prototype.isNumeric = function (a) {
      return !isNaN(parseFloat(a));
    }),
    (e.prototype.difference = function (a, b) {
      return { x: a.x - b.x, y: a.y - b.y };
    }),
    (a.fn.owlCarousel = function (b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        var d = a(this),
          f = d.data("owl.carousel");
        f ||
          ((f = new e(this, "object" == typeof b && b)),
          d.data("owl.carousel", f),
          a.each(
            [
              "next",
              "prev",
              "to",
              "destroy",
              "refresh",
              "replace",
              "add",
              "remove",
            ],
            function (b, c) {
              f.register({ type: e.Type.Event, name: c }),
                f.$element.on(
                  c + ".owl.carousel.core",
                  a.proxy(function (a) {
                    a.namespace &&
                      a.relatedTarget !== this &&
                      (this.suppress([c]),
                      f[c].apply(this, [].slice.call(arguments, 1)),
                      this.release([c]));
                  }, f)
                );
            }
          )),
          "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c);
      });
    }),
    (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace && this._core.settings.autoRefresh && this.watch();
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
      (e.prototype.watch = function () {
        this._interval ||
          ((this._visible = this._core.$element.is(":visible")),
          (this._interval = b.setInterval(
            a.proxy(this.refresh, this),
            this._core.settings.autoRefreshInterval
          )));
      }),
      (e.prototype.refresh = function () {
        this._core.$element.is(":visible") !== this._visible &&
          ((this._visible = !this._visible),
          this._core.$element.toggleClass("owl-hidden", !this._visible),
          this._visible &&
            this._core.invalidate("width") &&
            this._core.refresh());
      }),
      (e.prototype.destroy = function () {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel resized.owl.carousel":
            a.proxy(function (b) {
              if (
                b.namespace &&
                this._core.settings &&
                this._core.settings.lazyLoad &&
                ((b.property && "position" == b.property.name) ||
                  "initialized" == b.type)
              )
                for (
                  var c = this._core.settings,
                    e = (c.center && Math.ceil(c.items / 2)) || c.items,
                    f = (c.center && e * -1) || 0,
                    g =
                      (b.property && b.property.value !== d
                        ? b.property.value
                        : this._core.current()) + f,
                    h = this._core.clones().length,
                    i = a.proxy(function (a, b) {
                      this.load(b);
                    }, this);
                  f++ < e;

                )
                  this.load(h / 2 + this._core.relative(g)),
                    h && a.each(this._core.clones(this._core.relative(g)), i),
                    g++;
            }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { lazyLoad: !1 }),
      (e.prototype.load = function (c) {
        var d = this._core.$stage.children().eq(c),
          e = d && d.find(".owl-lazy");
        !e ||
          a.inArray(d.get(0), this._loaded) > -1 ||
          (e.each(
            a.proxy(function (c, d) {
              var e,
                f = a(d),
                g =
                  (b.devicePixelRatio > 1 && f.attr("data-src-retina")) ||
                  f.attr("data-src");
              this._core.trigger("load", { element: f, url: g }, "lazy"),
                f.is("img")
                  ? f
                      .one(
                        "load.owl.lazy",
                        a.proxy(function () {
                          f.css("opacity", 1),
                            this._core.trigger(
                              "loaded",
                              { element: f, url: g },
                              "lazy"
                            );
                        }, this)
                      )
                      .attr("src", g)
                  : ((e = new Image()),
                    (e.onload = a.proxy(function () {
                      f.css({
                        "background-image": 'url("' + g + '")',
                        opacity: "1",
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: f, url: g },
                          "lazy"
                        );
                    }, this)),
                    (e.src = g));
            }, this)
          ),
          this._loaded.push(d.get(0)));
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._handlers = {
          "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (
            a
          ) {
            a.namespace && this._core.settings.autoHeight && this.update();
          },
          this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              "position" == a.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              a.element.closest("." + this._core.settings.itemClass).index() ===
                this._core.current() &&
              this.update();
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (e.prototype.update = function () {
        var b = this._core._current,
          c = b + this._core.settings.items,
          d = this._core.$stage.children().toArray().slice(b, c),
          e = [],
          f = 0;
        a.each(d, function (b, c) {
          e.push(a(c).height());
        }),
          (f = Math.max.apply(null, e)),
          this._core.$stage
            .parent()
            .height(f)
            .addClass(this._core.settings.autoHeightClass);
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.register({
                type: "state",
                name: "playing",
                tags: ["interacting"],
              });
          }, this),
          "resize.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.video &&
              this.isInFullScreen() &&
              a.preventDefault();
          }, this),
          "refreshed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.is("resizing") &&
              this._core.$stage.find(".cloned .owl-video-frame").remove();
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              "position" === a.property.name &&
              this._playing &&
              this.stop();
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            if (b.namespace) {
              var c = a(b.content).find(".owl-video");
              c.length &&
                (c.css("display", "none"), this.fetch(c, a(b.content)));
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          a.proxy(function (a) {
            this.play(a);
          }, this)
        );
    };
    (e.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (e.prototype.fetch = function (a, b) {
        var c = (function () {
            return a.attr("data-vimeo-id")
              ? "vimeo"
              : a.attr("data-vzaar-id")
              ? "vzaar"
              : "youtube";
          })(),
          d =
            a.attr("data-vimeo-id") ||
            a.attr("data-youtube-id") ||
            a.attr("data-vzaar-id"),
          e = a.attr("data-width") || this._core.settings.videoWidth,
          f = a.attr("data-height") || this._core.settings.videoHeight,
          g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (
          ((d = g.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          )),
          d[3].indexOf("youtu") > -1)
        )
          c = "youtube";
        else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
        else {
          if (!(d[3].indexOf("vzaar") > -1))
            throw new Error("Video URL not supported.");
          c = "vzaar";
        }
        (d = d[6]),
          (this._videos[g] = { type: c, id: d, width: e, height: f }),
          b.attr("data-video", g),
          this.thumbnail(a, this._videos[g]);
      }),
      (e.prototype.thumbnail = function (b, c) {
        var d,
          e,
          f,
          g =
            c.width && c.height
              ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"'
              : "",
          h = b.find("img"),
          i = "src",
          j = "",
          k = this._core.settings,
          l = function (a) {
            (e = '<div class="owl-video-play-icon"></div>'),
              (d = k.lazyLoad
                ? '<div class="owl-video-tn ' +
                  j +
                  '" ' +
                  i +
                  '="' +
                  a +
                  '"></div>'
                : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
                  a +
                  ')"></div>'),
              b.after(d),
              b.after(e);
          };
        if (
          (b.wrap('<div class="owl-video-wrapper"' + g + "></div>"),
          this._core.settings.lazyLoad && ((i = "data-src"), (j = "owl-lazy")),
          h.length)
        )
          return l(h.attr(i)), h.remove(), !1;
        "youtube" === c.type
          ? ((f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg"), l(f))
          : "vimeo" === c.type
          ? a.ajax({
              type: "GET",
              url: "//vimeo.com/api/v2/video/" + c.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (a) {
                (f = a[0].thumbnail_large), l(f);
              },
            })
          : "vzaar" === c.type &&
            a.ajax({
              type: "GET",
              url: "//vzaar.com/api/videos/" + c.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (a) {
                (f = a.framegrab_url), l(f);
              },
            });
      }),
      (e.prototype.stop = function () {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null),
          this._core.leave("playing"),
          this._core.trigger("stopped", null, "video");
      }),
      (e.prototype.play = function (b) {
        var c,
          d = a(b.target),
          e = d.closest("." + this._core.settings.itemClass),
          f = this._videos[e.attr("data-video")],
          g = f.width || "100%",
          h = f.height || this._core.$stage.height();
        this._playing ||
          (this._core.enter("playing"),
          this._core.trigger("play", null, "video"),
          (e = this._core.items(this._core.relative(e.index()))),
          this._core.reset(e.index()),
          "youtube" === f.type
            ? (c =
                '<iframe width="' +
                g +
                '" height="' +
                h +
                '" src="//www.youtube.com/embed/' +
                f.id +
                "?autoplay=1&rel=0&v=" +
                f.id +
                '" frameborder="0" allowfullscreen></iframe>')
            : "vimeo" === f.type
            ? (c =
                '<iframe src="//player.vimeo.com/video/' +
                f.id +
                '?autoplay=1" width="' +
                g +
                '" height="' +
                h +
                '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
            : "vzaar" === f.type &&
              (c =
                '<iframe frameborder="0"height="' +
                h +
                '"width="' +
                g +
                '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' +
                f.id +
                '/player?autoplay=true"></iframe>'),
          a('<div class="owl-video-frame">' + c + "</div>").insertAfter(
            e.find(".owl-video")
          ),
          (this._playing = e.addClass("owl-video-playing")));
      }),
      (e.prototype.isInFullScreen = function () {
        var b =
          c.fullscreenElement ||
          c.mozFullScreenElement ||
          c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame");
      }),
      (e.prototype.destroy = function () {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Video = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this.core = b),
        (this.core.options = a.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = d),
        (this.next = d),
        (this.handlers = {
          "change.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              "position" == a.property.name &&
              ((this.previous = this.core.current()),
              (this.next = a.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
            a.proxy(function (a) {
              a.namespace && (this.swapping = "translated" == a.type);
            }, this),
          "translate.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function () {
        if (
          1 === this.core.settings.items &&
          a.support.animation &&
          a.support.transition
        ) {
          this.core.speed(0);
          var b,
            c = a.proxy(this.clear, this),
            d = this.core.$stage.children().eq(this.previous),
            e = this.core.$stage.children().eq(this.next),
            f = this.core.settings.animateIn,
            g = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (g &&
              ((b =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              d
                .one(a.support.animation.end, c)
                .css({ left: b + "px" })
                .addClass("animated owl-animated-out")
                .addClass(g)),
            f &&
              e
                .one(a.support.animation.end, c)
                .addClass("animated owl-animated-in")
                .addClass(f));
        }
      }),
      (e.prototype.clear = function (b) {
        a(b.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd();
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._timeout = null),
        (this._paused = !1),
        (this._handlers = {
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace && "settings" === a.property.name
              ? this._core.settings.autoplay
                ? this.play()
                : this.stop()
              : a.namespace &&
                "position" === a.property.name &&
                this._core.settings.autoplay &&
                this._setAutoPlayInterval();
          }, this),
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace && this._core.settings.autoplay && this.play();
          }, this),
          "play.owl.autoplay": a.proxy(function (a, b, c) {
            a.namespace && this.play(b, c);
          }, this),
          "stop.owl.autoplay": a.proxy(function (a) {
            a.namespace && this.stop();
          }, this),
          "mouseover.owl.autoplay": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "mouseleave.owl.autoplay": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.play();
          }, this),
          "touchstart.owl.core": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "touchend.owl.core": a.proxy(function () {
            this._core.settings.autoplayHoverPause && this.play();
          }, this),
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = a.extend({}, e.Defaults, this._core.options));
    };
    (e.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (e.prototype.play = function (a, b) {
        (this._paused = !1),
          this._core.is("rotating") ||
            (this._core.enter("rotating"), this._setAutoPlayInterval());
      }),
      (e.prototype._getNextTimeout = function (d, e) {
        return (
          this._timeout && b.clearTimeout(this._timeout),
          b.setTimeout(
            a.proxy(function () {
              this._paused ||
                this._core.is("busy") ||
                this._core.is("interacting") ||
                c.hidden ||
                this._core.next(e || this._core.settings.autoplaySpeed);
            }, this),
            d || this._core.settings.autoplayTimeout
          )
        );
      }),
      (e.prototype._setAutoPlayInterval = function () {
        this._timeout = this._getNextTimeout();
      }),
      (e.prototype.stop = function () {
        this._core.is("rotating") &&
          (b.clearTimeout(this._timeout), this._core.leave("rotating"));
      }),
      (e.prototype.pause = function () {
        this._core.is("rotating") && (this._paused = !0);
      }),
      (e.prototype.destroy = function () {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.autoplay = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    "use strict";
    var e = function (b) {
      (this._core = b),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          "prepared.owl.carousel": a.proxy(function (b) {
            b.namespace &&
              this._core.settings.dotsData &&
              this._templates.push(
                '<div class="' +
                  this._core.settings.dotClass +
                  '">' +
                  a(b.content)
                    .find("[data-dot]")
                    .addBack("[data-dot]")
                    .attr("data-dot") +
                  "</div>"
              );
          }, this),
          "added.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 0, this._templates.pop());
          }, this),
          "remove.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 1);
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace && "position" == a.property.name && this.draw();
          }, this),
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              !this._initialized &&
              (this._core.trigger("initialize", null, "navigation"),
              this.initialize(),
              this.update(),
              this.draw(),
              (this._initialized = !0),
              this._core.trigger("initialized", null, "navigation"));
          }, this),
          "refreshed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._initialized &&
              (this._core.trigger("refresh", null, "navigation"),
              this.update(),
              this.draw(),
              this._core.trigger("refreshed", null, "navigation"));
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (e.Defaults = {
      nav: !1,
      navText: ["prev", "next"],
      navSpeed: !1,
      navElement: "div",
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
    }),
      (e.prototype.initialize = function () {
        var b,
          c = this._core.settings;
        (this._controls.$relative = (
          c.navContainer
            ? a(c.navContainer)
            : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)
        ).addClass("disabled")),
          (this._controls.$previous = a("<" + c.navElement + ">")
            .addClass(c.navClass[0])
            .html(c.navText[0])
            .prependTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function (a) {
                this.prev(c.navSpeed);
              }, this)
            )),
          (this._controls.$next = a("<" + c.navElement + ">")
            .addClass(c.navClass[1])
            .html(c.navText[1])
            .appendTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function (a) {
                this.next(c.navSpeed);
              }, this)
            )),
          c.dotsData ||
            (this._templates = [
              a("<div>")
                .addClass(c.dotClass)
                .append(a("<span>"))
                .prop("outerHTML"),
            ]),
          (this._controls.$absolute = (
            c.dotsContainer
              ? a(c.dotsContainer)
              : a("<div>").addClass(c.dotsClass).appendTo(this.$element)
          ).addClass("disabled")),
          this._controls.$absolute.on(
            "click",
            "div",
            a.proxy(function (b) {
              var d = a(b.target).parent().is(this._controls.$absolute)
                ? a(b.target).index()
                : a(b.target).parent().index();
              b.preventDefault(), this.to(d, c.dotsSpeed);
            }, this)
          );
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this);
      }),
      (e.prototype.destroy = function () {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (e.prototype.update = function () {
        var a,
          b,
          c,
          d = this._core.clones().length / 2,
          e = d + this._core.items().length,
          f = this._core.maximum(!0),
          g = this._core.settings,
          h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if (
          ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
          g.dots || "page" == g.slideBy)
        )
          for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
            if (b >= h || 0 === b) {
              if (
                (this._pages.push({
                  start: Math.min(f, a - d),
                  end: a - d + h - 1,
                }),
                Math.min(f, a - d) === f)
              )
                break;
              (b = 0), ++c;
            }
            b += this._core.mergers(this._core.relative(a));
          }
      }),
      (e.prototype.draw = function () {
        var b,
          c = this._core.settings,
          d = this._core.items().length <= c.items,
          e = this._core.relative(this._core.current()),
          f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d),
          c.nav &&
            (this._controls.$previous.toggleClass(
              "disabled",
              !f && e <= this._core.minimum(!0)
            ),
            this._controls.$next.toggleClass(
              "disabled",
              !f && e >= this._core.maximum(!0)
            )),
          this._controls.$absolute.toggleClass("disabled", !c.dots || d),
          c.dots &&
            ((b =
              this._pages.length - this._controls.$absolute.children().length),
            c.dotsData && 0 !== b
              ? this._controls.$absolute.html(this._templates.join(""))
              : b > 0
              ? this._controls.$absolute.append(
                  new Array(b + 1).join(this._templates[0])
                )
              : b < 0 && this._controls.$absolute.children().slice(b).remove(),
            this._controls.$absolute.find(".active").removeClass("active"),
            this._controls.$absolute
              .children()
              .eq(a.inArray(this.current(), this._pages))
              .addClass("active"));
      }),
      (e.prototype.onTrigger = function (b) {
        var c = this._core.settings;
        b.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            c &&
            (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items),
        };
      }),
      (e.prototype.current = function () {
        var b = this._core.relative(this._core.current());
        return a
          .grep(
            this._pages,
            a.proxy(function (a, c) {
              return a.start <= b && a.end >= b;
            }, this)
          )
          .pop();
      }),
      (e.prototype.getPosition = function (b) {
        var c,
          d,
          e = this._core.settings;
        return (
          "page" == e.slideBy
            ? ((c = a.inArray(this.current(), this._pages)),
              (d = this._pages.length),
              b ? ++c : --c,
              (c = this._pages[((c % d) + d) % d].start))
            : ((c = this._core.relative(this._core.current())),
              (d = this._core.items().length),
              b ? (c += e.slideBy) : (c -= e.slideBy)),
          c
        );
      }),
      (e.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
      }),
      (e.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
      }),
      (e.prototype.to = function (b, c, d) {
        var e;
        !d && this._pages.length
          ? ((e = this._pages.length),
            a.proxy(this._overrides.to, this._core)(
              this._pages[((b % e) + e) % e].start,
              c
            ))
          : a.proxy(this._overrides.to, this._core)(b, c);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Navigation = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    "use strict";
    var e = function (c) {
      (this._core = c),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (c) {
            c.namespace &&
              "URLHash" === this._core.settings.startPosition &&
              a(b).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            if (b.namespace) {
              var c = a(b.content)
                .find("[data-hash]")
                .addBack("[data-hash]")
                .attr("data-hash");
              if (!c) return;
              this._hashes[c] = b.content;
            }
          }, this),
          "changed.owl.carousel": a.proxy(function (c) {
            if (c.namespace && "position" === c.property.name) {
              var d = this._core.items(
                  this._core.relative(this._core.current())
                ),
                e = a
                  .map(this._hashes, function (a, b) {
                    return a === d ? b : null;
                  })
                  .join();
              if (!e || b.location.hash.slice(1) === e) return;
              b.location.hash = e;
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        a(b).on(
          "hashchange.owl.navigation",
          a.proxy(function (a) {
            var c = b.location.hash.substring(1),
              e = this._core.$stage.children(),
              f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d &&
              f !== this._core.current() &&
              this._core.to(this._core.relative(f), !1, !0);
          }, this)
        );
    };
    (e.Defaults = { URLhashListener: !1 }),
      (e.prototype.destroy = function () {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this))
          "function" != typeof this[d] && (this[d] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Hash = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    function e(b, c) {
      var e = !1,
        f = b.charAt(0).toUpperCase() + b.slice(1);
      return (
        a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
          if (g[b] !== d) return (e = !c || b), !1;
        }),
        e
      );
    }
    function f(a) {
      return e(a, !0);
    }
    var g = a("<support>").get(0).style,
      h = "Webkit Moz O ms".split(" "),
      i = {
        transition: {
          end: {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            transition: "transitionend",
          },
        },
        animation: {
          end: {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd",
            animation: "animationend",
          },
        },
      },
      j = {
        csstransforms: function () {
          return !!e("transform");
        },
        csstransforms3d: function () {
          return !!e("perspective");
        },
        csstransitions: function () {
          return !!e("transition");
        },
        cssanimations: function () {
          return !!e("animation");
        },
      };
    j.csstransitions() &&
      ((a.support.transition = new String(f("transition"))),
      (a.support.transition.end = i.transition.end[a.support.transition])),
      j.cssanimations() &&
        ((a.support.animation = new String(f("animation"))),
        (a.support.animation.end = i.animation.end[a.support.animation])),
      j.csstransforms() &&
        ((a.support.transform = new String(f("transform"))),
        (a.support.transform3d = j.csstransforms3d()));
  })(window.Zepto || window.jQuery, window, document);

// 16. FLEXSLIDER
/*
 * jQuery FlexSlider v2.6.3
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */ !(function ($) {
  var e = !0;
  ($.flexslider = function (t, a) {
    var n = $(t);
    n.vars = $.extend({}, $.flexslider.defaults, a);
    var i = n.vars.namespace,
      s =
        window.navigator &&
        window.navigator.msPointerEnabled &&
        window.MSGesture,
      r =
        ("ontouchstart" in window ||
          s ||
          (window.DocumentTouch && document instanceof DocumentTouch)) &&
        n.vars.touch,
      o = "click touchend MSPointerUp keyup",
      l = "",
      c,
      d = "vertical" === n.vars.direction,
      u = n.vars.reverse,
      v = n.vars.itemWidth > 0,
      p = "fade" === n.vars.animation,
      m = "" !== n.vars.asNavFor,
      f = {};
    $.data(t, "flexslider", n),
      (f = {
        init: function () {
          (n.animating = !1),
            (n.currentSlide = parseInt(
              n.vars.startAt ? n.vars.startAt : 0,
              10
            )),
            isNaN(n.currentSlide) && (n.currentSlide = 0),
            (n.animatingTo = n.currentSlide),
            (n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last),
            (n.containerSelector = n.vars.selector.substr(
              0,
              n.vars.selector.search(" ")
            )),
            (n.slides = $(n.vars.selector, n)),
            (n.container = $(n.containerSelector, n)),
            (n.count = n.slides.length),
            (n.syncExists = $(n.vars.sync).length > 0),
            "slide" === n.vars.animation && (n.vars.animation = "swing"),
            (n.prop = d ? "top" : "marginLeft"),
            (n.args = {}),
            (n.manualPause = !1),
            (n.stopped = !1),
            (n.started = !1),
            (n.startTimeout = null),
            (n.transitions =
              !n.vars.video &&
              !p &&
              n.vars.useCSS &&
              (function () {
                var e = document.createElement("div"),
                  t = [
                    "perspectiveProperty",
                    "WebkitPerspective",
                    "MozPerspective",
                    "OPerspective",
                    "msPerspective",
                  ];
                for (var a in t)
                  if (void 0 !== e.style[t[a]])
                    return (
                      (n.pfx = t[a].replace("Perspective", "").toLowerCase()),
                      (n.prop = "-" + n.pfx + "-transform"),
                      !0
                    );
                return !1;
              })()),
            (n.ensureAnimationEnd = ""),
            "" !== n.vars.controlsContainer &&
              (n.controlsContainer =
                $(n.vars.controlsContainer).length > 0 &&
                $(n.vars.controlsContainer)),
            "" !== n.vars.manualControls &&
              (n.manualControls =
                $(n.vars.manualControls).length > 0 &&
                $(n.vars.manualControls)),
            "" !== n.vars.customDirectionNav &&
              (n.customDirectionNav =
                2 === $(n.vars.customDirectionNav).length &&
                $(n.vars.customDirectionNav)),
            n.vars.randomize &&
              (n.slides.sort(function () {
                return Math.round(Math.random()) - 0.5;
              }),
              n.container.empty().append(n.slides)),
            n.doMath(),
            n.setup("init"),
            n.vars.controlNav && f.controlNav.setup(),
            n.vars.directionNav && f.directionNav.setup(),
            n.vars.keyboard &&
              (1 === $(n.containerSelector).length ||
                n.vars.multipleKeyboard) &&
              $(document).bind("keyup", function (e) {
                var t = e.keyCode;
                if (!n.animating && (39 === t || 37 === t)) {
                  var a =
                    39 === t
                      ? n.getTarget("next")
                      : 37 === t
                      ? n.getTarget("prev")
                      : !1;
                  n.flexAnimate(a, n.vars.pauseOnAction);
                }
              }),
            n.vars.mousewheel &&
              n.bind("mousewheel", function (e, t, a, i) {
                e.preventDefault();
                var s = 0 > t ? n.getTarget("next") : n.getTarget("prev");
                n.flexAnimate(s, n.vars.pauseOnAction);
              }),
            n.vars.pausePlay && f.pausePlay.setup(),
            n.vars.slideshow &&
              n.vars.pauseInvisible &&
              f.pauseInvisible.init(),
            n.vars.slideshow &&
              (n.vars.pauseOnHover &&
                n.hover(
                  function () {
                    n.manualPlay || n.manualPause || n.pause();
                  },
                  function () {
                    n.manualPause || n.manualPlay || n.stopped || n.play();
                  }
                ),
              (n.vars.pauseInvisible && f.pauseInvisible.isHidden()) ||
                (n.vars.initDelay > 0
                  ? (n.startTimeout = setTimeout(n.play, n.vars.initDelay))
                  : n.play())),
            m && f.asNav.setup(),
            r && n.vars.touch && f.touch(),
            (!p || (p && n.vars.smoothHeight)) &&
              $(window).bind("resize orientationchange focus", f.resize),
            n.find("img").attr("draggable", "false"),
            setTimeout(function () {
              n.vars.start(n);
            }, 200);
        },
        asNav: {
          setup: function () {
            (n.asNav = !0),
              (n.animatingTo = Math.floor(n.currentSlide / n.move)),
              (n.currentItem = n.currentSlide),
              n.slides
                .removeClass(i + "active-slide")
                .eq(n.currentItem)
                .addClass(i + "active-slide"),
              s
                ? ((t._slider = n),
                  n.slides.each(function () {
                    var e = this;
                    (e._gesture = new MSGesture()),
                      (e._gesture.target = e),
                      e.addEventListener(
                        "MSPointerDown",
                        function (e) {
                          e.preventDefault(),
                            e.currentTarget._gesture &&
                              e.currentTarget._gesture.addPointer(e.pointerId);
                        },
                        !1
                      ),
                      e.addEventListener("MSGestureTap", function (e) {
                        e.preventDefault();
                        var t = $(this),
                          a = t.index();
                        $(n.vars.asNavFor).data("flexslider").animating ||
                          t.hasClass("active") ||
                          ((n.direction = n.currentItem < a ? "next" : "prev"),
                          n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0));
                      });
                  }))
                : n.slides.on(o, function (e) {
                    e.preventDefault();
                    var t = $(this),
                      a = t.index(),
                      s = t.offset().left - $(n).scrollLeft();
                    0 >= s && t.hasClass(i + "active-slide")
                      ? n.flexAnimate(n.getTarget("prev"), !0)
                      : $(n.vars.asNavFor).data("flexslider").animating ||
                        t.hasClass(i + "active-slide") ||
                        ((n.direction = n.currentItem < a ? "next" : "prev"),
                        n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0));
                  });
          },
        },
        controlNav: {
          setup: function () {
            n.manualControls
              ? f.controlNav.setupManual()
              : f.controlNav.setupPaging();
          },
          setupPaging: function () {
            var e =
                "thumbnails" === n.vars.controlNav
                  ? "control-thumbs"
                  : "control-paging",
              t = 1,
              a,
              s;
            if (
              ((n.controlNavScaffold = $(
                '<ol class="' + i + "control-nav " + i + e + '"></ol>'
              )),
              n.pagingCount > 1)
            )
              for (var r = 0; r < n.pagingCount; r++) {
                (s = n.slides.eq(r)),
                  void 0 === s.attr("data-thumb-alt") &&
                    s.attr("data-thumb-alt", "");
                var c =
                  "" !== s.attr("data-thumb-alt")
                    ? (c = ' alt="' + s.attr("data-thumb-alt") + '"')
                    : "";
                if (
                  ((a =
                    "thumbnails" === n.vars.controlNav
                      ? '<img src="' + s.attr("data-thumb") + '"' + c + "/>"
                      : '<a href="#">' + t + "</a>"),
                  "thumbnails" === n.vars.controlNav &&
                    !0 === n.vars.thumbCaptions)
                ) {
                  var d = s.attr("data-thumbcaption");
                  "" !== d &&
                    void 0 !== d &&
                    (a += '<span class="' + i + 'caption">' + d + "</span>");
                }
                n.controlNavScaffold.append("<li>" + a + "</li>"), t++;
              }
            n.controlsContainer
              ? $(n.controlsContainer).append(n.controlNavScaffold)
              : n.append(n.controlNavScaffold),
              f.controlNav.set(),
              f.controlNav.active(),
              n.controlNavScaffold.delegate("a, img", o, function (e) {
                if ((e.preventDefault(), "" === l || l === e.type)) {
                  var t = $(this),
                    a = n.controlNav.index(t);
                  t.hasClass(i + "active") ||
                    ((n.direction = a > n.currentSlide ? "next" : "prev"),
                    n.flexAnimate(a, n.vars.pauseOnAction));
                }
                "" === l && (l = e.type), f.setToClearWatchedEvent();
              });
          },
          setupManual: function () {
            (n.controlNav = n.manualControls),
              f.controlNav.active(),
              n.controlNav.bind(o, function (e) {
                if ((e.preventDefault(), "" === l || l === e.type)) {
                  var t = $(this),
                    a = n.controlNav.index(t);
                  t.hasClass(i + "active") ||
                    (a > n.currentSlide
                      ? (n.direction = "next")
                      : (n.direction = "prev"),
                    n.flexAnimate(a, n.vars.pauseOnAction));
                }
                "" === l && (l = e.type), f.setToClearWatchedEvent();
              });
          },
          set: function () {
            var e = "thumbnails" === n.vars.controlNav ? "img" : "a";
            n.controlNav = $(
              "." + i + "control-nav li " + e,
              n.controlsContainer ? n.controlsContainer : n
            );
          },
          active: function () {
            n.controlNav
              .removeClass(i + "active")
              .eq(n.animatingTo)
              .addClass(i + "active");
          },
          update: function (e, t) {
            n.pagingCount > 1 && "add" === e
              ? n.controlNavScaffold.append(
                  $('<li><a href="#">' + n.count + "</a></li>")
                )
              : 1 === n.pagingCount
              ? n.controlNavScaffold.find("li").remove()
              : n.controlNav.eq(t).closest("li").remove(),
              f.controlNav.set(),
              n.pagingCount > 1 && n.pagingCount !== n.controlNav.length
                ? n.update(t, e)
                : f.controlNav.active();
          },
        },
        directionNav: {
          setup: function () {
            var e = $(
              '<ul class="' +
                i +
                'direction-nav"><li class="' +
                i +
                'nav-prev"><a class="' +
                i +
                'prev" href="#">' +
                n.vars.prevText +
                '</a></li><li class="' +
                i +
                'nav-next"><a class="' +
                i +
                'next" href="#">' +
                n.vars.nextText +
                "</a></li></ul>"
            );
            n.customDirectionNav
              ? (n.directionNav = n.customDirectionNav)
              : n.controlsContainer
              ? ($(n.controlsContainer).append(e),
                (n.directionNav = $(
                  "." + i + "direction-nav li a",
                  n.controlsContainer
                )))
              : (n.append(e),
                (n.directionNav = $("." + i + "direction-nav li a", n))),
              f.directionNav.update(),
              n.directionNav.bind(o, function (e) {
                e.preventDefault();
                var t;
                ("" !== l && l !== e.type) ||
                  ((t = $(this).hasClass(i + "next")
                    ? n.getTarget("next")
                    : n.getTarget("prev")),
                  n.flexAnimate(t, n.vars.pauseOnAction)),
                  "" === l && (l = e.type),
                  f.setToClearWatchedEvent();
              });
          },
          update: function () {
            var e = i + "disabled";
            1 === n.pagingCount
              ? n.directionNav.addClass(e).attr("tabindex", "-1")
              : n.vars.animationLoop
              ? n.directionNav.removeClass(e).removeAttr("tabindex")
              : 0 === n.animatingTo
              ? n.directionNav
                  .removeClass(e)
                  .filter("." + i + "prev")
                  .addClass(e)
                  .attr("tabindex", "-1")
              : n.animatingTo === n.last
              ? n.directionNav
                  .removeClass(e)
                  .filter("." + i + "next")
                  .addClass(e)
                  .attr("tabindex", "-1")
              : n.directionNav.removeClass(e).removeAttr("tabindex");
          },
        },
        pausePlay: {
          setup: function () {
            var e = $('<div class="' + i + 'pauseplay"><a href="#"></a></div>');
            n.controlsContainer
              ? (n.controlsContainer.append(e),
                (n.pausePlay = $("." + i + "pauseplay a", n.controlsContainer)))
              : (n.append(e), (n.pausePlay = $("." + i + "pauseplay a", n))),
              f.pausePlay.update(n.vars.slideshow ? i + "pause" : i + "play"),
              n.pausePlay.bind(o, function (e) {
                e.preventDefault(),
                  ("" !== l && l !== e.type) ||
                    ($(this).hasClass(i + "pause")
                      ? ((n.manualPause = !0), (n.manualPlay = !1), n.pause())
                      : ((n.manualPause = !1), (n.manualPlay = !0), n.play())),
                  "" === l && (l = e.type),
                  f.setToClearWatchedEvent();
              });
          },
          update: function (e) {
            "play" === e
              ? n.pausePlay
                  .removeClass(i + "pause")
                  .addClass(i + "play")
                  .html(n.vars.playText)
              : n.pausePlay
                  .removeClass(i + "play")
                  .addClass(i + "pause")
                  .html(n.vars.pauseText);
          },
        },
        touch: function () {
          function e(e) {
            e.stopPropagation(),
              n.animating
                ? e.preventDefault()
                : (n.pause(),
                  t._gesture.addPointer(e.pointerId),
                  (T = 0),
                  (c = d ? n.h : n.w),
                  (f = Number(new Date())),
                  (l =
                    v && u && n.animatingTo === n.last
                      ? 0
                      : v && u
                      ? n.limit -
                        (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo
                      : v && n.currentSlide === n.last
                      ? n.limit
                      : v
                      ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide
                      : u
                      ? (n.last - n.currentSlide + n.cloneOffset) * c
                      : (n.currentSlide + n.cloneOffset) * c));
          }
          function a(e) {
            e.stopPropagation();
            var a = e.target._slider;
            if (a) {
              var n = -e.translationX,
                i = -e.translationY;
              return (
                (T += d ? i : n),
                (m = T),
                (y = d
                  ? Math.abs(T) < Math.abs(-n)
                  : Math.abs(T) < Math.abs(-i)),
                e.detail === e.MSGESTURE_FLAG_INERTIA
                  ? void setImmediate(function () {
                      t._gesture.stop();
                    })
                  : void (
                      (!y || Number(new Date()) - f > 500) &&
                      (e.preventDefault(),
                      !p &&
                        a.transitions &&
                        (a.vars.animationLoop ||
                          (m =
                            T /
                            ((0 === a.currentSlide && 0 > T) ||
                            (a.currentSlide === a.last && T > 0)
                              ? Math.abs(T) / c + 2
                              : 1)),
                        a.setProps(l + m, "setTouch")))
                    )
              );
            }
          }
          function i(e) {
            e.stopPropagation();
            var t = e.target._slider;
            if (t) {
              if (t.animatingTo === t.currentSlide && !y && null !== m) {
                var a = u ? -m : m,
                  n = a > 0 ? t.getTarget("next") : t.getTarget("prev");
                t.canAdvance(n) &&
                ((Number(new Date()) - f < 550 && Math.abs(a) > 50) ||
                  Math.abs(a) > c / 2)
                  ? t.flexAnimate(n, t.vars.pauseOnAction)
                  : p ||
                    t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0);
              }
              (r = null), (o = null), (m = null), (l = null), (T = 0);
            }
          }
          var r,
            o,
            l,
            c,
            m,
            f,
            g,
            h,
            S,
            y = !1,
            x = 0,
            b = 0,
            T = 0;
          s
            ? ((t.style.msTouchAction = "none"),
              (t._gesture = new MSGesture()),
              (t._gesture.target = t),
              t.addEventListener("MSPointerDown", e, !1),
              (t._slider = n),
              t.addEventListener("MSGestureChange", a, !1),
              t.addEventListener("MSGestureEnd", i, !1))
            : ((g = function (e) {
                n.animating
                  ? e.preventDefault()
                  : (window.navigator.msPointerEnabled ||
                      1 === e.touches.length) &&
                    (n.pause(),
                    (c = d ? n.h : n.w),
                    (f = Number(new Date())),
                    (x = e.touches[0].pageX),
                    (b = e.touches[0].pageY),
                    (l =
                      v && u && n.animatingTo === n.last
                        ? 0
                        : v && u
                        ? n.limit -
                          (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo
                        : v && n.currentSlide === n.last
                        ? n.limit
                        : v
                        ? (n.itemW + n.vars.itemMargin) *
                          n.move *
                          n.currentSlide
                        : u
                        ? (n.last - n.currentSlide + n.cloneOffset) * c
                        : (n.currentSlide + n.cloneOffset) * c),
                    (r = d ? b : x),
                    (o = d ? x : b),
                    t.addEventListener("touchmove", h, !1),
                    t.addEventListener("touchend", S, !1));
              }),
              (h = function (e) {
                (x = e.touches[0].pageX),
                  (b = e.touches[0].pageY),
                  (m = d ? r - b : r - x),
                  (y = d
                    ? Math.abs(m) < Math.abs(x - o)
                    : Math.abs(m) < Math.abs(b - o));
                var t = 500;
                (!y || Number(new Date()) - f > t) &&
                  (e.preventDefault(),
                  !p &&
                    n.transitions &&
                    (n.vars.animationLoop ||
                      (m /=
                        (0 === n.currentSlide && 0 > m) ||
                        (n.currentSlide === n.last && m > 0)
                          ? Math.abs(m) / c + 2
                          : 1),
                    n.setProps(l + m, "setTouch")));
              }),
              (S = function (e) {
                if (
                  (t.removeEventListener("touchmove", h, !1),
                  n.animatingTo === n.currentSlide && !y && null !== m)
                ) {
                  var a = u ? -m : m,
                    i = a > 0 ? n.getTarget("next") : n.getTarget("prev");
                  n.canAdvance(i) &&
                  ((Number(new Date()) - f < 550 && Math.abs(a) > 50) ||
                    Math.abs(a) > c / 2)
                    ? n.flexAnimate(i, n.vars.pauseOnAction)
                    : p ||
                      n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0);
                }
                t.removeEventListener("touchend", S, !1),
                  (r = null),
                  (o = null),
                  (m = null),
                  (l = null);
              }),
              t.addEventListener("touchstart", g, !1));
        },
        resize: function () {
          !n.animating &&
            n.is(":visible") &&
            (v || n.doMath(),
            p
              ? f.smoothHeight()
              : v
              ? (n.slides.width(n.computedW),
                n.update(n.pagingCount),
                n.setProps())
              : d
              ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal"))
              : (n.vars.smoothHeight && f.smoothHeight(),
                n.newSlides.width(n.computedW),
                n.setProps(n.computedW, "setTotal")));
        },
        smoothHeight: function (e) {
          if (!d || p) {
            var t = p ? n : n.viewport;
            e
              ? t.animate(
                  { height: n.slides.eq(n.animatingTo).innerHeight() },
                  e
                )
              : t.innerHeight(n.slides.eq(n.animatingTo).innerHeight());
          }
        },
        sync: function (e) {
          var t = $(n.vars.sync).data("flexslider"),
            a = n.animatingTo;
          switch (e) {
            case "animate":
              t.flexAnimate(a, n.vars.pauseOnAction, !1, !0);
              break;
            case "play":
              t.playing || t.asNav || t.play();
              break;
            case "pause":
              t.pause();
          }
        },
        uniqueID: function (e) {
          return (
            e
              .filter("[id]")
              .add(e.find("[id]"))
              .each(function () {
                var e = $(this);
                e.attr("id", e.attr("id") + "_clone");
              }),
            e
          );
        },
        pauseInvisible: {
          visProp: null,
          init: function () {
            var e = f.pauseInvisible.getHiddenProp();
            if (e) {
              var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
              document.addEventListener(t, function () {
                f.pauseInvisible.isHidden()
                  ? n.startTimeout
                    ? clearTimeout(n.startTimeout)
                    : n.pause()
                  : n.started
                  ? n.play()
                  : n.vars.initDelay > 0
                  ? setTimeout(n.play, n.vars.initDelay)
                  : n.play();
              });
            }
          },
          isHidden: function () {
            var e = f.pauseInvisible.getHiddenProp();
            return e ? document[e] : !1;
          },
          getHiddenProp: function () {
            var e = ["webkit", "moz", "ms", "o"];
            if ("hidden" in document) return "hidden";
            for (var t = 0; t < e.length; t++)
              if (e[t] + "Hidden" in document) return e[t] + "Hidden";
            return null;
          },
        },
        setToClearWatchedEvent: function () {
          clearTimeout(c),
            (c = setTimeout(function () {
              l = "";
            }, 3e3));
        },
      }),
      (n.flexAnimate = function (e, t, a, s, o) {
        if (
          (n.vars.animationLoop ||
            e === n.currentSlide ||
            (n.direction = e > n.currentSlide ? "next" : "prev"),
          m &&
            1 === n.pagingCount &&
            (n.direction = n.currentItem < e ? "next" : "prev"),
          !n.animating && (n.canAdvance(e, o) || a) && n.is(":visible"))
        ) {
          if (m && s) {
            var l = $(n.vars.asNavFor).data("flexslider");
            if (
              ((n.atEnd = 0 === e || e === n.count - 1),
              l.flexAnimate(e, !0, !1, !0, o),
              (n.direction = n.currentItem < e ? "next" : "prev"),
              (l.direction = n.direction),
              Math.ceil((e + 1) / n.visible) - 1 === n.currentSlide || 0 === e)
            )
              return (
                (n.currentItem = e),
                n.slides
                  .removeClass(i + "active-slide")
                  .eq(e)
                  .addClass(i + "active-slide"),
                !1
              );
            (n.currentItem = e),
              n.slides
                .removeClass(i + "active-slide")
                .eq(e)
                .addClass(i + "active-slide"),
              (e = Math.floor(e / n.visible));
          }
          if (
            ((n.animating = !0),
            (n.animatingTo = e),
            t && n.pause(),
            n.vars.before(n),
            n.syncExists && !o && f.sync("animate"),
            n.vars.controlNav && f.controlNav.active(),
            v ||
              n.slides
                .removeClass(i + "active-slide")
                .eq(e)
                .addClass(i + "active-slide"),
            (n.atEnd = 0 === e || e === n.last),
            n.vars.directionNav && f.directionNav.update(),
            e === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()),
            p)
          )
            r
              ? (n.slides.eq(n.currentSlide).css({ opacity: 0, zIndex: 1 }),
                n.slides.eq(e).css({ opacity: 1, zIndex: 2 }),
                n.wrapup(c))
              : (n.slides
                  .eq(n.currentSlide)
                  .css({ zIndex: 1 })
                  .animate(
                    { opacity: 0 },
                    n.vars.animationSpeed,
                    n.vars.easing
                  ),
                n.slides
                  .eq(e)
                  .css({ zIndex: 2 })
                  .animate(
                    { opacity: 1 },
                    n.vars.animationSpeed,
                    n.vars.easing,
                    n.wrapup
                  ));
          else {
            var c = d ? n.slides.filter(":first").height() : n.computedW,
              g,
              h,
              S;
            v
              ? ((g = n.vars.itemMargin),
                (S = (n.itemW + g) * n.move * n.animatingTo),
                (h = S > n.limit && 1 !== n.visible ? n.limit : S))
              : (h =
                  0 === n.currentSlide &&
                  e === n.count - 1 &&
                  n.vars.animationLoop &&
                  "next" !== n.direction
                    ? u
                      ? (n.count + n.cloneOffset) * c
                      : 0
                    : n.currentSlide === n.last &&
                      0 === e &&
                      n.vars.animationLoop &&
                      "prev" !== n.direction
                    ? u
                      ? 0
                      : (n.count + 1) * c
                    : u
                    ? (n.count - 1 - e + n.cloneOffset) * c
                    : (e + n.cloneOffset) * c),
              n.setProps(h, "", n.vars.animationSpeed),
              n.transitions
                ? ((n.vars.animationLoop && n.atEnd) ||
                    ((n.animating = !1), (n.currentSlide = n.animatingTo)),
                  n.container.unbind("webkitTransitionEnd transitionend"),
                  n.container.bind(
                    "webkitTransitionEnd transitionend",
                    function () {
                      clearTimeout(n.ensureAnimationEnd), n.wrapup(c);
                    }
                  ),
                  clearTimeout(n.ensureAnimationEnd),
                  (n.ensureAnimationEnd = setTimeout(function () {
                    n.wrapup(c);
                  }, n.vars.animationSpeed + 100)))
                : n.container.animate(
                    n.args,
                    n.vars.animationSpeed,
                    n.vars.easing,
                    function () {
                      n.wrapup(c);
                    }
                  );
          }
          n.vars.smoothHeight && f.smoothHeight(n.vars.animationSpeed);
        }
      }),
      (n.wrapup = function (e) {
        p ||
          v ||
          (0 === n.currentSlide &&
          n.animatingTo === n.last &&
          n.vars.animationLoop
            ? n.setProps(e, "jumpEnd")
            : n.currentSlide === n.last &&
              0 === n.animatingTo &&
              n.vars.animationLoop &&
              n.setProps(e, "jumpStart")),
          (n.animating = !1),
          (n.currentSlide = n.animatingTo),
          n.vars.after(n);
      }),
      (n.animateSlides = function () {
        !n.animating && e && n.flexAnimate(n.getTarget("next"));
      }),
      (n.pause = function () {
        clearInterval(n.animatedSlides),
          (n.animatedSlides = null),
          (n.playing = !1),
          n.vars.pausePlay && f.pausePlay.update("play"),
          n.syncExists && f.sync("pause");
      }),
      (n.play = function () {
        n.playing && clearInterval(n.animatedSlides),
          (n.animatedSlides =
            n.animatedSlides ||
            setInterval(n.animateSlides, n.vars.slideshowSpeed)),
          (n.started = n.playing = !0),
          n.vars.pausePlay && f.pausePlay.update("pause"),
          n.syncExists && f.sync("play");
      }),
      (n.stop = function () {
        n.pause(), (n.stopped = !0);
      }),
      (n.canAdvance = function (e, t) {
        var a = m ? n.pagingCount - 1 : n.last;
        return t
          ? !0
          : m &&
            n.currentItem === n.count - 1 &&
            0 === e &&
            "prev" === n.direction
          ? !0
          : m &&
            0 === n.currentItem &&
            e === n.pagingCount - 1 &&
            "next" !== n.direction
          ? !1
          : e !== n.currentSlide || m
          ? n.vars.animationLoop
            ? !0
            : n.atEnd &&
              0 === n.currentSlide &&
              e === a &&
              "next" !== n.direction
            ? !1
            : !n.atEnd ||
              n.currentSlide !== a ||
              0 !== e ||
              "next" !== n.direction
          : !1;
      }),
      (n.getTarget = function (e) {
        return (
          (n.direction = e),
          "next" === e
            ? n.currentSlide === n.last
              ? 0
              : n.currentSlide + 1
            : 0 === n.currentSlide
            ? n.last
            : n.currentSlide - 1
        );
      }),
      (n.setProps = function (e, t, a) {
        var i = (function () {
          var a = e
              ? e
              : (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo,
            i = (function () {
              if (v)
                return "setTouch" === t
                  ? e
                  : u && n.animatingTo === n.last
                  ? 0
                  : u
                  ? n.limit -
                    (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo
                  : n.animatingTo === n.last
                  ? n.limit
                  : a;
              switch (t) {
                case "setTotal":
                  return u
                    ? (n.count - 1 - n.currentSlide + n.cloneOffset) * e
                    : (n.currentSlide + n.cloneOffset) * e;
                case "setTouch":
                  return u ? e : e;
                case "jumpEnd":
                  return u ? e : n.count * e;
                case "jumpStart":
                  return u ? n.count * e : e;
                default:
                  return e;
              }
            })();
          return -1 * i + "px";
        })();
        n.transitions &&
          ((i = d
            ? "translate3d(0," + i + ",0)"
            : "translate3d(" + i + ",0,0)"),
          (a = void 0 !== a ? a / 1e3 + "s" : "0s"),
          n.container.css("-" + n.pfx + "-transition-duration", a),
          n.container.css("transition-duration", a)),
          (n.args[n.prop] = i),
          (n.transitions || void 0 === a) && n.container.css(n.args),
          n.container.css("transform", i);
      }),
      (n.setup = function (e) {
        if (p)
          n.slides.css({
            width: "100%",
            float: "left",
            marginRight: "-100%",
            position: "relative",
          }),
            "init" === e &&
              (r
                ? n.slides
                    .css({
                      opacity: 0,
                      display: "block",
                      webkitTransition:
                        "opacity " + n.vars.animationSpeed / 1e3 + "s ease",
                      zIndex: 1,
                    })
                    .eq(n.currentSlide)
                    .css({ opacity: 1, zIndex: 2 })
                : 0 == n.vars.fadeFirstSlide
                ? n.slides
                    .css({ opacity: 0, display: "block", zIndex: 1 })
                    .eq(n.currentSlide)
                    .css({ zIndex: 2 })
                    .css({ opacity: 1 })
                : n.slides
                    .css({ opacity: 0, display: "block", zIndex: 1 })
                    .eq(n.currentSlide)
                    .css({ zIndex: 2 })
                    .animate(
                      { opacity: 1 },
                      n.vars.animationSpeed,
                      n.vars.easing
                    )),
            n.vars.smoothHeight && f.smoothHeight();
        else {
          var t, a;
          "init" === e &&
            ((n.viewport = $('<div class="' + i + 'viewport"></div>')
              .css({ overflow: "hidden", position: "relative" })
              .appendTo(n)
              .append(n.container)),
            (n.cloneCount = 0),
            (n.cloneOffset = 0),
            u &&
              ((a = $.makeArray(n.slides).reverse()),
              (n.slides = $(a)),
              n.container.empty().append(n.slides))),
            n.vars.animationLoop &&
              !v &&
              ((n.cloneCount = 2),
              (n.cloneOffset = 1),
              "init" !== e && n.container.find(".clone").remove(),
              n.container
                .append(
                  f
                    .uniqueID(n.slides.first().clone().addClass("clone"))
                    .attr("aria-hidden", "true")
                )
                .prepend(
                  f
                    .uniqueID(n.slides.last().clone().addClass("clone"))
                    .attr("aria-hidden", "true")
                )),
            (n.newSlides = $(n.vars.selector, n)),
            (t = u
              ? n.count - 1 - n.currentSlide + n.cloneOffset
              : n.currentSlide + n.cloneOffset),
            d && !v
              ? (n.container
                  .height(200 * (n.count + n.cloneCount) + "%")
                  .css("position", "absolute")
                  .width("100%"),
                setTimeout(
                  function () {
                    n.newSlides.css({ display: "block" }),
                      n.doMath(),
                      n.viewport.height(n.h),
                      n.setProps(t * n.h, "init");
                  },
                  "init" === e ? 100 : 0
                ))
              : (n.container.width(200 * (n.count + n.cloneCount) + "%"),
                n.setProps(t * n.computedW, "init"),
                setTimeout(
                  function () {
                    n.doMath(),
                      n.newSlides.css({
                        width: n.computedW,
                        marginRight: n.computedM,
                        float: "left",
                        display: "block",
                      }),
                      n.vars.smoothHeight && f.smoothHeight();
                  },
                  "init" === e ? 100 : 0
                ));
        }
        v ||
          n.slides
            .removeClass(i + "active-slide")
            .eq(n.currentSlide)
            .addClass(i + "active-slide"),
          n.vars.init(n);
      }),
      (n.doMath = function () {
        var e = n.slides.first(),
          t = n.vars.itemMargin,
          a = n.vars.minItems,
          i = n.vars.maxItems;
        (n.w = void 0 === n.viewport ? n.width() : n.viewport.width()),
          (n.h = e.height()),
          (n.boxPadding = e.outerWidth() - e.width()),
          v
            ? ((n.itemT = n.vars.itemWidth + t),
              (n.itemM = t),
              (n.minW = a ? a * n.itemT : n.w),
              (n.maxW = i ? i * n.itemT - t : n.w),
              (n.itemW =
                n.minW > n.w
                  ? (n.w - t * (a - 1)) / a
                  : n.maxW < n.w
                  ? (n.w - t * (i - 1)) / i
                  : n.vars.itemWidth > n.w
                  ? n.w
                  : n.vars.itemWidth),
              (n.visible = Math.floor(n.w / n.itemW)),
              (n.move =
                n.vars.move > 0 && n.vars.move < n.visible
                  ? n.vars.move
                  : n.visible),
              (n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1)),
              (n.last = n.pagingCount - 1),
              (n.limit =
                1 === n.pagingCount
                  ? 0
                  : n.vars.itemWidth > n.w
                  ? n.itemW * (n.count - 1) + t * (n.count - 1)
                  : (n.itemW + t) * n.count - n.w - t))
            : ((n.itemW = n.w),
              (n.itemM = t),
              (n.pagingCount = n.count),
              (n.last = n.count - 1)),
          (n.computedW = n.itemW - n.boxPadding),
          (n.computedM = n.itemM);
      }),
      (n.update = function (e, t) {
        n.doMath(),
          v ||
            (e < n.currentSlide
              ? (n.currentSlide += 1)
              : e <= n.currentSlide && 0 !== e && (n.currentSlide -= 1),
            (n.animatingTo = n.currentSlide)),
          n.vars.controlNav &&
            !n.manualControls &&
            (("add" === t && !v) || n.pagingCount > n.controlNav.length
              ? f.controlNav.update("add")
              : (("remove" === t && !v) ||
                  n.pagingCount < n.controlNav.length) &&
                (v &&
                  n.currentSlide > n.last &&
                  ((n.currentSlide -= 1), (n.animatingTo -= 1)),
                f.controlNav.update("remove", n.last))),
          n.vars.directionNav && f.directionNav.update();
      }),
      (n.addSlide = function (e, t) {
        var a = $(e);
        (n.count += 1),
          (n.last = n.count - 1),
          d && u
            ? void 0 !== t
              ? n.slides.eq(n.count - t).after(a)
              : n.container.prepend(a)
            : void 0 !== t
            ? n.slides.eq(t).before(a)
            : n.container.append(a),
          n.update(t, "add"),
          (n.slides = $(n.vars.selector + ":not(.clone)", n)),
          n.setup(),
          n.vars.added(n);
      }),
      (n.removeSlide = function (e) {
        var t = isNaN(e) ? n.slides.index($(e)) : e;
        (n.count -= 1),
          (n.last = n.count - 1),
          isNaN(e)
            ? $(e, n.slides).remove()
            : d && u
            ? n.slides.eq(n.last).remove()
            : n.slides.eq(e).remove(),
          n.doMath(),
          n.update(t, "remove"),
          (n.slides = $(n.vars.selector + ":not(.clone)", n)),
          n.setup(),
          n.vars.removed(n);
      }),
      f.init();
  }),
    $(window)
      .blur(function (t) {
        e = !1;
      })
      .focus(function (t) {
        e = !0;
      }),
    ($.flexslider.defaults = {
      namespace: "flex-",
      selector: ".slides > li",
      animation: "fade",
      easing: "swing",
      direction: "horizontal",
      reverse: !1,
      animationLoop: !0,
      smoothHeight: !1,
      startAt: 0,
      slideshow: !0,
      slideshowSpeed: 7e3,
      animationSpeed: 600,
      initDelay: 0,
      randomize: !1,
      fadeFirstSlide: !0,
      thumbCaptions: !1,
      pauseOnAction: !0,
      pauseOnHover: !1,
      pauseInvisible: !0,
      useCSS: !0,
      touch: !0,
      video: !1,
      controlNav: !0,
      directionNav: !0,
      prevText: "Previous",
      nextText: "Next",
      keyboard: !0,
      multipleKeyboard: !1,
      mousewheel: !1,
      pausePlay: !1,
      pauseText: "Pause",
      playText: "Play",
      controlsContainer: "",
      manualControls: "",
      customDirectionNav: "",
      sync: "",
      asNavFor: "",
      itemWidth: 0,
      itemMargin: 0,
      minItems: 1,
      maxItems: 0,
      move: 0,
      allowOneSlide: !0,
      start: function () {},
      before: function () {},
      after: function () {},
      end: function () {},
      added: function () {},
      removed: function () {},
      init: function () {},
    }),
    ($.fn.flexslider = function (e) {
      if ((void 0 === e && (e = {}), "object" == typeof e))
        return this.each(function () {
          var t = $(this),
            a = e.selector ? e.selector : ".slides > li",
            n = t.find(a);
          (1 === n.length && e.allowOneSlide === !1) || 0 === n.length
            ? (n.fadeIn(400), e.start && e.start(t))
            : void 0 === t.data("flexslider") && new $.flexslider(this, e);
        });
      var t = $(this).data("flexslider");
      switch (e) {
        case "play":
          t.play();
          break;
        case "pause":
          t.pause();
          break;
        case "stop":
          t.stop();
          break;
        case "next":
          t.flexAnimate(t.getTarget("next"), !0);
          break;
        case "prev":
        case "previous":
          t.flexAnimate(t.getTarget("prev"), !0);
          break;
        default:
          "number" == typeof e && t.flexAnimate(e, !0);
      }
    });
})(jQuery);
