#from main import cipher
def decryption(file_path2,cipher):
     with open(file_path2, 'rb') as input_file:
        file_bytes = input_file.read()
        
     new_file_bytes = cipher.decrypt(file_bytes)
     with open('decrypted.jpg', 'wb') as output_file:
        output_file.write(new_file_bytes)
        print('Operation Done!')
        