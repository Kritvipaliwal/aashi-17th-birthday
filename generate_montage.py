import os
import sys
import math
import struct
import wave
import subprocess
from PIL import Image, ImageFilter, ImageDraw, ImageFont

photos_dir = r"c:\Users\hp\OneDrive\Desktop\aashi_website\public\assets\photos"
output_dir = r"c:\Users\hp\OneDrive\Desktop\aashi_website\public\assets\videos"
src_output_dir = r"c:\Users\hp\OneDrive\Desktop\aashi_website\src\assets\videos"
os.makedirs(output_dir, exist_ok=True)
os.makedirs(src_output_dir, exist_ok=True)

temp_frames_dir = os.path.join(output_dir, "temp_frames")
os.makedirs(temp_frames_dir, exist_ok=True)

photo_sequence = [
    ("real_baby_smile.png", "Year 01 • The Sweetest Arrival"),
    ("real_two_babies.png", "Year 02 • Side By Side From Day One"),
    ("real_toddler.png", "Year 03 • Big Wide Curious Eyes"),
    ("shawl_bun.png", "Year 04 • The Cozy Shawl Era"),
    ("family_vibes.jpg", "Year 05 • Matching Vibes with Grandma"),
    ("lock_sisters_rakhi.png", "Year 06 • Sweet Festival Promises"),
    ("chair_curled.jpg", "Year 07 • Mischief & Innocent Giggles"),
    ("sleeping_earphones.png", "Year 08 • Afternoon Music Dreams"),
    ("sleeping_car.png", "Year 09 • Peaceful Roadtrip Naps"),
    ("family_lake_trip.png", "Year 10 • Sunny Afternoon on the Lake"),
    ("night_walk_sisters.png", "Year 11 • Late Night Talks Under City Lights"),
    ("lock_bed_phone.png", "Year 12 • Quiet Sunday Moments"),
    ("stylish_solo.jpg", "Year 13 • Developing Your Signature Cool"),
    ("sister_selfie.jpg", "Year 14 • Inseparable Sisters"),
    ("black_dress.png", "Year 15 • Elegance, Poise & Grace"),
    ("canon_portrait.png", "Year 16 • That Radiant Camera Glow"),
    ("cake_celebration.jpg", "Year 17 • Happy 17th Birthday Aashi!")
]

canvas_w, canvas_h = 1280, 720

def create_slide(photo_name, caption, idx):
    path = os.path.join(photos_dir, photo_name)
    if not os.path.exists(path):
        print(f"Skipping {path}, file not found")
        return None

    img = Image.open(path).convert("RGBA")
    
    # Create blurred background
    bg = img.copy()
    bg = bg.resize((canvas_w, canvas_h), Image.Resampling.LANCZOS)
    bg = bg.filter(ImageFilter.GaussianBlur(radius=30))
    # Darken background slightly
    dark_overlay = Image.new("RGBA", (canvas_w, canvas_h), (5, 5, 10, 160))
    bg = Image.alpha_composite(bg, dark_overlay)

    # Scale foreground image to fit nicely within 640px height
    fg_max_h = 630
    fg_max_w = 900
    ratio = min(fg_max_w / img.width, fg_max_h / img.height)
    new_w = int(img.width * ratio)
    new_h = int(img.height * ratio)
    fg = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # Add soft golden border around foreground
    border_img = Image.new("RGBA", (new_w + 12, new_h + 12), (223, 186, 115, 180))
    border_img.paste(fg, (6, 6))

    # Paste in center of background
    fg_x = (canvas_w - (new_w + 12)) // 2
    fg_y = (canvas_h - (new_h + 12)) // 2
    bg.paste(border_img, (fg_x, fg_y), border_img)

    # Draw luxury caption banner at the bottom
    draw = ImageDraw.Draw(bg)
    banner_h = 60
    draw.rectangle([0, canvas_h - banner_h, canvas_w, canvas_h], fill=(10, 10, 18, 220))
    draw.line([0, canvas_h - banner_h, canvas_w, canvas_h - banner_h], fill=(223, 186, 115, 140), width=2)

    # Text
    draw.text((40, canvas_h - banner_h + 18), caption, fill=(251, 249, 245, 255))
    draw.text((canvas_w - 180, canvas_h - banner_h + 18), f"{idx + 1:02d} / 17 YEARS", fill=(223, 186, 115, 255))

    frame_path = os.path.join(temp_frames_dir, f"slide_{idx:02d}.png")
    bg.convert("RGB").save(frame_path, "PNG")
    return frame_path

print("Rendering 17 slideshow frames...")
valid_frames = []
for i, (p_name, caption) in enumerate(photo_sequence):
    f_path = create_slide(p_name, caption, i)
    if f_path:
        valid_frames.append(f_path)

print(f"Generated {len(valid_frames)} frames successfully.")

# Create ambient harmonic soundtrack using wave
audio_path = os.path.join(output_dir, "ambient_tune.wav")
sample_rate = 44100
total_duration = len(valid_frames) * 3.0 # 3 seconds per photo = 51 seconds
num_samples = int(sample_rate * total_duration)

print("Synthesizing gentle cinematic ambient audio...")
with wave.open(audio_path, 'w') as wav:
    wav.setnchannels(2)
    wav.setsampwidth(2)
    wav.setframerate(sample_rate)

    # Warm harmonic pentatonic chord progression (F, C, G, Am)
    chords = [
        [174.61, 220.00, 261.63, 329.63], # Fmaj7
        [130.81, 196.00, 261.63, 329.63], # C
        [196.00, 246.94, 293.66, 392.00], # G
        [220.00, 261.63, 329.63, 440.00], # Am
    ]

    frames_bytes = bytearray()
    for n in range(num_samples):
        t = n / sample_rate
        chord_idx = int(t / 4.0) % len(chords)
        current_chord = chords[chord_idx]

        val = 0
        for freq in current_chord:
            val += 0.22 * math.sin(2 * math.pi * freq * t)
            # Add soft chime harmonic
            val += 0.08 * math.sin(2 * math.pi * freq * 2 * t)

        # Gentle envelope
        env = min(1.0, t / 1.5) * min(1.0, (total_duration - t) / 2.0)
        sample = int(val * env * 14000)
        sample = max(-32767, min(32767, sample))
        frames_bytes.extend(struct.pack('<hh', sample, sample))

    wav.writeframes(frames_bytes)

print("Audio generated.")

# Now encode video with ffmpeg: 3 seconds per slide with smooth transition
output_video_path = os.path.join(output_dir, "memory_montage.mp4")
src_video_path = os.path.join(src_output_dir, "memory_montage.mp4")

# Write concat demuxer file
concat_txt = os.path.join(temp_frames_dir, "concat.txt")
with open(concat_txt, "w") as f:
    for vf in valid_frames:
        norm_path = vf.replace('\\', '/')
        f.write(f"file '{norm_path}'\n")
        f.write("duration 3.0\n")
    # Repeat last frame to avoid truncation
    f.write(f"file '{valid_frames[-1].replace(chr(92), '/')}'\n")

print("Encoding MP4 video with ffmpeg...")
cmd = [
    "ffmpeg", "-y",
    "-f", "concat", "-safe", "0", "-i", concat_txt,
    "-i", audio_path,
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "30",
    "-c:a", "aac", "-b:a", "192k",
    "-shortest",
    output_video_path
]

res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode == 0:
    print(f"SUCCESS! Video created at: {output_video_path}")
    import shutil
    shutil.copy(output_video_path, src_video_path)
    print(f"Copied to src: {src_video_path}")
else:
    print("FFmpeg error:", res.stderr)
