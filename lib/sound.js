// DEPRICATED
// For use with "cmdmp3"
// https://github.com/jimlawless/cmdmp3

const { exec } = require("child_process");

module.exports = function (sound) {
    exec(`cmdmp3\\cmdmp3 ${sound}`, (error, stdout, stderr) => {
    //exec(`dir`, (error, stdout, stderr) => {
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
};
