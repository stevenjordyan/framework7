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
  name: 'CNY Education', // App name
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
  //console.log(myApp.params["backendUrl"]);
  //console.log(sessionStorage);
  var swiper = myApp.swiper.get('#menuSwiper');
  var indicesToRemove = [];
  //console.log($$(swiper.slides).hasClass('.needLogin'));
  swiper.slides.forEach(function(slide,index){
    if($$(slide).hasClass('needLogin') && sessionStorage.length==0){
      var slideIndex = swiper.slides.indexOf(slide);
      indicesToRemove.push(slideIndex);
    }
    if($$(slide).hasClass('afterLogin') && sessionStorage.length>0){
      var slideIndex = swiper.slides.indexOf(slide);
      if (slideIndex !== -1) {
        indicesToRemove.push(swiper.slides.indexOf(slide));
      }
    }
  });
  indicesToRemove.sort(function(a, b) { return b - a; });
  indicesToRemove.forEach(function (index) {
    swiper.removeSlide(index);
  });
  swiper.update();

  /*var slidesToRemove = $$('.needLogin'); 
  console.log(slidesToRemove);
  slidesToRemove.each(function (index, slide) {
    // Get the index of the slide to remove
    var slideIndex = swiper.slides.indexOf(slide[0]); // Get the native DOM element
    console.log(swiper.slides[slideIndex]);
    // Remove the slide by index
    if (slideIndex !== -1) {
      swiper.removeSlide(slideIndex);
    }
  });
  swiper.update();*/
  $$('#btnLogin').on('click',function(e){
    var formData = new FormData(document.getElementById('loginForm'));
    fetch(myApp.params["backendUrl"]+'frontLogin/create', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.status==201){
        sessionStorage.setItem('userSession', JSON.stringify({
          name: data.userdata.name,
          email:data.userdata.email,
          logedIn:1,
          customerID:data.userdata.IDCustomer
        }));

        myApp.dialog.alert(data.messages.success);
        myApp.loginScreen.close();
        myApp.views.main.router.navigate('/', {reloadCurrent: true});

      }else{
        myApp.dialog.alert(data.messages.success);
      }
      
      //myApp.dialog.alert('Registrasi Berhasil, silahkan Login untuk melanjutkan.');
      //myApp.views.main.router.navigate();
      //myApp.views.main.router.navigate('/', {reloadCurrent: true});
    })
    .catch(error => {
      console.error(error);
      myApp.dialog.alert('Failed to Login');
      
    });
  });
  $$('#btnLogout').on('click',function(e){
    myApp.dialog.alert('Anda sudah logout, silahkan login kembali');
    sessionStorage.clear();
    myApp.views.main.router.navigate('/', {reloadCurrent: true});
  });

})
/*$$('form#registrationForm').on('formajax:success', function (e) {
  var xhr = e.detail.xhr;
  var data = e.detail.data;
  alert("Registration Complete");
}); */
$$(document).on('page:init', '.page[data-page="registration"]', function (e) {
  /*$$('form.form-ajax-submit').on('formajax:success', function (e) {
    var xhr = e.detail.xhr;
    var data = e.detail.data;
    console.log("here");
    alert("registration inside complete");
  });*/
  var _name="steven";
  $$('#btnSubmitRegistration').on('click',function(e){
    //console.log(app);
    /*app.request.post('http://localhost:8080/customer/addNew', { username:_name, password: 'bar' }, function (data) {
      //$$('.login').html(data);
      console.log(data);
    });*/
    //alert(myApp.router);
    $$('#currentURL').val(myApp.origin);
    var formData = new FormData(document.getElementById('registrationForm'));
    fetch(myApp.params["backendUrl"]+'customerAPI/create', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      myApp.dialog.alert('Registrasi Berhasil, silahkan Login untuk melanjutkan.');
      //myApp.views.main.router.navigate();
      myApp.views.main.router.navigate('/', {reloadCurrent: true});
    })
    .catch(error => {
      console.error(error);
      myApp.dialog.alert('Failed to submit the form.');
      
    });
    //console.log(myApp.request());
    //alert("click submit");
    //myApp.post('http://localhost:8080/customerAPI/create', {Name:'foo', Password: 'bar'}, function (data) {
      //$$('.login').html(data);
    //  console.log('Load was performed');
    //});
    
    
    //$$('#registrationForm')[0].submit();
    
    
    
    
    
    //myApp.views.main.router.navigate('/', {reloadCurrent: true});
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




    
    //registrationForm
    //var asd=registrationPage.form.convertToData($$('#registrationForm'));
    //console.log(asd);
    //$$("#registrationForm").trigger('submit');
    //app.views.main.router.navigate('/', {reloadCurrent: true});
  });
  

})

