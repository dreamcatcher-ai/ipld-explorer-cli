const Path = require('path')
const debug = require('debug')('ipld-explorer-cli:commands:resolve')
const isIpfs = require('is-ipfs')
const format = require('../format-dag')

module.exports = async function resolve ({ ipfs, wd }, path) {
  path = path || wd

  if (isIpfs.cid(path)) {
    path = `/ipfs/${path}`
  } else {
    if (path[0] !== '/') {
      path = Path.join(wd, path)
    }

    path = Path.resolve(path)
  }

  const obj = await ipfs.dag.get(path)

  debug(obj)
  return { out: format(obj.value) }
}
