# 封装一个动画类库

domAnimate(el, styles, option);

    option =  {
                 duration: 400,         // 动画执行时间
                 easing: "swing",       // 缓动效果
                 queue: "",             // 队列
                 begin: undefined,      // 动画开始时的回调函数
                 progress: undefined,   // 动画执行中的回调函数（该函数会随着动画执行被不断触发）
                 complete: undefined,   // 动画结束时的回调函数
                 display: undefined,    // 动画结束时设置元素的 css display 属性
                 visibility: undefined, // 动画结束时设置元素的 css visibility 属性
                 loop: false,           // 循环
                 delay: false           // 延迟
             }


* [x] 使用 cancelRequestAnimationFrame
* [x] 三个钩子函数 begin/complete/progress
* [x] 链式调用
* [x] queue: false, 强行同步执行动画
* [x] loop: 3 -> 往返3次
* [x] display visibility

todo:

* [ ] 合并强制执行动画的option 减少开启的定时器
* [ ] 钩子函数的参数
* [ ] 兼容css3
* [ ] 兼容各种浏览器的css头
* [ ] easing 运动曲线
