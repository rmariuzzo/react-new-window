import { useState as T, useEffect as v } from "react";
import b from "react-dom";
function x(t) {
  return t.cssText.split("url(").map((n) => n[1] === "/" ? `${n.slice(0, 1)}${window.location.origin}${n.slice(1)}` : n).join("url(");
}
function F(t) {
  const n = ["@keyframes", t.name, "{"];
  return Array.from(t.cssRules).forEach(
    (c) => {
      n.push(c.keyText, "{", c.style.cssText, "}");
    }
  ), n.push("}"), n.join(" ");
}
function W(t, n) {
  const c = n.createDocumentFragment();
  Array.from(t.styleSheets).forEach((s) => {
    let e;
    try {
      e = s.cssRules;
    } catch (i) {
      console.error(i);
    }
    const a = e && Object.values(e).some((i) => i instanceof CSSFontFaceRule) && s.href;
    if (e && !a) {
      const i = [];
      Array.from(s.cssRules).forEach((o) => {
        const { type: l } = o;
        if (l === 0)
          return;
        let r = "";
        l === CSSRule.KEYFRAMES_RULE ? r = F(o) : [CSSRule.IMPORT_RULE, CSSRule.FONT_FACE_RULE].includes(l) ? r = x(o) : r = o.cssText, i.push(r);
      });
      const w = n.createElement("style");
      w.textContent = i.join(`
`), c.appendChild(w);
    } else if (s.href) {
      const i = n.createElement("link");
      i.rel = "stylesheet", i.href = s.href, c.appendChild(i);
    }
  }), n.head.appendChild(c);
}
const O = (t) => t.nodeType === Node.ELEMENT_NODE;
function k(t) {
  return Object.keys(t).reduce((n, c) => {
    const s = t[c];
    return typeof s == "boolean" ? n.push(`${c}=${s ? "yes" : "no"}`) : n.push(`${c}=${s}`), n;
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
    name: c = u.name,
    title: s = u.title,
    features: e = u.features,
    center: a = u.center,
    copyStyles: i = u.copyStyles,
    closeOnUnmount: w = u.closeOnUnmount,
    onOpen: o,
    onUnload: l,
    onBlock: r,
    children: f
  } = t, [d, C] = T();
  if (v(function() {
    const y = N({
      url: n,
      title: s,
      name: c,
      features: e,
      center: a,
      copyStyles: i,
      closeOnUnmount: w,
      onOpen: o,
      onUnload: l,
      onBlock: r
    });
    y && C(y);
    const S = setInterval(() => {
      (!d || d.closed) && E();
    }, 50), E = () => {
      clearInterval(S), l && l();
    };
    return d && d.addEventListener("beforeunload", () => E()), () => {
      if (d) {
        if (w)
          d.close();
        else if (t.children) {
          const g = m(d);
          if (g) {
            const p = g.cloneNode(!0);
            O(p) && (p.setAttribute("id", "new-window-container-static"), d.document.body.appendChild(p));
          }
        }
      }
    };
  }, []), d) {
    const h = m(d);
    if (h)
      return b.createPortal(f, h);
  }
  return null;
}, N = (t) => {
  const {
    url: n,
    title: c = u.title,
    name: s,
    features: e = u.features,
    onBlock: a,
    onOpen: i,
    center: w
  } = t;
  if (typeof w == "string" && ((e == null ? void 0 : e.width) === void 0 || (e == null ? void 0 : e.height) === void 0))
    console.warn(
      "react-new-window: width and height window features must be present when a center prop is provided"
    );
  else if (w === "parent")
    window.top === null ? console.warn("react-new-window: can't access parent window") : (e.left = window.top.outerWidth / 2 + window.top.screenX - e.width / 2, e.top = window.top.outerHeight / 2 + window.top.screenY - e.height / 2);
  else if (w === "screen") {
    const l = window.screenLeft !== void 0 ? window.screenLeft : "left" in window.screen ? window.screen.left : 0, r = window.screenTop !== void 0 ? window.screenTop : "top" in window.screen ? window.screen.top : 0, f = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width, d = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;
    e.left = f / 2 - e.width / 2 + l, e.top = d / 2 - e.height / 2 + r;
  }
  const o = window.open(n, s, k(e));
  if (o) {
    if (o.document.title = c, !!m(o)) {
      const r = o.document.getElementById(
        "new-window-container-static"
      );
      r && o.document.body.removeChild(r);
    } else {
      const r = o.document.createElement("div");
      r.setAttribute("id", "new-window-container"), o.document.body.appendChild(r);
    }
    t.copyStyles && setTimeout(() => W(document, o.document), 0), i && i(o);
  } else
    a ? a() : console.warn(
      "react-new-window: A new window could not be opened. Maybe it was blocked."
    );
  return o;
}, m = (t) => t.document.getElementById("new-window-container");
export {
  A as default
};
