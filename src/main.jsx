import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import { Home } from './pages/Home.jsx';
import { StudentDashboard } from './pages/StudentDashboard.jsx';
import { ProfessorDashboard } from './pages/ProfessorDashboard.jsx';
import { ExamHistory } from './pages/ExamHistory.jsx';
import { Response } from './pages/Response.jsx';
import LoginPage from './pages/Login.jsx';
import { StudentLayout } from './pages/StudentLayout.jsx';
import { ProfessorLayout } from './pages/ProfessorLayout.jsx';
import { ExamData } from './pages/ExamData.jsx';
import { ExamDetail } from './pages/ExamDetail.jsx';
import { CreateExamPage } from './pages/CreateExam.jsx';

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
