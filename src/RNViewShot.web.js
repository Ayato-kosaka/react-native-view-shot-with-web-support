//@flow
import html2canvas from "html2canvas";

async function captureRef(view, options) {
  if (options.result === "tmpfile") {
    console.warn("Tmpfile is not implemented for web. Try base64 or file.\n" +
      "For compatibility, it currently returns the same result as data-uri");
  }

  const h2cOptions = {
    // default
    allowTaint: false,
    // default
    backgroundColor: "#ffffff",
    // default
    canvas: null,
    // don't use ForeignObject rendering if the browser supports it
    foreignObjectRendering: false,
    // default
    imageTimeout: 15000,
    // default
    ignoreElements: (element) => false,
    // Disable logging for debug purposes
    logging: false,
    // default
    onclone: null,
    // Url to the proxy which is to be used for loading cross-origin images. If left empty, cross-origin images won’t be loaded.
    proxy: null,
    // cleanup the cloned DOM elements html2canvas creates temporarily
    removeContainer: true,
    // default
    scale: undefined,
    // attempt to load images from a server using CORS
    useCORS: true,
    // default
    windth: undefined,
    // default
    height: undefined,
    // default
    x: undefined,
    // default
    y: undefined,
    // default
    scrollX: undefined,
    // default
    scrollY: undefined,
    // default
    windowWidth: undefined,
    // default
    windowHeight: undefined,
  };
  let renderedCanvas = await html2canvas(view, h2cOptions);

  if (options.width && options.height) {
    // Resize result
    const resizedCanvas = document.createElement('canvas');
    const resizedContext = resizedCanvas.getContext('2d');
    resizedCanvas.height = options.height;
    resizedCanvas.width = options.width;
    resizedContext.drawImage(renderedCanvas, 0, 0, resizedCanvas.width, resizedCanvas.height);
    renderedCanvas = resizedCanvas;
  }

  const dataUrl = renderedCanvas.toDataURL("image/" + options.format, options.quality);
  if (options.result === "data-uri" || options.result === "tmpfile") return dataUrl;
  return dataUrl.replace(/data:image\/(\w+);base64,/, '');
}

function captureScreen(options) {
  return captureRef(window.document.body, options);
}

function releaseCapture(uri) {
  throw new Error("Tmpfile is not implemented for web. Try base64 or file");
}

export default {
  captureRef,
  captureScreen,
  releaseCapture
}