// 确保DOM加载完成后再执行代码
document.addEventListener('DOMContentLoaded', function() {
    // 加载公共头部和页脚
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            // 设置当前页面为活动状态
            document.querySelector('nav a[href="event-handling.html"]').classList.add('active');
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => document.body.insertAdjacentHTML('beforeend', data));

    // 为inline-button添加事件监听器
    const inlineButton = document.getElementById('inline-button');
    if (inlineButton) {
        inlineButton.addEventListener('click', function() {
            alert('按钮被点击了!');
        });
    }

    // 为remove-handler-button添加事件监听器
    const removeHandlerButton = document.getElementById('remove-handler-button');
    if (removeHandlerButton) {
        removeHandlerButton.addEventListener('click', removeHandler);
    }

    // 为add-list-item-button添加事件监听器
    const addListItemButton = document.getElementById('add-list-item-button');
    if (addListItemButton) {
        addListItemButton.addEventListener('click', addListItem);
    }

    // DOM属性方式事件绑定
    const domAttributeButton = document.getElementById('dom-attribute-button');
    domAttributeButton.onclick = function() {
        alert('DOM属性方式绑定的事件');
    };
    
    // addEventListener方式事件绑定
    const addEventListenerButton = document.getElementById('add-event-listener-button');
    addEventListenerButton.addEventListener('click', function() {
        alert('addEventListener方式绑定的事件');
    });
    addEventListenerButton.addEventListener('click', function() {
        console.log('第二个点击事件处理函数');
    });
    
    // 事件对象演示
    const eventObjectButton = document.getElementById('event-object-button');
    const eventInfo = document.getElementById('event-info');
    eventObjectButton.addEventListener('click', function(event) {
        let info = '';
        info += '事件类型: ' + event.type + '<br>';
        info += '目标元素: ' + event.target.tagName + '<br>';
        info += '鼠标X坐标: ' + event.clientX + '<br>';
        info += '鼠标Y坐标: ' + event.clientY + '<br>';
        eventInfo.innerHTML = info;
    });
    
    // 事件冒泡演示
    const parentBox = document.getElementById('parent-box');
    const childBox = document.getElementById('child-box');
    
    parentBox.addEventListener('click', function() {
        eventInfo.innerHTML += '<br>父元素被点击';
    });
    
    childBox.addEventListener('click', function() {
        eventInfo.innerHTML += '<br>子元素被点击';
    });
    
    // 事件捕获演示
    const parentBox2 = document.getElementById('parent-box-2');
    const childBox2 = document.getElementById('child-box-2');
    
    parentBox2.addEventListener('click', function() {
        eventInfo.innerHTML += '<br>父元素捕获阶段';
    }, true);
    
    childBox2.addEventListener('click', function() {
        eventInfo.innerHTML += '<br>子元素冒泡阶段';
    });
    
    // 表单输入事件
    const emailInput = document.getElementById('email-input');
    const emailOutput = document.getElementById('email-output');
    
    emailInput.addEventListener('input', function(event) {
        const email = event.target.value;
        if (email.includes('@')) {
            emailOutput.textContent = '邮箱格式看起来有效';
            emailOutput.style.backgroundColor = '#2ecc71';
        } else {
            emailOutput.textContent = '请输入有效的邮箱地址';
            emailOutput.style.backgroundColor = '#e74c3c';
        }
    });
    
    // 添加列表项
    function addListItem() {
        const list = document.getElementById('item-list');
        const newItem = document.createElement('li');
        newItem.style.cssText = 'padding: 10px; border: 1px solid #ddd; margin: 5px 0; cursor: pointer;';
        newItem.textContent = '新列表项 ' + (list.children.length + 1);
        list.appendChild(newItem);
    }
    
    // 事件委托
    const itemList = document.getElementById('item-list');
    itemList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            alert('列表项被点击: ' + event.target.textContent);
        }
    });

    // removeEventListener示例
    function handleClick() {
        alert('点击事件');
    }

    const removeEventButton = document.getElementById('remove-event-button');
    removeEventButton.addEventListener('click', handleClick);

    function removeHandler() {
        removeEventButton.removeEventListener('click', handleClick);
        alert('事件处理函数已移除');
    }

    // 阻止默认行为
    const preventLink = document.getElementById('prevent-link');
    preventLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('链接跳转被阻止');
    });

    const preventForm = document.getElementById('prevent-form');
    preventForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('表单提交被阻止');
    });

    // 阻止事件冒泡
    const parentStop = document.getElementById('parent-stop');
    const childStop = document.getElementById('child-stop');

    parentStop.addEventListener('click', function() {
        alert('父元素事件触发');
    });

    childStop.addEventListener('click', function(event) {
        event.stopPropagation();
        alert('子元素事件触发，冒泡已阻止');
    });
});