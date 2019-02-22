// Dom7
var $$ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  name: 'SIKA', // App name  
  id: 'com.lineinteractive.ma',
  root: '#app',
  theme: theme,
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  on: {
    pageAfterIn: function() {
       app.view.main.history.pop();
       $$('.page-previous, .navbar-previous').remove();
    }, pageInit: function(){
       app.view.main.history.pop();
       $$('.page-previous, .navbar-previous').remove();
    }
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    // placementId: 'pltd4o7ibb9rc653x14',
  },
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/',
  preloadPreviousPage: false
});



// Login Screen Demo
$$('._button-sign').on('click', function () {
  console.log(app.routes[0]);
  var router = app.router;
  console.log($$('#sika-username-2').val());
  console.log($$('#sika-password-2').val());
  

  mainView.router.load({url: 'index.html' , ignoreCache: true, reload: true }); 
  mainView.router.refreshPage();

});




// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="scan-page"]', function (e) {

   cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : true, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );

  // if (window.QRScanner !== undefined) {
  //   console.log('window.QRscanner from scan page',window.QRscanner);
  //   // Make the webview transparent so the video preview is visible behind it.
  //   window.QRScanner.show();
  //   // Be sure to make any opaque HTML elements transparent here to avoid
  //   // covering the video.    


  //   // Start a scan. Scanning will continue until something is detected or
  //   // `QRScanner.cancelScan()` is called.
  //   window.QRScanner.scan(displayContents);
     
  //   function displayContents(err, text){
  //     if(err){
  //       // an error occurred, or the scan was canceled (error code `6`)
  //     } else {
  //       // The scan completed, display the contents of the QR code:
  //       alert(text);
  //     }
  //   }
     
  // }else{
  //   alert('QRScanner undefined');
  // }
})

