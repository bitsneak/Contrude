# Teilaufgabe Schüler Schrempf

\textauthor{Marko Daniel Schrempf}

## Theorie

### Datenspeicherung- und Visualisierung

Eine Datenbank ermöglicht die Speicherung und Verwaltung von zusammenhängenden Daten. Hier können große Datenmengen übersichtlich abgebildet werden. Es gibt verschiedenste Datenbankkonzepte, welche auf ihre eigene Art und Weise Vor- und Nachteile bringen. In dieser Ausarbeitung wird sich auf zwei funktional unterschiedliche Arten fokussiert.

#### Relationale Datenbanken

In einem relationalen Datenbanksystem werden Daten in Form von Tabellen gespeichert. Jede Tabelle hat eine Relation zu einer anderen Tabelle, entweder inhaltich oder strukturell. Durch diese Beziehungen, wenn sie richtig definiert sind, werden Redundanzen vermieden. Um solche Beziehungen richtig aufzubauen gibt es das Konzept der Normalisierung.

> Die Normalisierung von relationalen Datenbanken ist ein Vorgehen, bei dem die Ausgangstabelle in mehrere kleine Tabellen zerlegt wird. Dann werden sie über Fremdschlüssel in Beziehung gesetzt. Ziel einer solchen Normalisierung ist das Erschaffen einer redundanzfreien Datenspeicherung, die Vermeidung von Anomalien, sowie die Erstellung eines klar strukturierten Datenbankmodells.
[@Nachhilfe-Team]

Der entscheidende Vorteil von RDBs ist, dass sie eine gemeinsame standardisierte Sprache für die Datenabfrage- und verarbeitung besitzen - SQL. In relationalen Datenbanken werden primär Informationen persistiert, welche auf längere Zeit vorhanden bleiben und auf die nicht in kurzen Zeitintervallen zugegriffen wird.

#### Zeitreihen Datenbanken

In einem zeitreihen basierten Datenbanksystem werden Daten mit einem korrespondierenden Zeitstempel versehen. In anderen Datenbanken ist das Speichern einer Zeitmarke per Wert zwar auch möglich, jedoch weist eine TSDB^[Time Series Database] jedem einzelnen Wert automatisch einen eindeutigen Timestamp zu und vermerkt den daraus resultierenden Datensatz in einer Historie. In dieser ist der gesamte zeitliche Verlauf des Attributs festgehalten.

Zeitreihen DBs sind optimiert auf viele schreib und lese Operationen und sind nicht auf das verändern bzw. löschen der Datensätze ausgelegt. Je nach Datenbankmanagementsystem (DBMS) können verschiedene Erfassungszeiträume und somit auch die Granularitiät des Timestamps definiert werden. Dies kann von Millisekunden bis hin zu Tagen gehen. Außerdem gibt es keine einheitliche Query-Sprache. In TSDBs werden Metriken, Sensordaten und generell Werte mit hoher Änderungsrate persistiert. [@Computerweekly]

Ein Sonderfall der TSDB ist die Round Robin Database (RRD). Diese löscht alte Datensets nach einer definierten Zeit und / oder aggregiert sie auf einen Wert zusammen. [@joojscript]

#### Visualisierung

> Datenvisualisierung ist der Prozess der Verwendung visueller Elemente wie Diagramme, Grafiken oder Karten zur Darstellung von Daten. Sie übersetzt komplexe, umfangreiche oder numerische Daten in eine visuelle Darstellung, die leichter zu verarbeiten ist.
[@aws-datenvisualisierung]

Um Rohdaten verständlich zu machen, im Kontext betrachten zu können und etwaige Korrelationen zwischen verschiedenen Datensets sichtbar zu machen, ist es notwendig, die oben genannten Methoden anzuwenden. Hierbei ist eine unkomplizierte Grafik als Endprodukt das Ziel.

![Beispiel Datenvisualisierung [@kaggle-weather-data]](img/Schrempf/Weather_Data_Set.png){width=100%}

