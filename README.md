# Finch Fetch Demo

A simple Next.js app that integrates with [Finch Sandbox](https://dashboard.tryfinch.com/) to show company, directory, individual, and employment data.  
This project is built for the Finch DSE technical challenge.

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/avinashi10/finch-fetch.git
cd finch-fetch
```

### 2. Install dependencies

This project works with **npm**, **yarn**, or **pnpm**. Pick your preference:
   * Using `npm`:
```bash
npm install
```
   * Using `yarn`:
```bash
yarn install
```
   * Using `pnpm`:
```bash
pnpm install
```

### 3. Configure environment variables

Create a file called `.env.local` in the project root:

```ini
FINCH_CLIENT_ID=your_sandbox_client_id
FINCH_CLIENT_SECRET=your_sandbox_client_secret

CUSTOMER_ID=acme-123
CUSTOMER_NAME=Acme Test
```

### 4. Retrieve your Finch Sandbox Credentials

1. Sign in at [Finch Dashboard](https://dashboard.tryfinch.com/).
2. Go to your **Credentials**.
3. Copy your **Sandbox Client ID** and **Sandbox Client Secret** into your `.env.local` file, replacing the placeholder values
4. Add a **Redirect URI** in Credentials pointing to:

   ```
   http://localhost:3000/api/auth/callback
   ```

### 5. Set up your Finch Sandbox Connection
1. Navigate to 'Connections', click 'Actions' and select 'Create a New Connect Link'
2. Fill out the Customer Name' and 'Customer ID' fields

   * Example Customer Name: `Acme Test`
   * Example Customer ID: `acme-123`
     (You can make up any values for testing.)
3. Copy your **Customer Name** and **Customer ID** into your `.env.local` file, replacing the placeholder values
4. Under 'Products' select ONLY: Company', 'Directory', 'Employment', & 'Individual'. Make sure to remove all other products, especially 'Payment' and 'Pay Statements'
5. Click 'Next Step'. Leave all following fields blank and click 'Generate URL'

### 6. Run the app
   * Using `npm`:
   ```bash
   npm run dev
   ```
   * Using `yarn`:
   ```bash
   yarn dev
   ```
   * Using `pnpm`:
   ```bash
   pnpm dev
   ```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to Use the Application

1. Click “Connect to Finch” → This launches the Finch Sandbox Connect flow.
2. Select any provider from the dropdown.
3. Log in with Sandbox credentials
   * for username fields use: `good_user`
   * for password fields use: `good_pass`
   * for API token fields use: `good_token`
4. Once connected, you’ll see:
   * **Company data** at the top
   * **Employee directory** on the left
   * **Individual + Employment** details for the selected employee on the right
5. All fields are displayed individually; missing/null values show as `—`.
6. If a provider doesn’t implement an endpoint, a clear banner is displayed instead.
