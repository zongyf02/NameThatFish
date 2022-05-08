from flask import request
from flask.wrappers import Response

import io
import json
import logging
from functools import wraps

from keras.preprocessing.image import img_to_array
import numpy as np
from PIL import Image
import tensorflow as tf

from fish import app
from backend.database.orm.models import User, Picture
from backend.database.orm.session_context import SessionContext
from backend.model.fish_identifier import make_model


model = make_model(n_classes=20)
latest = tf.train.latest_checkpoint('./model/trained_weights')
model.load_weights(latest)


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
ch = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


fish = ['Atlantic Salmon', 'Bluegill', 'Brook Trout', 'Channel Catfish', 'Chinook Salmon', 'Crappie', 'Flathead Catfish', 'Lake Sturgeon', 'Sea Lamprey', 'Largemouth Bass', 'Muskellunge', 'Northern Pike', 'Not Recognized', 'Rainbow Trout', 'Rock Bass', 'Smallmouth Bass', 'Sunfish', 'Walleye', 'White Perch', 'Yellow Perch']


def exception_handler(func):
  @wraps(func)
  def _exception_handler(*args, **kwargs):
    try:
      result = func(*args, **kwargs)
    except Exception as e:
      logger.exception(e)
      return Response(json.dumps({'error': 'unexpected_error', 'message': str(e)}),
                      status=401,
                      content_type='application/json')
    return result

  return _exception_handler


@app.route('/', methods=['GET', 'POST'])
def handle_health_check():
  """Return response 200 for successful health check"""
  return Response(status=200)


@app.route("/user/<user_id>", methods=["GET"])
@exception_handler
def get_user(user_id):
  with SessionContext() as session:
    user = session.get_first(User, id=user_id)
    logger.info('Successfully fetched the user')
    user_return = {'id': str(user.id), 'username': user.username, 'email': user.email, 'pictures': user.pictures}
    return Response(json.dumps(user_return),
                    status=200,
                    content_type='applications/json')


@app.route("/user/create", methods=["POST"])
@exception_handler
def create_user():
  data = request.get_json()
  with SessionContext() as session:
    if data is not None:
      session.create(User(**data))
      logger.info('Successfully created the user')
      return Response(status=200)
    else:
      raise('Query must be provided in the request body')
    

@app.route("/user/update/<user_id>", methods=["POST"])
@exception_handler
def update_user(user_id):
  data = request.get_json()
  with SessionContext() as session:
    if data is not None:
      session.update_any(User, User(**data), id=user_id)
      logger.info('Successfully updated the user')
      return Response(status=200)
    else:
      raise('Query must be provided in the request body')


@app.route("/user/delete/<user_id>", methods=["POST"])
@exception_handler
def delete_user(user_id):
  with SessionContext() as session:
    session.delete_any(User, id=user_id)
    logger.info('Successfully deleted the user')
    return Response(status=200)


@app.route("/predict", methods=["POST"])
@exception_handler
def predict():
  if request.method == 'POST':
    image = request.files['fish'].read()
    image = Image.open(io.BytesIO(image))
    
    if image.mode != 'RGB':
      image = image.convert('RGB')

    image = image.resize((512, 512))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)

    prediction = model.predict(image)[0]
    man_idx = np.argmax(prediction)
    predicted_fish = fish[man_idx]

    return Response(json.dumps({'prediction': predicted_fish}),
                    status=200,
                    content_type='applications/json')