Um solch ein Ergebnis zu erreichen, müssen vorhandene Daten bereinigt, gefiltert und ausgewählt werden. Beim Erstellen der Visualisierungen muss eine Verzerrung der Daten hinsichtlich Trivialisierung, Überspitzung und menschlichen Vorurteilen vermeiden werden. [@aws-datenvisualisierung]

### CI/CD

![CI/CD Ablauf [@bestarion]](img/Schrempf/CI_CD.png){width=100%}

Continuous Integration (CI) und Continuous Deployment (CD) ist ein Konzept, welches Entwicklerteams, dazu anregt, kontinuierlich und in kürzeren Abständen Dinge am Code zu ändern, diesen zu verbessern und zu automatisieren. Wie oben dargestellt, ist es ein nie endender Kreislauf. Man unterscheidet zwei Komponenten voneinander: Continuous integration und Continuous delivery.

Unter CI versteht man das tatsächliche Entwickeln, Testen und Hochladen des Codes in das Version Control System (VCS). Dies wird durch verschiedene Methoden und Prozesse erleichtert, wie zum Beispiel automatisches Testen des Programms oder agiles Projektmanagement.

Das Testen einer Applikation ist ein essenzieller Weg zum Erfolg. CI befasst sich unter anderem mit den Wegen, wie ich mein Programm auf besten Wege prüfen kann. Mit dieser Technologie wird der Grundstein für unter anderem automatisches Unit-, Integration-, Regression-, Performancetesten gelegt.

Unter CD versteht man das deployen von Software auf verschiedene Umgebungen. Hier fallen, wie oben angedeutet, Testumgebungen auch darunter, sowie Entwicklungsumgebungen und Produktivsysteme. Dieser ganze Prozess ist im nun komplett automatisiert und wird bei verschiedenen Events getriggert.[@bestarion]

Um dieses sehr mächtige Konzept voll auszuschöpfen werden Pipelines angelegt. Diese verrichten die Arbeit, welche ansonsten manuell verrichtet werden müsste. Hier ein kleiner Ausblick:

1. Definierte Tests aufsetzten und ausführen
2. Code packages erstellen
3. Verschiedene Umgebungen mittels Umgebungsvariablen vorbereiten
4. Code deployen
5. Versionen releasen

#### Docker

Um solch ein großes Konzept überhaupt realisieren zu können, muss man sich ein Stück weit von der bisherigen Softwareentwicklung lossagen. Hier kommen Microservices und die Containerization ins Spiel.

Microservices sind Teile eines Produkts. Früher gab es nur eine einzige große Software die mit ihren Teilen als ein Ganzes funktionierte. Heutzutage werden Teile identifiziert und jeder Baustein wird für sich issoliert programmiert. Dies bietet mehrere Vorteile. Bei einer konzeptionellen oder technischen Umstellung kann die einzelne Komponente leicht ausgetauscht und durch eine neue ersetzt werden. Außerdem ist die gesamte Software als auch einzelne Teile leicht Skallierbar. Jedes einzelne Element läuft in seiner dezidierten Umgebung, welche nur den Kernel mit dem OS teilt und deswegen auch unabhängig auf verschiedenen Systemen einsatzbereit ist. Solch ein dezidierte Umgebung besteht aus Systembibliotheken, Abhängikeiten, Umgebungsvariablen und eventuellen eigenproduzierten Code der zu hostenden Anwendung. Dies ist ein Container. Es gilt: Funktioniert der Container, und somit auch der in ihm definierte Microservice auf einem System, so tut er es auch überall anders. Außerdem können Container auch leicht in Clouds deployd und gehosted werden. Solch ein Aspekt ist vorallem in Zeiten immer stärker werdenden Cloud-Computings immer wichtiger. [@ibm-docker]

