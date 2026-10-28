# Automatic client dates

This is a separate **private** Apps Script project. Do not deploy it as a web app. The existing public enquiry endpoint remains unchanged.

Run under `tellamindwork@gmail.com`, set the private `TRACKER_ID` script property, paste the source and manifest, then run `installDateAutomation` once. Review the new Google permissions. The manifest enables the advanced Gmail service on the default Apps Script Cloud project. For a manually assigned Cloud project, enable Gmail API there first.

The installer verifies the account, syncs the tracker, and creates one five-minute clock trigger. Re-running it does not create another trigger. The script requests spreadsheet access, **Gmail metadata only** (headers/labels, not message bodies), and permission to manage its own triggers. It has no email-send, email-delete or email-modify scope.

For existing website leads in `Clients`:

- `Received at` continues to come from the website's server timestamp.
- `Last contact` is the newest actual incoming client message or sent message addressed to that client. Drafts, Spam, Trash, owner notifications and unrelated addresses are ignored. Only messages at/after that enquiry's received timestamp count.
- `Next follow-up` is three calendar days after `Last contact`; before any email, it is three days after `Received at`. This column is managed by a formula and is not a manual deadline.
- `Completed`, `Lost` and `On hold` make `Next follow-up` blank. Existing last-contact history remains.
- Stages, project deadlines, pricing, and project folders are not inferred from email.
- No client follow-up emails are sent. This only maintains dates.

New dates normally appear at the next run, roughly within five minutes. The public intake can temporarily clear the follow-up formula when inserting a row; the private sync restores it at the next run. After initial activation, mail is scanned from the last successful checkpoint, with a two-minute overlap. New website rows use current server receipt times. Historical rows added later with old dates are not automatically backfilled: reset `DATES_LAST_SYNC_MS` and run once to rescan from the oldest open enquiry.

Gmail metadata does not support search queries, so the worker scans recent messages in newest-first order with pagination and matches exact email addresses locally. The initial scan starts at the oldest open enquiry. A run stops at 600 metadata reads or its time budget rather than silently skipping messages; it does not advance its checkpoint on failure. High-volume mailboxes or a very large initial backlog need a reviewed backfill process. Failure details appear in Apps Script Executions; Google trigger-failure notifications should be monitored.

Use the business Gmail account for client correspondence. Mail sent only from WhatsApp, another mailbox, or another channel cannot update these Gmail-based dates.

Validation: `node --test integrations/client-dates/dates.test.mjs`. Test data must not contact real clients.
