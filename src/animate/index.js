/**
 * Created by Administrator on 2017/10/5 0005.
 */
import { requestNextAnimationFrame } from './requestNextAnimationFrame'
import { AnimationTimer } from './animationTimer'

const BASE_OPTION = {
  duration: 400,
  easing: 'swing',
  queue: '',
  begin: undefined,
  progress: undefined,
  complete: undefined,
  display: undefined,
  visibility: undefined,
  loop: false,
  delay: false
}

export function domAnimate (el, styles, option) {
  return _domAnimate(false, ...arguments)
}

function _domAnimate (lazy, el, styles, option) {
  let _resolve
  let emptyPromise = new Promise(resolve => (_resolve = resolve))
  option = mergeOption(option)
  const {duration, delay, queue, loop} = option
  if (queue === false || !lazy) run()
  const animationTimer = new AnimationTimer(duration)

  return {
    domAnimate() {
      const ret = _domAnimate(true, ...arguments)
      const {run, option} = ret
      const {queue} = option
      if (queue !== false) emptyPromise.then(() => run())
      return ret
    },
    run,
    option
  }

  function run () {
    const handleStyle = setDistance(getInitialState(el, styles), styles)
    if (typeof loop === 'number' && loop > 0) {
      delayExecution(handleStyle, _resolve, true)
      for (let i = 1; i < loop; i++) {
        emptyPromise = emptyPromise.then(() => new Promise(resolve => {
          delayExecution(reverseHandleStyle(styles, handleStyle), resolve)
        })).then(() => new Promise(resolve => {
          delayExecution(handleStyle, resolve)
        }))
      }
      emptyPromise = emptyPromise.then(() => new Promise(resolve => {
        delayExecution(reverseHandleStyle(styles, handleStyle), resolve)
      }))
    } else {
      delayExecution(handleStyle, _resolve, true)
    }
    emptyPromise = emptyPromise.then(() => {
      const {display, visibility, complete} = option
      callhook('complete', complete)
      setStyle(el, 'display', display)
      setStyle(el, 'visibility', visibility)
    })
  }

  function delayExecution (handleStyle, resolve, callBegin) {
    setTimeout(() => {
      callBegin && callhook('begin', option.begin)
      animateStart(el, option, handleStyle, animationTimer, resolve)
    }, delay || 0)
  }
}

/*
 *   返回回溯的css
 * */
function reverseHandleStyle (style, handleStyle) {
  return Object.keys(handleStyle).reduce((initial, css) => {
    initial[css] = {
      value: style[css],
      distance: -handleStyle[css].distance
    }
    return initial
  }, {})
}

/*
 *   合并选项
 * */
function mergeOption (option) {
  return Object.assign({}, BASE_OPTION, option)
}

/*
 *   动画开始
 * */
function animateStart (el, option, handleStyle, animationTimer, resolve) {
  const {duration} = animationTimer

  animationTimer.start()
  requestNextAnimationFrame(animate)

  function animate () {
    callhook('progress', option.progress)
    const elapsedTime = animationTimer.getElapsedTime()
    let percentage = elapsedTime / duration
    if (percentage >= 1) percentage = 1
    for (let prop in handleStyle) {
      const value = handleStyle[prop].distance * percentage + handleStyle[prop].value
      setStyle(el, prop, value)
    }

    if (animationTimer.isOver()) {
      animationTimer.stop()
      resolve()
    } else {
      requestNextAnimationFrame(animate)
    }
  }
}

/*
 *   生命周期钩子
 * */
function callhook (name, hookCallback) {
  // console.log(name)

  hookCallback && hookCallback()
}

/*
 *  获取初始 style 的数值
 * */
function getInitialState (el, styles) {
  const computedStyle = getComputedStyle(el)
  const initialState = {}
  for (let prop in styles) {
    if (computedStyle[prop] !== undefined) {
      initialState[prop] = parseFloat(computedStyle[prop])
    } else {
      console.error('[warn]: getInitialState')
    }
  }
  return initialState
}

/*
 *   设置css变化的幅度 -> 目标css值 - 初始css值
 * */
function setDistance (initial, target) {
  const ret = {}
  for (let prop in initial) {
    ret[prop] = {
      value: initial[prop],
      distance: target[prop] - initial[prop]
    }
  }
  return ret
}

/*
 *  针对各种属性设置css值
 *  尚需完善
 * */
function setStyle (el, css, value) {
  if (value === undefined) return
  switch (css) {
    case 'opacity':
      break
    case 'display':
      break
    case 'visibility':
      break
    default:
      value += 'px'
  }
  el.style[css] = value
}
