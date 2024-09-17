from fastapi import FastAPI, HTTPException, Depends
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
import jwt

# Constants for JWT
SECRET_KEY = "k1f7gQ3t8VbW1zL9T6mYzP2oFqWv5dR0XhN8eL3A4kJz7"  # Replace with your actual secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

client = AsyncIOMotorClient("mongodb+srv://Backend:1234@invdb.y7d9vxz.mongodb.net/")
print("client connected")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = client["Invcare"]
user_data_collection = db["user_data"]

# Helper function to create JWT token
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/register")
async def create_user(req_data: dict):
    if req_data["password"] == req_data["c_password"]:
        data = {
            "username": req_data["username"],
            "createdAt": str(datetime.now()),
            "updatedAt": str(datetime.now()),
            "password": req_data["password"],
            "email": req_data["email"],
            "server": req_data["server"],
        }
        in_data = await user_data_collection.insert_one(data)
        return {"message": "true", "username": req_data["username"], "userid": str(in_data.inserted_id)}
    return {"message": "false"}

@app.post("/login")
async def login(req_data: dict):
    username = req_data.get("username")
    password = req_data.get("password")

    # Fetch the user from the database
    user = await user_data_collection.find_one({"username": username})

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the password matches
    if user["password"] != password:
        raise HTTPException(status_code=401, detail="Incorrect password")

    # Create JWT token
    access_token = create_access_token(data={"sub": username})
    return {"access_token": access_token, "token_type": "bearer", "username": user["username"], "userid": str(user["_id"])}
