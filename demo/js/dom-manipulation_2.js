// 加载公共头部和页脚
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('afterbegin', data);
        // 设置当前页面为活动状态
        document.querySelector('nav a[href="dom-manipulation.html"]').classList.add('active');
    });

fetch('footer.html')
    .then(response => response.text())
    .then(data => document.body.insertAdjacentHTML('beforeend', data));

// DOM获取演示
function getElementByIdDemo() {
    const element = document.getElementById('target-element');
    alert('获取的元素: ' + element.textContent);
}

function getElementsByClassNameDemo() {
    const elements = document.getElementsByClassName('demo-box');
    alert('找到 ' + elements.length + ' 个 demo-box 元素');
}

function getElementsByTagNameDemo() {
    const paragraphs = document.getElementsByTagName('p');
    alert('文档中有 ' + paragraphs.length + ' 个段落元素');
}

function querySelectorDemo() {
    const firstBox = document.querySelector('.demo-box');
    const allBoxes = document.querySelectorAll('.demo-box');
    alert('第一个box: ' + firstBox.textContent + '\n总共有 ' + allBoxes.length + ' 个box');
}

// 内容修改演示
function innerHTMLDemo() {
    const element = document.getElementById('content-demo');
    element.innerHTML = '<strong>新的</strong> HTML 内容';
}

function textContentDemo() {
    const element = document.getElementById('content-demo-2');
    element.textContent = '新的文本内容 <strong>不会被解析</strong>';
}

// 属性修改演示
function attributeDemo() {
    const link = document.getElementById('demo-link');
    if (link.getAttribute('href') === '#') {
        link.setAttribute('href', 'https://www.example.com');
        link.setAttribute('target', '_blank');
        link.textContent = '外部链接';
    } else {
        link.setAttribute('href', '#');
        link.removeAttribute('target');
        link.textContent = '示例链接';
    }
}

// 样式修改演示
function styleDemo() {
    const element = document.getElementById('style-demo');
    element.style.color = element.style.color === 'red' ? 'black' : 'red';
    element.style.fontSize = element.style.fontSize === '20px' ? '16px' : '20px';
    element.style.backgroundColor = element.style.backgroundColor === 'yellow' ? 'transparent' : 'yellow';
}

function classListDemo() {
    const element = document.getElementById('class-demo');
    element.classList.toggle('active');
}

// 创建和删除元素演示
function createElementDemo() {
    const newDiv = document.createElement('div');
    newDiv.textContent = '这是新创建的元素';
    newDiv.className = 'demo-box';
    newDiv.style.backgroundColor = '#e74c3c';
    
    const container = document.getElementById('create-container');
    container.appendChild(newDiv);
}

function removeElementDemo() {
    const element = document.getElementById('element-to-remove');
    if (element) {
        element.remove();
        alert('元素已删除');
    } else {
        alert('元素不存在');
    }
}

// 添加事件监听器
document.addEventListener('DOMContentLoaded', function() {
    // DOM获取演示按钮
    document.getElementById('get-element-by-id-btn').addEventListener('click', getElementByIdDemo);
    document.getElementById('get-elements-by-class-name-btn').addEventListener('click', getElementsByClassNameDemo);
    document.getElementById('get-elements-by-tag-name-btn').addEventListener('click', getElementsByTagNameDemo);
    document.getElementById('query-selector-btn').addEventListener('click', querySelectorDemo);
    
    // 内容修改演示按钮
    document.getElementById('inner-html-demo-btn').addEventListener('click', innerHTMLDemo);
    document.getElementById('text-content-demo-btn').addEventListener('click', textContentDemo);
    
    // 属性修改演示按钮
    document.getElementById('attribute-demo-btn').addEventListener('click', attributeDemo);
    
    // 样式修改演示按钮
    document.getElementById('style-demo-btn').addEventListener('click', styleDemo);
    document.getElementById('class-list-demo-btn').addEventListener('click', classListDemo);
    
    // 创建和删除元素演示按钮
    document.getElementById('create-element-demo-btn').addEventListener('click', createElementDemo);
    document.getElementById('remove-element-demo-btn').addEventListener('click', removeElementDemo);
});