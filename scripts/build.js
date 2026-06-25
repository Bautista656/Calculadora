const fs = require("fs");
const path = require("path");

const root = process.cwd();
const dist = path.join(root, "dist");

const entriesToCopy = [
  "index.html",
  "style.css",
  "styles.css",
  "main.css",
  "script.js",
  "main.js",
  "app.js",
  "calculadora.js",
  "assets",
  "img",
  "images",
  "css",
  "js"
];

function copyRecursive(source, destination) {
  if (!fs.existsSync(source)) return;

  const stats = fs.statSync(source);

  if (stats.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });

    for (const item of fs.readdirSync(source)) {
      copyRecursive(path.join(source, item), path.join(destination, item));
    }
  } else {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
  }
}

if (!fs.existsSync(path.join(root, "index.html"))) {
  console.error("ERROR: No se encontró index.html. No se puede generar el entorno de liberación.");
  process.exit(1);
}

if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}

fs.mkdirSync(dist, { recursive: true });

for (const entry of entriesToCopy) {
  const source = path.join(root, entry);
  const destination = path.join(dist, entry);

  if (fs.existsSync(source)) {
    copyRecursive(source, destination);
    console.log(`Copiado: ${entry}`);
  }
}

console.log("Entorno de liberación generado correctamente en la carpeta dist.");