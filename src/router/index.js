import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layout/MainLayout.vue";
import Weather from "../components/Weather.vue";
import Task from "../components/Task.vue"; // import the new Task component

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/", component: Weather },
      { path: "/task", component: Task }, // define the new route for Task
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
