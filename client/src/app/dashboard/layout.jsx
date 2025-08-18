// src/app/dashboard/layout.js
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout"; // the sidebar component
export const metadata = {
    title :'dashboard'
    
}
export default function DashboardRootLayout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
