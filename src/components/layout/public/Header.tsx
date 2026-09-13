"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetMe, useLogout } from "../../../hooks/auth.hook";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
  ];

  const { data, isLoading } = useGetMe();
  const { mutate: Logout } = useLogout();
  const queryClient = useQueryClient()

  const handleLogOut = () => {
    Logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Tata",
          description: "Logged Out Successfully.",
          type: "success",
      
        });
        queryClient.removeQueries({queryKey:["user"]})
      },
      onError: () => {
        toast.add({
          title: "Log Out Failed",
          description: "Something Went Wrong.",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div>PH Healthcare</div>
        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}
        </nav>
        <div>
          {!isLoading && !data && (
            <Button
              variant="outline"
              render={<Link href="/login">Login</Link>}
              nativeButton={false}
            >
              login
            </Button>
          )}
          {!isLoading && data && (
            <Button onClick={handleLogOut} variant="destructive">
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
