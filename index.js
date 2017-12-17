const express = require("express")

app = express()

require("./routes/homeRoutes")(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)
