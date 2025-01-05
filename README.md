# **Setup and Development Guide**

Follow these steps to set up the project and start development:

---

## **Step 1: Clone or Download the Project**

1. Clone the repository or download it as a ZIP file and extract its contents:
   ```bash
   git clone https://github.com/iheathers/pythonwa-htmx-tailwindcss.git
   cd pythonwa-htmx-tailwindcss
   ```

---

## **Step 2: Install Frontend Dependencies**

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install the required packages:
   ```bash
   npm install
   ```

3. Start the Tailwind CSS watcher:
   ```bash
   npm run watch:css
   ```

   - The compiled CSS will be generated in the `frontend/dist` directory.

---

## **Step 3: Start the Backend Server**

1. Navigate to the `backend` directory:
   ```bash
   cd ../backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   node app.js
   ```

---

## **Step 4: Serve the Frontend**

1. Open the `frontend/index.html` file in your browser using any method:

   - **Option A:** Use a Live Server extension in Visual Studio Code.
   - **Option B:** Open the file directly in your browser.

---

## **Development Workflow**

- Keep the backend server running in one terminal.
- Keep the Tailwind CSS watcher running in another terminal.
- Make your changes in the `frontend/src` directory:
  - Update styles in `src/styles/main.css`.
  - Modify HTML components in `src/components`.

Changes will automatically reflect in the browser if you're using a live server.
