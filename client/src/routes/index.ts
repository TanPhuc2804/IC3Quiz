import Home from "../pages/Home"
import Login from "../pages/auth/Login"
import ExamDetail from "../pages/user/ExamDetail"
import ExamPage from "../pages/user/ExamPage"

export const publicRoutes = [
    { path: "/", component: Home, isLayout: true },
    { path: "/exams", component: ExamPage, isLayout: true },
    { path: "/exams/:id", component: ExamDetail, isLayout: true },
    { path: "/login", component: Login, isLayout: false }
]


export const privateRoutes = [

]