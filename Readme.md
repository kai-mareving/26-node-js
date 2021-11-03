### Simple nodeJS app

A simple image watermarking app build with __Jimp__ (_jimp@^0.6.4_) and random user generator using __FS__ and my own __randid generator__ (_@kai-mareving/randid-generator_)

### Usage

`npm init-project` and
- for userGenerator: `node userGenerator.js`,
- for random id: `node randomId.js`,
- for watermarking with Jimp: `node app.js`.

Users are generated to a __people.json__ file, randomId echos in console, watermarking interacts through console and saves to __/img__ folder.