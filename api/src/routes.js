const express = require('express');
const router = express.Router();

const Cliente = require('./controllers/cliente');
const Telefone = require('./controllers/telefone');
const Pedido = require('./controllers/pedido');

router.get('/',(req, res)=>{
    res.json({titulo:'SNOOPY PetSHop'});
});

router.post('/clientes',Cliente.create);
router.get('/clientes',Cliente.read);
router.get('/clientes/:id',Cliente.readOne);
router.patch('/clientes/:id',Cliente.update);
router.delete('/clientes/:id',Cliente.remove);

router.post('/telefones',Telefone.create);
router.get('/telefones',Telefone.read);
router.patch('/telefones/:id',Telefone.update);
router.delete('/telefones/:id',Telefone.remove);

router.post('/pedidos',Pedido.create);
router.get('/pedidos',Pedido.read);
router.get('/pedidos/:id',Pedido.readOne);
router.patch('/pedidos/:id',Pedido.update);
router.delete('/pedidos/:id',Pedido.remove);

module.exports = router;