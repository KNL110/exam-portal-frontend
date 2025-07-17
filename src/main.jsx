import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import { Home } from './pages/Home.jsx';
import { StudentDashboard } from './pages/StudentDashboard.jsx';
import { ProfessorDashboard } from './pages/ProfessorDashboard.jsx';
import { ExamHistory } from './pages/ExamHistory.jsx';
import { Response } from './pages/Response.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <StudentDashboard />
    },
    {
        path: "/plogin",
        element: <ProfessorDashboard />
    },
    {
        path: "/login/examHistory",
        element: <ExamHistory />
    },
    {
        path: "/login/examHistory/response",
        element: <Response />
    }
]);
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
