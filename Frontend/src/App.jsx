import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./shared/Navbar";
import SignUp from "./frontendComponents/auth/SignUp";
import Login from "./frontendComponents/auth/Login";
import Home from "./Home";
import AppLayout from "./AppLayout";
import Jobs from "./frontendComponents/NavbarComp/Jobs";

import Browse from "./frontendComponents/NavbarComp/Browse";
import Profile from "./frontendComponents/NavbarComp/profile/Profile";
import JobDescription from "./frontendComponents/NavbarComp/JobDescription";
import Companies from "./AdminComponent/Companies";
import CompanyCreate from "./AdminComponent/CompanyCreate";
import CompanySetup from "./AdminComponent/CompanySetup";
import AdminJobs from "./AdminComponent/AdminJobs";
import PostJob from "./AdminComponent/PostJob";
import ApplicantDetails from "./AdminComponent/ApplicantDetails";
import ProductRoute from "./AdminComponent/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/jobs",
          element: <Jobs />,
        },
        {
          path: "/browse",
          element: <Browse />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        { path: "jobs/description/:id", element: <JobDescription /> },
        { path: "browse/description/:id", element: <JobDescription /> },

        // admin
        {
          path: "/admin/companies",
          element: (
            <ProductRoute>
              <Companies />
            </ProductRoute>
          ),
        },
        {
          path: "/admin/companies/create",
          element: (
            <ProductRoute>
              <CompanyCreate />
            </ProductRoute>
          ),
        },
        {
          path: "/admin/companies/:id",
          element: (
            <ProductRoute>
              <CompanySetup />
            </ProductRoute>
          ),
        },
        {
          path: "/admin/jobs",
          element: (
            <ProductRoute>
              <AdminJobs />
            </ProductRoute>
          ),
        },
        {
          path: "/admin/jobs/create",
          element: (
            <ProductRoute>
              <PostJob />
            </ProductRoute>
          ),
        },
        {
          path: "/admin/jobs/:id/applicant",
          element: (
            <ProductRoute>
              <ApplicantDetails />
            </ProductRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
