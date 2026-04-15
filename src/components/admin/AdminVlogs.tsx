import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useVlogs, Vlog } from "@/hooks/useVlogs";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2, Edit, Play, Loader2 } from "lucide-react";

const CATEGORIES = ["events", "lessons", "announcements", "activities", "general"];

// Extract video ID from various YouTube URL formats
const getYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
    /(?:youtu\.be\/)([^?\s]+)/,
    /(?:youtube\.com\/embed\/)([^?\s]+)/,
    /(?:youtube\.com\/shorts\/)([^?\s]+)/,
    /(?:youtube\.com\/v\/)([^?\s]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Extract video ID from Vimeo URLs
const getVimeoId = (url: string): string | null => {
  const match = url.match(/(?:vimeo\.com\/)(\d+)/);
  return match ? match[1] : null;
};

// Extract video ID from Dailymotion URLs
const getDailymotionId = (url: string): string | null => {
  const match = url.match(/(?:dailymotion\.com\/video\/|dai\.ly\/)([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
};

const AdminVlogs = () => {
  const { vlogs, loading, addVlog, updateVlog, deleteVlog } = useVlogs(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVlog, setSelectedVlog] = useState<Vlog | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vimeoThumbnails, setVimeoThumbnails] = useState<Record<string, string>>({});

  // Add form state
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newThumbnailUrl, setNewThumbnailUrl] = useState("");
  const [newCategory, setNewCategory] = useState("general");

  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editVideoUrl, setEditVideoUrl] = useState("");
  const [editThumbnailUrl, setEditThumbnailUrl] = useState("");
  const [editCategory, setEditCategory] = useState("");

  // Fetch Vimeo thumbnails via oEmbed API
  useEffect(() => {
    const vimeoVlogs = vlogs.filter(v => getVimeoId(v.video_url) && !v.thumbnail_url);
    vimeoVlogs.forEach(async (vlog) => {
      const vimeoId = getVimeoId(vlog.video_url);
      if (vimeoId && !vimeoThumbnails[vimeoId]) {
        try {
          const res = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}`);
          const data = await res.json();
          if (data.thumbnail_url) {
            setVimeoThumbnails(prev => ({ ...prev, [vimeoId]: data.thumbnail_url }));
          }
        } catch (e) {
          // Silently fail for Vimeo thumbnail fetch
        }
      }
    });
  }, [vlogs]);

  const getVideoThumbnail = (url: string, customThumbnail?: string | null) => {
    if (customThumbnail) return customThumbnail;

    // YouTube
    const ytId = getYouTubeId(url);
    if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;

    // Vimeo (from cached oEmbed results)
    const vimeoId = getVimeoId(url);
    if (vimeoId && vimeoThumbnails[vimeoId]) return vimeoThumbnails[vimeoId];

    // Dailymotion
    const dmId = getDailymotionId(url);
    if (dmId) return `https://www.dailymotion.com/thumbnail/video/${dmId}`;

    return null;
  };

  const handleAdd = async () => {
    if (!newTitle || !newVideoUrl) return;

    setIsSubmitting(true);
    const result = await addVlog(newTitle, newVideoUrl, newDescription, newCategory, newThumbnailUrl);
    setIsSubmitting(false);

    if (result.success) {
      setIsAddDialogOpen(false);
      resetAddForm();
    }
  };

  const resetAddForm = () => {
    setNewTitle("");
    setNewDescription("");
    setNewVideoUrl("");
    setNewThumbnailUrl("");
    setNewCategory("general");
  };

  const handleEdit = (vlog: Vlog) => {
    setSelectedVlog(vlog);
    setEditTitle(vlog.title);
    setEditDescription(vlog.description || "");
    setEditVideoUrl(vlog.video_url);
    setEditThumbnailUrl(vlog.thumbnail_url || "");
    setEditCategory(vlog.category);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedVlog) return;

    setIsSubmitting(true);
    await updateVlog(selectedVlog.id, {
      title: editTitle,
      description: editDescription,
      video_url: editVideoUrl,
      thumbnail_url: editThumbnailUrl || null,
      category: editCategory,
    });
    setIsSubmitting(false);
    setIsEditDialogOpen(false);
  };

  const handleToggleVisibility = async (vlog: Vlog) => {
    await updateVlog(vlog.id, { is_visible: !vlog.is_visible });
  };

  const handleDelete = async (vlog: Vlog) => {
    if (confirm("Are you sure you want to delete this vlog?")) {
      await deleteVlog(vlog.id);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-poppins text-xl font-bold">Vlogs Management</h2>
          <p className="font-inter text-sm text-muted-foreground">
            {vlogs.length} vlogs published
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="font-inter">
              <Plus className="h-4 w-4 mr-2" />
              Add Vlog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-poppins">Add New Vlog</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-inter">Title *</Label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Vlog title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="video-url" className="font-inter">Video URL *</Label>
                <Input
                  id="video-url"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  placeholder="YouTube or video URL"
                />
                <p className="text-xs text-muted-foreground">
                  Paste a YouTube link (e.g., https://youtube.com/watch?v=...)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-inter">Description</Label>
                <Textarea
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Optional description"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail-url" className="font-inter">Custom Thumbnail URL</Label>
                <Input
                  id="thumbnail-url"
                  value={newThumbnailUrl}
                  onChange={(e) => setNewThumbnailUrl(e.target.value)}
                  placeholder="Optional custom thumbnail"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="font-inter">Category</Label>
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat} className="capitalize">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={!newTitle || !newVideoUrl || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Vlog"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Vlogs Grid */}
      {vlogs.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="font-inter text-muted-foreground">
              No vlogs yet. Click "Add Vlog" to create your first video blog.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vlogs.map((vlog) => (
            <Card key={vlog.id} className={`overflow-hidden ${!vlog.is_visible ? "opacity-60" : ""}`}>
              <CardContent className="p-0">
                <div className="relative">
                  {getVideoThumbnail(vlog.video_url, vlog.thumbnail_url) ? (
                    <img
                      src={getVideoThumbnail(vlog.video_url, vlog.thumbnail_url)!}
                      alt={vlog.title}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-muted flex items-center justify-center">
                      <Play className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  {!vlog.is_visible && (
                    <div className="absolute top-2 right-2 bg-background/90 rounded px-2 py-1">
                      <span className="font-inter text-xs text-muted-foreground">Hidden</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-poppins font-semibold truncate">{vlog.title}</h3>
                  <p className="font-inter text-sm text-muted-foreground capitalize">{vlog.category}</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={vlog.is_visible}
                        onCheckedChange={() => handleToggleVisibility(vlog)}
                      />
                      <span className="font-inter text-sm text-muted-foreground">
                        {vlog.is_visible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline" onClick={() => handleEdit(vlog)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => handleDelete(vlog)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-poppins">Edit Vlog</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title" className="font-inter">Title</Label>
              <Input
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-video-url" className="font-inter">Video URL</Label>
              <Input
                id="edit-video-url"
                value={editVideoUrl}
                onChange={(e) => setEditVideoUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description" className="font-inter">Description</Label>
              <Textarea
                id="edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-thumbnail-url" className="font-inter">Custom Thumbnail URL</Label>
              <Input
                id="edit-thumbnail-url"
                value={editThumbnailUrl}
                onChange={(e) => setEditThumbnailUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category" className="font-inter">Category</Label>
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="capitalize">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminVlogs;
