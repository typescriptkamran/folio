import { ArrowUpRight, InfoIcon } from "lucide-react";
import Link from "next/link";

export function SmtpMessage() {
  return (
    <div className="bg-muted/50 px-5 py-3 border mt-[2rem] rounded-md flex gap-4">
      <InfoIcon size={16} className="mt-0.5" />
      <div className="flex flex-col gap-1">
        <small className="text-sm text-secondary-foreground">
          <strong> Note:</strong> Emails are rate limited. Enable Custom SMTP to
          increase the rate limit.
        </small>
        <div>
          <Link
            href="/admin/emails?tab=settings"
            className="text-primary/50 hover:text-primary flex items-center text-sm gap-1"
          >
            Configure SMTP Settings <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
