function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

export const clipByName = function (ctx, clipObject) {
  this.setCoords();
  const clipRect = clipObject;
  const scaleXTo1 = 1 / this.scaleX;
  const scaleYTo1 = 1 / this.scaleY;
  ctx.save();

  const ctxLeft = -(this.width / 2) + clipRect.strokeWidth;
  console.log(ctxLeft, 'ctxLeft');
  const ctxTop = -(this.height / 2) + clipRect.strokeWidth;
  console.log(ctxTop, 'ctxTop');

  console.log(clipRect.width, "width")
  console.log(clipRect.height, "height");

  ctx.translate(ctxLeft, ctxTop);

  ctx.rotate(degToRad(this.angle * -1));
  ctx.scale(scaleXTo1, scaleYTo1);
  ctx.beginPath();
  ctx.rect(
    clipRect.left - this.oCoords.tl.x,
    clipRect.top - this.oCoords.tl.y,
    clipRect.width,
    clipRect.height
  );
  ctx.closePath();
  ctx.restore();
};

export function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString });
  return blob;
}
