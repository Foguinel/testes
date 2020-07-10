const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
   

    let embed = new Discord.RichEmbed()
    .setAuthor("|| SUPORTE ||", client.user.avatarURL)
    .setDescription("**Esta precisando de ajuda ? Então você veio ao lugar certo!|\n\n Reaja ao '⚠'")
    .setFooter('Hitter • @DeadSad_')
    .setTimestamp()
    .setColor('0x00')
    .setThumbnail(client.user.avatarURL)
    
    

message.channel.send(embed).then(msg=> {
msg.react('⚠').then()


const qualquercoisafilter = (reaction, user) => reaction.emoji.name === '⚠'&&  user.id !== client.user.id;




const qualquercoisa = msg.createReactionCollector(qualquercoisafilter);



qualquercoisa.on('collect', r3 => {
    message.guild.createChannel(`ticket-suporte-${message.author.username}`, "Olá").then(c => {
            let role = message.guild.roles.find(c => c.name == 'Role da staff');
            let role2 = message.guild.roles.find(c => c.name == "@everyone"); 
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
             });
             c.users.remove(qualquercoisa)
      
  })

})
})
}