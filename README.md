# Roster Portfolio Feature

This project implements a feature for Roster that allows talent to submit a link to their external portfolio site. The system then (mock) retrieves structured data from the site and displays it within a new profile page on Roster.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: React
- **Styling**: Tailwind CSS
- **Components**: Shadcn/ui (based on typical Next.js/Tailwind projects, please adjust if different)
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (v18.x or later recommended)
- pnpm (https://pnpm.io/installation)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:Achintya-Chatterjee/roster-portfolio.git
    cd roster-portfolio-feature 
    ```

2.  **Install dependencies using pnpm:**
    ```bash
    pnpm install
    ```

### Running the Development Server

Once dependencies are installed, you can run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Key Features

-   **Portfolio Link Submission**: Users can submit a URL to their external portfolio.
-   **Mock Data Extraction**: A mock API simulates extracting data from the provided URL.
    -   Supports two example portfolios with different structures:
        -   `https://sonuchoudhary.my.canva.site/portfolio`
        -   `https://dellinzhang.com/video-edit`
-   **Dynamic Profile Page Creation**: Generates a unique profile page (e.g., `/profile/sonu`).
-   **Structured Profile Display**:
    -   **Basic Information**: Name, professional title, location, summary.
    -   **Employers/Clients**: Lists employers/clients with associated job title, duration, employment type, summary, and videos.
-   **In-Page Editing**:
    -   Talent can edit their basic information directly on the profile page.
    -   Talent can add, edit, and delete employer/client entries.
    -   Talent can add, edit (title, duration), and delete videos associated with each employer.
    -   Changes are persisted in `localStorage` for the demo.
-   **Responsive UI**: Designed to work on different screen sizes.

## Folder Structure Overview

```
roster-portfolio/
├── app/                      # Next.js App Router (pages, layouts)
│   ├── profile/
│   │   └── [username]/       # Dynamic profile pages
│   │       └── page.tsx
│   ├── page.tsx              # Homepage for link submission
│   └── layout.tsx            # Root layout
├── components/               # React components
│   ├── ui/                   # UI components (e.g., from Shadcn/ui)
│   ├── BasicInfoSection.tsx
│   ├── EmployerCard.tsx
│   ├── EmployersSection.tsx
│   ├── ProfileHeader.tsx
│   └── VideoGrid.tsx
├── hooks/                    # Custom React hooks (e.g., use-toast)
├── lib/                      # Utility functions, mock API
│   └── api.ts                # Mock API calls
├── public/                   # Static assets
├── styles/                   # Global styles (if any beyond Tailwind)
├── types/                    # TypeScript type definitions
│   └── profile.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml            # PNPM lock file
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Mock API and Data Handling

-   All API calls related to data extraction and profile updates are mocked within `lib/api.ts`.
-   No backend is required for this assignment.
-   Profile data generated from the submitted URL is stored in the browser's `localStorage` to simulate persistence across navigations for the demo.

