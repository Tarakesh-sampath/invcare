from fastapi import FastAPI, HTTPException
from datetime import datetime
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
import json
app = FastAPI()

uri = "mongodb+srv://backend:1234@invdb.y7d9vxz.mongodb.net/?retryWrites=true&w=majority&appName=InvDB"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

#python -m venv .venv; .\.venv\Scripts\Activate; pip install "fastapi[standard]" "pymongo[srv]" motor


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = client["Invcare"]
user_data_collection = db["user_data"]


@app.get("/")
async def root():
    return {"message": "Hello World from my app"}

@app.post("/register")
async def create_user(req_data: dict):
    if( req_data["password"] == req_data["c_password"]):
        data = {
            "username": req_data["username"],
            "createdAt": str(datetime.now()),
            "updatedAt": str(datetime.now()),
            "password": req_data["password"],
            "email": req_data["email"],
            "server": req_data["server"],
        }
        inserted_data = await user_data_collection.insert_one(data)
        return {"message": "true", "username": req_data["username"]}
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
    print(username,password)
    return {"message": "true", "username": user["username"]}