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

**Beschreibung:** Das System versucht die Position des Containers auf dem Frachtschiff
**Trigger:** Anfrage des Systems
**Bedingungen:** Sensoren & GPS-Modul sind aktiv 
**Ablauf:** 
1. System sendet Anfrage an ESP32
2. GPS-Daten werden ermittelt
3. Position wird berechnet & ausgewertet
**Alternative:** GPS-Signal ist nicht verfügbar
**Ergebnis:** Positon des Containers wird durch Grafische Oberfläche angezeigt

#### Container-Status überwachen

**Beschreibung:** Das System überwacht die Containerbedingunen wie die Temperatur & Luftfeuchtigkeit
**Trigger:** Regelmäßige Anfrage
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

#### Container auf Karte anzeigen

**Beschreibung:** Der Benutzer will sich die Postion eines Containers  auf einer Karte dargestellen lassen 
**Trigger:** Benutzer öffnet die Kartendarstellung  
**Bedingungen:** Webanwendung ist aktiv  
**Ablauf:**  
1. Benutzer öffnet die Karte  
2. Server sendet die Positionsdaten  
3. Karte zeigt die Position an  
**Alternative:** Kartenmodul ist fehlerhaft  
**Ergebnis:** Position wird auf der Karte dargestellt  

#### Sensordaten speichern

**Beschreibung:** Das System speichert die Sensordaten in der Datenbank
**Trigger:** Neue Sensordaten werden an den Server gesendet  
**Bedingungen:** Datenbank ist aktiv  
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
**Bedingungen:** Sensoren sind aktiv  
**Ablauf:**  
1. Sensor erkennt Grenzwertüberschreitung  
2. System löst Alarm aus  
3. Alarm wird an Benutzer gesendet  
**Alternative:** Fehler bei der Alarmübertragung  
**Ergebnis:** Alarmbenachrichtigung wird gesendet  


#### GPS-Signal aktualisieren

**Beschreibung:** Das System aktualisiert regelmäßig die GPS-Position des Containers.  
**Trigger:** Zeitintervall erreicht  
**Bedingungen:** GPS-Sensor ist aktiv  
**Ablauf:**  
1. System fordert GPS-Daten an  
2. GPS-Daten werden aktualisiert  
**Alternative:** Kein GPS-Signal verfügbar  
**Ergebnis:** Position des Containers ist aktualisiert  


#### Benutzerrolle zuweisen

**Beschreibung:** Ein Administrator weist einem Benutzer eine bestimmte Rolle zu.  
**Trigger:** Neue Rolle wird zugewiesen  
**Bedingungen:** Benutzerkonto existiert  
**Ablauf:**  
1. Administrator wählt Benutzer  
2. Administrator weist Rolle zu  
3. System aktualisiert Benutzerrolle  
**Alternative:** Rollenzuweisung schlägt fehl  
**Ergebnis:** Benutzerrolle ist aktualisiert  

#### Serververbindung überprüfen

**Beschreibung:** Das System stellt sicher, dass die Verbindung zum Server stabil ist.  
**Trigger:** Regelmäßige Überprüfung  
**Bedingungen:** Netzwerkverbindung ist aktiv  
**Ablauf:**  
1. System überprüft Verbindung zum Server  
2. Verbindung wird bestätigt  
**Alternative:** Verbindung schlägt fehl  
**Ergebnis:** Serververbindung ist stabil  

#### Container-Ortung starten

**Beschreibung:** Das System startet die GPS-Ortung für einen bestimmten Container.  
**Trigger:** Benutzer startet Ortung  
**Bedingungen:** GPS-Sensor ist aktiv  
**Ablauf:**  
1. Benutzer startet Ortung  
2. GPS-Sensor sendet Daten  
3. Position wird angezeigt  
**Alternative:** GPS-Signal nicht verfügbar  
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

#### Systemdiagnose durchführen

**Beschreibung:** Das System führt eine Diagnose zur Fehleranalyse durch.  
**Trigger:** Diagnoseauftrag gestartet  
**Bedingungen:** System ist aktiv  
**Ablauf:**  
1. Diagnose wird gestartet  
2. Fehler werden analysiert  
3. Diagnosebericht wird erstellt  
**Alternative:** Diagnose schlägt fehl  
**Ergebnis:** Diagnosebericht erstellt  

#### Umweltdaten grafisch darstellen

**Beschreibung:** Das System stellt die Umweltdaten visuell dar.  
**Trigger:** Benutzer öffnet Visualisierung  
**Bedingungen:** Datenbank ist aktiv  
**Ablauf:**  
1. Daten werden abgerufen  
2. Daten werden grafisch dargestellt  
**Alternative:** Daten nicht verfügbar  
**Ergebnis:** Umweltdaten sind visualisiert  


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
