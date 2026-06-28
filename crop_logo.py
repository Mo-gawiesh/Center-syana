import sys
from PIL import Image

try:
    img = Image.open("assets/logo.png")
    # Convert to grayscale to easily find non-white areas
    gray = img.convert('L')
    # Find bounding box of pixels that are not white (e.g., threshold < 250)
    width, height = img.size
    left, top, right, bottom = width, height, 0, 0
    
    for y in range(height):
        for x in range(width):
            if gray.getpixel((x, y)) < 250:
                if x < left: left = x
                if x > right: right = x
                if y < top: top = y
                if y > bottom: bottom = y
                
    if left < right and top < bottom:
        # Add a tiny padding (e.g. 5 pixels)
        pad = 5
        left = max(0, left - pad)
        top = max(0, top - pad)
        right = min(width, right + pad)
        bottom = min(height, bottom + pad)
        
        cropped = img.crop((left, top, right, bottom))
        cropped.save("assets/logo.png")
        print(f"Successfully cropped logo from {width}x{height} to {cropped.size[0]}x{cropped.size[1]} (bbox: {left},{top},{right},{bottom})")
    else:
        print("Could not find logo bounding box (might be blank or pure white).")
except Exception as e:
    print("Error during crop:", e)
