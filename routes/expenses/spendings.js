const spending = require('../../db').spendings;

const getSpendings = async (req, res) => {
    try {
        const db = await spending.findAll({ where: { user: req.body.user } });
        if (db[0]) {
            res.send({ status: 'found', data: db });
        } else {
            res.send({ status: 'not found' });
        }
    } catch (err) {
        console.log('err');
        res.send(err);
    }
};

module.exports = getSpendings;
