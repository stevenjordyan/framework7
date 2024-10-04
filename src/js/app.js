import $ from 'dom7';
import Framework7, { getDevice } from 'framework7/bundle';

// Import F7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.scss';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';

// Import Routes
import routes from './routes.js';
// Import Store
import store from './store.js';

// Import main app component
import App from '../app.f7';

var device = getDevice();

var app = new Framework7({
  name: 'testing001', // App name
  theme: 'auto', // Automatic theme detection
  colors: {
    primary: '#f2d1d5',
  },

  el: '#app', // App root element
  component: App, // App main component
  // App store
  store: store,
  // App routes
  routes: routes,



  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova,
    scrollIntoViewCentered: device.cordova,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
        
      }
      
      //console.log(f7.device);
      if(f7.device.android){
        /*console.log("asd");
        console.log(f7);
        var mySwiper3 = f7.swiper.create('.swiperTestimoni', {
          pagination:'.swiperTestimoni .swiper-pagination',
          spaceBetween: 10,
          slidesPerView: 2,
          paginationHide: false,
        paginationClickable: true
        });
        console.log(mySwiper3);*/

      }
    },
  },
});
var evt = new Event('backbutton');
document.addEventListener("backbutton", tst, false);

function tst(e) {
  debugger
  if (app.sheet.get('.sheet-modal') && app.sheet.get('.sheet-modal').opened) app.sheet.close()
  else app.router.back()
}


$('.backBtn').on('click', function() {
  document.dispatchEvent(evt)
})

$(document).on('page:init', '.page[data-page="home"]', function (e) {
  console.log('init')
  console.log('e',e)
})  
