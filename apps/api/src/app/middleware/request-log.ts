import chalk from "chalk";

export function requestLogMiddleware(req: Request, response: Response, duration: number) {
  const url = new URL(req.url);
  const status = response.status;
  const statusColor = status >= 400 ? chalk.red : status >= 300 ? chalk.yellow : chalk.green;

  console.info(
    `${statusColor(status)} ${chalk.gray(`${duration.toFixed(2)}ms`)} - ${chalk.cyan(req.method)} ${chalk.cyan(url.pathname)}`,
  );
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
    ? chalk.red
    : ctx.response.status >= 400
    ? chalk.yellow
    : chalk.green;
}
