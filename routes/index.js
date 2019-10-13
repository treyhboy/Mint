const express = require('express');
const router = express.Router();

router.post('/spen', require('./expenses/spendings'));

router.post('/down', require('./expenses/reminders'));

router.post('/invest', require('./expenses/investments'));

router.post('/tran', require('./expenses/transaction'));

router.post('/rem', require('./expenses/insertReminder'));

router.post('/overview1', require('./expenses/spendingOverview'));

router.post('/overview2', require('./expenses/investmentOverview'));

module.exports = router;