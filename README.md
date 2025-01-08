# Social Media Project

This repository contains ALX final project "social media web application project" named QUOTES composed of two applications:

1. **Frontend Application**: Built with React.js, allowing users to create accounts, manage profiles, add friends, create posts, and interact with others' content.
2. **Backend Application**: A Django-based web API providing the backend functionality and interacting with a MySQL database.

## Features

### Frontend Application
- **Account Creation**: Users can sign up with a username, email, and password.
- **Automatic Login**: Users are logged in immediately after account creation.
- **Profile Management**: Users can complete additional nested information after logging in, view their profile, and update their details.
- **Social Interaction**:
  - Add and manage friends.
  - Create, update, or delete posts.
  - Interact with friends' posts.
- **Post Management**: Users can manage (delete/update) all their previous posts.

### Backend Application
- **Django Web API**: Handles all interactions with the MySQL database.
- **Endpoints**:
  - User management (signup, login, profile updates).
  - Post management (create, update, delete).
  - Friend management.

---

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- Node.js and npm
- Python (3.8 or higher)
- MySQL Server
- Django
- Redux & reduxToolkit

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/abouelfaraj/quotesV3
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000` by default.

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Set up a virtual environment if you have multiple python installed:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure the database:
   - Update the `settings.py` file with your MySQL credentials:
     ```python
     DATABASES = {
         'default': {
             'ENGINE': 'django.db.backends.mysql',
             'NAME': '<database_name>',
             'USER': '<username>',
             'PASSWORD': '<password>',
             'HOST': 'localhost',
             'PORT': '3306',
         }
     }
     ```
   - Apply migrations:
     ```bash
     python manage.py makemigrations
     python manage.py migrate
     ```
5. Start the backend server:
   ```bash
   python manage.py runserver
   ```
   The backend will run on `http://localhost:8000/api` by default.

---

## Usage

1. Open the frontend application in your browser (`http://localhost:3000`).
2. Create a new account by providing a username, email, and password.
3. Complete your profile information after logging in.
4. Interact with the platform by:
   - Adding friends.
   - Creating and interacting with posts.
   - Managing your profile details and posts.

--

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments
- **Frontend**: Built using React.js.
- **Backend**: Powered by Django and MySQL.

Feel free to reach out with any questions or suggestions!
