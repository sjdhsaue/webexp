window.addEventListener('load', function () {
    let focus = document.querySelector('.focus');
    let ul = focus.children[0];
    // 获得focus的宽度
    let w = focus.offsetWidth;
    let ol = focus.children[1];
    // 利用定时器自动轮播图片
    let index = 0;
    let timer = setInterval(function() {
        index++;
        let translatex = -index * w ;
        ul.style.transition = 'all .2s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    },2000)
    // 等过渡完成后，再去判断 监听过渡完成的时间 transitionend
    ul.addEventListener('transitionend', function () {
    //    无缝滚动
        if (index >= 3) {
            index = 0;
            // 去掉过渡效果，让ul快速跳到目标位置
            ul.style.transition = 'none';
            let translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if(index < 0) {
            // 倒着拖动效果
            index = 2;
            // 去掉过渡效果，让ul快速跳到目标位置
            ul.style.transition = 'none';
            let translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
    //    小圆点跟随变化
    //    把ol里面li带有current类名的选出来去掉类名 classList.remove
        ol.querySelector('.current').classList.remove('current');
    //    让当前索引号的 li 加上类名current classList.add
        ol.children[index].classList.add('current');
    });

    // 手指滑动轮播图
    // 触摸元素 touchstart 获得手指初始坐标
    let startx = 0;
    let moveX = 0;
    let flag = false;
    ul.addEventListener('touchstart', function (e) {
        let startX = e.targetTouches[0].pageX;
        // 手指触摸的时候停止定时器
        clearInterval(timer);
    });
    // 移动手指 touchmove 计算手指的滑动距离，并且移动盒子
    ul.addEventListener('touchmove', function (e) {
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startx;
        // 移动盒子
        let translatex = -index * w +moveX;
        // 手指拖动的时候，不需要动画效果，所以要取消过渡
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
        // 阻止默认滚动屏幕的行为
        e.preventDefault();
    })

    //   手指离开,根据移动距离判断是 播放上一张还是下一张
    ul.addEventListener('touchend', function (e) {
        if (flag) {
            if (Math.abs(moveX) > 100) {
                if (moveX > 0) {
                    // 手指右滑 播放上一张
                    index--;
                } else {
                    // 手指左滑 播放下一张
                    index++;
                }
                let translatex = -index * w;
                ul.style.transition = 'all .2s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                let translatex = -index * w;
                ul.style.transition = 'all .2s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
            flag = false;
        }
        //  手指离开时重新开启定时器
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            let translatex = -index * w ;
            ul.style.transition = 'all .2s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        },2000)
    })
})