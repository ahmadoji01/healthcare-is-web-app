"use client";
import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";

import { ThemeProvider, createTheme } from "@mui/material";
import { useUserContext } from "@/contexts/user-context";
import { VisitProvider } from "@/contexts/visit-context";
import { FrontDeskProvider } from "@/contexts/front-desk-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(createTheme({ palette: { mode: "light" } }));
  const {loading} = useUserContext();

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const onStorageChange = () => {
      const item = localStorage.getItem("color-theme");
      const colorTheme = item ? JSON.parse(item) : "light";
      setTheme(createTheme({ palette: { mode: colorTheme } }));
    }
    window.addEventListener('storage', onStorageChange);
  }, []);

  useEffect(() => {
    if ( typeof(sidebarExpanded) !== 'undefined' )
      localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <html lang="en">
      <VisitProvider>
        <FrontDeskProvider>
          <body suppressHydrationWarning={true}>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {loading ? (
                <Loader />
              ) : (
                <div className="flex h-screen overflow-hidden">
                  <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <ThemeProvider theme={theme} >
                      <main>
                        <div className="w-screen h-screen p-4 md:p-6 2xl:p-10">
                          {children}
                        </div>
                      </main>
                    </ThemeProvider>
                  </div>
                </div>
              )}
            </div>
          </body>
        </FrontDeskProvider>
      </VisitProvider>
    </html>
  );
}
