import { createBrowserRouter } from "react-router-dom";
import { Login, LoginAction } from "./routes/Login";
import { NotFoundPage } from "./routes/NotFoundPage";
import { UploadPage, UploadPageLoad } from "./routes/UploadPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UploadPage />,
    loader:UploadPageLoad
  },
  {
    path:"/login",
    action:LoginAction,
    element:<Login/>
  },
  // Agrega una ruta para manejar rutas no encontradas (404)
  {
    path: "*",
    element: <NotFoundPage />
  }
]);