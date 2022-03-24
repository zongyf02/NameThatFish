<!-- @format -->

# Alembic

Alembic is a migration tool. It is useful when we want to create/delete table, add/update/delete table columns, or manipulate data in the database.

## Changing the database url

Change the `sqlalchemy.url` in database/alembic/alembic.ini
e.g. If you wish to use sqlite, then set sqlalchemy.url = sqlite:///fish.db

## Creating a migration script

After modifying the database/orm/models.py file, run

```
$ alembic revision --autogenerate -m "your message"
```

to create a migration script. Creating it won't affect the database yet. You can check the generated migration script under ./migration/versions

## Running a migration

After creating a migration script, run the following command to apply the migration to the database

```
$ alembic upgrade heads
```
