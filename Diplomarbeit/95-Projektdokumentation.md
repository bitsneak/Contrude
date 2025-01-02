\newpage

## Dokumentation

Im Abschnitt Projektdokumentation können Sie mit Hilfe eines Projektmanagementwerkzeuges Ihrer Wahl die Projektumsetzung dokumentieren. (Also ein fortlaufender Projektfortschrittsbericht)

Normalerweise werden Sie die UserStories in mehrere SubTasks zerreissen und dann in einem agilen verfahen (Scrum, Kanban, was auch immer ihnen am geeignetsten erscheint) abarbeiten. Dazu können Sie natürlich eine Softwahre Ihrer Wahl verwenden.

Am Ende sollten sie aber für jeden Projektabschnitt (Das ist die Zeit zwischen den Meilensteinen) eine Dokumentation entstehen aus der ersichtlich ist

* Berichtszeitraum
* Durchgeführte Arbeiten im Berichtszeitraum sowie die Aufwände der einzelnen Personen
* Projektstatus (Im Plan, Schwierigkeiten, Risiko)
* Gesamtstatus sowie die möglicherweise notwendigen Maßnahmen für
    - Leistungsziele
    - Terminziele
    - Kostenziele
    - Teamarbeit
* Nächste Schritte und notwendige Entscheidungen

Im folgenden Abschnitt ist ein solcher Fortschritt illustriert. 

### Use Cases

#### Container-Position bestimmen

**Beschreibung:** Das System versucht die Position des Containers auf dem Frachtschiff zu bestimmen.  
**Trigger:** Anfrage des Systems  
**Bedingungen:** Sensoren & GPS-Modul sind aktiv  
**Ablauf:**
1. System sendet Anfrage an ESP32  
2. GPS-Daten werden ermittelt  
3. Position wird berechnet & ausgewertet  

**Alternative:** GPS-Signal ist nicht verfügbar  
**Ergebnis:** Position des Containers wird durch die grafische Oberfläche angezeigt

#### Container-Status überwachen

**Beschreibung:** Das System überwacht die Umweltdaten im Container  
**Trigger:** In einem regelmäßigen Zeitinterval
**Bedingungen:** Sensoren sind Aktiv  
**Ablauf:**
1. Sensoren erfassen Daten  
2. Daten werden an den Server gesendet  
3. Status wird angezeigt 
 
**Alternative:** Sensorfehler  
**Ergebnis:** Daten werden aktualisiert und auf der Webseite angezeigt  

#### Temperatur abfrage

**Beschreibung:** Der Benutzer will die aktuelle Temperatur eines Containers sehen  
**Trigger:** Benutzeranfrage  
**Bedingungen:** Webandwendung ist aktiv  
**Ablauf:**
1. Benutzer sendet Anfrage  
2. Server validiert Anfrage  
3. Temperaturdaten werden angezeigt  

**Alternative:** Datenbank nicht erreichbar  
**Ergebnis:** Temperatur wird mithilfe eines Grafen angezigt  

#### Sensordaten speichern

**Beschreibung:** Das System speichert die Sensordaten in der Datenbank  
**Trigger:** Neue Sensordaten werden an den Server gesendet  
**Bedingungen:** Datenbank und Server sind aktiv  
**Ablauf:**
1. Datenbank empfängt Sensordaten  
2. Sensordaten werden validiert  
3. Sensordaten werden gespeichert  

**Alternative:** Speicherfehler tritt auf  
**Ergebnis:** Sensordaten sind in der Datenbank gespeichert  

#### Benutzer authentifizieren

**Beschreibung:** Der Benutzer meldet sich in der Webanwendung an  
**Trigger:** Benutzer gibt Anmeldedaten ein  
**Bedingungen:** Benutzerkonto existiert  
**Ablauf:**
1. Benutzer gibt Zugangsdaten ein  
2. Server validiert Zugangsdaten  
3. Benutzer wird angemeldet  

**Alternative:** Zugangsdaten sind falsch  
**Ergebnis:** Benutzer ist erfolgreich angemeldet  

#### Alarm bei Grenzwertüberschreitung auslösen

