const { Spendings, Investment } = require("../../db");

const transactionData = async (req, res) => {
    try {
        const { type, user, det, amt, mode } = req.body;
        if (type === "Spending") {
            await Spendings.create({
                user,
                detail: det,
                amount: amt,
                Mode: mode
            });
            console.log("spending");
        } else {
            await Investment.create({
                user,
                detail: det,
                amount: amt,
                Mode: mode
            });
            console.log("investment");
        }
        res.send({ status: true });
    } catch (err) {
        console.log("err");
        res.send(err);
    }
};

module.exports = transactionData;
