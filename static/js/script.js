// $("#slider").on("input change", (e)=>{
//   const sliderPos = e.target.value;
//   // Update the width of the foreground image
//   // $('.foreground-img').css('width', `${sliderPos}%`)
//   $('.foreground-img').css('clip-path', `inset(0 ${sliderPos}% 0 0)`)
//   // Update the position of the slider button
//   $('.slider-button').css('left', `calc(${sliderPos}% - 18px)`)
// });
// const slider = document.getElementById("slider");
// let sliderPos;
// slider.addEventListener("input", function(e) {
//   sliderPos = e.target.value;
//   document.querySelector(
//     ".foreground-img"
//   ).style.width = `${sliderPos}%`;
//   document.querySelector(
//     ".slider-button"
//   ).style.left = `calc(${sliderPos}% - 18px)`;
// });
document.addEventListener("DOMContentLoaded", function() {
    const imagePairs = [
        { before: "gaussian_compare_image/gs/00000.png", after: "gaussian_compare_image/hgs/00000.png" },
        { before: "gaussian_compare_image/gs/00002.png", after: "gaussian_compare_image/hgs/00002.png" },
        { before: "gaussian_compare_image/gs/00010.png", after: "gaussian_compare_image/hgs/00010.png" },
        { before: "gaussian_compare_image/gs/00004.png", after: "gaussian_compare_image/hgs/00004.png" },
        { before: "gaussian_compare_image/gs/00011.png", after: "gaussian_compare_image/hgs/00011.png" },
        { before: "gaussian_compare_image/gs/00029.png", after: "gaussian_compare_image/hgs/00029.png" },
        { before: "gaussian_compare_image/gs/00018.png", after: "gaussian_compare_image/hgs/00018.png" }
    ];

    const beforeImg = document.getElementById("before-img");
    const afterImg = document.getElementById("after-img");
    const beforeContainer = document.querySelector(".before-img");
    const handler = document.querySelector(".handler");

    if (!beforeImg || !afterImg || !beforeContainer || !handler) {
        console.error("❌ 重要的 DOM 元素未找到！");
        return;
    }

    // ✅ 按钮点击切换图片
    document.querySelectorAll(".switch-btn").forEach(button => {
        button.addEventListener("click", function() {
            let index = parseInt(this.dataset.img);
            beforeImg.src = imagePairs[index].before;
            afterImg.src = imagePairs[index].after;

            // ✅ 重置滑块到中间
            beforeContainer.style.width = "50%";
            handler.style.left = "50%";
        });
    });

    // ✅ 滑块拖动逻辑
    handler.addEventListener("mousedown", function (e) {
        e.preventDefault();  // 防止默认拖动行为
        e.stopPropagation(); // 阻止事件冒泡

        let sliderWrap = document.querySelector(".slider-wrap-custom");
        let sliderRect = sliderWrap.getBoundingClientRect();
        let offsetX = e.clientX - handler.getBoundingClientRect().left;

        function moveHandler(e) {
            let newX = e.clientX - sliderRect.left - offsetX;
            let maxX = sliderRect.width;

            if (newX >= 0 && newX <= maxX) {
                handler.style.left = newX + 'px';
                beforeContainer.style.width = newX + 'px';
            }
        }

        function stopHandler() {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', stopHandler);
        }

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', stopHandler);
    });
});
