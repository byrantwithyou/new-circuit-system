import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import teacher from "@/components/teacher";
import student from "@/components/student";
import authoringTool from "@/components/authoringTool"
import authoringToolTest from "@/components/authoringToolTest"
import steps from "@/components/steps"
Vue.use(Router);

const routes = [
  {
    path: "/",
    component: HelloWorld
  },
  {
    path:"/steps",
    component:steps
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
  },
  {
    path:"/authoringToolTest",
    component:authoringToolTest
  }
];

const router = new Router({
  routes
});

export default router;
