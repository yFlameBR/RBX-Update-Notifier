const Discord = require('discord.js');
const client = new Discord.Client();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var regexp = /[^\s"]+|"([^"]*)"/gi;
var xmlHttp = new XMLHttpRequest();
function RequestGet(url)
{
    xmlHttp.open( "GET", url, false ); 
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

client.on('ready', ()=>{
    console.log(`Logged in as ${client.user.tag}!`);
    InitializeCheckUpdateLoop();
});
var Current = "none";
function InitializeCheckUpdateLoop(){   
    setTimeout(async function(){
        var first = RequestGet('http://setup.roblox.com/version');//RequestGet('http://setup.roblox.com/version');
        await sleep(10000);//10 seconds of delay to wait roblox update and get new version.
        var second = RequestGet('http://setup.roblox.com/version');
        if (second == "undefined"){//if request return UNDEFINED then Request again
            second = RequestGet('http://setup.roblox.com/version');
        }
        if (first == "undefined"){//if request return UNDEFINED then Request again
            first = RequestGet('http://setup.roblox.com/version');
        }
        if (second != first && first != "undefined" && second != "undefined"){//if first and second is undefined then dont execute the code or if second isnt equals first then execute the code.
            let bxguild = client.guilds.cache.get("463072935414988820"), bxchannel;
            let shnguild = client.guilds.cache.get("849510862863204362"), shnchannel;
            const NewUpdateEmbed = new Discord.MessageEmbed();
            const NewUpdateEmbed2 = new Discord.MessageEmbed();
            NewUpdateEmbed.setColor("#8800ff");
            NewUpdateEmbed.setTitle("🔎 Um novo **UPDATE** do Roblox foi Detectado!");
            NewUpdateEmbed.setAuthor("Made by yFlame", "https://i.imgur.com/f21Y1jv.png");
            NewUpdateEmbed.setDescription("Nós achamos um novo **update** no Roblox, porfavor seja **paciente** enquanto os developers atualizam os **Exploits**, não abra **tickets** falando que seu **Exploit** está crashando. **Você foi avisado**!");
            NewUpdateEmbed.addFields({name:'Versão Anterior', value:`**${first}**`, inline:true},{name:'Versão Atual', value:`**${second}**`,inline:true},);
            NewUpdateEmbed.setTimestamp();
            NewUpdateEmbed.setFooter("Shiny's Roblox Update Notifier", "https://i.imgur.com/f21Y1jv.png");  
            bxchannel = bxguild.channels.cache.get("770762257558142986");
            console.log(`Old: ${first}\nNew: ${second}`);
            bxchannel.send(NewUpdateEmbed);
            NewUpdateEmbed2.setColor("#8800ff");
            NewUpdateEmbed2.setTitle("🔎 A new **UPDATE** of Roblox Detected!");
            NewUpdateEmbed2.setAuthor("Made by yFlame", "https://i.imgur.com/f21Y1jv.png");
            NewUpdateEmbed2.setDescription("We found a new **update** in Roblox, please be **patient** while the developers update **Exploits**, don't open **tickets** saying that your **Exploit** is crashing. **You have been warned**!");
            NewUpdateEmbed2.addFields({name:'Previous Version', value:`**${first}**`, inline:true},{name:'Current Version', value:`**${second}**`,inline:true},);
            NewUpdateEmbed2.setTimestamp();
            NewUpdateEmbed2.setFooter("Shiny's Roblox Update Notifier", "https://i.imgur.com/f21Y1jv.png");
            shnchannel = shnguild.channels.cache.get("860695008374161448");
            shnchannel.send(NewUpdateEmbed2);
            xmlHttp.abort();//abort request
            InitializeCheckUpdateLoop();//intialize the function again making a loop
        }
        else{
            xmlHttp.abort();//abort request
            InitializeCheckUpdateLoop();//intialize the function again making a loop
        }
    }, 1);//1 ms of delay
}
/*client.on('message', (message)=>{
    var prefix = "s!";
    if (!message.content.startsWith("s!")) return;
    var args = [];
    const argsTemp = message.content.slice(prefix.length).trim();
    do {    
        var match = regexp.exec(argsTemp);
        if (match != null) {
          args.push(match[1] ? match[1] : match[0]);
        }
    } while (match != null);
    const command_name = args.shift().toLowerCase();
    switch (command_name){
        case 'robloxversion':{
            const version = RequestGet("http://setup.roblox.com/version");
            message.channel.send(`A versão atual do Roblox é **${version.toLowerCase()}**`);
        } break;

        case 'cmds':
        case 'help':
        case 'ajuda':
        case 'commands':
        case 'comandos':{
            const helpembed = new Discord.MessageEmbed();
            helpembed.setColor("#8800ff");
            helpembed.setTitle("Aqui embaixo estão todos os comandos!");
            helpembed.setAuthor("Made by yFlame", "https://i.imgur.com/f21Y1jv.png");
            helpembed.addFields({name:'s!robloxversion', value:'Mostra a versão atual do Roblox!'},{name:'s!ping', value:'Mostra seu Ping e do Bot.'},);
            helpembed.setTimestamp();
            helpembed.setFooter("Shiny's Roblox Update Notifier", "https://i.imgur.com/f21Y1jv.png");
            message.channel.send(helpembed);
        } break;

        case 'ping':{
            message.channel.send(`Calculando o seu Ping...`).then(m =>{
                var ping = m.createdTimestamp - message.createdTimestamp;
                var botPing = Math.round(client.ws.ping);
                const pingembed = new Discord.MessageEmbed();
                pingembed.setColor("#8800ff");
                pingembed.setTitle("Ping calculado com sucesso!");
                pingembed.setAuthor("Made by yFlame", "https://i.imgur.com/f21Y1jv.png");
                pingembed.addFields({name:'Sua Latência', value:`**${ping}**ms`, inline:true},{name:'Minha Latência', value:`**${botPing}**ms`,inline:true},);
                pingembed.setTimestamp();
                pingembed.setFooter("Shiny's Roblox Update Notifier", "https://i.imgur.com/f21Y1jv.png");
                m.edit("",pingembed);
            });
        } break;
        
       
    }
});*/



client.login(""); //ur token here
