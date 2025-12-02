import React from "react";
import { ToastContainer } from "react-toastify";
import { Nunito } from "next/font/google";
import { AuthProvider } from "../app/contexts/authProvider";
import { FavouriteRecipesProvider } from "../app/contexts/favRecipesContext";
import Header from "../app/components/Header";
import "./../styles/global.css";
import "./register.css";
import "./login.css";
import "./account.css";
import "react-toastify/dist/ReactToastify.css";

const nunito = Nunito({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FavouriteRecipesProvider>
        <main className={`${nunito.variable} ${nunito.className}`}>
          <Header />
          <Component {...pageProps} />
        </main>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </FavouriteRecipesProvider>
    </AuthProvider>
  );
}

export default MyApp;
