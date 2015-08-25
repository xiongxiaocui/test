$(document).ready(function () {
    $('body').jpreLoader({},showFirst);

});
function showFirst(){
    $('.page-list__li').eq(0).first().addClass('animate').siblings().removeClass('animate');
}
function screenUp() {
    pageNumber--;
    var translateString, transitionString;
    if (pageNumber < 0) {
        pageNumber = 0;
    }
    pageDistance = screenHeight * pageNumber;
    translateString = "translate3d(0, -" + pageDistance + "px, 0)";
    transitionString = "all 0.5s ease-in";

    verticalList.css({
        "-webkit-transform": translateString,
        "transform": translateString,
        "-webkit-transition": transitionString,
        "transition": transitionString
    });
    $('.page-list__li').eq(pageNumber).first().addClass('animate').siblings().removeClass('animate');
}

// 下一屏
function screenDown() {
    if(pageNumber==6){
        window.location.href=''
    }
    pageNumber++;
    var translateString, transitionString;
    if (pageNumber > (pageCount - 1)) {
        pageNumber = pageCount - 1;
    }
    pageDistance = screenHeight * pageNumber;
    translateString = "translate3d(0, -" + pageDistance + "px, 0)";
    transitionString = "all 0.5s ease-in";

    verticalList.css({
        "-webkit-transform": translateString,
        "transform": translateString,
        "-webkit-transition": transitionString,
        "transition": transitionString
    });
    $('.page-list__li').eq(pageNumber).first().addClass('animate').siblings().removeClass('animate');
}

// 定义变量
var screenHeight = document.documentElement.clientHeight,
    screenWidth = document.documentElement.clientWidth,
    verticalList = $(".page-list"),
    pageNumber = 0,
    pageDistance = 0;

verticalList.css({"height": screenHeight * pageCount + 10, "width": screenWidth});
$(".page-list__li").css({"height": screenHeight, "width": screenWidth});

$(".container").on("touchmove", function (e) {
    e.preventDefault();
});

// 绑定事件
verticalList.on("swipeUp", screenDown);
verticalList.on("swipeDown", screenUp);

//定义旋转事件
//requestAnimationFrame做兼容
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = window.innerWidth,
    height = 400;


var y = [],
    colWidth = 2,
    maxDev = 50, // max height of a column
    colDist = 8, // maximum difference in distance a point can be from its neighbor
    horDist = 8, // max range between the next set of points...
    cycle = 0,
    colors = {
        r: 0,
        g: 170,
        b: 0
    };

function initCols() {
    for (var i = 0; i < width / colWidth; i++) {
        if (i === 0) {
            y[i] = Math.floor((Math.random() * maxDev) - maxDev/2);
        } else {
            y[i] = y[i - 1] + Math.floor((Math.random() * colDist) - colDist / 2);
            if (y[i] > maxDev) {
                y[i] = maxDev;
            } else if (y[i] < 0) {
                y[i] = 0;
            }
        }
    }
    render();
}

function genCols() {
    for (var i = 1; i < width / colWidth; i++) {
        var prevCol = y[y.length];
        if (i > 0) {
            prevCol = y[i - 1];
        }
        var rowOffset = y[i] + ((Math.random() * horDist) - horDist / 2),
            colOffset = prevCol + ((Math.random() * colDist) - colDist / 2),
            offset = (rowOffset + colOffset) / 2;

        if (offset > maxDev) {
            offset = maxDev;
        } else if (y[i] < 0) {
            offset = 0;
        }

        y[i] = offset;

    }
}

function render() {
    ctx.drawImage(canvas, 0, 0, width, height, 0, -1, width, height);

    //ctx.fillStyle = "rgb(" + colors.r + "," + colors.g + "," + colors.b + ")";
    for (var i = 0; i < y.length; i++) {
        var color = ~~(y[i]*4);
        ctx.fillStyle = "rgb(" + color + "," + color + "," + color + ")";
        ctx.fillRect(i*colWidth, height,colWidth, -y[i]);
    }
    colorCycle();
    genCols();

    requestAnimationFrame(render);
}

function colorCycle() {
    cycle += 0.08;
    if (cycle > 100) {
        cycle = 0;
    }
    colors.r = ~~ (Math.sin(.3 * cycle + 0) * 127 + 128);
    colors.g = ~~ (Math.sin(.3 * cycle + 2) * 127 + 128);
    colors.b = ~~ (Math.sin(.3 * cycle + 4) * 127 + 128);
}



setTimeout(function () {
    width = canvas.width = document.body.offsetWidth;
    height = canvas.height = document.body.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    initCols();
}, 50);