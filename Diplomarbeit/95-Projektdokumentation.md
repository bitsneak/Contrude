\newpage

## Dokumentation

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

**Beschreibung:** Der Benutzer will die aktuelle Temperatur eines Containers sehen.  
**Trigger:** Benutzeranfrage  
**Bedingungen:** Webandwendung ist aktiv  
**Ablauf:**

1. Benutzer sendet Anfrage  
2. Server validiert Anfrage  
3. Temperaturdaten werden angezeigt  

**Alternative:** Datenbank nicht erreichbar  
**Ergebnis:** Temperatur wird mithilfe eines Grafen angezigt

#### Sensordaten speichern

**Beschreibung:** Das System speichert die Sensordaten in der Datenbank.  
**Trigger:** Neue Sensordaten werden an den Server gesendet  
**Bedingungen:** Datenbank und Server sind aktiv  
**Ablauf:**

1. Datenbank empfängt Sensordaten  
2. Sensordaten werden validiert  
3. Sensordaten werden gespeichert  

**Alternative:** Speicherfehler tritt auf  
**Ergebnis:** Sensordaten sind in der Datenbank gespeichert

#### Benutzer authentifizieren

**Beschreibung:** Der Benutzer meldet sich in der Webanwendung an.  
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
3. Alarm wird den Benutzer in einer Übersicht und in bei den Container Details angezeigt

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

**Alternative:** Rollenzuweisung oder Benutzererstellung schlägt fehl  
**Ergebnis:** Benutzerkonto wird erstellt (falls notwendig) und die Benutzerrolle ist aktualisiert

#### Container-Ortung starten

**Beschreibung:** Das System ortet einen bestimmten Container.  
**Trigger:** In einem regelmäßigen Zeitinterval  
**Bedingungen:** GPS-Sensor ist aktiv  
**Ablauf:**

1. GPS-Sensor sendet Daten  
2. Position wird angezeigt  

**Alternative:** GPS-Signal nicht verfügbar -> Containerverlust  
**Ergebnis:** Containerortung erfolgreich

#### Containerverlust melden

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

### Projektfortschritt 23. Februar 2024 bis 19. September 2024

#### Gesamtstatus

* Das Projekt befindet sich derzeit im Plan. 
* Es wurden alle Teile bestellt und die Hardware dimensioniert.
* Bei den Lieferungen gibt es schwere Verspätungungen.
* Es wurden erste Versionen der Container, Sensoren und Benutzer Datenbank in MySQL erstellt.
* Der Server besitz REST-Schnittpunkte und eine Authentifizierungsmöglichkeit.
  * Des weiteren wird Treafik benutzt um den DNS zuzuweisen.
  * Es wird eine containerbasierte Architektur verwendet.
* Passwörter werden Docker mittels Secrets übergeben.
* Das Layout & Design für die Webseite wurden fertigestellt.
  * Eine erste rudimentäre Version wurde mittels CSS & HTML erstellt.

| Dimension           | Status            |  Maßnahmen             |
|:--------------------|:------------------|:-----------------------|
| Leistungsziele      | In Verzug        | Betreuer um Hilfe bitten                  |
| Terminziele         | Verzug durch Lieferprobleme | restliche Komponenten über Betreuer besorgen|
| Kostenziele | Unter Budget | - |
| Teamarbeit | optimal | - |

:Projektstatus am 2024-09-19

#### Notwendige Entscheidungen

* Durch den Lieferverzug der Komponenten muss die Programmierung und die Montage
des Prototypen nach hinten verschoben werden.
* Durch Einschränkungen von der verwendeten MySQL-Version musste auf eine neuere
gewechselt werden.

#### Nächste Schritte

* Prototypen bauen und Programmieren.
* Inplementieren der Zeitreihen-Datenbank InfluxDB und Grafana zur Darstellung der Sensor Daten.
* Erstellen einen MQTT Brokers für die Übertragung der Daten.
* Datenbanken für ... erstellen.
  * Grenzwerte (Sensoren)
  * Schiffe
* Funktionalität für die Webseite schreiben
  * Verwenden der React-Bibliothek

### Projektfortschritt 19. September 2024 bis 01. Februar 2025

#### Gesamtstatus

* Das Projekt befindet sich derzeit in der Endphase.
* Es wurden zwei Korrekturversionen der Diplomarbeit abgeben.
* Der Prototyp ist voll funktionsfähig.
  * Lesen der Umweltdaten
  * Sender der Daten
  * Aufbau des Mesh-Netzwerkes
* Es wurden ... Datenbanken implementiert.
  * Schiff
  * Grenzwerte
  * Sensor (von relational auf zeitbasiert)
* Die Webseite wurde in React neugeschrieben und ... Funktionen wurden eingefügt.
  * Login
  * Wechsel des Schiffes
  * Einzelne Container einsehen
    * Umweltdaten sehen
  * Notizen machen

| Dimension           | Status            |  Maßnahmen             |
|:--------------------|:------------------|:-----------------------|
| Leistungsziele      | In Verzug        | Betreuer um Hilfe bitte |
| Terminziele         | erreicht | - |
| Kostenziele | Unter Budget | - |
| Teamarbeit | optimal | - |

:Projektstatus am 2025-02-01

#### Notwendige Entscheidungen

* Die Formulierungen in der Diplomarbeit müssen geändert werden.
  * Dazu gehören auch Rechtschreib- und Grammatikkontrollen.

#### Nächste Schritte

* Vollständige Verschriftlichung der Diplomarbeit.
* Prototypen auf Lochrasterplatine löten.
* Sidebars der Webseite anpassen.
