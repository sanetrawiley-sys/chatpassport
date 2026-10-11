// Local demonstration only. This module is aliased solely by preview-store.mjs,
// and is never an extension entrypoint. No real conversations or accounts are used.
import { planContinuation } from '../../../lib/relay';
export const passport = {
  format: 'chatpassport', version: '1.0', id: 'demo', title: 'Python CLI · keep dependencies minimal',
  source: { provider: 'chatgpt', url: 'https://chatgpt.com/c/demo', exportedAt: '2026-10-11T00:00:00.000Z' },
  messages: [
    { id: '1', role: 'user', content: [{ type: 'text', text: 'Build a small Python 3.10 command-line tool. Use the standard library only.' }] },
    { id: '2', role: 'assistant', content: [{ type: 'text', text: 'Use argparse for flags and pathlib for file handling. Keep the validation in a separate function.' }] },
    { id: '3', role: 'user', content: [{ type: 'text', text: 'Handle a missing input file with a helpful error and exit code 2.' }] },
    { id: '4', role: 'assistant', content: [{ type: 'text', text: 'Catch FileNotFoundError and return 2.\n```python\ntry:\n    data = path.read_text()\nexcept FileNotFoundError:\n    return 2\n```' }] },
  ],
  capture: { method: 'loaded', status: 'partial', reason: 'Only currently loaded messages were read. Older or virtualized messages may be missing. Choose Load history to collect more.' },
};
const ready = { status: 'ready', transferId: '00000000-0000-4000-8000-000000000001', title: passport.title, source: 'chatgpt', target: 'claude', messageCount: 4 };
const listeners = { addListener() {}, removeListener() {} };
let pending = null;
export const browser = {
  tabs: {
    query: async () => [{ id: 1, url: passport.source.url }],
    onActivated: listeners, onUpdated: listeners,
  },
  storage: { onChanged: listeners },
  scripting: { executeScript: async ({ args }) => [{ result: args
    ? { top: 0, height: 600, viewport: 600, boundary: true }
    : { provider: 'chatgpt', title: passport.title, url: passport.source.url, messages: passport.messages } }] },
  runtime: { sendMessage: async (message) => {
    if (message.type === 'chatpassport:get-pending-relay') return ready;
    if (message.type === 'chatpassport:compose-pending-relay') {
      const result = planContinuation(passport, message.currentRequest);
      return { ...result, transferId: ready.transferId };
    }
    if (message.type === 'chatpassport:complete-pending-relay') return true;
    if (message.action === 'save') pending = { passport: message.passport, target: message.target, transferId: ready.transferId, targetTabId: 2, savedAt: Date.now() };
    if (message.action === 'clear') pending = null;
    return { ok: true, pending };
  } },
};
