// Dom7
var $$ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}
var listHistoriqueScan = Array();

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


// ----------------------------------------------------------------------------Save score after scan code bar 
var calculateScore = function(score){

  if (localStorage.getItem("LocalScore") == undefined) {
    localStorage.setItem("LocalScore", parseInt(score));
  }else{
    var _actuel = 0;
    _actuel = parseInt(localStorage.getItem("LocalScore"))+ parseInt(score);
    localStorage.setItem("LocalScore", _actuel);
  }
}
// ----------------------------------------------------------------------------Save the scan history after scan code bar finish
var saveHistory = function(arr){
  if (localStorage.getItem("HistoryScan") == undefined) {
    listHistoriqueScan.push({
     'date' : arr.split(';')[3],
     'score' : arr.split(';')[4],
     'product' : arr.split(';')[2],
    });
    console.log(listHistoriqueScan);
    localStorage.setItem("HistoryScan", listHistoriqueScan);
  }else{
    listHistoriqueScan.push({
     'date' : arr.split(';')[3],
     'score' : arr.split(';')[4],
     'product' : arr.split(';')[2],
    });
    localStorage.setItem("HistoryScan", listHistoriqueScan);
  }
}

var getHistory = function(){

  if (localStorage.getItem("HistoryScan") == undefined) {
    return JSON.parse(null);
  }else{
    return JSON.parse(localStorage.getItem("HistoryScan"));
  }
}

// ----------------------------------------------------------------------------Calling for the Scan and persisting data
function onDeviceReady () {
  cordova.plugins.barcodeScanner.scan(
     function (result) {
        //split the text to parst and get the calculated score
        var res = result.text.split(";");
        //persist score
        calculateScore(parseInt(res[4]));
        //Persist history scan
        saveHistory(result.text);
        //prompt
        alert("We got a barcode\n" +
               "APPLICATION NAME: " + res[0] + "\n" +
               "TYPE: " + res[1] + "\n" +
               "PRODUCT ID: " + res[2] + "\n" +
               "SCAN DATE: " + res[3] + "\n" +
               "SCAN SCORE: " + res[4] + "\n" +
               "Format: " + result.format + "\n" +
               "Cancelled: " + result.cancelled);

        this.app.router.navigate('/',
          {
            name: 'homepage'
          }
        );
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

// Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="scan-page"]', function (e) {
  setTimeout(function () {
          document.addEventListener('deviceready', onDeviceReady, false);
  }, 1000); 
});


// Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="profil-index"]', function (e) {
  // _pts-score
  $$('h1#_pts-score').text('');  
  
  //get the score
  var actuel = parseInt(localStorage.getItem("LocalScore"));
  console.log('actuel score', actuel);
  //append the result to the view  
  $$('h1#_pts-score').text(actuel);  
});


// Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="scan-history"]', function (e) {
  // _pts-score
  $$('ul#_list-history').text('');

  //get the score
  if (localStorage.getItem("HistoryScan") !== NaN) {

    console.log(listHistoriqueScan);
    listHistoriqueScan.forEach(function(item){
      $$('ul#_list-history').append('<li class="item-content"> Date :'+item.date +' Score:' +item.score+' <br> PRODUCT ID : ' +item.product+'</li>');          
    });
  }

  // $$('ul#_list-history').text(item);  
});



  