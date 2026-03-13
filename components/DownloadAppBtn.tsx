import { Download } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function DownloadAppBtn() {
  return (
    <Button
      asChild
      className="gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
    >
      <Link href="/telechargement">
      <Download className="w-4 h-4" />
      {"Télécharger l'App"}
      </Link>
    </Button>
  );
}
