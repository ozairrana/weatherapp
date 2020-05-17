const express = require ('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

const app = express()   

const publicDirPath = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname,'../templates/views')
const partialsDir = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsDir)
hbs.registerPartials(partialsDir)


app.use(express.static(publicDirPath))

app.get('',(req,res)=>
{
    res.render('index',{
        title: "Weather",
        name: "Ozair"
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        title: "About Me",
        name:'Ozair'
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',{
        title: "Help",
        text:"This is some helpful text!",
        name:'Ozair'
    })
})


app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
            error:"Provide an address!"
        })
    }

    geocode(req.query.address,(error,{lon,lat,loc} = {})=>{
        if(error === undefined)
        {

            weather(lat,lon,(error,{temp,description})=>
            {
                if(error === undefined)
                {
                    res.send({
                        location: loc,
                        temperature: 'It is ' + temp + ' Celcius',
                        overall: description
                    })
                    
                }
                else
                {
                    res.send({error})
                }
            })
        }
        else
        {
           res.send({error})
        }
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        errormsg:"Page not found!",
        name: 'Ozair'
    })
})

app.listen(3000,()=>
{
    console.log('Server is up on 3000')
})