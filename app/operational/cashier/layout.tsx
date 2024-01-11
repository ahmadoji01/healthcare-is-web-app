"use client";
import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/Dashboard/Loader";

import Header from "./common/Header";
import { ThemeProvider, createTheme } from "@mui/material";
import Sidebar from "./common/Sidebar";
import Footer from "./common/Footer";
import { DeleteModalContext, DeleteModalProvider } from "@/contexts/delete-modal-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState(createTheme({ palette: { mode: "light" } }));

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    const onStorageChange = () => {
      const item = localStorage.getItem("color-theme");
      const colorTheme = item ? JSON.parse(item) : "light";
      setTheme(createTheme({ palette: { mode: colorTheme } }));
    }
    window.addEventListener('storage', onStorageChange);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex h-screen overflow-hidden">
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                  <DeleteModalProvider>
                    <ThemeProvider theme={theme} >
                      <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                          {children}
                        </div>
                      </main>
                    </ThemeProvider>
                  </DeleteModalProvider>
                <Footer />
              </div>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}