import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/",
    name: "front-page",
    component: () => import("./components/ArticleList")
  },
  {
    path: "/treatment/get/:id",
    name: "article-details",
    component: () => import("./components/ArticleDetail")
  },
  {
    path: "/treatment/list",
    name: "article_list",
    component: () => import("./components/ArticleList")
  },
  {
    path: "/treatment/edit",
    name: "article_add",
    component: () => import("./components/EditArticle")
  },
  {
    path: "/treatment/edit/:id",
    name: "article_edit",
    component: () => import("./components/EditArticle")
  },
  {
    path: "/treatment/buy",
    name: "medicine_by",
    component: () => import("./components/MedicineBuy")
  },
  {
    path: "/user/login",
    name: "user_login",
    component: () => import("./components/UserLogin")
  },
  {
    path: "/user/register",
    name: "user_register",
    component: () => import("./components/UserRegister")
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;