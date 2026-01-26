import { useState } from 'react';
import { useProjects } from '@/hooks/useFirestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Building2, MapPin, IndianRupee } from 'lucide-react';
import { Project } from '@/types/admin';
import ImageUploader from '@/components/admin/ImageUploader';

const categories = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'plots', label: 'Plots' },
  { value: 'construction', label: 'Construction' },
  { value: 'farmhouse', label: 'Farm House' },
  { value: 'infrastructure', label: 'Infrastructure' }
];

const statuses = [
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'upcoming', label: 'Upcoming' }
];

const AdminProjects = () => {
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'residential' as Project['category'],
    status: 'ongoing' as Project['status'],
    location: '',
    price: '',
    priceUnit: 'Lakhs',
    amenities: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    floors: '',
    featured: false
  });
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [floorPlanImages, setFloorPlanImages] = useState<string[]>([]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'residential',
      status: 'ongoing',
      location: '',
      price: '',
      priceUnit: 'Lakhs',
      amenities: '',
      area: '',
      bedrooms: '',
      bathrooms: '',
      parking: '',
      floors: '',
      featured: false
    });
    setProjectImages([]);
    setFloorPlanImages([]);
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      location: project.location,
      price: project.price,
      priceUnit: project.priceUnit,
      amenities: project.amenities.join(', '),
      area: project.specifications.area || '',
      bedrooms: project.specifications.bedrooms || '',
      bathrooms: project.specifications.bathrooms || '',
      parking: project.specifications.parking || '',
      floors: project.specifications.floors || '',
      featured: project.featured
    });
    setProjectImages(project.images || []);
    setFloorPlanImages(project.floorPlanImages || []);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      status: formData.status,
      location: formData.location,
      price: formData.price,
      priceUnit: formData.priceUnit,
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean),
      specifications: {
        area: formData.area,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        parking: formData.parking,
        floors: formData.floors
      },
      images: projectImages,
      floorPlanImages: floorPlanImages,
      featured: formData.featured
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectData);
        toast({ title: "Success", description: "Project updated successfully" });
      } else {
        await addProject(projectData);
        toast({ title: "Success", description: "Project added successfully" });
      }
      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast({ title: "Error", description: "Failed to save project", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        toast({ title: "Success", description: "Project deleted successfully" });
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete project", variant: "destructive" });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your property projects</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v as Project['category'] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as Project['status'] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(s => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., 45"
                  />
                </div>
                
                <div>
                  <Label htmlFor="priceUnit">Price Unit</Label>
                  <Select value={formData.priceUnit} onValueChange={(v) => setFormData({ ...formData, priceUnit: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lakhs">Lakhs</SelectItem>
                      <SelectItem value="Crores">Crores</SelectItem>
                      <SelectItem value="Per Sq.Ft">Per Sq.Ft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="amenities">Amenities (comma separated)</Label>
                  <Input
                    id="amenities"
                    value={formData.amenities}
                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                    placeholder="Swimming Pool, Gym, Garden, Security"
                  />
                </div>
                
                <div>
                  <Label htmlFor="area">Area (sq.ft)</Label>
                  <Input
                    id="area"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="parking">Parking</Label>
                  <Input
                    id="parking"
                    value={formData.parking}
                    onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                  />
                </div>
                
                {/* Image Upload Section */}
                <div className="col-span-2">
                  <ImageUploader
                    images={projectImages}
                    onImagesChange={setProjectImages}
                    folder="projects"
                    label="Project Images"
                    maxImages={5}
                  />
                </div>
                
                <div className="col-span-2">
                  <ImageUploader
                    images={floorPlanImages}
                    onImagesChange={setFloorPlanImages}
                    folder="floor-plans"
                    label="Floor Plan Images"
                    maxImages={5}
                  />
                </div>
                
                <div className="col-span-2 flex items-center gap-2">
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label>Featured Project</Label>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setIsOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProject ? 'Update' : 'Add'} Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted" />
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card className="p-12 text-center">
          <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">Get started by adding your first project</p>
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="h-48 bg-muted relative">
                {project.images[0] ? (
                  <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Building2 className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                {project.featured && (
                  <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Featured
                  </span>
                )}
                <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded text-white ${
                  project.status === 'completed' ? 'bg-emerald-500' :
                  project.status === 'ongoing' ? 'bg-amber-500' :
                  'bg-blue-500'
                }`}>
                  {project.status}
                </span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="w-3 h-3" />
                  {project.location}
                </div>
                {project.price && (
                  <div className="flex items-center gap-1 text-sm font-medium text-primary">
                    <IndianRupee className="w-3 h-3" />
                    {project.price} {project.priceUnit}
                  </div>
                )}
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(project)}>
                    <Pencil className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
