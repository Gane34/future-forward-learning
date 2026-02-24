import { useState, useEffect } from "react";
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
import { Plus, Pencil, Trash2, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Achievement {
    id: string;
    category: string;
    title: string;
    desc: string;
}

const LS_KEY = "founder_achievements";

const emptyForm = {
    category: "",
    title: "",
    desc: "",
};

const FounderAchievementsManagement = () => {
    const { toast } = useToast();
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Achievement | null>(null);
    const [deletingItem, setDeletingItem] = useState<Achievement | null>(null);
    const [form, setForm] = useState(emptyForm);

    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(LS_KEY);
        if (stored) {
            try {
                setAchievements(JSON.parse(stored));
            } catch {
                setAchievements([]);
            }
        }
    }, []);

    const persist = (updated: Achievement[]) => {
        setAchievements(updated);
        localStorage.setItem(LS_KEY, JSON.stringify(updated));
    };

    const openCreateDialog = () => {
        setEditingItem(null);
        setForm(emptyForm);
        setDialogOpen(true);
    };

    const openEditDialog = (item: Achievement) => {
        setEditingItem(item);
        setForm({ category: item.category, title: item.title, desc: item.desc });
        setDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingItem) {
            const updated = achievements.map((a) =>
                a.id === editingItem.id ? { ...a, ...form } : a
            );
            persist(updated);
            toast({ title: "Updated", description: "Achievement updated successfully." });
        } else {
            const newItem: Achievement = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                ...form,
            };
            persist([...achievements, newItem]);
            toast({ title: "Added", description: "Achievement added successfully." });
        }

        setDialogOpen(false);
    };

    const handleDelete = () => {
        if (!deletingItem) return;
        const updated = achievements.filter((a) => a.id !== deletingItem.id);
        persist(updated);
        toast({ title: "Deleted", description: "Achievement removed." });
        setDeleteDialogOpen(false);
        setDeletingItem(null);
    };

    return (
        <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Founder Achievements</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage the achievements & recognitions shown on the Founder page.
                    </p>
                </div>
                <Button onClick={openCreateDialog}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Achievement
                </Button>
            </div>

            {achievements.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <Trophy className="w-12 h-12 text-muted-foreground/40 mb-4" />
                        <h3 className="font-semibold text-foreground mb-1">No achievements yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            The hardcoded defaults will show on the Founder page until you add entries here.
                        </p>
                        <Button onClick={openCreateDialog} size="sm">
                            <Plus className="w-4 h-4 mr-1" />
                            Add Achievement
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="hidden md:table-cell">Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {achievements.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <span className="inline-flex items-center text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-2 py-1 rounded-full">
                                            {item.category}
                                        </span>
                                    </TableCell>
                                    <TableCell className="font-medium text-foreground max-w-[200px] truncate">
                                        {item.title}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-muted-foreground max-w-[300px] truncate">
                                        {item.desc}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditDialog(item)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setDeletingItem(item);
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
                        <DialogTitle>
                            {editingItem ? "Edit Achievement" : "New Achievement"}
                        </DialogTitle>
                        <DialogDescription>
                            {editingItem
                                ? "Update the achievement details."
                                : "Add a new achievement to the Founder page."}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                placeholder="e.g. Academia, Innovation, Leadership"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ach-title">Title</Label>
                            <Input
                                id="ach-title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="e.g. PhD in Advanced Computing & AI"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ach-desc">Description</Label>
                            <Textarea
                                id="ach-desc"
                                value={form.desc}
                                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                                placeholder="Briefly describe this achievement…"
                                rows={4}
                                required
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {editingItem ? "Update" : "Add Achievement"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Achievement</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{deletingItem?.title}"? This cannot be undone.
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

export default FounderAchievementsManagement;
