# Home Mobile — Guida alla personalizzazione

**Anteprima della dashboard:** puoi vedere Home Mobile negli esempi `screenshots/home-mobile-original-top.jpg` e `screenshots/home-mobile-original-bottom.jpg`.


## Sostituzione delle immagini

Le due planimetrie incluse sono dimostrative e possono essere sostituite con immagini personalizzate.

1. Prepara `floorplan-light.png` e `floorplan-dark.png` (dimensioni consigliate uguali, preferibilmente quadrate).
2. Copia entrambe nella cartella `/config/www/home-mobile/` della tua installazione Home Assistant, sostituendo i file demo.
3. Nella dashboard le immagini sono referenziate da:

   ```yaml
   image: /local/home-mobile/floorplan-light.png
   dark_mode_image: /local/home-mobile/floorplan-dark.png
   ```

4. Ricarica la dashboard e, se le immagini precedenti rimangono nella cache, ricarica la pagina o usa nuovi nomi di file (modificando anche i percorsi nello YAML).

Gli indirizzi `/local/...` in Home Assistant puntano a `/config/www/...`. GitHub Pages utilizza invece le copie `.webp` contenute in `assets/`: per cambiare anche la preview web, sostituisci **anche** `assets/floorplan-light.webp` e `assets/floorplan-dark.webp`.

**Privacy:** i file nella cartella `/config/www` possono essere accessibili senza login a chi conosce il percorso. Se la piantina riproduce la tua abitazione reale, valuta attentamente i rischi e preferisci una versione dimostrativa.

## Entità e dispositivi

La demo usa esclusivamente entità con prefisso `hm_`. Per collegare la tua installazione, sostituisci gli `entity_id` nelle card della dashboard, comprese le sotto-card e le regole di visibilità. Per non perdere il controllo della configurazione, modifica e verifica una sezione alla volta.

| Controllo | Demo | Icona suggerita |
| --- | --- | --- |
| Telecamere | `input_boolean.hm_telecamere_demo` | `mdi:cctv` |
| Allarme | `input_select.hm_allarme_demo` | `mdi:shield-home` |
| Selettore piano | `input_select.hm_ambiente_demo` | `mdi:home-floor-1` |
| Mostra piantina | `input_boolean.hm_mostra_piantina_demo` | `mdi:floor-plan` |
| Perimetro | `binary_sensor.hm_perimetro_demo` | `mdi:home-outline` |
| Presa | `input_boolean.hm_presa_demo` | `mdi:power-socket-eu` |
| Clima | `input_boolean.hm_clima_demo` | `mdi:air-conditioner` |
| Media | `input_boolean.hm_media_demo` | `mdi:television-play` |
| Luce 1 | `light.hm_luce_1_demo` | `mdi:lightbulb` |
| Luce 2 | `light.hm_luce_2_demo` | `mdi:lightbulb` |
| Luce 3 | `light.hm_luce_3_demo` | `mdi:lightbulb` |
| Luce 4 | `light.hm_luce_4_demo` | `mdi:lightbulb` |
| Volumetrico | `binary_sensor.hm_volumetrico_demo` | `mdi:motion-sensor` |
| Porta | `binary_sensor.hm_porta_demo` | `mdi:door` |

**Attenzione:** gli `input_boolean` simulano prese, media e climatizzatore. Sostituendoli con altre piattaforme (`switch`, `media_player`, `climate`) potrebbero servire adattamenti dell'azione e del tipo di Bubble Card: non limitarti al solo entity_id senza verificare la card.

## Edera e Bubble Card

Per riprodurre la grafica:

1. Installa [Edera](https://github.com/luigi-regolo/Edera), quindi selezionalo nel profilo Home Assistant.
2. Installa [Bubble Card](https://github.com/Clooos/Bubble-Card) via HACS.
3. Ricarica la dashboard. Le variabili CSS usate per i colori delle luci sono definite nel tema Edera (es. `--edera-light-color`).

Edera **non richiede** Bubble Card per il proprio funzionamento: è la dashboard Home Mobile che ne fa uso.

## Disinstallazione del package demo

Rimuovi prima o adatta nella dashboard ogni riferimento alle entità `hm_`. Successivamente elimina il solo file `/config/packages/home_mobile_demo.yaml` e riavvia Home Assistant dopo un controllo della configurazione. Non rimuovere una direttiva `packages:` che viene già utilizzata da altri package.

## Limiti della preview web

La preview web è una simulazione statica e non si sincronizza con Home Assistant. Per vedere l'effettivo funzionamento di Bubble Card e dei tuoi dispositivi devi usare la dashboard Lovelace all'interno di Home Assistant.
