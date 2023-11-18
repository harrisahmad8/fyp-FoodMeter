import instaloader
import time

def getKeywordCaptions(keyword):
    
    loader = instaloader.Instaloader()

    
    loader.load_session_from_file("halima.abbas6")


    
    usernames = ['food_exploration_with_umair']


    
    captions_string = ""

    
    for username in usernames:
       
        profile = instaloader.Profile.from_username(loader.context, username)

        
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
            time.sleep(1) # Add a 2-second delay between posts

    loader.context.log("Closed session")
    loader.close()

    return captions_string
