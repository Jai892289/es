// import "./globals.css";
// import { AuthProvider } from "./context/AuthContext";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <AuthProvider>{children}</AuthProvider>
//       </body>
//     </html>
//   );
// }


import "./globals.css"
import { AuthProvider } from "./context/AuthContext"
import { Poppins } from "next/font/google"
import { Toaster } from "react-hot-toast"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans min-h-screen overflow-x-hidden mx-2`}>
        <AuthProvider>{children}

                  <Toaster position="top-right" />

        </AuthProvider>
      </body>
    </html>
  )
}