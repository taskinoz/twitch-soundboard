const fs = require('fs');
const { exec } = require("child_process");
const playSound = require('./lib/sound.js');
const tmi = require('tmi.js');
const sounds = JSON.parse(fs.readFileSync('config.json','utf8'));
const config = JSON.parse(fs.readFileSync('twitch-login.json','utf8'));
var timer = 0;
var timeout = false;

// Create a list of sounds form thhe JSON
var soundList = [];
for(var k in sounds) soundList.push(k);

// Twitch Client Info
const client = new tmi.Client({
	options: { debug: true },
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

client.connect();
client.on('message', (channel, tags, message, self) => {
	//if(self) return;
	console.log(tags);
	if (message.toLowerCase()==="!soundboard") {
		client.say(channel, "If you are a subscriber you can now play sounds on my computer. Use !sounds to see what you can play and !s to play them");
	}
	if (message.toLowerCase() === "!sounds"){
		client.say(channel, `The current sounds are: ${(soundList.toString()).replace(/,/g,", ")}`);
	}
	if ((message.toLowerCase()).slice(0, 3)==="!s " && message.length<=25 && !timeout) {
		// Subscriber/Mod Check
		if (tags['badge-info']>0|| tags.mod || tags.badges.broadcaster) {
			let soundReq = (message.toLowerCase()).split("!s ")[1];
			console.log(soundReq);
			if (soundList.includes(soundReq)){
				playSound(sounds[soundReq]);
				console.log(sounds[soundReq]);
				timeout = true;
			}
			else {
				client.say(channel, `"${soundReq}" is not included on the soundboard, see !sounds for a list of sounds`);
			}
		}
		else {
			client.say(channel, "Only subscibers can use the soundboard");
		}
	}
	else if ((message.toLowerCase()).slice(0, 3)==="!s " && timeout) {
		client.say(channel, `The bot is on cooldown for another ${30-timer}s`);
	}
});
