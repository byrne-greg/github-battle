# github-battle
Github Battle App - Battle your Github friends...and stuff

Hosted at: https://bg-github-battle.firebaseapp.com/

This was a course learning project from Tyler McGinnis React fundamentals course.
See [here](https://github.com/tylermcginnis/react-fundamentals) for more information

## Note on Rate Limiting and exposing of secrets
Currently the "Battle" portion is rate limited accessing the Github APIs. That means that after a number of attempts, the loading screen forever "loads" as the HTTP requests came back as Forbidden. 

As it's using the unauthenticated profile, the rate limit is quite limited. There is a means to increase the rate limit to 5000 requests per hour once authenticated, but this means providing the application a client ID and client secret from OAuth on Github. 

The only problem with this is that this is sent from the client (after all - it's a React App) and as there is no backend, the client secret is exposed via the Network tab in the browser which is a no-no. In a proper production environment, a backend would make the post call "behind the curtain" of the user passing these credentials.

So anyone cloning this - your options are:
1. make a backend that will make these calls for you with your client secret
1. expose your client secret via the browser
1. do nothing - accept life's limitations for now :-)
