import { Root } from "./root.tsx";
import { ErrorPage } from "./error-page.tsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CadastroClienteForm } from '../pages/CadastroCliente';

export default function Routes() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />
    },
    {
      path: "/cadastrocliente",
      element: <CadastroClienteForm.CadastroCliente />,
      errorElement: <ErrorPage />
    },
    {
      path: "/cadastroclientematerial",
      element: <CadastroClienteForm.CadastroClienteMaterial />,
      errorElement: <ErrorPage />
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


