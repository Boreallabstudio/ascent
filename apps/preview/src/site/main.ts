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
const buttons = document.querySelectorAll<HTMLButtonElement>('.site-lang button');
buttons.forEach((button) =>
  button.addEventListener('click', () => {
    i18n.setAttribute('lang', button.dataset.lang!);
    buttons.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
  })
);
