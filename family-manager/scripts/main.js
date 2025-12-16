// 家庭管理系统 JavaScript 核心功能

// 数据存储对象
const FamilyManager = {
  // 用户数据
  users: [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
  ],
  
  // 当前登录用户
  currentUser: null,
  
  // 重要事件数据
  events: [
    { id: 1, name: '生日聚会', date: '2023-05-20', time: '18:00', description: '为妈妈庆祝生日', createdBy: 'admin' },
    { id: 2, name: '结婚纪念日', date: '2023-06-15', time: '19:00', description: '结婚5周年纪念日', createdBy: 'admin' },
    { id: 3, name: '孩子毕业典礼', date: '2023-07-01', time: '10:00', description: '孩子小学毕业典礼', createdBy: 'user' }
  ],
  
  // 物品管理数据
  items: [
    { id: 1, name: '笔记本电脑', owner: '张三', quantity: 1, location: '书房', createdBy: 'admin' },
    { id: 2, name: '智能手机', owner: '李四', quantity: 2, location: '卧室', createdBy: 'user' },
    { id: 3, name: '平板电脑', owner: '王五', quantity: 1, location: '客厅', createdBy: 'admin' }
  ],
  
  // 资金管理数据
  transactions: [
    { id: 1, date: '2023-05-01', type: 'income', amount: 8000, description: '工资', createdBy: 'admin' },
    { id: 2, date: '2023-05-02', type: 'expense', amount: 1000, description: '房租', createdBy: 'admin' },
    { id: 3, date: '2023-05-03', type: 'expense', amount: 500, description: ' groceries', createdBy: 'user' }
  ],
  
  // 朋友管理数据
  friends: [
    { id: 1, name: '张三', phone: '13800138000', email: 'zhangsan@example.com', relationship: '同事', createdBy: 'admin' },
    { id: 2, name: '李四', phone: '13900139000', email: 'lisi@example.com', relationship: '朋友', createdBy: 'user' },
    { id: 3, name: '王五', phone: '13700137000', email: 'wangwu@example.com', relationship: '家人', createdBy: 'admin' }
  ],
  
  // 提醒事项数据
  reminders: [
    { id: 1, time: '08:00', content: '上班', createdBy: 'admin' },
    { id: 2, time: '15:00', content: '开会', createdBy: 'user' },
    { id: 3, time: '19:00', content: '家庭聚餐', createdBy: 'admin' }
  ]
};

