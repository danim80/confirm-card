# Confirm Card

A Lovelace card that asks before it acts.

Home Assistant's built-in `confirmation:` option only works on `tap_action`. Controls — dropdowns, toggles, sliders — call their service the moment you touch them, with no way to intervene. This card fills that gap for dropdowns and toggles: pick an option or flip the switch, get a dialog, and the service call happens only if you say yes.

No build step, no dependencies. One file, styled with your theme's own variables.

## Install

### HACS

1. HACS → Frontend → ⋮ → Custom repositories
2. Add `https://github.com/YOUR_USERNAME/confirm-card`, category **Dashboard**
3. Install, then reload your browser

### Manual

1. Copy `dist/confirm-card.js` to `<config>/www/confirm-card.js`
2. Settings → Dashboards → ⋮ → Resources → Add resource
3. URL `/local/confirm-card.js`, type **JavaScript module**

## Use

```yaml
type: custom:confirm-card
entity: input_select.house_mode
```

That's the whole minimum. The card detects what kind of control to draw from the entity's domain, and writes the dialog text in your Home Assistant language.

A toggle with custom wording:

```yaml
type: custom:confirm-card
entity: switch.garage_door
name: Garage
icon: mdi:garage
confirm:
  title: Hold on
  message: Open the garage door?
  ok: Open
  cancel: Keep closed
  destructive: true
```

Confirm only when switching something off, and leave turning it on instant:

```yaml
type: custom:confirm-card
entity: input_boolean.night_mode
confirm:
  only: "off"
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `entity` | string | **required** | A `select`, `input_select`, or any toggleable entity |
| `name` | string | friendly name | Label shown on the card |
| `icon` | string | entity icon | Any `mdi:` icon |
| `control` | `select` \| `toggle` | from domain | Override the control type |
| `layout` | `horizontal` \| `vertical` | `horizontal` | Stack the icon, label and control |
| `confirm` | bool \| map | `true` | `false` disables the dialog entirely |

### `confirm`

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | string | translated | Dialog heading |
| `message` | string | translated | Dialog body |
| `ok` | string | translated | Confirm button label |
| `cancel` | string | translated | Cancel button label |
| `destructive` | bool | `false` | Paint the confirm button in the error colour |
| `only` | `on` \| `off` \| `both` | `both` | Toggles only: which direction to confirm |

Every text field accepts placeholders:

| Placeholder | Value |
| --- | --- |
| `{name}` | The card's label |
| `{from}` | Current state |
| `{to}` | The value you picked |
| `{value}` | Same as `{to}` |

```yaml
confirm:
  message: 'Switch the house from {from} to {to}?'
```

## Languages

The default strings ship in Romanian, English, German, French, Spanish, Italian, Dutch, Portuguese, Polish, Czech, Slovak, Hungarian, Russian, Ukrainian, Swedish, Danish, Norwegian, Finnish, Turkish, Greek, Catalan and Simplified Chinese. The card reads `hass.locale.language` and falls back to English for anything else.

Adding a language is one object in the `TRANSLATIONS` map at the top of `dist/confirm-card.js` — pull requests welcome.

## How it works

The control is kept fully controlled against `hass.states`. Choosing an option never writes the value; it snaps the dropdown back to the real state, opens the dialog, and calls `select_option` only on confirmation. Cancelling is therefore a genuine no-op — no flicker, no state to undo.

## Notes

- The visual editor isn't implemented yet; configure the card in YAML.
- Sliders (`input_number`, brightness, covers) aren't supported. A confirmation on a continuously-dragged control would fire on every pixel, so it needs a different interaction pattern.

## Licence

MIT
