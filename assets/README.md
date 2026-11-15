# Drop raw media here

Raw files are git-ignored (too big for GitHub). Compressed output goes to `public/`.

- `videos/`        raw VSL, hero loop, assessment clips (any size, mp4/mov)
- `photos/`        raw photos of Rahul, gym, training
- `before-after/`  before/after pairs, named like `client1-before.jpg` / `client1-after.jpg`

Tell Claude when they are in; it compresses them (ffmpeg) into `public/video` and `public/img`.
