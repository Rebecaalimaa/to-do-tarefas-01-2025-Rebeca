const express = require('express');
const router = express.Router();

const usuario = require('./controllers/usuario');
const tarefas = require('./controllers/tarefas');


router.get('/',(req, res)=>{
    res.json({titulo:'SNOOPY PetSHop'});
});

router.post('/usuarios',usuario.create);
router.get('/usuarios',usuario.read);
router.get('/usuarios/:id',usuario.readOne);
router.patch('/usuarios/:id',usuario.update);
router.delete('/usuarios/:id',usuario.remove);

router.post('/tarefass',tarefas.create);
router.get('/tarefass',tarefas.read);
router.patch('/tarefass/:id',tarefas.update);
router.delete('/tarefass/:id',tarefas.remove);


module.exports = router;