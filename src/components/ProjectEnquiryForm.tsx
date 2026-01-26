import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitEnquiry } from '@/hooks/useFirestore';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { z } from 'zod';

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email is too long"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(15, "Phone number is too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message is too long")
});

interface ProjectEnquiryFormProps {
  projectId: string;
  projectTitle: string;
}

const ProjectEnquiryForm = ({ projectId, projectTitle }: ProjectEnquiryFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = enquirySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      await submitEnquiry({
        projectId,
        projectTitle,
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
        message: result.data.message
      });

      setSubmitted(true);
      toast({
        title: "Enquiry Sent!",
        description: "We'll get back to you shortly.",
      });
    } catch (error) {
      toast({
        title: "Failed to send enquiry",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
        <CheckCircle className="w-16 h-16 mx-auto text-primary mb-4" />
        <h3 className="text-2xl font-serif font-bold mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-4">
          Your enquiry about <span className="font-medium text-foreground">{projectTitle}</span> has been received.
        </p>
        <p className="text-sm text-muted-foreground">
          Our team will contact you within 24 hours.
        </p>
        <Button 
          variant="outline" 
          className="mt-6"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
          }}
        >
          Send Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary/50 rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-serif font-bold mb-2">Interested in this property?</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Fill out the form below and our team will contact you shortly.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            name="message"
            placeholder={`I'm interested in ${projectTitle}. Please provide more details about...`}
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={errors.message ? 'border-destructive' : ''}
          />
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message}</p>
          )}
        </div>
        
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Enquiry
            </>
          )}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          By submitting this form, you agree to be contacted regarding this property.
        </p>
      </form>
    </div>
  );
};

export default ProjectEnquiryForm;
