<p align="center" style="text-align:center"><img width="256" height="299" src="https://raw.githubusercontent.com/taskinoz/twitch-soundboard/master/assets/icon-256.png" alt="Twitch Soundboard" /></p>

# Twitch Soundboard
Give your subscribers more ways to interact with you during your stream.

## Setup
Download the latest version from [releases](https://github.com/taskinoz/twitch-soundboard/releases)

Open the `twitch-login.json` file in a text editor and replace:
* `USERNAME` with your twitch username
* `OATH` with your oath key which you can get **[here](https://twitchapps.com/tmi/)**
* `CHANNEL` with your channel name

Fill the sounds folder with mp3's you want your viewers to be able to play

Run the `Soundboard.exe`

### Note
If you and to restrict who can use the soundboard open the `config.json` that was generated when running the application and set the people who can use it to `true`, or `false`
**Example:**
```json
"subscriber": true,
"vip": true,
"mods": true
```

## Twitch Commands
To play a sound use:
```
!s {soundname}
```

To list the sounds use:
```
!sounds
```

To get info about the soundboard use:
```
!soundboard
```

## Development
To play the audio via the command line you will need cmdmp3 which you can get [here](http://www.mailsend-online.com/wp/cmdmp3new.zip)

Install all the package dependencies with:
```
npm install
```

Run without compiling with:
```
npm index.js
```
**You will also need to rename `twitch-login.example.json` to `twitch-login.json` and add your channel and oath key**

Create a new build with:
```
npm run build
```
