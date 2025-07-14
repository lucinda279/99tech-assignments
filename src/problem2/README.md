# Currency Swap Form Solution

This project is my solution to the currency swap form assignment. It allows users to swap assets from one currency to another, with real-time price data and token images.

## Solution Overview

- **Modern UI:** Built with React, TypeScript, Vite, ShadcnUI and Tailwind CSS for a responsive and visually appealing interface.
- **Live Price Data:** Fetches token prices from [Switcheo’s API](https://interview.switcheo.com/prices.json) to compute exchange rates.
- **Token Images:** Displays token icons using the [Switcheo token-icons repo](https://github.com/Switcheo/token-icons/tree/main/tokens).
- **Form Validation:** Uses React Hook Form and Zod for interactive validation and user feedback.
- **Theme Support:** Supports both light and dark modes.
- **State Management:** Utilizes Redux Toolkit for predictable state handling.

## Assumptions

- Only tokens with available price data from the provided API are shown as options.
- Exchange rates are calculated using the latest fetched prices.
- If a token image is missing, a placeholder is shown.
- The swap is simulated (no real transaction is performed).
- The balance shown in the form is a fake number for demonstration purposes.
- The UI/UX is prioritized for intuitiveness and clarity, as per assignment requirements.

## How to Run

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.
