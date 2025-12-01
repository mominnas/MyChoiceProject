To serve the built React app from Django:

1. Build the React app
   - cd frontend
   - npm install
   - npm run build

2. Ensure Django can find the build
   - settings.py already includes `DIRS` pointing to `frontend/build` and `STATICFILES_DIRS` to `frontend/build/static`.

3. Start Django server
   - python manage.py collectstatic --noinput (optional for production)
   - python manage.py runserver

Now visiting http://localhost:8000/ will return the React app from `frontend/build/index.html`.
