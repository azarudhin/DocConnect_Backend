# Brandopedia Backend

Express & MongoDB REST API server with static asset hosting and seeding utilities.

## Setup & Running

1. **Configure Environment Variables**:
   Create `.env` in this directory:
   ```env
   PORT=5000
   MONGO_URI="mongodb://localhost:27017/brandopedia"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run MongoDB Seed Script**:
   Populates users, connection statuses, and multi-image posts:
   ```bash
   npm run seed
   ```

4. **Start the Server**:
   - Dev mode (nodemon):
     ```bash
     npm run dev
     ```
   - Standard mode:
     ```bash
     npm start
     ```

API runs on `http://localhost:5000`.
Static images available under `http://localhost:5000/images/`.

