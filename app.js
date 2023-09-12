const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Ruta al archivo HTML estático
  const filePath = path.join(__dirname, 'index.html');

  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      // Si el archivo no existe, responder con un código de error 404
      res.statusCode = 404;
      res.end('Archivo no encontrado');
      return;
    }

    // Leer el archivo y enviarlo como respuesta
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error interno del servidor');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor Node.js corriendo en el puerto ${PORT}`);
});
