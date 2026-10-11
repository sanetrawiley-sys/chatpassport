import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../../../entrypoints/sidepanel/App';
import '../../../entrypoints/sidepanel/style.css';
import './showcase.css';

const shot = new URLSearchParams(location.search).get('shot') || 'capture';
const content = {
  capture: ['01 / CHOOSE YOUR NEXT ASSISTANT', 'New assistant.\nSame conversation.', 'Move text and code across ChatGPT, Claude, Gemini, and DeepSeek.', 'Choose your destination', 'Quick capture or loaded history'],
  standby: ['02 / ASK WHAT COMES NEXT', 'Keep the context.\nAsk the next question.', 'Your selected conversation waits while you decide what to ask next.', 'Write in the destination editor', 'Add context when you are ready'],
  review: ['03 / REVIEW, THEN SEND', 'Your draft.\nYour decision.', 'Bring your context and next question together. You choose when to send.', 'Draft insertion is verified', 'Review before you send'],
}[shot] || [];
createRoot(document.getElementById('showcase')).render(<main className={'showcase ' + shot}>
  <section className="pitch">
    <div className="wordmark"><span>CP</span> ChatPassport</div>
    <div className="pitch-body"><div className="kicker">{content[0]}</div><h1>{content[1]}</h1><p>{content[2]}</p>
      <div className="benefits"><div>✓ {content[3]}</div><div>✓ {content[4]}</div></div>
    </div>
    <div className="trust">LOCAL PROCESSING <span>·</span> NO ACCOUNT <span>·</span> NO API KEY</div>
  </section>
  <section className="product-frame">
    <div className="frame-title">{shot === 'capture' ? 'ChatPassport · Side panel' : 'Destination editor · Demonstration'}</div>
    <div id="product" className={shot === 'capture' ? 'panel-product' : 'relay-product'}>
      {shot === 'capture' ? <App /> : <>
        <div className="destination-title">Continue in Claude</div>
        <div className="destination-subtitle">New conversation · sample context from ChatGPT</div>
        <label className="composer-label" htmlFor="prompt-textarea">Your next question</label>
        <textarea id="prompt-textarea" defaultValue="Add tests for the missing-file case, keeping the Python 3.10 and standard-library constraints." />
        <button className="demo-send" type="button">Send manually ↑</button>
        <p className="editor-note">An inserted draft can be read or synced by the destination website before Send.</p>
      </>}
    </div>
    <div className="demo-label">Actual ChatPassport components · demonstration data</div>
  </section>
</main>);
if (shot !== 'capture') {
  // Mount the shipped relay against the sample editor, using preview-only browser APIs.
  globalThis.defineContentScript = (configuration) => configuration;
  // Expose preview shadow content to accessibility inspection, as in DOM tests.
  const attachShadow = Element.prototype.attachShadow;
  Element.prototype.attachShadow = function (init) { return attachShadow.call(this, { ...init, mode: 'open' }); };
  const script = await import('../../../entrypoints/relay.content');
  const observer = new MutationObserver(() => {
    const host = document.getElementById('chatpassport-relay-status');
    const product = document.getElementById('product');
    if (host && product) {
      product.prepend(host);
      Object.assign(host.style, { position: 'relative', right: 'auto', bottom: 'auto', marginBottom: '26px', zIndex: '1' });
      observer.disconnect();
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  script.default.main();
}
