"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Calendar, Layout, Box, LogOut, Menu } from "lucide-react";
export default function DashboardLayout({ children, onLogout }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = [
    { key: "jouers", label: "Jouers", href: "/dashboard/jouers", icon: Users },
    { key: "match", label: "Match", href: "/dashboard/match", icon: Calendar },
    {
      key: "planjeux",
      label: "PlanJeux",
      href: "/dashboard/planjeux",
      icon: Layout,
    },
    { key: "stock", label: "Stock", href: "/dashboard/stock", icon: Box },
  ];

  function handleLogout(e) {
    e.preventDefault();
    if (onLogout) return onLogout();
    // default placeholder: you can replace with next-auth signOut or your auth logic
    console.log("logout clicked");
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-52 transform bg-white border-r transition-transform duration-200 ease-in-out ${
          open ? "-translate-x-0" : "-translate-x-0 lg:translate-x-0"
        }`}
      >
        <div className="h-16 px-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
       
            <Link href="/" className="flex items-center space-x-2">
              <span className=" font-bold text-black text-4xl">
                 This
                <span className=" font-bold text-primary text-4xl"> Logo</span>
              </span>
            </Link>
          </div>
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setOpen(!open)}
            aria-label="Toggle sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {items.map((it) => {
            const ActiveIcon = it.icon;
            const active = pathname?.startsWith(it.href);
            return (
              <Link
                key={it.key}
                href={it.href}
                className={`flex  items-center gap-3 p-2 rounded-md text-sm font-medium hover:bg-gray-100 ${
                  active ? "bg-indigo-50 text-indigo-700" : "text-gray-700"
                }`}
              >
                <ActiveIcon
                  className={`h-4 w-4 ${
                    active ? "text-indigo-600" : "text-gray-400"
                  }`}
                />
                <span className="md:flex hidden" >{it.label}</span>
              </Link>
            );
          })}

          <div className="mt-4 border-t pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-2 rounded-md text-sm font-medium hover:bg-gray-100 text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Content area */}
      <div className="flex-1 min-h-screen pl-0 lg:pl-52">
        <header className="h-16 flex items-center justify-between px-6 border-b bg-white">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-md"
              onClick={() => setOpen(!open)}
              aria-label="Toggle sidebar"
            >
              <Menu size={18} />
            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
 <strong className="ml-1">Admin</strong>
            </div>
          </div>
        </header>

        <main className="p-3">{children}</main>
      </div>
    </div>
  );
}
