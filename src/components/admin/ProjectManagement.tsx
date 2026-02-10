import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Loader2, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Project {
    id: string;
    title: string;
    student_name: string;
    quote: string;
    description: string;
    tags: string[];
    image_url: string | null;
    created_at: string;
}

const emptyForm = {
    title: "",
    student_name: "",
    quote: "",
    description: "",
    tags: "",
};

const ProjectManagement = () => {
    const { toast } = useToast();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [deletingProject, setDeletingProject] = useState<Project | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchProjects = useCallback(async () => {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching projects:", error);
        } else {
            setProjects(data as Project[]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const openCreateDialog = () => {
        setEditingProject(null);
        setForm(emptyForm);
        setImageFile(null);
        setImagePreview(null);
        setDialogOpen(true);
    };

    const openEditDialog = (project: Project) => {
        setEditingProject(project);
        setForm({
            title: project.title,
            student_name: project.student_name,
            quote: project.quote || "",
            description: project.description,
            tags: project.tags?.join(", ") || "",
        });
        setImageFile(null);
        setImagePreview(project.image_url);
        setDialogOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error } = await supabase.storage
            .from("project-images")
            .upload(fileName, file);

        if (error) {
            console.error("Upload error:", error);
            return null;
        }

        const { data: urlData } = supabase.storage
            .from("project-images")
            .getPublicUrl(fileName);

        return urlData.publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        let image_url = editingProject?.image_url || null;

        if (imageFile) {
            const uploadedUrl = await uploadImage(imageFile);
            if (uploadedUrl) image_url = uploadedUrl;
        }

        const payload = {
            title: form.title,
            student_name: form.student_name,
            quote: form.quote,
            description: form.description,
            tags: form.tags.split(",").map(t => t.trim()).filter(t => t),
            image_url,
        };

        if (editingProject) {
            const { error } = await supabase
                .from("projects")
                .update(payload)
                .eq("id", editingProject.id);

            if (error) {
                toast({ title: "Error", description: "Failed to update project.", variant: "destructive" });
            } else {
                toast({ title: "Updated", description: "Project updated successfully." });
            }
        } else {
            const { error } = await supabase.from("projects").insert(payload);

            if (error) {
                toast({ title: "Error", description: "Failed to create project.", variant: "destructive" });
            } else {
                toast({ title: "Created", description: "Project created successfully." });
            }
        }

        setSubmitting(false);
        setDialogOpen(false);
        fetchProjects();
    };

    const handleDelete = async () => {
        if (!deletingProject) return;

        const { error } = await supabase
            .from("projects")
            .delete()
            .eq("id", deletingProject.id);

        if (error) {
            toast({ title: "Error", description: "Failed to delete project.", variant: "destructive" });
        } else {
            toast({ title: "Deleted", description: "Project deleted." });
        }

        setDeleteDialogOpen(false);
        setDeletingProject(null);
        fetchProjects();
    };

    return (
        <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Student Projects</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Showcase student innovations.
                    </p>
                </div>
                <Button onClick={openCreateDialog}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Project
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
            ) : projects.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground/40 mb-4" />
                        <h3 className="font-semibold text-foreground mb-1">No projects yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Add the first student project to the showcase.
                        </p>
                        <Button onClick={openCreateDialog} size="sm">
                            <Plus className="w-4 h-4 mr-1" />
                            Add Project
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead>Student</TableHead>
                                <TableHead className="hidden md:table-cell">Tags</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            {project.image_url ? (
                                                <img
                                                    src={project.image_url}
                                                    alt=""
                                                    className="w-10 h-10 rounded-md object-cover shrink-0"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center shrink-0">
                                                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                                                </div>
                                            )}
                                            <span className="font-medium text-foreground truncate max-w-[200px]">
                                                {project.title}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{project.student_name}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex flex-wrap gap-1">
                                            {project.tags?.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags?.length > 2 && (
                                                <span className="text-xs text-muted-foreground px-1">+{project.tags.length - 2}</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditDialog(project)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setDeletingProject(project);
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

            {/* Create / Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{editingProject ? "Edit Project" : "New Project"}</DialogTitle>
                        <DialogDescription>
                            {editingProject
                                ? "Update student project details."
                                : "Add a new student project to the showcase."}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Project Title</Label>
                            <Input
                                id="title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="Smart Obstacle Robot"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="student_name">Student Name</Label>
                            <Input
                                id="student_name"
                                value={form.student_name}
                                onChange={(e) => setForm({ ...form, student_name: e.target.value })}
                                placeholder="Aarav, Age 11"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quote">Student Quote</Label>
                            <Input
                                id="quote"
                                value={form.quote}
                                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                                placeholder="I wanted to make a robot that..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Used ultrasonic sensors and Arduino..."
                                rows={3}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags (comma separated)</Label>
                            <Input
                                id="tags"
                                value={form.tags}
                                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                                placeholder="Robotics, C++, Arduino"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Project Image</Label>
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
                                ) : editingProject ? (
                                    "Update Project"
                                ) : (
                                    "Add Project"
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
                        <DialogTitle>Delete Project</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{deletingProject?.title}"? This action cannot be undone.
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
        </div>
    );
};

export default ProjectManagement;
