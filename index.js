const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

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
	const arg = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = arg.shift().toLowerCase();

     try {
    let commandFile = require(`./cmds/${command}.js`);
    
    commandFile.run(client, message, args,)
    client.channels.get('517487784139685899').send(new Discord.RichEmbed().setTitle('Comando usado :sim: ').addField("Comando:", `${command}`, true).addField("Autor:", `${message.author}`, true).addField("Canal:", `${message.channel}`, true).addField("ID da Mensagem:", `${message.id}`, true).addField("Servidor:", `${message.guild.name}`, true).addField("ID do Autor:", `${message.author.id}`, true).addField("Erros na execução do comando:", `Nenhum`, true).addField("Content:", `${message.content}`, true).setColor('0x000').setThumbnail(message.author.avatarURL).setFooter("Hitter • @DeadSad_").setTimestamp())  
} catch (err) { 
    client.channels.get('517487784139685899').send(new Discord.RichEmbed().setTitle('Comando usado :errado: ').addField("Comando:", `${command}`, true).addField("Autor:", `${message.author}`, true).addField("Canal:", `${message.channel}`, true).addField("ID da Mensagem:", `${message.id}`, true).addField("Servidor:", `${message.guild.name}`, true).addField("ID do Autor:", `${message.author.id}`, true).addField("Erros na execução do comando:", `${err}`, true).addField("Content:", `${message.content}`, true).setColor('0x000').setThumbnail(message.author.avatarURL).setFooter("Hitter • @DeadSad_").setTimestamp())
   if(err.code != 'MODULE_NOT_FOUND'){
     console.log(err)
  } else if(err.code == 'MODULE_NOT_FOUND'){
    message.channel.send({embed: {description: "Não consegui encontrar o comando, ⪧ Caso precise de ajuda digite `!help`", color: 0x000}});
  }}

    })
client.login(process.env.BOT_TOKEN)