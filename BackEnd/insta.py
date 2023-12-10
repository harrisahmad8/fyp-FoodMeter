import instaloader
import time

def getKeywordCaptions():
    # Take keyword input from the user
    keyword = input("Enter the keyword to search for: ")

    loader = instaloader.Instaloader()

    # Load session from file
    loader.load_session_from_file("halima.abbas6")

    # List of Instagram usernames
    usernames = ['food_exploration_with_umair', 'islamabadfoodgram', 'thefoodloverfromcapital']

    captions_string = ""

    for username in usernames:
        # Get Instagram profile for the given username
        profile = instaloader.Profile.from_username(loader.context, username)

        count = 0
        for post in profile.get_posts():
            # Limit the search to the first 20 posts
            if count >= 20:
                break

            # Increment the count for every post
            count += 1

            # Check if the keyword is in the post caption
            if keyword.lower() in post.caption.lower():
                caption = post.caption if post.caption else ''
                captions_string += f"Username: {username}\nPost URL: {post.url}\nCaption: {caption}\n\n"

            # Add a 2-second delay between posts
            time.sleep(2)

    # Close the session
    loader.context.log("Closed session")
    loader.close()

    return captions_string

# Call the function and print the result
result = getKeywordCaptions()
print(result)
