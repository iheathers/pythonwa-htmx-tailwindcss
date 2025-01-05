Here's an updated, detailed step-by-step guide including the necessary navigation to the `frontend` directory.

---

## **Step 1: Clone or Download the Project**
1. Clone the repository or download it as a ZIP file and extract it.
   ```bash
   git clone https://github.com/iheathers/pythonwa-htmx-tailwindcss.git
   cd pythonwa-htmx-tailwindcss
   ```

---

## **Step 2: Install Dependencies**

### **Step 2.1: Navigate to the `frontend` Directory**
1. Go to the `frontend` directory to install its dependencies:
   ```bash
   cd frontend
   ```

2. Install the dependencies listed in `frontend/package.json`:
   ```bash
   npm install
   ```

---

## **Step 3: Build and Watch Files**
1. From the `frontend` directory, set up the build processes for Tailwind CSS and JavaScript.

### **Watch CSS**
1. Run the following command to start watching CSS:
   ```bash
   npm run watch:css
   ```

2. The build process will generate these files in the `frontend/dist` directory:
   - `dist/styles.css`: The compiled Tailwind CSS file.


---

## **Step 4: Start the Backend Server**
1. Go back to the root directory:
   ```bash
   cd ..
   ```
2. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
3. Install backend dependencies:
   ```bash
   npm install
   ```
4. Start the backend server (assuming `app.js` is the entry point):
   ```bash
   node app.js
   ```

---

## **Step 5: Serve the Frontend**
1. Go back to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Open the `index.html` file in a browser. You can use any of the following methods:

### **Option A: Use a Live Server**
1. If you’re using VS Code, install the **Live Server** extension.
2. Right-click on `index.html` and select **Open with Live Server**.

## **Step 6: Development Workflow**
1. During development:
   - Keep the backend server running in one terminal.
   - Keep the frontend file watcher (`npm run watch:css`) running in another terminal.
2. Make your changes in the `frontend/src` directory:
   - Update styles in `src/styles/main.css`.
   - Update HTML components in `src/components`.

The changes will automatically be reflected in the `dist` files and on the live server.
