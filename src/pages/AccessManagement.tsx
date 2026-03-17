import { Shield, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const roles = [
  { name: "Admin Principal", user: "admin", role: "Super Administrateur", status: "actif" },
  { name: "Jean Gestionnaire", user: "jean_g", role: "Administrateur (Accès Total)", status: "actif" },
  { name: "Marie Lecture", user: "marie_l", role: "Accès Lecture Seule", status: "actif" },
  { name: "Paul Cotisations", user: "paul_c", role: "Cotisations uniquement", status: "actif" },
  { name: "Imprimerie Daloa", user: "imprimerie", role: "Imprimeur", status: "actif" },
];

const AccessManagement = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-bordeaux-dark">Gestion des accès</h1>
        <p className="text-sm text-muted-foreground mt-1">Comptes et rôles des utilisateurs</p>
      </div>
      <Button className="bg-primary hover:bg-primary/90">
        <Plus className="h-4 w-4 mr-1" /> Créer un compte
      </Button>
    </div>

    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Utilisateurs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {roles.map((r, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/30">
            <div>
              <p className="text-sm font-medium">{r.name}</p>
              <p className="text-xs text-muted-foreground">@{r.user} — {r.role}</p>
            </div>
            <Badge variant="outline" className="text-[10px] bg-success-light text-success border-success/20">{r.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

export default AccessManagement;
