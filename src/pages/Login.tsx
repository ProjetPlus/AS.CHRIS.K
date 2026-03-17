import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScanLine, LogIn, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import logo from "@/assets/logo-camp-bethel.png";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login — navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-creme flex items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <img src={logo} alt="Camp Béthel" className="w-24 h-24 rounded-full shadow-lg border-4 border-or/30" />
          <h1 className="text-xl font-display font-bold text-bordeaux-dark text-center leading-tight">
            CAMP BÉTHEL DE KOUASSIKANDRO
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Gestion de la mutuelle funéraire
          </p>
        </div>

        {/* Scanner Button */}
        <Button
          className="w-full h-14 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground shadow-md"
          onClick={() => navigate("/scanner")}
        >
          <ScanLine className="mr-2 h-5 w-5" />
          Scanner une carte
        </Button>

        {/* Separator */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Administration</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Login Form */}
        <Card className="w-full border-border/50 shadow-sm">
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Identifiant
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Votre identifiant"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 font-semibold">
                <LogIn className="mr-2 h-4 w-4" />
                Connexion
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-[10px] text-muted-foreground text-center">
          Mutuelle Funéraire — Camp Béthel de Kouassikandro<br />
          Région du Haut-Sassandra — Côte d'Ivoire
        </p>
      </div>
    </div>
  );
};

export default Login;
