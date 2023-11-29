import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const apiKey = 'cd1a4b5a';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) =>{
    res.render("index.ejs");
})

app.post("/", async (req,res) =>{
    try {
        const movie = req.body.movie;
        const response = await axios.get(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`);
        res.render("index.ejs",{data: response.data});
    } catch (error) {
        res.status(500);
    }
})

app.listen(port, () =>{
    console.log(`listening on port ${port}.`)
})