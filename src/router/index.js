import Vue from "vue";
import VueRouter from "vue-router";
import landingPage from "@/views/landingPage";
import blogHome from "@/views/blogHome";
import blogPost from "@/views/blogPost";
import energyPage from "@/views/energyPage";
import aboutPage from "@/views/aboutPage";
import contactPage from "@/views/contactPage";
import policyPage from "@/views/policyPage";
import lkuser from "@/views/lkuser";
import lkMain from "@/views/lkMain";
import simpleList from "@/views/simpleList";
import lkAbout from "@/views/lkAbout"
import lkadmin from "@/views/lkadmin"
import lkadminItem from "@/views/lkadminItem"
import page404 from "@/views/404";
import LoginPage from "@/views/LoginPage"
import forgotPassPage from "@/views/forgotPassPage"
import recoveryPassPage from "@/views/recoveryPassPage"
import registrationPage from "@/views/registrationPage"
import { VueResponsiveComponents } from "vue-responsive-components"
import approveMail from "@/views/approveMail"
import axiosAuth from '@/api/axios-auth'

Vue.use(VueResponsiveComponents);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: landingPage,
  },
  {
    path: "/blog/",
    name: "BlogHome",
    component: blogHome
  },
  {
    path: "/blog/:slug",
    name: "BlogPost",
    component: blogPost
  },
  {
    path: "/energy",
    name: "energyPage",
    component: energyPage
  },
  {
    path: "/home",
    name: "about",
    component: aboutPage
  },
  {
    path: "/contact",
    name: "contact",
    component: contactPage
  },
  {
    path: "/policy",
    name: "policy",
    component: policyPage
  },
  {
    path: "/sign-in",
    name: 'sign_in',
    component: LoginPage
  },
  {
    path: "/forgot-password",
    name: 'forgot_pass',
    component: forgotPassPage
  },
  {
    path: "/reset-password-with-token",
    name: 'reset_password',
    component: recoveryPassPage,
    props: (route) => ({ token: route.query.token })
  },
  {
    path: "/approve-mail",
    name: 'approve_mail',
    component: approveMail,
    props: (route) => ({ token: route.query.token })
  },
  {
    path: "/sign-up",
    name: 'sign_up',
    component: registrationPage
  },
  {
    path: "*",
    name: "404",
    component: page404
  },
  {
    path:"/lksettings",
    name:"lk",
    component: lkuser,
    meta: { requiresAuth: true }
  },
  {
    path:"/lkmain",
    name:"lk",
    component: lkMain,
    meta: { requiresAuth: true }
  },
  {
    path:"/list",
    name:"lk",
    component: simpleList,
    meta: { requiresAuth: true }
  }
  ,
  {
    path:"/lkabout",
    name:"lk",
    component: lkAbout
  }
  ,
  {
    path:"/lkadmin",
    name:"admin",
    component: lkadmin
  }
  ,
  {
    path:"/lkadmin/:item",
    name:"admin",
    component: lkadminItem
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
	let token = localStorage.getItem('token');
  let requireAuth = to.matched.some(record => record.meta.requiresAuth);
  let urlClosed = [
    '/sign-up',
    '/forgot-password',
    '/reset-password-with-token',
    '/approve-mail',
  ]
  
  if (!requireAuth) {
		next();
	}

	if (requireAuth && !token) {
		next('/sign-in');
	}

	if (to.path === '/sign-in' || to.path === '/sign-up') {
		if (token) {
			axiosAuth.get('/auth/verify').then(response => {
        if (response.data.valid === true) {
				  next(from);
        }
        else{
          next(to.path)
        }
			}).catch(() => {
				next();
			});
		}
		else {
			next();
		}
  }

  if ((urlClosed.indexOf(to.path) != -1) && token){
    next('/')
  }

	if (requireAuth && token) {
		axiosAuth.get('/auth/verify').then(response => {
			if (response.data.valid === true) {
        next();
      }
      else{
        next('/sign-in')
      }
		}).catch(() => {
			next('/sign-in');
		})
	}
});

export default router;
