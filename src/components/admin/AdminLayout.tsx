import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, FileText, PlusCircle, BookOpen, ImageIcon, Settings, UserCircle, LogOut } from 'lucide-react';
import { clearAdminAuth, getAdminAuth } from '@/lib/blogStorage';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: LayoutGrid },
  { label: 'Blogs', to: '/admin/blogs', icon: FileText },
  { label: 'New Blog', to: '/admin/blogs/new', icon: PlusCircle },
  { label: 'Published', to: '/admin/published', icon: BookOpen },
  { label: 'Media', to: '/admin/media', icon: ImageIcon },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
  { label: 'Profile', to: '/admin/profile', icon: UserCircle },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAdminAuth();
    navigate('/admin/login');
  };

  if (!getAdminAuth()) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-border bg-card/80 p-6 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Admin Panel</h2>
            <p className="mt-2 text-sm text-muted-foreground">Secure content management for insights.</p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 border-t border-border pt-6">
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </aside>
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
