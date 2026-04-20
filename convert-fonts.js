#!/usr/bin/env node

/**
 * convert-fonts.js (ES Module version)
 * Converte TTF/OTF para JSON (Three.js TextGeometry)
 * Compatible com "type": "module" em package.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Polyfill para __dirname em ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importar opentype.js via CommonJS wrapper
let opentype;
try {
  const opentypeModule = await import("opentype.js");
  opentype = opentypeModule.default || opentypeModule;
} catch (err) {
  console.error("❌ opentype.js não instalado. Execute: npm install --save-dev opentype.js");
  process.exit(1);
}

async function convertFontToThreeJSON(fontPath, outputPath) {
  try {
    console.log(`📖 Carregando fonte: ${fontPath}`);
    
    const fontData = fs.readFileSync(fontPath);
    const font = opentype.parse(fontData.buffer);

    const threeFont = {
      glyphs: {},
      kerningPairs: {},
    };

    // Caracteres suportados (ASCII básico + acentos)
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~àáâãäåèéêëìíîïòóôõöùúûüçñ";
    
    for (const char of chars) {
      try {
        const glyph = font.charToGlyph(char);
        
        if (glyph && glyph.unicode !== undefined) {
          const paths = glyph.getPath(0, 0, 72);
          
          threeFont.glyphs[char] = {
            x_min: glyph.xMin || 0,
            x_max: glyph.xMax || glyph.advanceWidth || 0,
            y_min: glyph.yMin || 0,
            y_max: glyph.yMax || 0,
            ha: glyph.advanceWidth || 0,
            o: paths.toPathData(),
          };
        }
      } catch (charErr) {
        console.warn(`⚠️  Ignorando caractere: ${char}`);
      }
    }

    threeFont.familyName = font.getEnglishName("fontFamilyName") || "Unknown";
    threeFont.ascender = font.ascender || 800;
    threeFont.descender = font.descender || -200;
    threeFont.underlinePosition = font.underlinePosition || -100;
    threeFont.underlineThickness = font.underlineThickness || 50;

    fs.writeFileSync(outputPath, JSON.stringify(threeFont, null, 2));
    
    console.log(`✅ Font convertida com sucesso para: ${outputPath}`);
    console.log(`   Glifos carregados: ${Object.keys(threeFont.glyphs).length}`);
    
    return true;
  } catch (error) {
    console.error("❌ Erro ao converter fonte:", error.message);
    return false;
  }
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log("Uso: node convert-fonts.js <caminho-fonte.ttf> <caminho-saida.json>");
    console.log("\nExemplo:");
    console.log("  node convert-fonts.js ./fonts/Chonburi-Regular.ttf ./fonts/Chonburi-Regular.json");
    process.exit(1);
  }

  const fontPath = path.resolve(args[0]);
  const outputPath = path.resolve(args[1]);

  if (!fs.existsSync(fontPath)) {
    console.error(`❌ Arquivo não encontrado: ${fontPath}`);
    process.exit(1);
  }

  const success = await convertFontToThreeJSON(fontPath, outputPath);
  process.exit(success ? 0 : 1);
}

export { convertFontToThreeJSON };