import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus, Trash2, Edit, MapPin, Eye, EyeOff } from "lucide-react";
import { useSchoolLocations } from "@/hooks/useSchoolLocations";

const AdminLocations = () => {
  const { locations, loading, addLocation, updateLocation, deleteLocation } = useSchoolLocations(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<typeof locations[0] | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    google_maps_url: "",
    google_maps_embed: "",
    is_visible: true,
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
      google_maps_url: "",
      google_maps_embed: "",
      is_visible: true,
      display_order: 0,
    });
  };

  const handleAdd = async () => {
    const result = await addLocation(formData);
    if (result.success) {
      setIsAddDialogOpen(false);
      resetForm();
    }
  };

  const handleUpdate = async () => {
    if (!editingLocation) return;
    const result = await updateLocation(editingLocation.id, formData);
    if (result.success) {
      setEditingLocation(null);
      resetForm();
    }
  };

  const openEditDialog = (location: typeof locations[0]) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      address: location.address,
      phone: location.phone || "",
      email: location.email || "",
      google_maps_url: location.google_maps_url || "",
      google_maps_embed: location.google_maps_embed || "",
      is_visible: location.is_visible,
      display_order: location.display_order,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const LocationForm = ({ onSubmit, submitLabel }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="font-inter">Location Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Main Campus"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address" className="font-inter">Address *</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="123 School Road, City, Country"
          rows={2}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="font-inter">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+256 XXX XXXXXX"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="font-inter">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="campus@school.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="google_maps_url" className="font-inter">Google Maps Link</Label>
        <Input
          id="google_maps_url"
          value={formData.google_maps_url}
          onChange={(e) => setFormData({ ...formData, google_maps_url: e.target.value })}
          placeholder="https://maps.google.com/..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="google_maps_embed" className="font-inter">Google Maps Embed Code</Label>
        <Textarea
          id="google_maps_embed"
          value={formData.google_maps_embed}
          onChange={(e) => setFormData({ ...formData, google_maps_embed: e.target.value })}
          placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'
          rows={3}
        />
        <p className="text-xs text-muted-foreground">
          Go to Google Maps → Share → Embed a map → Copy the iframe code
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="display_order" className="font-inter">Display Order</Label>
          <Input
            id="display_order"
            type="number"
            value={formData.display_order}
            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <Switch
            id="is_visible"
            checked={formData.is_visible}
            onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
          />
          <Label htmlFor="is_visible" className="font-inter">Visible on website</Label>
        </div>
      </div>
      <Button onClick={onSubmit} className="w-full font-inter">
        {submitLabel}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-poppins">School Locations</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="font-inter">
                <Plus className="h-4 w-4 mr-2" />
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-poppins">Add New Location</DialogTitle>
              </DialogHeader>
              <LocationForm onSubmit={handleAdd} submitLabel="Add Location" />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {locations.length === 0 ? (
            <p className="text-muted-foreground font-inter text-center py-8">
              No locations added yet. Click "Add Location" to create one.
            </p>
          ) : (
            <div className="space-y-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-inter font-semibold">{location.name}</h4>
                        {location.is_visible ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <p className="font-inter text-sm text-muted-foreground">{location.address}</p>
                      <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                        {location.phone && <span>{location.phone}</span>}
                        {location.email && <span>{location.email}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(location)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteLocation(location.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!editingLocation} onOpenChange={() => setEditingLocation(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-poppins">Edit Location</DialogTitle>
          </DialogHeader>
          <LocationForm onSubmit={handleUpdate} submitLabel="Save Changes" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLocations;
