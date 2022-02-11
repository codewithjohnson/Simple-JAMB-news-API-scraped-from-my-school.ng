const express = require('express');
const axios = require("axios");
const cheerio = require("cheerio");

const PORT = 8080;
const app = express();

//  FINAL POST CONTAINING TITLE AND LINKS TO BE SENT AS RESPONSE
let POSTS = [];

app.get('/', (req, res) => {
    res.send("hello there");
});

websitesForJambNews = [
    {
        SiteName :'MySchool',
        SiteLink :"https://myschool.ng/news/category/jamb"
    },

    {
        SiteName :'DailyPost',
        SiteLink : "https://dailypost.ng/education/"
        
    }
];

websitesForJambNews.forEach(websites => {
    if (websites.SiteName === "MySchool"){
        axios.get(websites.SiteLink)
        .then(function(response){
            const html = response.data;
            const $ = cheerio.load(html);

            $('h5 a:contains("JAMB")',html).each(function(){
                let PostTitles = $(this).text();
                let link = $(this).attr('href');
                POSTS.push({PostTitles,link,source:websites.SiteName});
                
            });
        });

    }else if(websites.SiteName === "DailyPost"){
        axios.get(websites.SiteLink)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            $('a:contains("JAMB")').each(function(){
                // let PostTitles = $(this).last("h2").text();
                let link = $(this).attr('href');
                POSTS.push({link,source:websites.SiteName});
            });

        });
    }

});

app.get("/news",(req,res)=>{
    res.json(POSTS);
});
app.listen(PORT, () => console.log("server running on port", PORT));





