const formatMessage = (level, scope, message, meta) => {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const payload = meta ? ` ${JSON.stringify(meta)}` : "";
  return `[${timestamp}] [${level.toUpperCase()}] [${scope}] ${message}${payload}`;
};
const logInfo = (scope, message, meta) => {
  console.log(formatMessage("info", scope, message, meta));
};
const logWarn = (scope, message, meta) => {
  console.warn(formatMessage("warn", scope, message, meta));
};
export {
  logInfo,
  logWarn
};
