from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud, schemas

router = APIRouter(prefix="/books", tags=["Books"])

@router.post("/", response_model=schemas.BookOut)
def add_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    return crud.add_book(db, book)

@router.get("/", response_model=list[schemas.BookOut])
def get_all_books(db: Session = Depends(get_db)):
    return crud.get_books(db)

@router.post("/{book_id}/reserve", response_model=schemas.ReservationOut)
def reserve(book_id: int, req: schemas.ReserveRequest, db: Session = Depends(get_db)):
    reservation = crud.reserve_book(db, book_id, req.username, req.copies, req.amount)
    if not reservation:
        raise HTTPException(status_code=400, detail="Reservation failed (not enough copies or user not found)")
    return reservation
