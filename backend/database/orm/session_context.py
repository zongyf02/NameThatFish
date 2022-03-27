import os
from functools import wraps

from . import Session

def commit_or_rollback(func):
  @wraps(func)
  def _commit_or_rollback(self, *args, **kwargs):
    try:
      result = func(self, *args, **kwargs)
      self.session.commit()
    except Exception as e:
      self.session.rollback()
      raise(e)
    return result

  return _commit_or_rollback

class SessionManager():
  def __init__(self, session):
    self.session = session
  
  @commit_or_rollback
  def get_first(self, model, **filters):
    """ get_any gets the first item from the model that satisfies filters

    params:
      model: a target model
      filters: key word arguments of filters to be applied

    return:
      the first result or None if the result is not found

    example:
      class User(Base):
        id = Column(Integer, primary_key=True)
        username = Column(String(20), unique=True, nullable=False)
      
      with SessionContext() as session:
        user = session.get_any(User, id=1, username='Bob')
    """
    return self.session.query(model).filter_by(**filters).first()

  @commit_or_rollback
  def update_any(self, model, update, **filters):
    """ update_any all items satisfying filters to update

    params:
      model: a target model
      update: a model object that will replace
      filters: key word arguments of filters to be applied

    return:
      the count of rows matched

    example:
      class User(Base):
        id = Column(Integer, primary_key=True)
        username = Column(String(20), unique=True, nullable=False)
      
      with SessionContext() as session:
        update = User(username='Alice')
        update_any(User, update, username='Bob')
    """
    return self.session.query(model).filter_by(**filters).update(update)

  @commit_or_rollback
  def create(self, object):
    """ creates an entry to the database

    params:
      object: a model object that will be inserted

    return:
      None

    example:
      class User(Base):
        id = Column(Integer, primary_key=True)
        username = Column(String(20), unique=True, nullable=False)
      
      with SessionContext() as session:
        object = User(username='Charles')
        create(object)
    """
    return self.session.add(object)

  @commit_or_rollback
  def delete_any(self, model, **filters):
    """ delete_any deletes all items satisfying filters to update

    params:
      model: a target model
      filters: key word arguments of filters to be applied

    return:
      None

    example:
      class User(Base):
        id = Column(Integer, primary_key=True)
        username = Column(String(20), unique=True, nullable=False)
      
      with SessionContext() as session:
        session.delete_any(User, username='Alice')
    """
    return self.session.query(model).filter_by(**filters).delete()

  @commit_or_rollback
  def exist(self, model, **filters):
    """ exist returns True if there is a row that satisfies filters, False otherwise

    params:
      model: a target model
      filters: key word arguments of filters to be applied

    return:
      True or False

    example:
      class User(Base):
        id = Column(Integer, primary_key=True)
        username = Column(String(20), unique=True, nullable=False)
      
      with SessionContext() as session:
        session.exist(User, username='Alice')
    """
    return self.session.query(model).filter_by(**filters).exists()


# follows the RAII principle
class SessionContext(object):  
  def __init__(self):
    super().__init__()

  def __enter__(self):
    self.session = Session()
    return SessionManager(self.session)

  def __exit__(self, exc_type, exc_val, traceback):
    self.session.close()
