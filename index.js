#!/usr/bin/env node

const fs = require(`fs`)
const path = require(`path`)
const pkg = require(`./package.json`)
const {
  getCdn,
  parseArgv,
} = require(`./util.js`)

if (require.main === module) { // 通过 cli 使用
  const argObj = parseArgv()
  const [arg1, ...moreArg] = process.argv.slice(2)
  if([`.help`, `.h`, undefined].includes(arg1)) {
    console.info([
      `${pkg.name} v${pkg.version} ${pkg.homepage}`,
      ``,
      `usage:`,
      `  .dir    --[string ] cdn storage directory`,
      `  .force   --[boolean] Whether to ignore the cache`,
      ``,
      `eg:`,
      `  # download the latest version`,
      `  ${pkg.name} jsonkey`,
      ``,
      `  # Specify the storage directory`,
      `  ${pkg.name} .dir=mycdn jsonkey`,
      ``,
      `  # Download the specified version`,
      `  ${pkg.name} jsonkey@0.0.2`,
      ``,
      `  # Specify namespace and version`,
      `  ${pkg.name} @wll8/express-ws@1.0.3`,
      ``,
    ].join(`\n`))
    process.exit()
  }
  try {
    const list = [arg1, ...moreArg].filter(name => {
      return name && 
        name.match(/^[._]/) === null
    })
    const dirSave = argObj[`.dir`]
    const isForce = argObj[`.force`]
    const tgzDir = argObj[`.tgz`]
    getCdn({list, dirSave, tgzDir, isForce}).finally(() => {
      process.exit()
    })
  } catch (error) {
    console.info(error)
  }
} 

module.exports = getCdn
