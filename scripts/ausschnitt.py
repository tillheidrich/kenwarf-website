import sys
from PIL import Image
im=Image.open(sys.argv[1]); y=int(sys.argv[2]); h=int(sys.argv[3])
im.crop((0,y,im.width,min(im.height,y+h))).save(sys.argv[4])
