# Was the Spencer, NY Store Fire an Accident? Yes or No

A single-page website that answers one question as straightly as the public record allows: was the fire that destroyed the Shurfine Food Mart in Spencer, New York an accident?

The short answer, as of the last update: **undetermined**. No ruling of accident or arson has been released, and the investigation is still open. The page says so plainly instead of guessing.

## What's on the page

- The verdict banner with the current status and last-checked date
- Key facts: what burned, when, who responded, and the state of the investigation
- A timeline from the first smoke spotted at the loading dock through the weeks after
- Why it matters to the village: the only full-service grocery store, food access since the fire, and how to help
- A common-questions section
- A visitor vote (Yes / No) that stays local to each browser, with a note that votes are opinions, not a finding
- Links to the reporting and sources behind every fact

## Files

| File | What it does |
| --- | --- |
| `index.html` | The whole page: verdict, facts, timeline, FAQ, vote, sources |
| `styles.css` | Styling |
| `script.js` | The Yes/No vote logic (saved in the visitor's browser) |

## Running it

No build step and no dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Viewing it live

GitHub Pages serves it here:

https://zephplays134.github.io/spencer-ny-store-fire/

## Sources

Reporting behind the page: [The Ithaca Voice](https://ithacavoice.org/2026/09/fire-destroys-only-grocery-store-in-spencer-sending-shockwaves/), [Elmira Star-Gazette](https://www.stargazette.com/story/news/local/2026/09/14/tioga-county-shurfine-grocery-store-in-spencer-destroyed-by-fire/91757343007/), [WICZ Fox 40](https://www.wicz.com/news/massive-fire-tears-through-spencer-shurfine-food-mart-near-middle-school/article_71a51b73-f861-4ea5-babc-1c7494c95000.html), and [FingerLakes1](https://www.fingerlakes1.com/2026/09/13/fire-destroys-spencers-only-full-service-grocery-store/).

---

Independent page. Not affiliated with any news outlet or the store.
