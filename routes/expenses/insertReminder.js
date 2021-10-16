// looks good so far so good
const { Reminder } = require("../../db");

// this looks good
const insertReminder = async (req, res) => {
    try {
        const { user, det, amt, dat } = req.body;
        await Reminder.create({
            user,
            detail: det,
            amount: amt,
            date: dat
        });
        res.send({ status: true });
    } catch (err) {
        console.log("err");
        res.send(err);
    }
};

module.exports = insertReminder;
