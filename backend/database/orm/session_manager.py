import os
from contextlib import contextmanager
from . import Session

@contextmanager
def session_manager():
  """Creates a session to the database
  
  Example: 

    with session_manager() as session:
      session.add(User(username="username", email="email@test.com"))
      session.commit()
  """
  session = Session()
  try:
    yield session
  except: 
    session.rollback()
    raise
  finally:
    session.close()
