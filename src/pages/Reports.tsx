import { BarChart3, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Reports = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-bordeaux-dark">Rapports & Exports</h1>
      <p className="text-sm text-muted-foreground mt-1">Génération de rapports PDF et Excel</p>
    </div>
    {[
      { title: "Liste complète des membres", desc: "Tous les membres avec statuts et cotisations" },
      { title: "Rapport de cotisations par décès", desc: "Détail par décès avec statuts de paiement" },
      { title: "Rapport financier — Caisse", desc: "Entrées, sorties et solde" },
      { title: "Membres en retard de cotisation", desc: "Liste des membres avec cotisations impayées" },
    ].map((r, i) => (
      <Card key={i} className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-accent" /> {r.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{r.desc}</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-xs h-8"><FileDown className="h-3 w-3 mr-1" /> PDF</Button>
            <Button size="sm" variant="outline" className="text-xs h-8"><FileDown className="h-3 w-3 mr-1" /> Excel</Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default Reports;
