# InstantLead AI Static Website

This is the easiest version to deploy on Vercel. It uses only three website files:

- `index.html`
- `style.css`
- `script.js`

No terminal, npm, Next.js, or local setup is required.

## Browser-only deployment steps

### 1. Unzip this folder
Unzip the downloaded file on your computer.

### 2. Create a GitHub repository
Go to GitHub and create a new repository, for example:

`instantlead-ai`

### 3. Upload the files
Inside the new GitHub repository, click:

`Add file` → `Upload files`

Upload the files from inside this folder, not the folder itself.

The repository should look like this:

```text
index.html
style.css
script.js
README.md
```

### 4. Deploy on Vercel
Go to Vercel and click:

`New Project` → select your GitHub repository → `Deploy`

Vercel should detect this as a static website automatically.

### 5. Edit content later
To change text, pricing, testimonials, or contact form fields, edit `index.html` directly in GitHub.

To change colors, spacing, or design, edit `style.css`.

To change the modal or chat behavior, edit `script.js`.

## Important note about the form
The form currently shows a success message after submission, but it does not send data anywhere yet.

Later, you can connect it to:

- Google Sheets
- email notification
- a CRM
- Formspree
- Make/Zapier
- a backend API
