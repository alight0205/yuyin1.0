let pic = document.getElementsByClassName("pic")[0];
let picUl = pic.getElementsByClassName('pic__inner')[0];
let picLi = picUl.children;
let picDotsWrap = pic.getElementsByClassName("pic__dots")[0];
let picDots = picDotsWrap.querySelectorAll("span");
let index = 0;
let Key = true;

let headLi = picUl.firstElementChild.cloneNode(true);
picUl.appendChild(headLi);

picUl.style.width = picLi.length * 100 + 'vw';

function move() {
    Key = false;
    setDot();
    picUl.style.transition = 'left .5s';
    picUl.style.left = -index * 80 + 'vw';

}

function setDot() {
    let dot = picDotsWrap.querySelector("span.active");
    if (dot) {
        dot.className = '';
    }
    picDots[index % (picLi.length - 1)].className = 'active';

}

// 运动结束时触发，页面失去焦点时不会触发这个事件
picUl.addEventListener("transitionend", function() {
    if (index == picLi.length - 1) {
        picUl.style.transition = ''
        picUl.style.left = 0;
        index = 0;
    } else if (index == 0) {
        picUl.style.transition = '';
        picUl.style.left = -(picLi.length - 1) * 80 + 'vw';

    }
    Key = true;
})

function autoPlay() {
    index++;
    //这个条件是为了防止页面失去焦点的时候定时还在走，cn也在加，那就会超出范围
    if (index > picLi.length - 1) {
        index = 0;
    }
    move()
}

let timer = setInterval(autoPlay, 3000);
// 悬停效果
pic.parentElement.onmouseenter = function() {
    clearInterval(timer)
}
pic.parentElement.onmouseleave = function() {
    timer = setInterval(autoPlay, 3000);
};

/**
 * 按钮点击事件
 */
let btnPrev = document.getElementsByClassName('pic__prev')[0];
let btnNext = document.getElementsByClassName('pic__next')[0];

btnNext.onclick = function() {
    if (Key) {
        autoPlay()
    }
}
btnPrev.onclick = function() {
    console.log(index)
    if (Key) {
        index--;
        if (index < 0) {
            picUl.style.transition = '';
            picUl.style.left = -(picLi.length - 1) * 80 + 'vw';
            index = picLi.length - 1;
            setTimeout(() => {
                btnPrev.click();
            }, 100);
        } else {
            move()
        }
    }
};
/**
 * 小圆点事件
 */
picDotsWrap.addEventListener("mouseenter", function(e) {
    if (e.target.tagName == 'SPAN') {
        index = Array.from(picDots).indexOf(e.target);
        console.log(index);
        move();
    }
}, true)