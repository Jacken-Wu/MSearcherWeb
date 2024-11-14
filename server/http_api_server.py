from flask import Flask, request, jsonify
from os import listdir
from gevent import pywsgi
from flask_cors import CORS
 
app = Flask(__name__)
CORS(app)

 
@app.route('/search', methods=["GET"])
def calculate():
    search_word = request.args.get('search_word')
    img_list = listdir('/var/www/html/memes/')

    if search_word == None:
        filter_img_list = img_list
    if search_word != None:
        filter_img_list = [img for img in img_list if all(img_char in img for img_char in search_word)]

    return jsonify(filter_img_list)
 
 
if __name__ == '__main__':
    # app.run(host='0.0.0.0',
    #         threaded=True,
    #         debug=False,
    #         port=8866)
    server = pywsgi.WSGIServer(('0.0.0.0', 12345), app)
    server.serve_forever()
