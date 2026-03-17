import { RefreshCw, Wifi, WifiOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Sync = () => (
  <div className="space-y-6 max-w-2xl">
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-bordeaux-dark">Synchronisation</h1>
      <p className="text-sm text-muted-foreground mt-1">État de la synchronisation des données</p>
    </div>

    <Card className="border-success/30 bg-success-light/50">
      <CardContent className="pt-6 pb-5 text-center">
        <Wifi className="h-8 w-8 text-success mx-auto mb-2" />
        <p className="text-sm font-semibold text-success">En ligne — Synchronisé</p>
        <p className="text-xs text-muted-foreground mt-1">Dernière synchronisation : il y a 2 minutes</p>
      </CardContent>
    </Card>

    <div className="flex justify-center">
      <Button variant="outline"><RefreshCw className="h-4 w-4 mr-2" /> Forcer la synchronisation</Button>
    </div>

    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Historique</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {[
          { time: "17 mar 2026 — 14:32", items: "3 membres, 5 cotisations", status: "success" },
          { time: "17 mar 2026 — 10:15", items: "1 décès, 12 cotisations", status: "success" },
          { time: "16 mar 2026 — 18:00", items: "2 membres", status: "success" },
        ].map((s, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <div>
              <p className="text-sm font-medium">{s.time}</p>
              <p className="text-xs text-muted-foreground">{s.items}</p>
            </div>
            <Badge className="bg-success-light text-success text-[10px]">
              <CheckCircle className="h-3 w-3 mr-1" /> OK
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

export default Sync;
