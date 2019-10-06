const spending = require('../../db').spendings;

const spendOverview = async (req, res) => {
    try {
        let result = await spending.findAll({
            where: {
                user: req.body.user
            }
        });
        res.send(result);
    } catch (err) {
        console.log("err");
        res.send(err);
    }
}

module.exports = spendOverview;