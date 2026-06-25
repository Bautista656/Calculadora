const fs = require("fs");
const path = require("path");

const root = process.cwd();
const dist = path.join(root, "dist");
const indexPath = path.join(dist, "index.html");

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(dist)) {
  fail("No existe la carpeta dist. Primero se debe ejecutar npm run build.");
}

if (!fs.existsSync(indexPath)) {
  fail("No existe dist/index.html. El entorno de liberación está incompleto.");
}

const indexContent = fs.readFileSync(indexPath, "utf8");

if (!indexContent.includes("<html") && !indexContent.includes("<!DOCTYPE html>")) {
  fail("dist/index.html no parece ser un archivo HTML válido.");
}

console.log("Prueba de liberación correcta.");
console.log("La carpeta dist existe.");
console.log("El archivo dist/index.html existe.");
console.log("El entorno de liberación está listo para despliegue.");