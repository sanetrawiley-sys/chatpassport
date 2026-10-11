# Chrome Web Store 0.1.6 update checklist

## Prepared files

- Package: `release/chatpassport-0.1.6-chrome.zip`
- Three screenshots: `store-assets/screenshots/01-capture.png`, `02-standby.png`, `03-review-and-send.png`
- Listing and permission explanations: `store-assets/STORE_LISTING.md`
- Release notes and verification limits: `release/UPDATE-0.1.6.zh-CN.md`

## Update the existing item

1. Open existing item `anmmhpfpbaafkgdhalbllhmaejeappmb`; do not create a new item.
2. Upload the ZIP and verify the dashboard reads version 0.1.6.
3. Update the name, summary and description from STORE_LISTING.md. Package upload alone does not update every listing field.
4. Preview all three PNG files before uploading. They must show ChatPassport with demonstration data, never Google/GitHub sign-in pages. The second and third files must be different.
5. Verify all permission explanations, including alarms, are saved. This update adds no permissions.
6. Save draft, click Submit for review, then confirm. Use Why can't I submit? to inspect blockers.
7. Choose automatic publication after approval if desired; otherwise publish manually after approval. Verify Published shows 0.1.6.

## Verify before submission

- Load the exact unpacked release package in Chrome.
- Check quick and history capture on all four supported sites with signed-in accounts.
- Check destination insertion, omission approval/cancellation and failed-write recovery.
- Confirm sending remains manual; inspect code formatting and capture coverage.
- Check export/import, including older JSON and new loaded captures.
- Public privacy URL: https://sxwangsxwang1.github.io/chatpassport/privacy.html

Build and automated tests are not a substitute for signed-in live-site checks.