Ein Container benutzt die Virtualisierungstools des Linuxkernels um Ressourcen zu teilen und verwalten. Für nicht Unix-Betriebsysteme gibt es Software die den Linuxkernel simmulieren kann. Zum Beispiel WSL oder Hyper-V bei Windows. Durch die gemeinsame Nutzung des Kernels muss auch keine dezidierte Definition der benötigten Ressourcen stattfinden, da diese automatisch vom System alloziert werden. Das Konzept eines Containers ähnelt dem, einer VM. Nur mit dem wesentlichen Vorteil, dass kein komplett eigenes OS verwendet wird, sonern nur die Schritte zum produzieren eines gewissen Outputs angegeben werden. Container haben eine Abstraktionsebene zum Kernel, aber da eben kein eigenes Betriebsystem wie bei einer VM verwendet wird, gibt es auch ein marginales Sicherheitsrisiko. Malware könnte durch die gemeinsame Nutzung des Kernels eben auf diesen zugreifen und erheblichen Schaden anrichten. Um dem Vorzubeugen, gibt es etliche Third-Party Tools mit denene die Sicherheit über das schon gegebene Maß erhöht werden kann. [@ibm-docker]

Soweit so viel zum Allgemeinen der Virtualisierung. Doch was hat Docker damit zu tun? Docker ist ein Open Source Projekt, welches sich auf die Containerization spezialisiert hat. Es bietet einen riesigen freien Markt (Docker Hub) zur Erstellung und Distribution von Docker Images an. Ein Image ist das zuvor genannte Äquivalent zu der Definition eines Containers. Ein Image ist in Schichten aufgebaut und jede Schicht stellt einen neuen Zustand des Containers dar. Das vollständig ausgeführte und unter Umständen auch angepasste Image ist dann der laufende Container. Auf Basis eines Images können mehrere Container laufen. [@ibm-docker]

![Übersicht Container Security Tools [@docker-security]](img/Schrempf/Container_Security_Tools.png){width=100%}

Jedes Image wird in einem Dockerfile definiert. Hierbei spricht man nur von einer Datei, in welcher die Anweisungen zum Aufbau der Schichten gespeichert sind. Beim Starten des Containers interagiert die Docker CLI mit dem Dockerfile und führt die Anweisungen aus. Eine beliebte Variante ist es, ein schon bestehendes Image zu verwenden und seine eigene Applikation mit Schichten on top zu bauen. [@ibm-docker]

Docker compose ist eine Funktionalität von Docker. Es ermöglicht die Definition von mehreren Microservices in einer YAML-Konfigurationsdatei Namens ```compose.yml```. Hier wird ein Microservice nur Service genannt. Ein Service kann wieder als Dockerfile definiert werden oder sogar das Image vom Docker Hub benutzt und in der Datei bis zu einem gewissen Maß weiter spezialisiert werden. In der ```compose.yml``` werden Ports, Secrets, zu benutzende Volumes, Networks und die Anzahl der Container des Services beschrieben. Secrets sind Umgebungsvariablen die an den entstehenden Container weitergegeben werden. Volumes werden benutzt um fixe Daten, z.B. Code, in den Container oder Daten vom Container, z.B. Datenbanken, auf dem Hostsystem zu persistieren. Da nun mehrere Microservices zwar als Bausteine definiert werden, jedoch miteinander interagierene können um ein ganzes Konstrukt zu bilden, gibt es Networks. Über diese können Tasks, wie Containerübergreifende Datenkommunikation, realisiert werden. So sieht eine ```compose.yml``` Datei grundelegend aus:

```{caption="Beispiel eines docker compose files" .yml}
services:
  frontend:
    image: example/webapp
    ports:
      - "443:8043"
    networks:
      - front-tier
      - back-tier
    configs:
      - httpd-config
    secrets:
      - server-certificate

  backend:
    image: example/database
    volumes:
      - db-data:/etc/data
    networks:
      - back-tier

volumes:
  db-data:
    driver: flocker
    driver_opts:
      size: "10GiB"

configs:
  httpd-config:
    external: true

secrets:
  server-certificate:
    external: true

networks:
  front-tier: {}
  back-tier: {}
```

[@docker-compose]

