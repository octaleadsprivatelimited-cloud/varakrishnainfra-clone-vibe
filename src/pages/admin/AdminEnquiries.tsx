import { useState } from 'react';
import { useEnquiries } from '@/hooks/useFirestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Trash2, 
  MessageSquare, 
  Mail, 
  Phone, 
  User, 
  Building2,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { Enquiry } from '@/types/admin';

const AdminEnquiries = () => {
  const { enquiries, loading, updateEnquiryStatus, deleteEnquiry } = useEnquiries();
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | Enquiry['status']>('all');

  const filteredEnquiries = filter === 'all' 
    ? enquiries 
    : enquiries.filter(e => e.status === filter);

  const handleStatusChange = async (id: string, status: Enquiry['status']) => {
    try {
      await updateEnquiryStatus(id, status);
      toast({ title: "Status updated", description: `Enquiry marked as ${status}` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await deleteEnquiry(id);
        toast({ title: "Deleted", description: "Enquiry deleted successfully" });
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete enquiry", variant: "destructive" });
      }
    }
  };

  const getStatusBadge = (status: Enquiry['status']) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-500 text-white border-0">New</Badge>;
      case 'contacted':
        return <Badge className="bg-amber-500 text-white border-0">Contacted</Badge>;
      case 'closed':
        return <Badge className="bg-emerald-500 text-white border-0">Closed</Badge>;
    }
  };

  const newCount = enquiries.filter(e => e.status === 'new').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Enquiries
            {newCount > 0 && (
              <Badge variant="destructive" className="text-sm">
                {newCount} new
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Manage property enquiries from potential customers</p>
        </div>
        
        <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Enquiries</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-4" />
                <div className="h-3 bg-muted rounded w-1/2 mb-2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <Card className="p-12 text-center">
          <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No enquiries yet</h3>
          <p className="text-muted-foreground">
            {filter === 'all' 
              ? "When customers submit enquiries, they'll appear here"
              : `No ${filter} enquiries found`}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enquiry) => (
            <Card key={enquiry.id} className={`${enquiry.status === 'new' ? 'border-primary/50 bg-primary/5' : ''}`}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Main Content */}
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2">
                      {getStatusBadge(enquiry.status)}
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {enquiry.createdAt ? format(enquiry.createdAt, 'MMM d, yyyy h:mm a') : 'Unknown date'}
                      </span>
                    </div>
                    
                    {/* Project Info */}
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="w-4 h-4 text-primary" />
                      <span className="font-medium">{enquiry.projectTitle}</span>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="grid sm:grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{enquiry.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href={`mailto:${enquiry.email}`} className="text-primary hover:underline">
                          {enquiry.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a href={`tel:${enquiry.phone}`} className="text-primary hover:underline">
                          {enquiry.phone}
                        </a>
                      </div>
                    </div>
                    
                    {/* Message */}
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <p className="text-sm whitespace-pre-wrap">{enquiry.message}</p>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-row lg:flex-col gap-2">
                    {enquiry.status === 'new' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusChange(enquiry.id, 'contacted')}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Contacted
                      </Button>
                    )}
                    {enquiry.status === 'contacted' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusChange(enquiry.id, 'closed')}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Close
                      </Button>
                    )}
                    {enquiry.status === 'closed' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusChange(enquiry.id, 'new')}
                      >
                        Reopen
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDelete(enquiry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
