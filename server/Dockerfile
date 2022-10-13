FROM python:3.10-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

COPY .env.production .env

RUN python manage.py migrate

CMD gunicorn server.wsgi:application
