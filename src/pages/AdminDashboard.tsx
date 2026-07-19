import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { getAdminAuth } from '@/lib/blogStorage';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAdminAuth()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div>
      <SEO title="Admin Dashboard" noIndex />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Admin Dashboard" noIndex={true} />
      {/* Top bar */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              View Site
            </Button>
            <Button variant="ghost" size="sm" onClick={() => {
              signOut();
              localStorage.removeItem("admin_auth");
              navigate("/admin/login");
            }}>
              <LogOut className="w-4 h-4 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Insights Blog Posts</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Create and manage blog posts for the Dr. Muggu insights page.
            </p>
          </div>
          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-1" />
            New Story
          </Button>
        </div>

        {loadingStories ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : stories.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <ImageIcon className="w-12 h-12 text-muted-foreground/40 mb-4" />
              <h3 className="font-semibold text-foreground mb-1">No blog posts yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add your first insights article to publish it on the blog section.
              </p>
              <Button onClick={openCreateDialog} size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Create Story
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stories.map((story) => (
                  <TableRow key={story.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {story.image_url ? (
                          <img
                            src={story.image_url}
                            alt=""
                            className="w-10 h-10 rounded-md object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center shrink-0">
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                        <span className="font-medium text-foreground truncate max-w-[200px]">
                          {story.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {new Date(story.story_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${story.published
                          ? "bg-secondary/10 text-secondary"
                          : "bg-muted text-muted-foreground"
                          }`}
                      >
                        {story.published ? (
                          <>
                            <Eye className="w-3 h-3" /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" /> Draft
                          </>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(story)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setDeletingStory(story);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}


        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-foreground">Inquiries</h2>
          <p className="text-sm text-muted-foreground mt-1">
            New applications from the "Get Started" page.
          </p>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No inquiries received yet.
                  </TableCell>
                </TableRow>
              ) : (
                inquiries.map((inq) => (
                  <TableRow key={inq.id}>
                    <TableCell>{new Date(inq.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{inq.name}</TableCell>
                    <TableCell>{inq.role}</TableCell>
                    <TableCell>{inq.email}</TableCell>
                    <TableCell>{inq.mobile}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </main>

      {/* Admissions Section */}
      <div className="mt-12 mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Admissions</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Applications submitted via the Admission Form.
          </p>
        </div>
        <Button onClick={exportAdmissionsToExcel} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export to Excel
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Age / Grade</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>City</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No admissions yet. Share the <strong>/admission</strong> link with parents.
                  </TableCell>
                </TableRow>
              ) : (
                admissions.map((adm) => (
                  <TableRow key={adm.id}>
                    <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                      {new Date(adm.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{adm.studentName}</TableCell>
                    <TableCell className="text-sm">{adm.age}y / {adm.grade}</TableCell>
                    <TableCell>{adm.parentName}</TableCell>
                    <TableCell>{adm.parentMobile}</TableCell>
                    <TableCell className="text-sm max-w-[160px] truncate">{adm.programLevel}</TableCell>
                    <TableCell>{adm.city}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Project Management Section */}
      <section className="container mx-auto px-6 pb-10">
        <div className="border-t border-border pt-10">
          <ProjectManagement />
        </div>
      </section>

      {/* Internship Applications Section */}
      <div className="mt-12 mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Junior Internship Applications</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Applications submitted via the Junior Internship Form.
          </p>
        </div>
        <Button onClick={exportInternshipsToExcel} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export to Excel
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Class/Grade</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Parent Contact</TableHead>
                <TableHead>Mode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internshipApps.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No internship applications yet.
                  </TableCell>
                </TableRow>
              ) : (
                internshipApps.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{app.studentName}</TableCell>
                    <TableCell className="text-sm">{app.classGrade}</TableCell>
                    <TableCell className="text-sm max-w-[160px] truncate">{app.schoolName}</TableCell>
                    <TableCell>{app.parentContact}</TableCell>
                    <TableCell className="text-sm">{app.preferredMode}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Graduate Internship Applications Section */}
      <div className="mt-12 mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Graduate Internship Applications</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Applications submitted via the Graduate Internship Form.
          </p>
        </div>
        <Button onClick={exportGraduateInternshipsToExcel} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export to Excel
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Track</TableHead>
                <TableHead>City</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {graduateInternshipApps.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No graduate internship applications yet.
                  </TableCell>
                </TableRow>
              ) : (
                graduateInternshipApps.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell className="text-sm">{app.email}</TableCell>
                    <TableCell>{app.phone}</TableCell>
                    <TableCell className="text-sm">{app.qualification}</TableCell>
                    <TableCell className="text-sm max-w-[160px] truncate">{app.track}</TableCell>
                    <TableCell>{app.city}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <section className="container mx-auto px-6 pb-10">
        <div className="border-t border-border pt-10">
          {/* placeholder for any other sections */}
        </div>
      </section>

      {/* Project Management Section */}
      <section className="container mx-auto px-6 pb-10">
        <div className="border-t border-border pt-10">
          <ProjectManagement />
        </div>
      </section>

      {/* Founder Achievements Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="border-t border-border pt-10">
          <FounderAchievementsManagement />
        </div>
      </section>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingStory ? "Edit Story" : "New Story"}</DialogTitle>
            <DialogDescription>
              {editingStory
                ? "Update this achievement story."
                : "Share an achievement with parents and visitors."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="First Robotics Competition Win"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Story</Label>
              <Textarea
                id="content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Describe this achievement…"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="story_date">Date</Label>
                <Input
                  id="story_date"
                  type="date"
                  value={form.story_date}
                  onChange={(e) => setForm({ ...form, story_date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Visibility</Label>
                <div className="flex items-center gap-2 h-10">
                  <input
                    type="checkbox"
                    id="published"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="rounded border-input"
                  />
                  <Label htmlFor="published" className="text-sm font-normal text-muted-foreground">
                    Published
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              {imagePreview && (
                <div className="relative rounded-lg overflow-hidden mb-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving…
                  </>
                ) : editingStory ? (
                  "Update Story"
                ) : (
                  "Publish Story"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Story</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingStory?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div >
  );
};

export default AdminDashboard;
