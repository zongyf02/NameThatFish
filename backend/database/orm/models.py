import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, String, UnicodeText
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy_utils import UUIDType

Base = declarative_base()

class User(Base):
  """The users having access to the fish app"""
  __tablename__ = "user"
  id = Column(UUIDType(), primary_key=True, unique=True, default=uuid.uuid4)
  username = Column(String(20), unique=True, nullable=False)
  email = Column(UnicodeText(), index=True, unique=True, nullable=False)
  pictures = relationship("Picture", backref="photographer", lazy=True)
  created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

  def __repr__(self):
    return f"User('{self.id}', '{self.username}', '{self.email}'. '{self.created_at}')"


class Picture(Base):
  __tablename__ = "picture"
  id = Column(UUIDType(), primary_key=True, unique=True, default=uuid.uuid4)
  storage_file_id = Column(String(60), unique=True, nullable=False)
  date_created = Column(DateTime, nullable=False, default=datetime.utcnow)
  user_id = Column(UUIDType, ForeignKey("user.id"), nullable=False)

  def __repr__(self):
    return f"Picture('{self.id}', '{self.date_created}')"
