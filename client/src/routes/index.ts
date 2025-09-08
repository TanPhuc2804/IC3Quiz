import MatchQuestinComponent from "../component/quiz/MatchQuestinComponent"
import Home from "../pages/Home"
import Login from "../pages/auth/Login"
import ExamDetail from "../pages/user/exam/ExamDetail"
import ExamPage from "../pages/user/exam/ExamPage"
import PracticePage from "../pages/user/practice/PracticePage"

export const publicRoutes = [
    { path: "/", component: Home, isLayout: true },
    { path: "/exams", component: ExamPage, isLayout: true },
    { path: "/exams/:id", component: ExamDetail, isLayout: true },
    { path: "/exams/:id/practice", component: PracticePage, isLayout: true },
    { path: "/login", component: Login, isLayout: false }

]


export const privateRoutes = [

]