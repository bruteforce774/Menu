1. AppState -> AppModel 
    - Vi kapsler inn tilstanden (state/model) og alle endringer av den (controller)
    - Litt parallelt til api.ts => alle kall på api går via denne
    - AppModel => all endring av appens tilstand går via denne
    - Innkapsling er et av hovedpoengene i objektorientering
    - Vi flytter tilstandshåndtering ut av AppView - alle views kan aksessere den direkte
1. Vi lager en ny side for å legge til en kategori
    - Videresender til #menu/ny-kategori
1. Vi lager en ny side for å legge til et produkt
    - Videresender til #menu-item/nytt-produkt
1. Vi kan legge på en meny på alle sider - i index.html


Mulige oppgaver
- Les kode, jobb med å forstå hva som skjer
- Legg til sletting av kategori eller produkt fra en adminside
- Endre legg til produkt, så man får velge kategori fra <select>
- Lag en ny side som endrer tilstand uten å navigere til en ny side, da må du ha render() etter å ha kalt controller-funksjon i appModel