import re

data = open('src/components/admin/AdminContentEditor.tsx', 'r', encoding='utf-8').read()

# Capture the structure
match = re.search(r'const PAGE_CONTENT_STRUCTURE: Record<string, ContentSection\[\]> = (\{.*?\});\n\ninterface AdminContentEditorProps', data, re.DOTALL)
if not match:
    print("Could not find structure")
    exit()

structure_text = match.group(1)

# A crude but effective regex for the structure
page_pattern = re.compile(r'^\s*([a-zA-Z_]+):\s*\[(.*?)\](?:,|$)', re.MULTILINE | re.DOTALL)
section_pattern = re.compile(r'{\s*section:\s*"([^"]+)",\s*label:.*?\s*fields:\s*\[(.*?)\],\s*}', re.DOTALL)
field_pattern = re.compile(r'{.*?key:\s*"([^"]+)".*?type:\s*"([^"]+)".*?(?:placeholder:\s*"([^"]*)")?.*?}(?:,|$)', re.DOTALL)

sql_inserts = []

def escape_sql(s):
    if not s:
        return ""
    return s.replace("'", "''")

for page_match in page_pattern.finditer(structure_text):
    page = page_match.group(1)
    sections_text = page_match.group(2)
    
    for section_match in section_pattern.finditer(sections_text):
        section = section_match.group(1)
        fields_text = section_match.group(2)
        
        for field_match in field_pattern.finditer(fields_text):
            key = field_match.group(1)
            type_val = field_match.group(2)
            placeholder = field_match.group(3)
            
            value = placeholder if placeholder else ''
            
            if value:
                sql_inserts.append(f"('{page}', '{section}', '{key}', '{escape_sql(value)}', '{type_val}')")
            elif type_val == 'image':
                # Empty default for images
                sql_inserts.append(f"('{page}', '{section}', '{key}', '', '{type_val}')")
            else:
                 sql_inserts.append(f"('{page}', '{section}', '{key}', '', '{type_val}')")

print("-- ELYON SCHOOL - DEFAULT SITE CONTENT SEED")
print("-- Run this script to prepopulate the site_content table so all fields show up in the Admin Interface.")
print("")
print("INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES")

for i, insert in enumerate(sql_inserts):
    if i == len(sql_inserts) - 1:
        print(f"  {insert}")
        print("ON CONFLICT (page, section, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;")
    else:
        print(f"  {insert},")
