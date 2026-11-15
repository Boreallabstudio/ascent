import '@videojs/html/i18n';
import './site.css';
import { createPlayer } from '../frame/player';

// The showcase page: one player, as wide as the first screen allows, with the skin's own 16:9 frame.
const i18n = document.createElement('media-i18n');
i18n.append(createPlayer());
document.getElementById('player')!.append(i18n);

// The "Press Launch" cue fades once the film has started.
document.querySelector('mux-video')?.addEventListener('play', () => document.body.setAttribute('data-launched', ''), { once: true });

// The player's language: English, French or Spanish. Video.js translates its own controls; the skin brings its words.
// `?lang=fr` opens the page in that language, and a choice is remembered for the next visit.
const CUE: Record<string, string> = { en: 'Press Launch', fr: 'Appuyez sur Lancer', es: 'Pulsa Lanzar' };
const buttons = document.querySelectorAll<HTMLButtonElement>('.site-lang button');
const cue = document.querySelector('.site-cue span');

function setLanguage(lang: string, remember: boolean) {
  if (!(lang in CUE)) return;
  i18n.setAttribute('lang', lang);
  if (cue) cue.textContent = CUE[lang];
  buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
  if (!remember) return;
  try {
    localStorage.setItem('ascent-lang', lang);
  } catch {
    // Storage can be blocked; the choice then lasts for this visit only.
  }
}

let saved: string | null = null;
try {
  saved = localStorage.getItem('ascent-lang');
} catch {
  saved = null;
}
setLanguage(new URLSearchParams(location.search).get('lang') ?? saved ?? 'en', false);
buttons.forEach((button) =>
  button.addEventListener('click', () => {
    setLanguage(button.dataset.lang!, true);
    // Keep the address in step, so a reload or a shared link opens in the language chosen.
    const url = new URL(location.href);
    url.searchParams.set('lang', button.dataset.lang!);
    history.replaceState(history.state, '', url);
  })
);
