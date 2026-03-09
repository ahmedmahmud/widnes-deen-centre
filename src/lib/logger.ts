type LogLevel = "info" | "warn" | "error";

const formatMessage = (
  level: LogLevel,
  scope: string,
  message: string,
  meta?: Record<string, unknown>,
) => {
  const timestamp = new Date().toISOString();
  const payload = meta ? ` ${JSON.stringify(meta)}` : "";
  return `[${timestamp}] [${level.toUpperCase()}] [${scope}] ${message}${payload}`;
};

export const logInfo = (
  scope: string,
  message: string,
  meta?: Record<string, unknown>,
) => {
  console.log(formatMessage("info", scope, message, meta));
};

export const logWarn = (
  scope: string,
  message: string,
  meta?: Record<string, unknown>,
) => {
  console.warn(formatMessage("warn", scope, message, meta));
};

export const logError = (
  scope: string,
  message: string,
  meta?: Record<string, unknown>,
) => {
  console.error(formatMessage("error", scope, message, meta));
};
