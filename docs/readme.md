# 封装一个动画类库

Animate(el, styles, option);

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
                 delay: false,          // 延迟
                 mobileHA: true         // 移动端硬件加速（默认开启）
             }


* [x] 动画使用浏览器的 cancelRequestAnimationFrame api
* [x] 链式调用
* [ ] 兼容css3
* [ ] 兼容各种浏览器的头css