Ein weitere Funktionalität von Docker ist Docker Swarm. Mit diesem Tool wird eine Orchestrierungsmöglichkeit für Anwendungen mit mehr als einem Host angeboten. Hierbei kann man die Anzahl der Container per Host angeben, wo welcher Container laufen soll und vieles mehr. Beschrieben wird das Verhalten des Swarms über eine leicht anders funktionierende Version der ```compose.yml```. Jedoch ist anzumerken, dass Docker Swarm, nicht so ausgereift und mehr so etwas in der Art wie ein Notbehelf aufgrund der Nachfrage ist. Für kontrollierte und ausführliche Ochestrierung wird ein explizit dafür ausgelegtes Framework, wie Kubernetes, empfohlen.
[@docker-swarm] [@circleci-blog]

#### Pipeline

Wie oben angedeuted, nehmen Pipelines dem Programmierer sehr viel arbeit ab. Verschiedene Plattformen haben verschiedene Möglichkeiten Pipelines zu benutzen, definieren und auszuführen. Beispiele wären Jenkins oder so wie es in dieser Ausarbeitung verwendet worden ist: GitHub. GitHub bietet GitHub Actions an. Hierbei schreibt man eine YAML-Datei in der steht, was wann wie geschehen soll und legt sie im Verzeichnis ```.github/workflows``` in seinem Repository ab.

Eine GitHub Action besteht aus folgenden Komponenten:

1. Event
   - Trigger für Workflow
2. Runner
   - Runtime Environment z.B. Ubuntu
3. Job
   - Der durch das Event getriggerte Workflow
4. Steps
   - Ein Workflow hat mehrere Steps
5. Action
   - Ein Step hat mehrere Actions
   - Was in diesen Step ausgeführt wird

Hier wird eine workflow.yml dargestellt, welche eine Java-Applikation beim Push-Event testet.

```{caption="Beispiel einer github action" .yaml}
name: Test

on:
  push:

permissions:
  contents: read
  actions: read

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: maven

      - name: Run Tests
        run: mvn clean test
```

### REST API

Eine API ist Programmierschnittstelle, die dafür entworfen worden ist, um autonomen Anwendungen das Kommunizieren und den Austausch von Daten zu erleichtern und zwischen ihnen zu standardisieren. REST steht für Representational State Transfer und ist ein Prinzip, welches verschieden umgesetzt werden kann, als Zwischendienst zwischen dem Client und dem Backend dient und als Schnitstelle zum Abrufen von Ressourcen vom Client and den Server verwendet wird. Hierbei nutzt man URIs. Ein Uniform Resource Identifier ist dafür da, eine Ressource eindeutig zu identifizieren. [vgl. @REST-API-Design-Rulebook, S. 11]

Bei RESTful APIs sendet der Client eine Anfrage über HTTP an eine URI und bekommt daraufhin seine Antwort. [@redhat-rest]
Die möglichen Anfragearten des Clients nennt man HTTP-Methodes und diese sind: [@mozilla-rest]

- GET
  - Ruft eine Ressource vom Server ab, ohne den Zustand der Ressource zu verändern.
- HEAD
  - Ruft nur die Header-Informationen einer Ressource ab, ohne den eigentlichen Inhalt.
- POST
  - Sendet Daten an den Server, um eine neue Ressource zu erstellen.
- PUT
  - Erstellt eine neue Ressource oder aktualisiert eine bestehende vollständig.
- DELETE
  - Löscht eine Ressource auf dem Server.
- OPTIONS
  - Ruft Informationen über die Kommunikationsoptionen mit dem Server ab.
  - Gibt zurück, welche HTTP-Methoden und Header von einer URI unterstützt werden.
- TRACE
  - Gibt die Anfrage so zurück, wie sie der Server erhalten hat.
- PATCH
  - Aktualisiert eine Ressource teilweise, ohne sie vollständig zu ersetzen.

#### Design

Es gibt zwar verschiedene Ansätze so eine API umzusetzen, jedoch gibt es Richtlinien und Best-Practices. Die Antwort des Servers and den Client sollte in JSON verfasst sein. Um die Skalierbarkeit der Anwendungen zu garantieren, ist eine Server nicht dazu verpflichtet, den Status einer Ressource sich zu merken. Diese Aufgabe obligt rein dem Client.
[vgl. @REST-API-Design-Rulebook, S. 3 f.]

