import { useAuth } from '@/contexts/AuthContext';
import { useProjects, useGallery } from '@/hooks/useFirestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Image, Video, Settings, TrendingUp, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { projects } = useProjects();
  const { galleryItems } = useGallery();

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: Building2,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Ongoing Projects",
      value: projects.filter(p => p.status === 'ongoing').length,
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Gallery Images",
      value: galleryItems.filter(g => g.type === 'image').length,
      icon: Image,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Gallery Videos",
      value: galleryItems.filter(g => g.type === 'video').length,
      icon: Video,
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    }
  ];

  const quickLinks = [
    { title: "Manage Projects", href: "/admin/projects", icon: FolderOpen, description: "Add, edit, or remove projects" },
    { title: "Manage Gallery", href: "/admin/gallery", icon: Image, description: "Upload images and videos" },
    { title: "Social Links", href: "/admin/settings", icon: Settings, description: "Update social media links" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">
          Logged in as {currentUser?.email}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <link.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
        <Card>
          <CardContent className="p-0">
            {projects.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No projects yet. <Link to="/admin/projects" className="text-primary hover:underline">Add your first project</Link>
              </div>
            ) : (
              <div className="divide-y">
                {projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.location}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed' ? 'bg-green-100 text-green-700' :
                      project.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
