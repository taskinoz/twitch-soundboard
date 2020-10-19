const fs = require('fs');
const http = require('http');
const StreamZip = require('node-stream-zip');

function chekFile(path) {
  try {
    if (fs.existsSync(path)) return true
    else return false
  } catch(err) {console.error(err)}
}
var download = function(url, dest, cb) {
  let file = fs.createWriteStream(dest);
  http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
}

function unZip() {
  const zip = new StreamZip({
      file: './build/cmdmp3.zip',
      storeEntries: true
  });

  zip.on('ready', () => {
    if (!chekFile('build/cmdmp3')) {fs.mkdirSync('build/cmdmp3');}
    zip.extract('cmdmp3.exe', 'build/cmdmp3/cmdmp3.exe', err => {
        console.log(err ? 'Extract error' : 'Extracted');
        zip.close();
    });
  });
}

if (chekFile("build/cmdmp3.zip")) {
  unZip();
  setTimeout(function() {
    fs.unlinkSync("build/cmdmp3.zip")
  },3000);
}
else {
  download("http://www.mailsend-online.com/wp/cmdmp3new.zip","build/cmdmp3.zip");
  setTimeout(function() {
    unZip()
  },2000);
  setTimeout(function() {
    fs.unlinkSync("build/cmdmp3.zip")
  },3000);
}

fs.copyFile('twitch-login.example.json', 'build/twitch-login.json', (err) => {
  if (err) throw err;
  console.log('Copied login config');
});
