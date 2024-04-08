# Install pycryptodome from terminal 
# pip install pycryptodome

# Then import DES3 for Encryption and md5 for key
from Crypto.Cipher import DES3
from hashlib import md5
from enc import *
from dec import *

# For selecting operation from given choice
while True:
    print('Choose operation to be done:\n\t1- Encryption\n\t2- Decryption')
    operation = input('Your Choice: ')
    if operation not in ['1', '2']:
        break
        
    # Image / File Path for operation
    if operation=='1':
        file_path = input('File path: ')
    elif operation=='2':
        file_path2=input("File Path: ")
    
    # Key for performing Triple DES algorithm
    key = input('TDES key: ')

    # Encode given key to 16 byte ascii key with md5 operation
    key_hash = md5(key.encode('ascii')).digest()

    # Adjust key parity of generated Hash Key for Final Triple DES Key
    tdes_key = DES3.adjust_key_parity(key_hash)
    
    #  Cipher with integration of Triple DES key, MODE_EAX for Confidentiality & Authentication
    #  and nonce for generating random / pseudo random number which is used for authentication protocol
    cipher = DES3.new(tdes_key, DES3.MODE_EAX, nonce=b'0')

    # Open & read file from given path
   
        
    if operation == '1':
        encryption(file_path,cipher)
            # Perform Encryption operation
          
    elif operation == '2':
        decryption(file_path2,cipher)
            # Perform Decryption operation
           
    
    # Write updated values in file from given path
   
        
# Code Complete!