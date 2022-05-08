FROM python:3.8

WORKDIR /app

ENV PYTHONPATH=$PYTHONPATH:/app/

RUN apt-get update -y
RUN apt-get install -y python3 python3-pip

COPY . /app

RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD gunicorn main:app