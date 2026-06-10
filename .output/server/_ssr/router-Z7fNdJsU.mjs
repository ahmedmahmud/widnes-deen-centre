import { o as redirect } from "../_libs/tanstack__router-core.mjs";
import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-CMzxgZBk.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/tiny-warning.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:https";
import "node:http2";
const appCss = "/assets/styles-BFKcGjyY.css";
const Route$3 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Widnes Deen Centre"
      }
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
        sizes: "48x48"
      },
      {
        rel: "icon",
        href: "/favicon.png",
        type: "image/png",
        sizes: "192x192"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument,
  notFoundComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Not Found" })
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", className: "scroll-smooth scroll-pt-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "bg-sand text-plum antialiased overflow-x-hidden", children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getAdminSession = createServerFn({
  method: "GET"
}).handler(createSsrRpc("aa82ee41b9c577cb7924a94c9cd5c0273e9904c43159409010260cd404205f5d"));
const ensureAdminSession = createServerFn({
  method: "GET"
}).handler(createSsrRpc("b996d118d38dc4d3c736274621e9f49906551aed916d514d8216c1b0d3e48e09"));
const loginFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("fb2be1589c3b2c4fc092baa27fec7a2ff9fbc85f97d12c57120f5591247a67e0"));
const getAdminData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("9d911051c9212e7701136163c415fa9167a5d2cb506c3710db12948386f0eda2"));
const saveLandingFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("47e16675823efac3d977d25b4b32e5d6076c2493a7059a5d1caacea5f6377319"));
const uploadMediaFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("11e63ba0caa00fa22f17cbe8c28b61ca8b37fc1662dd6882c0123466680fef19"));
const deleteMediaFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("1d8567c8de012a589f79170be365d726725640eb0c932811be95ab21c63edbcc"));
const getLandingContentFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("9fd83906fd7674a25bd3f1145c9a49c7dcfad65a9a6db4b71546f2626434f715"));
const $$splitComponentImporter$2 = () => import("./login-BtMWi9I-.mjs");
const Route$2 = createFileRoute("/login")({
  beforeLoad: async () => {
    const session = await getAdminSession();
    if (session) {
      throw redirect({
        to: "/admin"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin-DbrEbgJd.mjs");
const Route$1 = createFileRoute("/admin")({
  beforeLoad: async () => {
    try {
      await ensureAdminSession();
    } catch {
      throw redirect({
        to: "/login"
      });
    }
  },
  loader: async () => getAdminData(),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BTIcvLgP.mjs");
const Route = createFileRoute("/")({
  loader: async () => getLandingContentFn(),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const LoginRoute = Route$2.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$3
});
const AdminRoute = Route$1.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$3
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$3
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  LoginRoute
};
const routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$1 as R,
  Route as a,
  deleteMediaFn as d,
  loginFn as l,
  router as r,
  saveLandingFn as s,
  uploadMediaFn as u
};
