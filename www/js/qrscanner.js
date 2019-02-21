


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



