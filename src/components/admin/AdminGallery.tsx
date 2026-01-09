import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useGallery, GalleryImage } from "@/hooks/useGallery";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2, Edit, Eye, EyeOff, Upload, Loader2, Replace } from "lucide-react";

const CATEGORIES = ["events", "classrooms", "sports", "graduation", "activities", "facilities", "general"];

const AdminGallery = () => {
  const { images, loading, uploadImage, updateImage, deleteImage, replaceImage } = useGallery(true);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isReplacing, setIsReplacing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  // Upload form state
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!newFile || !newTitle) return;

    setIsUploading(true);
    const result = await uploadImage(newFile, newTitle, newDescription, newCategory);
    setIsUploading(false);

    if (result.success) {
      setIsUploadDialogOpen(false);
      resetUploadForm();
    }
  };

  const resetUploadForm = () => {
    setNewTitle("");
    setNewDescription("");
    setNewCategory("general");
    setNewFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setSelectedImage(image);
    setEditTitle(image.title);
    setEditDescription(image.description || "");
    setEditCategory(image.category);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedImage) return;

    await updateImage(selectedImage.id, {
      title: editTitle,
      description: editDescription,
      category: editCategory,
    });

    setIsEditDialogOpen(false);
  };

  const handleReplaceImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedImage) return;

    setIsReplacing(true);
    await replaceImage(selectedImage.id, selectedImage.image_url, file);
    setIsReplacing(false);
    
    // Update the selected image state to show new image
    setSelectedImage(prev => prev ? { ...prev, image_url: URL.createObjectURL(file) } : null);
    
    // Reset input
    if (replaceInputRef.current) {
      replaceInputRef.current.value = "";
    }
  };

  const handleToggleVisibility = async (image: GalleryImage) => {
    await updateImage(image.id, { is_visible: !image.is_visible });
  };

  const handleDelete = async (image: GalleryImage) => {
    if (confirm("Are you sure you want to delete this image?")) {
      await deleteImage(image.id, image.image_url);
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
      {/* Header with Upload Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-poppins text-xl font-bold">Gallery Management</h2>
          <p className="font-inter text-sm text-muted-foreground">
            {images.length} images in gallery
          </p>
        </div>

        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="font-inter">
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-poppins">Upload New Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded" />
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="font-inter text-sm text-muted-foreground">
                      Click to upload an image
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="font-inter">Title *</Label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Image title"
                />
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
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!newFile || !newTitle || isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Images Grid */}
      {images.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="font-inter text-muted-foreground">
              No images in the gallery yet. Click "Add Image" to upload your first image.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className={`overflow-hidden ${!image.is_visible ? "opacity-60" : ""}`}>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-48 object-cover"
                  />
                  {!image.is_visible && (
                    <div className="absolute top-2 right-2 bg-background/90 rounded px-2 py-1">
                      <span className="font-inter text-xs text-muted-foreground">Hidden</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-poppins font-semibold truncate">{image.title}</h3>
                  <p className="font-inter text-sm text-muted-foreground capitalize">{image.category}</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={image.is_visible}
                        onCheckedChange={() => handleToggleVisibility(image)}
                      />
                      <span className="font-inter text-sm text-muted-foreground">
                        {image.is_visible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline" onClick={() => handleEdit(image)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => handleDelete(image)}>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-poppins">Edit Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedImage && (
              <div className="relative group">
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => replaceInputRef.current?.click()}
                    disabled={isReplacing}
                  >
                    {isReplacing ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Replace className="h-4 w-4 mr-1" />}
                    Replace Image
                  </Button>
                  <input
                    ref={replaceInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleReplaceImage}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="edit-title" className="font-inter">Title</Label>
              <Input
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
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
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGallery;
