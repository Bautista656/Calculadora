const fs = require("fs");
const path = require("path");

const root = process.cwd();
const dist = path.join(root, "dist");
const reports = path.join(root, "reports");

function getFiles(directory) {
  if (!fs.existsSync(directory)) return [];

  let results = [];

  for (const item of fs.readdirSync(directory)) {
    const fullPath = path.join(directory, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

if (!fs.existsSync(dist)) {
  console.error("ERROR: No existe la carpeta dist. Ejecuta npm run build antes de generar métricas.");
  process.exit(1);
}

const files = getFiles(dist);
const totalSizeBytes = files.reduce((sum, file) => sum + fs.statSync(file).size, 0);

const metrics = {
  project: "Calculadora",
  environment: "GitHub Pages",
  generatedAt: new Date().toISOString(),
  totalFiles: files.length,
  totalSizeBytes,
  totalSizeKB: Number((totalSizeBytes / 1024).toFixed(2)),
  releaseFolder: "dist",
  status: "ready"
};

fs.mkdirSync(reports, { recursive: true });

fs.writeFileSync(
  path.join(reports, "deploy-metrics.json"),
  JSON.stringify(metrics, null, 2),
  "utf8"
);

console.log("Métricas generadas correctamente:");
console.log(metrics);