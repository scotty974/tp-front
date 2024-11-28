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
  import { register } from "@/lib/service"; // Service pour l'API
  
  function Register({ role }: { role: "user" | "admin" }) {
    // Initialisation du formulaire avec react-hook-form
    const form = useForm({
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
    });
  
    // Gestion de la soumission du formulaire
    const handleFormSubmit = async (data: any) => {
      try {
        const payload = {
          ...data,
          role, // Ajout du rôle à l'objet envoyé
        };
        const response = await register(payload); // Appel au service API
        console.log("Inscription réussie :", response);
        alert("Inscription réussie !");
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        alert("Erreur lors de l'inscription, veuillez réessayer.");
      }
    };
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Champ Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Nom d'utilisateur" {...field} />
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
                  <Input type="email" placeholder="Adresse email" {...field} />
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
                  <Input type="password" placeholder="Mot de passe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Bouton S'inscrire */}
          <Button type="submit" className="w-full">
            S'inscrire
          </Button>
        </form>
      </Form>
    );
  }
  
  export default Register;
  