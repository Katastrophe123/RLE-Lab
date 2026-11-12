# RLE Lab

A one-week, hands-on study track for RL engineering: build a GRPO training loop and make its verifier trustworthy.

Plain HTML, CSS and JavaScript. No build step, no backend.

## Structure

```
index.html              Home page: week roadmap and progress
assets/site.css         Shared theme (Day: cream/beige/grey/white · Night: black/silver/brown/light blue)
assets/site.js          Theme toggle (Auto / Day / Night) and progress storage
days/day1/index.html    Day 1: lecture, notes, playground, quiz, checkpoint
days/day1/*.mp4         Day 1 lecture video (two parts, each under 25 MiB)
```

Progress and theme are saved in the visitor's browser (localStorage) only.

## Run locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deploy on Cloudflare Pages (free)

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Pick this repository.
3. Framework preset: **None**. Build command: *(leave empty)*. Build output directory: `/`.
4. Deploy. Every push to `main` redeploys automatically.
5. Optional: Custom domains → add your own domain.

## Adding a day

Copy `days/day1/` to `days/dayN/`, replace its content and video, then set `href` for that day in the `DAYS` list in `index.html`.
