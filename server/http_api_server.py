from flask import Flask, request, jsonify
from os import listdir
from gevent import pywsgi
from flask_cors import CORS
import zhconv
from re import findall
 
app = Flask(__name__)
CORS(app)

 
@app.route('/search', methods=["GET"])
def calculate():
    search_word = request.args.get('search_word')
    img_list = listdir('/var/www/html/memes/')

    if search_word is None:
        return jsonify(img_list)

    search_word_lower = ''.join(findall(r'[a-z]', search_word.lower()))
    print('search_word_lower: ' + search_word_lower)

    search_word_simplified = ''.join(findall(r'[^a-z]', zhconv.convert(search_word, 'zh-cn')))
    print('search_word_simplified: ' + search_word_simplified)
    search_word_traditional = ''.join(findall(r'[^a-z]', zhconv.convert(search_word, 'zh-tw')))
    print('search_word_traditional: ' + search_word_traditional)

    filter_img_list = []
    for img in img_list:
        img_lower = img.lower()
        is_filter_english = all(char in img_lower for char in search_word_lower)
        is_filter_chinese = all((search_word_simplified[i] in img or search_word_traditional[i] in img) for i in range(len(search_word_simplified)))
        if is_filter_english and is_filter_chinese:
            filter_img_list.append(img)

    return jsonify(filter_img_list)
 
 
if __name__ == '__main__':
    # app.run(host='0.0.0.0',
    #         threaded=True,
    #         debug=False,
    #         port=8866)
    server = pywsgi.WSGIServer(('0.0.0.0', 8866), app)
    server.serve_forever()
