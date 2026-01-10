import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useAdmissionApplications } from "@/hooks/useAdmissionApplications";
import { useSchoolLocations } from "@/hooks/useSchoolLocations";

interface EnrollNowDialogProps {
  trigger?: React.ReactNode;
  className?: string;
}

const EnrollNowDialog = ({ trigger, className }: EnrollNowDialogProps) => {
  const { submitApplication } = useAdmissionApplications();
  const { locations } = useSchoolLocations();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    parent_name: "",
    phone: "",
    email: "",
    child_name: "",
    child_age: "",
    program: "",
    preferred_campus: "",
    additional_info: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await submitApplication({
      ...formData,
      child_age: parseInt(formData.child_age),
    });
    if (result.success) {
      setFormData({
        parent_name: "",
        phone: "",
        email: "",
        child_name: "",
        child_age: "",
        program: "",
        preferred_campus: "",
        additional_info: "",
      });
      setIsOpen(false);
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className={`font-inter ${className || ""}`}>
            Enroll Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-poppins text-2xl">Quick Enrollment Inquiry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="enroll-parentName" className="font-inter">Parent/Guardian Name *</Label>
              <Input
                id="enroll-parentName"
                placeholder="John Doe"
                required
                value={formData.parent_name}
                onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enroll-phone" className="font-inter">Phone Number *</Label>
              <Input
                id="enroll-phone"
                type="tel"
                placeholder="+256 XXX XXXXXX"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="enroll-email" className="font-inter">Email Address *</Label>
            <Input
              id="enroll-email"
              type="email"
              placeholder="john@example.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="enroll-childName" className="font-inter">Child's Name *</Label>
              <Input
                id="enroll-childName"
                placeholder="Jane Doe"
                required
                value={formData.child_name}
                onChange={(e) => setFormData({ ...formData, child_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enroll-age" className="font-inter">Child's Age *</Label>
              <Input
                id="enroll-age"
                type="number"
                placeholder="5"
                required
                value={formData.child_age}
                onChange={(e) => setFormData({ ...formData, child_age: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="enroll-program" className="font-inter">Program *</Label>
              <Select
                value={formData.program}
                onValueChange={(value) => setFormData({ ...formData, program: value })}
              >
                <SelectTrigger id="enroll-program">
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baby">Baby Class</SelectItem>
                  <SelectItem value="nursery">Nursery</SelectItem>
                  <SelectItem value="p1">Primary 1</SelectItem>
                  <SelectItem value="p2">Primary 2</SelectItem>
                  <SelectItem value="p3">Primary 3</SelectItem>
                  <SelectItem value="p4">Primary 4</SelectItem>
                  <SelectItem value="p5">Primary 5</SelectItem>
                  <SelectItem value="p6">Primary 6</SelectItem>
                  <SelectItem value="p7">Primary 7</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="enroll-campus" className="font-inter">Campus *</Label>
              <Select
                value={formData.preferred_campus}
                onValueChange={(value) => setFormData({ ...formData, preferred_campus: value })}
              >
                <SelectTrigger id="enroll-campus">
                  <SelectValue placeholder="Select campus" />
                </SelectTrigger>
                <SelectContent>
                  {locations.length > 0 ? (
                    locations.map((location) => (
                      <SelectItem key={location.id} value={location.name.toLowerCase()}>
                        {location.name}
                      </SelectItem>
                    ))
                  ) : (
                    <>
                      <SelectItem value="mutungo">Mutungo</SelectItem>
                      <SelectItem value="nsangi">Nsangi</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="enroll-message" className="font-inter">Additional Information</Label>
            <Textarea
              id="enroll-message"
              placeholder="Any special requirements or questions..."
              rows={3}
              value={formData.additional_info}
              onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })}
            />
          </div>

          <Button type="submit" size="lg" className="w-full font-inter font-semibold" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Enrollment Inquiry"
            )}
          </Button>

          <p className="font-inter text-xs text-center text-muted-foreground">
            Our admissions team will contact you within 24 hours
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollNowDialog;
