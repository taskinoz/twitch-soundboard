const fs = require('fs');
const { exec } = require("child_process");
const playSound = require('./lib/sound.js');
const tmi = require('tmi.js');
const config = JSON.parse(fs.readFileSync('twitch-login.json','utf8'));

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

client.connect();
client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!fart') {
		client.say(channel, `Playing Fart Sound`);
    playSound("sounds/fart.mp3");
	}
});
