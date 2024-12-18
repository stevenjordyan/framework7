
import HomePage from '../pages/home.f7';
import AboutPage from '../pages/about.f7';
import FormPage from '../pages/form.f7';
import CatalogPage from '../pages/catalog.f7';
import ProductPage from '../pages/product.f7';
import SettingsPage from '../pages/settings.f7';

import DynamicRoutePage from '../pages/dynamic-route.f7';
import RequestAndLoad from '../pages/request-and-load.f7';
import NotFoundPage from '../pages/404.f7';
import LogedinPage from '../pages/logedin.f7';
import Mailbox from '../pages/mailbox.f7';
import Mydata from '../pages/mydata.f7';
import Registration from '../pages/registration.f7';
import Payment from '../pages/payment.f7';
import University from '../pages/university.f7';
import Hskcenter from '../pages/hskcenter.f7';
import Testimoni from '../pages/testimoni.f7';
import Berita from '../pages/berita.f7';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  {
    path: '/product/:id/',
    component: ProductPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },
  {
    path: '/logedin/',
    component: LogedinPage,
  },
  {
    path: '/mailbox/',
    component: Mailbox,
  },
  {
    path: '/mydata/',
    component: Mydata,
  },
  {
    path: '/registration/',
    //component: Registration,
    url: 'http://app.cnyeducation.com',
    target:"_system",
  },
  {
    path: '/payment/',
    component: Payment,
  },
  {
    path: '/university/',
    component: University,
  },
  {
    path: '/hskcenter/',
    component: Hskcenter,
  },
  {
    path: '/testimoni/',
    component: Testimoni,
  },
  {
    path: '/berita/',
    component: Berita,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
  
];

export default routes;