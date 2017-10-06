/**
 * Created by Administrator on 2017/10/5 0005.
 */
import velocity from 'velocity-animate'
import { domAnimate } from './animate'

function $ (el) {
  return document.querySelector(el)
}
const root = $('#root')
velocity(root, {
  width: 1000
}, {
  duration: 2000,
  delay: 1000,
  loop: 3
})

/*
setTimeout(() => {
  velocity(root, {
    height: 500
  }, {
    queue: false
  })
}, 1300)
*/

domAnimate($('#root2'), {
  opacity: 0.5,
  width: 1000
}, {
  duration: 1000,
  loop: 3,
  delay: 1000,
  begin() {
    console.log('begin')
  },
  complete() {
    console.log('complete')
  },
  display: 'none'
})

setTimeout(() => {
  domAnimate($('#root2'), {
    height: 500
  }, {
    duration: 3000,
    queue: false
  })
}, 1300)
