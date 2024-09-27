import http from 'http';
import fs from 'fs';
import path from 'path';

// Définir le port
const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public'); // Dossier public
const dbPath = path.join(__dirname, '../data', 'database.json');

// Fonction pour servir des fichiers du dossier public
const serveFile = (filePath: string, contentType: string, res: http.ServerResponse) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Erreur du serveur');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
};

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
  if (req.url?.startsWith('/api')) {
    // Gérer les requêtes API ici
  } else {
    let filePath = path.join(publicPath, req.url === '/' ? '/build/index.html' : req.url!);
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
      case '.js':
        contentType = 'application/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpg';
        break;
      default:
        contentType = 'text/html';
    }
    // Servir le fichier statique
    serveFile(filePath, contentType, res);
  }
});

// Démarrer le serveur
server.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
