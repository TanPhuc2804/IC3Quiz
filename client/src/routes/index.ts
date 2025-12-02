
import Home from "../pages/Home"
import PaymentResult from "../pages/PaymentResult"
import AdminPage from "../pages/admin"
import Dashboard from "../pages/admin/Dashboard"
import Exam from "../pages/admin/Exam"
import QuestionPage from "../pages/admin/Question"
import User from "../pages/admin/User"
import AuthPage from "../pages/auth/AuthPage"
import ExamDetail from "../pages/user/exam/ExamDetail"
import ExamPage from "../pages/user/exam/ExamPage"
import ExamResult from "../pages/user/exam/ExamResult"
import PracticePage from "../pages/user/practice/PracticePage"

export const publicRoutes = [
    { path: "/", component: Home, isLayout: true },
    { path: "/exams", component: ExamPage, isLayout: true },
    { path: "/exams/:id", component: ExamDetail, isLayout: true },
    { path: "/exams/:id/practice", component: PracticePage, isLayout: true },
    { path: "/exams/:id/result", component: ExamResult, isLayout: true },
    { path: "/exams/user-result/:id", component: ExamResult, isLayout: true },
    { path: "/payment-result", component: PaymentResult, isLayout: true },
    { path: "/login", component: AuthPage, isLayout: false }

]


export const privateRoutes = [
    {
        path: "/admin",
        component: AdminPage,
        isAdmin: true,
        children: [
            { path: "user", page: User },
            { path: "exam", page: Exam },
            { path: "question", page: QuestionPage },
            { path: "account", page: QuestionPage },
            { path: "dashboard", page: Dashboard },
        ]
    }
]