$$(document).on('page:init', '.page[data-page="payment"]', function (e) {
  
  var sessionData = JSON.parse(sessionStorage.getItem('userSession'));
  //console.log(sessionData.customerID);
  var formdata = new FormData();
  formdata.append("CustomerID", sessionData.customerID);
  fetch(myApp.params["backendUrl"]+'frontInvoice/create', {
    method: 'POST',
    body: formdata
  })
  .then(response => response.json())
  .then(data => {
    if(data.data.invoices && data.status==201){
      data.data.invoices.forEach(element => {
        $$('#listInvoice').append('<li>\
          <a class="item-link item-content" data-popup=".demo-popup" name="listInv" id="listInvoice'+element.ID+'" \
          data-invNo="'+element.InvoiceNumber+'" data-invDate="'+element.InvoiceDate+'" data-invCustomerName="'+element.Name+'" \
          data-invCustomerEmail="'+element.Email+'" data-invDueDate="'+element.DueDate+'" data-invPaymentAccount="'+element.AccountNumber+'" \
          data-invPaymentDescription="'+element.PaymentName+'" data-invNotes="'+element.Notes+'" data-invTotal="'+element.Amount+'" data-invID="'+element.ID+'">\
            <div class="item-inner"><div class="item-title-row">\
              <div class="item-title">Invoice</div>\
              <div class="item-after">'+element.InvoiceDate+'</div></div>\
              <div class="item-subtitle">New invoice from '+element.UpdatedBy+'</div>\
              <div class="item-text">'+element.Notes+'</div>\
              </div>\
          </a></li>');
          
      });
    }
    //myApp.dialog.alert('Registrasi Berhasil, silahkan Login untuk melanjutkan.');
    //myApp.views.main.router.navigate();
    //myApp.views.main.router.navigate('/', {reloadCurrent: true});
  })
  .catch(error => {
    console.error(error);
    myApp.dialog.alert('Failed to load the data.');
  });
  
})


$$(document).on('page:afterin', '.page[data-page="payment"]', function (e) {
  var linkInvoices=$$('a[name=listInv]');
  var sessionData = JSON.parse(sessionStorage.getItem('userSession'));
  linkInvoices.each(function(){
    $$(this).on('click',function(){
      $$('#pInvoiceNo').html($$(this).attr("data-invNo"));
      $$('#pInvoiceDate').html($$(this).attr("data-invDate"));
      $$('#pInvoiceName').html($$(this).attr("data-invCustomerName"));
      $$('#pInvoiceEmail').html($$(this).attr("data-invCustomerEmail"));
      $$('#pDueDate').html($$(this).attr("data-invDueDate"));
      $$('#pPaymentMethod').html($$(this).attr("data-invPaymentAccount")+"</br>"+$$(this).attr("data-invPaymentDescription"));
      $$('#pNotes').html($$(this).attr("data-invNotes"));
      var number = Number($$(this).attr("data-invTotal").replace(/[^0-9.-]+/g,""));
      $$('#pAmount').html(number.toLocaleString());
      $$('#pAmountTotal').html(number.toLocaleString());
      
      $$('#idInvoice').val($$(this).attr("data-invID"));
      $$('#amount').val(number);
      $$('#email').val(sessionData.email);
      //console.log(myApp);
      var popupInvoice=myApp.popup.get('#popupInvoice');
      myApp.popup.open($$('#popupInvoice'),true,{
        animate:true,
        width:800,
        height:800
      });
    });
  });
  $$('#btnPrintInvoice').on("click",function(e){
    var div = document.getElementById('popupInvoice');
    var printWindow = window.open('', '', 'height=900,width=620');
    var clonedDiv = div.cloneNode(true);
    clonedDiv.querySelector('.navbar').remove();
    clonedDiv.querySelector('.customHeader').remove();
    printWindow.document.write(clonedDiv.innerHTML);
    printWindow.print();
  });
  $$('#btnUploadPayment').on("click",function(e){
    alert("upload payment");
    var formData = new FormData(document.getElementById('paymentForm'));
    const fileInput = document.getElementById('inputProof');
    formData.append('inputProof', fileInput.files[0]);
    console.log(formData);
    fetch(myApp.params["backendUrl"]+'frontPayment/create', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.status==201){
        
        myApp.dialog.alert(data.messages.success);
        //myApp.loginScreen.close();
        myApp.popup.close();
        myApp.views.main.router.navigate('/', {reloadCurrent: true});

      }else{
        myApp.dialog.alert(data.messages.success);
      }
      
      //myApp.dialog.alert('Registrasi Berhasil, silahkan Login untuk melanjutkan.');
      //myApp.views.main.router.navigate();
      //myApp.views.main.router.navigate('/', {reloadCurrent: true});
    })
    .catch(error => {
      console.error(error);
      myApp.dialog.alert('Failed to Upload');
      
    });
    
  });
  //const fileInput = document.getElementById('inputProof');
  $$('#inputProof').on('change',(e)=>{
    //alert();
  });

})
