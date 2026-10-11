<div align="center">

# ChatPassport

### Switch assistants. Keep your context.

Hit a chat limit? Continue your conversation in another assistant without copying messages one by one. Move text and code across ChatGPT, Claude, Gemini, and DeepSeek with local processing, no API keys, and no ChatPassport account.

[![Install ChatPassport from the Chrome Web Store](https://img.shields.io/badge/Install-Chrome%20Web%20Store-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/chatpassport/anmmhpfpbaafkgdhalbllhmaejeappmb)

[![GitHub Stars](assets/star-badge.svg)](https://github.com/sxwangsxwang1/chatpassport/stargazers)
![Chrome MV3](https://img.shields.io/badge/Chrome-Manifest%20V3-4285F4?style=flat-square&logo=googlechrome&logoColor=white)
[![Chrome Web Store](https://img.shields.io/badge/status-published-176044?style=flat-square)](https://chromewebstore.google.com/detail/chatpassport/anmmhpfpbaafkgdhalbllhmaejeappmb)
![Local only](https://img.shields.io/badge/data-local%20only-176044?style=flat-square)
![No API key](https://img.shields.io/badge/API%20key-not%20required-C6923A?style=flat-square)

[Chrome Web Store](https://chromewebstore.google.com/detail/chatpassport/anmmhpfpbaafkgdhalbllhmaejeappmb) · [How to use](#how-to-use) · [Supported platforms](#supported-platforms) · [Privacy](PRIVACY.md) · [Development](#development)

</div>

![ChatPassport standby continuation flow](store-assets/screenshots/02-standby.png)

## What is ChatPassport?

ChatPassport moves the useful context of an AI conversation to another supported assistant while keeping the user in control of the final message.

Instead of pasting a transcript by hand or sending a context-only message, ChatPassport uses a continuation flow:

1. Read the conversation you choose.
2. Open the destination assistant with the context stored locally.
3. Let you type the next question first.
4. Combine that question with the selected conversation context.
5. Let you review the complete draft and send it yourself.

The destination receives one useful continuation request. ChatPassport never clicks Send automatically.

## Features

- Continue conversations across ChatGPT, Claude, Gemini, and DeepSeek.
- Choose quick capture of currently loaded messages or scroll to load history.
- Preview the transfer size and confirm omitted messages before draft insertion.
- Choose the latest 20, 50, 100, or all captured messages.
- Keep transfer data in the current browser session.
- Wait for a new question before inserting migrated context.
- Verify that the destination editor accepted the complete draft.
- Preserve the user's original question if insertion fails.
- Keep the newest complete messages when a draft exceeds the safe size.
- Export conversations as structured ChatPassport JSON or readable Markdown.
- Import previously exported `.chatpassport.json` files.
- Copy formatted context manually when needed.
- Use the extension without an API key, ChatPassport account, analytics, or tracking.

## Supported platforms

| Platform | Read conversations | Continue with context | Import and export | Status |
| --- | :---: | :---: | :---: | --- |
| ChatGPT | ✓ | ✓ | ✓ | Supported |
| Claude | ✓ | ✓ | ✓ | Supported |
| Gemini | ✓ | ✓ | ✓ | Supported |
| DeepSeek | ✓ | ✓ | ✓ | Supported |

ChatPassport transfers text and fenced code blocks. Images, uploaded files, citations, artifacts, and hidden reasoning are not included in a transfer.

## Install

### Install from the Chrome Web Store

1. Open the official [ChatPassport Chrome Web Store listing](https://chromewebstore.google.com/detail/chatpassport/anmmhpfpbaafkgdhalbllhmaejeappmb).
2. Click **Add to Chrome**.
3. Confirm by selecting **Add extension**.
4. Pin ChatPassport from Chrome's Extensions menu for quick access.

ChatPassport works in Google Chrome and Chromium-based browsers that support Manifest V3 and the side panel.

### Install a packaged build

For a local or development installation:

1. Download or build the ChatPassport package.
2. Unzip `chatpassport-<version>-chrome.zip`.
3. Open `chrome://extensions`.
4. Enable **Developer mode**.
5. Select **Load unpacked**.
6. Choose the unzipped extension folder containing `manifest.json`.

Do not select the repository root. When building from source, the correct folder is `.output/chrome-mv3`.

## How to use

### 1. Open a source conversation

Open the conversation you want to continue on ChatGPT, Claude, Gemini, or DeepSeek. Refresh the page once if the extension was installed while the page was already open.

### 2. Choose a destination and capture mode

Select the assistant you want to continue in, then choose **Messages to read**:

- **Load history** (default): scroll to collect older rendered messages and restore your position. It waits for stable page boundaries and can take up to two minutes. Keep the conversation unchanged. **Stop and use collected messages** ends the scan with a partial result.
- **Quick**: read only messages already rendered by the page, without scrolling or waiting for history. Older or virtualized messages may be absent. Quick results are explicitly marked partial.

Click **Prepare for [destination]**. No conversation is sent to the destination yet.

### 3. Check the captured context

The panel shows the source, captured message count, capture coverage and selected range. It estimates how many complete recent messages fit in the 48,000-character draft budget, allowing for a next question of up to 8,000 characters. These are character counts, not token counts or a guarantee of the destination's model limits.

Open **More options** to select the latest 20, 50, 100 or all captured messages, export JSON/Markdown, or import a saved JSON file. Export always saves the full captured preview, independent of the selected transfer range.

### 4. Continue in the destination

Click **Continue in [destination]**. The extension stores one temporary transfer in session storage and opens its bound destination tab. Type your next question in the destination's normal editor, then click **Add context to draft** on the ChatPassport card.

If older messages must be omitted to fit the actual question, the card shows the exact included/omitted counts first. Click **Confirm and add context**, or **Go back** to reconsider. The editor remains untouched until you confirm. Editing the question during preparation or confirmation requires trying again.

### 5. Review and send

ChatPassport verifies the inserted draft and shows **Draft added · review and send**. Review it, then click the destination website's Send button. ChatPassport never sends automatically.

On an editor write failure, the original question is displayed and **Copy original question** is available for recovery. **Copy saved context** in the side panel is a manual fallback for pending context within the copy size budget. A changed draft is never automatically overwritten to roll back a failed insertion.

## Conversation size protection

Browser storage capacity and an AI model's usable context window are different limits. ChatPassport applies two safeguards:

- Temporary transfers warn above 6 MB and are rejected above 9 MB.
- Continuation drafts use a conservative 48,000-character budget with space reserved for the new request.

When the selected messages do not fit, ChatPassport keeps the newest complete messages from that selection and reports how many older messages were omitted. It does not silently cut a message in half. This size check cannot detect messages that were never loaded or captured from the source page.

If the destination website changes or truncates the inserted content, ChatPassport reports the problem and shows the original question for manual recovery. It does not automatically roll back over a changed editor. User edits, navigation or editor replacement during preparation abort the operation.

## Export and import

| Format | Best for |
| --- | --- |
| `.chatpassport.json` | Re-importing and preserving normalized roles and message order |
| `.chatpassport.md` | Reading, searching, archiving, and note-taking tools |

To export, preview a conversation and select **Save JSON** or **Save Markdown**. The file is saved through Chrome's normal download flow.

To import, open the ChatPassport side panel, select **Import a .chatpassport.json file**, and choose an exported file from your computer. The file is read locally.

JSON capture, export and import share a 25 MiB UTF-8 budget, including formatting and metadata. When capture exceeds this budget, only complete messages that fit are retained and the result is marked partial. A single message that cannot fit is rejected explicitly, not cut in half. Imported files must also fit after normalization. Code blocks preserve their original whitespace, including indentation and blank lines.

The JSON structure is documented in [docs/format.md](docs/format.md).

## Privacy and permissions

ChatPassport has no developer-operated backend. Conversation processing happens inside the browser, and pending transfers become inaccessible after one hour. Alarms schedule cleanup; sleeping or stopped browsers can delay deletion until Chrome resumes. Expiration is rechecked on access and worker startup.

Once context is inserted into the destination editor, that website can read or sync the draft before you click Send. ChatPassport never sends it automatically. Loading older history may trigger normal requests made by the source website.

| Permission | Purpose |
| --- | --- |
| Supported website access | Read a user-selected conversation and work with the destination editor |
| `scripting` | Load and extract rendered messages and insert a continuation after a user action |
| `storage` | Hold one temporary transfer in browser-session storage |
| `sidePanel` | Display the ChatPassport interface alongside the active page |
| `alarms` | Schedule cleanup of expired transfers |

Access is limited to the official ChatGPT, Claude, Gemini, and DeepSeek domains. ChatPassport does not request `<all_urls>`, browsing history, download management, authentication cookies, or unrelated website access.

Read the complete [ChatPassport Privacy Policy](PRIVACY.md).

## Troubleshooting

### The side panel says “Unsupported page”

- Confirm the active tab is on an official supported domain.
- Refresh the AI website after installing or updating ChatPassport.
- Open `chrome://extensions` and confirm ChatPassport is enabled.

Supported domains:

```text
chatgpt.com
chat.openai.com
claude.ai
gemini.google.com
chat.deepseek.com
```

### The destination card does not appear

- Use the destination tab opened for this transfer, not another tab on the same platform.
- Refresh the destination page once.
- Start a new transfer if the previous transfer is more than one hour old.
- Check the ChatPassport entry on `chrome://extensions` for runtime errors.

### The context is too large

Choose the latest 20, 50, or 100 available messages. Export the captured messages as JSON or Markdown to avoid the continuation draft size limit. Exporting does not recover messages missing from the original capture.

### Chrome says `manifest.json` is missing

When installing a local build, select `.output/chrome-mv3` or the folder produced by unzipping the release package. The repository root contains source code and is not an unpacked extension package.

## Development

ChatPassport is built with TypeScript, React, WXT, Zod, Vitest, and Chrome Manifest V3.

### Requirements

- Node.js 20 or newer
- pnpm

Install pnpm if needed:

```bash
npm install --global pnpm
```

Build and verify:

```bash
pnpm install
pnpm check
pnpm release:chrome
```

Useful commands:

```bash
pnpm dev             # Start the development build
pnpm typecheck       # Run TypeScript checks
pnpm test            # Run unit and DOM adapter tests
pnpm build           # Build .output/chrome-mv3
pnpm zip             # Create the extension ZIP
pnpm release:chrome  # Verify and copy the upload-ready ZIP into release/
```

### Project structure

```text
entrypoints/
  background.ts          Background relay and session-storage bridge
  relay.content.ts       Destination continuation card
  sidepanel/             React side-panel interface
lib/
  adapters/page.ts       Conversation extraction and editor adapters
  browser.ts             Active-tab scripting helpers
  core.ts                Rendering, limits, URLs, and shared utilities
  passport.ts            Portable conversation schema
  pending.ts             Expiring session transfer storage
  relay.ts               Relay authorization and continuation budgeting
tests/                    Core, schema, adapter, and relay tests
docs/                     Format documentation and privacy page
store-assets/             Chrome Web Store images and listing materials
```

## Compatibility notes

- Rich content is converted to portable text and fenced code blocks.
- Attachments, images, citations, artifacts, and hidden reasoning stay on the source platform.
- Only one pending quick transfer is stored at a time.
- Destination models and plans may enforce context limits smaller than ChatPassport's draft budget.
- Supported websites can update their page structure; refresh ChatPassport after installing an updated version.

## Contributing

Issues and pull requests are welcome. For a platform compatibility report, include:

- the affected platform and URL pattern;
- what ChatPassport displayed;
- the expected message count or editor behavior; and
- runtime errors with personal conversation content removed.

Before submitting a pull request, run:

```bash
pnpm check
```

## Star history

If ChatPassport is useful, give the project a star. The chart below shows new stars per UTC day over the past 60 days.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/star-history-dark.svg" />
  <img alt="ChatPassport daily GitHub star growth" src="assets/star-history.svg" />
</picture>

<div align="center">

[⭐ Star ChatPassport](https://github.com/sxwangsxwang1/chatpassport) · [View stargazers](https://github.com/sxwangsxwang1/chatpassport/stargazers)

</div>
