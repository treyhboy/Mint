const { Reminder } = require("../../db");

const getReminders = async (req, res) => {
    try {
        const { user } = req.body;
        const db = await Reminder.findAll({ user });
        if (db.length === 0) {
            return res.send({ status: "not found" });
        }
        res.send({ status: "found", data: db });
    } catch (err) {
        console.log("err");
        res.send(err);
    }
};

module.exports = getReminders;
