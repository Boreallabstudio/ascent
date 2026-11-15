import { I18nController, i18nContext, registerI18n, type ReactiveControllerHost } from '@videojs/html';
// Registering a language takes the place of Video.js's lazy pack for it, so its own French and Spanish come in first.
import '@videojs/html/i18n/locales/fr/register';
import '@videojs/html/i18n/locales/es/register';

/**
 * Ascent's own words, in English, French and Spanish. Video.js translates its controls' names itself; these are the
 * skin's labels, readouts and spoken names. Each is registered with Video.js under `ascent.<key>`, so the nearest
 * `<media-i18n lang="…">` (or the page's `lang`) picks the language, and any other language falls back to English.
 */
const EN = {
  // Console desk module headers.
  'mod.flight': 'Flight',
  'mod.propulsion': 'Propulsion',
  'mod.comms': 'Comms',
  'mod.screen': 'Screen',
  'mod.next': 'Next event',
  // The word on the play key, and its spoken name (which contains the word, so voice control can say it).
  'play.launch': 'Launch',
  'play.hold': 'Hold',
  'play.resume': 'Resume',
  'play.relaunch': 'Relaunch',
  'play.launch.name': 'Launch (play)',
  'play.hold.name': 'Hold (pause)',
  'play.resume.name': 'Resume (play)',
  'play.relaunch.name': 'Relaunch (play again)',
  // Tooltips.
  'tip.play': 'Play or pause',
  'tip.again': 'Play again',
  'tip.volume': 'Volume: turn or scroll',
  'tip.speed': 'Speed: turn or scroll',
  'tip.captions': 'Captions',
  'tip.pip': 'Picture in picture',
  'tip.full': 'Full screen',
  'tip.keys': 'Keys',
  'tip.next': 'Skip to it',
  // Dials.
  'dial.vol': 'Vol',
  'dial.rate': 'Rate',
  'speed.name': 'Playback speed',
  'speed.value': '{rate} times normal speed',
  'speed.normal': 'Normal speed',
  // Readouts over the film.
  'now.event': 'Event {n} of {total}',
  'now.complete': 'Flight complete',
  'now.orbit': 'Parking orbit',
  'event.name': 'Jump to event {n}, {name}, at {time}',
  'feed.cam': 'Track cam',
  'hold.line': 'Hold · buffering',
  'error.kicker': 'Signal lost',
  // Next event module and the mission clock.
  'next.end': 'End of film',
  'next.name': 'Skip to the next event, {name}',
  'next.none': 'No next event',
  'clock.elapsed': 'T+ elapsed',
  'clock.remaining': 'T− remaining',
  'clock.of': 'of {total}',
  'clock.next': 'Next T− {time}',
  'clock.end': 'End T− {time}',
  'clock.elapsed.name': 'Elapsed time. Switch to time remaining',
  'clock.remaining.name': 'Time remaining. Switch to elapsed time',
  // Go / no-go board.
  'board.downlink': 'Downlink',
  'board.audio': 'Audio',
  'board.captions': 'Captions',
  'board.flight': 'Flight',
  'board.go': 'Go',
  'board.hold': 'Hold',
  'board.off': 'Off',
  'board.captions.off': 'Off',
  'board.lost': 'Lost',
  'board.locked': 'Locked',
  'board.ready': 'Ready',
  'board.complete': 'Complete',
  // Flight manual.
  'manual.kicker': 'Flight manual',
  'manual.title': 'Keyboard',
  'manual.close': 'Close',
  'manual.name': 'Keyboard shortcuts',
  'key.space': 'Space',
  'key.pgup': 'PgUp',
  'key.pgdn': 'PgDn',
  'key.home': 'Home',
  'key.end': 'End',
  'key.esc': 'Esc',
  'manual.play': 'Launch or hold',
  'manual.seek': 'Back / forward 5 s',
  'manual.jump': 'Jump 10%',
  'manual.ends': 'Start or end',
  'manual.event': 'Fly to event',
  'manual.next': 'Next event',
  'manual.volume': 'Volume',
  'manual.mute': 'Mute',
  'manual.speed': 'Speed',
  'manual.captions': 'Captions',
  'manual.full': 'Full screen',
  'manual.pip': 'Picture in picture',
  'manual.card': 'This card',
} as const;

export type WordKey = keyof typeof EN;
type WordMap = { readonly [K in WordKey]: string };

