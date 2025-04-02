"use client";

import { useState } from "react";
import { Tables } from "@/types/supabase";
import { EmailList } from "@/components/admin/email-list";
import { EmailView } from "@/components/admin/email-view";
import { SmtpSettings } from "@/components/admin/smtp-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Settings } from "lucide-react";

type Email = Tables<"emails">;

export default function AdminEmailsPage() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  const handleReplySuccess = () => {
    // Refresh the email list after a successful reply
    setSelectedEmail(null);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Email Management</h1>

      <Tabs defaultValue="inbox" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="inbox" className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> Inbox
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" /> SMTP Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox">
          {selectedEmail ? (
            <EmailView
              email={selectedEmail}
              onBack={handleBackToList}
              onReplySuccess={handleReplySuccess}
            />
          ) : (
            <EmailList onSelectEmail={setSelectedEmail} />
          )}
        </TabsContent>

        <TabsContent value="settings">
          <SmtpSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
