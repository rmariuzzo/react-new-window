import { useState as S, useEffect as T } from "react";
import v from "react-dom";
function b(n) {
  return n.cssText.split("url(").map((e) => e[1] === "/" ? `${e.slice(0, 1)}${window.location.origin}${e.slice(1)}` : e).join("url(");
}
function x(n) {
  const e = ["@keyframes", n.name, "{"];
  return Array.from(n.cssRules).forEach(
    (r) => {
      e.push(r.keyText, "{", r.style.cssText, "}");
    }
  ), e.push("}"), e.join(" ");
}
function W(n, e) {
  const r = e.createDocumentFragment();
  Array.from(n.styleSheets).forEach((c) => {
    let t;
    try {
      t = c.cssRules;
    } catch (i) {
      console.error(i);
    }
    if (t && Object.values(t).some((i) => i instanceof CSSFontFaceRule) && c.href, t) {
      const i = [];
      Array.from(c.cssRules).forEach((d) => {
        const { type: o } = d;
        if (o === 0)
          return;
        let l = "";
        o === CSSRule.KEYFRAMES_RULE ? l = x(d) : [CSSRule.IMPORT_RULE, CSSRule.FONT_FACE_RULE].includes(o) ? l = b(d) : l = d.cssText, i.push(l);
      });
      const a = e.createElement("style");
      a.textContent = i.join(`
`), r.appendChild(a);
    } else if (c.href) {
      const i = e.createElement("link");
      i.rel = "stylesheet", i.href = c.href, r.appendChild(i);
    }
  }), e.head.appendChild(r);
}
const O = (n) => n.nodeType === Node.ELEMENT_NODE;
function k(n) {
  return Object.keys(n).reduce((e, r) => {
    const c = n[r];
    return typeof c == "boolean" ? e.push(`${r}=${c ? "yes" : "no"}`) : e.push(`${r}=${c}`), e;
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
}, R = (n) => {
  const {
    url: e = u.url,
    name: r = u.name,
    title: c = u.title,
    features: t = u.features,
    center: i = u.center,
    copyStyles: a = u.copyStyles,
    closeOnUnmount: d = u.closeOnUnmount,
    onOpen: o,
    onUnload: l,
    onBlock: w,
    children: h
  } = n, [f, g] = S();
  if (T(() => {
    const s = F({
      url: e,
      title: c,
      name: r,
      features: t,
      center: i,
      copyStyles: a,
      closeOnUnmount: d,
      onOpen: o,
      onUnload: l,
      onBlock: w
    });
    s && g(s);
    const C = setInterval(() => {
      (!s || s.closed) && y();
    }, 50), y = () => {
      clearInterval(C), l && l();
    };
    return s && s.addEventListener("beforeunload", () => y()), () => {
      if (s) {
        if (d)
          s.close();
        else if (n.children) {
          const E = m(s);
          if (E) {
            const p = E.cloneNode(!0);
            O(p) && (p.setAttribute("id", "new-window-container-static"), s.document.body.appendChild(p));
          }
        }
      }
    };
  }, []), f) {
    const s = m(f);
    s && v.createPortal(h, s);
  }
  return null;
}, F = (n) => {
  const { url: e, title: r, name: c, features: t, onBlock: i, onOpen: a, center: d } = n;
  if (typeof d == "string" && (t.width === void 0 || t.height === void 0))
    console.warn(
      "react-new-window: width and height window features must be present when a center prop is provided"
    );
  else if (d === "parent")
    window.top === null ? console.warn("react-new-window: can't access parent window") : (t.left = window.top.outerWidth / 2 + window.top.screenX - t.width / 2, t.top = window.top.outerHeight / 2 + window.top.screenY - t.height / 2);
  else if (d === "screen") {
    const l = window.screenLeft !== void 0 ? window.screenLeft : "left" in window.screen ? window.screen.left : 0, w = window.screenTop !== void 0 ? window.screenTop : "top" in window.screen ? window.screen.top : 0, h = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width, f = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;
    t.left = h / 2 - t.width / 2 + l, t.top = f / 2 - t.height / 2 + w;
  }
  const o = window.open(e, c, k(t));
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
    n.copyStyles && setTimeout(() => W(document, o.document), 0), a && a(o);
  } else
    i ? i() : console.warn(
      "react-new-window: A new window could not be opened. Maybe it was blocked."
    );
  return o;
}, m = (n) => n.document.getElementById("new-window-container");
export {
  R as default
};
