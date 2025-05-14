#!/bin/bash

find . -name '*.example' -exec sh -c '
  f="$1"
  dest="$(dirname "$f")/$(basename "$f" .example)"
  cp "$f" "$dest"
  echo "📁 Copied: $f to $dest"
' sh {} \;