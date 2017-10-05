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
  delay: false,
  mobileHA: true
}

export function domAnimate (el, styles, options, lazy) {
  let _resolve
  const emptyPromise = new Promise(resolve => (_resolve = resolve))
  function run () {
    const option = Object.assign({}, BASE_OPTION, options)
    const {duration, delay} = option
    const handleStyle = setDistance(getInitialState(el, styles), styles)
    const animationTimer = new AnimationTimer(duration)

    setTimeout(animateStart.bind(this, el, options, styles, handleStyle, animationTimer, _resolve), delay || 0)
  }

  !lazy && run()

  return {
    domAnimate() {
      const ret = domAnimate(...arguments, true)
      const {run} = ret
      emptyPromise.then(() => run())
      return ret
    },
    run
  }
}

/*
 *   动画开始
 * */
function animateStart (el, options, styles, handleStyle, animationTimer, resolve) {
  const {duration} = animationTimer

  function animate () {
    callhook('progress')
    const elapsedTime = animationTimer.getElapsedTime()
    let percentage = elapsedTime / duration
    if (percentage >= 1) percentage = 1

    for (let prop in handleStyle) {
      const value = handleStyle[prop].distance * percentage + handleStyle[prop].value

      setStyle(el, prop, value)
    }

    if (animationTimer.isOver()) {
      callhook('complate')
      resolve()
    } else {
      requestNextAnimationFrame(animate)
    }
  }

  callhook('begin')
  requestNextAnimationFrame(animate)
  animationTimer.start()
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
* */
function setStyle (el, css, value) {
  switch (css) {
    case 'opacity':
      break
    default:
      value += 'px'
  }
  el.style[css] = value
}
