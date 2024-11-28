import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { login } from "@/lib/service"; // Service pour l'API
import { redirect } from "next/navigation";
function Login({ role }: { role: "user" | "admin" }) {
  // Initialisation du formulaire avec react-hook-form
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      
    },
  });

  // Gestion de la soumission du formulaire
  const handleFormSubmit = async (data: any) => {
    try {
      const payload = {
        name: data.name,       // Ajout du name
        email: data.email,
        password: data.password,
        role : role
      };await login(payload);
      alert("Vous êtes connecté !");
      
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Une erreur est survenue !");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Champ Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Votre nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Champ Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Votre adresse email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Champ Mot de passe */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Votre mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bouton Se connecter */}
        <Button type="submit" className="w-full">
          Se connecter
        </Button>
      </form>
    </Form>
  );
}

export default Login;