// 工具函数
const Utils = {
  // 生成唯一ID
  generateId: function() {
    return Date.now() + Math.floor(Math.random() * 1000);
  },
  
  // 格式化日期
  formatDate: function(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  
  // 计算资金统计
  calculateFinanceStats: function() {
    const income = FamilyManager.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = FamilyManager.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expense;
    
    return { income, expense, balance };
  },
  
  // 保存数据到本地存储
  saveData: function() {
    localStorage.setItem('familyManagerData', JSON.stringify(FamilyManager));
  },
  
  // 从本地存储加载数据
  loadData: function() {
    const data = localStorage.getItem('familyManagerData');
    if (data) {
      Object.assign(FamilyManager, JSON.parse(data));
    }
  }
};

// 页面交互功能
const App = {
  // 当前编辑的事件ID
  currentEditingEventId: null,
  
  // 初始化应用
  init: function() {
    // 加载本地存储数据
    Utils.loadData();
    
    // 绑定事件监听器
    this.bindEvents();
    
    // 初始化页面
    this.updatePage();
    
    // 更新资金统计
    this.updateFinanceStats();
    
    // 渲染事件列表
    this.renderEvents();
  },
  
  // 绑定事件监听器
  bindEvents: function() {
    // 登录表单提交
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', this.handleLogin.bind(this));
    }
    
    // 导航点击事件
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', this.handleNavClick.bind(this));
    });
    
    // 日历单元格点击事件
    const calendarCells = document.querySelectorAll('.calendar td');
    calendarCells.forEach(cell => {
      cell.addEventListener('click', this.handleCalendarClick.bind(this));
    });
    
    // 事件表单提交
    const eventForm = document.getElementById('event-form');
    if (eventForm) {
      eventForm.addEventListener('submit', this.handleEventSubmit.bind(this));
    }
    
    // 取消事件编辑
    const cancelEventBtn = document.getElementById('cancel-event-btn');
    if (cancelEventBtn) {
      cancelEventBtn.addEventListener('click', this.handleCancelEvent.bind(this));
    }
  },
  
  // 处理登录表单提交
  handleLogin: function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 查找用户
    const user = FamilyManager.users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // 登录成功
      FamilyManager.currentUser = user;
      alert('登录成功！欢迎 ' + username);
      
      // 更新页面显示
      this.updatePage();
      
      // 保存数据
      Utils.saveData();
    } else {
      // 登录失败
      alert('用户名或密码错误，请重试！');
    }
  },
  
  // 处理导航点击事件
  handleNavClick: function(event) {
    event.preventDefault();
    
    const targetId = event.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      // 滚动到目标区域
      targetSection.scrollIntoView({ behavior: 'smooth' });
      
      // 更新导航样式
      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
      });
      event.target.classList.add('active');
    }
  },
  
  // 处理日历单元格点击事件
  handleCalendarClick: function(event) {
    const date = event.target.textContent;
    if (date) {
      alert('您点击了日期：' + date);
    }
  },
  
  // 更新页面显示
  updatePage: function() {
    const loginSection = document.getElementById('login');
    const mainContent = document.querySelector('main');
    
    if (FamilyManager.currentUser) {
      // 用户已登录，隐藏登录区域，显示内容
      loginSection.style.display = 'none';
      mainContent.style.display = 'block';
      
      // 更新欢迎信息
      this.updateWelcomeMessage();
    } else {
      // 用户未登录，显示登录区域，隐藏内容
      loginSection.style.display = 'block';
      mainContent.style.display = 'none';
    }
  },
  
  // 更新欢迎信息
  updateWelcomeMessage: function() {
    const header = document.querySelector('header h1');
    if (header) {
      header.innerHTML = `我的家庭管理系统 - 欢迎 ${FamilyManager.currentUser.username}`;
    }
  },
  
  // 更新资金统计
  updateFinanceStats: function() {
    const stats = Utils.calculateFinanceStats();
    
    const incomeElement = document.querySelector('.income p');
    const expenseElement = document.querySelector('.expense p');
    const balanceElement = document.querySelector('.balance p');
    
    if (incomeElement) {
      incomeElement.textContent = `¥${stats.income.toFixed(2)}`;
    }
    
    if (expenseElement) {
      expenseElement.textContent = `¥${stats.expense.toFixed(2)}`;
    }
    
    if (balanceElement) {
      balanceElement.textContent = `¥${stats.balance.toFixed(2)}`;
    }
  },
  
  // 显示消息提示
  showMessage: function(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // 添加消息样式
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.padding = '15px 20px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.color = '#fff';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.style.zIndex = '1000';
    
    // 根据类型设置背景色
    switch(type) {
      case 'success':
        messageDiv.style.backgroundColor = '#2ecc71';
        break;
      case 'error':
        messageDiv.style.backgroundColor = '#e74c3c';
        break;
      case 'warning':
        messageDiv.style.backgroundColor = '#f39c12';
        break;
      default:
        messageDiv.style.backgroundColor = '#3498db';
    }
    
    // 添加到页面
    document.body.appendChild(messageDiv);
    
    // 3秒后移除消息
    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  },
  
  // 处理事件表单提交
  handleEventSubmit: function(event) {
    event.preventDefault();
    
    // 获取表单数据
    const name = document.getElementById('event-name').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const description = document.getElementById('event-description').value;
    
    if (this.currentEditingEventId) {
      // 编辑现有事件
      const eventIndex = FamilyManager.events.findIndex(e => e.id === this.currentEditingEventId);
      if (eventIndex !== -1) {
        FamilyManager.events[eventIndex] = {
          ...FamilyManager.events[eventIndex],
          name,
          date,
          time,
          description
        };
        
        this.showMessage('事件更新成功！', 'success');
        this.currentEditingEventId = null;
      }
    } else {
      // 添加新事件
      const newEvent = {
        id: Utils.generateId(),
        name,
        date,
        time,
        description,
        createdBy: FamilyManager.currentUser.username
      };
      
      FamilyManager.events.push(newEvent);
      this.showMessage('事件添加成功！', 'success');
    }
    
    // 保存数据
    Utils.saveData();
    
    // 重置表单
    this.resetEventForm();
    
    // 重新渲染事件列表
    this.renderEvents();
  },
  
  // 重置事件表单
  resetEventForm: function() {
    const eventForm = document.getElementById('event-form');
    const addEventBtn = document.getElementById('add-event-btn');
    const cancelEventBtn = document.getElementById('cancel-event-btn');
    
    if (eventForm) {
      eventForm.reset();
    }
    
    if (addEventBtn) {
      addEventBtn.textContent = '添加事件';
    }
    
    if (cancelEventBtn) {
      cancelEventBtn.style.display = 'none';
    }
    
    this.currentEditingEventId = null;
  },
  
  // 处理取消事件编辑
  handleCancelEvent: function() {
    this.resetEventForm();
  },
  
  // 渲染事件列表
  renderEvents: function() {
    const eventsTableBody = document.getElementById('events-table-body');
    if (!eventsTableBody) return;
    
    // 清空表格
    eventsTableBody.innerHTML = '';
    
    // 渲染事件行
    FamilyManager.events.forEach(event => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${event.name}</td>
        <td>${event.date}</td>
        <td>${event.time}</td>
        <td>${event.description || '-'}</td>
        <td>
          <button class="btn btn-edit" onclick="App.editEvent(${event.id})">编辑</button>
          <button class="btn btn-delete" onclick="App.deleteEvent(${event.id})">删除</button>
        </td>
      `;
      eventsTableBody.appendChild(row);
    });
  },
  
  // 编辑事件
  editEvent: function(eventId) {
    const event = FamilyManager.events.find(e => e.id === eventId);
    if (!event) return;
    
    // 填充表单数据
    document.getElementById('event-name').value = event.name;
    document.getElementById('event-date').value = event.date;
    document.getElementById('event-time').value = event.time;
    document.getElementById('event-description').value = event.description || '';
    
    // 更新按钮状态
    const addEventBtn = document.getElementById('add-event-btn');
    const cancelEventBtn = document.getElementById('cancel-event-btn');
    
    if (addEventBtn) {
      addEventBtn.textContent = '更新事件';
    }
    
    if (cancelEventBtn) {
      cancelEventBtn.style.display = 'inline-block';
    }
    
    this.currentEditingEventId = eventId;
    
    // 滚动到表单位置
    document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
  },
  
  // 删除事件
  deleteEvent: function(eventId) {
    if (confirm('确定要删除这个事件吗？')) {
      const eventIndex = FamilyManager.events.findIndex(e => e.id === eventId);
      if (eventIndex !== -1) {
        FamilyManager.events.splice(eventIndex, 1);
        
        // 保存数据
        Utils.saveData();
        
        // 重新渲染事件列表
        this.renderEvents();
        
        this.showMessage('事件删除成功！', 'success');
      }
    }
  }
};

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', function() {
  App.init();
});

// 导出对象（用于后续扩展）
window.FamilyManager = FamilyManager;
window.Utils = Utils;
window.App = App;