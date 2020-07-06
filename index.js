const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

client.on("ready", async => {
	console.log("Howdy!")
})

client.on("message", async message => {
    if(message.author.bot || message.author.id == client.user.id) return;

	if(message.content.indexOf(config.prefix) !== 0) return;
	const arg = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = arg.shift().toLowerCase();

    if(command === "t"){

        // Criar o isGameRunning?

        const request = require("request")
        const cheerio = require("cheerio")

        request('https://www.palabrasaleatorias.com/palavras-aleatorias.php/', function(err, res, body){
            if(err) console.log(`Um erro foi detectado.\n${err}`)

            var body = cheerio.load(body)
            body('table').each(function(){
                var word = body(this).find('div')
                console.log(word)
            })
        })

    }

    })
client.login(process.env.BOT_TOKEN)