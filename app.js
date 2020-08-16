
const express = require("express");
const app = express();
const port = process.env.PORT || 3000
let request = require("request")
app.set("view engine", "ejs")

// Routes
app.get("/", (req, res)=>{
    res.render("search")

})

app.get("/results", (req,res)=> {
    let query = req.query.search
    let url = `http://www.omdbapi.com/?s=${query}&apikey=thewdb`
    request (url, (error, response, body)=> {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body)
            if(data.Error) {
                console.log(data)
                return
            }
            res.render("results", data)
            
        }
    });
    
})

app.listen(port, ()=>{
    console.log(`App is up and running on port ${port}`)
})