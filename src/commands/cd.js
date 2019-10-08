const Path = require("path").posix;
const debug = require("debug")("ipld-explorer-cli:commands:cd");

async function cd({ wd, spinner }, path) {
  path = path || "~/";

  if (path[0] !== "/" && path[0] !== "~") {
    path = Path.join(wd, path);
  }
  if (path !== "~/") {
    path = Path.resolve(path);
  }

  debug(path);

  if (spinner) {
    spinner.text = `Resolving ${path}`
  }

  return { out: path, ctx: { wd: path } };
}

module.exports = cd;
