"use client";
import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/Dashboard/Loader";

import Sidebar from "./common/sidebar";
import Header from "@/components/Dashboard/Header";
import { ThemeProvider, createTheme } from "@mui/material";
import { DoctorProvider, useDoctorContext } from "@/contexts/doctor-context";
import { VisitProvider } from "@/contexts/visit-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(createTheme({ palette: { mode: "light" } }));
  const {loading} = useDoctorContext();

  useEffect(() => {
    const onStorageChange = () => {
      const item = localStorage.getItem("color-theme");
      const colorTheme = item ? JSON.parse(item) : "light";
      setTheme(createTheme({ palette: { mode: colorTheme } }));
    }
    window.addEventListener('storage', onStorageChange);
  }, []);

  return (
    <html lang="en">
      <VisitProvider>
        <DoctorProvider>
          <body suppressHydrationWarning={true}>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {loading ? (
                <Loader />
              ) : (
                  <div className="flex h-screen overflow-hidden">
                    <Sidebar
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen} />
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                      <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                      <ThemeProvider theme={theme} >
                        <main>
                          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10" style={ { touchAction: 'none' } }>
                            {children}
                          </div>
                        </main>
                      </ThemeProvider>
                    </div>
                  </div>
              )}
            </div>
          </body>
        </DoctorProvider>
      </VisitProvider>
    </html>
  );
}