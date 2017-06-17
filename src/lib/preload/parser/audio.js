/**
 * 音频文件解析
 * @param  {[type]}   filePath [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 *
 * */

let index = 0
let cacheAudio = []

function getAudio() {
  var audio = cacheAudio[index++]
  if (!audio) {
    index = 0
    return getAudio()
  }
  return audio
}


/**
 * 设置audio个数
 * 1 根据preload
 * 2 如果是重复加载，判断缓存已创建的
 */
export function setAudio(total) {
  let audio, i

  /*如果缓存中已经存在*/
  if (cacheAudio.length) {
    if (total >= cacheAudio.length) {
      total = total - cacheAudio.length
    }
  }

  for (i = 0; i < total; i++) {
    audio = new Audio()
    audio.play()
    cacheAudio.push(audio)
  }
}


/**
 * 音频文件解析
 * @param  {[type]}   filePath [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export function audioParse(filePath, callback) {

  let audio = new Audio();

  audio.src = filePath;
  audio.muted = "muted";
  audio.preload = "auto";
  audio.autobuffer = true

  function success() {
    callback()
    clear()
  }

  function error() {
    callback()
    clear()
  }

  function clear() {
    audio.removeEventListener("canplaythrough", success, false)
    audio.removeEventListener("error", error, false)
    audio = null
  }

  audio.addEventListener("canplaythrough", success, false)
  audio.addEventListener("error", error, false)
}
