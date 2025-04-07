"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../supabase/client";
import { Tables } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Lock, Server } from "lucide-react";

type SmtpSettings = Tables<"smtp_settings">;

export function SmtpSettings() {
  const [settings, setSettings] = useState<SmtpSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ success?: string; error: string } | null>(null); // Make error a required field
  const [testLoading, setTestLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("smtp_settings")
        .select("*")
        .limit(1);

      if (error) throw error;
      setSettings(data?.[0] || null);
    } catch (error) {
      console.error("Error fetching SMTP settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const host = formData.get("host") as string;
    const port = parseInt(formData.get("port") as string);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const fromEmail = formData.get("fromEmail") as string;
    const fromName = formData.get("fromName") as string;
    const secure = formData.get("secure") === "on";

    if (!host || !port || !username || !password || !fromEmail) {
      setMessage({ error: "All fields except From Name are required" });
      return;
    }

    try {
      if (settings?.id) {
        // Update existing settings
        const { error } = await supabase
          .from("smtp_settings")
          .update({
            host,
            port,
            username,
            password,
            from_email: fromEmail,
            from_name: fromName,
            secure,
            updated_at: new Date().toISOString(),
          })
          .eq("id", settings.id);

        if (error) throw error;
      } else {
        // Create new settings
        const { error } = await supabase.from("smtp_settings").insert({
          host,
          port,
          username,
          password,
          from_email: fromEmail,
          from_name: fromName,
          secure,
        });

        if (error) throw error;
      }

      await fetchSettings();
      setMessage({ success: "SMTP settings saved successfully", error: "" }); // Ensure error is an empty string
    } catch (error) {
      console.error("Error saving SMTP settings:", error);
      setMessage({ error: "Failed to save SMTP settings", success: "" }); // Ensure success is an empty string
    }
  };

  const testSmtpConnection = async () => {
    if (!settings) {
      setMessage({ error: "Please save SMTP settings first", success: "" }); // Ensure success is an empty string
      return;
    }

    setTestLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/test-smtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          smtpSettings: settings,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to test SMTP connection");
      }

      setMessage({ success: "SMTP connection successful", error: "" }); // Ensure error is an empty string
    } catch (error) {
      console.error("Error testing SMTP connection:", error);
      setMessage({
        error:
          error instanceof Error
            ? error.message
            : "Failed to test SMTP connection",
        success: "",
      }); // Ensure success is an empty string
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          SMTP Settings
        </CardTitle>
        <CardDescription>
          Configure your SMTP server for sending verification emails and replies
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">Loading settings...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="host">SMTP Host</Label>
                <Input
                  id="host"
                  name="host"
                  placeholder="smtp.example.com"
                  defaultValue={settings?.host || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="port">SMTP Port</Label>
                <Input
                  id="port"
                  name="port"
                  type="number"
                  placeholder="587"
                  defaultValue={settings?.port || 587}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">SMTP Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="username@example.com"
                  defaultValue={settings?.username || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">SMTP Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  defaultValue={settings?.password || ""}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromEmail">From Email</Label>
                <Input
                  id="fromEmail"
                  name="fromEmail"
                  placeholder="noreply@example.com"
                  defaultValue={settings?.from_email || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromName">From Name (Optional)</Label>
                <Input
                  id="fromName"
                  name="fromName"
                  placeholder="Your Website Name"
                  defaultValue={settings?.from_name || ""}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="secure"
                name="secure"
                defaultChecked={settings?.secure !== false}
              />
              <Label htmlFor="secure">Use Secure Connection (TLS/SSL)</Label>
            </div>

            {message && <FormMessage message={message} />}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={testSmtpConnection}
                disabled={testLoading || !settings}
              >
                {testLoading ? "Testing..." : "Test Connection"}
              </Button>
              <SubmitButton>
                <Lock className="h-4 w-4 mr-2" /> Save Settings
              </SubmitButton>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
