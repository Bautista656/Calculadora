const fs = require("fs");
const path = require("path");

const root = process.cwd();

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

const requiredFiles = [
  "index.html",
  "app.py",
  "calculator.py",
  "requirements.txt"
];

for (const file of requiredFiles) {
  if (!exists(file)) {
    fail(`No se encontró el archivo obligatorio: ${file}`);
  }
}

const possibleTestFiles = [
  "test_calculator.py",
  "test_index.py"
];

const hasTests = possibleTestFiles.some(exists);

if (!hasTests) {
  fail("No se encontró ningún archivo de pruebas.");
}

const indexContent = fs.readFileSync(path.join(root, "index.html"), "utf8");

if (!indexContent.includes("<html") && !indexContent.includes("<!DOCTYPE html>")) {
  fail("El archivo index.html no parece tener una estructura HTML válida.");
}

console.log("Validación correcta: los archivos principales del proyecto existen.");
console.log("Archivo HTML encontrado: index.html");
console.log("Archivo principal Python encontrado: app.py");
console.log("Archivo de lógica encontrado: calculator.py");
console.log("Archivo de dependencias encontrado: requirements.txt");
console.log("Archivos de prueba encontrados.");