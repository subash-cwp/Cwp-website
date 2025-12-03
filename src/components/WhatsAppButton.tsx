import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export const WhatsAppButton = () => {
  const { settings } = useSiteSettings();

  const handleWhatsAppClick = () => {
    const whatsappNumber = settings.integrations.whatsappNumber.replace(/[^0-9]/g, "");
    const message = encodeURIComponent("Hi! I'm interested in learning more about your marketing services.");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 p-0 bg-[#25D366] hover:bg-[#20BD5A]"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  );
};
