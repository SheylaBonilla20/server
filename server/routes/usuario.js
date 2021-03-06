const express = require('express');
const Usuario = require('../models/usuario');
const app = express();

const bcrypt = require('bcrypt');

app.get('/', (req, res) => {
    res.json('Hola Mundo');
});

app.get('/usuario', (req, res) => {
    res.json('get Usuario LOCAL');
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({ // Crea nueva instancia del esquema Usuario.
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role,
        google: body.google

    });

    // Para grabar en la DB
    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        // usuarioDB.password = null // No mostrar la password en la respuesta.

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    });
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
});

app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});

module.exports = app;