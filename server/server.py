# PLACE API ROUTING CODE IN THIS FILE

from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('localhost', 3001)