// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Landing from "./pages/Landing/Landing.jsx";
// import Landing from "./pages/Landing/landing";
// import Signup from "./pages/Auth/Signup";
// import Payment from "./pages/Payment/Payment";
// import Orders from "./pages/Orders/Orders";
// import Cart from "./pages/Cart/Cart";
// import Results from "./pages/Results/Results";
// import ProductDetail from "./pages/ProductDetail/ProductDetail";
// import { CheckoutProvider, Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// // import { Elements } from "@stripe/react-stripe-js";
// // import { loadStripe } from "@stripe/stripe-js";
// function Routing() {
//   const stripePromise = loadStripe(
//     "pk_test_51RVLNOF5BV9uovddFeUdSImovJta20XdyjyYlzZBadU6MWNclhDsoBaMUQFzPwv3ZsegU4cHA0uB9BXCdBsaNRg100HGT4jH1x"
//   );

//   // const fetchClientSecret = () => {
//   //   return fetch("/create-checkout-session", { method: "POST" })
//   //     .then((response) => response.json())
//   //     .then((json) => json.checkoutSessionClientSecret);
//   // };
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/Auth" element={<Signup />} />
//         <Route
//           path="/Payments"
//           element={
//             <Elements
//               stripe={stripePromise}
//               // options={{ fetchClientSecret }}
//             >
//               <Payment />
//             </Elements>
//           }
//         />
//         <Route path="/Orders" element={<Orders />} />
//         <Route path="/Cart" element={<Cart />} />
//         <Route path="/category/:categoryName" element={<Results />} />
//         <Route path="/products/:productId" element={<ProductDetail />} />
//       </Routes>
//     </Router>
//   );
// }

// export default Routing;
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  redirect,
} from "react-router-dom";
import Landing from "./pages/Landing/landing";
import Signup from "./pages/Auth/Signup";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoutes from "./componenets/ProtectedRoutes";

const stripePromise = loadStripe(
  "pk_test_51RVLNOF5BV9uovddFeUdSImovJta20XdyjyYlzZBadU6MWNclhDsoBaMUQFzPwv3ZsegU4cHA0uB9BXCdBsaNRg100HGT4jH1x"
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/Auth",
    element: <Signup />,
  },
  {
    path: "/Payments",
    element: (
      <ProtectedRoutes msg={"You must login to pay"} redirect={"/Payments"}>
        <Elements stripe={stripePromise}>
          <Payment />
        </Elements>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/Orders",
    element: (
      <ProtectedRoutes
        msg={"You must log in to see your orders"}
        redirect={"/Orders"}
      >
        <Orders />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/Cart",
    element: <Cart />,
  },
  {
    path: "/category/:categoryName",
    element: <Results />,
  },
  {
    path: "/products/:productId",
    element: <ProductDetail />,
  },
]);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;
