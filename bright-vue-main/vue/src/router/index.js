import { createWebHistory, createRouter } from "vue-router";
import Login_V from "@/Views/Login_V";
import Learn_V from "@/Views/Learn_V";
import Report_V from "@/Views/Report_V";
import Parts_V from "@/Views/Parts_V";
import Users_V from "@/Views/Users_V"
import Repairs_V from "@/Views/Repairs_V"

const routes = [
  { path: "/", component: Login_V },
  { path: "/learn", component: Learn_V },
  { path: "/login", component: Login_V },
  { path: "/report", component: Report_V },
  { path: "/parts", component: Parts_V },
  { path: "/users", component: Users_V },
  { path: "/repairs", component: Repairs_V },
];

const router = createRouter({
  history: createWebHistory(process.env.Base_URL),
  routes,
});

export default router;
