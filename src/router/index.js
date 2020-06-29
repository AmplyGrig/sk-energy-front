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
import { Role } from '@/_helpers/role';
import lkTemplate from "@/views/lkTemplate";
import lkAdminTemplate from "@/views/lkAdminTemplate";
import lkNotify from "@/views/lkNotify";

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
    path: "/api/reset-password",
    name: 'reset_password',
    component: recoveryPassPage,
    props: (route) => ({ token: route.query.token })
  },
  {
    path: "/api/approve-email",
    name: 'approve_email',
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
    path:"/lk", 
    name:"lk",
    component: lkTemplate,
    children: [
      { path: "", component: lkMain, meta: { requiresRole: [Role.user]} },
      { path: "main/:item", component: lkMain, meta: { requiresRole: [Role.user]} },
      { path: "about", component: lkAbout, meta: { requiresRole: [Role.user]} },
      { path: "notify", component: lkNotify, meta: { requiresRole: [Role.user]} },
      { path: "settings", component: lkuser, meta: {  requiresRole: [Role.user]} },
    ],
    
  },
  {
    path:"/lkadmin", 
    name:"lkadmin",
    component: lkAdminTemplate,
    children: [
      { path: "", component: lkadmin, meta: { requiresRole: [Role.admin]} },
      { path: ":item", component: lkadminItem, meta: { requiresRole: [Role.admin]} },
    ],
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const urlClosed = [
  '/sign-up',
  '/forgot-password',
  '/reset-password-with-token',
  '/approve-mail',
]

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');

  let requireRole = to.meta.requiresRole;
  
  if (!requireRole) {
		next();
	}

	if (requireRole && !token) {
		next('/sign-in');
	}

	if (to.path === '/sign-in' || to.path === '/sign-up' || (urlClosed.indexOf(to.path) != -1)) {
		if (token) {
			axiosAuth.get('/api/verify').then(response => {
        if (response.data.valid === true) {
				  next(from);
        }
        else{
          next()
        }
			}).catch(() => {
				next();
			});
		}
		else {
			next();
		}
  }

  if (typeof requireRole !== 'undefined') {
    axiosAuth.get('/api/verify').then(response => {
      if (response.data.valid === false){
          next('/sign-in')
      }
    }).catch(() => {
        next('/sign-in');
    })
    axiosAuth.get('/api/me').then(response => {
      if (response.data.me.role[0] === requireRole[0]){
        next()
      }
    }).catch(() =>{
      next(false)
    })
  }
});

export default router;
