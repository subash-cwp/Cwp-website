import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Upload, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CareerApplicationFormProps {
  position: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CareerApplicationForm({ position, isOpen, onClose }: CareerApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    portfolioUrl: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
        });
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let resumeUrl = null;

    // Upload resume if provided
    if (resumeFile) {
      const fileExt = resumeFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("media")
        .upload(filePath, resumeFile);

      if (uploadError) {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Failed to upload resume. Please try again.",
        });
        setIsSubmitting(false);
        return;
      }

      const { data: urlData } = supabase.storage.from("media").getPublicUrl(filePath);
      resumeUrl = urlData.publicUrl;
    }

    // Save application to database
    const { error } = await supabase.from("job_applications").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      position: position,
      resume_url: resumeUrl,
      linkedin_url: formData.linkedinUrl || null,
      portfolio_url: formData.portfolioUrl || null,
      cover_letter: formData.coverLetter || null,
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit application. Please try again.",
      });
    } else {
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        linkedinUrl: "",
        portfolioUrl: "",
        coverLetter: "",
      });
      setResumeFile(null);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {position}</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your application. We'll review it and get back to you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="app-name">Full Name *</Label>
              <Input
                id="app-name"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="app-email">Email *</Label>
              <Input
                id="app-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="app-phone">Phone Number</Label>
              <Input
                id="app-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 9876543210"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="app-linkedin">LinkedIn Profile</Label>
              <Input
                id="app-linkedin"
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="app-portfolio">Portfolio URL</Label>
            <Input
              id="app-portfolio"
              type="url"
              value={formData.portfolioUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, portfolioUrl: e.target.value }))}
              placeholder="https://yourportfolio.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="app-resume">Resume (PDF, DOC - Max 5MB)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <input
                id="app-resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="app-resume" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                {resumeFile ? (
                  <p className="text-sm text-primary font-medium">{resumeFile.name}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="app-cover">Cover Letter</Label>
            <Textarea
              id="app-cover"
              rows={5}
              value={formData.coverLetter}
              onChange={(e) => setFormData((prev) => ({ ...prev, coverLetter: e.target.value }))}
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
