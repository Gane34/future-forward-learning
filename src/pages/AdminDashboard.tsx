import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import SEO from '@/components/SEO';
import { getAdminAuth } from '@/lib/blogStorage';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getAdminAuth()) {
      navigate('/admin/login');
      return;
    }

    setReady(true);
  }, [navigate]);

  if (!ready) {
    return null;
  }

  return (
    <div>
      <SEO title="Admin Dashboard" noIndex />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
