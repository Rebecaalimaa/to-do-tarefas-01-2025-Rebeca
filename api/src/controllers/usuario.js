const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const usuario = await prisma.usuario.create({
            data: req.body
        });
        res.status(201).json(usuario).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}

const read = async (req, res) => {
    const usuarios = await prisma.usuario.findMany({
        include:{
            tarefas: true
        }
    });
    res.json(usuarios);
}

const readOne = async (req, res) => {
    const usuarios = await prisma.usuario.findMany({
        where:{
            id: Number(req.params.id)
        },
        include:{
            telefones:true,
            pedidos: true
        }
    });
    res.json(usuarios);
}

const update = async (req, res) => {
    try {
        const usuario = await prisma.usuario.update({
            data: req.body,
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(202).json(usuario).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}

const remove = async (req, res) => {
    try {
        const usuario = await prisma.usuario.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(204).json(usuario).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}

module.exports = {
    create,
    read,
    readOne,
    update,
    remove
}