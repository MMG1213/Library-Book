from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, books, users
from app.database import engine, Base

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(books.router)

@app.get("/")
def root():
    return {"message": "Library Reservation System running"}
