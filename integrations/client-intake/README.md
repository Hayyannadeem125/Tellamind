# TellaMind client intake

The Google Apps Script web app saves website enquiries to the private TellaMind Client Tracker and emails a notification to tellamindwork@gmail.com. It does not email clients, subscribe them to marketing, or publish the tracker.

The existing Formspree integration remains active until VITE_INQUIRY_WEBHOOK_URL is configured. If both variables are set, the tracker webhook takes precedence.

## Deployment

1. Sign in to script.google.com as tellamindwork@gmail.com and create a project called TellaMind Client Intake.
2. Add Code.gs. Enable the manifest in project settings and use appsscript.json. Set the script property TRACKER_ID to the private client tracker's spreadsheet ID. Do not publish the actual tracker ID in this repository.
3. Deploy a Web app, executing as the owner, accessible to Anyone. Review the spreadsheet and send-mail permissions. Only the form submission endpoint is public; no endpoint returns customer data.
4. Set the GitHub Actions variable VITE_INQUIRY_WEBHOOK_URL to the deployed /exec URL. Keep credentials and tokens out of frontend configuration.
5. Test a clearly marked submission using the owner's email. Confirm the new row and notification in the business account before publishing the website build.
6. Configure VITE_BOOKING_URL with the owner's actual Calendar appointment schedule URL and redeploy.

Google Apps Script and Gmail impose quotas. If the email quota is exhausted, the enquiry remains saved in the tracker. Review the sheet for new enquiries even if a notification is missing. This small-business endpoint uses validation and an optional _gotcha honeypot; add a verified CAPTCHA or a dedicated backend if public spam volume becomes a problem.

The tracker uses row 8 as the header. New entries fill the next empty Lead ID slot. Request IDs prevent duplicate entries when the same submission is retried. All service-specific fields are retained in Project brief.

## Checks

Run `node --test integrations/client-intake/intake.test.mjs` before activation. The tests use mocks and send no emails.
