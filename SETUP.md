# Learning Plan Application

This application consists of a FastAPI backend and a Next.js 15 frontend for learning plan management.

## Technology Stack

- **Backend**: FastAPI with Python
- **Frontend**: Next.js 15 (using React 19)

## Getting Started

### Option 1: Docker (Recommended)

The simplest way to run the application is using Docker:

1. Make sure you have Docker and Docker Compose installed
   - Download Docker Desktop: <https://www.docker.com/products/docker-desktop/>
2. Clone this repository
3. Create a `.env` file with your API keys (see [.env.example](./.env.example))
4. In your terminal, from the root of the project, run the following command to start the containers:

```bash
docker-compose up       # Run in foreground with logs visible
# OR
docker-compose up -d    # Run in detached mode (background)
```

When the build process completes, the application will be available at:

- Frontend (UI): <http://localhost:3000>
- Backend API: <http://localhost:8000>

To stop the containers when you're finished, use:

```bash
docker-compose down     # Stops and removes containers
```

OR use Docker Desktop to manage, start, and stop containers through its graphical interface.

### Option 2: Local Development

For development with hot-reloading:

1. Install pnpm (<https://pnpm.io/installation>) if you don't have it already
2. Make sure you have Python 3.11+ installed
3. Install backend dependencies:

```bash
pip install -r requirements.txt
```

4. Install frontend dependencies:

```bash
cd web
pnpm install
```

5. Run the development script from the web directory:

```bash
cd web
pnpm run dev:api
```

This script uses concurrently to start both the backend and frontend servers with hot reloading.

## Application Configuration

The app.py file contains the following configuration settings (same as UPBEAT_learning_assistant_GUI.py):

```python
# --- CONFIGURATION ---
IS_DEBUG = 1  # Set to 0 in production environment
STUDY_PLANS_FILE = r'learning_plans/study_plans_data.pickle'
CURATED_MATERIALS_FILE = r'data/curated_additional_materials.txt'
LLM_MODEL = "gpt-4o"  # You can change to another model if needed
TRAINING_PERIOD_START = datetime(2025, month=3, day=1, hour=6)
TRAINING_PERIOD_END = datetime(2025, month=3, day=30, hour=23)
```

## Basic Authentication

The application supports basic authentication that can be enabled through environment variables:

1. Navigate to the `/web` directory and copy `.env.example` to `.env.local`:

   ```bash
   cd web
   cp .env.example .env.local
   ```

2. In your `.env.local` file, configure the following settings:

   ```env
   # Basic Authentication
   BASIC_AUTH_ENABLED=true  # Set to true to enable, false to disable
   BASIC_AUTH_USERNAME=admin  # Change to desired username
   BASIC_AUTH_PASSWORD=password  # Change to desired password
   ```

3. When enabled, users will be prompted to enter credentials before accessing the application.

   > **Note:** This authentication only protects the web application UI. FastAPI endpoints remain accessible without authentication. For production use, implement API key protection as described in the Production Deployment section.

## API Documentation

When the backend is running, API documentation is available at:

- <http://localhost:8000/docs> OR <http://localhost:8000/redoc>

## Production Deployment on CSC - Rahti 2

For production deployment on Rahti 2, follow these steps:

1. **Environment Configuration**: Set environment variables in Rahti with DEPLOYMENT_ENV=rahti, RAHTI_API_URL, and API keys

2. **API Security**: Add API key protection to backend endpoints and include key in frontend requests

3. **Container Setup**: Deploy backend and frontend as separate containers that can communicate with each other

4. **CORS Configuration**: Set backend to accept requests only from your frontend domain

5. **Network Configuration**: Decide whether your API should be:
   - Internal only (more secure): Backend accessible only from frontend within Rahti network
   - Publicly exposed: Backend accessible from internet with proper security measures
