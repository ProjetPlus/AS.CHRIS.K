import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockContributions, mockDeaths } from "@/data/mockData";

const statusConfig: Record<string, { label: string; className: string }> = {
  payé: { label: "Payé", className: "bg-success-light text-success" },
  non_payé: { label: "Non payé", className: "bg-destructive-light text-destructive" },
  partiel: { label: "Partiel", className: "bg-warning/10 text-warning" },
  exonéré: { label: "Exonéré", className: "bg-primary/10 text-primary" },
};

const Contributions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-bordeaux-dark">Cotisations</h1>
        <p className="text-sm text-muted-foreground mt-1">Suivi des cotisations par décès</p>
      </div>

      {mockDeaths.filter(d => d.status === "en_cours").map((death) => {
        const deathContributions = mockContributions.filter(c => c.deathId === death.id);
        return (
          <Card key={death.id} className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Coins className="h-4 w-4 text-accent" />
                Cotisations pour {death.deceasedName}
                <Badge variant="outline" className="text-[10px] bg-destructive-light text-destructive ml-auto">En cours</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {deathContributions.map((c) => {
                  const config = statusConfig[c.status];
                  return (
                    <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/30">
                      <div>
                        <p className="text-sm font-medium">{c.memberName}</p>
                        <p className="text-xs text-muted-foreground">{c.memberId} — {c.paymentMethod}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-display font-bold text-accent">
                          {c.amount.toLocaleString("fr-FR")} / {c.expectedAmount.toLocaleString("fr-FR")} FCFA
                        </span>
                        <Badge className={`text-[10px] ${config.className}`}>{config.label}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Contributions;
