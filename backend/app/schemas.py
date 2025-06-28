from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    phone: str
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    phone: str
    username: str

model_config = {"from_attributes": True}

class UserLogin(BaseModel):
    username: str
    password: str

class BookCreate(BaseModel):
    title: str
    author: str
    total_copies: int

class BookOut(BaseModel):
    id: int
    title: str
    author: str
    total_copies: int
    available_copies: int

model_config = {"from_attributes": True}


class ReserveRequest(BaseModel):
    username: str
    copies: int
    amount: int

class ReservationOut(BaseModel):
    id: int
    book_id: int
    user_id: int
    copies: int
    amount: int
    reserved_on: datetime
    expires_on: datetime

model_config = {"from_attributes": True}
