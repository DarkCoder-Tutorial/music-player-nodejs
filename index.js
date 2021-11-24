// Path
const path = require("path");

// Express
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Config app use
app.use(express.static(path.join(__dirname, "public"))); // set static file
app.set("views", path.join(__dirname, "views")); // set root dictionary view
app.set("view engine", "ejs"); // set template view engine use ejs

app.get('/', function(req, res) {
  res.render('index');
});

// Start server listen port 3000
app.listen(port, () => {
  console.log(`Start server listen at http://localhost:${port}`);
});
