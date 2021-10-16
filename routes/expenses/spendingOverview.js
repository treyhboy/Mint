const { Spendings } = require("../../db");

const spendOverview = async (req, res) => {
    try {
        const { user } = req.body;
        const result = await Spendings.findAll({ user });
        res.send(result);
    } catch (err) {
        console.log("err");
        res.send(err);
    }
};

module.exports = spendOverview;
