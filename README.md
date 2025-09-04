# Finch Sandbox Demo

This is a simple Next.js application built for the Finch technical interview.  

It connects to the **Finch Sandbox API** to fetch and display company, directory, individual, and employment data.  

---

## Getting Started

1. **Clone this repo**
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the project root with your Finch Sandbox credentials:

   ```bash
   FINCH_CLIENT_ID=your-client-id
   FINCH_CLIENT_SECRET=your-client-secret
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Notes

* The app uses **Next.js API routes** to securely fetch data from Finch.
* The `/payment` and `/pay-statement` endpoints are intentionally blocked.
* Null fields and missing endpoints are handled with custom messages in the UI.




## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



