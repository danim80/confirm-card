/**
 * Confirm Card — a Lovelace card that asks before it acts.
 *
 * Wraps a dropdown or a toggle in a confirmation dialog, so the service call
 * only happens after the user says yes. No build step: plain custom elements,
 * styled with Home Assistant's own theme variables.
 *
 * https://github.com/YOUR_USERNAME/confirm-card
 * MIT licensed.
 */

const CARD_VERSION = "1.0.0";

console.info(
  `%c CONFIRM-CARD %c v${CARD_VERSION} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);

/* -------------------------------------------------------------------------- */
/* Translations                                                               */
/* -------------------------------------------------------------------------- */

const TRANSLATIONS = {
  en: {
    title: "Are you sure?",
    change: 'Change {name} from "{from}" to "{to}"?',
    turn_on: "Turn on {name}?",
    turn_off: "Turn off {name}?",
    ok: "Yes",
    cancel: "No",
  },
  ro: {
    title: "Ești sigur?",
    change: "Schimbi {name} din „{from}” în „{to}”?",
    turn_on: "Pornești {name}?",
    turn_off: "Oprești {name}?",
    ok: "Da",
    cancel: "Nu",
  },
  de: {
    title: "Sind Sie sicher?",
    change: "{name} von „{from}“ auf „{to}“ ändern?",
    turn_on: "{name} einschalten?",
    turn_off: "{name} ausschalten?",
    ok: "Ja",
    cancel: "Nein",
  },
  fr: {
    title: "Êtes-vous sûr ?",
    change: "Changer {name} de « {from} » à « {to} » ?",
    turn_on: "Allumer {name} ?",
    turn_off: "Éteindre {name} ?",
    ok: "Oui",
    cancel: "Non",
  },
  es: {
    title: "¿Estás seguro?",
    change: "¿Cambiar {name} de «{from}» a «{to}»?",
    turn_on: "¿Encender {name}?",
    turn_off: "¿Apagar {name}?",
    ok: "Sí",
    cancel: "No",
  },
  it: {
    title: "Sei sicuro?",
    change: "Cambiare {name} da «{from}» a «{to}»?",
    turn_on: "Accendere {name}?",
    turn_off: "Spegnere {name}?",
    ok: "Sì",
    cancel: "No",
  },
  nl: {
    title: "Weet je het zeker?",
    change: '{name} wijzigen van "{from}" naar "{to}"?',
    turn_on: "{name} inschakelen?",
    turn_off: "{name} uitschakelen?",
    ok: "Ja",
    cancel: "Nee",
  },
  pt: {
    title: "Tem a certeza?",
    change: 'Alterar {name} de "{from}" para "{to}"?',
    turn_on: "Ligar {name}?",
    turn_off: "Desligar {name}?",
    ok: "Sim",
    cancel: "Não",
  },
  pl: {
    title: "Czy na pewno?",
    change: "Zmienić {name} z „{from}” na „{to}”?",
    turn_on: "Włączyć {name}?",
    turn_off: "Wyłączyć {name}?",
    ok: "Tak",
    cancel: "Nie",
  },
  cs: {
    title: "Jste si jisti?",
    change: "Změnit {name} z „{from}“ na „{to}“?",
    turn_on: "Zapnout {name}?",
    turn_off: "Vypnout {name}?",
    ok: "Ano",
    cancel: "Ne",
  },
  sk: {
    title: "Ste si istí?",
    change: "Zmeniť {name} z „{from}“ na „{to}“?",
    turn_on: "Zapnúť {name}?",
    turn_off: "Vypnúť {name}?",
    ok: "Áno",
    cancel: "Nie",
  },
  hu: {
    title: "Biztos benne?",
    change: "{name} módosítása erről: „{from}” erre: „{to}”?",
    turn_on: "{name} bekapcsolása?",
    turn_off: "{name} kikapcsolása?",
    ok: "Igen",
    cancel: "Nem",
  },
  ru: {
    title: "Вы уверены?",
    change: "Изменить {name} с «{from}» на «{to}»?",
    turn_on: "Включить {name}?",
    turn_off: "Выключить {name}?",
    ok: "Да",
    cancel: "Нет",
  },
  uk: {
    title: "Ви впевнені?",
    change: "Змінити {name} з «{from}» на «{to}»?",
    turn_on: "Увімкнути {name}?",
    turn_off: "Вимкнути {name}?",
    ok: "Так",
    cancel: "Ні",
  },
  sv: {
    title: "Är du säker?",
    change: "Ändra {name} från ”{from}” till ”{to}”?",
    turn_on: "Slå på {name}?",
    turn_off: "Stänga av {name}?",
    ok: "Ja",
    cancel: "Nej",
  },
  da: {
    title: "Er du sikker?",
    change: 'Ændr {name} fra "{from}" til "{to}"?',
    turn_on: "Tænd {name}?",
    turn_off: "Sluk {name}?",
    ok: "Ja",
    cancel: "Nej",
  },
  nb: {
    title: "Er du sikker?",
    change: "Endre {name} fra «{from}» til «{to}»?",
    turn_on: "Slå på {name}?",
    turn_off: "Slå av {name}?",
    ok: "Ja",
    cancel: "Nei",
  },
  fi: {
    title: "Oletko varma?",
    change: "Muutetaanko {name} arvosta ”{from}” arvoon ”{to}”?",
    turn_on: "Kytketäänkö {name} päälle?",
    turn_off: "Kytketäänkö {name} pois päältä?",
    ok: "Kyllä",
    cancel: "Ei",
  },
  tr: {
    title: "Emin misiniz?",
    change: '{name} "{from}" değerinden "{to}" değerine değiştirilsin mi?',
    turn_on: "{name} açılsın mı?",
    turn_off: "{name} kapatılsın mı?",
    ok: "Evet",
    cancel: "Hayır",
  },
  el: {
    title: "Είστε σίγουροι;",
    change: "Αλλαγή {name} από «{from}» σε «{to}»;",
    turn_on: "Ενεργοποίηση {name};",
    turn_off: "Απενεργοποίηση {name};",
    ok: "Ναι",
    cancel: "Όχι",
  },
  ca: {
    title: "N'estàs segur?",
    change: "Canviar {name} de «{from}» a «{to}»?",
    turn_on: "Encendre {name}?",
    turn_off: "Apagar {name}?",
    ok: "Sí",
    cancel: "No",
  },
  "zh-hans": {
    title: "确定吗？",
    change: "将 {name} 从“{from}”更改为“{to}”？",
    turn_on: "打开 {name}？",
    turn_off: "关闭 {name}？",
    ok: "是",
    cancel: "否",
  },
};

/** Look up a string for a language, falling back to the base language, then English. */
function localize(language, key) {
  const lang = String(language || "en").toLowerCase();
  const base = lang.split("-")[0];
  const pack = TRANSLATIONS[lang] || TRANSLATIONS[base] || TRANSLATIONS.en;
  return pack[key] || TRANSLATIONS.en[key];
}

/** Replace {placeholders} in a string with values. Unknown keys are left alone. */
function fillTemplate(template, values) {
  return String(template).replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match
  );
}

/* -------------------------------------------------------------------------- */
/* Confirmation dialog                                                        */
/* -------------------------------------------------------------------------- */

const DIALOG_STYLES = `
  :host { all: initial; }
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.45);
    font-family: var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif);
  }
  .dialog {
    width: 100%;
    max-width: 380px;
    box-sizing: border-box;
    padding: 24px;
    border-radius: var(--ha-card-border-radius, 12px);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #212121);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.32);
    animation: appear 120ms ease-out;
  }
  @keyframes appear {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .dialog { animation: none; }
  }
  .title {
    margin: 0 0 8px;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.3;
  }
  .message {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--secondary-text-color, #727272);
    overflow-wrap: anywhere;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 24px;
  }
  button {
    font: inherit;
    font-weight: 500;
    padding: 10px 16px;
    min-width: 72px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: transparent;
    color: var(--primary-color, #03a9f4);
  }
  button:hover { background: rgba(127, 127, 127, 0.12); }
  button:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }
  button.confirm {
    background: var(--primary-color, #03a9f4);
    color: var(--text-primary-color, #fff);
  }
  button.confirm:hover { filter: brightness(1.1); }
  button.confirm.destructive {
    background: var(--error-color, #db4437);
  }
`;

class ConfirmCardDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Show the dialog. Resolves true if confirmed, false otherwise.
   * @returns {Promise<boolean>}
   */
  ask({ title, message, ok, cancel, destructive }) {
    return new Promise((resolve) => {
      const style = document.createElement("style");
      style.textContent = DIALOG_STYLES;

      const backdrop = document.createElement("div");
      backdrop.className = "backdrop";

      const dialog = document.createElement("div");
      dialog.className = "dialog";
      dialog.setAttribute("role", "alertdialog");
      dialog.setAttribute("aria-modal", "true");

      const titleEl = document.createElement("h2");
      titleEl.className = "title";
      titleEl.textContent = title;

      const messageEl = document.createElement("p");
      messageEl.className = "message";
      messageEl.textContent = message;

      const actions = document.createElement("div");
      actions.className = "actions";

      const cancelBtn = document.createElement("button");
      cancelBtn.className = "cancel";
      cancelBtn.textContent = cancel;

      const confirmBtn = document.createElement("button");
      confirmBtn.className = destructive ? "confirm destructive" : "confirm";
      confirmBtn.textContent = ok;

      actions.append(cancelBtn, confirmBtn);
      dialog.append(titleEl, messageEl, actions);
      backdrop.append(dialog);
      this.shadowRoot.replaceChildren(style, backdrop);

      const previouslyFocused = document.activeElement;

      const close = (result) => {
        document.removeEventListener("keydown", onKeyDown, true);
        this.remove();
        if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
        resolve(result);
      };

      const onKeyDown = (event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          close(false);
        } else if (event.key === "Tab") {
          // Keep focus inside the dialog.
          event.preventDefault();
          const target = this.shadowRoot.activeElement === confirmBtn ? cancelBtn : confirmBtn;
          target.focus();
        }
      };

      cancelBtn.addEventListener("click", () => close(false));
      confirmBtn.addEventListener("click", () => close(true));
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) close(false);
      });
      document.addEventListener("keydown", onKeyDown, true);

      document.body.append(this);
      // Focus the safe option first so a stray Enter doesn't confirm.
      requestAnimationFrame(() => cancelBtn.focus());
    });
  }
}

customElements.define("confirm-card-dialog", ConfirmCardDialog);

/** Convenience wrapper: create, show, clean up. */
function askForConfirmation(options) {
  return new ConfirmCardDialog().ask(options);
}

/* -------------------------------------------------------------------------- */
/* The card                                                                   */
/* -------------------------------------------------------------------------- */

const SELECT_DOMAINS = ["input_select", "select"];
const TOGGLE_DOMAINS = [
  "input_boolean",
  "switch",
  "light",
  "fan",
  "siren",
  "humidifier",
  "remote",
  "automation",
];
const UNAVAILABLE_STATES = ["unavailable", "unknown"];

const CARD_STYLES = `
  ha-card {
    display: block;
    padding: 12px;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .row.vertical {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  .icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15);
    color: var(--primary-color, #03a9f4);
  }
  .vertical .icon { align-self: center; }
  .label {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 1rem;
    color: var(--primary-text-color, #212121);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .vertical .label { text-align: center; }
  .control { flex: 0 0 auto; }
  .vertical .control { display: flex; justify-content: center; }
  select {
    font: inherit;
    font-size: 0.95rem;
    max-width: 100%;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--divider-color, #e0e0e0);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #212121);
    cursor: pointer;
  }
  .vertical select { width: 100%; }
  select:focus-visible,
  .toggle:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }
  .toggle {
    position: relative;
    width: 44px;
    height: 24px;
    padding: 0;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    background: var(--switch-unchecked-track-color, rgba(127, 127, 127, 0.5));
    transition: background 120ms ease-in-out;
  }
  .toggle[aria-pressed="true"] {
    background: var(--switch-checked-track-color, var(--primary-color, #03a9f4));
  }
  .toggle::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--switch-unchecked-button-color, #fff);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: transform 120ms ease-in-out;
  }
  .toggle[aria-pressed="true"]::after {
    transform: translateX(20px);
    background: var(--switch-checked-button-color, #fff);
  }
  @media (prefers-reduced-motion: reduce) {
    .toggle, .toggle::after { transition: none; }
  }
  .unavailable { opacity: 0.5; pointer-events: none; }
  .error {
    padding: 12px;
    color: var(--error-color, #db4437);
  }
`;

class ConfirmCard extends HTMLElement {
  static getStubConfig(hass, entities) {
    const candidate =
      entities.find((id) => SELECT_DOMAINS.includes(id.split(".")[0])) ||
      entities.find((id) => TOGGLE_DOMAINS.includes(id.split(".")[0]));
    return { entity: candidate || "input_boolean.example" };
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._busy = false;
  }

  setConfig(config) {
    if (!config || !config.entity) {
      throw new Error("You need to define an entity");
    }
    const domain = config.entity.split(".")[0];
    const control =
      config.control ||
      (SELECT_DOMAINS.includes(domain) ? "select" : TOGGLE_DOMAINS.includes(domain) ? "toggle" : null);

    if (!control) {
      throw new Error(
        `Unsupported entity domain "${domain}". Use a select/input_select or a toggleable entity, or set "control:" explicitly.`
      );
    }

    // confirm: false disables, confirm: true (or omitted) uses defaults.
    const confirm =
      config.confirm === false
        ? { enabled: false }
        : typeof config.confirm === "object" && config.confirm !== null
        ? { enabled: true, ...config.confirm }
        : { enabled: true };

    this._config = { ...config, control, confirm };
    this._built = false;
    this.shadowRoot.replaceChildren();
    if (this._hass) this._update();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._config) this._update();
  }

  getCardSize() {
    return 1;
  }

  /* ---- rendering ---- */

  _build() {
    const style = document.createElement("style");
    style.textContent = CARD_STYLES;

    const card = document.createElement("ha-card");
    const row = document.createElement("div");
    row.className = this._config.layout === "vertical" ? "row vertical" : "row";

    const icon = document.createElement("div");
    icon.className = "icon";
    const haIcon = document.createElement("ha-icon");
    icon.append(haIcon);

    const label = document.createElement("div");
    label.className = "label";

    const control = document.createElement("div");
    control.className = "control";

    row.append(icon, label, control);
    card.append(row);
    this.shadowRoot.replaceChildren(style, card);

    this._elements = { card, row, icon, haIcon, label, control };
    this._built = true;
  }

  _update() {
    const hass = this._hass;
    const config = this._config;
    const stateObj = hass.states[config.entity];

    if (!stateObj) {
      const error = document.createElement("ha-card");
      error.innerHTML = `<div class="error">Entity not found: ${config.entity}</div>`;
      const style = document.createElement("style");
      style.textContent = CARD_STYLES;
      this.shadowRoot.replaceChildren(style, error);
      this._built = false;
      return;
    }

    if (!this._built) this._build();

    const { haIcon, label, row } = this._elements;
    const name = config.name || stateObj.attributes.friendly_name || config.entity;

    label.textContent = name;
    label.title = name;
    haIcon.setAttribute(
      "icon",
      config.icon || stateObj.attributes.icon || this._defaultIcon(config.control)
    );

    const unavailable = UNAVAILABLE_STATES.includes(stateObj.state);
    row.classList.toggle("unavailable", unavailable);

    if (config.control === "select") {
      this._updateSelect(stateObj);
    } else {
      this._updateToggle(stateObj);
    }
  }

  _defaultIcon(control) {
    return control === "select" ? "mdi:format-list-bulleted" : "mdi:toggle-switch-outline";
  }

  _updateSelect(stateObj) {
    const options = stateObj.attributes.options || [];
    let select = this._elements.control.querySelector("select");

    if (!select) {
      select = document.createElement("select");
      select.addEventListener("change", (event) => this._onSelectChange(event));
      this._elements.control.replaceChildren(select);
    }

    const rendered = Array.from(select.options).map((option) => option.value);
    const changed =
      rendered.length !== options.length || rendered.some((value, i) => value !== options[i]);

    if (changed) {
      select.replaceChildren(
        ...options.map((value) => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = value;
          return option;
        })
      );
    }

    // Always mirror the real state: this is what makes "cancel" a no-op.
    select.value = stateObj.state;
    select.disabled = UNAVAILABLE_STATES.includes(stateObj.state);
  }

  _updateToggle(stateObj) {
    let toggle = this._elements.control.querySelector("button.toggle");

    if (!toggle) {
      toggle = document.createElement("button");
      toggle.className = "toggle";
      toggle.addEventListener("click", () => this._onToggleClick());
      this._elements.control.replaceChildren(toggle);
    }

    const isOn = stateObj.state === "on";
    toggle.setAttribute("aria-pressed", String(isOn));
    toggle.setAttribute(
      "aria-label",
      this._config.name || stateObj.attributes.friendly_name || this._config.entity
    );
    toggle.disabled = UNAVAILABLE_STATES.includes(stateObj.state);
  }

  /* ---- interaction ---- */

  async _onSelectChange(event) {
    const select = event.target;
    const stateObj = this._hass.states[this._config.entity];
    const from = stateObj.state;
    const to = select.value;

    // Never commit optimistically — snap back until the service call succeeds.
    select.value = from;
    if (to === from || this._busy) return;

    const name = this._config.name || stateObj.attributes.friendly_name || this._config.entity;
    const confirmed = await this._confirm("change", { name, from, to, value: to });
    if (!confirmed) return;

    const domain = this._config.entity.split(".")[0];
    await this._callService(domain, "select_option", { option: to });
  }

  async _onToggleClick() {
    const stateObj = this._hass.states[this._config.entity];
    if (this._busy) return;

    const isOn = stateObj.state === "on";
    const action = isOn ? "turn_off" : "turn_on";
    const only = this._config.confirm.only;

    const name = this._config.name || stateObj.attributes.friendly_name || this._config.entity;
    const skip = (only === "on" && isOn) || (only === "off" && !isOn);

    if (!skip) {
      const confirmed = await this._confirm(isOn ? "turn_off" : "turn_on", {
        name,
        from: stateObj.state,
        to: isOn ? "off" : "on",
        value: isOn ? "off" : "on",
      });
      if (!confirmed) return;
    }

    const domain = this._config.entity.split(".")[0];
    const serviceDomain = TOGGLE_DOMAINS.includes(domain) ? domain : "homeassistant";
    await this._callService(serviceDomain, action, {});
  }

  _confirm(messageKey, values) {
    const confirm = this._config.confirm;
    if (confirm.enabled === false) return Promise.resolve(true);

    const language = this._hass.locale?.language || this._hass.language || "en";
    const strings = {
      title: confirm.title ?? localize(language, "title"),
      message: confirm.message ?? localize(language, messageKey),
      ok: confirm.ok ?? localize(language, "ok"),
      cancel: confirm.cancel ?? localize(language, "cancel"),
    };

    return askForConfirmation({
      title: fillTemplate(strings.title, values),
      message: fillTemplate(strings.message, values),
      ok: fillTemplate(strings.ok, values),
      cancel: fillTemplate(strings.cancel, values),
      destructive: confirm.destructive === true,
    });
  }

  async _callService(domain, service, data) {
    this._busy = true;
    try {
      await this._hass.callService(domain, service, {
        entity_id: this._config.entity,
        ...data,
      });
    } catch (error) {
      console.error("confirm-card: service call failed", error);
    } finally {
      this._busy = false;
    }
  }
}

customElements.define("confirm-card", ConfirmCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "confirm-card",
  name: "Confirm Card",
  description: "A dropdown or toggle that asks for confirmation before calling a service.",
  preview: false,
  documentationURL: "https://github.com/YOUR_USERNAME/confirm-card",
});
