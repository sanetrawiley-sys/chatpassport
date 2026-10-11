# Store screenshot preview

Run `node scripts/preview-store.mjs` from the repository root, then open:

- http://127.0.0.1:4176/store-assets/source/showcase.html?shot=capture
- http://127.0.0.1:4176/store-assets/source/showcase.html?shot=standby
- http://127.0.0.1:4176/store-assets/source/showcase.html?shot=review

Render at 1280×800. The capture screen imports the actual React App; the destination screens import the actual relay code and use its real composer insertion/verification. To capture the review state, click Add context to draft and wait for Draft added · review and send.

`browser.js` is a preview-only alias for `wxt/browser`, with sample conversations and local stub APIs. The destination editor is illustrative, not a screenshot of Claude's website. Open shadow roots in this preview enable UI inspection; the shipped extension retains its original shadow behavior. These files are not extension entrypoints and are excluded from the release ZIP.

Save three distinct images to `store-assets/screenshots`. Check every image visually before uploading. Never replace them with login pages or personal conversation captures. Local preview does not verify live website compatibility.
