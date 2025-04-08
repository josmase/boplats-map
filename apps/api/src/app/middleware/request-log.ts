import { Context, Middleware } from "@oak/oak";
import * as colors from "@std/fmt/colors";

export function requestLogMiddleware(): Middleware {
  return async (ctx, next) => {
    const start = performance.now();
    await next();
    const diff = performance.now() - start;

    console.info(
      `${statusCode(ctx)} ${duration(diff)} - ${request(ctx)}`,
    );
  };
}

function request(ctx: Context) {
  const requestBody = ctx.request.hasBody
    ? `${JSON.stringify(ctx.request.body).slice(0, 100)}...`
    : "";
  const responseBody = ctx.response.body
    ? JSON.stringify(ctx.response.body).slice(0, 100)
    : "";

  return `${
    colors.cyan(
      `${ctx.request.url} ${requestBody} ${responseBody}`
        .trim(),
    )
  }`;
}

function duration(diff: number) {
  return `${diff.toFixed(2)}ms`;
}

function statusCode(ctx: Context) {
  const statusCodeColor = getStatusCodeColor(ctx);
  return `${statusCodeColor(ctx.request.method)} ${
    statusCodeColor(`(${ctx.response.status})`)
  }`;
}

function getStatusCodeColor(ctx: Context) {
  return ctx.response.status >= 500
    ? colors.red
    : ctx.response.status >= 400
    ? colors.yellow
    : colors.green;
}
