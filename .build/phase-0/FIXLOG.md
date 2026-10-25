# Phase 0 fix log

Readers: the next Phase 0 auditor. No API. No schema. The user said: "Read PROMPT.md fully. Execute the AUTONOMOUS PHASE LOOP in §A from the first phase that is not marked PASSED in .build/STATE.json."

## P0-001 Major

Cause: the first before and after lists were copied in one command after the install, so they were the same bytes and did not bracket a copy.
Change: wrote a before snapshot, waited, ran `cp -R --update=none`, waited, then wrote the after snapshot. The copy log sits between the two files in time. Inodes and mtimes of the 286 skill directories did not change, and nothing was added or removed.
Verified: `stat` shows before at 18:34:47, the copy log at 18:34:50, and after at 18:34:53. A comparison printed `inode_changed []` and `added []`.

## P0-002 Minor

Cause: the Vite prototype still stated product claims the capability inventory does not allow, including an e-invoice from the order, automatic backups, and an unlabelled rupee figure.
Change: `web/src/data.js` and `web/src/sections/Sections.jsx` now say the invoice layouts are illustrative, that an e-invoice comes from the sales invoice, that there is no desktop-company reader, and that hosting and automatic backups are not a claim. The public email is `{{PUBLIC_EMAIL}}`.
Verified: search of those two files no longer finds "from the order", "automatic backups", or "e-Invoice IRN generated".

## P0-003 Minor

Cause: `skills-diff-note.txt` was evidence the plan did not list.
Change: deleted that file. The plan now lists `skills-copy-log.txt`, which is the file the new snapshot uses.
Verified: the note file is gone. The plan names the copy log.

## P0-004 Minor

Cause: `wiki` is on the bench and was not named in the owner list or the capability inventory.
Change: `docs/TODO_FROM_OWNER.md` records `wiki` as the generic wiki app, not a client product and not an example.
Verified: `ls apps` shows `wiki`, and the owner file now names it.
