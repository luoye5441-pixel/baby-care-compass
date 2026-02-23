#!/usr/bin/env python3
"""Inline all assets into a single HTML file for offline use."""

import base64
import hashlib
import os
import re

DIST_DIR = "/home/user/baby-care-compass/dist"
ASSETS_DIR = os.path.join(DIST_DIR, "assets")
OUTPUT_FILE = "/home/user/baby-care-compass/offline.html"

# Read the built files
with open(os.path.join(ASSETS_DIR, "index-DxaAu5NI.css"), "r") as f:
    css_content = f.read()

with open(os.path.join(ASSETS_DIR, "index-Ai7_5U54.js"), "r") as f:
    js_content = f.read()

# Convert audio files to base64 data URIs and replace references in JS
audio_files = {
    "/assets/voice-1-DuhsesRO.mp3": "voice-1-DuhsesRO.mp3",
    "/assets/voice-2-Cf8N117a.mp3": "voice-2-Cf8N117a.mp3",
    "/assets/voice-3-XBfv35lw.mp3": "voice-3-XBfv35lw.mp3",
    "/assets/voice-4-HOqBqUzd.mp3": "voice-4-HOqBqUzd.mp3",
}

for ref_path, filename in audio_files.items():
    filepath = os.path.join(ASSETS_DIR, filename)
    with open(filepath, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("ascii")
    data_uri = f"data:audio/mpeg;base64,{b64}"
    js_content = js_content.replace(ref_path, data_uri)
    print(f"Inlined {filename} ({len(b64)} chars base64)")


def generate_avatar_svg(name: str, is_woman: bool) -> str:
    """Generate a simple SVG avatar with initials and a color based on name."""
    # Generate a consistent color from the name
    h = int(hashlib.md5(name.encode()).hexdigest()[:6], 16)
    hue = h % 360
    bg_color = f"hsl({hue}, 60%, 45%)"

    initial = name[0] if name else "?"
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <rect width="128" height="128" fill="{bg_color}" rx="64"/>
  <text x="64" y="72" font-family="sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">{initial}</text>
</svg>'''
    b64 = base64.b64encode(svg.encode()).hexdigest  # won't work, fix below
    return svg


# Replace portrait image URLs with inline SVG data URIs
# Map randomuser.me URLs to generated avatar SVGs
portrait_replacements = {
    "https://randomuser.me/api/portraits/women/68.jpg": ("L", True),
    "https://randomuser.me/api/portraits/men/45.jpg": ("M", False),
    "https://randomuser.me/api/portraits/women/32.jpg": ("S", True),
    "https://randomuser.me/api/portraits/men/22.jpg": ("A", False),
    "https://randomuser.me/api/portraits/women/44.jpg": ("E", True),
    "https://randomuser.me/api/portraits/men/36.jpg": ("D", False),
    "https://randomuser.me/api/portraits/women/56.jpg": ("R", True),
    "https://randomuser.me/api/portraits/men/52.jpg": ("K", False),
    "https://randomuser.me/api/portraits/women/12.jpg": ("Y", True),
}

for url, (initial, is_woman) in portrait_replacements.items():
    h = int(hashlib.md5(initial.encode()).hexdigest()[:6], 16)
    hue = h % 360
    bg_color = f"hsl({hue}, 60%, 45%)"
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" fill="{bg_color}" rx="64"/><text x="64" y="72" font-family="sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">{initial}</text></svg>'
    b64 = base64.b64encode(svg.encode()).decode("ascii")
    data_uri = f"data:image/svg+xml;base64,{b64}"
    js_content = js_content.replace(url, data_uri)
    print(f"Replaced portrait {url[-20:]} with SVG avatar ({initial})")

# Remove the Google Fonts @import to prevent blocking render on offline
css_content = re.sub(
    r'@import"https://fonts\.googleapis\.com[^"]*";',
    '/* Google Fonts removed for offline use */',
    css_content
)
print("Removed Google Fonts @import for offline use")

# Build the single HTML file
html = f"""<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>品牌策略 - 以策略驱动品牌增长</title>
    <meta name="description" content="专业品牌策略工作室，助力企业品牌定位、市场分析与增长策略。" />
    <meta name="author" content="品牌策略工作室" />
    <style>
{css_content}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
{js_content}
    </script>
  </body>
</html>
"""

with open(OUTPUT_FILE, "w") as f:
    f.write(html)

file_size = os.path.getsize(OUTPUT_FILE)
print(f"\nGenerated: {OUTPUT_FILE}")
print(f"File size: {file_size:,} bytes ({file_size / 1024 / 1024:.2f} MB)")

# Verify
with open(OUTPUT_FILE, "r") as f:
    content = f.read()

ext_urls = [u for u in re.findall(r'https?://[^\s")<>]+', content)
            if not any(x in u for x in ['w3.org', 'reactjs.org', 'threejs.org'])]
if ext_urls:
    print(f"\nWarning: {len(ext_urls)} external URLs remain (non-critical):")
    for u in sorted(set(ext_urls)):
        print(f"  - {u[:100]}")
else:
    print("\nAll external resources inlined - fully offline!")
