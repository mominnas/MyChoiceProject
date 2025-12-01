"""
Django secrets template for MyChoiceProject.

Copy this file to secrets.py and fill in the actual values.
DO NOT commit secrets.py to version control!
"""

# SECURITY WARNING: keep the secret key used in production secret!
# Generate a new secret key with: python manage.py shell -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
SECRET_KEY = 'your-secret-key-here'

# Database password (if using a database that requires authentication)
DB_PASSWORD = ''

# API keys and third-party service credentials
# API_KEY = ''
# STRIPE_KEY = ''
