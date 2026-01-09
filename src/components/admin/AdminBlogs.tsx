import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useBlogs, Blog } from "@/hooks/useBlogs";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2, Upload, Image as ImageIcon, Eye, EyeOff, Calendar } from "lucide-react";

const AdminBlogs = () => {
  const { blogs, loading, addBlog, updateBlog, deleteBlog, uploadCoverImage } = useBlogs(true);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Add form state
  const [addTitle, setAddTitle] = useState("");
  const [addContent, setAddContent] = useState("");
  const [addCoverImage, setAddCoverImage] = useState<string | null>(null);
  const [addPublished, setAddPublished] = useState(false);
  const [addPreviewUrl, setAddPreviewUrl] = useState<string | null>(null);
  
  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editCoverImage, setEditCoverImage] = useState<string | null>(null);
  const [editPublished, setEditPublished] = useState(false);
  
  const addFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const handleAddFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAddPreviewUrl(URL.createObjectURL(file));
    setIsUploading(true);
    
    const result = await uploadCoverImage(file);
    if (result.success && result.url) {
      setAddCoverImage(result.url);
    }
    setIsUploading(false);
  };

  const handleEditFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const result = await uploadCoverImage(file);
    if (result.success && result.url) {
      setEditCoverImage(result.url);
    }
    setIsUploading(false);
  };

  const handleAdd = async () => {
    if (!addTitle.trim()) return;
    
    const result = await addBlog(addTitle, addContent, addCoverImage, addPublished);
    if (result.success) {
      resetAddForm();
      setIsAddDialogOpen(false);
    }
  };

  const resetAddForm = () => {
    setAddTitle("");
    setAddContent("");
    setAddCoverImage(null);
    setAddPublished(false);
    setAddPreviewUrl(null);
  };

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setEditTitle(blog.title);
    setEditContent(blog.content || "");
    setEditCoverImage(blog.cover_image);
    setEditPublished(blog.published);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedBlog || !editTitle.trim()) return;

    const result = await updateBlog(selectedBlog.id, {
      title: editTitle,
      content: editContent,
      cover_image: editCoverImage,
      published: editPublished,
    });

    if (result.success) {
      setIsEditDialogOpen(false);
      setSelectedBlog(null);
    }
  };

  const handleTogglePublished = async (blog: Blog) => {
    await updateBlog(blog.id, { published: !blog.published });
  };

  const handleDelete = async (blog: Blog) => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      await deleteBlog(blog.id, blog.cover_image);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-poppins text-2xl font-bold">Blog Posts</h2>
          <p className="font-inter text-sm text-muted-foreground">
            {blogs.length} post{blogs.length !== 1 ? "s" : ""}
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="font-inter">
              <Plus className="h-4 w-4 mr-2" />
              Add Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-poppins">Add New Blog Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              {/* Cover Image Upload */}
              <div className="space-y-2">
                <Label className="font-inter">Cover Image</Label>
                <input
                  ref={addFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAddFileChange}
                  className="hidden"
                />
                <div 
                  onClick={() => addFileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  {addPreviewUrl || addCoverImage ? (
                    <img 
                      src={addPreviewUrl || addCoverImage || ""} 
                      alt="Preview" 
                      className="max-h-48 mx-auto rounded-lg object-cover"
                    />
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="font-inter text-sm text-muted-foreground">
                        Click to upload cover image
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="add-title" className="font-inter">Title *</Label>
                <Input
                  id="add-title"
                  value={addTitle}
                  onChange={(e) => setAddTitle(e.target.value)}
                  placeholder="Enter blog title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="add-content" className="font-inter">Content</Label>
                <Textarea
                  id="add-content"
                  value={addContent}
                  onChange={(e) => setAddContent(e.target.value)}
                  placeholder="Write your blog content..."
                  rows={10}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="add-published"
                  checked={addPublished}
                  onCheckedChange={setAddPublished}
                />
                <Label htmlFor="add-published" className="font-inter">
                  Publish immediately
                </Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleAdd} 
                  disabled={!addTitle.trim() || isUploading}
                >
                  {isUploading ? "Uploading..." : "Create Post"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {blogs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="font-inter text-muted-foreground">
              No blog posts yet. Click "Add Blog Post" to create your first post.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden">
              <div className="relative h-40 bg-muted">
                {blog.cover_image ? (
                  <img
                    src={blog.cover_image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  {blog.published ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Eye className="h-3 w-3 mr-1" />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <EyeOff className="h-3 w-3 mr-1" />
                      Draft
                    </span>
                  )}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="font-poppins text-lg line-clamp-2">
                  {blog.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blog.content && (
                  <p className="font-inter text-sm text-muted-foreground line-clamp-2">
                    {blog.content}
                  </p>
                )}
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(blog.created_at)}
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={blog.published}
                      onCheckedChange={() => handleTogglePublished(blog)}
                    />
                    <span className="text-xs text-muted-foreground">
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(blog)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(blog)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-poppins">Edit Blog Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            {/* Cover Image */}
            <div className="space-y-2">
              <Label className="font-inter">Cover Image</Label>
              <input
                ref={editFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleEditFileChange}
                className="hidden"
              />
              <div 
                onClick={() => editFileInputRef.current?.click()}
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
              >
                {editCoverImage ? (
                  <img 
                    src={editCoverImage} 
                    alt="Preview" 
                    className="max-h-48 mx-auto rounded-lg object-cover"
                  />
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="font-inter text-sm text-muted-foreground">
                      Click to upload cover image
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-title" className="font-inter">Title *</Label>
              <Input
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Enter blog title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-content" className="font-inter">Content</Label>
              <Textarea
                id="edit-content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Write your blog content..."
                rows={10}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="edit-published"
                checked={editPublished}
                onCheckedChange={setEditPublished}
              />
              <Label htmlFor="edit-published" className="font-inter">
                Published
              </Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSaveEdit} 
                disabled={!editTitle.trim() || isUploading}
              >
                {isUploading ? "Uploading..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlogs;
