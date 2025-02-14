"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toogle";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const Header: React.FC = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user as User);
      } else {
        return;
      }
    };

    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="bg-primary p-4 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/" className="text-white text-lg font-bold">
            Home
          </Link>
          {user && (
            <Link href="/dashboard" className="text-white text-lg font-bold">
              Dashboard
            </Link>
          )}
        </div>
        <div className="flex space-x-4">
          {user ? (
            <Link href="/account" className="text-white text-lg font-bold">
              Account
            </Link>
          ) : (
            <Link href="/login" className="text-white text-lg font-bold">
              Login
            </Link>
          )}
          {user && <ThemeToggle />}
        </div>
      </div>
    </header>
  );
};

export default Header;
