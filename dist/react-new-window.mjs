import { useState as T, useEffect as v } from "react";
import b from "react-dom";
function x(t) {
  return t.cssText.split("url(").map((n) => n[1] === "/" ? `${n.slice(0, 1)}${window.location.origin}${n.slice(1)}` : n).join("url(");
}
function W(t) {
  const n = ["@keyframes", t.name, "{"];
  return Array.from(t.cssRules).forEach(
    (r) => {
      n.push(r.keyText, "{", r.style.cssText, "}");
    }
  ), n.push("}"), n.join(" ");
}
function O(t, n) {
  const r = n.createDocumentFragment();
  Array.from(t.styleSheets).forEach((c) => {
    let e;
    try {
      e = c.cssRules;
    } catch (i) {
      console.error(i);
    }
    if (e && Object.values(e).some((i) => i instanceof CSSFontFaceRule) && c.href, e) {
      const i = [];
      Array.from(c.cssRules).forEach((d) => {
        const { type: o } = d;
        if (o === 0)
          return;
        let l = "";
        o === CSSRule.KEYFRAMES_RULE ? l = W(d) : [CSSRule.IMPORT_RULE, CSSRule.FONT_FACE_RULE].includes(o) ? l = x(d) : l = d.cssText, i.push(l);
      });
      const a = n.createElement("style");
      a.textContent = i.join(`
`), r.appendChild(a);
    } else if (c.href) {
      const i = n.createElement("link");
      i.rel = "stylesheet", i.href = c.href, r.appendChild(i);
    }
  }), n.head.appendChild(r);
}
const k = (t) => t.nodeType === Node.ELEMENT_NODE;
function F(t) {
  return Object.keys(t).reduce((n, r) => {
    const c = t[r];
    return typeof c == "boolean" ? n.push(`${r}=${c ? "yes" : "no"}`) : n.push(`${r}=${c}`), n;
  }, []).join(",");
}
const u = {
  url: "",
  name: "",
  title: "",
  features: { width: "600px", height: "640px" },
  center: "parent",
  copyStyles: !0,
  closeOnUnmount: !0
}, A = (t) => {
  const {
    url: n = u.url,
    name: r = u.name,
    title: c = u.title,
    features: e = u.features,
    center: i = u.center,
    copyStyles: a = u.copyStyles,
    closeOnUnmount: d = u.closeOnUnmount,
    onOpen: o,
    onUnload: l,
    onBlock: w,
    children: f
  } = t, [s, C] = T();
  if (v(function() {
    const y = N({
      url: n,
      title: c,
      name: r,
      features: e,
      center: i,
      copyStyles: a,
      closeOnUnmount: d,
      onOpen: o,
      onUnload: l,
      onBlock: w
    });
    y && C(y);
    const S = setInterval(() => {
      (!s || s.closed) && E();
    }, 50), E = () => {
      clearInterval(S), l && l();
    };
    return s && s.addEventListener("beforeunload", () => E()), () => {
      if (s) {
        if (d)
          s.close();
        else if (t.children) {
          const g = m(s);
          if (g) {
            const p = g.cloneNode(!0);
            k(p) && (p.setAttribute("id", "new-window-container-static"), s.document.body.appendChild(p));
          }
        }
      }
    };
  }, []), s) {
    const h = m(s);
    if (h)
      return b.createPortal(f, h);
  }
  return null;
}, N = (t) => {
  const {
    url: n,
    title: r = u.title,
    name: c,
    features: e = u.features,
    onBlock: i,
    onOpen: a,
    center: d
  } = t;
  if (typeof d == "string" && ((e == null ? void 0 : e.width) === void 0 || (e == null ? void 0 : e.height) === void 0))
    console.warn(
      "react-new-window: width and height window features must be present when a center prop is provided"
    );
  else if (d === "parent")
    window.top === null ? console.warn("react-new-window: can't access parent window") : (e.left = window.top.outerWidth / 2 + window.top.screenX - e.width / 2, e.top = window.top.outerHeight / 2 + window.top.screenY - e.height / 2);
  else if (d === "screen") {
    const l = window.screenLeft !== void 0 ? window.screenLeft : "left" in window.screen ? window.screen.left : 0, w = window.screenTop !== void 0 ? window.screenTop : "top" in window.screen ? window.screen.top : 0, f = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width, s = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;
    e.left = f / 2 - e.width / 2 + l, e.top = s / 2 - e.height / 2 + w;
  }
  const o = window.open(n, c, F(e));
  if (o) {
    if (o.document.title = r, !!m(o)) {
      const w = o.document.getElementById(
        "new-window-container-static"
      );
      w && o.document.body.removeChild(w);
    } else {
      const w = o.document.createElement("div");
      w.setAttribute("id", "new-window-container"), o.document.body.appendChild(w);
    }
    t.copyStyles && setTimeout(() => O(document, o.document), 0), a && a(o);
  } else
    i ? i() : console.warn(
      "react-new-window: A new window could not be opened. Maybe it was blocked."
    );
  return o;
}, m = (t) => t.document.getElementById("new-window-container");
export {
  A as default
};
