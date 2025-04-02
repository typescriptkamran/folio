"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../supabase/client";
import { Tables } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Mail,
  MailOpen,
} from "lucide-react";

type Email = Tables<"emails">;

interface EmailListProps {
  onSelectEmail: (email: Email) => void;
}

export function EmailList({ onSelectEmail }: EmailListProps) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    fetchEmails();
  }, [page, debouncedQuery]);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/emails?page=${page}&limit=10${debouncedQuery ? `&search=${encodeURIComponent(debouncedQuery)}` : ""}`,
      );
      const { data, meta } = await response.json();
      setEmails(data);
      setTotalPages(meta.totalPages);
    } catch (error) {
      console.error("Error fetching emails:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (email: Email) => {
    if (!email.read) {
      const { error } = await supabase
        .from("emails")
        .update({ read: true })
        .eq("id", email.id);

      if (!error) {
        setEmails(
          emails.map((e) => (e.id === email.id ? { ...e, read: true } : e)),
        );
      }
    }
    onSelectEmail(email);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Inbox</span>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">Loading emails...</div>
        ) : emails.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No emails found
          </div>
        ) : (
          <div className="space-y-2">
            {emails.map((email) => (
              <div
                key={email.id}
                className={`p-4 border rounded-md cursor-pointer transition-colors ${email.read ? "bg-background" : "bg-muted/20 font-medium"}`}
                onClick={() => markAsRead(email)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {email.read ? (
                      <MailOpen className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Mail className="h-4 w-4 text-primary" />
                    )}
                    <span className="font-medium">{email.sender}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(email.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-1 text-sm font-medium">{email.subject}</div>
                <div className="mt-1 text-xs text-muted-foreground truncate">
                  {email.body?.substring(0, 100)}...
                </div>
                <div className="mt-2 flex gap-2">
                  {!email.read && (
                    <Badge variant="outline" className="bg-primary/10">
                      New
                    </Badge>
                  )}
                  {email.replied && (
                    <Badge variant="outline" className="bg-muted">
                      Replied
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
