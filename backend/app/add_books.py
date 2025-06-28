import requests

books = [
    {"title": "The Alchemist", "author": "Paulo Coelho", "total_copies": 7},
    {"title": "Ikigai", "author": "Héctor García", "total_copies": 6},
    {"title": "Think and Grow Rich", "author": "Napoleon Hill", "total_copies": 8},
    {"title": "Wings of Fire", "author": "A.P.J. Abdul Kalam", "total_copies": 10},
    {"title": "You Can Win", "author": "Shiv Khera", "total_copies": 5},
    {"title": "Do Epic Shit", "author": "Ankur Warikoo", "total_copies": 4},
    {"title": "Deep Work", "author": "Cal Newport", "total_copies": 6},
    {"title": "Start With Why", "author": "Simon Sinek", "total_copies": 6},
    {"title": "Zero to One", "author": "Peter Thiel", "total_copies": 5},
    {"title": "Can't Hurt Me", "author": "David Goggins", "total_copies": 7},
    {"title": "Sapiens", "author": "Yuval Noah Harari", "total_copies": 5},
    {"title": "The Psychology of Money", "author": "Morgan Housel", "total_copies": 6},
    {"title": "The Power of Your Subconscious Mind", "author": "Joseph Murphy", "total_copies": 5}
]

for book in books:
    res = requests.post("http://127.0.0.1:8000/books/", json=book)
    status = "✅" if res.status_code == 200 else "❌"
    print(f"{status} {book['title']} -> {res.status_code}")
