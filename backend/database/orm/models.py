from datetime import datetime

from sqlalchemy import Column, Integer, DateTime, String, UnicodeText, TIMESTAMP, func
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql.schema import ForeignKey

Base = declarative_base()

class User(Base):
  """The users having access to the fish app"""
  __tablename__ = "user"
  id = Column(Integer, primary_key=True)
  username = Column(String(20), unique=True, nullable=False)
  email = Column(UnicodeText(), index=True, unique=True, nullable=False)
  pictures = relationship("Picture", backref="photographer", lazy=True)
  last_login_date = Column(
    TIMESTAMP(timezone=False),
    server_default=func.now(),
    nullable=False
  )

  def __repr__(self):
    return f"User('{self.id}', '{self.username}')"


class Picture(Base):
  __tablename__ = "picture"
  id = Column(Integer, primary_key=True)
  date_created = Column(DateTime, nullable=False, default=datetime.utcnow)
  user_id = Column(Integer, ForeignKey("user.id"), nullable=False)

  def __repr__(self):
    return f"Picture('{self.id}', '{self.date_created}')"
