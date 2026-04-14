from PIL import Image
import colorsys

def is_blue(r, g, b):
    # Blue usually has B component significantly higher than R and G, or hue is within 0.5 to 0.8
    h, s, v = colorsys.rgb_to_hsv(r/255., g/255., b/255.)
    return 0.5 < h < 0.8 and s > 0.2

img = Image.open('src/assets/school-badge.png').convert('RGBA')
data = img.getdata()

new_data = []
for item in data:
    if len(item) == 4:
        r, g, b, a = item
    else:
        r, g, b = item
        a = 255
        
    if a > 0 and is_blue(r, g, b):
        h, s, v = colorsys.rgb_to_hsv(r/255., g/255., b/255.)
        # Brown hue is around 0.08. We also decrease saturation a bit so it looks like brown instead of bright orange.
        # And value might be decreased slightly.
        new_hue = 0.08
        new_sat = min(1.0, s * 0.9)
        new_val = min(1.0, v * 0.8)
        new_r, new_g, new_b = colorsys.hsv_to_rgb(new_hue, new_sat, new_val)
        new_data.append((int(new_r*255), int(new_g*255), int(new_b*255), a))
    else:
        new_data.append(item)

img.putdata(new_data)
img.save('src/assets/school-badge-brown.png')
print("Saved school-badge-brown.png")
