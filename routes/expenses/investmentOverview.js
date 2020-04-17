const Investment = require('../../db').investment;

const getOverview = async (req, res) => {
    try {
        const result = await Investment.findAll({
            where: {
                user: req.body.user,
            },
        });
        res.send(result);
    } catch (err) {
        console.log('err');
        res.send(err);
    }
};

module.exports = getOverview;
