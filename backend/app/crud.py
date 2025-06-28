from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime, timedelta

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    return db.query(models.User).filter_by(username=username, password=password).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter_by(username=username).first()

def add_book(db: Session, book: schemas.BookCreate):
    db_book = models.Book(
        title=book.title,
        author=book.author,
        total_copies=book.total_copies,
        available_copies=book.total_copies
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def get_books(db: Session):
    return db.query(models.Book).all()

def get_book(db: Session, book_id: int):
    return db.query(models.Book).filter_by(id=book_id).first()

def reserve_book(db: Session, book_id: int, username: str, copies: int, amount: int):
    book = get_book(db, book_id)
    user = get_user_by_username(db, username)
    if book and user and book.available_copies >= copies:
        book.available_copies -= copies
        reservation = models.Reservation(
            book_id=book_id,
            user_id=user.id,
            copies=copies,
            amount=amount,
            reserved_on=datetime.utcnow(),
            expires_on=datetime.utcnow() + timedelta(days=7)
        )
        db.add(reservation)
        db.commit()
        return reservation
    return None
