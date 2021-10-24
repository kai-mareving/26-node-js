//* IMAGE WATERMARKING with Jimp (load with cmd: node app.js ) */
const Jimp = require('jimp');
const inquirer = require('inquirer');
const fs = require('fs');

const addTextWatermarkToImage = async function(inputFile, outputFile, text) {
  const image = await Jimp.read(inputFile);
  //# FONT STYLES
  // const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
  const textData = {
    text,
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
  };

  image.print(font, 0, 0, textData, image.getWidth(), image.getHeight());
  await image.quality(100).writeAsync(outputFile);
};


//* ADD IMAGE WATERMARK */
const addImageWatermarkToImage = async function(inputFile, watermarkFile, outputFile) {
  const image = await Jimp.read(inputFile);
  const watermark = await Jimp.read(watermarkFile);
  const x = image.getWidth() / 2 - watermark.getWidth() / 2;
  const y = image.getHeight() / 2 - watermark.getHeight() / 2;

  image.composite(watermark, x, y, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 0.5,
  });
  await image.quality(100).writeAsync(outputFile);
};

prepareOutputFilename = (inputFile) => {
  const [name, ext] = inputFile.split('.');
  return `./img/${name}-with-watermark.${ext}`;
};

const startApp = async () => {
  /* ask if user ready */
  const answer = await inquirer.prompt([
    {
      name: 'start',
      message:
        'Welcome to "Watermark generator". Copy your image files to `/img` folder to use them in the app. Are you ready?',
      type: 'confirm',
    },
  ]);

  /* if answer is no */
  if (!answer.start) process.exit();

  /* ask for input file and watermark type */
  const options = await inquirer.prompt([
    {
      name: 'inputFile',
      type: 'input',
      message: 'What file do you want to mark?',
      default: 'test.jpg',
    },
    {
      name: 'watermarkType',
      type: 'list',
      choices: ['Text watermark', 'Image watermark'],
    },
  ]);

  try {
    throw (fs.existsSync(`./img/${options.inputFile}`));
  } catch (err) {
    console.log('Oops, something went wrong! Please try again');
  }

  if (options.watermarkType === 'Text watermark') {
    const text = await inquirer.prompt([
      {
        name: 'value',
        type: 'input',
        message: 'Type your watermark text:',
      },
    ]);
    options.watermarkText = text.value;

    if (fs.existsSync(`./img/${options.inputFile}`)) {
      addTextWatermarkToImage(
        './img/' + options.inputFile,
        prepareOutputFilename(options.inputFile),
        options.watermarkText
      );
      console.log('Text watermark added to image!');
      startApp();
    }
  }
  else {
    const image = await inquirer.prompt([
      {
        name: 'filename',
        type: 'input',
        message: 'Type your watermark file name:',
        default: 'logo.jpg',
      },
    ]);
    options.watermarkImage = image.filename;

    try {
      throw (fs.existsSync(`./img/${options.watermarkImage}`));
    } catch (err) {
      console.log('Oops, something went wrong! Please try again 2');
    }
    if (fs.existsSync(`./img/${options.watermarkImage}`)) {
      addImageWatermarkToImage(
        './img/' + options.inputFile, /* inputFile */
        './img/' + options.watermarkImage, /* watermarkFile */
        prepareOutputFilename(options.inputFile) /* outputFile */
      );
      console.log('Image watermark added to image!');
      startApp();
    }
  }
};

startApp();
