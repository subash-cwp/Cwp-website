import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface SiteSettings {
  company: {
    name: string;
    tagline: string;
    description: string;
    logo: string;
    email: string;
    phone: string;
    address: string;
  };
  social: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
    keywords: string;
  };
  integrations: {
    calendlyLink: string;
    whatsappNumber: string;
    googleAnalyticsId: string;
  };
}

const defaultSettings: SiteSettings = {
  company: {
    name: "CWP Marketing",
    tagline: "We Help Brands Grow Strategically",
    description: "Full-service digital marketing agency specializing in performance marketing, SEO, and brand strategy.",
    logo: "",
    email: "hello@cwpmarketing.com",
    phone: "+91 98765 43210",
    address: "123 Business Street, City, Country"
  },
  social: {
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    youtube: ""
  },
  seo: {
    metaTitle: "CWP Marketing - Digital Marketing Agency",
    metaDescription: "Transform your business with data-driven digital marketing strategies. SEO, PPC, Social Media, and more.",
    ogImage: "",
    keywords: "digital marketing, SEO, PPC, social media marketing"
  },
  integrations: {
    calendlyLink: "",
    whatsappNumber: "+919876543210",
    googleAnalyticsId: ""
  }
};

export default function SiteSettingsAdmin() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("key", "main_settings")
      .maybeSingle();

    if (data?.value && typeof data.value === 'object') {
      setSettings({ ...defaultSettings, ...(data.value as unknown as Partial<SiteSettings>) });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .eq("key", "main_settings")
      .maybeSingle();

    let error;
    if (existing) {
      ({ error } = await supabase
        .from("site_settings")
        .update({ value: JSON.parse(JSON.stringify(settings)) })
        .eq("key", "main_settings"));
    } else {
      ({ error } = await supabase
        .from("site_settings")
        .insert([{ key: "main_settings", value: JSON.parse(JSON.stringify(settings)) }]));
    }

    if (error) {
      toast({ title: "Error saving settings", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Settings saved successfully" });
    }
    setSaving(false);
  };

  const updateSetting = (category: keyof SiteSettings, key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Site Settings</h1>
            <p className="text-muted-foreground">Manage your website configuration</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="company">
          <TabsList>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Basic information about your company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input 
                      value={settings.company.name} 
                      onChange={(e) => updateSetting("company", "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tagline</Label>
                    <Input 
                      value={settings.company.tagline} 
                      onChange={(e) => updateSetting("company", "tagline", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    value={settings.company.description} 
                    onChange={(e) => updateSetting("company", "description", e.target.value)}
                    rows={3}
                  />
                </div>

                <ImageUpload
                  label="Company Logo"
                  value={settings.company.logo}
                  onChange={(url) => updateSetting("company", "logo", url)}
                  folder="branding"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      value={settings.company.email} 
                      onChange={(e) => updateSetting("company", "email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input 
                      value={settings.company.phone} 
                      onChange={(e) => updateSetting("company", "phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address</Label>
                  <Textarea 
                    value={settings.company.address} 
                    onChange={(e) => updateSetting("company", "address", e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>Connect your social media profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>LinkedIn</Label>
                    <Input 
                      placeholder="https://linkedin.com/company/..."
                      value={settings.social.linkedin} 
                      onChange={(e) => updateSetting("social", "linkedin", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Twitter / X</Label>
                    <Input 
                      placeholder="https://twitter.com/..."
                      value={settings.social.twitter} 
                      onChange={(e) => updateSetting("social", "twitter", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Facebook</Label>
                    <Input 
                      placeholder="https://facebook.com/..."
                      value={settings.social.facebook} 
                      onChange={(e) => updateSetting("social", "facebook", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Instagram</Label>
                    <Input 
                      placeholder="https://instagram.com/..."
                      value={settings.social.instagram} 
                      onChange={(e) => updateSetting("social", "instagram", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>YouTube</Label>
                    <Input 
                      placeholder="https://youtube.com/..."
                      value={settings.social.youtube} 
                      onChange={(e) => updateSetting("social", "youtube", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Default meta tags for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Meta Title</Label>
                  <Input 
                    value={settings.seo.metaTitle} 
                    onChange={(e) => updateSetting("seo", "metaTitle", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">{settings.seo.metaTitle.length}/60 characters</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Default Meta Description</Label>
                  <Textarea 
                    value={settings.seo.metaDescription} 
                    onChange={(e) => updateSetting("seo", "metaDescription", e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">{settings.seo.metaDescription.length}/160 characters</p>
                </div>

                <ImageUpload
                  label="Default OG Image"
                  value={settings.seo.ogImage}
                  onChange={(url) => updateSetting("seo", "ogImage", url)}
                  folder="seo"
                />

                <div className="space-y-2">
                  <Label>Default Keywords</Label>
                  <Input 
                    placeholder="keyword1, keyword2, keyword3"
                    value={settings.seo.keywords} 
                    onChange={(e) => updateSetting("seo", "keywords", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Third-Party Integrations</CardTitle>
                <CardDescription>Configure external services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Calendly Link</Label>
                  <Input 
                    placeholder="https://calendly.com/your-link"
                    value={settings.integrations.calendlyLink} 
                    onChange={(e) => updateSetting("integrations", "calendlyLink", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>WhatsApp Number</Label>
                  <Input 
                    placeholder="+919876543210"
                    value={settings.integrations.whatsappNumber} 
                    onChange={(e) => updateSetting("integrations", "whatsappNumber", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Include country code without spaces or dashes</p>
                </div>

                <div className="space-y-2">
                  <Label>Google Analytics ID</Label>
                  <Input 
                    placeholder="G-XXXXXXXXXX"
                    value={settings.integrations.googleAnalyticsId} 
                    onChange={(e) => updateSetting("integrations", "googleAnalyticsId", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}