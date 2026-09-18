# PokéOS

A retro, Pokémon-themed web operating system built entirely with vanilla web technologies. PokéOS provides a desktop experience inside your browser featuring draggable windows, dynamic focus management, a Pokédex, an interactive turn-based battle mini-game, and Bill's PC storage system.

---

## Features

* **Desktop Environment:**
  * Draggable window management with proper focus stacking (`z-index` layering).
  * System taskbar with quick-launch buttons and a real-time digital clock.
  * Custom wallpaper support via local image assets (`background.png`).

* **Offline Pokédex:**
  * Instant lookup for Pokémon entries without network calls.
  * Detailed stats: type classifications, height, weight, and retro Pokédex lore entries.

* **Battle Stadium:**
  * Interactive turn-based combat mini-game (Pikachu vs. Gengar).
  * Dynamic animated health bars.
  * Opponent AI counter-attacks with randomized damage and authentic battle cadence.

* **Bill's PC Storage:**
  * Pokémon storage box layout rendering active party members and boxed Pokémon.

---

## 🛠️ Built With

* **HTML:** Semantic structure and accessible DOM hierarchy.
* **CSS:** Flexbox, CSS Grid, custom properties (variables), drop shadows, and responsive layouts.
* **JavaScript :** Coordinate-based window dragging, state-driven battle loops, and offline dataset management.

---

## Project Structure

poke-os/
│
├── index.html        # Main OS shell and window templates
├── styles.css        # Theme variables, layouts, and retro aesthetics
├── script.js         # Window manager, battle logic, and local database
└── background.png    # Desktop wallpaper asset