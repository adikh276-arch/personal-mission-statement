# Personal Mission Statement

A gentle reflection to reconnect with your values.

## Technologies

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- i18next (Internationalization)

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adikh276-arch/personal-mission-statement
   cd personal-mission-statement
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Internationalization

This project supports multiple languages. Translations are generated using a script and stored locally.

To add or update translations:
1. Ensure `GOOGLE_TRANSLATE_API_KEY` is set in your environment (for development only).
2. Run the translation script:
   ```bash
   npx ts-node scripts/generateTranslations.ts
   ```

## Deployment

### Docker

Build the Docker image:
```bash
docker build -t personal-mission-statement .
```

Run the container:
```bash
docker run -p 80:80 personal-mission-statement
```
