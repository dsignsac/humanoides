#!/bin/bash

# Directory containing project assets
PROJECTS_DIR="public/proyectos"

# Find all images that are not already variants
find "$PROJECTS_DIR" -type f \( -name "*.webp" -o -name "*.png" -o -name "*.jpg" \) -not -name "*-small.*" -not -name "*-medium.*" -not -name "*-large.*" | while read -r img; do
    
    # Get file components
    dir=$(dirname "$img")
    base=$(basename "$img")
    filename="${base%.*}"
    extension="${base##*.}"
    
    echo "Processing: $img"
    
    # Small (400px width)
    if [ ! -f "$dir/$filename-small.webp" ]; then
        ffmpeg -v error -i "$img" -vf "scale=400:-1" "$dir/$filename-small.webp" < /dev/null
    fi
    
    # Medium (800px width)
    if [ ! -f "$dir/$filename-medium.webp" ]; then
        ffmpeg -v error -i "$img" -vf "scale=800:-1" "$dir/$filename-medium.webp" < /dev/null
    fi
    
    # Large (1200px width)
    if [ ! -f "$dir/$filename-large.webp" ]; then
        ffmpeg -v error -i "$img" -vf "scale=1200:-1" "$dir/$filename-large.webp" < /dev/null
    fi
done

echo "Optimization complete."
