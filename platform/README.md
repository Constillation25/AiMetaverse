# Constellation25 Platform - Refactored

This is a refactored version of the Constellation25 Sovereign Platform dashboard.

## Structure

```
platform/
├── c25_master_platform.html  # Main HTML entry point
├── css/
│   └── styles.css            # Separated stylesheet
├── js/
│   ├── app.js                # Application logic
│   └── data.js               # Data definitions (modules, agents, assets)
└── README.md                 # This file
```

## Changes Made

### Before
- Single monolithic HTML file (303 lines) with inline CSS and JavaScript
- Minified, hard-to-read code
- 228 asset paths embedded directly in the HTML
- No separation of concerns

### After
- **Separation of Concerns**: HTML, CSS, and JavaScript are now in separate files
- **ES6 Modules**: JavaScript uses modern import/export syntax
- **Readable Code**: Properly formatted with comments and meaningful function names
- **Maintainable**: Data is separated from logic, making updates easier
- **Cleaned Data**: Reduced asset list to representative samples (can be expanded)

## Usage

Open `c25_master_platform.html` in a modern web browser. Note that ES6 modules require the page to be served via HTTP (not opened directly as a file:// URL) due to CORS policies.

You can use a simple local server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (if installed)
npx serve
```

Then navigate to `http://localhost:8000/c25_master_platform.html`

## Features

- **27 Modules**: Core platform infrastructure units
- **25 Agents**: Autonomous planetary execution nodes
- **Asset Browser**: Categorized view of HTML, Gamma scripts, Notebooks, and Banani validators
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Easy on the eyes with a modern aesthetic
