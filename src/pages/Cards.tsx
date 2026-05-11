import { useState } from "react";
import { CreditCard, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMembers, useSettings } from "@/db/useDb";
import { toast } from "sonner";
import type { DbMember, DbSettings } from "@/db/database";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import { MemberPhoto } from "@/components/MemberPhoto";

// CR80 format
const CARD_W = 85.6;
const CARD_H = 54;

// Palette Ivoire & Terracotta (synchronisée avec index.css)
const IVOIRE = [250, 245, 238] as const;       // #FAF5EE
const SAND = [232, 213, 196] as const;         // #E8D5C4
const TERRA = [196, 101, 74] as const;         // #C4654A
const TERRA_DARK = [133, 64, 42] as const;     // #85402A
const ANTHRACITE = [45, 45, 45] as const;      // #2D2D2D
const MUTED = [110, 110, 110] as const;

async function imageForPdf(src: string): Promise<string> {
  if (!src.startsWith("data:image/webp")) return src;
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image(); i.onload = () => resolve(i); i.onerror = reject; i.src = src;
  });
  const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
  c.getContext("2d")?.drawImage(img, 0, 0);
  return c.toDataURL("image/jpeg", 0.92);
}

async function generateCardPDF(member: DbMember, settings?: DbSettings) {
  const assocName = (settings?.association_name || "Association des Chrétiens de Kouassikankro").toUpperCase();
  const assocShort = settings?.initials ? `AS.${settings.initials}.K` : "AS.CHRIS.K";
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: [CARD_W, CARD_H] });

  // ============ RECTO ============
  // Fond ivoire
  doc.setFillColor(...IVOIRE);
  doc.rect(0, 0, CARD_W, CARD_H, "F");

  // Bandeau terracotta fin en haut
  doc.setFillColor(...TERRA);
  doc.rect(0, 0, CARD_W, 2.2, "F");

  // En-tête discret
  doc.setTextColor(...TERRA_DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(5.5);
  doc.text("MUTUELLE FUNÉRAIRE", 5, 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(4);
  doc.setTextColor(...MUTED);
  doc.text("République de Côte d'Ivoire", 5, 8.6);

  // ID en haut à droite, monospace terracotta
  doc.setFont("courier", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...TERRA);
  doc.text(member.member_id, CARD_W - 5, 7, { align: "right" });

  // Photo carrée arrondie 22x22mm à gauche
  const photoX = 5, photoY = 13, photoSize = 22;
  doc.setFillColor(...SAND);
  doc.roundedRect(photoX, photoY, photoSize, photoSize, 1.5, 1.5, "F");
  if (member.photo) {
    try {
      const photo = await imageForPdf(member.photo);
      const fmt = photo.startsWith("data:image/png") ? "PNG" : "JPEG";
      doc.addImage(photo, fmt, photoX + 0.5, photoY + 0.5, photoSize - 1, photoSize - 1, undefined, "FAST");
    } catch {
      doc.setTextColor(...MUTED); doc.setFontSize(5); doc.text("PHOTO", photoX + photoSize / 2, photoY + photoSize / 2, { align: "center" });
    }
  } else {
    doc.setTextColor(...MUTED); doc.setFontSize(5); doc.text("PHOTO", photoX + photoSize / 2, photoY + photoSize / 2, { align: "center" });
  }

  // Nom — très grand, anthracite
  const infoX = 30;
  doc.setTextColor(...ANTHRACITE);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  const fullName = `${member.last_name} ${member.first_name}`;
  doc.text(fullName.length > 28 ? fullName.slice(0, 28) + "…" : fullName, infoX, 17);

  // Ligne fine sand sous le nom
  doc.setDrawColor(...SAND);
  doc.setLineWidth(0.3);
  doc.line(infoX, 18.8, CARD_W - 5, 18.8);

  // Infos secondaires en gris anthracite
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5);
  doc.setTextColor(...MUTED);
  doc.text("CAMPEMENT", infoX, 22.5);
  doc.text("S/PRÉFECTURE", infoX, 27.5);
  doc.text("TÉLÉPHONE", infoX, 32.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(...ANTHRACITE);
  doc.text((member.campement || "—").slice(0, 32), infoX, 25);
  doc.text((member.sous_prefecture || "—").slice(0, 32), infoX, 30);
  doc.text(member.phone || "—", infoX, 35);

  // Pilule "X couvert(s)" en bas droite
  doc.setFillColor(...TERRA);
  doc.roundedRect(CARD_W - 24, 39, 19, 5.5, 2.75, 2.75, "F");
  doc.setTextColor(...IVOIRE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(5);
  doc.text(`${member.total_covered_persons} PERSONNE(S)`, CARD_W - 14.5, 42.5, { align: "center" });

  // Footer recto
  doc.setDrawColor(...SAND);
  doc.setLineWidth(0.2);
  doc.line(5, CARD_H - 4.5, CARD_W - 5, CARD_H - 4.5);
  doc.setTextColor(...TERRA_DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(5);
  doc.text(assocShort, 5, CARD_H - 2);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...MUTED);
  doc.setFontSize(3.8);
  doc.text("Inscrit le " + new Date(member.registration_date).toLocaleDateString("fr-FR"), CARD_W - 5, CARD_H - 2, { align: "right" });

  // ============ VERSO ============
  doc.addPage([CARD_W, CARD_H], "landscape");
  doc.setFillColor(...IVOIRE);
  doc.rect(0, 0, CARD_W, CARD_H, "F");

  // Bandeau terracotta fin en haut
  doc.setFillColor(...TERRA);
  doc.rect(0, 0, CARD_W, 2.2, "F");

  // QR code grand 32x32mm centré
  const qrSize = 32;
  const qrDataUrl = await QRCode.toDataURL(member.member_id, {
    width: 400, margin: 0,
    color: { dark: "#2D2D2D", light: "#FAF5EE" },
  });
  doc.addImage(qrDataUrl, "PNG", (CARD_W - qrSize) / 2, 5, qrSize, qrSize);

  // ID en monospace sous le QR
  doc.setFont("courier", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...TERRA);
  doc.text(member.member_id, CARD_W / 2, 41.5, { align: "center" });

  // Mentions
  doc.setFont("helvetica", "normal");
  doc.setFontSize(3.5);
  doc.setTextColor(...MUTED);
  doc.text("Cette carte est la propriété de l'association.", CARD_W / 2, 45, { align: "center" });
  doc.text("En cas de perte, merci de la retourner.", CARD_W / 2, 47.5, { align: "center" });

  // Footer terracotta avec nom assoc
  doc.setFillColor(...TERRA);
  doc.rect(0, CARD_H - 4, CARD_W, 4, "F");
  doc.setTextColor(...IVOIRE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(4.5);
  doc.text(assocShort + " — " + (assocName.length > 50 ? assocName.slice(0, 50) : assocName), CARD_W / 2, CARD_H - 1.4, { align: "center" });

  return doc;
}

const Cards = () => {
  const { members } = useMembers();
  const { settings } = useSettings();
  const [previewMember, setPreviewMember] = useState<DbMember | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [generating, setGenerating] = useState<string | null>(null);

  const activeMembers = members.filter(m => m.status === "actif" && m.adhesion_paid);

  const handlePreview = async (member: DbMember) => {
    setPreviewMember(member);
    const doc = await generateCardPDF(member, settings);
    const blob = doc.output("blob");
    setPreviewUrl(URL.createObjectURL(blob));
  };

  const handleDownload = async (member: DbMember) => {
    setGenerating(member.id);
    try {
      const doc = await generateCardPDF(member, settings);
      doc.save(`Carte_${member.member_id}.pdf`);
      toast.success("Carte générée", { description: `${member.last_name} ${member.first_name}` });
    } catch {
      toast.error("Erreur lors de la génération");
    }
    setGenerating(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-bordeaux-dark">Cartes de membre</h1>
        <p className="text-sm text-muted-foreground mt-1">Style moderne épuré — fond ivoire, QR proéminent</p>
      </div>

      <div className="space-y-2">
        {activeMembers.map((m) => (
          <div key={m.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card">
            <div className="flex items-center gap-3">
              <MemberPhoto member={m} className="w-10 h-10 text-sm" />
              <div>
                <p className="font-semibold text-sm">{m.last_name} {m.first_name}</p>
                <p className="text-xs text-accent">{m.member_id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] bg-or-light text-accent border-accent/20">
                {m.total_covered_persons} couvert(s)
              </Badge>
              <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => handlePreview(m)}>
                <Eye className="h-3 w-3 mr-1" /> Aperçu
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => handleDownload(m)} disabled={generating === m.id}>
                <Download className="h-3 w-3 mr-1" /> {generating === m.id ? "..." : "PDF"}
              </Button>
            </div>
          </div>
        ))}
        {activeMembers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <CreditCard className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Aucun membre actif éligible</p>
          </div>
        )}
      </div>

      <Dialog open={!!previewMember} onOpenChange={() => { setPreviewMember(null); setPreviewUrl(""); }}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="font-display text-bordeaux-dark">
              Carte de {previewMember?.last_name} {previewMember?.first_name}
            </DialogTitle>
          </DialogHeader>
          {previewUrl && (
            <iframe src={previewUrl} className="w-full h-[400px] rounded border border-border" title="Aperçu carte" />
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => { setPreviewMember(null); setPreviewUrl(""); }}>Fermer</Button>
            {previewMember && (
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => handleDownload(previewMember)}>
                <Download className="h-4 w-4 mr-1" /> Télécharger PDF
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cards;
