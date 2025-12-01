# MyChoiceProject

This repository contains a Django backend API and a simple React frontend.

## Backend (Django):

1.  Create and activate a Python virtual environment (recommended):
    - `python -m venv venv`
    - `venv\Scripts\activate`   (Windows) or `source venv/bin/activate` (macOS/Linux)
2.  Install requirements:
    - `pip install -r requirements.txt`
3.  Apply migrations and start the server:
    - `python manage.py migrate`
    - `python manage.py runserver`
4.  Copy the secrets file and edit the secret tokens:
    - `cp MyChoiceProject/secrets.example.py MyChoiceProject/secrets.py`
	- Then edit secrets.py with your actual values

The API is available at `http://localhost:8000/api/items/`

## Serve the React frontend from Django (single-server run)

1.  Build the React app:
    - `cd frontend`
    - `npm install`
    - `npm run build`

2.  Deploy the built frontend into Django static files and templates:
    - `python manage.py deploy_frontend`
    - `python manage.py collectstatic --noinput`

3.  Start Django:
    - `python manage.py runserver`

Now visiting `http://localhost:8000/` will serve the built React app.

## Frontend (React) (dev server):

1.  `cd frontend`
2.  `npm install`
3.  `npm start`

## Notes:

- The `Item` model enforces uniqueness of `name` per `group` (Primary/Secondary).
- API supports list, create, retrieve and partial update operations.