const FR: WordMap = {
  'mod.flight': 'Vol',
  'mod.propulsion': 'Propulsion',
  'mod.comms': 'Radio',
  'mod.screen': 'Écran',
  'mod.next': 'À suivre',
  'play.launch': 'Lancer',
  'play.hold': 'Suspendre',
  'play.resume': 'Reprendre',
  'play.relaunch': 'Relancer',
  'play.launch.name': 'Lancer (lecture)',
  'play.hold.name': 'Suspendre (pause)',
  'play.resume.name': 'Reprendre (lecture)',
  'play.relaunch.name': 'Relancer (revoir)',
  'tip.play': 'Lecture ou pause',
  'tip.again': 'Revoir',
  'tip.volume': 'Volume : tourner ou faire défiler',
  'tip.speed': 'Vitesse : tourner ou faire défiler',
  'tip.captions': 'Sous-titres',
  'tip.pip': 'Image dans l’image',
  'tip.full': 'Plein écran',
  'tip.keys': 'Touches',
  'tip.next': 'Y aller',
  'dial.vol': 'Son',
  'dial.rate': 'Vit.',
  'speed.name': 'Vitesse de lecture',
  'speed.value': '{rate} fois la vitesse normale',
  'speed.normal': 'Vitesse normale',
  'now.event': 'Étape {n} sur {total}',
  'now.complete': 'Vol terminé',
  'now.orbit': 'Orbite d’attente',
  'event.name': 'Aller à l’étape {n}, {name}, à {time}',
  'feed.cam': 'Caméra',
  'hold.line': 'Attente · chargement',
  'error.kicker': 'Signal perdu',
  'next.end': 'Fin du film',
  'next.name': 'Passer à l’étape suivante, {name}',
  'next.none': 'Aucune étape suivante',
  'clock.elapsed': 'T+ écoulé',
  'clock.remaining': 'T− restant',
  'clock.of': 'sur {total}',
  'clock.next': 'Suiv. T− {time}',
  'clock.end': 'Fin T− {time}',
  'clock.elapsed.name': 'Temps écoulé. Afficher le temps restant',
  'clock.remaining.name': 'Temps restant. Afficher le temps écoulé',
  'board.downlink': 'Liaison',
  'board.audio': 'Audio',
  'board.captions': 'Sous-titres',
  'board.flight': 'Vol',
  'board.go': 'Go',
  'board.hold': 'Attente',
  'board.off': 'Arrêt',
  'board.captions.off': 'Arrêt',
  'board.lost': 'Perdue',
  'board.locked': 'Verrouillée',
  'board.ready': 'Prêt',
  'board.complete': 'Terminé',
  'manual.kicker': 'Manuel de vol',
  'manual.title': 'Clavier',
  'manual.close': 'Fermer',
  'manual.name': 'Raccourcis clavier',
  'key.space': 'Espace',
  'key.pgup': 'Pg préc',
  'key.pgdn': 'Pg suiv',
  'key.home': 'Début',
  'key.end': 'Fin',
  'key.esc': 'Échap',
  'manual.play': 'Lancer ou suspendre',
  'manual.seek': 'Reculer / avancer de 5 s',
  'manual.jump': 'Sauter de 10 %',
  'manual.ends': 'Début ou fin',
  'manual.event': 'Aller à une étape',
  'manual.next': 'Étape suivante',
  'manual.volume': 'Volume',
  'manual.mute': 'Couper le son',
  'manual.speed': 'Vitesse',
  'manual.captions': 'Sous-titres',
  'manual.full': 'Plein écran',
  'manual.pip': 'Image dans l’image',
  'manual.card': 'Cette fiche',
};

