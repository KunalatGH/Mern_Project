import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
} from "react-router-dom";

import router from "./routes/index.jsx";
import {Provider } from "react-redux";
import { store } from "./Store/store.js";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route path="" element={<Home />} />
//       <Route path="offer" element={<Offer />} />
//       <Route path="register" element={<Register />} />
//     </Route>
//   )
// );

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  // </StrictMode>
);