**Beschreibung:** Das System löst einen Alarm aus, wenn ein definierter Grenzwert überschritten wird.  
**Trigger:** Grenzwertüberschreitung erkannt  
**Bedingungen:** Server ist aktiv 
**Ablauf:**
1. Server erkennt Grenzwertüberschreitung  
2. System löst Alarm aus  
3. Alarm wird an Benutzer gesendet  

**Alternative:** Fehler bei der Alarmübertragung  
**Ergebnis:** Alarmbenachrichtigung wird gesendet  

#### GPS-Signal wird gesendet

**Beschreibung:** Das System aktualisiert regelmäßig die GPS-Position des Containers.  
**Trigger:** Zeitintervall erreicht  
**Bedingungen:** Server ist aktiv
**Ablauf:**
1. System fordert GPS-Daten an  
2. GPS-Daten werden aktualisiert  

**Alternative:** Kein GPS-Signal verfügbar  
**Ergebnis:** Position des Containers ist aktualisiert  

#### Benutzerrolle zuweisen

**Beschreibung:** Ein Administrator erstellt einen neuen Benutzer und weist diesem eine bestimmte Rolle zu.  
**Trigger:** Neuer Benutzer wird erstellt oder eine neue Rolle wird zugewiesen  
**Bedingungen:** Benutzerkonto existiert oder wird erstellt  
**Ablauf:**  
1. Administrator erstellt neuen Benutzer (falls noch nicht vorhanden)  
2. Administrator wählt den Benutzer aus  
3. Administrator weist dem Benutzer eine Rolle zu  
4. System erstellt Benutzerkonto (falls nicht vorhanden) und aktualisiert die Benutzerrolle  

**Alternative:** Rollenzuweisung schlägt fehl oder Benutzererstellung schlägt fehl  
**Ergebnis:** Benutzerkonto wird erstellt (falls notwendig) und die Benutzerrolle ist aktualisiert
 

#### Container-Ortung starten

**Beschreibung:** Das System ortet einen bestimmten Container.  
**Trigger:** In einem regelmäßigen Zeitinterval  
**Bedingungen:** GPS-Sensor ist aktiv  
**Ablauf:**
1. GPS-Sensor sendet Daten  
2. Position wird angezeigt  

**Alternative:** GPS-Signal nicht verfügbar  --> Container verlust
**Ergebnis:** Containerortung erfolgreich  

#### Container-Verlust melden

**Beschreibung:** Verlust eines Containers wird gemeldet und dokumentiert.  
**Trigger:** Container wird als verloren markiert  
**Bedingungen:** System ist aktiv  
**Ablauf:**
1. Benutzer markiert Container als verloren  
2. System dokumentiert Verlust  

**Alternative:** Fehlende Dokumentation  
**Ergebnis:** Verlustmeldung erstellt  


#### Umweltdaten grafisch darstellen

**Beschreibung:** Das System schickt die Umweltdaten ans Visualisierungstool.  
**Trigger:** Benutzer öffnet Visualisierung  
**Bedingungen:** Datenbank und Server sind aktiv  
**Ablauf:**
1. Daten werden abgerufen  
2. Daten werden grafisch dargestellt  

**Alternative:** Daten nicht verfügbar  
**Ergebnis:** Umweltdaten werden von Grafana visualisiert

### Projektfortschritt 01. Juni bis 05. August 2020

#### Gesamtstatus

* Das Projekt befindet sich derzeit im Plan. 
* Es wurden alle Teile bestellt und die Hardware dimensioniert
* Bei den Lieferungen hat es leichte Verspätungen gegeben

| Dimension           | Status            |  Maßnahmen             |
|:--------------------|:------------------|:-----------------------|
| Leistungsziele      | In Ordnung        | keine                  |
| Terminziele         | Verzug durch Lieferprobleme | Bei restlichen Teilen Expresslieferung|
| Kostenziele | Teile im Budget, Batterie sehr teuer | Günstigere Teile bei der restlichen Hardware verwenden |
| Teamarbeit | optimal | keine |

:Projektstatus am 2020-08-05

#### Notwendige Entscheidungen

* Die Zusammenbauphase muss etwas verschoben werden und startet nun um 14 Tage später. Das hat keinen Einfluss auf den Endtermin.

#### Nächste Schritte

* Abklären ob die Expressbestellungen im Budget sind
* Start dder Implementierungsphase

: Projektstatus Stand 05. August 2020
