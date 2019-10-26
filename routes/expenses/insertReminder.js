// looks good so far so good
const reminder = require('../../db').reminder;

const insertReminder = async (req, res) => {
    try {
        await reminder.create({
            user: req.body.user,
            detail: req.body.det,
            amount: req.body.amt,
            date: req.body.dat
        })
        res.send({ status: true })
    } catch (err) {
        console.log('err');
        res.send(err);
    }
}

module.exports = insertReminder;