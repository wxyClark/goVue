// 加载公共头部和页脚
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML('afterbegin', data);
                // 设置当前页面为活动状态
                document.querySelector('nav a[href="async-programming.html"]').classList.add('active');
            });

        fetch('footer.html')
            .then(response => response.text())
            .then(data => document.body.insertAdjacentHTML('beforeend', data));

        // 日志工具函数
        function logMessage(elementId, message, type = 'info') {
            const log = document.getElementById(elementId);
            const now = new Date();
            const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
            const entry = document.createElement('div');
            entry.className = `log-entry ${type}`;
            entry.innerHTML = `<span class="time">[${time}]</span> ${message}`;
            log.appendChild(entry);
            log.scrollTop = log.scrollHeight;
        }
        
        function clearLog(elementId) {
            const log = document.getElementById(elementId);
            log.innerHTML = '';
        }
        
        // 回调函数示例
        function callbackDemo() {
            clearLog('callback-log');
            
            // 模拟异步操作
            function fetchData(url, callback) {
                logMessage('callback-log', `开始请求: ${url}`, 'pending');
                setTimeout(() => {
                    const data = { id: 1, name: '张三', age: 30 };
                    logMessage('callback-log', `请求完成: ${url}`, 'success');
                    callback(null, data);
                }, 1000);
            }
            
            // 使用回调函数
            fetchData('https://api.example.com/users', function(error, data) {
                if (error) {
                    logMessage('callback-log', `请求失败: ${error}`, 'error');
                    return;
                }
                logMessage('callback-log', `请求成功，数据: ${JSON.stringify(data)}`, 'success');
            });
        }
        
        // Promise示例
        function promiseDemo() {
            clearLog('promise-log');
            
            const promise = new Promise(function(resolve, reject) {
                logMessage('promise-log', 'Promise开始执行', 'pending');
                setTimeout(() => {
                    const success = true;
                    if (success) {
                        logMessage('promise-log', 'Promise操作成功', 'success');
                        resolve('操作成功完成');
                    } else {
                        logMessage('promise-log', 'Promise操作失败', 'error');
                        reject('操作失败');
                    }
                }, 1000);
            });
            
            promise
                .then(function(result) {
                    logMessage('promise-log', `Promise成功结果: ${result}`, 'success');
                })
                .catch(function(error) {
                    logMessage('promise-log', `Promise失败原因: ${error}`, 'error');
                })
                .finally(function() {
                    logMessage('promise-log', 'Promise执行完成', 'info');
                });
        }
        
        // Promise链式调用示例
        function promiseChainDemo() {
            clearLog('promise-chain-log');
            const steps = document.getElementById('promise-chain-steps');
            steps.innerHTML = '';
            
            // 模拟异步函数
            function fetchUser(id) {
                return new Promise(resolve => {
                    const step = document.createElement('div');
                    step.className = 'step pending';
                    step.textContent = `正在获取用户 ${id}...`;
                    steps.appendChild(step);
                    
                    setTimeout(() => {
                        step.className = 'step completed';
                        step.textContent = `用户 ${id} 获取成功`;
                        resolve({ id, name: '张三' });
                    }, 800);
                });
            }
            
            function fetchPosts(userId) {
                return new Promise(resolve => {
                    const step = document.createElement('div');
                    step.className = 'step pending';
                    step.textContent = `正在获取用户 ${userId} 的帖子...`;
                    steps.appendChild(step);
                    
                    setTimeout(() => {
                        step.className = 'step completed';
                        step.textContent = `用户 ${userId} 的帖子获取成功`;
                        resolve([{ id: 1, title: '帖子标题' }]);
                    }, 800);
                });
            }
            
            function fetchComments(postId) {
                return new Promise(resolve => {
                    const step = document.createElement('div');
                    step.className = 'step pending';
                    step.textContent = `正在获取帖子 ${postId} 的评论...`;
                    steps.appendChild(step);
                    
                    setTimeout(() => {
                        step.className = 'step completed';
                        step.textContent = `帖子 ${postId} 的评论获取成功`;
                        resolve([{ id: 1, content: '评论内容', authorId: 2 }]);
                    }, 800);
                });
            }
            
            function fetchAuthor(authorId) {
                return new Promise(resolve => {
                    const step = document.createElement('div');
                    step.className = 'step pending';
                    step.textContent = `正在获取作者 ${authorId} 的信息...`;
                    steps.appendChild(step);
                    
                    setTimeout(() => {
                        step.className = 'step completed';
                        step.textContent = `作者 ${authorId} 的信息获取成功`;
                        resolve({ id: 2, name: '李四' });
                    }, 800);
                });
            }
            
            logMessage('promise-chain-log', '开始Promise链式调用', 'info');
            
            fetchUser(1)
                .then(function(user) {
                    logMessage('promise-chain-log', `获取用户成功: ${JSON.stringify(user)}`, 'success');
                    return fetchPosts(user.id);
                })
                .then(function(posts) {
                    logMessage('promise-chain-log', `获取帖子成功: ${JSON.stringify(posts)}`, 'success');
                    return fetchComments(posts[0].id);
                })
                .then(function(comments) {
                    logMessage('promise-chain-log', `获取评论成功: ${JSON.stringify(comments)}`, 'success');
                    return fetchAuthor(comments[0].authorId);
                })
                .then(function(author) {
                    logMessage('promise-chain-log', `获取作者成功: ${JSON.stringify(author)}`, 'success');
                    logMessage('promise-chain-log', '链式调用完成', 'success');
                })
                .catch(function(error) {
                    logMessage('promise-chain-log', `发生错误: ${error}`, 'error');
                });
        }
        
        // Promise静态方法示例
        function promiseStaticDemo() {
            clearLog('promise-static-log');
            
            // 模拟异步函数
            function fetchData(id) {
                return new Promise(resolve => {
                    const delay = Math.random() * 2000 + 500;
                    setTimeout(() => {
                        resolve(`数据 ${id}`);
                    }, delay);
                });
            }
            
            const promise1 = fetchData(1);
            const promise2 = fetchData(2);
            const promise3 = fetchData(3);
            
            logMessage('promise-static-log', '开始Promise.all示例', 'info');
            
            // Promise.all示例
            Promise.all([promise1, promise2, promise3])
                .then(function(results) {
                    logMessage('promise-static-log', `Promise.all结果: ${results}`, 'success');
                });
            
            // Promise.race示例
            logMessage('promise-static-log', '开始Promise.race示例', 'info');
            Promise.race([promise1, promise2, promise3])
                .then(function(result) {
                    logMessage('promise-static-log', `Promise.race结果: ${result}`, 'success');
                });
        }
        
        // async/await示例
        function asyncAwaitDemo() {
            clearLog('async-await-log');
            const steps = document.getElementById('async-await-steps');
            steps.innerHTML = '';
            
            // 模拟异步函数
            async function fetchUser(id) {
                const step = document.createElement('div');
                step.className = 'step pending';
                step.textContent = `正在获取用户 ${id}...`;
                steps.appendChild(step);
                
                return new Promise(resolve => {
                    setTimeout(() => {
                        step.className = 'step completed';
                        step.textContent = `用户 ${id} 获取成功`;
                        resolve({ id, name: '张三' });
                    }, 800);
                });
            }
            
            async function fetchPosts(userId) {
                const step = document.createElement('div');
                step.className = 'step pending';
                step.textContent = `正在获取用户 ${userId} 的帖子...`;
                steps.appendChild(step);
                
                return new Promise(resolve => {
                    setTimeout(() => {
                        step.className = 'step completed';
                        step.textContent = `用户 ${userId} 的帖子获取成功`;
                        resolve([{ id: 1, title: '帖子标题' }]);
                    }, 800);
                });
            }
            
            async function fetchComments(postId) {
                const step = document.createElement('div');
                step.className = 'step pending';
                step.textContent = `正在获取帖子 ${postId} 的评论...`;
                steps.appendChild(step);
                
                return new Promise(resolve => {
                    setTimeout(() => {
                        step.className = 'step completed';
                        step.textContent = `帖子 ${postId} 的评论获取成功`;
                        resolve([{ id: 1, content: '评论内容' }]);
                    }, 800);
                });
            }
            
            // 主函数
            async function fetchData() {
                logMessage('async-await-log', '开始async/await示例', 'info');
                
                try {
                    const user = await fetchUser(1);
                    logMessage('async-await-log', `获取用户成功: ${JSON.stringify(user)}`, 'success');
                    
                    const posts = await fetchPosts(user.id);
                    logMessage('async-await-log', `获取帖子成功: ${JSON.stringify(posts)}`, 'success');
                    
                    const comments = await fetchComments(posts[0].id);
                    logMessage('async-await-log', `获取评论成功: ${JSON.stringify(comments)}`, 'success');
                    
                    logMessage('async-await-log', 'async/await执行完成', 'success');
                } catch (error) {
                    logMessage('async-await-log', `发生错误: ${error}`, 'error');
                }
            }
            
            fetchData();
        }
        
        // async/await并行处理示例
        function asyncParallelDemo() {
            clearLog('async-parallel-log');
            
            // 模拟异步函数
            function fetchData(id) {
                return new Promise(resolve => {
                    const delay = Math.random() * 1500 + 500;
                    setTimeout(() => {
                        const result = { id, data: `数据 ${id}` };
                        logMessage('async-parallel-log', `获取数据 ${id} 完成`, 'success');
                        resolve(result);
                    }, delay);
                });
            }
            
            // 主函数
            async function fetchMultipleData() {
                logMessage('async-parallel-log', '开始并行获取数据', 'info');
                
                try {
                    // 并行执行多个异步操作
                    const [data1, data2, data3] = await Promise.all([
                        fetchData(1),
                        fetchData(2),
                        fetchData(3)
                    ]);
                    
                    logMessage('async-parallel-log', `数据1: ${JSON.stringify(data1)}`, 'info');
                    logMessage('async-parallel-log', `数据2: ${JSON.stringify(data2)}`, 'info');
                    logMessage('async-parallel-log', `数据3: ${JSON.stringify(data3)}`, 'info');
                    logMessage('async-parallel-log', '并行获取数据完成', 'success');
                } catch (error) {
                    logMessage('async-parallel-log', `发生错误: ${error}`, 'error');
                }
            }
            
            fetchMultipleData();
        }

        // 添加事件监听器
        document.addEventListener('DOMContentLoaded', function() {
            // 回调函数示例按钮
            document.getElementById('callback-demo-btn').addEventListener('click', callbackDemo);
            
            // Promise示例按钮
            document.getElementById('promise-demo-btn').addEventListener('click', promiseDemo);
            
            // Promise链式调用示例按钮
            document.getElementById('promise-chain-demo-btn').addEventListener('click', promiseChainDemo);
            
            // Promise静态方法示例按钮
            document.getElementById('promise-static-demo-btn').addEventListener('click', promiseStaticDemo);
            
            // async/await示例按钮
            document.getElementById('async-await-demo-btn').addEventListener('click', asyncAwaitDemo);
            
            // async/await并行处理示例按钮
            document.getElementById('async-parallel-demo-btn').addEventListener('click', asyncParallelDemo);
        });