Eine URI soll klar verständlich und strukturell aufklärend designed sein. Wenn man die URI begutachtet, soll genau ersichtlich sein, welche Ressource man bei Aufruf erhält. Der Aufbau ist in der RFC 3986 beschrieben unter dem Format:

```URI = scheme "://" authority "/" path [ "?" query ] [ "#" fragment ]```

**URI Namensregeln**:

- Ein / wird für hierachische Abhängikeiten benutzt
  - Ein / darf nicht am Ende einer URI stehen, da es sonst zu Verwirrung führen kann, ob eine neue Ressource anfängt oder nicht
- Zusammengesetzte Wörter sind mittels - zu trennen
  - Ein _ als Trennzeichen ist aufgrund der erschwerte Lesbarkeit zu vermeiden
- Groß- und Kleinschreibung
  - In Schema und Authority wird sie ignoriert
  - Im Path wird sie berücksichtigt
  - Um unnötige Probleme zu vermeiden soll die gesamte URI klein geschrieben werden
- File extensions dürfen nicht in in der URI vorkommen
- Widerspruchsfreie Namen für Subdomains.
- CRUD Namen dürfen in keinem Part der URI verwendet werden.
[vgl. @REST-API-Design-Rulebook, S. 11 - 13]

**URI Designregeln**:

- Jeder neue / bedeutet einen neuen Path und somit eine neue abfragbare Ressource.
  - Jeder einzelne Path beinhaltet eine abfragbare Ressource.
  - Paths sind mit Nomen zu benennen.
  - Paths bei denen nur ein Datenpunkt übermittelt wird, sind im Singular zu benennen.
    - Solche Paths werden Document genannt
  - Paths bei denen ein Set an Daten zurückgegeben wird, sind im Plural zu benennen.
    - Solche Paths werden Collection genannt
- Stores sind Path Variables und können anstelle eines Nomens eingesetzt werden.
  - Ein Store erzeugt keine neue URI.
  - Ein Store benennt eine Ressource in der URI.
  - Ein Store wird zur genauerene Identifikation / Spezifikation einer Ressource verwendet. (z.B. ID)
- Controller Elemente werden als letztes and die URI angehängt.
  - Sie können nicht den CRUD-Operationen zugeordnet werden.
  - Sie spiegeln aufrufbare Funktionen wider.
  - Verben sind für die Namensgebung zu verwenden.
- Eine URI soll im Schema ```{collection}/{store}/{document}``` aufgebaut sein.
[vgl. @REST-API-Design-Rulebook, S. 14 - 18]

**URI Optionals**:

- Queries dienen dazu, Daten anzugeben, die nicht strikt aneinander gekoppelt sind, jedoch miteinander korrelieren.
  - Der Inhalt der Base-URI darf sich nicht verändern durch das Weglassen eines Query-Parameters.
  - Sie werden auf Collections und Stores angewandt.
  - Sie dienen meistens zum Suchen / Filtern der Daten aus einer Ressource.
[vgl. @REST-API-Design-Rulebook, S. 19 f.]
- Fragemnts werden nach Queries angegeben und geben eine spezifische Sektion oder ein Element in der URI an.
  - Sie sind bei der Navigation auf der Webpage hilfreichn
  - Sie können die Status einer Webpage angeben / ändern  ohne diese neu laden zu müssen.
[@medium-uri-fragment]

Beispiele von URIs nach besprochenem Konzepten sind ```https://api.contrude.eu/sensors/42/7/temperature?latest=true``` oder ```https://contrude.eu/ships?user=123#page2```.

#### JavaScript

Mit Frameworks wie Node.js kann auch eine frontendorientierte Sprache wie JavaScript fürs Backend genutzt werden. Ein großer Vorteil von Node.js, welcher es auch attraktiv für API-Design macht, ist seine ereignisgesteuerte, nicht-blockierende Umsetzung. Dieses mächtige Framework bietet sehr viele Packages an, was auch die Entwicklung sehr modular gestaltet. Express ist ein Modul, welches den Prozess des API Programmierens erleichtert. Anzumerken ist jedoch, dass Express keine wirkliche Funktionalität für REST-Services anbietet, sondern nur das Erstellen von Routes (path + query + fragment) ermöglicht. In die Routes muss man die selbst progammierte Middleware einbinden, welche dann als Backend fungiert, weitere Funktionen aufruft, Prozesse startet oder direkt mit Datenbanken kommuniziert.

