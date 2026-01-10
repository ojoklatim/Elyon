import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Trash2, Eye, Mail, Phone } from "lucide-react";
import { useContactSubmissions } from "@/hooks/useContactSubmissions";

const AdminContactSubmissions = () => {
  const { submissions, loading, updateSubmissionStatus, deleteSubmission } = useContactSubmissions();
  const [selectedSubmission, setSelectedSubmission] = useState<typeof submissions[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "responded":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
          <CardTitle className="font-poppins">Contact Form Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <p className="text-muted-foreground font-inter text-center py-8">
              No contact submissions yet.
            </p>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-inter font-semibold">{submission.full_name}</h4>
                      <Badge className={getStatusColor(submission.status)}>
                        {submission.status}
                      </Badge>
                    </div>
                    <p className="font-inter text-sm text-muted-foreground">
                      {submission.subject}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {submission.email}
                      </span>
                      {submission.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {submission.phone}
                        </span>
                      )}
                    </div>
                    <p className="font-inter text-xs text-muted-foreground mt-1">
                      {new Date(submission.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={submission.status}
                      onValueChange={(value) => updateSubmissionStatus(submission.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="responded">Responded</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteSubmission(submission.id)}
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

      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-poppins">Message Details</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Name</p>
                  <p className="font-inter font-semibold">{selectedSubmission.full_name}</p>
                </div>
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Email</p>
                  <p className="font-inter font-semibold">{selectedSubmission.email}</p>
                </div>
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Phone</p>
                  <p className="font-inter font-semibold">{selectedSubmission.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Date</p>
                  <p className="font-inter font-semibold">
                    {new Date(selectedSubmission.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-inter text-sm text-muted-foreground">Subject</p>
                <p className="font-inter font-semibold">{selectedSubmission.subject}</p>
              </div>
              <div>
                <p className="font-inter text-sm text-muted-foreground">Message</p>
                <p className="font-inter whitespace-pre-wrap bg-muted p-4 rounded-lg">
                  {selectedSubmission.message}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContactSubmissions;
