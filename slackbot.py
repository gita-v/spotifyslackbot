import os
import time
import re
import slack
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util
import sys
import os
import slack
import requests

# START SERVER:
# python3 -m http.server 9000

username = "guitaznia"
client_cred_manager = SpotifyClientCredentials(client_id=os.environ['SLACK_BOT_TOKEN'],
                                               client_secret=os.environ['SPOTIPY_CLIENT_SECRET'])
sp = spotipy.Spotify(client_credentials_manager=client_cred_manager)
scope = 'user-library-read playlist-read-private user-read-currently-playing user-read-email user-read-private'
token = util.prompt_for_user_token(username, scope, redirect_uri=os.environ['SPOTIPY_REDIRECT_URI'])
if token:
    sp = spotipy.Spotify(auth=token)
    while True:
        joined = []
        if sp.currently_playing() is not None:
            for artist in sp.currently_playing()['item']['artists']:
                joined.append(artist['name'])
                song = sp.currently_playing()['item']['name']
            artists = ', '.join(joined)
            url = "https://slack.com/api/users.profile.set"
            payload = {
                "profile": {
                    "status_text": song,
                    "status_emoji": ":notes:"
                }
            }
            headers = {
                'Content-Type': "application/json",
                'Authorization': "Bearer xoxp-914234627461-914223555664-902758109235-9d9ee4fae2cba204470ff37bfef083f2",
                'User-Agent': "PostmanRuntime/7.20.1",
                'Accept': "*/*",
                'Cache-Control': "no-cache",
                'Postman-Token': "82a6a55e-612b-4e44-a18f-113809ccccfc,8132dbec-fe3c-46a0-a586-f99b8abb4d24",
                'Host': "slack.com",
                'Accept-Encoding': "gzip, deflate",
                'Content-Length': "117",
                'Connection': "keep-alive",
                'cache-control': "no-cache"
            }

            response = requests.request("POST", url, json=payload, headers=headers)
            print(response.status_code)
        else:
            url = "https://slack.com/api/users.profile.set"
            payload = {
                "profile": {
                    "status_text": "",
                    "status_emoji": ""
                }
            }
            headers = {
                'Content-Type': "application/json",
                'Authorization': "Bearer "+os.environ['SLACK_USER_TOKEN'],
                'Accept': "*/*",
                'Cache-Control': "no-cache",
                'Host': "slack.com",
                'Connection': "keep-alive",
                'cache-control': "no-cache"
            }

            response = requests.request("POST", url, json=payload, headers=headers)
            print(response.status_code)
        time.sleep(5)
else:
    print("Can't get token for", username)
