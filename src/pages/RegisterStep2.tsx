import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const paymentMethods = [
  { value: "especes", label: "Espèces" },
  { value: "wave", label: "Wave" },
  { value: "orange", label: "Orange Money" },
  { value: "mtn", label: "MTN Mobile Money" },
  { value: "moov", label: "Moov Money" },
];

const RegisterStep2 = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [proofType, setProofType] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);

  const isMobileMoney = paymentMethod && paymentMethod !== "especes";
  const isValid = paymentMethod && paymentDate && (!isMobileMoney || proofType);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-bordeaux-dark">Inscription — Étape 2</h1>
        <p className="text-sm text-muted-foreground mt-1">Paiement du droit d'adhésion</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success text-success-foreground text-sm font-bold">✓</div>
        <div className="h-0.5 flex-1 bg-accent" />
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold">2</div>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Droit d'adhésion — 10 000 FCFA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Fixed amount */}
          <div className="p-4 bg-or-light rounded-lg text-center">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Montant à payer</p>
            <p className="text-3xl font-display font-bold text-accent mt-1">10 000 FCFA</p>
            <p className="text-xs text-muted-foreground mt-1">Montant fixe — non modifiable</p>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Moyen de paiement *</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="h-10"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
              <SelectContent>
                {paymentMethods.map((pm) => (
                  <SelectItem key={pm.value} value={pm.value}>{pm.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isMobileMoney && (
            <>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Type de preuve *</Label>
                <Select value={proofType} onValueChange={setProofType}>
                  <SelectTrigger className="h-10"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transaction_id">ID / Référence de transaction</SelectItem>
                    <SelectItem value="photo_pdf">Photo ou PDF du reçu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {proofType === "transaction_id" && (
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">ID de transaction</Label>
                  <Input value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="Numéro de référence" className="h-10" />
                </div>
              )}

              {proofType === "photo_pdf" && (
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-accent/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Photo ou PDF du reçu</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG, PDF — max 5 Mo</p>
                </div>
              )}
            </>
          )}

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Date de paiement</Label>
            <Input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="h-10" />
          </div>

          <div className="p-2 bg-secondary/50 rounded text-xs text-muted-foreground">
            <strong>Admin enregistrant :</strong> Super Admin (automatique)
          </div>
        </CardContent>
      </Card>

      <div className="p-3 bg-info-bg rounded-lg border border-accent/20">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Important :</strong> Sans le paiement du droit d'adhésion, l'inscription ne peut pas être finalisée. Le bouton "Valider" reste désactivé tant que le paiement n'est pas enregistré.
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate("/register")}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Retour
        </Button>
        <Button disabled={!isValid} className="bg-primary hover:bg-primary/90">
          <Check className="mr-1 h-4 w-4" /> Valider l'inscription
        </Button>
      </div>
    </div>
  );
};

export default RegisterStep2;
