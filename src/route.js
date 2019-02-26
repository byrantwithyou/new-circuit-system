import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import teacher from "@/components/teacher";
import student from "@/components/student";
import authoringTool from "@/components/authoringTool"
Vue.use(Router);

const routes = [
  {
    path: "/",
    component: HelloWorld
  },
  {
    path: "/student",
    component: student
  },
  {
    path: "/teacher",
    component: teacher
  },
  {
    path:"/authoringTool",
    component:authoringTool
  }
];

const router = new Router({
  routes
});

export default router;
