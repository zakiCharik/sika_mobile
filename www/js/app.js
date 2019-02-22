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



var showQrScanner = function(){
    alert('window.QRscanner from scan page ',window.QRscanner);
  // For the best user experience, make sure the user is ready to give your app
  // camera access before you show the prompt. On iOS, you only get one chance.

  window.QRScanner.prepare(  function (err, status){
    if (err) {
     // here we can handle errors and clean up any loose ends.
     console.error(err);
    }
    if (status.authorized) {
    
        // Make the webview transparent so the video preview is visible behind it.
        window.QRScanner.show();
        // Be sure to make any opaque HTML elements transparent here to avoid
        // covering the video.    


        // Start a scan. Scanning will continue until something is detected or
        // `QRScanner.cancelScan()` is called.
        window.QRScanner.scan(displayContents);
         
        function displayContents(err, text){
          if(err){
            // an error occurred, or the scan was canceled (error code `6`)
          } else {
            // The scan completed, display the contents of the QR code:
            alert(text);
          }
        }

    } else if (status.denied) {
     // The video preview will remain black, and scanning is disabled. We can
     // try to ask the user to change their mind, but we'll have to send them
     // to their device settings with `QRScanner.openSettings()`.
    } else {
      // we didn't get permission, but we didn't get permanently denied. (On
      // Android, a denial isn't permanent unless the user checks the "Don't
      // ask again" box.) We can ask again at the next relevant opportunity.
    }
  }); // show the prompt

};


// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="scan-page"]', function (e) {

  document.addEventListener("deviceready", showQrScanner, false);

});




