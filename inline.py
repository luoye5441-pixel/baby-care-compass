#!/usr/bin/env python3
"""Inline all assets into a single HTML file for offline use."""

import base64
import hashlib
import os
import re

DIST_DIR = "/home/user/baby-care-compass/dist"
ASSETS_DIR = os.path.join(DIST_DIR, "assets")
OUTPUT_FILE = "/home/user/baby-care-compass/offline.html"

# Find the JS file dynamically
js_files = [f for f in os.listdir(ASSETS_DIR) if f.endswith(".js")]
assert len(js_files) == 1, f"Expected 1 JS file, found {len(js_files)}: {js_files}"
js_filename = js_files[0]
print(f"Using JS file: {js_filename}")

with open(os.path.join(ASSETS_DIR, js_filename), "r") as f:
    js_content = f.read()

# Check for separate CSS file
css_files = [f for f in os.listdir(ASSETS_DIR) if f.endswith(".css")]
css_content = ""
if css_files:
    with open(os.path.join(ASSETS_DIR, css_files[0]), "r") as f:
        css_content = f.read()
    print(f"Using CSS file: {css_files[0]}")
else:
    print("No separate CSS file (inlined in JS)")

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

# Replace portrait image URLs with inline SVG data URIs
portrait_replacements = {
    "https://randomuser.me/api/portraits/women/68.jpg": "L",
    "https://randomuser.me/api/portraits/men/45.jpg": "M",
    "https://randomuser.me/api/portraits/women/32.jpg": "S",
    "https://randomuser.me/api/portraits/men/22.jpg": "A",
    "https://randomuser.me/api/portraits/women/44.jpg": "E",
    "https://randomuser.me/api/portraits/men/36.jpg": "D",
    "https://randomuser.me/api/portraits/women/56.jpg": "R",
    "https://randomuser.me/api/portraits/men/52.jpg": "K",
    "https://randomuser.me/api/portraits/women/12.jpg": "Y",
}

for url, initial in portrait_replacements.items():
    h = int(hashlib.md5(initial.encode()).hexdigest()[:6], 16)
    hue = h % 360
    bg_color = f"hsl({hue}, 60%, 45%)"
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" fill="{bg_color}" rx="64"/><text x="64" y="72" font-family="sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">{initial}</text></svg>'
    b64 = base64.b64encode(svg.encode()).decode("ascii")
    data_uri = f"data:image/svg+xml;base64,{b64}"
    js_content = js_content.replace(url, data_uri)
    print(f"Replaced portrait for ({initial})")

# Remove the Google Fonts @import from CSS if present
if css_content:
    css_content = re.sub(
        r'@import"https://fonts\.googleapis\.com[^"]*";',
        '/* Google Fonts removed for offline use */',
        css_content
    )

# Also remove Google Fonts from JS (might be injected there in IIFE mode)
js_content = re.sub(
    r'@import"https://fonts\.googleapis\.com[^"]*";',
    '/* Google Fonts removed for offline */',
    js_content
)
print("Removed Google Fonts @import for offline use")

# Build the single HTML file - use regular <script> NOT type="module"
css_block = f"\n    <style>\n{css_content}\n    </style>" if css_content else ""
html = f"""<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>品牌策略 - 以策略驱动品牌增长</title>
    <meta name="description" content="专业品牌策略工作室，助力企业品牌定位、市场分析与增长策略。" />
    <meta name="author" content="品牌策略工作室" />{css_block}
  </head>
  <body>
    <div id="root"></div>
    <script>
      // Ensure HashRouter has a valid hash path
      if (!window.location.hash || window.location.hash === '#') {{
        window.location.hash = '#/';
      }}
      // Show errors on screen for mobile debugging
      window.onerror = function(msg, src, line, col, err) {{
        var d = document.createElement('pre');
        d.style.cssText = 'position:fixed;top:0;left:0;right:0;background:red;color:white;padding:16px;z-index:99999;font-size:14px;white-space:pre-wrap;word-break:break-all;';
        d.textContent = 'JS Error: ' + msg + '\\nLine: ' + line + ':' + col + '\\n' + (err && err.stack || '');
        document.body.appendChild(d);
      }};
    </script>
    <script>
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
