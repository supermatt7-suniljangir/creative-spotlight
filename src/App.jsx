// eslint-disable-line no-unused-vars
import  { Toaster } from "react-hot-toast";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Dashboard from "./pages/Dashboard";
import UserProjects from "./pages/UserProjects";
import Project from "./pages/Project";
import ProjectEditor from "./pages/ProjectEditor";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Inbox from "./pages/Inbox";
import SearchPage from "./pages/SearchPage";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import PageNotFound from "./UI/PageNotFound";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route  index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
             <Route path="projects" element={<Navigate replace to="type/user"/>} />
             <Route path="projects/type/:projectsType" element={<UserProjects />} />
             <Route path="leaderboard"  element={<Leaderboard />}/>
             <Route path="inbox"  element={<Inbox />}/>
            <Route path="projects/:projectId" element={<Project />} />
            <Route path="editor/new" element={<ProjectEditor />} />
            <Route path="editor/edit/:projectId" element={<ProjectEditor />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="search" element={<SearchPage />} /> 

          </Route>
          <Route path="login" element={<Login />} /> 
          <Route path="signup" element={<SignUp />} /> 
        <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" gutter={12} containerStyle={{margin: '8px'}}
      toastOptions={{
        success:{
          duration: 3000,
        },
        error:{
          duration: 5000,
        },
        style:{
          fontSize: "16px",
          maxWidth: '500px', 
          padding: "16px", 
          backgroundColor: "var(--bg-secondary)", 
          color: "var(--color-light)"
        }
        
        }}/>
    </QueryClientProvider>
  );
}

export default App;
