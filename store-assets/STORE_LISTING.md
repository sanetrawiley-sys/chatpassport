# Chrome Web Store listing copy

Use these fields as the English (`en`) listing for version 0.1.6.

## Product details

**Name**

ChatPassport — Move Chats Across ChatGPT, Claude & Gemini

**Summary**

Continue chats across ChatGPT, Claude, Gemini, and DeepSeek. Local processing. No account or API key required.

**Category**

Productivity / Tools (select the available matching category in the dashboard)

**Language**

English

**Detailed description**

Hit a chat limit? Continue your conversation in another AI assistant without copying messages one by one.

ChatPassport carries text and code between ChatGPT, Claude, Gemini, and DeepSeek. Choose where to continue, bring the context, and ask your next question. You review the draft and send it yourself.

KEEP YOUR WORK MOVING

• Switch assistants without manually rebuilding the conversation.
• Choose Quick to read currently loaded messages, or Load history to collect older messages by scrolling.
• See which messages fit. If the next question leaves too little room, confirm how many older messages will be omitted before anything is inserted.
• Keep a portable copy as Markdown or ChatPassport JSON. Import saved JSON when you need it.

THREE SIMPLE STEPS

1. Open a supported conversation, choose a destination and click Prepare.
2. Review the captured context and click Continue in your chosen assistant.
3. Type your next question there, click Add context to draft, then review and send. If context needs trimming, confirm the displayed omissions first.

LOCAL PROCESSING, YOUR CONTROL

No ChatPassport account, API key, developer-operated server, analytics or tracking. Processing happens in your browser. One temporary transfer is bound to the destination tab and becomes inaccessible after one hour. Cleanup can be delayed while Chrome is asleep or stopped; expiry is also enforced on access.

ChatPassport never clicks Send. Once you insert a draft, the destination website can read or sync it before you send. Loading older history may trigger the source website's normal requests.

WHAT IS INCLUDED

Text and fenced code blocks. Images, attachments, citations, artifacts and hidden reasoning are not transferred. Quick capture includes only currently rendered messages; history capture is limited to two minutes and cannot guarantee hidden, collapsed or server-side history. Coverage and any uncertainty are shown in the panel.

Drafts have a 48,000-character budget including your next question (up to 8,000 characters). Oversized drafts retain complete recent messages, with explicit approval for omissions. This is not AI summarization; destination models may impose smaller limits. Captured JSON files have a 25 MiB limit.

ChatPassport is not affiliated with OpenAI, Anthropic, Google, or DeepSeek.

## Optional listing URLs

These links work publicly only after the repository is public. If it remains private, replace them with equivalent pages on a public website you control.

- Homepage: `https://github.com/sxwangsxwang1/chatpassport`
- Support: `https://github.com/sxwangsxwang1/chatpassport/issues`
- Privacy policy: `https://sxwangsxwang1.github.io/chatpassport/privacy.html`

## Reviewer test instructions

1. Sign in to a supported AI website and open a conversation with at least two text messages.
2. Open ChatPassport, choose another assistant, and select Quick or Load history.
3. Click Prepare for the chosen assistant. Check the captured count and coverage notice.
4. Click Continue in the chosen assistant. The destination tab shows a context-ready card.
5. Type a question in its normal editor and click Add context to draft.
6. If an omission confirmation appears, verify the editor is unchanged, then click Confirm and add context.
7. Review the inserted draft. Confirm that ChatPassport did not click Send.
8. More options exposes context ranges, JSON/Markdown export and JSON import.

No ChatPassport account, license key, backend or API key is required. Normal accounts for the supported AI websites are required under their own terms.

## Privacy practices fields

**Single purpose**

Allow users to locally capture the visible text of an AI conversation and continue it on another supported AI assistant website under the user's control.

**`scripting` justification**

Used after explicit user actions to extract the visible conversation from the active supported tab and to place a user-reviewed continuation into the supported destination editor. It is not used on unrelated websites.

**`storage` justification**

Used to hold one pending transfer in `chrome.storage.session` while the user moves between supported websites. The transfer becomes inaccessible after one hour and is removed on completion, manual clearing, or destination-tab closure. Cleanup alarms may be delayed while Chrome is asleep or stopped.

**`alarms` justification**

Used to schedule cleanup of expired pending transfers. Expiry is also checked on every access and worker startup. No browsing, tracking, or periodic network activity is performed by the alarm.

**`sidePanel` justification**

Used to show the ChatPassport capture, preview, export, import, and destination-selection interface alongside the active conversation.

**Host permission justification**

Access is limited to the official ChatGPT, Claude, Gemini, and DeepSeek domains. It is required to read a conversation selected by the user and work with the destination message editor. No unrelated domains are requested.

**Remote code**

Select: **No, I am not using remote code.** All executable extension code is included in the uploaded package.

**Data types handled**

Disclose the following because Chrome policy treats locally processed data as handled data:

- Website content
- Personal communications
- User-generated content

Do not select personally identifiable information, health information, financial and payment information, authentication information, location, or web history: ChatPassport does not intentionally read or store those categories. A user may place sensitive information inside a conversation, but the extension treats it only as user-selected conversation content and does not inspect it by category.

**Data-use certifications**

Certify that data is used only for the extension's user-facing single purpose; is not sold; is not used or transferred for advertising, creditworthiness, or unrelated purposes; and is not exposed to human review. These statements must remain consistent with `PRIVACY.md` and the shipped behavior.
