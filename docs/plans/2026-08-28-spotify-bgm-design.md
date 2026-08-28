# Spotify BGM Control Design

## Goal

Add an official, low-distraction music entry for RADWIMPS' “Sparkle - movie ver.” without copying or self-hosting copyrighted audio.

## Selected approach

Use Spotify's official track embed inside a compact floating glass panel. A small `BGM` control sits in the lower-right corner. Selecting it reveals the Spotify player, where the visitor explicitly starts playback. The panel can be collapsed without removing the iframe, allowing playback to continue when Spotify permits it.

## Behavior and accessibility

- Do not attempt audible autoplay; browsers block it and visitors should control sound.
- Keep the control reachable by keyboard and expose its expanded state.
- Give the iframe a descriptive title and remove it from the tab order while collapsed.
- Keep the panel responsive so it does not cover the full mobile viewport.
- Link playback to Spotify's licensed player rather than downloading or proxying audio.

## Verification

- Run the existing TypeScript and production build checks.
- Preview the site locally at desktop and mobile widths.
- Verify that the BGM button opens and closes the player without layout overflow.
- Verify that the official track title and artist appear in the embed.
