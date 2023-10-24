import instaloader
import time

def getKeywordCaptions(keyword):
    # Initialize the Instaloader instance
    loader = instaloader.Instaloader()

    # Load the Instagram login session created using the --login option
    loader.load_session_from_file("halima.abbas6")


    # Replace 'usernames' with a list of Instagram usernames you want to scrape
    usernames = ['food_exploration_with_umair']


    # Initialize an empty string to store all the captions
    captions_string = ""

    # Iterate over the usernames
    for username in usernames:
        # Retrieve the profile of the user
        profile = instaloader.Profile.from_username(loader.context, username)

        # Iterate over the first 5 posts for each user and only scrape captions with the keyword
        count = 0
        for post in profile.get_posts():
            print("yes")
            if count >= 5:
                break
            # Increment the count for every post, not just when the keyword is found
            count += 1
            if keyword in post.caption:
                caption = post.caption if post.caption else ''
                captions_string += caption + '\n\n'
            time.sleep(3)  # Add a 2-second delay between posts

    # Close the Instaloader session (optional)
    loader.context.log("Closed session")
    loader.close()

    return captions_string
