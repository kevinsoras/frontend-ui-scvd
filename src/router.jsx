import { createBrowserRouter } from "react-router-dom";
import { Login, LoginAction } from "./routes/Login";
import { NotFoundPage } from "./routes/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Prueba</div>
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