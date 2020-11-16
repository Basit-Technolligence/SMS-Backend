var createError = require("http-errors");
var express = require("express");
const adminRouter = require("./routes/admin");
const studentRouter = require("./routes/student");
const expenseRouter = require("./routes/expensesRouter");
const teacherRoutes = require("./routes/teacherRoutes");


var app = express();
var port = process.env.PORT || 5000;
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.get('/',(req,res)=>{
  res.send('SCHOOL MANAGEMENT SYSTEM ADMIN');
});
app.use(studentRouter);
app.use(expenseRouter);
app.use(teacherRoutes);
app.use(adminRouter);
app.listen(port, () => {
  console.log("Server Connected");
});
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });
