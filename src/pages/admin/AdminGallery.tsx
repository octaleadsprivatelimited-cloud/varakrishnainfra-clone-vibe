import { useState, useRef } from 'react';
import { useGallery } from '@/hooks/useFirestore';
import { useFirestoreImages } from '@/hooks/useFirestoreImages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Image, Video, Play, Upload, Loader2 } from 'lucide-react';

const galleryCategories = ['Residential', 'Commercial', 'Plots', 'Construction', 'Interiors', 'Infrastructure'];

/** Title from filename (no path, no extension), max 80 chars */
function titleFromFile(file: File): string {
  const name = file.name.replace(/\.[^/.]+$/, '').trim() || file.name;
  return name.length > 80 ? name.slice(0, 77) + '...' : name;
}

const AdminGallery = () => {
  const { galleryItems, loading, addGalleryItem, deleteGalleryItem } = useGallery();
  const { uploadFile, uploadMultipleFiles, uploading, progress } = useFirestoreImages();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0, phase: 'idle' as 'idle' | 'upload' | 'save' });
  const bulkFileInputRef = useRef<HTMLInputElement>(null);
  const [bulkCategory, setBulkCategory] = useState('Residential');
  const [activeTab, setActiveTab] = useState('image');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Residential',
    youtubeUrl: ''
  });

  const extractYoutubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({ title: "Invalid file", description: "Please select an image file", variant: "destructive" });
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({ title: '', category: 'Residential', youtubeUrl: '' });
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (activeTab === 'image') {
        if (!selectedFile) {
          toast({ title: "Error", description: "Please select an image", variant: "destructive" });
          return;
        }
        
        const { url } = await uploadFile(selectedFile, 'gallery');
        
        await addGalleryItem({
          type: 'image',
          url,
          title: formData.title,
          category: formData.category
        });
      } else {
        const youtubeId = extractYoutubeId(formData.youtubeUrl);
        if (!youtubeId) {
          toast({ title: "Error", description: "Invalid YouTube URL", variant: "destructive" });
          return;
        }
        await addGalleryItem({
          type: 'video',
          url: formData.youtubeUrl,
          youtubeId,
          title: formData.title,
          category: formData.category
        });
      }
      
      toast({ title: "Success", description: `${activeTab === 'image' ? 'Image' : 'Video'} added successfully` });
      setIsOpen(false);
      resetForm();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to add item";
      toast({ title: "Error", description: msg, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteGalleryItem(id);
        toast({ title: "Success", description: "Item deleted successfully" });
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete item", variant: "destructive" });
      }
    }
  };

  const handleBulkAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const files = bulkFileInputRef.current?.files;
    if (!files?.length) {
      toast({ title: "No files", description: "Select one or more image files", variant: "destructive" });
      return;
    }
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      toast({ title: "Invalid files", description: "Only image files (e.g. JPEG, PNG) are supported", variant: "destructive" });
      return;
    }
    setBulkProgress({ current: 0, total: imageFiles.length, phase: 'upload' });
    try {
      const results = await uploadMultipleFiles(imageFiles, 'gallery');
      setBulkProgress(prev => ({ ...prev, phase: 'save' }));
      const delayMs = 250;
      for (let i = 0; i < results.length; i++) {
        await addGalleryItem({
          type: 'image',
          url: results[i].url,
          title: titleFromFile(imageFiles[i]),
          category: bulkCategory
        });
        setBulkProgress(prev => ({ ...prev, current: i + 1 }));
        if (i < results.length - 1) {
          await new Promise(r => setTimeout(r, delayMs));
        }
      }
      toast({ title: "Success", description: `${results.length} image(s) added to gallery` });
      setBulkOpen(false);
      if (bulkFileInputRef.current) bulkFileInputRef.current.value = '';
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Bulk add failed. Try fewer images or check connection.";
      toast({ title: "Error", description: msg, variant: "destructive" });
    } finally {
      setBulkProgress({ current: 0, total: 0, phase: 'idle' });
    }
  };

  const images = galleryItems.filter(item => item.type === 'image');
  const videos = galleryItems.filter(item => item.type === 'video');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="text-muted-foreground">Manage images and videos</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Gallery Item</DialogTitle>
                <DialogDescription>
                  Add a new image or video to the gallery. Choose the type and fill in the details.
                </DialogDescription>
              </DialogHeader>
              <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); resetForm(); }}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image">
                    <Image className="w-4 h-4 mr-2" />
                    Image
                  </TabsTrigger>
                  <TabsTrigger value="video">
                    <Video className="w-4 h-4 mr-2" />
                    YouTube Video
                  </TabsTrigger>
                </TabsList>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {galleryCategories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <TabsContent value="image" className="mt-0 space-y-4">
                    <div>
                      <Label>Upload Image</Label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                      {previewUrl ? (
                        <div className="relative mt-2">
                          <img src={previewUrl} alt="Preview" className="img-uploaded w-full h-48 rounded-lg" />
                          <Button type="button" variant="secondary" size="sm" className="absolute bottom-2 right-2" onClick={() => fileInputRef.current?.click()}>Change</Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors mt-2" onClick={() => fileInputRef.current?.click()}>
                          <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload an image</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="video" className="mt-0">
                    <div>
                      <Label htmlFor="youtubeUrl">YouTube URL</Label>
                      <Input id="youtubeUrl" value={formData.youtubeUrl} onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." required={activeTab === 'video'} />
                      <p className="text-xs text-muted-foreground mt-1">Paste any YouTube video URL</p>
                    </div>
                  </TabsContent>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => { setIsOpen(false); resetForm(); }}>Cancel</Button>
                    <Button type="submit" disabled={uploading}>
                      {uploading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Uploading {progress}%</> : `Add ${activeTab === 'image' ? 'Image' : 'Video'}`}
                    </Button>
                  </div>
                </form>
              </Tabs>
            </DialogContent>
          </Dialog>
          <Dialog open={bulkOpen} onOpenChange={(open) => { setBulkOpen(open); if (!open) { if (bulkFileInputRef.current) bulkFileInputRef.current.value = ''; setBulkProgress({ current: 0, total: 0, phase: 'idle' }); } }}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Bulk add images
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk add images</DialogTitle>
                <DialogDescription>
                  Select multiple images (e.g. from your Downloads). They will be compressed, stored in the gallery, and shown on the site. One category applies to all.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBulkAdd} className="space-y-4 mt-2">
                <div>
                  <Label>Category for all</Label>
                  <Select value={bulkCategory} onValueChange={setBulkCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {galleryCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Images</Label>
                  <input
                    ref={bulkFileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-primary-foreground file:cursor-pointer"
                    onChange={() => {}}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Titles will be taken from file names. Only images (JPEG, PNG, etc.) are supported.
                  </p>
                </div>
                {(bulkProgress.phase === 'upload' || bulkProgress.phase === 'save') && (
                  <div className="flex items-center gap-2 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>
                      {bulkProgress.phase === 'upload' ? 'Uploading...' : 'Saving to gallery...'} {bulkProgress.current} / {bulkProgress.total}
                    </span>
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setBulkOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={bulkProgress.phase !== 'idle' && (uploading || bulkProgress.total > 0)}>
                    {bulkProgress.phase !== 'idle' ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {bulkProgress.phase === 'upload' ? `${progress}%` : `${bulkProgress.current}/${bulkProgress.total}`}
                      </>
                    ) : (
                      'Add all to gallery'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="images">
        <TabsList>
          <TabsTrigger value="images">
            <Image className="w-4 h-4 mr-2" />
            Images ({images.length})
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="w-4 h-4 mr-2" />
            Videos ({videos.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="images" className="mt-6">
          {loading ? (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <Card className="p-12 text-center">
              <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No images yet</h3>
              <p className="text-muted-foreground mb-4">Add images to your gallery</p>
              <Button onClick={() => { setActiveTab('image'); setIsOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {images.map((item) => (
                <Card key={item.id} className="overflow-hidden group relative">
                  <div className="aspect-square">
                    <img src={item.url} alt={item.title} className="img-uploaded" />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                    <h4 className="text-white font-medium text-center mb-1">{item.title}</h4>
                    <span className="text-white/70 text-sm mb-4">{item.category}</span>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="videos" className="mt-6">
          {loading ? (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-video bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : videos.length === 0 ? (
            <Card className="p-12 text-center">
              <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No videos yet</h3>
              <p className="text-muted-foreground mb-4">Add YouTube videos to your gallery</p>
              <Button onClick={() => { setActiveTab('video'); setIsOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Video
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src={`https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`} 
                      alt={item.title}
                      className="img-uploaded"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center">
                        <Play className="w-8 h-8 text-destructive-foreground fill-current" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <span className="text-sm text-muted-foreground">{item.category}</span>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminGallery;
