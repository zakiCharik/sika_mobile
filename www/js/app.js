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
//detect error window
window.onerror = function(error, file, line) {
  alert(error + ", " + file + ", " + line);
}


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


var calculateScore = function(){
  localStorage.getItem("LocalScore");
    var name = input.input1;
    var value = result.text;

    var data = localStorage.getItem("LocalScore");
    console.log(data);
    data = JSON.parse(data);
    data[data.length] = [name, value];

    localStorage.setItem("LocalData", JSON.stringify(data));

}


function onDeviceReady () {
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
         "preferFrontCamera" : false, // iOS and Android
         "showFlipCameraButton" : true, // iOS and Android
         "prompt" : "Aim for the QR IMAGE", // supported on Android only
         "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
         "orientation" : "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
     }
  );

}

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="scan-page"]', function (e) {
  setTimeout(function () {
          document.addEventListener('deviceready', onDeviceReady, false);
  }, 2000); 
});



  