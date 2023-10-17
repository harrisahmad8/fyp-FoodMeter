import instaloader
import pymongo

# Initialize the Instaloader instance
loader = instaloader.Instaloader()

# Replace 'username' with the Instagram username of the page you want to scrape
username = 'food_exploration_with_umair'
username= ''

# Connect to your MongoDB database (replace with your MongoDB connection details)
client = pymongo.MongoClient("mongodb+srv://chaudhryhamid655:hamid5678@cluster0.orho31g.mongodb.net/Food-Meter?retryWrites=true&w=majority")
db = client["Food-Meter"]
collection = db["System_comments"]

# Retrieve the profile of the user
profile = instaloader.Profile.from_username(loader.context, username)

# Create a list to store the captions
captions = []

# Iterate over the first 5 posts
count = 0
for post in profile.get_posts():
    if count >= 21:
        break
    captions.append(post.caption)
    count += 1

# Insert the captions into the MongoDB collection
for caption in captions:
    data = {"caption": caption if caption else 'No caption'}
    collection.insert_one(data)

# Close the Instaloader session (optional)
loader.context.log("Closed session")
loader.close()
