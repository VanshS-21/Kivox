/**
 * Batch convert PNG images to WebP for performance optimization.
 * Preserves originals in a backup folder.
 * 
 * Usage: node scripts/convert-images.mjs
 */

import sharp from 'sharp';
import { readdir, mkdir, copyFile, rename, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';

const PUBLIC_DIR = 'public';
const BACKUP_DIR = 'public/_png-originals';

// Directories to process
const DIRS = [
  'public/work',
  'public/work/mockups',
  'public/team',
  'public/process',
];

// Max dimensions for each category
const SIZE_RULES = {
  'work': { width: 1920, quality: 80 },       // Showcase backgrounds
  'mockups': { width: 1200, quality: 82 },     // Device mockup screenshots
  'team': { width: 800, quality: 80 },         // Team portraits
  'process': { width: 1200, quality: 80 },     // Process illustrations
};

function getRule(filePath) {
  if (filePath.includes('mockups')) return SIZE_RULES.mockups;
  if (filePath.includes('work')) return SIZE_RULES.work;
  if (filePath.includes('team')) return SIZE_RULES.team;
  if (filePath.includes('process')) return SIZE_RULES.process;
  return { width: 1920, quality: 80 };
}

async function processFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (ext !== '.png') return null;

  const rule = getRule(filePath);
  const name = basename(filePath, ext);
  const dir = dirname(filePath);
  const webpPath = join(dir, `${name}.webp`);
  
  // Backup original
  const backupSubdir = join(BACKUP_DIR, dir.replace(PUBLIC_DIR + '/', '').replace(PUBLIC_DIR + '\\', ''));
  await mkdir(backupSubdir, { recursive: true });
  await copyFile(filePath, join(backupSubdir, basename(filePath)));
  
  // Get original size
  const originalStat = await stat(filePath);
  const originalKB = (originalStat.size / 1024).toFixed(1);

  // Convert to WebP
  await sharp(filePath)
    .resize({ width: rule.width, withoutEnlargement: true })
    .webp({ quality: rule.quality })
    .toFile(webpPath);

  // Get new size
  const newStat = await stat(webpPath);
  const newKB = (newStat.size / 1024).toFixed(1);
  const savings = ((1 - newStat.size / originalStat.size) * 100).toFixed(0);

  console.log(`✓ ${filePath} → ${webpPath}`);
  console.log(`  ${originalKB} KB → ${newKB} KB (${savings}% smaller)`);

  return { original: originalStat.size, converted: newStat.size };
}

async function main() {
  console.log('🖼️  Converting PNGs to WebP...\n');
  
  let totalOriginal = 0;
  let totalConverted = 0;
  let fileCount = 0;

  for (const dir of DIRS) {
    try {
      const files = await readdir(dir);
      for (const file of files) {
        const filePath = join(dir, file);
        const fileStat = await stat(filePath);
        if (!fileStat.isFile()) continue;
        
        const result = await processFile(filePath);
        if (result) {
          totalOriginal += result.original;
          totalConverted += result.converted;
          fileCount++;
        }
      }
    } catch (e) {
      console.log(`⚠ Skipping ${dir}: ${e.message}`);
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📊 Total: ${fileCount} files converted`);
  console.log(`   Before: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   After:  ${(totalConverted / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Saved:  ${((totalOriginal - totalConverted) / 1024 / 1024).toFixed(2)} MB (${((1 - totalConverted / totalOriginal) * 100).toFixed(0)}%)`);
  console.log(`\n💾 Originals backed up to ${BACKUP_DIR}/`);
}

main().catch(console.error);
