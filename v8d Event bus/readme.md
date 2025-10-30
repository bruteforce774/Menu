Hvorfor dette er viktig (løs kobling)

- Komponenter kjenner ikke hverandre: View sier hva som ønskes (intensjon), ikke hvem som skal gjøre det.
- Bytt deler uten å røre resten: Du kan skifte router/lagring/logikk uten å endre views.
- Testbarhet: Du kan trigge events i tester og verifisere effekter uten DOM eller ekte router.
- Skalerbarhet: Flere deler kan lytte til samme event (telemetri, logging, UI).
- Separation of concerns: View håndterer interaksjon og rendering; “controller-laget” (RouterView hos oss) håndterer reaksjoner og muterer state.
- Intensjoner > Implementasjon: NAVIGATE beskriver målet, ikke hvordan; routeren bestemmer hvordan.