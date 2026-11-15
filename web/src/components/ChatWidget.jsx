import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { askAI, AI_ENABLED } from '../ai/provider';
import { SITE, WHATSAPP_DEFAULT } from '../data/site';
import { Icon } from './Icons';

const GREETING = {
  role: 'assistant',
  content:
    'Hi — I can help with services, quotes and whether we cover your area. For urgent jobs, WhatsApp the team directly.',
};

const SUGGESTIONS = [
  'How do I get a quote?',
  'Do you cover Centurion?',
  'Geyser burst — can you help?',
  'What areas do you work in?',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    const next = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const history = next
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-10);
      const reply = await askAI(history);
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            'I am having trouble responding right now — the team is still one tap away on WhatsApp: ' +
            SITE.phoneDisplay +
            '.',
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        className={`chat-fab ${open ? 'active' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close assistant' : 'Ask a question'}
        aria-expanded={open}
      >
        <Icon name={open ? 'close' : 'chat'} />
        {!open && <span className="chat-fab-label">Ask us</span>}
      </button>

      {open && (
        <section className="chat-panel" aria-label="Website assistant">
          <header className="chat-head">
            <div>
              <strong>Coastal Heritage assistant</strong>
              <span className="chat-status">
                <i /> {AI_ENABLED ? 'AI-assisted answers' : 'Quick answers'} — replies are general info, not quotes
              </span>
            </div>
            <button
              className="chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
            >
              <Icon name="close" />
            </button>
          </header>

          <div className="chat-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.content}
              </div>
            ))}
            {busy && (
              <div className="chat-msg assistant typing" aria-label="Assistant is typing">
                <span /><span /><span />
              </div>
            )}
            {messages.length === 1 && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, areas, quotes…"
              aria-label="Message the assistant"
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send message">
              <Icon name="send" />
            </button>
          </form>

          <footer className="chat-foot">
            <a href={WHATSAPP_DEFAULT} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" /> Talk to a person on WhatsApp
            </a>
            <Link to="/contact" onClick={() => setOpen(false)}>
              Enquiry form
            </Link>
          </footer>
        </section>
      )}
    </>
  );
}
