// 静态资源打包器：把一个目录整包加密为单个二进制数据文件。
// 用法：node scripts/pack-assets.mjs <输入目录> <口令> [输出文件]
// 输出格式：[16B salt][12B iv][AES-256-GCM 密文+tag]，密钥由 PBKDF2-SHA256(口令, salt, 60000) 派生。
// 清单为 JSON：{ e: 入口html, f: { 相对路径: 文本 或 base64(二进制) } }
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { pbkdf2Sync, randomBytes, createCipheriv } from 'node:crypto';

const [,, inDir, pass, out = 'public/assets/site-pack.bin'] = process.argv;
if (!inDir || !pass) {
  console.error('用法: node scripts/pack-assets.mjs <输入目录> <口令> [输出文件]');
  process.exit(1);
}

const TEXT_EXT = new Set(['.html', '.js', '.css', '.json', '.txt', '.svg']);
const files = {};
let entry = null;

(function walk(dir) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else {
      const rel = relative(inDir, p).split('\\').join('/');
      const buf = readFileSync(p);
      files[rel] = TEXT_EXT.has(extname(rel).toLowerCase())
        ? buf.toString('utf8')
        : buf.toString('base64');
      if (rel.toLowerCase().endsWith('.html') && !entry) entry = rel;
    }
  }
})(inDir);

if (!entry) { console.error('目录里没有 html 入口'); process.exit(1); }

const json = JSON.stringify({ e: entry, f: files });
const salt = randomBytes(16);
const iv = randomBytes(12);
const key = pbkdf2Sync(pass, salt, 60000, 32, 'sha256');
const c = createCipheriv('aes-256-gcm', key, iv);
const ct = Buffer.concat([c.update(json, 'utf8'), c.final(), c.getAuthTag()]);
writeFileSync(out, Buffer.concat([salt, iv, ct]));
console.log(`packed ${Object.keys(files).length} files, ${(ct.length / 1024).toFixed(1)}KB -> ${out}`);
