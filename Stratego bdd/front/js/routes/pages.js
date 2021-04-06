const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.render('index');
});

router.get('/register', (req,res) => {
    res.render('register');
});

router.get('/menu', (req,res) => {
    res.render('menu');
});

router.get('/dontgohere', (req,res) => {
    res.render('nonono');
});

router.get('/login', (req,res) => {
    res.render('login');
});

router.get('/regles', (req,res) => {
    res.render('regles');
});

router.get('/game', (req,res) => {
    res.render('game');
});

router.get('/game_init', (req,res) => {
    res.render('game_init');
});

module.exports = router;   