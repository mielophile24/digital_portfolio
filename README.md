# Amiel M. Mirafuentes – Portfolio (React + Vite + Tailwind CSS)

A modern, responsive portfolio application built with React, Vite, and Tailwind CSS.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
├── index.html                           # HTML entry point (fonts & root mount)
├── package.json                         # Dependencies and build scripts
├── vite.config.js                       # Vite configuration
├── tailwind.config.js                   # Tailwind theme colors & fonts
├── postcss.config.js                    # PostCSS plugins
└── src/
    ├── main.jsx                         # Application root mount
    ├── App.jsx                          # Main App layout
    ├── index.css                        # Tailwind directives & custom CSS
    ├── data/
    │   ├── projects.js                  # Projects dataset & bundled screenshots
    │   └── portfolioData.js             # Nav links, tech stack, skills, contact data
    ├── assets/                          # Bundled images & PDF certificate
    └── components/
        ├── common/
        │   ├── Heading.jsx              # Reusable section heading
        │   ├── Section.jsx              # Reusable animated section with IntersectionObserver
        │   ├── ImageSlot.jsx            # Profile image display
        │   └── PdfViewer.jsx            # Certificate viewer modal/link
        ├── projects/
        │   ├── Projects.jsx             # Projects section container with scroll controls
        │   ├── ProjectCard.jsx          # Individual project card
        │   ├── ProjectImages.jsx        # Project screenshot slideshow & carousel
        │   └── Lightbox.jsx             # Fullscreen image modal / preview
        ├── Nav.jsx                      # Navigation bar & mobile menu
        ├── Hero.jsx                     # Hero header with profile picture
        ├── Marquee.jsx                  # Endless scrolling tech ticker
        ├── About.jsx                    # About section
        ├── Skills.jsx                   # Tech stack and soft skills section
        ├── Education.jsx                # Education and certifications section
        └── Contact.jsx                  # Contact details and footer
```
