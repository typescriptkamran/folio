"use client";

import { useState } from "react";
import { Tables } from "@/types/supabase";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "../../../supabase/client";
import { ArrowLeft, Send, User } from "lucide-react";

type Email = Tables<"emails">;

interface EmailViewProps {
  email: Email | null;
  onBack: () => void;
  onReplySuccess: () => void;
}

export function EmailView({ email, onBack, onReplySuccess }: EmailViewProps) {
  const [replyContent, setReplyContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const supabase = createClient();

  if (!email) {
    return null;
  }

  const handleReply = async () => {
    if (!replyContent.trim()) {
      setError("Reply content cannot be empty");
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      // Fetch SMTP settings
      const { data: smtpSettings, error: smtpError } = await supabase
        .from("smtp_settings")
        .select("*")
        .limit(1)
        .single();

      if (smtpError) {
        throw new Error("Failed to fetch SMTP settings");
      }

      // Send email using a serverless function or API
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email.sender,
          subject: `Re: ${email.subject}`,
          text: replyContent,
          smtpSettings,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send reply");
      }

      // Mark email as replied
      const { error: updateError } = await supabase
        .from("emails")
        .update({ replied: true })
        .eq("id", email.id);

      if (updateError) {
        console.error("Error updating email status:", updateError);
      }

      setReplyContent("");
      setShowReplyForm(false);
      onReplySuccess();
    } catch (err) {
      console.error("Error sending reply:", err);
      setError(err instanceof Error ? err.message : "Failed to send reply");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>{email.subject || "(No Subject)"}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="font-medium">{email.sender}</div>
              <div className="text-xs text-muted-foreground">
                {new Date(email.created_at).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-6 whitespace-pre-wrap p-4 border rounded-md bg-muted/10">
            {email.body || "(No content)"}
          </div>

          {showReplyForm ? (
            <div className="mt-6 space-y-4">
              <Textarea
                placeholder="Type your reply here..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={6}
                className="w-full"
              />
              {error && <div className="text-sm text-red-500">{error}</div>}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowReplyForm(false)}
                  disabled={isSending}
                >
                  Cancel
                </Button>
                <Button onClick={handleReply} disabled={isSending}>
                  {isSending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" /> Send Reply
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button onClick={() => setShowReplyForm(true)}>
                <Send className="h-4 w-4 mr-2" /> Reply
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
