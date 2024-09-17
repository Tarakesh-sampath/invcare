from fastapi import FastAPI, HTTPException
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId

app = FastAPI()

# Connect to MongoDB
client = AsyncIOMotorClient("mongodb+srv://Backend:1234@invdb.y7d9vxz.mongodb.net/")
print("MongoDB client connected")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database and collections
invcare_db = client["Invcare"]
user_data_collection = invcare_db["user_data"]

shop_db = client["shop"]
inventory_collection = shop_db["inventory"]
bill_collection = shop_db["bill"]

@app.get("/")
async def root():
    return {"message": "Hello World"}

# User Registration
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

# User Login
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
    
    return {"message": "true", "username": user["username"], "userid": str(user["_id"])}

# Inventory Management
@app.post("/inventory")
async def create_inventory_item(item: dict):
    item['createdAt'] = str(datetime.now())
    item['updatedAt'] = str(datetime.now())
    result = await inventory_collection.insert_one(item)
    return {"message": "Item added", "itemId": str(result.inserted_id)}

@app.get("/inventory")
async def get_inventory():
    inventory = []
    async for item in inventory_collection.find():
        inventory.append({"id": str(item["_id"]), **item})
    return {"inventory": inventory}

# Bill Management
@app.post("/bill")
async def create_bill(bill: dict):
    bill['createdAt'] = str(datetime.now())
    result = await bill_collection.insert_one(bill)
    return {"message": "Bill created", "billId": str(result.inserted_id)}

@app.get("/bills")
async def get_bills():
    bills = []
    async for bill in bill_collection.find():
        bills.append({"id": str(bill["_id"]), **bill})
    return {"bills": bills}
