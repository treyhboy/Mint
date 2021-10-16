const { Investment } = require("../../db");

const getOverview = async (req, res) => {
    try {
        const { user } = req.body;
        const result = await Investment.findAll({ user });
        res.send(result);
    } catch (err) {
        console.log("err");
        res.send(err);
    }
};

module.exports = getOverview;
