const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const tarefa = await prisma.tarefa.create({
            data: req.body
        });
        res.status(201).json(tarefa).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}

const read = async (req, res) => {
    try {
        const tarefas = await prisma.tarefa.findMany();
        res.json(tarefas);
    } catch (e) {
        res.status(400).json(e).end();
    }
}

const update = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const existingTarefa = await prisma.tarefa.findUnique({
            where: { id },
        });

        if (!existingTarefa) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }

        const tarefa = await prisma.tarefa.update({
            where: { id },
            data: req.body,
        });

        res.status(202).json(tarefa).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}

const remove = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const existingTarefa = await prisma.tarefa.findUnique({
            where: { id },
        });

        if (!existingTarefa) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }

        await prisma.tarefa.delete({
            where: { id },
        });

        res.status(204).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}

module.exports = {
    create,
    read,
    update,
    remove
}
