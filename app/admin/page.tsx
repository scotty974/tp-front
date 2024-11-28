"use client";

import Login from "@/components/Login";
import Register from "@/components/Register";

function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="flex w-full min-h-screen gap-4">
        <div className="w-1/2 flex flex-col justify-center items-center gap-2">
          <h3 className="font-bold">S'inscrire</h3>
          <Register role="admin"></Register>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center gap-2">
          <h3 className="font-bold">Se connecter</h3>
          <Login role="admin"></Login>
        </div>
      </section>
    </main>
  );
}

export default Page;
