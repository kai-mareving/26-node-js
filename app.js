//* IMAGE WATERMARKING with Jimp (load with cmd: node app.js ) */
const Jimp = require('jimp');

const addTextWatermarkToImage = async function(inputFile, outputFile, text) {
  const image = await Jimp.read(inputFile);

  //# FONT STYLES
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  // const font = await Jimp.loadFont(Jimp.FONT_SANS_14_BLACK);

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
    opacitySource: 0.4,
  });
  await image.quality(100).writeAsync(outputFile);
};


//# TEST IMAGES
// addTextWatermarkToImage('./images/test.jpg', './images/test-txtmark.jpg', 'Water Mark')
// addTextWatermarkToImage('./images/test1.jpg', './images/test1-txtmark.jpg', 'Water Mark')
// addTextWatermarkToImage('./images/test2.jpg', './images/test2-txtmark.jpg', 'Water Mark')
// addTextWatermarkToImage('./images/test3.jpg', './images/test3-txtmark.jpg', 'Water Mark')
// addTextWatermarkToImage('./images/test4.jpg', './images/test4-txtmark.jpg', 'Water Mark')

addImageWatermarkToImage('./images/test.jpg', './images/logo.jpg', './images/test-imgmark.jpg')
// addTextWatermarkToImage('./images/test.jpg', './images/test-imgmark.jpg', 'Water Mark')
