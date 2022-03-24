from flask import request
from flask.wrappers import Response

from fish import app
from backend.database.orm.models import User, Picture
from backend.database.orm.session_manager import session_manager


@app.route('/', methods=['GET', 'POST'])
def handle_health_check():
  """Return response 200 for successful health check"""
  return Response(status=200)

@app.route("/user/<int:user_id>")
def show_picture(user_id):
  user = User.query.one_or_none(user_id)
  return f"User {user.username}"

@app.route("/create/user", methods=["POST"])
def create_user():
  if request.method == 'POST':
    with session_manager() as session:
      session.add(User(username="alex", email="li142a@uwaterloo.ca"))
      session.commit()
    return Response(status=200)

@app.route("/predict", methods=["POST"])
def predict():
  if request.method == 'POST':
    return "predicting fish..."