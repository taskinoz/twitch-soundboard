const { exec } = require("child_process");



function playSound(sound) {
  exec(`cmdmp3\\cmdmp3 ${sound}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

playSound("sounds/fart.mp3");
