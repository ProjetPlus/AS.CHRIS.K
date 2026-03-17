import { Settings as SettingsIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SettingsPage = () => (
  <div className="space-y-6 max-w-2xl">
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-bordeaux-dark">Paramètres</h1>
      <p className="text-sm text-muted-foreground mt-1">Configuration de l'association</p>
    </div>

    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2"><SettingsIcon className="h-4 w-4 text-accent" /> Association</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FieldRow label="Nom de l'association" defaultValue="Mutuelle Funéraire — CAMP BÉTHEL DE KOUASSIKANDRO" />
        <FieldRow label="Initiales (ID membres)" defaultValue="MSCB" />
        <FieldRow label="Numéro de téléphone officiel" defaultValue="+225 07 00 00 00 00" />
        <div className="flex justify-end">
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Enregistrer</Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

function FieldRow({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</Label>
      <Input defaultValue={defaultValue} className="h-10" />
    </div>
  );
}

export default SettingsPage;