Um eine Node.js REST-Appp zu erstellen, muss man als erstes einen Ordner seiner Wahl als ein Node.js project initialisieren. Als Package-Manager wird hier NPM verwendet.

```{caption="Initialisieren eines Node.js Projekts" .cmd}
npm init
```

Danach können benötigte Packages installiert werden. In unserem fall Express.

```{caption="Installieren vom Express package" .cmd}
npm install express
```

Eine JS Datei mit folgendem Inhalt muss noch erstellt werden um einen REST-Express Server in der Node.js Anwendung zu starten:

```{caption="Beispiel für eine REST Schnitstelle in Node.js" .js}
import express from "express";

const app = express(); // lässt die App Express verwenden
const port = 80; // Port, auf dem der Server läuft

// Middleware
app.use(express.json());

// API-Routen
// Route, um eine JSON-Antwort bei einer GET-Anfrage an /hello zu senden
app.get("/hello", (req, res) => {
  res.status(200).json({ message: "Hello Express" });
});

// Starte den Server auf zuvor definiertem Port
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
```

Mit dem letzten Befehl

```{caption="Starten einer Node.js Applikation" .cmd}
node app.js
```

wird die Applikation gestarted und kann auf ```http://localhost:80/hello``` aufgerufen werden. [@medium-rest-node-js]

## Praktische Arbeit

### Datenspeicherung- und Visualisierung

#### MySQL

MySQL ist ein Open-Source RDBMS, welches von Oracle verwaltet wird. Diese DB wird stetig weiterentwickelt und ist sogar optimal in der Cloud hostbar. [@talend-mysql]

MySQL verwendet zwar keine Schemas wie andere DBMS, trotzdem kann man mehrere Datenbanken innerhalb einer MySQL Instanz erstellen und somit dieses Verhalten simulieren. Irreführend ist hierbei, dass man trotzdem eine **DATABASE** und **SCHEMA** erstellen kann, obwohl sie gleich behandelt werden. [@mysql-glosar] Um möglichst lange Support-Updates mittels LTS Versionen zu erhalten, wurde hier die MySQL 8 Version verwendet, obwohl sie offiziell noch nicht fertig ausprogrammiert ist. [@mysql-lts]

Um die in diesem Projekt verwendeten Datenbanken zu erstellen, wurden SQL-init-scripts geschrieben, welche die MySQL Instanz mit den notwendigen Tabellen initialisieren, User anlegen und Dummy Daten einfügen. Hierbei ist der Aufbau immer der gleiche:

\dirtree{%
.1 scripts.
.2 CreateDB.sql.
.2 CreateUser.sql.
.2 GrantPriveleges.sql.
.2 InsertDummyData.sql.
}

In `CreateDB.sql` ist die gesamte Struktur mitsamt  **DATABASE** und **SCHEMA** Erstellung geregelt. Anzumerken ist hier, dass **CHECK** Constraints schon in vorherigen Versionen semantisch akzeptiert, jedoch erst ab Version 8.0.16 tatsächlich umgesetzt wurden. [@mysql-8.0.16] Aufgrund dessen, und des später erklärten Microservice-Ansatzes, wurde für das gesamte Projekt die Verison 8.0.29 verwendet. Da eine Datenbank ohne Daten nur halb so viel wert ist und bei jeder einzelnen DB-Erstellung die Daten neu einzugeben sehr mühsälig werden kann, gibt es die `InsertDummyData.sql` Datei, in der die Probedaten in die DB eingfügt werden.

