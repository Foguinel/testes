const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

const firebase = require("firebase")

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

client.on("ready", async => {
	console.log("Howdy!")
})

client.on("message", async message => {
    if(message.author.bot || message.author.id == client.user.id) return;

	if(message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

     try {
    let commandFile = require(`./cmds/${command}.js`);
    
    commandFile.run(client, message, args)
} catch (err) { 
   if(err.code != 'MODULE_NOT_FOUND'){
     console.log(err)
  }}

    })
client.login(process.env.BOT_TOKEN)