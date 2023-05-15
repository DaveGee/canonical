# Canonical take home test

## How to run it

- Open the file `index.html` directly in a browser

## Assumptions related to the design

- The top text is the `topic` of the blog post. When the topic is not available, it is replaced by an `Unknown topic` label
- The bottom text are the `categories`. In the design there's only one, but the page linked can display multiple separated by commas.
- 

## Other decisions

- I used the smallest possible techology set, using only the constrained framework (Vanilla Framework), a home made javascript file and a html file.
- Date formatting is very limited, only supports english and not timezones. It displays as in the design, doesn't take into account locale format. This could be improved by using libraries such as `luxon.js` or similar.
- I assumed we only show 3 posts, whatever the number returned by the API. If more posts are returned, they are not displayed.

## What is missing & further improvements

- Left/right alignment/padding of separators and content of cards is not exactly as per the design.
- Vertical alignment dependes on the length of the title (e.g. if it spans multiple lines) -> multiple posts have different vertical alignment. This could be solved by truncating long titles, or by aligning the bottom part (author, date, and categories) to the bottom of the p-card