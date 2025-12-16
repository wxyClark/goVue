// 公共HTML文件加载器
const Loader = {
  // 加载HTML片段到指定容器
  loadHTML: async function(url, container) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      container.innerHTML = html;
      this.setActiveNav();
    } catch (error) {
      console.error('加载HTML片段失败:', error);
    }
  },
  
  // 设置当前导航项为激活状态
  setActiveNav: function() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    
    // 移除所有导航项的active类
    const navItems = document.querySelectorAll('nav a');
    navItems.forEach(item => item.classList.remove('active'));
    
    // 为当前页面的导航项添加active类
    const currentNav = document.getElementById('nav-' + page.replace('.html', ''));
    if (currentNav) {
      currentNav.classList.add('active');
    }
  },
  
  // 初始化页面加载
  init: function() {
    // 加载头部
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      this.loadHTML('partials/header.html', headerContainer);
    }
    
    // 加载登录模块
    const loginContainer = document.getElementById('login-container');
    if (loginContainer) {
      this.loadHTML('partials/login.html', loginContainer);
    }
  }
};

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
  Loader.init();
});
