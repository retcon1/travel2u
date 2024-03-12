## Why your app needs a backend service...

If your app wants to securely host a vast amount of users then chances are it will need a backend API for secure storage, authentication and the ability to scale as your app grows.
Currently, the DFCorp weather app allows users to check the weather for their desired destinations, but if they want to favourite and come back to any locations, then they have to save it as local storage. 

Here are just some benefits of storing that information on a new database instead of in local storage:
- Users can access their favourites from any device through a login system.
- Favourites are not lost if users clear their local cache.
- User data is more secure and can't be hacked as easily as local storage.
- Login system allows multiple users to access personalised favourites on the same device.
- Gives the user a greater feeling of security knowing their data is locked behind a password.

### How this helps you...

By asking users to create an account, you are welcoming them into the DFCorp ecosystem. This then allows us to integrate that account with our other services; it will be easier to transition the user and entice them into using our other services such as the banking or diary app, when they realise they can already easily sign into those apps with the same account.

This means that as DFCorp's ecosystem grows, we have built-in potential audiences for any future ventures, with an easy app or site to utilise for advertisement of these upcoming or existing apps.

## User Stories

- As a user I want to be able to create a new account with a username and password.
- As a user I want to know that my username is unique so there isn't a risk of me appearing as someone else.
- As a user I want to be able to login so that I can use the app with my info.
- As a user I want to be able to change my password in case it becomes compromised.
- As a user I want to be able to be able to add a new location to my favourites, so that I can expand my collection.
- As a user I want to be able to look at my stored, location favourites so that I know what I have saved.
- As a user I want to be able to remove a location from my favourites, so that I can effectively manage them.
- As a user I expect my requests to be authenticated so that I can be confident it is only me who is able to view, add or remove my favourite locations.