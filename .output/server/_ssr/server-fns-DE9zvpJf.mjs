import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-CMzxgZBk.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:https";
import "node:http2";
import "../_libs/react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getAdminSession_createServerFn_handler = createServerRpc({
  id: "aa82ee41b9c577cb7924a94c9cd5c0273e9904c43159409010260cd404205f5d",
  name: "getAdminSession",
  filename: "src/lib/server-fns.ts"
}, (opts) => getAdminSession.__executeServer(opts));
const getAdminSession = createServerFn({
  method: "GET"
}).handler(getAdminSession_createServerFn_handler, async () => {
  const {
    resolveAdminSession
  } = await import("./admin-auth.server-DERk3R9A.mjs");
  return resolveAdminSession();
});
const ensureAdminSession_createServerFn_handler = createServerRpc({
  id: "b996d118d38dc4d3c736274621e9f49906551aed916d514d8216c1b0d3e48e09",
  name: "ensureAdminSession",
  filename: "src/lib/server-fns.ts"
}, (opts) => ensureAdminSession.__executeServer(opts));
const ensureAdminSession = createServerFn({
  method: "GET"
}).handler(ensureAdminSession_createServerFn_handler, async () => {
  const {
    ensureAdmin
  } = await import("./admin-auth.server-DERk3R9A.mjs");
  return ensureAdmin();
});
const loginFn_createServerFn_handler = createServerRpc({
  id: "fb2be1589c3b2c4fc092baa27fec7a2ff9fbc85f97d12c57120f5591247a67e0",
  name: "loginFn",
  filename: "src/lib/server-fns.ts"
}, (opts) => loginFn.__executeServer(opts));
const loginFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(loginFn_createServerFn_handler, async ({
  data
}) => {
  const {
    db
  } = await import("./index-Dinle6nz.mjs").then((n) => n.i);
  const {
    logInfo,
    logWarn
  } = await import("./logger-CsgR-Ne_.mjs");
  const {
    username,
    password
  } = data;
  logInfo("admin-login", "Login attempt", {
    username
  });
  if (!username || !password) {
    logWarn("admin-login", "Missing credentials");
    return {
      ok: false,
      error: "Missing credentials"
    };
  }
  const match = await db.query.adminUsers.findFirst({
    where: (table, {
      eq,
      and
    }) => and(eq(table.username, username), eq(table.password, password))
  });
  if (!match) {
    logWarn("admin-login", "Invalid credentials", {
      username
    });
    return {
      ok: false,
      error: "Invalid credentials"
    };
  }
  logInfo("admin-login", "Login success", {
    username
  });
  const {
    setCookie
  } = await import("./server-CMzxgZBk.mjs").then(function(n) {
    return n.s;
  });
  setCookie("wdc_admin", encodeURIComponent(username), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 604800
  });
  return {
    ok: true
  };
});
const getAdminData_createServerFn_handler = createServerRpc({
  id: "9d911051c9212e7701136163c415fa9167a5d2cb506c3710db12948386f0eda2",
  name: "getAdminData",
  filename: "src/lib/server-fns.ts"
}, (opts) => getAdminData.__executeServer(opts));
const getAdminData = createServerFn({
  method: "GET"
}).handler(getAdminData_createServerFn_handler, async () => {
  const {
    ensureAdmin
  } = await import("./admin-auth.server-DERk3R9A.mjs");
  const {
    getLatestDraftLanding,
    listMedia
  } = await import("./content-DOBj8LEh.mjs");
  const {
    logInfo
  } = await import("./logger-CsgR-Ne_.mjs");
  logInfo("admin", "Loading admin data");
  await ensureAdmin();
  const landing = await getLatestDraftLanding();
  const media = await listMedia();
  logInfo("admin", "Admin data loaded", {
    versionId: landing.versionId,
    mediaCount: media.length
  });
  return {
    landing,
    media
  };
});
const saveLandingFn_createServerFn_handler = createServerRpc({
  id: "47e16675823efac3d977d25b4b32e5d6076c2493a7059a5d1caacea5f6377319",
  name: "saveLandingFn",
  filename: "src/lib/server-fns.ts"
}, (opts) => saveLandingFn.__executeServer(opts));
const saveLandingFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(saveLandingFn_createServerFn_handler, async ({
  data
}) => {
  const {
    ensureAdmin
  } = await import("./admin-auth.server-DERk3R9A.mjs");
  const {
    createPageVersion
  } = await import("./content-DOBj8LEh.mjs");
  const {
    collectMediaIds
  } = await import("./pickers-CT9PgHSK.mjs");
  const {
    formValuesToContent
  } = await import("./serialize-BfRcAvkx.mjs");
  const {
    logInfo,
    logWarn
  } = await import("./logger-CsgR-Ne_.mjs");
  const session = await ensureAdmin();
  const {
    pageId,
    values
  } = data;
  if (!pageId || !values) {
    logWarn("admin-save", "Missing payload");
    throw new Error("Missing payload");
  }
  logInfo("admin-save", "Saving content", {
    pageId
  });
  const content = formValuesToContent(values);
  const mediaIds = collectMediaIds(content);
  if (values.scheduleMediaId) {
    mediaIds.push(values.scheduleMediaId);
  }
  const version = await createPageVersion({
    pageId,
    content,
    jamaatTimes: content.jamaatTimes,
    mediaIds: [...new Set(mediaIds)],
    scheduleMediaId: values.scheduleMediaId,
    createdByUserId: session.username
  });
  logInfo("admin-save", "Save complete", {
    versionId: version.id
  });
  return {
    ok: true,
    versionId: version.id
  };
});
const uploadMediaFn_createServerFn_handler = createServerRpc({
  id: "11e63ba0caa00fa22f17cbe8c28b61ca8b37fc1662dd6882c0123466680fef19",
  name: "uploadMediaFn",
  filename: "src/lib/server-fns.ts"
}, (opts) => uploadMediaFn.__executeServer(opts));
const uploadMediaFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(uploadMediaFn_createServerFn_handler, async ({
  data
}) => {
  const {
    ensureAdmin
  } = await import("./admin-auth.server-DERk3R9A.mjs");
  const {
    logInfo
  } = await import("./logger-CsgR-Ne_.mjs");
  await ensureAdmin();
  const {
    uploadMedia
  } = await import("./media-BEFIP__9.mjs");
  const binaryStr = atob(data.fileBase64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  const file = new File([bytes], data.fileName, {
    type: data.fileType
  });
  const item = await uploadMedia({
    file
  });
  logInfo("media", "Upload complete", {
    mediaId: item.id,
    filename: item.filename
  });
  return item;
});
const deleteMediaFn_createServerFn_handler = createServerRpc({
  id: "1d8567c8de012a589f79170be365d726725640eb0c932811be95ab21c63edbcc",
  name: "deleteMediaFn",
  filename: "src/lib/server-fns.ts"
}, (opts) => deleteMediaFn.__executeServer(opts));
const deleteMediaFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(deleteMediaFn_createServerFn_handler, async ({
  data
}) => {
  const {
    ensureAdmin
  } = await import("./admin-auth.server-DERk3R9A.mjs");
  const {
    canDeleteMedia,
    archiveMedia
  } = await import("./content-DOBj8LEh.mjs");
  await ensureAdmin();
  const allowed = await canDeleteMedia(data.mediaId);
  if (!allowed) {
    throw new Error("Media is in use and cannot be deleted");
  }
  await archiveMedia(data.mediaId);
  return {
    ok: true
  };
});
const LATITUDE = "53.3614";
const LONGITUDE = "-2.7341";
const LOCAL_TIMEZONE = "Europe/London";
const getLandingContentFn_createServerFn_handler = createServerRpc({
  id: "9fd83906fd7674a25bd3f1145c9a49c7dcfad65a9a6db4b71546f2626434f715",
  name: "getLandingContentFn",
  filename: "src/lib/server-fns.ts"
}, (opts) => getLandingContentFn.__executeServer(opts));
const getLandingContentFn = createServerFn({
  method: "GET"
}).handler(getLandingContentFn_createServerFn_handler, async () => {
  const {
    getLatestPublishedLanding,
    getMediaById
  } = await import("./content-DOBj8LEh.mjs");
  const {
    hydrateMedia
  } = await import("./media-map-DroVlSY6.mjs");
  const {
    getSunsetTime,
    formatSunsetTime
  } = await import("./sunset-Ccu0etzm.mjs");
  const data = await getLatestPublishedLanding();
  const hydrated = hydrateMedia(data.content, data.media);
  const today = /* @__PURE__ */ new Date();
  const dateLabel = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(today);
  const hijriLabel = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(today);
  const maghrib = data.jamaatTimes.find((time) => time.name === "maghrib");
  let computedTimes = data.jamaatTimes;
  if (maghrib?.kind === "sunset") {
    const date = today.toISOString().slice(0, 10);
    const offsetMinutes = maghrib.offsetMinutes ?? 0;
    const {
      sunsetUtc
    } = await getSunsetTime({
      date,
      latitude: LATITUDE,
      longitude: LONGITUDE
    });
    const maghribTime = formatSunsetTime({
      sunsetUtc,
      offsetMinutes,
      timeZone: LOCAL_TIMEZONE
    });
    computedTimes = data.jamaatTimes.map((time) => time.name === "maghrib" ? {
      ...time,
      time: maghribTime
    } : time);
  }
  let downloadHref;
  if (data.scheduleMediaId) {
    const scheduleMedia = await getMediaById(data.scheduleMediaId);
    if (scheduleMedia) {
      downloadHref = scheduleMedia.storagePath;
    }
  }
  return {
    content: hydrated,
    jamaatTimes: computedTimes,
    dateLabel: dateLabel.toUpperCase(),
    hijriLabel: hijriLabel.toUpperCase(),
    downloadHref
  };
});
export {
  deleteMediaFn_createServerFn_handler,
  ensureAdminSession_createServerFn_handler,
  getAdminData_createServerFn_handler,
  getAdminSession_createServerFn_handler,
  getLandingContentFn_createServerFn_handler,
  loginFn_createServerFn_handler,
  saveLandingFn_createServerFn_handler,
  uploadMediaFn_createServerFn_handler
};
