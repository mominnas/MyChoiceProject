# MyChoiceProject

This repository contains a Django backend API and a simple React frontend.

## Backend (Django):

1.  Create and activate a Python virtual environment (recommended):
    - Ensure python3 is installed
    - `python3 -m venv venv`
    - `venv\Scripts\activate`   (Windows) or `source venv/bin/activate` (macOS/Linux)
2.  Install requirements:
    - `cd MyChoiceProject`
    - `pip install -r requirements.txt`
3.  Copy the secrets file and edit the secret tokens:
    - `cp MyChoiceProject/secrets.example.py MyChoiceProject/secrets.py`
    - Run `python3 manage.py shell -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` to generate a secret key and paste it in the `secrets.py` file
	- Then edit secrets.py with your actual values
4.  Apply migrations and start the server:
    - `python3 manage.py migrate`
    - `python3 manage.py runserver`


The API is available at `http://localhost:8000/api/items/`

## Serve the React frontend from Django (single-server run)

1.  Build the React app:
    - `cd frontend`
    - `npm install`
    - `npm run build`

2.  Deploy the built frontend into Django static files and templates:
    - `cd ../`
    - `python3 manage.py deploy_frontend`
    - `python3 manage.py collectstatic --noinput`

3.  Start Django:
    - `python3 manage.py runserver`

Now visiting `http://localhost:8000/` will serve the built React app.

## Frontend (React) (dev server):

1.  `cd frontend`
2.  `npm install`
3.  `npm start`

## Notes:

- The `Item` model enforces uniqueness of `name` per `group` (Primary/Secondary).
- API supports list, create, retrieve and partial update operations.
