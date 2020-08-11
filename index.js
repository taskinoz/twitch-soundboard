const fs = require('fs');
const { exec } = require("child_process");
const playSound = require('mp3wav');
const tmi = require('tmi.js');
const chalk = require('chalk');
const sounds = JSON.parse(fs.readFileSync('config.json','utf8'));
const config = JSON.parse(fs.readFileSync('twitch-login.json','utf8'));
var rand = function (r){return Math.floor(Math.random()*r);}
var timer = 0;
var timeout = false;

// Chalk Colours
const cColours = ["red","green","yellow","blue","magenta","cyan","redBright","greenBright","yellowBright","blueBright","magentaBright","cyanBright"];

// Welcome Message
const welcome = `
 ___         _    _         _
\|_ _\| _ _ _ <_> _\| \|_  ___ \| \|_
 \| \| \| \| \| \|\| \|  \| \|  / \| '\| . \|
 \|_\| \|__/_/ \|_\|  \|_\|  \\_\|_.\|_\|_\|
 ___                   _  _                     _
/ __> ___  _ _ ._ _  _\| \|\| \|_  ___  ___  _ _  _\| \|
\\__ \\/ . \\\| \| \|\| ' \|/ . \|\| . \\/ . \\<_> \|\| '_>/ . \|
<___/\\___/\`___\|\|_\|_\|\\___\|\|___/\\___/<___\|\|_\|  \\___\|

`;

// Create a list of sounds form thhe JSON
var soundList = [];
for(var k in sounds) soundList.push(k);

// Twitch Client Info
const client = new tmi.Client({
	options: { debug: false },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: config.username,
		password: config.oauth
	},
	channels: config.channels
});

setInterval(function(){
	client.say(channel, "If you are a subscriber you can now play sounds on my computer. Use !sounds to see what you can play and !s to play them");
},1000*60*5);

setInterval(function(){
	if (timeout && timer<30) {
		timer++
	}
	else {
		timeout = false;
		timer = 0;
	}
},1000);

client.connect(console.log(welcome));
client.on('message', (channel, tags, message, self) => {
	//if(self) return;
	//console.log(tags);
	if (message.toLowerCase()==="!soundboard") {
		client.say(channel, "If you are a subscriber you can now play sounds on my computer. Use !sounds to see what you can play and !s to play them");
	}
	if (message.toLowerCase() === "!sounds"){
		client.say(channel, `The current sounds are: ${(soundList.toString()).replace(/,/g,", ")}`);
	}
	if ((message.toLowerCase()).slice(0, 3)==="!s " && message.length<=25 && !timeout) {
		// Subscriber/Mod Check
		if (tags['badge-info'] != null || tags.mod || tags.username===config.username) {
			let soundReq = (message.toLowerCase()).split("!s ")[1];
			if (soundList.includes(soundReq)){
				playSound(sounds[soundReq]);
				console.log(`${chalk[cColours[rand(cColours.length)]](tags.username)} played ${soundReq}.mp3`);
				timeout = true;
			}
			else {
				client.say(channel, `"${soundReq}" is not included on the soundboard, see !sounds for a list of sounds`);
			}
		}
		else {
			client.say(channel, "Only subscriber can use the soundboard");
		}
	}
	else if ((message.toLowerCase()).slice(0, 3)==="!s " && timeout) {
		client.say(channel, `The bot is on cooldown for another ${30-timer}s`);
	}
});