In `CreateUser.sql` werden die Benutzer samt ihrer Benutzergruppen und Berechtigungen erstellt. Diese Datei wurde für jede DB verwendet, da sich kein Sinn für eine Änderung der Benutzer ergab. Um den Code sicher pushen zu können, wurde ein vordefiniertes Einmapasswort für jeden Datenbankbenutzer festgelegt, welches beim ersten Login geändert werden muss. Zusätzlich wurde die Beschränkung eingeführt, dass das geänderte Passwort nicht gleich den letzten fünf sein darf. Zusätzlich darf jeder Benutzer, außer der API Benutzer, nur maximal 4 aktive Datenbankconnections gleichzeitig haben. Eingestellt wurde auch, dass eine SSL Zertifizierung, um die Sicherheit zu gewährleisten, von jedem DB-User beim Anmelden anzugeben ist. Dieses kann in den MySQL-Server eingespielt werden, wird aber auch automatisch bei Initialstart der DB generiert. Ein User wird mit 'name'@'bereich' erstellt. Wobei der Bereich der Gültigkeitsbereich des Users ist, somit kann man User auch nur für z.B. den localhost erstellen.

```{caption="Erstellen von Benutzergruppen und Benutzern in MySQL" .sql}
CREATE ROLE IF NOT EXISTS 'admin', 'developer', 'api';

CREATE USER IF NOT EXISTS 'BitSneak'@'%'
    IDENTIFIED WITH caching_sha2_password BY '123'
    DEFAULT ROLE admin
    REQUIRE SSL
    WITH MAX_USER_CONNECTIONS 4
    PASSWORD EXPIRE
    PASSWORD HISTORY 5;

CREATE USER IF NOT EXISTS 'Luca'@'%'
    IDENTIFIED WITH caching_sha2_password BY '123'
    DEFAULT ROLE developer
    REQUIRE SSL
    WITH MAX_USER_CONNECTIONS 4
    PASSWORD EXPIRE
    PASSWORD HISTORY 5;

CREATE USER IF NOT EXISTS 'Max'@'%'
    IDENTIFIED WITH caching_sha2_password BY '123'
    DEFAULT ROLE developer
    REQUIRE SSL
    WITH MAX_USER_CONNECTIONS 4
    PASSWORD EXPIRE
    PASSWORD HISTORY 5;

CREATE USER IF NOT EXISTS 'rest'@'%'
    IDENTIFIED WITH caching_sha2_password BY '123'
    DEFAULT ROLE api
    REQUIRE SSL
    PASSWORD EXPIRE
    PASSWORD HISTORY 5;
```

Um diesen Usern auch noch Rechte auf dem DBMS zu geben, gibt es die `GrantPriveleges.sql` Datei. Diese variiert pro Datenbank, da sie jeder Benutzergruppe ihre Rechte auf verschiedene Tabellen gibt. Doch der Anfangsteil ist immer der gleiche. Admins sollten vollen Zugriff erhalten und andere User erstellen und Rechte verteilen können, *ALL PRIVILEGES*, ebenso wie die Developer. Der einzige Unterschied ist jedoch, den Developern wird der Zugriff auf die Systeminterne DB, *sys*, verweigert. Der API sollen minimale Rechte für spezifische DBs gegeben werden.

```{caption="Zuweisen von Rollen zu Benutzergruppen in MySQL" .sql}
GRANT ALL PRIVILEGES ON *.* TO 'admin' WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON database.* TO 'developer';

FLUSH PRIVILEGES;
```

Es gibt verschiedene Sprachen auf der Welt. Jeder Sprache beinhaltet verschiedene Zeichen, die nicht immer mit jeden Character-Set kompatibel sind. Um auch diese Daten ordnungsgemäß zu persistieren, kann man die Character-Sets einer jeden Datenbank und sogar jeder Tabelle anpassen. Außerdem gibt es die Möglichkeit, dass man die Art und Weise, wie das System Daten miteinander vergleicht, beeinflusst. Dies wird Collation genannt. Hierbei beeinflusst man z.B. das Verhalten einer WHERE Klausel, in dem man sagt, er soll den zu vergleichenden Text case sensitive vergleichen. [@DB-character-set] Da Schiffe, die darauf gelagerten Container und deren Firmen aus verschiedenen Ländern kommen, wurde hier entschieden, das utf8mb4 (eine Erweiterung von UTF-8) Character Set und die dazugehörige Collation utf8mb4_0900_bin (0900 = Unicode Collation Algorithmus, bin =  Bitweises vergleichen) zu verwenden. [@mysql-character-set] Dies sieht dann wie folgt aus:

