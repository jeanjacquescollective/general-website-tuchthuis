! function(t) {
  function e(a) {
    if (r[a]) return r[a].exports;
    var i = r[a] = {
      exports: {},
      id: a,
      loaded: !1
    };
    return t[a].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
  }
  var r = {};
  return e.m = t, e.c = r, e.p = "", e(0)
}([function(t, e, r) {
  "use strict";
  r(1)
}, function(t, e, r) {
  "use strict";

  function a(t, e) {
    return {
      status: "error",
      src: e,
      message: t,
      timestamp: Date.now()
    }
  }
  var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
      return typeof t
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    },
    s = r(2);
  if ("undefined" == typeof AFRAME) throw "Component attempted to register before AFRAME was available.";
  var n = AFRAME.utils.srcLoader.parseUrl,
    o = AFRAME.utils.debug;
  o.enable("shader:gif:warn");
  var _ = o("shader:gif:warn"),
    h = o("shader:gif:debug"),
    u = {};
  AFRAME.registerShader("gif", {
    schema: {
      color: {
        type: "color"
      },
      fog: {
        default: !0
      },
      src: {
        default: null
      },
      autoplay: {
        default: !0
      }
    },
    init: function(t) {
      return h("init", t), h(this.el.components), this.__cnv = document.createElement("canvas"), this.__cnv.width = 2, this.__cnv.height = 2, this.__ctx = this.__cnv.getContext("2d"), this.__texture = new THREE.Texture(this.__cnv), t.repeat && (this.__texture.wrapS = THREE.RepeatWrapping, this.__texture.wrapT = THREE.RepeatWrapping, this.__texture.repeat.set(t.repeat.x, t.repeat.y)), this.__material = {}, this.__reset(), this.material = new THREE.MeshBasicMaterial({
        map: this.__texture
      }), this.el.sceneEl.addBehavior(this), this.material
    },
    update: function(t) {
      return h("update", t), this.__updateMaterial(t), this.__updateTexture(t), this.material
    },
    tick: function(t) {
      this.__frames && !this.paused() && Date.now() - this.__startTime >= this.__nextFrameTime && this.nextFrame()
    },
    __updateMaterial: function(t) {
      var e = this.material,
        r = this.__getMaterialData(t);
      Object.keys(r).forEach(function(t) {
        e[t] = r[t]
      })
    },
    __getMaterialData: function(t) {
      return {
        fog: t.fog,
        color: new THREE.Color(t.color)
      }
    },
    __setTexure: function(t) {
      h("__setTexure", t), "error" === t.status ? (_("Error: " + t.message + "\nsrc: " + t.src), this.__reset()) : "success" === t.status && t.src !== this.__textureSrc && (this.__reset(), this.__ready(t))
    },
    __updateTexture: function(t) {
      var e = t.src,
        r = t.autoplay;
      "boolean" == typeof r ? this.__autoplay = r : "undefined" == typeof r && (this.__autoplay = !0), this.__autoplay && this.__frames && this.play(), e ? this.__validateSrc(e, this.__setTexure.bind(this)) : this.__reset()
    },
    __validateSrc: function(t, e) {
      var r = n(t);
      if (r) return void this.__getImageSrc(r, e);
      var s = void 0,
        o = this.__validateAndGetQuerySelector(t);
      if (o && "object" === ("undefined" == typeof o ? "undefined" : i(o))) {
        if (o.error) s = o.error;
        else {
          var _ = o.tagName.toLowerCase();
          if ("video" === _) t = o.src, s = "For video, please use `aframe-video-shader`";
          else {
            if ("img" === _) return void this.__getImageSrc(o.src, e);
            s = "For <" + _ + "> element, please use `aframe-html-shader`"
          }
        }
        if (s) {
          var h = u[t],
            c = a(s, t);
          h && h.callbacks ? h.callbacks.forEach(function(t) {
            return t(c)
          }) : e(c), u[t] = c
        }
      }
    },
    __getImageSrc: function(t, e) {
      function r(e) {
        var r = a(e, t);
        n.callbacks && (n.callbacks.forEach(function(t) {
          return t(r)
        }), u[t] = r)
      }
      var i = this;
      if (t !== this.__textureSrc) {
        var n = u[t];
        if (n && n.callbacks) {
          if (n.src) return void e(n);
          if (n.callbacks) return void n.callbacks.push(e)
        } else n = u[t] = {
          callbacks: []
        }, n.callbacks.push(e);
        var o = new Image;
        o.crossOrigin = "Anonymous", o.addEventListener("load", function(e) {
          i.__getUnit8Array(t, function(e) {
            return e ? void(0, s.parseGIF)(e, function(e, r, a) {
              var i = {
                status: "success",
                src: t,
                times: e,
                cnt: r,
                frames: a,
                timestamp: Date.now()
              };
              n.callbacks && (n.callbacks.forEach(function(t) {
                return t(i)
              }), u[t] = i)
            }, function(t) {
              return r(t)
            }) : void r("This is not gif. Please use `shader:flat` instead")
          })
        }), o.addEventListener("error", function(t) {
          return r("Could be the following issue\n - Not Image\n - Not Found\n - Server Error\n - Cross-Origin Issue")
        }), o.src = t
      }
    },
    __getUnit8Array: function(t, e) {
      if ("function" == typeof e) {
        var r = new XMLHttpRequest;
        r.open("GET", t), r.responseType = "arraybuffer", r.addEventListener("load", function(t) {
          for (var r = new Uint8Array(t.target.response), a = r.subarray(0, 4), i = "", s = 0; s < a.length; s++) i += a[s].toString(16);
          "47494638" === i ? e(r) : e()
        }), r.addEventListener("error", function(t) {
          h(t), e()
        }), r.send()
      }
    },
    __validateAndGetQuerySelector: function(t) {
      try {
        var e = document.querySelector(t);
        return e ? e : {
          error: "No element was found matching the selector"
        }
      } catch (t) {
        return {
          error: "no valid selector"
        }
      }
    },
    pause: function() {
      h("pause"), this.__paused = !0
    },
    play: function() {
      h("play"), this.__paused = !1
    },
    togglePlayback: function() {
      this.paused() ? this.play() : this.pause()
    },
    paused: function() {
      return this.__paused
    },
    nextFrame: function() {
      for (this.__draw(); Date.now() - this.__startTime >= this.__nextFrameTime;) this.__nextFrameTime += this.__delayTimes[this.__frameIdx++], (this.__infinity || this.__loopCnt) && this.__frameCnt <= this.__frameIdx && (this.__frameIdx = 0)
    },
    __clearCanvas: function() {
      this.__ctx.clearRect(0, 0, this.__width, this.__height), this.__texture.needsUpdate = !0
    },
    __draw: function() {
      if (0 != this.__frameIdx) {
        var t = this.__frames[this.__frameIdx - 1];
        8 != t.disposalMethod && 9 != t.disposalMethod || this.__clearCanvas()
      } else this.__clearCanvas();
      var e = this.__frames[this.__frameIdx];
      "undefined" != typeof e && (this.__ctx.drawImage(e, 0, 0, this.__width, this.__height), this.__texture.needsUpdate = !0)
    },
    __ready: function(t) {
      var e = t.src,
        r = t.times,
        a = t.cnt,
        i = t.frames;
      h("__ready"), this.__textureSrc = e, this.__delayTimes = r, a ? this.__loopCnt = a : this.__infinity = !0, this.__frames = i, this.__frameCnt = r.length, this.__startTime = Date.now(), this.__width = THREE.Math.floorPowerOfTwo(i[0].width), this.__height = THREE.Math.floorPowerOfTwo(i[0].height), this.__cnv.width = this.__width, this.__cnv.height = this.__height, this.__draw(), this.__autoplay ? this.play() : this.pause()
    },
    __reset: function() {
      this.pause(), this.__clearCanvas(), this.__startTime = 0, this.__nextFrameTime = 0, this.__frameIdx = 0, this.__frameCnt = 0, this.__delayTimes = null, this.__infinity = !1, this.__loopCnt = 0, this.__frames = null, this.__textureSrc = null
    }
  })
}, function(t, e) {
  "use strict";
  e.parseGIF = function(t, e, r) {
    var a = 0,
      i = [],
      s = 0,
      n = null,
      o = null,
      _ = [],
      h = 0;
    if (71 === t[0] && 73 === t[1] && 70 === t[2] && 56 === t[3] && 57 === t[4] && 97 === t[5]) {
      a += 13 + +!!(128 & t[10]) * Math.pow(2, (7 & t[10]) + 1) * 3;
      for (var u = t.subarray(0, a); t[a] && 59 !== t[a];) {
        var c = a,
          l = t[a];
        if (33 === l) {
          var f = t[++a];
          if ([1, 254, 249, 255].indexOf(f) === -1) {
            r && r("parseGIF: unknown label");
            break
          }
          for (249 === f && i.push(10 * (t[a + 3] + (t[a + 4] << 8))), 255 === f && (h = t[a + 15] + (t[a + 16] << 8)); t[++a];) a += t[a];
          249 === f && (n = t.subarray(c, a + 1))
        } else {
          if (44 !== l) {
            r && r("parseGIF: unknown blockId");
            break
          }
          for (a += 9, a += 1 + +!!(128 & t[a]) * (3 * Math.pow(2, (7 & t[a]) + 1)); t[++a];) a += t[a];
          var o = t.subarray(c, a + 1),
            d = {
              disposalMethod: n[3],
              blob: URL.createObjectURL(new Blob([u, n, o]))
            };
          _.push(d)
        }
        a++
      }
    } else r && r("parseGIF: no GIF89a");
    if (_.length) {
      var p = document.createElement("canvas"),
        m = function() {
          for (var t = 0; t < _.length; t++) {
            var e = new Image;
            e.onload = function(t, r) {
              0 === r && (p.width = e.width, p.height = e.height), s++, _[r] = this, s === _.length && (s = 0, v(1))
            }.bind(e, null, t), e.src = _[t].blob, e.disposalMethod = _[t].disposalMethod
          }
        },
        v = function t(r) {
          var a = new Image;
          a.onload = function(r, a) {
            s++, _[a] = this, s === _.length ? (p = null, e && e(i, h, _)) : t(++a)
          }.bind(a), a.src = p.toDataURL("image/gif")
        };
      m()
    }
  }
}]);
