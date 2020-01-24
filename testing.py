import config as cfg
import os
import requests
from requests.models import PreparedRequest
from flask import Flask, redirect
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

req = PreparedRequest()

params = {'client_id': os.environ['SPOTIPY_CLIENT_ID'],
          'response_type': 'code',
          'redirect_uri': os.environ['SPOTIPY_REDIRECT_URI']}


@app.route('/login')
def get_auth():
    req.prepare_url(cfg.SPOTIFY_AUTHORIZE, params)
    return redirect(req.url)


@app.route('/')
def home():
    return ('Here')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000)
