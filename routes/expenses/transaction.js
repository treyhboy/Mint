const db = require('../../db');

const spending = db.spendings;
const { investment } = db;

const transactionData = async (req, res) => {
    try {
        console.log(req.body.type);
        if (req.body.type === 'Spending') {
            await spending.create({
                user: req.body.user,
                detail: req.body.det,
                amount: req.body.amt,
                Mode: req.body.mode,
            });
            console.log('spending');
        } else {
            await investment.create({
                user: req.body.user,
                detail: req.body.det,
                amount: req.body.amt,
                Mode: req.body.mode,
            });
            console.log('investment');
        }
        res.send({ status: true });
    } catch (err) {
        console.log('err');
        res.send(err);
    }
};

module.exports = transactionData;
