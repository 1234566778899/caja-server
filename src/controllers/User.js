const User = require("../db/Schemas/User");

const register = async (req, res) => {
    try {
        const { dni } = req.body;
        const found = await User.findOne({ dni });
        if (found) {
            return res.status(400).send({ error: 'Dni es uso' });
        }
        const user = new User(req.body);
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msgs = Object.values(error.errors).map(val => val.message);
            return res.status(400).send({ error: msgs.join('. ') });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const found = await User.findOne({ _id: id });
        if (!found) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }
        const user = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const findOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const findAllUsers = async (req, res) => {
    try {
        let { limit, page, rol } = req.query;
        limit = limit || 10;
        page = page || 1;
        rol = rol || 'user';
        const skip = (page - 1) * limit;
        const total = await User.countDocuments({ rol });
        const docs = await User.find({ rol }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        return res.status(200).send({ total, docs });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const found = await User.findOne({ _id: id });
        if (!found) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }
        await User.findOneAndDelete({ _id: id })
        return res.status(200).send({ ok: 'Eliminado' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    register,
    updateUser,
    findAllUsers,
    findOneUser,
    deleteUser
}

