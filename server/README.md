# feedback-portal-server

# to create virtual environment
python -m venv <<environment name>>
venv\Scripts\activate.bat (command for windows)
# to create requirements file
pip install pipreqs
pipreqs . (root directory)
# installing pacakages of requirements file
pip install -r requirements.txt (if root directory)
----OR----
pip install -r /path/to/requirements.txt

# Runining project locally
python manage.py makemigrations
python manage.py migrate
python manage.py runserver