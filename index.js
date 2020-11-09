const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const games = require("./games.json");
const reactions = require("./reactions.json");

const prefix = botconfig.prefix;
const bot = new Discord.Client({disableEveryone: true});

var fs = require(`fs`);


bot.on("ready", async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} server(s)!`);
    bot.user.setActivity(`Searching for Polls!`, {type: "PLAYING"})
});



bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.toLowerCase().split(" ");
    let messageArraycs = message.content;
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let argscs = messageArraycs.slice(9);


      if(message.content.startsWith(botconfig.prefix)){
          var command = message.content.toLowerCase().slice(1);
          
            
        if(cmd === `${prefix}poll`){
            // let pollChannel = message.mentions.channel.first();
            // let pollDescription = args.join(' ');
            ig=0;
            games.forEach(element => {
              ig++;
            });

            let embedPoll = new Discord.MessageEmbed()
            .setTitle('Game Selection')
            .setDescription('Please only react once. If you change your mind please remove old reactions.')
            .addField(`**GAMES:**`, games)
            .setColor('GREEN')
            let msgEmbed = await message.channel.send(embedPoll);
            ir=0;
            reactions.forEach(element => {
              if(ir < ig){
                msgEmbed.react(element)
              } else {
                return;
              }
              ir++;
            });
            

            // await msgEmbed.react(reactions)
            // await msgEmbed.react('🇧')
        }

        if(cmd === `${prefix}addgame`){
          message.channel.send(`adding game ${argscs}`);
          games.forEach(element => {
            game = element.toLowerCase();
            // message.channel.send(`${game} vs ${args}`);
            i=1;
            if(`${game}` === `${args}`){
              message.channel.send(`Match Found. Game already exists.`);
              i--;
              return;
            }
          });

          if(i === 1){
            var modGames = [];
          games.forEach(element => {
            modGames.push(`"${element}"`);
          });

          modGames.push(`"${argscs}"`);
          message.channel.send(`Updated List: ${modGames}`);

          fs.writeFile('games.json', `[${modGames}]`, function (err) {
            if (err) return console.log(err);
          });
          }
          
        }
          
        
        if(cmd === `${prefix}help`){

          let totalSeconds = (bot.uptime / 1000);
          let days = Math.floor(totalSeconds / 86400);
          totalSeconds %= 86400;
          let hours = Math.floor(totalSeconds / 3600);
          totalSeconds %= 3600;
          let minutes = Math.floor(totalSeconds / 60);
          let seconds = Math.floor(totalSeconds % 60);
          let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;


          comdesc = [`**${prefix}poll**: Will start a game poll.`,`**${prefix}addgame** '**gamename**': Will add named game to the poll list.`, `**${prefix}help**: Will show this menu.`]
          botinfo = [`**Bot Version**: ${botconfig.ver}`,`**Bot Prefix**: ${botconfig.prefix}`,`**Bot Uptime**: ${uptime}`]
          let helpEmbed = new Discord.MessageEmbed()
          .setTitle("**__Help Menu__**")
          .setDescription("Here is a list of all avalible commands / basic bot info.")
          .setColor("ORANGE")
          .addField("__**Commands**__", comdesc)
          .addField("__**Bot Info**__", botinfo)

          message.channel.send(helpEmbed);
        }
            

      }













})



bot.login(botconfig.token);