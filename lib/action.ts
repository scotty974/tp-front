"use server";
import 'server-only'
import { cookies } from "next/headers";

export async function session(session: any) {
  (await cookies()).set("session", session, {
    path: "/",
    secure: true,
    sameSite: "strict",
    httpOnly : true
  });
}



import { jwtDecode } from 'jwt-decode';

export default async function useAuth() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("session");
  
  if (token) {
    const tokenValue = token.value;
    const decoded = jwtDecode(tokenValue);
    
    // Vérifier si decoded et decoded.exp sont définis
    if (decoded && decoded.exp) {
      const expirationTime = decoded.exp * 1000;
      const currentDate = Date.now();

      if (expirationTime < currentDate) {
        // Si le token a expiré, supprimez-le des cookies
        (await cookieStore).delete("session");
      }
    } else {
      console.error("Token JWT invalide: Propriété exp manquante");
    }
  }

  return token?.value;
}