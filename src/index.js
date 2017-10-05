/**
 * Created by Administrator on 2017/10/5 0005.
 */
import velocity from 'velocity-animate'
import {domAnimate} from './animate'

function $ (el) {
  return document.querySelector(el)
}

velocity($('#root'), {
  opacity: 0.5
}, {
  duration: 1000
})

domAnimate($('#root2'), {
  opacity: 0.5,
  width: 1000
}, {
  duration: 1000
}).domAnimate($('#root2'), {
  width: 600
}, {
  duration: 2000
})
