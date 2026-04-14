import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Trash2, Eye, Mail, Phone, User, GraduationCap } from "lucide-react";
import { useAdmissionApplications } from "@/hooks/useAdmissionApplications";

const AdminAdmissions = () => {
  const { applications, loading, updateApplicationStatus, deleteApplication } = useAdmissionApplications();
  const [selectedApplication, setSelectedApplication] = useState<typeof applications[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-purple-100 text-purple-800";
      case "enrolled":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgramLabel = (program: string) => {
    const programs: Record<string, string> = {
      baby: "Baby Class",
      nursery: "Nursery",
      p1: "Primary 1",
      p2: "Primary 2",
      p3: "Primary 3",
      p4: "Primary 4",
      p5: "Primary 5",
      p6: "Primary 6",
      p7: "Primary 7",
    };
    return programs[program] || program;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-poppins">Admission Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <p className="text-muted-foreground font-inter text-center py-8">
              No admission applications yet.
            </p>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-inter font-semibold">{application.child_name}</h4>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {application.parent_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {getProgramLabel(application.program)} - {application.preferred_campus}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {application.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {application.phone}
                      </span>
                    </div>
                    <p className="font-inter text-xs text-muted-foreground mt-1">
                      {new Date(application.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={application.status}
                      onValueChange={(value) => updateApplicationStatus(application.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="enrolled">Enrolled</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedApplication(application)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this application?")) {
                          deleteApplication(application.id);
                        }
                      }}
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

      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-poppins">Application Details</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Child's Name</p>
                  <p className="font-inter font-semibold">{selectedApplication.child_name}</p>
                </div>
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Child's Age</p>
                  <p className="font-inter font-semibold">{selectedApplication.child_age} years</p>
                </div>
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Program</p>
                  <p className="font-inter font-semibold">{getProgramLabel(selectedApplication.program)}</p>
                </div>
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Preferred Campus</p>
                  <p className="font-inter font-semibold capitalize">{selectedApplication.preferred_campus}</p>
                </div>
              </div>
              <hr />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Parent/Guardian Name</p>
                  <p className="font-inter font-semibold">{selectedApplication.parent_name}</p>
                </div>
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Email</p>
                  <p className="font-inter font-semibold">{selectedApplication.email}</p>
                </div>
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Phone</p>
                  <p className="font-inter font-semibold">{selectedApplication.phone}</p>
                </div>
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Submitted</p>
                  <p className="font-inter font-semibold">
                    {new Date(selectedApplication.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              {selectedApplication.additional_info && (
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Additional Information</p>
                  <p className="font-inter whitespace-pre-wrap bg-muted p-4 rounded-lg">
                    {selectedApplication.additional_info}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAdmissions;
