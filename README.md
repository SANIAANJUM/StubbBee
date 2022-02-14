# Stubb Bee

    git clone https://github.com/harshramandas/StubbBee/

### Open Three Terminal


Run this command in Each Terminal

    cd StubbBee

### Terminal One
#### Backend
Make Sure it is Python3

Unix, Mac and Linux:

    rm -rf env

Windows:

    rm -r env

##### Then:

Create Virtual Environment

    virtualenv env

Activate Virtual Environment

###### (On Windows)

    \env\Scripts\activate.bat


###### (On Unix, Mac and Linux)

    source env/bin/activate

Install dependencies and start your server

    pip install -r requirements.txt
    cd src
    python manage.py migrate
    python manage.py runserver

### Terminal Two
#### Frontend

    cd gui
    npm i
    npm start

### Terminal Three
#### Version Control And Other Usages
Activate Virtual Environment

###### (On Windows)

    \env\Scripts\activate.bat


###### (On Unix, Mac and Linux)

    source env/bin/activate
