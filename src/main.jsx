import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Global CSS
import './index.css'
// home page
import { Home } from './pages/Home.jsx';
//Login page
import LoginPage from './pages/Login.jsx';
//Role based layout
import { StudentLayout } from './pages/StudentLayout.jsx';
import { ProfessorLayout } from './pages/ProfessorLayout.jsx';
//Professor pages import
import { ProfessorDashboard } from './pages/ProfessorPages/ProfessorDashboard.jsx';
import { CreateExamPage } from './pages/ProfessorPages/CreateExam.jsx';
import { ExamData } from './pages/ProfessorPages/ExamData.jsx';
import { ExamDetail } from './pages/ProfessorPages/ExamDetail.jsx';
//Student pages import
import { StudentDashboard } from './pages/StudentPages/StudentDashboard.jsx';
import { TakeExam } from './pages/StudentPages/TakeExam.jsx';
import { ExamHistory } from './pages/StudentPages/ExamHistory.jsx';
import { Response } from './pages/StudentPages/Response.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/student",
        element: <StudentLayout />,
        children: [
            {
                path: "",
                element: <StudentDashboard />
            },
            {
                path: "examHistory",
                element: <ExamHistory />
            },
            {
                path: "examHistory/response",
                element: <Response />
            },
            {
                path: "exam/:examID",
                element: <TakeExam />
            }
        ]
    },
    {
        path: "/professor",
        element: <ProfessorLayout />,
        children: [
            {
                path: "",
                element: <ProfessorDashboard />
            },
            {
                path: "creatExam",
                element: <CreateExamPage/>
            },
            {
                path: "examHistory",
                element: <ExamData />
            },
            {
                path: "examHistory/examDetails",
                element: <ExamDetail />
            }
        ]

    }
]);
createRoot(document.getElementById('root')).render(
    <StrictMode>
            <RouterProvider router={router} />
    </StrictMode>,
)
