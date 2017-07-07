////////////////////////////////
/// 资源加载错误后，开始循环检测2次
/// 分别是6秒 - 12秒的时间
///////////////////////////////
import { $warn } from '../util/index'

/**
 * 循环的列表对象
 * @type {Array}
 */
let loopQueue = {}


/**
 * 增加循环列表
 * @param {[type]} argument [description]
 */
export function addLoop(filePath, detect) {
  if (loopQueue[filePath]) {
    // $warn(`错误循环的文件已经存在检测列表 ${filePath}`)
  } else {
    /**
     * 重设循环检测
     * 不重新创建新的对象
     * 通过实例重设检测
     * 1 减少http检测
     * 2 不重复创建对象
     */
    loopQueue[filePath] = detect
    detect.reset({
      checkTime: 12000,
      callback: function () {
        loopQueue[filePath].destory()
        delete loopQueue[filePath]
      }
    })
  }
}

/**
 * 清理循环检测
 * @return {[type]} [description]
 */
export function clearLoop() {
  if (loopQueue) {
    for (let key in loopQueue) {
      loopQueue[key].destory()
      loopQueue[key] = null
    }
  }
  loopQueue = {}
}
