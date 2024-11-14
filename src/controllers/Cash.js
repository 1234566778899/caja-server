const Cash = require("../db/Schemas/Cash");

const registerBox = async (req, res) => {
    try {
        const { codigo, uid } = req.body;
        const found = await Cash.findOne({ codigo, uid });
        if (found) {
            return res.status(400).send({ error: 'Código de pago en uso' });
        }
        const cash = new Cash(req.body);
        await cash.save();
        return res.status(200).json(cash);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msgs = Object.values(error.errors).map(val => val.message);
            return res.status(400).send({ error: msgs.join('. ') });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const updateBox = async (req, res) => {
    try {
        const { id } = req.params;
        const found = await Cash.findOne({ _id: id });
        if (!found) {
            return res.status(400).send({ error: 'Caja no encontrada ' });
        }
        const cash = await Cash.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
        return res.status(200).send(cash);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const findOneBox = async (req, res) => {
    try {
        const { id } = req.params;
        const cash = await Cash.findOne({ _id: id });
        if (!cash) {
            return res.status(400).send({ error: 'Caja no encontrada' });
        }
        return res.status(200).send(cash);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const findAllBoxs = async (req, res) => {
    try {
        let { limit, page } = req.query;
        const { id } = req.params;
        limit = limit || 20;
        page = page || 1;
        const skip = (page - 1) * limit;
        const total = await Cash.countDocuments({ uid: id });
        const docs = await Cash.find({ uid: id }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        return res.status(200).send({ total, docs });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const deleteBox = async (req, res) => {
    try {
        const { id } = req.params;
        const cash = await Cash.findOne({ _id: id });
        if (!cash) {
            return res.status(400).send({ error: 'Caja no encontrada' });
        }
        await Cash.findOneAndDelete({ _id: id });
        return res.status(200).send({ msg: 'Eliminado' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    registerBox,
    updateBox,
    findAllBoxs,
    findOneBox,
    deleteBox
}

