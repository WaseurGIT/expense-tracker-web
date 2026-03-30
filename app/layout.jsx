// app/layout.jsx
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <AuthProvider>
          <div className="w-60 min-h-screen fixed left-0 top-0 bg-[#b9ecf9]">
            <Navbar />
          </div>

          <div className="ml-60 flex-1 p-6">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
