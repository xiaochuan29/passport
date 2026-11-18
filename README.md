# CFSGE Dream Passport — Website Prototype

A responsive, interactive front-end prototype for the Dream Passport experience.

## Run locally
1. Download and unzip this folder.
2. Open `index.html` in a browser.
   - Recommended: use VS Code with the **Live Server** extension and choose **Open with Live Server**.

## Publish with GitHub Pages
1. Create a new GitHub repository (for example, `dream-passport`).
2. Upload all files in this folder to the repository root:
   - `index.html`
   - `styles.css`
   - `app.js`
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for GitHub Pages to publish. Your website URL will appear in the Pages section.

## Included interactions
- Passport type selection (Guest / Verified prototype flow)
- Bear companion selection
- Dreamy name input and suggestions
- Passport preview and creation success
- Passport dashboard with progress, stats, badges, and recent activity
- Badge collection
- Bear dress-up with selectable items and save look
- My Collection, Journey Log, and Settings
- Local progress persistence using browser `localStorage`

## Prototype limitations
- Email verification is simulated in the browser; there is no authentication backend.
- Progress is stored in the current browser only. It is not synchronized across devices.
- The Explore page is a placeholder for the larger game map experience.
- All illustrations in this prototype use CSS, emoji, and typography; replace them with approved production artwork when available.
