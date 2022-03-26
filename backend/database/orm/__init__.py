from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(
  'postgresql://postgres:sxVe8B8xYjYssg3LJed!@db.wfuyrdztcebiaqngisxe.supabase.co:5432/postgres',
  pool_size=5,
  max_overflow=2,
  pool_timeout=30,
  pool_use_lifo=False
)
Session = sessionmaker(bind=engine)
