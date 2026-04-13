const fs = require('fs');

const data = fs.readFileSync('src/components/admin/AdminContentEditor.tsx', 'utf-8');

const match = data.match(/const PAGE_CONTENT_STRUCTURE[^=]*=\s*({[\s\S]*?});\n\ninterface/);
if (!match) {
    console.error("Match failed");
    process.exit(1);
}

// Convert the matched TS code to valid JS object by evaluating it
const objectStr = match[1];
let PAGE_CONTENT_STRUCTURE;
try {
    eval('PAGE_CONTENT_STRUCTURE = ' + objectStr);
} catch(e) {
    console.error("Eval failed", e);
    process.exit(1);
}

let sql = `-- ELYON SCHOOL - DEFAULT SITE CONTENT SEED
-- Run this script to prepopulate the site_content table so all fields show up in the Admin Interface.

INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES\n`;

let values = [];

for (const page in PAGE_CONTENT_STRUCTURE) {
    for (const section of PAGE_CONTENT_STRUCTURE[page]) {
        for (const field of section.fields) {
            const val = field.placeholder || '';
            const type = field.type;
            const escapeSql = (s) => s.replace(/'/g, "''");
            values.push(`('${page}', '${section.section}', '${field.key}', '${escapeSql(val)}', '${type}')`);
        }
    }
}

sql += values.join(',\n') + '\nON CONFLICT (page, section, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;';

fs.writeFileSync('C:\\Users\\RDP\\.gemini\\antigravity\\brain\\af7d3a00-31b1-4a10-afa0-e3efcd4eb353\\content_seed.sql', sql);
console.log("Success! File written to artifacts.");
