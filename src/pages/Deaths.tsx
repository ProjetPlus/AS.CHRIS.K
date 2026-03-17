import { Skull, Plus, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockDeaths } from "@/data/mockData";

const formatCFA = (n: number) => n.toLocaleString("fr-FR") + " FCFA";

const Deaths = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-bordeaux-dark">Décès & Versements</h1>
          <p className="text-sm text-muted-foreground mt-1">Suivi des décès et collecte des cotisations</p>
        </div>
        <Button className="bg-destructive hover:bg-destructive/90">
          <Plus className="h-4 w-4 mr-1" /> Déclarer un décès
        </Button>
      </div>

      <div className="space-y-3">
        {mockDeaths.map((death) => (
          <Card key={death.id} className="border-border/50 hover:shadow-sm transition-shadow cursor-pointer">
            <CardContent className="pt-4 pb-4 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-destructive-light shrink-0">
                <Skull className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{death.deceasedName}</p>
                  <Badge variant="outline" className={death.status === "en_cours" ? "bg-destructive-light text-destructive text-[10px]" : "bg-success-light text-success text-[10px]"}>
                    {death.status === "en_cours" ? "En cours" : "Clôturé"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {death.deceasedMemberId} — {death.type === "principal" ? "Membre principal" : "Membre secondaire"} — {new Date(death.dateOfDeath).toLocaleDateString("fr-FR")}
                </p>
                <div className="flex gap-4 mt-1 text-xs">
                  <span>Versement : <strong className="text-foreground">{formatCFA(death.payout)}</strong></span>
                  {death.retained > 0 && <span>Retenu : <strong className="text-accent">{formatCFA(death.retained)}</strong></span>}
                  <span>Collecté : <strong className="text-success">{formatCFA(death.totalCollected)}</strong> / {formatCFA(death.totalExpectedContributions)}</span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Deaths;
