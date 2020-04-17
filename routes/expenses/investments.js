const Investment = require('../../db').investment;

const getInvestments = async (req, res) => {
    try {
        const db = await Investment.findAll({ where: { user: req.body.user } });
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

module.exports = getInvestments;
