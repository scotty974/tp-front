"use client";
import { User, UserPen } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="flex w-full min-h-screen gap-4">
        <div className="w-1/2 flex justify-end items-center">
          <Link href={"/admin"} className="shadow-md w-20 h-20 rounded-md flex flex-col gap-2 justify-center items-center hover:bg-slate-50 cursor-pointer">
            <UserPen />
            <span>Admin</span>
          </Link>
        </div>

        <div className="w-1/2 flex justify-start items-center ">
          <Link href={"/client"} className="shadow-md w-20 h-20 rounded-md flex flex-col gap-2 justify-center items-center hover:bg-slate-50 cursor-pointer">
            <User />
            <span>Client</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