const ES: WordMap = {
  'mod.flight': 'Vuelo',
  'mod.propulsion': 'Propulsión',
  'mod.comms': 'Radio',
  'mod.screen': 'Pantalla',
  'mod.next': 'Siguiente',
  'play.launch': 'Lanzar',
  'play.hold': 'Suspender',
  'play.resume': 'Reanudar',
  'play.relaunch': 'Relanzar',
  'play.launch.name': 'Lanzar (reproducir)',
  'play.hold.name': 'Suspender (pausa)',
  'play.resume.name': 'Reanudar (reproducir)',
  'play.relaunch.name': 'Relanzar (volver a ver)',
  'tip.play': 'Reproducir o pausar',
  'tip.again': 'Volver a ver',
  'tip.volume': 'Volumen: girar o desplazar',
  'tip.speed': 'Velocidad: girar o desplazar',
  'tip.captions': 'Subtítulos',
  'tip.pip': 'Imagen en imagen',
  'tip.full': 'Pantalla completa',
  'tip.keys': 'Teclas',
  'tip.next': 'Ir allí',
  'dial.vol': 'Vol',
  'dial.rate': 'Vel.',
  'speed.name': 'Velocidad de reproducción',
  'speed.value': '{rate} veces la velocidad normal',
  'speed.normal': 'Velocidad normal',
  'now.event': 'Evento {n} de {total}',
  'now.complete': 'Vuelo completado',
  'now.orbit': 'Órbita de espera',
  'event.name': 'Ir al evento {n}, {name}, a los {time}',
  'feed.cam': 'Cámara',
  'hold.line': 'Espera · cargando',
  'error.kicker': 'Señal perdida',
  'next.end': 'Fin',
  'next.name': 'Saltar al siguiente evento, {name}',
  'next.none': 'No hay más eventos',
  'clock.elapsed': 'T+ en vuelo',
  'clock.remaining': 'T− restante',
  'clock.of': 'de {total}',
  'clock.next': 'Sig. T− {time}',
  'clock.end': 'Fin T− {time}',
  'clock.elapsed.name': 'Tiempo transcurrido. Mostrar el tiempo restante',
  'clock.remaining.name': 'Tiempo restante. Mostrar el tiempo transcurrido',
  'board.downlink': 'Enlace',
  'board.audio': 'Audio',
  'board.captions': 'Subtítulos',
  'board.flight': 'Vuelo',
  'board.go': 'Go',
  'board.hold': 'Espera',
  'board.off': 'Apagado',
  'board.captions.off': 'Apagados',
  'board.lost': 'Perdido',
  'board.locked': 'Fijado',
  'board.ready': 'Listo',
  'board.complete': 'Completado',
  'manual.kicker': 'Manual de vuelo',
  'manual.title': 'Teclado',
  'manual.close': 'Cerrar',
  'manual.name': 'Atajos de teclado',
  'key.space': 'Espacio',
  'key.pgup': 'Re Pág',
  'key.pgdn': 'Av Pág',
  'key.home': 'Inicio',
  'key.end': 'Fin',
  'key.esc': 'Esc',
  'manual.play': 'Lanzar o suspender',
  'manual.seek': 'Atrás / adelante 5 s',
  'manual.jump': 'Saltar un 10 %',
  'manual.ends': 'Inicio o final',
  'manual.event': 'Ir a un evento',
  'manual.next': 'Siguiente evento',
  'manual.volume': 'Volumen',
  'manual.mute': 'Silenciar',
  'manual.speed': 'Velocidad',
  'manual.captions': 'Subtítulos',
  'manual.full': 'Pantalla completa',
  'manual.pip': 'Imagen en imagen',
  'manual.card': 'Esta ayuda',
};

const prefixed = (words: WordMap) => Object.fromEntries(Object.entries(words).map(([k, v]) => [`ascent.${k}`, v]));
registerI18n('fr', prefixed(FR));
registerI18n('es', prefixed(ES));

type Params = Record<string, string | number>;

/**
 * Ascent's words for one element: `say(key, params)` in the element's language. The element re-renders when the
 * language changes. `locale` is the resolved tag, for numbers and units.
 */
export class Words {
  #i18n: I18nController;

  constructor(host: ReactiveControllerHost & HTMLElement) {
    this.#i18n = new I18nController(host as never, i18nContext);
  }

  get locale(): string {
    return this.#i18n.locale || 'en';
  }

  say(key: WordKey, params?: Params): string {
    const translate = this.#i18n.value as unknown as (input: { key: string; text: string }, params?: Params) => string;
    return translate({ key: `ascent.${key}`, text: EN[key] }, params);
  }

  /** A length of time read aloud, in the element's language: "1 minute 4 seconds", "4 secondes". */
  spoken(seconds: number): string {
    const s = Math.max(0, Math.round(seconds));
    const m = Math.floor(s / 60);
    const r = s % 60;
    const unit = (value: number, name: 'minute' | 'second') =>
      new Intl.NumberFormat(this.locale, { style: 'unit', unit: name, unitDisplay: 'long' }).format(value);
    return m ? `${unit(m, 'minute')} ${unit(r, 'second')}` : unit(r, 'second');
  }

  /** A number in the element's language: 1.5 in English, 1,5 in French. */
  number(value: number): string {
    return new Intl.NumberFormat(this.locale, { maximumFractionDigits: 2 }).format(value);
  }
}
