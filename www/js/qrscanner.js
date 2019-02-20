


var onDone = function(err, status){
  if (err) {
   // here we can handle errors and clean up any loose ends.
   console.error(err);
   alert(err);
  }
  if (status.authorized) {
    
    // W00t, you have camera access and the scanner is initialized.
    window.QRscanner.show(function(status){
      console.log(status);
    }); //should feel very fast.


    // Make the webview transparent so the video preview is visible behind it.
    QRScanner.show(function(status){
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

var displayContents = function(err, text){
  if(err){
    // an error occurred, or the scan was canceled (error code `6`)
    alert('an error occurred, or the scan was canceled : '+err);
    console.log(err);
  } else {
    // The scan completed, display the contents of the QR code:
    alert('SCANNED content : '+text);
    console.log(text);
  }
}

var loadQRScanner = function(){

  // For the best user experience, make sure the user is ready to give your app
  // camera access before you show the prompt. On iOS, you only get one chance.
  console.info('First Call to Qr Scanner');

  console.log(QRScanner);

  QRScanner.prepare(onDone); // show the prompt

}


var scanner = function(){
    // W00t, you have camera access and the scanner is initialized.
    QRscanner.show(function(status){
      // Start a scan. Scanning will continue until something is detected or
      // `window.QRScanner.cancelScan()` is called.
      alert('window.QR');
      window.QRScanner.scan(displayContents);  
      alert('QR only');
      QRScanner.scan(displayContents);
    }); //should feel very fast.
  
}


// waiting for the device to be ready
// Cordova Ready event listner
document.addEventListener("deviceready", loadQRScanner(), false);
