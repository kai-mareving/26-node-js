const os = require('os'); /* import/load module 'os' in this const */
const homedir = os.homedir();
console.log('Platform', os.platform());
console.log('Arch', os.arch());
console.log('Homedir', homedir);
console.log('User Info', os.userInfo(homedir));