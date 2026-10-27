# Asset replacement guide

All existing environments and diagrams are original SVG/CSS compositions, not game screenshots. The site is intentionally complete without licensed game media.

Set paths in `src/content/assets.ts`. Store authorized files in `public/assets/`. Paths begin `/assets/` in configuration.

| Slot              | Suggested file                                | Dimensions / format                      | Use                                                                                                         |
| ----------------- | --------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Portrait          | profile.webp                                  | 1200 × 1500 WebP, roughly under 250 KB   | About monogram replacement; use a real authorized portrait                                                  |
| Résumé            | resume.pdf                                    | Searchable, accessible PDF               | Header/background résumé download                                                                           |
| Project thumbnail | traversal.webp, quest-state.webp, echoes.webp | 1600 × 1000 WebP, under 350 KB           | Set projects[slug].thumbnail; rendered with Next Image                                                      |
| Game screenshots  | project-slug/01.webp                          | 1920 × 1080 WebP                         | Reserved screenshots array; integrate into a captioned gallery after rights and content review              |
| Gameplay clip     | project-slug/demo.mp4                         | 1280 × 720 H.264 MP4, 20–45 seconds      | Reserved clip slot; future video renderer should provide poster, captions/transcript, controls, no autoplay |
| Technical diagram | project-slug/architecture.svg                 | SVG, meaningful labels and readable text | Reserved diagram slot; future renderer must preserve an accessible text explanation                         |
| Social preview    | social.png                                    | 1200 × 630 PNG                           | Replace generated Open Graph preview if desired; update metadata as appropriate                             |
| Links             | social/repository config arrays               | Real HTTPS profile/repository URLs       | Confirm ownership and visibility before adding                                                              |

The portrait, thumbnail, résumé and social slots are wired into the UI. Screenshots, clips and replacement diagrams are reserved data slots, not claims of implemented galleries or players. No missing image is requested by the app.

Most valuable next assets: an approved traversal recording showing debug traces, a small nonproprietary C++ excerpt, a quest save/load test recording, a real independent build with a precise feature inventory, and an owner-authored introduction. For commercial material, confirm studio permission and describe personal scope in captions. Never use generated imagery as if it were a commercial gameplay screenshot.
