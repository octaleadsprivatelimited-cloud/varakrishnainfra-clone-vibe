import { useState, useEffect } from 'react';
import { useSiteSettings } from '@/hooks/useFirestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Save, ExternalLink } from 'lucide-react';

const AdminSettings = () => {
  const { settings, loading, updateSocialLinks } = useSiteSettings();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    linkedin: '',
    whatsapp: ''
  });

  useEffect(() => {
    if (settings?.socialLinks) {
      setFormData({
        facebook: settings.socialLinks.facebook || '',
        instagram: settings.socialLinks.instagram || '',
        twitter: settings.socialLinks.twitter || '',
        youtube: settings.socialLinks.youtube || '',
        linkedin: settings.socialLinks.linkedin || '',
        whatsapp: settings.socialLinks.whatsapp || ''
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await updateSocialLinks(formData);
      toast({ title: "Success", description: "Social links updated successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update social links", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const socialFields = [
    { name: 'facebook', label: 'Facebook', icon: FaFacebook, placeholder: 'https://facebook.com/yourpage', color: 'text-blue-600' },
    { name: 'instagram', label: 'Instagram', icon: FaInstagram, placeholder: 'https://instagram.com/yourpage', color: 'text-pink-600' },
    { name: 'twitter', label: 'X (Twitter)', icon: FaXTwitter, placeholder: 'https://x.com/yourhandle', color: 'text-foreground' },
    { name: 'youtube', label: 'YouTube', icon: FaYoutube, placeholder: 'https://youtube.com/@yourchannel', color: 'text-red-600' },
    { name: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, placeholder: 'https://linkedin.com/company/yourcompany', color: 'text-blue-700' },
    { name: 'whatsapp', label: 'WhatsApp', icon: FaWhatsapp, placeholder: '+91 9876543210', color: 'text-green-600' }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-48 animate-pulse" />
        <Card>
          <CardContent className="p-6 space-y-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-10 bg-muted rounded animate-pulse" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your website settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Social Media Links
          </CardTitle>
          <CardDescription>
            These links will appear in the website header, footer, and contact sections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {socialFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name} className="flex items-center gap-2">
                    <field.icon className={`w-4 h-4 ${field.color}`} />
                    {field.label}
                  </Label>
                  <Input
                    id={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
