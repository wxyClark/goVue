import os
import re

# 定义HTML文件目录和CSS文件路径
html_dir = 'demo/html'
css_file = '../css/main.css'

# 获取所有HTML文件
html_files = [f for f in os.listdir(html_dir) if f.endswith('.html')]

# 定义要替换的模式
style_pattern = re.compile(r'\s*<style>.*?</style>\s*', re.DOTALL)
link_tag = '<link rel="stylesheet" href="' + css_file + '">'

# 处理每个HTML文件
for file_name in html_files:
    file_path = os.path.join(html_dir, file_name)
    
    # 读取文件内容
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 检查是否包含style标签
    if '<style>' in content:
        # 替换style标签为link标签
        new_content = style_pattern.sub(link_tag, content)
        
        # 保存修改后的内容
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f'已处理: {file_name}')
    else:
        print(f'已处理 (无内联CSS): {file_name}')

print('\n所有文件处理完成！')