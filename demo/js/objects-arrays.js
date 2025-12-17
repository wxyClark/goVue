// 加载公共头部和页脚
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('afterbegin', data);
        // 设置当前页面为活动状态
        document.querySelector('nav a[href="objects-arrays.html"]').classList.add('active');
    });

fetch('footer.html')
    .then(response => response.text())
    .then(data => document.body.insertAdjacentHTML('beforeend', data));
