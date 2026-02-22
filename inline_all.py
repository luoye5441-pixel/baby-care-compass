#!/usr/bin/env python3
"""Inline remaining external references into the single HTML file."""
import base64, os, re

dist = "/home/user/baby-care-compass/dist"
html_path = os.path.join(dist, "index.html")

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Inline favicon
favicon_path = os.path.join(dist, "favicon.ico")
if os.path.exists(favicon_path):
    with open(favicon_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    html = html.replace("/favicon.ico", f"data:image/x-icon;base64,{b64}")
    html = html.replace("favicon.ico", f"data:image/x-icon;base64,{b64}")
    print("✅ Favicon inlined")

# Inline placeholder.svg
svg_path = os.path.join(dist, "placeholder.svg")
if os.path.exists(svg_path):
    with open(svg_path, "r") as f:
        svg_content = f.read()
    b64 = base64.b64encode(svg_content.encode()).decode()
    html = html.replace("/placeholder.svg", f"data:image/svg+xml;base64,{b64}")
    html = html.replace("placeholder.svg", f"data:image/svg+xml;base64,{b64}")
    print("✅ Placeholder SVG inlined")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

# Copy to /home/user
import shutil
out = "/home/user/baby-care-compass-offline.html"
shutil.copy2(html_path, out)
print(f"\n✅ Final file: {out}")
print(f"   Size: {os.path.getsize(out) / 1024 / 1024:.2f} MB")
