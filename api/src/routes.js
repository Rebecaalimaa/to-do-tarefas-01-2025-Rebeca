const express = require('express');
const router = express.Router();

const usuario = require('./controllers/usuario');
const tarefas = require('./controllers/tarefas');


router.get('/', (req, res) => {
    res.json({ titulo: 'Indústria de Alimentos - Sistema de Tarefas' });
});


router.post('/usuarios',usuario.create);
router.get('/usuarios',usuario.read);
router.get('/usuarios/:id',usuario.readOne);
router.put('/usuarios/:id',usuario.update);
router.delete('/usuarios/:id',usuario.remove);

router.post('/tarefas',tarefas.create);
router.get('/tarefas',tarefas.read);
router.put('/tarefas/:id',tarefas.update);
router.delete('/tarefas/:id',tarefas.remove);


module.exports = router;