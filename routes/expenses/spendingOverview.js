const { Spending } = require("../../db");

const spendOverview = async (req, res) => {
    try {
        const { user } = req.body;
        const result = await Spending.find({ user });
        res.send(result);
    } catch (err) {
        console.log("err");
        res.send(err);
    }
};

module.exports = spendOverview;
