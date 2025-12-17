// 加载公共头部和页脚
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        // 设置当前页面为活动状态
        document.querySelector('a[href="error-handling.html"]').classList.add('active');
    });

fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    });

// 添加事件监听器
document.addEventListener('DOMContentLoaded', function() {
    // 绑定try...catch演示按钮
    const tryCatchBtn = document.getElementById('try-catch-btn');
    if (tryCatchBtn) {
        tryCatchBtn.addEventListener('click', demoTryCatch);
    }
    
    // 绑定自定义错误演示按钮
    const customErrorBtn = document.getElementById('custom-error-btn');
    if (customErrorBtn) {
        customErrorBtn.addEventListener('click', demoCustomError);
    }
    
    // 绑定异步错误处理演示按钮
    const asyncErrorBtn = document.getElementById('async-error-btn');
    if (asyncErrorBtn) {
        asyncErrorBtn.addEventListener('click', demoAsyncError);
    }
});

// 演示函数
function log(message) {
    const logElement = document.getElementById('log');
    logElement.innerHTML += new Date().toLocaleTimeString() + ' - ' + message + '<br>';
    logElement.scrollTop = logElement.scrollHeight;
}

function demoTryCatch() {
    log('=== 测试try...catch...finally ===');
    try {
        log('开始执行try块');
        // 模拟一个错误
        const result = 10 / 0;
        log('计算结果:', result);
    } catch (error) {
        log('捕获到错误:');
        log('错误名称:', error.name);
        log('错误信息:', error.message);
    } finally {
        log('执行finally块');
    }
    log('=== 测试结束 ===');
}

function demoCustomError() {
    // 创建自定义错误类
    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = 'ValidationError';
        }
    }

    try {
        const userAge = -10;
        if (userAge < 0) {
            throw new ValidationError('年龄不能为负数');
        }
        alert('年龄有效');
    } catch (error) {
        if (error instanceof ValidationError) {
            alert('验证错误: ' + error.message);
        } else {
            alert('其他错误: ' + error.message);
        }
    }
}

async function demoAsyncError() {
    log('=== 测试异步错误处理 ===');
    try {
        log('开始异步请求');
        // 模拟一个失败的异步请求
        await new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error('请求超时')), 1000);
        });
        log('请求成功');
    } catch (error) {
        log('捕获到异步错误:');
        log('错误名称:', error.name);
        log('错误信息:', error.message);
    }
    log('=== 测试结束 ===');
}