
/* import/load module 'os' */
const os = require('os');
const homedir = os.homedir();
console.log('Platform', os.platform());
console.log('Arch', os.arch());
console.log('Homedir', homedir);
console.log('User Info', os.userInfo(homedir));

/* import/load module 'randid-generator' */
const randomID = require('@kai-mareving/randid-generator');
console.log('RANDOM ID: ', randomID(20));