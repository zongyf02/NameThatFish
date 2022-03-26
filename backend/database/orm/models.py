from sqlalchemy import Column, DateTime, String, UnicodeText, text
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

Base = declarative_base()

class User(Base):
  """The users having access to the fish app"""
  __tablename__ = "user"
  id = Column(UUID(as_uuid=True), primary_key=True, unique=True, server_default=text("uuid_generate_v4()"))
  username = Column(String(20), unique=True, nullable=False)
  email = Column(UnicodeText(), index=True, unique=True, nullable=False)
  pictures = relationship("Picture", backref="photographer", lazy=True)
  created_at = Column(DateTime, nullable=False, server_default=text("NOW()"))

  def __repr__(self):
    return f"User('{self.id}', '{self.username}', '{self.email}'. '{self.created_at}')"


class Picture(Base):
  __tablename__ = "picture"
  id = Column(UUID(as_uuid=True), primary_key=True, unique=True, server_default=text("uuid_generate_v4()"))
  storage_file_id = Column(String(60), unique=True, nullable=False)
  date_created = Column(DateTime, nullable=False, server_default=text("NOW()"))
  user_id = Column(UUID(as_uuid=True), ForeignKey("user.id"), nullable=False)

  def __repr__(self):
    return f"Picture('{self.id}', '{self.date_created}')"
