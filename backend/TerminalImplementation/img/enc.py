#from main import cipher
def encryption(file_path,cipher):
    with open(file_path, 'rb') as input_file:
        file_bytes = input_file.read()
    
            # Perform Encryption operation
    new_file_bytes = cipher.encrypt(file_bytes)
    with open('encrypted_file.jpg', 'wb') as output_file:
        output_file.write(new_file_bytes)
        print('Operation Done!')