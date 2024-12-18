# Holiday_Management
machine test
# Holiday Management Application

## Overview
The **Holiday Management Application** fetches and displays real-time holiday data for selected countries and years. Built using Django for the backend and React with Tailwind CSS for the frontend, this application integrates the **Calendarific API** to provide accurate and categorized holiday details.

---

## Features

### Backend (Django)
- API integration with **Calendarific** for fetching holidays.
- Caching holiday data (24-hour cache) to minimize redundant API calls.
- API endpoints:
  - `GET /api/countries/` - Retrieve the list of countries.
  - `GET /api/holidays/?country={code}&year={year}` - Fetch holidays for a country and year.
- Error handling for invalid requests and API failures.

### Frontend (React + Tailwind CSS)
- **Home Page**:
  - Search for holidays by selecting a country and year.
  - Interactive country cards with pagination.
- **Results Page**:
  - Display holidays in a table with filtering options (by type and month).
  - Search bar to filter holidays by name.
- **Holiday Detail Modal**:
  - Displays additional details when a holiday is clicked.

---

## Technologies Used
### Backend:
- **Django** (3.2+)
- **Django REST Framework**
- **SQLite** (default database)
- **Calendarific API** (Third-party holiday data)

### Frontend:
- **React** (18.0+)
- **Axios** (for API requests)
- **Tailwind CSS** (for styling)
- **React Router** (for navigation)

---

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- A Calendarific API Key ([Get it here](https://calendarific.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/tinubenny/Holiday_Management.git
cd Holiday_Management
```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd hiliday_management
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate   # For Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend folder and add your Calendarific API key:
   ```env
   CALENDARIFIC_API_KEY=your_api_key_here
   ```

5. Run database migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the backend server:
   ```bash
   python manage.py runserver
   ```
   The backend will run at `http://localhost:8000`.

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../holiday-management-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will run at `http://localhost:3000`.

---

## API Endpoints

### Countries Endpoint
- **URL:** `/api/countries/`
- **Method:** `GET`
- **Description:** Retrieve the list of countries.

### Holidays Endpoint
- **URL:** `/api/holidays/?country={code}&year={year}`
- **Method:** `GET`
- **Description:** Fetch holidays for a specific country and year.
- **Parameters:**
  - `country` (ISO alpha-2 code, e.g., "IN", "US")
  - `year` (e.g., 2024)

**Example:**
```bash
GET /api/holidays/?country=IN&year=2024
```

---

## Usage
1. Visit the **Home Page**.
2. Search for holidays by selecting a country and year.
3. View the results in a table format with options to:
   - Filter holidays by type.
   - Search for holidays by name.
   - View detailed information in a modal.
4. Use pagination to navigate between country cards on the home page.

---

## Notes
- The backend caches holiday data for 24 hours to optimize API usage.
- Ensure the `.env` file contains a valid Calendarific API key.
- Use the **"completed" branch** for the final version of the project.

---

## Known Issues
- Ensure your Calendarific API key is active and valid.
- Verify that the backend server is running before starting the frontend.

---

## Contact
For questions or feedback, please contact:
- **Name:** Tinu Benny
- **Email:** tinubenny@hotmail.com
- **GitHub:** 

---

## License
This project is licensed under the MIT License.
