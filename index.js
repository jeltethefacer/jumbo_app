const express = require("express")

app = express()

require("./routes/homeRoutes")(app)

app.listen(5000)
