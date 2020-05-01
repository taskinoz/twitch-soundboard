const fs = require('fs');
const { exec } = require("child_process");
const playSound = require('./lib/sound.js');
const tmi = require('tmi.js');
const sounds = JSON.parse(fs.readFileSync('config.json','utf8'));
const config = JSON.parse(fs.readFileSync('twitch-login.json','utf8'));

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

client.connect();
client.on('message', (channel, tags, message, self) => {
	//if(self) return;
	if (message.toLowerCase()==="!soundboard") {
		client.say(channel, "If you are a subscriber you can now play sounds on my computer. Use !sounds to see what you can play and !s to play them");
	}
	if (message.toLowerCase() === "!sounds"){
		client.say(channel, `The current sounds are: ${(soundList.toString()).replace(/,/g,", ")}`);
	}
	if ((message.toLowerCase()).includes('!s ') && message.length<=25) {
		// Subscriber/Mod Check
		if (tags.badges.subscriber>0|| tags.mod || tags.badges.broadcaster) {
			let soundReq = (message.toLowerCase()).split("!s ")[1];
			console.log(soundReq);
			if (soundList.includes(soundReq)){
				playSound(sounds[soundReq]);
				console.log(sounds[soundReq]);
			}
			else {
				client.say(channel, `"${soundReq}" is not included on the soundboard, see !sounds for a list of sounds`);
			}
		}
		else {
			client.say(channel, "Only subscibers can use the soundboard");
		}
	}
});
