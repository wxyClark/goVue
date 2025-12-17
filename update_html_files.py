import os
import re

# 定义目录路径
base_dir = 'demo/javascript'
js_dir = 'demo/js'

# 遍历所有HTML文件
for filename in os.listdir(base_dir):
    if filename.endswith('.html'):
        file_path = os.path.join(base_dir, filename)
        print(f'Updating {file_path}...')
        
        # 读取文件内容
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 移除所有内联CSS
        content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
        
        # 在head标签中添加外部CSS引用
        head_pattern = r'<head>(.*?)</head>'
        head_match = re.search(head_pattern, content, re.DOTALL)
        
        if head_match:
            head_content = head_match.group(1)
            css_link = '<link rel="stylesheet" href="../css/main.css">'
            
            # 如果CSS链接不存在，就添加到head标签末尾
            if css_link not in head_content:
                new_head_content = head_content.rstrip() + '\n    ' + css_link + '\n'
                content = content.replace(head_content, new_head_content)
        
        # 提取所有JavaScript块
        js_pattern = r'<script>(.*?)</script>'
        js_matches = re.findall(js_pattern, content, re.DOTALL)
        
        # 保留导入header和footer的脚本，其他的替换为外部引用
        for i, js in enumerate(js_matches):
            # 检查是否是导入header或footer的脚本
            if 'fetch(\'header.html\')' in js or 'fetch(\'footer.html\')' in js:
                continue
            
            # 替换为外部JavaScript引用
            js_filename = os.path.splitext(filename)[0] + (f'_{i}' if i > 0 else '') + '.js'
            js_path = f'../js/{js_filename}'
            external_script = f'<script src="{js_path}"></script>'
            
            # 替换内联脚本为外部引用
            content = content.replace(f'<script>{js}</script>', external_script)
        
        # 写入更新后的内容
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

print('All HTML files have been updated with external CSS and JavaScript references')
