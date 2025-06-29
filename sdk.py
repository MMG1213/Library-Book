import requests

# 🔗 Base URL of your backend (change if running locally)
BASE_URL = "https://library-backend-f9bh.onrender.com"
# For local dev use: BASE_URL = "http://localhost:8000"

# -------------------- AUTH & USERS --------------------

def register(name: str, phone: str, username: str, password: str, gender: str):
    payload = {
        "name": name,
        "phone": phone,
        "username": username,
        "password": password,
        "gender": gender
    }
    res = requests.post(f"{BASE_URL}/users/register", json=payload)
    res.raise_for_status()
    return res.json()

def login(username: str, password: str):
    payload = {
        "username": username,
        "password": password
    }
    res = requests.post(f"{BASE_URL}/auth/login", json=payload)
    res.raise_for_status()
    return res.json()

def get_user(username: str):
    res = requests.get(f"{BASE_URL}/users/{username}")
    res.raise_for_status()
    return res.json()


# -------------------- BOOKS --------------------

def get_books():
    res = requests.get(f"{BASE_URL}/books/")
    res.raise_for_status()
    return res.json()

def add_book(title: str, author: str, total_copies: int):
    payload = {
        "title": title,
        "author": author,
        "total_copies": total_copies
    }
    res = requests.post(f"{BASE_URL}/books/", json=payload)
    res.raise_for_status()
    return res.json()

def reserve_book(book_id: int, username: str, copies: int, amount: float):
    payload = {
        "username": username,
        "copies": copies,
        "amount": amount
    }
    res = requests.post(f"{BASE_URL}/books/{book_id}/reserve", json=payload)
    res.raise_for_status()
    return res.json()
