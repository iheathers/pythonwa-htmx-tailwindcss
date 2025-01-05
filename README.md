# **Development Guide**

Follow these steps to set up and start working on the project.

---

## **Step 1: Clone the Project**

1. Clone the repository:
   ```bash
   git clone https://github.com/iheathers/pythonwa-htmx-tailwindcss.git
   cd pythonwa-htmx-tailwindcss
   ```

---

## **Step 2: Frontend Setup**

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Optional:** If you plan to edit Tailwind CSS styles, start the watcher:
   ```bash
   npm run watch:css
   ```

   - This will automatically recompile the CSS when changes are made to css in `index.html` or `src/styles/main.css`.

---

## **Step 3: Backend Setup**

1. Navigate to the `backend` directory:
   ```bash
   cd ../backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Start the backend server: (It runs on port 3000 by default)
   ```bash
   node app.js
   ```

---

## **Step 4: Serve the Frontend**

1. Go back to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Serve the frontend files locally:
   ```bash
   npm run serve
   ```

   This serves the project at `http://localhost:5000`.

In `index.html` change 

```html
  <!-- change hx-get='http://localhost:3000/api/events' for local development -->
        <div hx-ext="client-side-templates" hx-get="https://pythonwa-htmx-tailwindcss-1.onrender.com/api/events"
            mustache-array-template="events-template" hx-trigger="load" hx-swap="outerHTML">
            Loading
        </div>


```

---

## **When to Use `npm run watch:css`**

- **Use it if** you are making changes to Tailwind CSS styles in `frontend/src/styles/main.css`.
- **Skip it if** you’re not modifying any styles. The existing `dist/styles.css` will already be available for the project.

---

## **Development Workflow**

1. **Frontend**:
   - If editing styles, run `npm run watch:css`.
   - Serve the frontend using `npm run serve`.
2. **Backend**:
   - Keep the backend server running (`node app.js`).
3. Make changes to:
   - Styles: `frontend/src/styles/main.css`.
   - Components: `frontend/src/components`.
