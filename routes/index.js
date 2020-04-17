const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

router.post('/spen', auth, require('./expenses/spendings'));

router.post('/down', auth, require('./expenses/reminders'));

router.post('/invest', auth, require('./expenses/investments'));

router.post('/tran', auth, require('./expenses/transaction'));

router.post('/rem', auth, require('./expenses/insertReminder'));

router.post('/overview1', auth, require('./expenses/spendingOverview'));

router.post('/overview2', auth, require('./expenses/investmentOverview'));

module.exports = router;
