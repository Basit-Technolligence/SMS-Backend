const express = require("express");
const router = express.Router();
const expensesC = require("../controllers/expenses");


router.post('/addExpense', expensesC.addExpense);

router.get('/allExpenses', expensesC.getAllExpenses);

router.get('/expenses/:id', expensesC.getExpensebyId);

router.patch('/updateExpenses/:id', expensesC.updateExpenses);

router.delete('/deleteExpenses/:id',expensesC.deleteExpenses);

module.exports = router;