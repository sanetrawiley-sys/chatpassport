import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import { extractConversationFromPage, type PageExtraction } from "../lib/adapters/page";

// Synthetic fixtures modelled on each site's message markup; no personal data.
function assistant(body: string, url = "https://chatgpt.com/c/markdown"): string {
  const dom = new JSDOM(
    `<article data-message-author-role="assistant"><div class="markdown">${body}</div></article>`,
    { url, runScripts: "outside-only" },
  );
  const result = dom.window.eval(`(${extractConversationFromPage.toString()})()`) as PageExtraction;
  dom.window.close();
  return result.messages[0]?.content[0]?.text ?? "";
}

function user(body: string): string {
  const dom = new JSDOM(
    `<article data-message-author-role="user">${body}</article>`,
    { url: "https://chatgpt.com/c/markdown", runScripts: "outside-only" },
  );
  const result = dom.window.eval(`(${extractConversationFromPage.toString()})()`) as PageExtraction;
  dom.window.close();
  return result.messages[0]?.content[0]?.text ?? "";
}

describe("assistant messages become Markdown", () => {
  it("converts tables to GFM tables", () => {
    expect(assistant(
      "<table><thead><tr><th>Name</th><th>Age</th></tr></thead>"
      + "<tbody><tr><td>Ann</td><td>30</td></tr><tr><td>Bob</td><td>41</td></tr></tbody></table>",
    )).toBe("| Name | Age |\n| --- | --- |\n| Ann | 30 |\n| Bob | 41 |");
  });

  it("escapes pipes, keeps cell line breaks and pads colspan and short rows", () => {
    expect(assistant(
      "<table><tr><th>Expr</th><th>Note</th><th>Extra</th></tr>"
      + "<tr><td><code>a | b</code></td><td><p>one</p><p>two</p></td></tr>"
      + '<tr><td colspan="2">wide</td><td>x</td></tr></table>',
    )).toBe("| Expr | Note | Extra |\n| --- | --- | --- |\n| `a \\| b` | one<br>two | |\n| wide | | x |");
  });

  it("reads KaTeX from its TeX annotation without duplicating the rendered copy", () => {
    const katex = (tex: string, visible: string) => '<span class="katex"><span class="katex-mathml"><math><semantics><mrow>'
      + `<mi>${visible}</mi></mrow><annotation encoding="application/x-tex">${tex}</annotation></semantics></math></span>`
      + `<span class="katex-html" aria-hidden="true">${visible}</span></span>`;
    expect(assistant(`<p>Energy ${katex("E=mc^2", "E=mc2")} holds.</p>`)).toBe("Energy $E=mc^2$ holds.");
    expect(assistant(`<p>Sum:</p><span class="katex-display">${katex("\\sum_{i=1}^{n} i", "∑i")}</span>`))
      .toBe("Sum:\n\n$$\n\\sum_{i=1}^{n} i\n$$");
  });

  it("falls back to the visible text once when math has no TeX source", () => {
    expect(assistant('<p>Value <span class="katex"><span class="katex-mathml"><math><mi>x</mi></math></span>'
      + '<span class="katex-html" aria-hidden="true">x</span></span> only.</p>')).toBe("Value x only.");
  });

  it("keeps list markers, numbering and nesting", () => {
    expect(assistant(
      '<ol start="3"><li>Third</li><li>Fourth<ul><li>Nested</li></ul></li></ol><ul><li>Apple</li></ul>',
    )).toBe("3. Third\n4. Fourth\n   - Nested\n\n- Apple");
  });

  it("keeps fenced code blocks inside list items", () => {
    expect(assistant('<ul><li>Item<pre><code>const x = 1;\n  next();</code></pre></li></ul>'))
      .toBe('- Item\n  ```\n  const x = 1;\n    next();\n  ```');
  });

  it("keeps separate paragraphs inside list items", () => {
    expect(assistant('<ul><li><p>First paragraph</p><p>Second paragraph</p></li></ul>'))
      .toBe('- First paragraph\n\n  Second paragraph');
  });

  it("quotes every line of nested code and lists", () => {
    expect(assistant('<blockquote><pre><code>line one\n  line two</code></pre>'
      + '<ul><li>First</li><li>Second</li></ul></blockquote>'))
      .toBe('> ```\n> line one\n>   line two\n> ```\n>\n> - First\n> - Second');
  });

  it("escapes literal Markdown punctuation in prose", () => {
    expect(assistant('<p>*literal asterisks* and [brackets] plus &lt;message&gt;</p>'))
      .toBe('\\*literal asterisks\\* and \\[brackets\\] plus \\<message\\>');
    expect(assistant('<p>1. literal item</p><p>- literal dash</p>'))
      .toBe('1\\. literal item\n\n\\- literal dash');
  });

  it("renders task list checkboxes", () => {
    expect(assistant('<ul><li><input type="checkbox" checked disabled> Done</li><li><input type="checkbox" disabled> Todo</li></ul>'))
      .toBe("- [x] Done\n- [ ] Todo");
  });

  it("keeps link targets and resolves relative URLs", () => {
    expect(assistant('<p>See <a href="https://example.com/doc">the docs</a> and <a href="/c/other">this chat</a>.</p>'))
      .toBe("See [the docs](https://example.com/doc) and [this chat](https://chatgpt.com/c/other).");
    expect(assistant('<p><a href="https://example.com/a(b)">https://example.com/a(b)</a></p>'))
      .toBe("<https://example.com/a%28b%29>");
    expect(assistant('<p><a href="javascript:void(0)">Click</a> <a href="#note">Note</a></p>')).toBe("Click Note");
  });

  it("keeps headings, emphasis, quotes and rules", () => {
    expect(assistant(
      "<h2>Setup</h2><p>Use <strong>pnpm</strong>, <em>not</em> <del>npm</del>.</p>"
      + "<blockquote><p>Quoted</p><p>Second</p></blockquote><hr><p>End</p>",
    )).toBe("## Setup\n\nUse **pnpm**, *not* ~~npm~~.\n\n> Quoted\n>\n> Second\n\n---\n\nEnd");
  });

  it("wraps inline code with a fence longer than its backticks", () => {
    expect(assistant("<p>Run <code>pnpm i</code> then <code>`tick`</code>.</p>"))
      .toBe("Run `pnpm i` then `` `tick` ``.");
  });

  it("reads code from <code> and its language class, ignoring header labels and controls", () => {
    expect(assistant(
      '<pre><div class="header"><span>python</span><button>Copy</button></div>'
      + '<code class="language-python">def f():\n    return 1</code></pre>',
    )).toBe("```python\ndef f():\n    return 1\n```");
  });

  it("keeps whitespace inside code blocks while collapsing prose whitespace", () => {
    expect(assistant("<p>Some    spaced\n   text</p><pre><code>a  b\n\n\n  c</code></pre>"))
      .toBe("Some spaced text\n\n```\na  b\n\n\n  c\n```");
  });

  it("replaces images with a description placeholder and skips decorative ones", () => {
    expect(assistant('<p>Chart: <img src="https://example.com/c.png" alt="Revenue by month"></p>'
      + '<p><img src="https://example.com/x.png"><img src="https://example.com/icon.png" alt=""></p>'))
      .toBe("Chart: [image: Revenue by month]\n\n[image]");
  });

  it("works with Claude and Gemini message bodies", () => {
    const claude = new JSDOM(
      '<div class="font-claude-response"><h3>Plan</h3><ol><li>One</li></ol>'
      + '<pre class="code-block__code"><code class="language-ts">const x = 1;</code></pre></div>',
      { url: "https://claude.ai/chat/md", runScripts: "outside-only" },
    );
    const claudeResult = claude.window.eval(`(${extractConversationFromPage.toString()})()`) as PageExtraction;
    expect(claudeResult.messages[0]?.content[0]?.text).toBe("### Plan\n\n1. One\n\n```ts\nconst x = 1;\n```");

    const gemini = new JSDOM(
      "<model-response><p>Table:</p><table><tr><td>a</td><td>b</td></tr></table></model-response>",
      { url: "https://gemini.google.com/app/md", runScripts: "outside-only" },
    );
    const geminiResult = gemini.window.eval(`(${extractConversationFromPage.toString()})()`) as PageExtraction;
    expect(geminiResult.messages[0]?.content[0]?.text).toBe("Table:\n\n| a | b |\n| --- | --- |");
  });
});

describe("user messages keep their typed text", () => {
  it("preserves spacing and line breaks without adding Markdown markup", () => {
    expect(user('<div class="whitespace-pre-wrap">line one\n    indented  twice\n\nlast <strong>bold</strong></div>'))
      .toBe("line one\n    indented  twice\n\nlast bold");
  });

  it("puts one line break between per-line paragraphs", () => {
    expect(user("<div><p>first</p><p>second</p></div>")).toBe("first\nsecond");
  });

  it("still marks images", () => {
    expect(user('<div data-user-message-bubble="true"><img alt="Uploaded image" src="https://example.com/u.png">'
      + '<div class="whitespace-pre-wrap">What is this?</div></div>'))
      .toBe("[image: Uploaded image]\nWhat is this?");
  });
});
