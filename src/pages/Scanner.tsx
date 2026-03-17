import { ScanLine, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Scanner = () => {
  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-display font-bold text-bordeaux-dark">Scanner QR Code</h1>
        <p className="text-sm text-muted-foreground mt-1">Scannez la carte d'un membre pour l'identifier</p>
      </div>

      <Card className="border-border/50 overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-square bg-foreground/5 flex flex-col items-center justify-center gap-4 relative">
            {/* Scanner frame overlay */}
            <div className="w-48 h-48 border-2 border-accent rounded-2xl relative">
              <div className="absolute -top-0.5 -left-0.5 w-6 h-6 border-t-4 border-l-4 border-accent rounded-tl-lg" />
              <div className="absolute -top-0.5 -right-0.5 w-6 h-6 border-t-4 border-r-4 border-accent rounded-tr-lg" />
              <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 border-b-4 border-l-4 border-accent rounded-bl-lg" />
              <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 border-b-4 border-r-4 border-accent rounded-br-lg" />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Camera className="h-5 w-5" />
              <span className="text-sm">Positionnez le QR code dans le cadre</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="p-3 bg-info-bg rounded-lg border border-accent/20 text-center">
        <ScanLine className="h-5 w-5 text-accent mx-auto mb-1" />
        <p className="text-xs text-muted-foreground">
          Le scanner fonctionne <strong className="text-foreground">hors ligne</strong>. Aucune connexion internet n'est nécessaire.
        </p>
      </div>
    </div>
  );
};

export default Scanner;
