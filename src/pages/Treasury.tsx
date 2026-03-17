import { Landmark, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { treasurySummary } from "@/data/mockData";

const formatCFA = (n: number) => n.toLocaleString("fr-FR") + " FCFA";

const Treasury = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-bordeaux-dark">Caisse</h1>
        <p className="text-sm text-muted-foreground mt-1">Suivi financier de la mutuelle</p>
      </div>

      {/* Main Balance */}
      <Card className="border-accent/30 bg-or-light/50">
        <CardContent className="pt-6 pb-5 text-center">
          <Landmark className="h-8 w-8 text-accent mx-auto mb-2" />
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Solde total de la caisse</p>
          <p className="text-4xl font-display font-bold text-accent mt-2">{formatCFA(treasurySummary.totalBalance)}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" /> Entrées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-display font-bold text-success">{formatCFA(treasurySummary.totalContributionsCollected)}</p>
            <p className="text-xs text-muted-foreground mt-1">Total des cotisations collectées</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-destructive" /> Sorties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-display font-bold text-destructive">{formatCFA(treasurySummary.totalPayouts)}</p>
            <p className="text-xs text-muted-foreground mt-1">Total des versements aux familles</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Wallet className="h-4 w-4 text-accent" /> Réserves
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-display font-bold text-accent">{formatCFA(treasurySummary.retainedReserves)}</p>
            <p className="text-xs text-muted-foreground mt-1">Retenues sur décès de secondaires</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Movements mock */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Derniers mouvements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { desc: "Cotisation — Jean KOUADIO", amount: "+3 000", type: "in" as const, date: "22 fév 2026" },
              { desc: "Cotisation — Esther YAO", amount: "+1 000", type: "in" as const, date: "23 fév 2026" },
              { desc: "Versement — Famille TAPÉ", amount: "-300 000", type: "out" as const, date: "20 fév 2026" },
              { desc: "Retenue — Décès Bernadette KONÉ", amount: "+50 000", type: "in" as const, date: "10 jan 2026" },
            ].map((mv, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div>
                  <p className="text-sm font-medium">{mv.desc}</p>
                  <p className="text-xs text-muted-foreground">{mv.date}</p>
                </div>
                <span className={`font-display font-bold ${mv.type === "in" ? "text-success" : "text-destructive"}`}>
                  {mv.amount} FCFA
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Treasury;
