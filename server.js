const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Arreglo simulado para almacenar usuarios
let usuarios = [];

// Ruta para registrar usuarios
app.post('/register', (req, res) => {
    const { nombre, dpi, email, contrasena } = req.body;
    const existeUsuario = usuarios.find(usuario => usuario.email === email);

    if (existeUsuario) {
        return res.status(400).json({ error: 'El email ya está registrado.' });
    }

    const nuevoUsuario = { nombre, dpi, email, contrasena };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { email, contrasena } = req.body;
    const usuario = usuarios.find(usuario => usuario.email === email && usuario.contrasena === contrasena);

    if (!usuario) {
        return res.status(400).json({ error: 'Credenciales incorrectas.' });
    }

    res.json(usuario);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
