const os = require(`os`)
const dataDir = `${os.homedir}/.getcdn`.replace(/[\\/]/g, `/`)

/**
 * 解析命令行参数
 * @param {*} arr 
 * @returns 
 */
function parseArgv(arr) {
  return (arr || process.argv.slice(2)).reduce((acc, arg) => {
    let [k, ...v] = arg.split(`=`)
    v = v.join(`=`) // 把带有 = 的值合并为字符串
    acc[k] = v === `` // 没有值时, 则表示为 true
      ? true
      : (
        /^(true|false)$/.test(v) // 转换指明的 true/false
        ? v === `true`
        : (
          /[\d|.]+/.test(v)
          ? (isNaN(Number(v)) ? v : Number(v)) // 如果转换为数字失败, 则使用原始字符
          : v
        )
      )
    return acc
  }, {})
}


/**
 * 下载 cdn
 * 包名规范 https://github.com/npm/validate-npm-package-name
 * @param {*} param0 
 * @returns 
 */
async function getCdn({
  isForce = false,
  list = [],
  dirSave = `./cdn`,
  tgzDir = `${dataDir}/tgz`,
} = {}) {
  const cp = require(`child_process`)
  const fs = require(`fs`)
  const shelljs = require(`shelljs`)
  const download = require(`download`)
  const path = require(`path`)
  shelljs.mkdir(`-p`, [dirSave, tgzDir])

  const pList = list.map((item, index) => {
    return new Promise(() => {
      const cdnPath = `${dirSave}/${item}`
      if(fs.existsSync(cdnPath) && isForce === false) {
        console.log(`${item} existed`)
        return undefined
      }
      cp.exec(`npm view ${item} dist.tarball`, async (err, stdout) => {
        const tarbal = stdout.toString().trim()
        const tgzDirItem = `${tgzDir}/${item}`
        const nameFile = `${tgzDirItem}/${path.parse(tarbal).name}.tgz`
        const unZipDir = nameFile.replace(/.tgz$/, ``)
        if(fs.existsSync(nameFile) && isForce === false) {
          console.log(`${item} download skipped`)
        } else {
          await download(tarbal, `${tgzDirItem}`)
        }
        const compressing = require(`compressing`)
        if(fs.existsSync(`${unZipDir}` && isForce === false)) {
          console.log(`${item} decompression is skipped`)
        } else {
          await compressing.tgz.uncompress(nameFile, unZipDir).catch(console.log)
        }
        shelljs.mkdir(`-p`, path.parse(cdnPath).dir)
        shelljs.cp(`-r`, `${unZipDir}/package`, cdnPath)
        console.log(`${item} ok`)
      })
    })
  })
  return Promise.all(pList)
}



module.exports = {
  getCdn,
  parseArgv,
}