import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminProfile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">Manage the local admin profile for this installation.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Administrator</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">This installation uses browser-based local storage for the blog CMS. It remains self-contained and does not depend on external services.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfile;
