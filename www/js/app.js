// Dom7
var $ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
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
    pageInit: function () {
        console.log('in user checking logged');
        console.log(document.location.pathname);
        var userid = window.localStorage.getItem('ls_userid');
        console.log(userid);
        if (userid !== undefined) {
          return userid;
        }      
        else{
          router.navigate({name: '/login/'});
        }
    }
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});
