import os
import re

# 定义目录路径
base_dir = 'demo/javascript'
css_file = 'demo/css/main.css'
js_dir = 'demo/js'

# 读取现有的main.css内容
with open(css_file, 'r', encoding='utf-8') as f:
    existing_css = f.read()

# 收集所有提取的CSS
all_css = existing_css

# 遍历所有HTML文件
for filename in os.listdir(base_dir):
    if filename.endswith('.html'):
        file_path = os.path.join(base_dir, filename)
        print(f'Processing {file_path}...')
        
        # 读取文件内容
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 提取所有内联CSS
        css_pattern = r'<style>(.*?)</style>'
        css_matches = re.findall(css_pattern, content, re.DOTALL)
        
        for css in css_matches:
            # 如果CSS不在已有的CSS中，就添加进去
            if css.strip() not in all_css:
                all_css += '\n' + css.strip()
        
        # 提取所有内联JavaScript
        js_pattern = r'<script>(.*?)</script>'
        js_matches = re.findall(js_pattern, content, re.DOTALL)
        
        # 为每个JavaScript块创建文件
        for i, js in enumerate(js_matches):
            # 跳过导入header和footer的脚本
            if 'fetch(\'header.html\')' in js or 'fetch(\'footer.html\')' in js:
                continue
            
            js_filename = os.path.splitext(filename)[0] + (f'_{i}' if i > 0 else '') + '.js'
            js_path = os.path.join(js_dir, js_filename)
            
            # 写入JavaScript文件
            with open(js_path, 'w', encoding='utf-8') as f:
                f.write(js.strip())
            
            print(f'Created {js_path}')

# 写入合并后的CSS
with open(css_file, 'w', encoding='utf-8') as f:
    f.write(all_css)

print(f'All CSS has been merged into {css_file}')
print('All JavaScript files have been created')
