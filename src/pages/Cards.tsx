import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockMembers } from "@/data/mockData";

const Cards = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-bordeaux-dark">Cartes à imprimer</h1>
      <p className="text-sm text-muted-foreground mt-1">Membres autorisés à l'impression</p>
    </div>
    <div className="space-y-2">
      {mockMembers.filter(m => m.status === "actif").map((m) => (
        <div key={m.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {m.firstName[0]}{m.lastName[0]}
            </div>
            <div>
              <p className="font-semibold text-sm">{m.lastName} {m.firstName}</p>
              <p className="text-xs text-accent">{m.memberId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] bg-or-light text-accent border-accent/20">Autorisé</Badge>
            <Button size="sm" variant="outline" className="text-xs h-8">
              <CreditCard className="h-3 w-3 mr-1" /> Imprimer
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Cards;
