# from flask import Flask, request,send_file, jsonify
# from  flask_cors import CORS
# from Crypto.Cipher import DES3
# from hashlib import md5
# from io import BytesIO #these lines are added 
# # from PIL import Image
 
# app = Flask(__name__)
# CORS(app)

# def decryptionImage(file_path2,cipher):
#     new_file_bytes = cipher.decrypt(file_path2)
#     return new_file_bytes

# def encryptionImage(file_path,cipher):   
#     new_file_bytes = cipher.encrypt(file_path)
#     return new_file_bytes
 
# @app.route('/')
# def status():
#     data = {'message': 'Hello, World!', 'status': 'ok'}
#     return jsonify(data)

# @app.route('/process', methods=['POST'])
# def text():
#     print('printing hwre',request)
#     action = request.args.get('action')
#     algo = request.args.get('algo')
#     type = request.args.get('type')
#     key = request.form.get('TDESKey')
#     # Access the uploaded file
#     file = request.files['file']
#     print("file is ",file)

#     # Extract file name and extension
#     file_name = file.filename
#     file_extension = file_name.split('.')[-1]

#     # Convert the file extension to lowercase for consistency
#     file_type = file_extension.lower()

#     key_hash = md5(key.encode('ascii')).digest()
#     tdes_key = DES3.adjust_key_parity(key_hash)
#     cipher = DES3.new(tdes_key, DES3.MODE_EAX, nonce=b'0')

#     # Save the file to a specified location
#     # file.save('uploaded_file.jpg')  # Save the file with a specific name and extension

#     file_bytes = file.read()
    
   
#     # if action == 'encrypt':
#     #     encryptionImage('uploaded_file.jpg', cipher)
#     #     response = send_file('encrypted_image.jpg', as_attachment=True) 
#     # elif action == 'decrypt':
#     #     decryptionImage('uploaded_file.jpg', cipher)
#     #     response = send_file('decrypted_image.jpg', as_attachment=True)
#     # else:
#     #     return jsonify({'error': 'Invalid action'}), 400

#     if action == 'encrypt':
#         encrypted_bytes = encryptionImage(file_bytes, cipher)
#         encrypted_file = BytesIO(encrypted_bytes)
#         encrypted_file.seek(0)
#         response = send_file(encrypted_file, as_attachment=True,download_name='encrypted.'+file_type,mimetype=file_type)
#     elif action == 'decrypt':
#         decrypted_bytes = decryptionImage(file_bytes, cipher)
#         decrypted_file = BytesIO(decrypted_bytes)
#         decrypted_file.seek(0)
#         response = send_file(decrypted_file, as_attachment=True, download_name='decrypted.'+file_type, mimetype=file_type)
#     else:
#         return jsonify({'error': 'Invalid action'}), 400
    
#     response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
#     return response
    
    

 
 
# if __name__ == "__main__":
#     app.run(host = '0.0.0.0', port = 5000, debug = True)

from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from Crypto.Cipher import DES3
from hashlib import md5
from io import BytesIO
import magic  # Library for identifying file types

app = Flask(__name__)
CORS(app)

def determine_file_type(file_bytes):
    """
    Determine the type of file based on its content.
    Args:
        file_bytes: Bytes of the file content.
    Returns:
        A string representing the file type.
    """
    mime = magic.Magic(mime=True)
    file_type = mime.from_buffer(file_bytes)
    return file_type

def decryptionImage(file_path2, cipher):
    new_file_bytes = cipher.decrypt(file_path2)
    return new_file_bytes

def encryptionImage(file_path, cipher):
    new_file_bytes = cipher.encrypt(file_path)
    return new_file_bytes

@app.route('/')
def status():
    data = {'message': 'Welcome to CipherSphere: Your Gateway to Secure Communication!', 'status': 'Explore the art of secure exchanges with our cutting-edge encryption and decryption services.'}
    return jsonify(data)

@app.route('/process', methods=['POST'])
def text():
    action = request.args.get('action')
    key = request.form.get('TDESKey')
    file = request.files['file']

    key_hash = md5(key.encode('ascii')).digest()
    tdes_key = DES3.adjust_key_parity(key_hash)
    cipher = DES3.new(tdes_key, DES3.MODE_EAX, nonce=b'0')

    file_bytes = file.read()
    file_type = determine_file_type(file_bytes)

    if action == 'encrypt':
        encrypted_bytes = encryptionImage(file_bytes, cipher)
        encrypted_file = BytesIO(encrypted_bytes)
        encrypted_file.seek(0)
        response = send_file(encrypted_file, as_attachment=True, download_name='encrypted.' + file_type.split('/')[1], mimetype=file_type)
    elif action == 'decrypt':
        decrypted_bytes = decryptionImage(file_bytes, cipher)
        decrypted_file = BytesIO(decrypted_bytes)
        decrypted_file.seek(0)
        response = send_file(decrypted_file, as_attachment=True, download_name='decrypted.' + file_type.split('/')[1], mimetype=file_type)
    else:
        return jsonify({'error': 'Invalid action'}), 400

    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
