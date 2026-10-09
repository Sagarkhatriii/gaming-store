# tori&co

A responsive gaming storefront portfolio project for Sagar KC, built with HTML, CSS, and vanilla JavaScript. The original black-and-yellow design is inspired by gaming hardware brands; it is not affiliated with Amazon or Razer.

## Run locally

Open a terminal in this folder and run `python -m http.server 8000 --directory dist` (or `py` instead of `python` on Windows). Open http://localhost:8000.

## Features

- Eight fictional gaming products: GPUs, CPUs, headphones, keyboard, mouse, and monitor
- Six original SVG hardware illustrations stored locally
- Product detail dialogs, category filters, case-insensitive search, and price/name sorting
- Shopping cart with quantity controls, removal, item count, and calculated CAD subtotal
- Browser-local cart persistence with validation of saved data
- Working demo checkout, order confirmation, and cart reset
- Responsive layout, keyboard-accessible controls, and modal dialogs

## Project structure

`dist/index.html` defines the page, `dist/style.css` styles it, and `dist/app.js` contains the fictional catalogue and interaction logic. `dist/assets` holds original vector illustrations. The font has a system fallback if Google Fonts cannot load. The storefront itself needs no API key, backend, npm install, or external product images.

## Demo boundaries

Products, specifications, and prices are illustrative. There are no real payments, deliveries, inventory checks, customer accounts, or tax calculations. Checkout records no personal information and clears the local cart after confirming a demo order.

## Validation

Run `node test.cjs`. Tests cover filtering, sorting, cart validation, price calculations, quantity limits, empty cart, and asset references. JavaScript syntax is checked separately with `node --check dist/app.js`.

## Learn and extend

Start with `products`, `filterProducts`, and `totals` in `app.js`. Then trace the add-to-cart click handler through `persist` and `renderCart`. Try adding favourites or a comparison feature. A production shop would need a trusted backend for catalogue prices, inventory, and a payment-provider integration.
