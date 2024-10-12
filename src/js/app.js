import $$ from 'dom7';
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

var myApp = new Framework7({
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
  backendUrl:"http://localhost:8080/",
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
      //console.log(f7.device);
      if(f7.device.desktop){
        //app.init(f7);
      }
    }
  },
});

var evt = new Event('backbutton');
document.addEventListener("backbutton", tst, false);

function tst(e) {
  debugger
  if (myApp.sheet.get('.sheet-modal') && myApp.sheet.get('.sheet-modal').opened) myApp.sheet.close()
  else myApp.router.back()
}


$$('.backBtn').on('click', function() {
  document.dispatchEvent(evt)
})

$$(document).on('page:init', '.page[data-page="home"]', function (e) {
  //console.log('init')
  //console.log('e',e)
})  
$$(document).on('page:init', '.page[data-page="registration"]', function (e) {
  $$('form.form-ajax-submit').on('formajax:success', function (e) {
    var xhr = e.detail.xhr;
    var data = e.detail.data;
    console.log("here");
  });
  var _name="steven";
  $$('#btnSubmitRegistration').on('click',function(e){
    console.log(app);
    /*app.request.post('http://localhost:8080/customer/addNew', { username:_name, password: 'bar' }, function (data) {
      //$$('.login').html(data);
      console.log(data);
    });*/
    //alert(myApp.router);
    $$('#currentURL').val(myApp.origin);
    
    console.log(myApp.views.main.router.currentRoute);
    var asd=myApp.form.getFormData($$("#registrationForm"));
    console.log(asd);
    $$('form.form-ajax-submit').on('formajax:success', function (e) {
      var xhr = e.detail.xhr;
      var data = e.detail.data;
      console.log("here");
    });
    $$('#registrationForm')[0].submit();
    /*$$.ajax({
      url:"http://localhost:8080/customer/addNew",
      data:{ username:_name, password: 'bar' },
      type:'POST',
      beforeSend:function(){
      //myApp.showPreloader('Please Wait');
      },
      success:function(data)
      {
          //myApp.hidePreloader();
          console.log(data);
          if(data =='success')
          {
  
              alert('success');
          }
          else
          {
              alert('no data');
          }
  
      }
      }); */




    alert("Registration Complete");
    //registrationForm
    //var asd=registrationPage.form.convertToData($$('#registrationForm'));
    //console.log(asd);
    $$("#registrationForm").trigger('submit');
    app.views.main.router.navigate('/', {reloadCurrent: true});
  });


})

