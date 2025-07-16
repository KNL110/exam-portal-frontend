import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import { Home } from './pages/Home.jsx';
import { StudentDashboard } from './pages/StudentDashboard.jsx';
import { ProfessorDashboard } from './pages/ProfessorDashboard.jsx';

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
]);
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