```{caption="Erstellen einer MySQL Datenbank mit abgeänderten Character Set und Collation" .sql}
CREATE DATABASE IF NOT EXISTS database DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
CREATE SCHEMA IF NOT EXISTS schema DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
```

##### Schiff

Jeder Container wird auf einem Schiff transportiert. Da ein Container im laufe seines Transports auf verschiedenen Schiffen sein kann und dementsprechend auch bewegt wird und auf verschiedenen Stellplätzen landet, ist es wichtig, nachzuvervolfgen, auf welchen Schiffen der Container war. In der hier gestalteten Datenbank wurden Schema für allgemeine Schiffdaten (`ship`), Zertifikate die das Schiff haben muss (`certificate`) und für die Herkunft des Transportmittels (`corporation`), angefertigt.

```{caption="Schiff-Datenbankaufbau" .sql}
CREATE DATABASE IF NOT EXISTS ship DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
CREATE SCHEMA IF NOT EXISTS certificate DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
CREATE SCHEMA IF NOT EXISTS corporation DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
```

**TODO**

- Was für Zertifikate hat ein Schiff vs. welche wurden hier implementiert (warum nicht alle die es gibt hier vertreten?)
  - Quellen sind gefunden, nur noch nicht eingefügt
- ERD

##### Container

Jeder Container besitzt verschieden Parameter, welche ihn ausmachen. Nicht nur seine Größe ist ausschalggebend, sondern auch seine Materialbeschaffenheiten, Tragfähigkeiten und Zulassungen. In der hier gestalteten Datenbank wurden Schema für allgemeine Containerdaten (`container`), Größenklassifikationen des Containers (`dimension`), Zertifikate die der Container haben muss (`certificate`) und für die Herkunft des Containers (`corporation`), angefertigt.

```{caption="Container-Datenbankaufbau" .sql}
CREATE DATABASE IF NOT EXISTS container DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
CREATE SCHEMA IF NOT EXISTS certificate DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
CREATE SCHEMA IF NOT EXISTS corporation DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
CREATE SCHEMA IF NOT EXISTS dimension DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
```

**TODO**

- Was für Zertifikate hat ein Container und warum wurden sie hier implementiert
  - Quellen sind gefunden, nur noch nicht eingefügt
- ERD

##### Grenznwerte

In dieser Ausarbeitung geht es um die Überwachung eines Containers. Diese Datenbank dient dem Zweck, um nicht nur dessen Messwerte auszulesen, sondern auch um zu definieren, wann ein kritischer Wert erreicht worden ist. In der hier gestalteten DB wurde ein Schema für die Grenzwerte (`threshold`) angefertigt. Ein Grenzwert wird mit seinem Bereich in dem er gültig ist, seinem Erwartungswert, in welchen Bereich um den Erwartungswert der gelieferte Wert sein soll und die Priorität des angegebenen Limits definiert.

```{caption="Grenzwert-Datenbankaufbau" .sql}
CREATE DATABASE IF NOT EXISTS threshold DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
```

**TODO**

- ERD

##### User

Um ein praktikable UI bieten zu können, muss diese eine Login-Funktion beinhalten. Userdetails müssen persistiert werden und die Datenbank dazu hat Schema für allgemeine Userdaten und dessen Tokens (`user`), Organisationsdaten des Benutzers (`corporation`) und die Rechte die der Anwender in der Applikation hat (`privilege`).

```{caption="Benutzer-Datenbankaufbau" .sql}
CREATE DATABASE IF NOT EXISTS user DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
CREATE SCHEMA IF NOT EXISTS corporation DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
CREATE SCHEMA IF NOT EXISTS privilege DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
```

**TODO**

- ERD

#### InfluxDB

#### Grafana

### CI/CD

#### Server

#### Docker

#### GitHub Action

### REST API

#### JavaScript
