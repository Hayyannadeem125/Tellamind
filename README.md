# TellaMind Website

Responsive multi-page React website for TellaMind, a Michigan-based technology company serving clients worldwide.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

1. Extract the ZIP file.
2. Open a terminal in the project directory.
3. Install packages: `npm install`
4. Start the local site: `npm run dev`
5. Open the local URL printed by Vite (usually `http://localhost:5173`).

Create a production build with `npm run build`; preview it locally with `npm run preview`.

## Project structure

```text
src/
  components/
    Navbar.jsx  Navbar, logo, responsive menu, Services dropdown
    SiteFooter.jsx  Footer navigation and contact links
    ServiceCard.jsx Clickable service cards
    ContactForm.jsx Formspree integration or email-app fallback
    ...             Shared headings, project cards, FAQ, and CTA
  pages/            One React component per URL, including Team and Snap Star
  data.js           Editable service, concept-project, and FAQ content
  main.jsx          Routes, page titles/descriptions, optional canonical/schema
  styles.css        Colors, layout, responsive styles, 3D motion, transitions
public/             Logo/art SVG, favicon, robots.txt, sitemap.xml, SPA host rules
.env.example        Public configuration examples
index.html           Browser title and default social/search metadata
package.json         Dependencies and dev/build commands
```

## Optional configuration

Copy `.env.example` to `.env.local` and add only values controlled by TellaMind:

- `VITE_FORMSPREE_ENDPOINT`: configure one Formspree endpoint for contact, service, and Snapchat inquiries. Without it, forms open a prefilled email in the visitor's email application. For GitHub Pages, add this as the Actions variable `VITE_FORMSPREE_ENDPOINT` under **Settings → Secrets and variables → Actions → Variables**; the endpoint is public in the built frontend, so it is not a secret.
- `VITE_BOOKING_URL`: add the real scheduling page URL. If blank, the site asks visitors to request a meeting by email.
- `VITE_LINKEDIN_URL`, `VITE_INSTAGRAM_URL`, `VITE_FACEBOOK_URL`: add live public profiles. Blank values hide those footer links.
- `VITE_SITE_URL`: the purchased, verified website domain. Enables canonical URL and Organization structured data.

Restart the dev server after changing environment variables. Never put private API keys or passwords in `VITE_` variables; frontend variables are public.

## Before production launch

1. Review `TellaMind-Website-Documentation.md` and `DESIGN-UPDATE.md`; the addendum records the latest visual/navigation decisions. Confirm which listed services TellaMind can deliver.
2. Set `VITE_SITE_URL`, then replace the sample domain in `public/sitemap.xml` and add its Sitemap URL to `public/robots.txt` after choosing and verifying the actual domain.
3. Review or replace the draft Privacy and Terms pages with business-approved wording. They are clearly marked as drafts and are not legal advice.
4. Create a Formspree form, set its notification recipient to `tellamindwork@gmail.com`, verify the recipient, configure `VITE_FORMSPREE_ENDPOINT` locally and as a GitHub Actions variable, then submit and confirm a real test inquiry in both the inbox and Formspree submissions.
5. Add the real meeting link and social profile URLs when available.
6. Keep concept portfolio disclaimers visible until genuine client work is approved for publication.
7. Confirm actual company location wording, service scope, ownership, and any required business details.

## Routes

- `/`
- `/services` and eleven `/services/:slug` details, including `/services/meta-ads` and `/services/snapstar-support`
- `/work` and three `/work/:slug` concept details
- `/about`
- `/team`
- `/how-we-work`
- `/contact`
- `/privacy`
- `/terms`
- Any unknown route shows the custom 404 page.

The design uses a near-black graphite canvas with warm ivory, champagne gold, bronze, and silver accents. It includes original 3D-style SVG artwork, a matching cube mark, subtle CSS 3D float, and page entrance motion; reduced-motion preferences are respected. The Team page describes project roles transparently. Add real names and approved portraits before claiming individual team profiles. No paid stock images, fabricated client metrics, reviews, or client logos are included.

## Backend and database

The marketing website can run without a custom backend or database. The contact form can send through the configured Formspree endpoint; with no endpoint it opens the visitor’s email app. Meeting booking uses an external scheduling URL. Add a backend/database only if TellaMind needs an admin-managed blog or portfolio, user accounts, stored leads, a client portal, or custom booking workflows. Never put private API keys in `VITE_` variables.

## Team profile editing with Pages CMS

The public Team page keeps its existing design. To manage profiles without a database, this project includes a Pages CMS configuration at `.pages.yml`. Pages CMS edits one JSON file per person under `src/content/team-members/`, and uploads portraits under `public/team-photos/`. Set `is_published` to true to show a person on the Team page. Changes are committed to GitHub; the production host must deploy on GitHub pushes for them to appear on the live site.

1. Create a **private GitHub repository** and upload/push the complete website project, including `.pages.yml`.
2. Open [Pages CMS](https://app.pagescms.org/) and sign in with the GitHub account that can access the repository.
3. Install/authorize the Pages CMS GitHub App for this repository when prompted, then select the repository and its production branch.
4. Open **Team members**. Add, edit, publish, unpublish, or delete profiles there. Upload photos through the **Profile photo** field.
5. Confirm the hosting provider is connected to the same GitHub repository and deploys commits to the production branch. Vercel can do this through its Git integration.

Keep the GitHub repository private and grant access only to people who should edit the site. Only publish team details and photos that are approved for the public website. Team profiles are read from the Pages CMS-managed files at build time; the site does not connect to a database. There is no `/admin` login page. The editor is the separate Pages CMS portal at `app.pagescms.org`. Copy any existing team profiles from the old database into Pages CMS before switching over if you need to retain them.

## SEO launch checklist

- Buy and verify the actual domain; set `VITE_SITE_URL` and update the domain in `public/sitemap.xml` and the sitemap directive in `robots.txt` before deployment.
- Deploy the routes, register the domain with Google Search Console and Bing Webmaster Tools, and submit the sitemap. Search engines decide when to crawl, index, and rank; no site can guarantee immediate rankings or traffic.
- This starter uses client-side React routing and updates route titles/descriptions. For the strongest organic-search foundation, add prerendering or server rendering so every route ships its own HTML metadata and page text.
- Add genuine team details, original service copy, real project case studies, and authentic reviews only with permission. Do not publish concept work as client results.
- Confirm the actual Michigan city/address that should be public before adding LocalBusiness structured data. Current code uses Organization data only when `VITE_SITE_URL` is configured; it does not invent a street address.
- Optimize actual images, check page speed/accessibility on mobile, and choose an analytics setup with an appropriate privacy notice.
