'use client';

import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";

import * as React from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import DarkModeSwitcher from "@/components/Operational/Header/DarkModeSwitcher";
import { PatientProvider } from "@/contexts/patient-context";

const fontFamily = {
  typography: {
    fontFamily: 'Satoshi, sans-serif',
  },
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState(createTheme({ palette: { mode: "light" } }, fontFamily));

  React.useEffect(() => {
    
    const onStorageChange = () => {
      const item = localStorage.getItem("color-theme");
      const colorTheme = item ? JSON.parse(item) : "light";
      setTheme(createTheme({ palette: { mode: colorTheme } }));
    }
    window.addEventListener('storage', onStorageChange);
  }, []);

  return (
    <html lang="en">
      <PatientProvider>
        <body className="dark">
          <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-screen">
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <div className="fixed top-[2%] right-[2%]">
                <DarkModeSwitcher />
              </div>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <main>
                  <div className="min-h-screen mx-auto max-w-screen-md p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </main>
              </ThemeProvider>
            </div>
          </div>
        </body>
      </PatientProvider>
    </html>
  );
}

export default Layout;