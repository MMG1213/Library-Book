from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime, timedelta

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String)
    username = Column(String, unique=True, index=True)
    password = Column(String)

class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    author = Column(String)
    total_copies = Column(Integer)
    available_copies = Column(Integer)

class Reservation(Base):
    __tablename__ = "reservations"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    book_id = Column(Integer, ForeignKey("books.id"))
    copies = Column(Integer)
    amount = Column(Integer)
    reserved_on = Column(DateTime, default=datetime.utcnow)
    expires_on = Column(DateTime, default=lambda: datetime.utcnow() + timedelta(days=7))

    user = relationship("User")
    book = relationship("Book")
