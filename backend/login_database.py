import sqlite3

# OLD DELIVERY DB FUNCTIONS (keep them as they are)
# ------------------------------------------------
# your existing code here...


# NEW LOGIN DATABASE INITIALIZER
# ------------------------------------------------
def init_login_db():
    conn = sqlite3.connect("users.db")  # separate DB for authentication
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
    )
    """)

    # Default admin account
    cur.execute("""
    INSERT OR IGNORE INTO users (email, password)
    VALUES (?, ?)
    """, ("admin@gmail.com", "1234"))

    conn.commit()
    conn.close()
