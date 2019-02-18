
document.addEventListener("deviceready", loadQRScanner(), false);


function onDone(err, status){
  if (err) {
   // here we can handle errors and clean up any loose ends.
   console.error(err);
  }
  if (status.authorized) {
    // W00t, you have camera access and the scanner is initialized.
      // window.QRscanner.show() should feel very fast.


    // Make the webview transparent so the video preview is visible behind it.
    window.QRScanner.show(function(status){
      console.log(status);
    });
    // Be sure to make any opaque HTML elements transparent here to avoid
    // covering the video.    
  } else if (status.denied) {
   // The video preview will remain black, and scanning is disabled. We can
   // try to ask the user to change their mind, but we'll have to send them
   // to their device settings with `window.QRScanner.openSettings()`.
  } else {
    // we didn't get permission, but we didn't get permanently denied. (On
    // Android, a denial isn't permanent unless the user checks the "Don't
    // ask again" box.) We can ask again at the next relevant opportunity.
  }
} 

function displayContents(err, text){
  if(err){
    // an error occurred, or the scan was canceled (error code `6`)
  } else {
    // The scan completed, display the contents of the QR code:
    alert(text);
  }
}

function loadQRScanner(){

  // For the best user experience, make sure the user is ready to give your app
  // camera access before you show the prompt. On iOS, you only get one chance.
  console.info('First Call to Qr Scanner');

  console.log(window.QRScanner);

  window.QRScanner.prepare(onDone); // show the prompt

  // Start a scan. Scanning will continue until something is detected or
  // `window.QRScanner.cancelScan()` is called.
  window.QRScanner.scan(displayContents);

}