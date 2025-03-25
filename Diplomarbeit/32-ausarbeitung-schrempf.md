# Teilaufgabe Schüler Schrempf

\textauthor{Marko Daniel Schrempf}

## Theorie

### Datenspeicherung und Visualisierung

Eine Datenbank ermöglicht die Speicherung und Verwaltung von zusammenhängenden Daten. Hier können große Datenmengen übersichtlich abgebildet werden. Es gibt verschiedenste Datenbankkonzepte, welche auf ihre eigene Art und Weise Vor- und Nachteile bringen. Diese Ausarbeitung konzentriert sich auf zwei funktional unterschiedliche Ansätze.

#### Relationale Datenbanken

In einem relationalen Datenbanksystem werden Daten in Form von Tabellen gespeichert. Jede Tabelle hat eine Relation zu einer anderen Tabelle, entweder inhaltlich oder strukturell. Durch diese Beziehungen, wenn sie richtig definiert sind, werden Redundanzen vermieden. Um solche Beziehungen richtig aufzubauen, gibt es das Konzept der Normalisierung.

> Die Normalisierung von relationalen Datenbanken ist ein Vorgehen, bei dem die Ausgangstabelle in mehrere kleine Tabellen zerlegt wird. Dann werden sie über Fremdschlüssel in Beziehung gesetzt. Ziel einer solchen Normalisierung ist das Erschaffen einer redundanzfreien Datenspeicherung, die Vermeidung von Anomalien, sowie die Erstellung eines klar strukturierten Datenbankmodells. [@Nachhilfe-Team]

Der entscheidende Vorteil von RDBs^[Relationale Datenbank] ist, dass sie eine gemeinsame standardisierte Sprache für die Datenabfrage und -verarbeitung besitzen - SQL^[Structured Query Language]. In relationalen Datenbanken werden primär Informationen persistiert, welche über längere Zeit vorhanden bleiben und auf die nicht in kurzen Zeitintervallen zugegriffen wird.

#### Zeitreihen Datenbanken

In einem zeitreihenbasierten Datenbanksystem werden Daten mit einem korrespondierenden Zeitstempel versehen. In anderen Datenbanken ist das Speichern einer Zeitmarke per Wert zwar auch möglich, jedoch weist eine TSDB^[Time Series Database] jedem einzelnen Wert automatisch einen eindeutigen Timestamp zu und vermerkt den daraus resultierenden Datensatz in einer Historie. In dieser ist der gesamte zeitliche Verlauf des Attributs festgehalten.

Zeitreihen DBs^[Datenbank] sind optimiert auf viele Schreib- und Leseoperationen und sind nicht auf das Verändern bzw. löschen der Datensätze ausgelegt. Je nach DBMS^[Datenbankmanagementsystem] können verschiedene Erfassungszeiträume und somit auch die Granularität des Timestamps definiert werden. Dies kann von Millisekunden bis zu Tagen reichen. Außerdem gibt es keine einheitliche Query-Sprache. In TSDBs werden Metriken, Sensordaten und generell Werte mit hoher Änderungsrate persistiert. [@Computerweekly]

Ein Sonderfall der TSDB ist die RRD^[Round Robin Database]. Diese löscht alte Datensets nach einer definierten Zeit und / oder aggregiert sie auf einen Wert zusammen. [@joojscript]

#### Visualisierung

> Datenvisualisierung ist der Prozess der Verwendung visueller Elemente wie Diagramme, Grafiken oder Karten zur Darstellung von Daten. Sie übersetzt komplexe, umfangreiche oder numerische Daten in eine visuelle Darstellung, die leichter zu verarbeiten ist.
[@aws-datenvisualisierung]

Um Rohdaten verständlich zu machen, im Kontext betrachten zu können und etwaige Korrelationen zwischen verschiedenen Datasets sichtbar zu machen, ist es notwendig, die oben genannten Methoden anzuwenden. Hierbei ist eine Grafik als Endprodukt das Ziel.

![Beispiel einer Datenvisualisierung von Mittelwerten einer Temperaturaufzeichnung  [@kaggle-weather-data]](img/Schrempf/weather-data-set.png){width=100%}

Um ein solches Ergebnis zu erreichen, müssen vorhandene Daten bereinigt, gefiltert und ausgewählt werden. Beim Erstellen der Visualisierungen muss eine Verzerrung der Daten hinsichtlich Trivialisierung, Überspitzung und menschlicher Vorurteile vermieden werden. [@aws-datenvisualisierung]

### Datenübertragung

#### Reverse Proxy

Ein Reverse Proxy ist zwischen den ins Internet freigeschalteten Services und dem Internet. Somit kommuniziert ein Client nicht direkt mit den Services, sondern muss zuerst über den Reverse Proxy laufen. Dies hat mehrere Vorteile. Die Anwendungen sind nicht direkt dem Internet ausgesetzt, was eine zusätzliche Sicherheitsebene einführt, da nie die Server-IP(s), sondern nur die des Reverse Proxies ersichtlich sind. Load-Balancing ist ein weiterer Aspekt einer solchen Software. Es beschreibt den Vorgang des Aufteilens der Anfragen an verschiedene Server, die aber nach außen hin als ein einziger agieren. Somit können überlastungsbedingte Ausfälle vermieden werden. Wenn mehrere Benutzer den gleichen Inhalt abfragen wollen, kann dieser zur Leistungsverbesserung zwischengespeichert werden - Caching genannt. Diese Aufgabe kann auch übernommen werden. [@reverse-proxy]

![Funktionsweise eines Reverse Proxies [@tls]](img/Schrempf/reverse-proxy.png){width=100%}

Niemand will seine Daten unverschlüsselt versenden. Eine oft in Kombination angebotene Lösung: SSL^[Secure Sockets Layer] bzw. TLS^[Transport Layer Security]. [@reverse-proxy] SSL ist der namentliche Vorgänger von TLS und ermöglicht das S in HTTPS^[Hypertext Transfer Protocol Secure]. Bei SSL wird ein Handshake zwischen den Geräten durchgeführt, der beweisen soll, dass sie auch die sind, für die sie sich ausgeben. Außerdem werden die Daten verschlüsselt und digital signiert. TLS hieß es erst seit dem, dass nicht nur die IETF^[Internet Engineering Task Force], sondern auch Netscape daran mitentwickelt haben. Beide funktionieren mit einem asymmetrischen Kryptosystem. [@ssl] [@tls]

![Funktionsweise eines TLS Handshakes [@tls]](img/Schrempf/tls-ssl-handshake.png){width=100%}

#### MQTT

MQTT^[Message Queuing Telemetry Transport] ist ein Nachrichtenprotokoll, das dazu verwendet wird, um mit nicht stabilen Netzwerken oder mit Netzwerken mit begrenzten Ressourcen zu kommunizieren. Es basiert auf der Publisher-Subscriber-Architektur. Der Publisher sendet seine Daten an den Broker zu einem gewissen Topic. Diese kann man semantisch aneinanderreihen, um Subkategorien eines Themas zu erstellen. Man kann es sich als eine Baumstruktur vorstellen. Für ein komplett neues Thema wird ein neues Topic erstellt. Hierbei ist zu beachten, dass ein Hashtag als Platzhalter inmitten eines Pfades dienen kann. Ein Beispiel für solch eine Baumstruktur ist `town/house/kitchen`. Unter diesem Topic können nun ein oder mehrere Werte im JSON^[JavaScript Object Notation]-Format abgelegt werden. Beim Broker werden dann die Werte abgelegt. Ein Topic kann auch ein oder mehrere Tags haben. Diese sind Flags, die zur weiteren Klassifizierung des Topics an es angehängt werden können. Ein Subscriber ist ein beliebiger Akteur, welcher den abgespeicherten Datensatz unter der Angabe des Topics extrahiert. [@mqtt-hivemq]

![Beispiel MQTT Topic Structure [@mqtt-hivemq]](img/Schrempf/mqtt-topic-structure.png){width=30%}

#### JSON Web Token

JWTs^[JSON Web Token] sind mit nach dem Standard RFC 7519 normiert. Sie dienen dazu, Tokens, also Schlüssel, zur Authentifizierung zu erstellen. Sie sind sehr kompakt und können deshalb gut in HTTP-Headers transportiert werden und enthalten Informationen zu den betroffenen Benutzern. Durch die in ihnen gespeicherten Informationen vermindert man die Anfragen, welche an die Datenbanken gestellt werden müssen. Sie werden dafür genutzt, um den Zugriff auf Dienste zu regulieren oder verschlüsselt Daten auszutauschen. [@jwt]

Ein JSON Web Token besteht aus drei Teilen, die durch Punkte getrennt werden und im Base64 Format vorliegen. Der Header, die Payload und die Signatur. Somit folgt dieser Token der Form `xxxxx.yyyyy.zzzzz`. Im Header wird der Typ des Tokens (JWT) und der benutzte Hashingalgorithmus angegeben. In der Payload werden die zu haltenden Daten angegeben. Die Signatur dient dazu, zu verifizieren, dass der Absender/Ersteller des Tokens der ist, für den er sich ausgibt. Sie besteht aus dem gehashten addierten Werten des Headers, Payloads und eines Secrets. Das Secret dient als eine Art Salt, welches zur Garantie der Eindeutigkeit beigefügt wird. Ein Salt ist eine Zeichenkette, welche der Hashalgorithmus mathematisch verschränkt in das Endprodukt einbindet. [@jwt]

```{caption="HMAC SHA256 Signatur eines JWT" .json}
HMACSHA256(
  base64UrlEncode(header) + '.' +
  base64UrlEncode(payload),
  secret)
```

Funktionsweise: Am Anfang gibt der Benutzer seine Logindaten an. Vorzugsweise Benutzername und Passwort. Nun wird ihm nach erfolgreicher Authentifizierung der Token zurückgegeben, den er bei den Protected Routes im Authorization-Header der Anfrage mitführen muss. Ein JWT ist stateless, was bedeutet, dass der Status des Benutzers nicht auf dem Server vermerkt ist. [@jwt] Da solch ein Token eine gewisse Macht mit sich bringt, ist stets zu beachten, dass die Tokens auch nur eine gewisse Zeit, meistens 10 bis 15 Minuten, gültig sind. [@medium-auth-simple]

![JWT Authentikationsablauf [@jwt]](img/Schrempf/jwt-auth-process.png){width=100%}

### Continuous Integration und Continuous Deployment

![CI / CD Ablauf [@bestarion]](img/Schrempf/ci-cd.png){width=100%}

CI / CD^[Continuous Integration und Continuous Deployment] ist ein Konzept, welches Entwicklerteams, dazu anregt, kontinuierlich und in kürzeren Abständen Dinge am Code zu ändern, diesen zu verbessern und zu automatisieren. Wie oben dargestellt, ist es ein nie endender Kreislauf. Man unterscheidet zwei Komponenten voneinander: Die Continuous Integration und das Continuous Delivery.

Unter CI^[Continuous Integration] versteht man das tatsächliche Entwickeln, Testen und Hochladen des Codes in das VCS^[Version Control System]. Dies wird durch verschiedene Methoden und Prozesse erleichtert, wie zum Beispiel das automatisches Testen des Programms oder agiles Projektmanagement. Das Testen einer Applikation ist ein essenzieller Weg zum Erfolg. CI befasst sich unter anderem mit den Ansätzen, wie ich mein Programm auf bestem Wege prüfen kann. Mit dieser Technologie wird der Grundstein für unter anderem automatisches Unit-, Integrations-, Regression-, Performancetesten gelegt.

Unter CD^[Continuous Deployment] versteht man das deployen von Software auf verschiedene Umgebungen. Hier fallen, wie oben angedeutet, Testumgebungen auch darunter, sowie Entwicklungsumgebungen und Produktivsysteme. Dieser ganze Prozess ist nun komplett automatisiert und wird bei verschiedenen Events getriggert.[@bestarion]

Um dieses sehr mächtige Konzept voll auszuschöpfen, werden Pipelines angelegt. Diese verrichten die Arbeit, welche ansonsten manuell verrichtet werden müsste. Hier ein kleiner Ausblick:

1. Definierte Tests aufsetzten und ausführen
2. Code packages erstellen
3. Verschiedene Umgebungen mittels Umgebungsvariablen vorbereiten
4. Code deployen
5. Versionen releasen

#### Docker

Um solch ein großes Konzept überhaupt realisieren zu können, muss man sich ein Stück weit von der bisherigen Softwareentwicklung lossagen. Hier kommen Microservices und die Containerization ins Spiel.

Microservices sind Teile eines Produkts. Früher gab es nur einen einzigen großen Softwaremonolithen, welcher mit seinen Teilen als ein großes Ganzes funktionierte. Heutzutage werden Teile identifiziert und jeder Baustein wird für sich isoliert programmiert. Dies bietet mehrere Vorteile. Bei einer konzeptionellen oder technischen Umstellung kann die einzelne Komponente leicht ausgetauscht und durch eine neue ersetzt werden. Außerdem ist die gesamte Software als auch einzelne Teile leicht Skallierbar. Jedes einzelne Element läuft in seiner dedizierten Umgebung, welche nur den Kernel mit dem OS^[Operating System] teilt und deswegen auch unabhängig auf verschiedenen Systemen einsatzbereit ist. Solch ein dezidierte Umgebung besteht aus Systembibliotheken, Abhängigkeiten, Umgebungsvariablen und eventuell eigenproduziertem Code der zu hostenden Anwendung. Dies ist ein Container. Es gilt: Funktioniert der Container, und somit auch der in ihm definierte Microservice auf einem System, so tut er es auch überall anders. Außerdem können Container auch leicht in Clouds deployed und gehosted werden. Solch ein Aspekt ist vor allem in Zeiten immer stärker werdenden Cloud-Computings immer wichtiger. [@ibm-docker]

Ein Container benutzt die Virtualisierungstools des Linuxkernels um Ressourcen zu teilen und verwalten. Für nicht Unix-Betriebsysteme gibt es Software die den Linuxkernel simmulieren kann. Zum Beispiel WSL^[Windows-Subsystem für Linux] oder Hyper-V bei Windows. Durch die gemeinsame Nutzung des Kernels muss auch keine dezidierte Definition der benötigten Ressourcen stattfinden, da diese automatisch vom System alloziert werden. Das Konzept eines Containers ähnelt dem, einer VM^[Virtuelle Maschine]. Nur mit dem wesentlichen Vorteil, dass kein komplett eigenes OS verwendet wird, sondern nur die Schritte zum produzieren eines gewissen Outputs angegeben werden. Container haben eine Abstraktionsebene zum Kernel, aber da eben kein eigenes Betriebsystem wie bei einer VM verwendet wird, gibt es auch ein marginales Sicherheitsrisiko. Malware könnte durch die gemeinsame Nutzung des Kernels eben auf diesen zugreifen und erheblichen Schaden anrichten. Um dem Vorzubeugen, gibt es etliche Third-Party Tools mit denene die Sicherheit über das schon gegebene Maß erhöht werden kann. [@ibm-docker]

![Übersicht von Container Security Tools [@docker-security]](img/Schrempf/container-security-tools.png){width=100%}

Soweit zum Allgemeinen der Virtualisierung. Doch was hat Docker damit zu tun? Docker ist ein Open Source Projekt, welches sich auf die Containerization spezialisiert hat. Es bietet einen riesigen freien Markt (Docker Hub) zur Erstellung und Distribution von Docker Images an. Es wird so verwaltet, dass es verschiedene Registries gibt. Pro Registry gibt es verschiedenen Versionen eines Images. Ein Registry wird mit username/image-name benannt. Ein Image ist das zuvor genannte Äquivalent zur Definition eines Containers. Ein Image ist in Schichten aufgebaut und jede Schicht stellt einen neuen Zustand des Containers dar. Das vollständig ausgeführte und unter Umständen auch angepasste Image ist dann der laufende Container. Auf Basis eines Images können mehrere Container laufen. [@ibm-docker] Jedes Image hat einen Entrypoint. In diesem wird spezifiziert, was geschehen soll, wenn der Container (zum ersten Mal) gestartet wird.

Jedes Image wird in einem `Dockerfile` definiert. Hierbei spricht man von einer Datei, in welcher die Anweisungen zum Aufbau der darin enthaltenen Schichten gespeichert sind. Beim Starten des Containers interagiert die Docker-CLI^[command line interface] mit dem `Dockerfile` und führt die Anweisungen aus. Eine beliebte Variante ist es, ein schon bestehendes Image zu verwenden und die eigene Applikation mit Schichten on top zu bauen. [@ibm-docker]

Ein `Dockerfile` ist sehr vielseitig und bietet verschiedene Funktionen. Eine sehr wichtige Funktion sind Secrets. Diese stehen für Platzhalter, in die der Anwender Werte eingibt, welche im weiteren Programmablauf benötigt werden. Oftmals werden sie als Umgebungsvariablen realisiert. Eine wichtige Eigenschaft solch einer Einheit ist, dass sie ein eigenes System ist, welches unabhängig vom Host existiert. Dementsprechend gehen im Container gespeicherte Daten und Änderungen verloren, wenn dieser heruntergefahren wird. Um dieses Problem zu beheben, gibt es Volumes. Sie dienen dazu, Daten in den Container, z.B. Code, und aus ihm heraus, z.B. Datenbanken, zu bekommen. Um aus dem Cotnainer heraus kommunizieren zu können, muss ein Portforwarding zwischen Host und Cotnainer eingestellt werden.

![Containerschichten [@docker-image-layers]](img/Schrempf/container-layers-overview.png){width=80%}

![Übersicht vom Containeraufbau [@container-overview]](img/Schrempf/container-infrastructure-overview.png){width=80%}

Ein Beispiel solch eines Dockerfiles ist hier zu sehen. Es baut auf dem schon bestehenden Ubuntu-Image auf, installiert Python, fügt eine Datei hinzu, schaltet die benötigten Ports frei und führt das Python-Script aus. [@docker-dockerfile]

```{caption="Beispiel eines Dockerfiles" .yml}
# syntax=docker/dockerfile:1
FROM ubuntu:22.04

# install app dependencies
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip install flask==3.0.*

# install app
COPY hello.py /

# final configuration
ENV FLASK_APP=hello
EXPOSE 8000
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "8000"]
```

[@docker-dockerfile]

Docker Compose ist eine Funktionalität von Docker. Es ermöglicht die Definition mehrerer Microservices in einer YAML^[yet another markup language]-Konfigurationsdatei namens `compose.yml`. Hier wird ein Microservice nur Service genannt. Ein Service kann wieder als Dockerfile definiert werden oder sogar das Image vom Docker Hub verwenden und in der Datei bis zu einem gewissen Maß weiter spezialisiert werden. In der `compose.yml` werden Ports, Secrets, zu benutzende Volumes, Networks und die Anzahl der Container des Services beschrieben. Da nun mehrere Microservices zwar als Bausteine definiert werden, jedoch miteinander interagieren können um ein ganzes Konstrukt zu bilden, gibt es die sogenannten Networks. Über diese können Tasks, wie Containerübergreifende Datenkommunikation, realisiert werden. So sieht eine `compose.yml`-Datei grundelegend aus: [@docker-compose]

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

Eine weitere Funktionalität von Docker ist Docker Swarm. Mit diesem Tool wird eine Orchestrierungsmöglichkeit für Anwendungen mit mehr als einem Host angeboten. Hierbei kann man die Anzahl der Container pro Host angeben, wo welcher Container laufen soll und vieles mehr. Das Verhalten des Swarms wird über eine leicht anders funktionierende Version der `compose.yml` beschrieben. Jedoch ist anzumerken, dass Docker Swarm nicht so ausgereift ist und eher wie ein Notbehelf aufgrund der Nachfrage wirkt. Für kontrollierte und ausführliche Orchestrierung wird ein explizit dafür ausgelegtes Framework, wie Kubernetes, empfohlen.
[@docker-swarm] [@circleci-blog]

#### Pipeline

Wie oben angedeutet, nehmen Pipelines dem Programmierer sehr viel Arbeit ab. Verschiedene Plattformen haben verschiedene Möglichkeiten Pipelines zu benutzen, definieren und auszuführen. Beispiele wären Jenkins, oder so wie es in dieser Ausarbeitung verwendet worden ist: GitHub. GitHub bietet GitHub Actions an. Hierbei schreibt man eine YAML-Datei, in der steht, was wann wie geschehen soll und legt sie im Verzeichnis `.github/workflows` in seinem Repository ab. Wenn die Action ausgelöst wird, startet GitHub eine VM mit dem unter dem Tag `runs-on` definierten Betriebssystem, welche die weiteren Tasks ausführt.

Eine GitHub Action besteht aus folgenden Komponenten:

1. Event
   - Trigger für Workflow
2. Runner
   - Runtime Environment z.B. Ubuntu
3. Job(s)
   - Die durch das Event getriggerten Workflows
4. Steps
   - Ein Workflow hat mehrere Steps
5. Action
   - Ein Step hat mehrere Actions
   - Was in diesen Step ausgeführt wird

Hier wird eine workflow.yml dargestellt, welche eine Java-Applikation beim Push-Event testet.

```{caption="Beispiel einer GitHub Action" .yaml}
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

Weitere mögliche automatisierte Anwendungsfälle sind:

- Einen Release bei Softwareänderungen erstellen
  - Eine App auf dem Google- bzw. Apple Store hochladen
- Den geänderten Code auf dem Produktivsystem updaten
  - Docker Images updaten und hochladen
  - Pullen der neuen Images auf dem Server

### REST API

Eine API^[Application Programming Interface] ist eine Programmierschnittstelle, die dafür entworfen wurde, um autonomen Anwendungen das Kommunizieren und den Austausch von Daten zu erleichtern und zwischen ihnen zu standardisieren. REST^[Representational State Transfer] ist ein Prinzip, das verschieden umgesetzt werden kann, als Zwischendienst zwischen dem Client und dem Backend dient und als Schnittstelle zum Abrufen von Ressourcen vom Client an den Server verwendet wird. Hierbei nutzt man URIs^[Uniform Resource Identifier]. Ein Uniform Resource Identifier dient dazu, eine Ressource eindeutig zu identifizieren. [vgl. @REST-API-Design-Rulebook, S. 11]

Bei RESTful APIs sendet der Client eine Anfrage über HTTP^[Hypertext Transfer Protocol] an eine URI und erhält daraufhin seine Antwort. [@redhat-rest] Die möglichen Anfragearten des Clients nennt man HTTP-Methoden und diese sind: [@mozilla-rest]

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

Es gibt zwar verschiedene Ansätze so eine API umzusetzen, jedoch gibt es Richtlinien und Best-Practices. Die Antwort des Servers an den Client sollte in JSON verfasst sein. Um die Skalierbarkeit der Anwendungen zu garantieren, ist eine Server nicht dazu verpflichtet, den Status einer Ressource sich zu merken. Diese Aufgabe obliegt ausschließlich dem Client.
[vgl. @REST-API-Design-Rulebook, S. 3 f.]

Eine URI soll klar verständlich und strukturell aufklärend designed sein. Wenn man die URI begutachtet, soll genau ersichtlich sein, welche Ressource man bei Aufruf erhält. Der Aufbau ist in der RFC 3986 beschrieben unter dem Format:

`URI = scheme "://" authority "/" path [ "?" query ] [ "#" fragment ]`

**URI Namensregeln**:

- Ein Schrägstrich wird für hierarchische Abhängigkeiten benutzt
  - Ein Schrägstrich darf nicht am Ende einer URI stehen, da es sonst zu Verwirrung führen kann, ob eine neue Ressource anfängt oder nicht
- Zusammengesetzte Wörter sind mittels - zu trennen
  - Ein Unterstrich als Trennzeichen ist aufgrund der erschwerten Lesbarkeit zu vermeiden
- Groß- und Kleinschreibung
  - In Schema und Authority wird sie ignoriert
  - Im Path wird sie berücksichtigt
  - Um unnötige Probleme zu vermeiden soll die gesamte URI klein geschrieben werden
- File extensions dürfen nicht in in der URI vorkommen
- Widerspruchsfreie Namen für Subdomains
- CRUD^[Create, Read, Update, Delete] Bezeichner dürfen in keinem Teil der URI verwendet werden.
[vgl. @REST-API-Design-Rulebook, S. 11 - 13]

**URI Designregeln**:

- Jeder neue Schrägstrich bedeutet einen neuen Path und somit eine neue abfragbare Ressource.
  - Jeder einzelne Path beinhaltet eine abfragbare Ressource.
  - Paths sind mit Nomen zu benennen.
  - Paths bei denen nur ein Datenpunkt übermittelt wird, sind im Singular zu benennen.
    - Solche Paths werden Document genannt
  - Paths bei denen ein Set an Daten zurückgegeben wird, sind im Plural zu benennen.
    - Solche Paths werden Collection genannt
- Stores sind Path Variables und können anstelle eines Nomens eingesetzt werden.
  - Ein Store erzeugt keine neue URI.
  - Ein Store benennt eine Ressource in der URI.
  - Ein Store wird zur genaueren Identifikation / Spezifikation einer Ressource verwendet. (z.B. ID)
- Controller Elemente werden als letztes and die URI angehängt.
  - Sie können nicht den CRUD-Operationen zugeordnet werden.
  - Sie spiegeln aufrufbare Funktionen wider.
  - Verben sind für die Namensgebung zu verwenden.
- Eine URI soll im Schema `{collection}/{store}/{document}` aufgebaut sein.
[vgl. @REST-API-Design-Rulebook, S. 14 - 18]

**URI Optionals**:

- Queries dienen dazu, Daten anzugeben, die nicht strikt aneinander gekoppelt sind, jedoch miteinander korrelieren.
  - Der Inhalt der Base-URI darf sich nicht durch das Weglassen eines Query-Parameters verändern.
  - Sie werden auf Collections und Stores angewandt.
  - Sie dienen meistens zum Suchen / Filtern der Daten aus einer Ressource.
[vgl. @REST-API-Design-Rulebook, S. 19 f.]
- Fragemnts werden nach Queries angegeben und geben eine spezifische Sektion oder ein Element in der URI an.
  - Sie sind bei der Navigation auf der Webseite hilfreich
  - Sie können die Status einer Webseite angeben / ändern  ohne diese neu laden zu müssen.
[@medium-uri-fragment]

Beispiele von URIs nach besprochenem Konzepten sind `https://api.contrude.eu/sensors/42/7/temperature?latest=true` oder `https://contrude.eu/ships?user=123#page2`.

#### JavaScript

Mit Frameworks wie Node.js kann auch eine frontendorientierte Sprache wie JavaScript fürs Backend genutzt werden. Ein großer Vorteil von Node.js, welcher es auch attraktiv für API-Design macht, ist seine ereignisgesteuerte, nicht-blockierende Umsetzung. Dieses mächtige Framework bietet sehr viele Packages an, was auch die Entwicklung sehr modular gestaltet. Express ist ein Modul, welches den Prozess des API Programmierens erleichtert. Anzumerken ist jedoch, dass Express keine tatsächliche Funktionalität für REST-Services anbietet, sondern nur das Erstellen von Routes (path + query + fragment) ermöglicht. In die Routes muss man die selbst programmierte Middleware einbinden, welche dann als Backend fungiert, weitere Funktionen aufruft, Prozesse startet oder direkt mit Datenbanken kommuniziert.

Um eine Node.js REST-App zu erstellen, muss man als erstes einen Ordner seiner Wahl als ein Node.js project initialisieren. Als Package-Manager wird hier NPM^[Node Package Manager] verwendet.

```{caption="Initialisieren eines Node.js Projekts" .cmd}
  npm init
```

Danach können benötigte Packages installiert werden. In unserem Fall Express.

```{caption="Installieren vom Express package" .cmd}
npm install express
```

Eine JS^[JavaScript]-Datei mit folgendem Inhalt muss noch erstellt werden, um einen REST-Express-Server in der Node.js Anwendung zu starten:

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

wird die Applikation gestartet und kann auf `http://localhost:80/hello` oder mittels cURL^[Client URL] und `curl localhost/hello` aufgerufen werden. [@medium-rest-api]

Das JSON, welches beim aufrufen des Endpoints ausgegeben wird, sieht so aus:

```{caption="Ausgabe eines Beispiel-REST-Endpoints" .json}
{
  "message": "Hello Express"
}
```

## Praktische Arbeit

### Datenspeicherung und Visualisierung

#### MySQL

MySQL ist ein Open-Source RDBMS, welches von Oracle verwaltet wird. Diese DB wird stetig weiterentwickelt und ist sogar optimal in der Cloud hostbar. [@talend-mysql]

MySQL verwendet zwar keine Schemas wie andere DBMS, jedoch kann man innerhalb einer MySQL-Instanz mehrere Datenbanken erstellen, was ein ähnliches Verhalten wie bei anderen DBMS erzielt. Irreführend ist hierbei, dass man trotzdem eine **DATABASE** und **SCHEMA** erstellen kann, obwohl sie gleich behandelt werden. [@mysql-glosar] Um möglichst lange Support-Updates mittels LTS^[Long Term Support] Versionen zu erhalten, wurde hier die MySQL 8 Version verwendet, obwohl sie offiziell noch nicht fertig ausprogrammiert ist. [@mysql-lts]

Um die in diesem Projekt verwendeten Datenbanken zu erstellen, wurden SQL-init-scripts geschrieben, welche die MySQL Instanz mit den notwendigen Tabellen initialisieren, User anlegen und Dummy Daten einfügen. Hierbei ist der Aufbau immer der gleiche:

\dirtree{%
.1 scripts.
.2 CreateDB.sql.
.2 CreateUser.sql.
.2 GrantPriveleges.sql.
.2 InsertDummyData.sql.
}

In `CreateDB.sql` ist die gesamte Struktur mitsamt  **DATABASE** und **SCHEMA** Erstellung geregelt. Anzumerken ist hier, dass **CHECK** Constraints schon in vorherigen Versionen semantisch akzeptiert, jedoch erst ab Version 8.0.16 tatsächlich umgesetzt wurden. [@mysql-8.0.16] Aufgrund dessen, und des später erklärten Microservice-Ansatzes, wurde für das gesamte Projekt die Verison 8.0.29 verwendet. Da eine Datenbank ohne Daten nur halb so viel wert ist und bei jeder einzelnen DB-Erstellung die Daten neu einzugeben sehr mühsälig werden kann, gibt es die `InsertDummyData.sql` Datei, in der die Probedaten in die DB eingfügt werden.

In `CreateUser.sql` werden die Benutzer samt ihrer Benutzergruppen und Berechtigungen erstellt. Diese Datei wurde für jede DB verwendet, da sich kein Sinn für eine Änderung der Benutzer ergab. Um den Code sicher pushen zu können, wurde ein vordefiniertes Einmapasswort für jeden Datenbankbenutzer festgelegt, welches beim ersten Login geändert werden muss. Zusätzlich wurde die Beschränkung eingeführt, dass das geänderte Passwort nicht gleich den letzten fünf sein darf. Zusätzlich darf jeder Benutzer, außer der API Benutzer, nur maximal 4 aktive Datenbankconnections gleichzeitig haben. Die Anzahl an gleichzeitigen Connections wurde aufgrund einer mit der Gruppe abgesprochenen Security-Policy festgelegt. Eingestellt wurde auch, dass eine SSL Zertifizierung, um die Sicherheit zu gewährleisten, von jedem DB-User beim Anmelden anzugeben ist. Dieses kann in den MySQL-Server eingespielt werden, wird aber auch automatisch bei Initialstart der DB generiert. Ein User wird mit 'name'@'bereich' erstellt. Wobei der Bereich der Gültigkeitsbereich des Users ist, somit kann man User auch nur für z.B. den localhost erstellen.

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

Um diesen Usern auch noch Rechte im DBMS zu geben, gibt es die `GrantPrivileges.sql` Datei. Diese variiert je nach Datenbank, da sie jeder Benutzergruppe ihre Rechte auf verschiedene Tabellen gibt, doch der Anfangsteil ist immer der gleiche. Die Admins sollten vollen Zugriff erhalten und andere User erstellen und Rechte verteilen können, *ALL PRIVILEGES*, ebenso wie die Developer. Der einzige Unterschied ist jedoch, den Developern wird der Zugriff auf die systeminterne DB, *sys*, verweigert. Der API sollen minimale Rechte für spezifische DBs gegeben werden.

```{caption="Zuweisen von Rollen zu Benutzergruppen in MySQL" .sql}
GRANT ALL PRIVILEGES ON *.* TO 'admin' WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON database.* TO 'developer';

FLUSH PRIVILEGES;
```

Es gibt verschiedene Sprachen auf der Welt. Jede Sprache beinhaltet verschiedene Zeichen, die nicht immer mit jedem Character-Set kompatibel sind. Um auch diese Daten ordnungsgemäß zu persistieren, kann man die Character-Sets jeder Datenbank und sogar jeder Tabelle anpassen. Außerdem gibt es die Möglichkeit, dass man die Art und Weise, wie das System Daten miteinander vergleicht, beeinflusst. Dies wird Collation genannt. Hierbei beeinflusst man z.B. das Verhalten einer WHERE-Klausel, in dem man sagt, er soll den zu vergleichenden Text unter Beachtung der Groß- und Kleinschreibung (= case sensitive) vergleichen. [@DB-character-set] Da Schiffe, die darauf gelagerten Container und deren Firmen aus verschiedenen Ländern stammen, wurde hier entschieden, das utf8mb4 (eine Erweiterung von UTF-8) Character Set und die dazugehörige Collation utf8mb4_0900_bin (0900 = Unicode Collation Algorithmus, bin = bitweises vergleichen) zu verwenden. [@mysql-character-set] Dies sieht dann wie folgt aus:

```{caption="Erstellen einer MySQL Datenbank mit abgeänderten Character Set und Collation" .sql}
CREATE DATABASE IF NOT EXISTS database DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
CREATE SCHEMA IF NOT EXISTS schema DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
```

##### Schiff

Jeder Container wird auf einem Schiff transportiert. Da ein Container im Laufe seines Transports auf verschiedenen Schiffen sein kann und dementsprechend auch bewegt wird und auf verschiedenen Stellplätzen landet, ist es wichtig, nachzuverfolgen, auf welchen Schiffen der Container sich befunden hat. In der hier gestalteten Datenbank wurden Schema für allgemeine Schiffdaten (`ship`), Zertifikate die das Schiff haben muss (`certificate`) und für die Herkunft des Transportmittels (`corporation`), angefertigt.

![ERD der Schiffdatenbank](img/Schrempf/ship-erd.png){width=80%}

Ein Schiff hat sehr viele Attribute wie zum Beispiel seine Länge, Breite und Gewicht, aber auch rechtlich verbindliche Angaben wie sein Typ oder verschiedene Zertifikate, die auf ihn zutreffen. In dieser Ausarbeitung ist die Schiffsdatenbank nur ein unvermeidliches Nebenprodukt der Gesamtarbeit. Aufgrund dessen wurden nicht alle Zertifizierungen die ein Schiff haben kann und manche andere Eigenschaften umgesetzt, sondern es wurde nur auf das Nötigste begrenzt. Die hier implementierten Dokumente beschränken sich auf:

- ILLC^[International Load Line Certificate] [@imo]
- IOPP^[International Oil Pollution Prevention Certificate]
- BWMC^[Ballast Water Management Certificate]
- IAPP^[International Air Pollution Prevention Certificate] [@iapp]
- SMC^[Safety Management Certificate]

[@gpt-schiff-db]

##### Container

Jeder Container besitzt verschiedene Parameter, welche ihn ausmachen. Nicht nur seine Größe, sondern auch seine Materialbeschaffenheiten, Tragfähigkeiten und Zulassungen sind ausschlaggebend. In der hier gestalteten Datenbank wurden Schema für allgemeine Containerdaten (`container`), G
Containergrößenklassifikationen (`dimension`), Zertifikate, die der Container haben muss (`certificate`) und für die Herkunft des Behälters (`corporation`), angefertigt.

![ERD der Containerdatenbank](img/Schrempf/container-erd.png){width=80%}

Der Hauptfokus dieser Ausarbeitung liegt auf den Schiffcontainern. Diese haben simple Attribute wie deren Abmessungen, Seriennummern und die Firmen, die sie hergestellt haben und besitzen. [@bic-code] [@icecargo] Doch wie bei den Schiffen gibt es Zertifikate, die solch eine Transporteinheit standardisieren. Dazu zählen:

- CSC^[International Convention for Safe Containers]
  - Vertrag der Vereinigten Nationen und der Internationalen Seefahrtsorganisation um standardisierte Regulationen bei Containern einzuführen. [@bic-code-csc]
- CCC^[Container Construction Certificate]
  - Ist eine Zollplakette, in welcher die für diese Transporteinheit geltenden Zollbestimmungen festgehalten sind. [@bic-code-csc]
- TCT^[Timber Component Treatment]
  - Gemacht von der australischen Regierung um die konforme Beschichtung und Materialbeschaffenheit der Containerböden und Vermeidung eines möglichen Schädlingsbefalls durch die in dem Holzboden übergebliebenen Parasiten sicherzustellen. [@tct]
- IC^[InterContainer Codes]
  - Diese Zertifizierung bescheinigt einen Container zum Transport auf Schienen. [@ic-codes]

##### Grenzwerte

In dieser Ausarbeitung geht es um die Überwachung eines Containers. Diese Datenbank dient dem Zweck, um nicht nur dessen Messwerte auszulesen, sondern auch um zu definieren, wann ein kritischer Wert erreicht worden ist. In der hier gestalteten DB wurde ein Schema für die Grenzwerte (`threshold`) angefertigt. Ein Grenzwert wird mit seinem Bereich in welchem er gültig ist, seinem Erwartungswert, in welchen Bereich um den Erwartungswert der gelieferte Wert sein soll und die Priorität des Limits definiert.

![ERD der Grenzwertdatenbank](img/Schrempf/threshold-erd.png){width=50%}

##### User

Um ein praktikable UI^[user interface = Benutzeroberfläche] bieten zu können, muss diese eine Login-Funktion beinhalten. Userdetails müssen persistiert werden und die Datenbank dazu hat Schema für allgemeine Userdaten und dessen Tokens (`user`), Organisationsdaten des Benutzers (`corporation`) und die Rechte die der Anwender in der Applikation hat (`privilege`). Wenn ein Benutzer sich erfolgreich angemeldet hat, werden zwei Tokens, Access und Refresh, vom Server erstellt. Wie dies geschieht wird später weiter erläutert. Im nachstehenden ERD^[Entity-Relationship-Modell] ist zu bemerken, dass die Tabelle der User-Tokens keine Verbindung zu anderen Tabellen hat und somit auch mit keinen anderen Daten verknüpft ist, zumindest scheint es so. Im Token selbst wird die Information, welchem Benutzer dieser Token gehört, welche Rechte damit verbunden sind und wie lange er gültig ist, eingebettet.

![ERD der Benutzerdatenbank](img/Schrempf/user-erd.png){width=100%}

#### InfluxDB

Wir verwenden MQTT, um Daten vom Prototyp zum Server zu bekommen. Das von uns entworfene Gerät sendet seine Messwerte an den MQTT Broker. In unserem Fall ist der Publisher der Hardware-Prototyp und der Subscriber ist Telegraf. Telegraf ist ein Client, in dieser speziellen Variante auch Scraper genannt, der von InfluxDB entworfen wurde, um aktiv Datenquellen anzuzapfen und die mittels einer Konfigurationsdatei definierten Filter auf die Ursprünge anzuwenden und die dadurch extrahierten Werte an eine beliebige Applikation weiterzuleiten. Telegraf ist in der Programmiersprache Go verfasst und bietet unzählige Plugins zum Empfangen, verarbeiten, aufbereiten und weitersenden der Daten an. Die Konfigurationen werden im TOML^[Tom's Obvious, Minimal Language]-Syntax geschrieben. Hier wurden die Erweiterungen für MQTT, RegEx^[regular expression] zum Topic-Struktur-Filtern und InfluxDBv2 verwendet. Das Filtern der Topics hat den Sinn, dass man nur die nötigsten Daten bekommt, den Overhead reduziert und die einzelnen Werte exakt zuweisen kann. Als erstes wird nach einem groben Gesamttopic gefiltert und temporäre Tags zum Weiterverarbeiten erstellt.

```{caption="Filtern der Topics in Telegraf mittels Regex" .toml}
[[processors.regex]]
  [[processors.regex.tags]]
    key = "topic"
    pattern = "^contrude/(\\d+)/(\\d+)/([^/]+)$"
    replacement = "$1,$2,$3"
```

Nur wird jeder temporäre Tag mit einem real-funktionalen Tag ausgewechselt. Dieser Prozess passiert dreimal. Für Schiff, Container und der Art des Sensors. Hier wird beispielhaft nur der Schiffstag angeheftet. [@gpt-telegraf-regex]

```{caption="Ersetzen der temporären Topic-Tags durch funcktionale Tags" .toml}
[[processors.regex]]
  [[processors.regex.tags]]
    key = "topic"
    pattern = "^([^,]+),([^,]+),([^,]+)$"
    replacement = "$1"
    result_key = "ship"
```

Zum Schluss wird der transformierte Datensatz in die Datenbank eingespeist. Hierbei müssen sowohl die Verbindungsdetails und Anmeldedaten als auch die Datenbank und die Zeitstempelpräzesion bekannt gegeben werden. Zum Sicherstellen, dass nur ausgewählte Datensätze in die DB kommen, wird mittels Tagpass definiert, welchen Tag das Topic haben muss, um gespeichert zu werden. Im folgenden Beispiel muss das Topic den in der Umgebungsvariable `TEMPERATURE_TAGPASS` definierten Tagwert haben, um in den zugehörigen Temperaturbucket zu gelangen.

```{caption="Persistieren der Messwerte in die Datenbank" .toml}
[[outputs.influxdb_v2]]
  urls = ["${INFLUX_URL}:${INFLUX_PORT}"]
  token = "${INFLUX_TOKEN}"
  organization = "${INFLUX_ORG}"
  bucket = "${TEMPERATURE_BUCKET}"
  precision = "s"
  
  # Only pass data where the sensor tag is temperature
  [outputs.influxdb_v2.tagpass]
    sensor = ["${TEMPERATURE_TAGPASS}"]
```

InfluxDB ist ein zeitreihenbasiertes Datenbankmanagementsystem, in welchem eine Datenbank Bucket heißt. In diesem hier benötigten Anwendungsfall gibt es für jeden einzelnen Messwert einen Bucket. Diese wären:

- temperature = Temperatur
- humidity = Luftfeuchtigkeit
- air_pressure = Luftdruck
- vibration = Vibration
- longitude = Längengrad
- latitude = Breitengrad
- altitude = Seehöhe

Außerdem gibt es InfluxDBv1 und InfluxDBv2. Bei V1 muss man für API-Zugriffe Benutzername und Passwort angeben, was unter Umständen eine Sicherheitslücke sein kann. Bei V2 wird der Gesamte API-Verkehr über Tokens geregelt. Ein entscheidender Unterschied ist auch die Abfragesprache. V1 verwendet normales SQL, V2 hingegen Flux. Dies führte zu einer erheblichen Performancesteigerung. [@influx-v1-vs-v2] Flux ist eine SQL ähnliche Query-Sprache, jedoch stark auf das Abfragen von Zeitreihen optimiert. [@flux]

#### Grafana

Grafana ist ein Open-Source-Monitoring-Tool. Sprich, man kann es zur Datenvisualisierung verschiedenster Quellen und Eingabearten verwenden und sogar Alarme ausgeben lassen, wenn gewisse Events auftreten oder Werte aus der Reihe tanzen. Somit bietet Grafana nicht nur Visualisierungsmöglichkeiten der beliebtesten Datenquellen an, sondern auch ein Benachrichtigungssystem, das es in Summe auch zu einem bekannten Industriestandard gemacht haben. In Grafana werden Dashboards erstellt und darin Panels. Ein Panel ist eine Art der Visualisierung. Zum Beispiel Histogramme, Heatmaps oder Balkendiagramme. [@grafana-general] Außerdem bietet es den großen Vorteil, dass Dashboards und Panels als JSON abrufbar sind und somit sehr einfach importiert und exportiert werden können.

Um eine Visualisierung hinzuzufügen, muss man ein neues Dashboard und darin eine neue Visualisierung erstellen. Nun wird man gefragt, die Datenquelle zu konfigurieren. Hierfür wird das Plugin für InfluxDB verwendet und eine neue Verbindung zu der Datenbank aufgebaut. Bei den Dashboardeinstellungen kann man Variablen erstellen. Diese werden hier in weiterer Folge als Platzhalter für die Schiff- und Container IDs verwendet. Die Variablen bestehen jeweils aus einer Query, welche nur die Werte mit den angegebenen Tags herausfiltern. Dies kann nur dann geschehen, wenn die in InfluxDB gespeicherten Werte überhaupt diese Informationen als Tags bekommen haben.

![Grafana Variablen für Schiffe und Container [@grafana-variables]](img/Schrempf/grafana-variables.png){width=100%}

Nun sieht die leere Visualisierung (Panel) so aus:

![Leeres Grafana Panel](img/Schrempf/grafana-empty-panel.png){width=100%}

Im unteren Teil kann man sehen, dass die zuvor ausgewählte Datensource da ist und dass man diese mittels Flux-Queries abfragen kann. Um ein Panel zur Temperaturvisualisierung zu gestalten, kann man die unten angegebene Query verwenden. Der Zeitraum wird im Panel selbst definiert und die Variablen können mittels eines Dropdown-Menüs angepasst werden.

```{caption="Flux-Query für Temperaturwerte in Grafana" .flux}
from(bucket: "temperature")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["ship"] == "${ship}")
  |> filter(fn: (r) => r["container"] == "${container}")
```

Nur noch auf Refresh drücken und es sieht schon so aus:

![Simples Grafana Panel](img/Schrempf/grafana-simple-panel.png){width=100%}

Nach weiteren Anpassungen wie Achsenbeschriftung, Diagrammtyp, Diagrammtitel, Einheiten und Farben sieht das Diagramm in finaler Version so aus:

![Temperatur Grafana Panel](img/Schrempf/grafana-temperatur-panel.png){width=100%}

### Continuous Integration und Continuous Deployment

#### Docker

In einer sich immer schneller ändernden Welt ist eine modulare Software unausweichlich, um Patches rasch einzuspielen, Sicherheitslücken zu fixen und neue Features implementieren zu können. Da es leichter ist, so ein System einmal zu entwerfen und dann zu erweitern als ein bestehendes Konstrukt umzugestalten, wurde hier von Anfang an Docker verwendet um genau so eine Architektur zu erzielen. Die gesamte Software ist in Microservices unterteilt und kann theoretisch separat betrieben werden. Ausnahmen hinsichtlich der Abhängigkeit / Modularität bestehen nur bei Anwendungen, die eine andere voraussetzen, z.B. ein Server eine Datenbank. Anfangs wurde überlegt, für jeden einzelnen Service ein Dockerfile zu schreiben. Ein Problem, das sich nicht lange darauf einstellte war, wie man denn all die Anwendungen gleichzeitig hochfahren kann. Eine Lösung bot hierbei Docker Compose. Nun kann man mehrere Services in einer Datei definieren und mit einem Befehl hochfahren: `docker compose up`. Da man in Docker Compose zwar einen Service aus einem Image, welches in einem eigenen Dockerfile beschrieben wurde, erstellen kann, dies jedoch bei uns keinen Sinn hatte, wurde die Strategie dahin gehend verändert, dass nur noch das Base-Image vom Docker-Hub verwendet und im gebotenen Rahmen abgewandelt wurde. Wir haben uns für die zweite Version entschieden, da wir die Base-Images nicht wirklich verändern, sondern eher Konfigurationen an ihnen durchführen. Beispiele dafür sind Volume-Mounts, Entrypoints anpassen oder Umgebungsvariablen setzen. Zusätzlich erspart dies, das Schreiben unzähliger Dockerfiles und man kann alles übersichtlich in einer Datei behalten. [@gpt-server-structure] Ein guter Vergleich für das Gelingen unseres Ansetzes ist, dass zu Anfang nur drei Services im Einsatz waren und nun sind wir bei zwölf, welche im Laufe der Zeit ihren Weg in unsere Anwendung gefunden haben und auch leicht einzugliedern waren. Folgende Services sind final im Einsatz:

| Image | Usage | Services | Scope |
|--|--|--|--|
| mysql:8.0.29 | MySQL Datenbanken | Schiffe, Container, Grenzwerte, Benutzer  | Datenbanken |
| influxdb:2.7-alpine | Zeitreihenbasierte Sensordatenbank | InfluxDB | Datenbanken |
| traefik:v3.1.5 | Reverse Proxy | Traefik | Backend |
| eclipse-mosquitto:openssl | MQTT Broker | MQTT | Backend |
| telegraf:1.32-alpine | Datenübermittelung von MQTT zu InfluxDB | Telegraf | Backend |
| node:22-alpine3.18 | JavaScript Applikationen | Authentifizierung, REST-API, Webanwendung | API, Frontend |
| grafana/grafana:main | Datenvisualisierung | Grafana | Frontend |

: Welche Images werden für welche Services verwendet

Da gewisse Anwendungen vertrauliche Informationen benötigen, wie Passwörter, Tokens und Webaddressen wurden diese in Environment-Variable-Files gespeichert. Diese Datei wird im Docker Compose Abschnitt `env_file` angegeben. Zu jedem Service der sensible Umgebungsvariablen benötigt, gibt es eine `.env.template` Datei. Dieses File spezifiziert, welche Environments gesetzt gehören und fungiert somit als Template. Hier werden noch keine sensiblen Informationen angegeben und somit kann sie in das VCS hochgeladen werden. Nicht nur Sensibles kann hier mitgegeben werden, sondern es wird auch eine Differenzierung zwischen Produktiv- und Entwicklungsumgebungen ermöglicht.

```{caption="Definition einer Entwicklungsumgebung mittels Umgebungsvariablen" .env}
TRAEFIK_DOMAIN=traefik.localhost
API_DOMAIN=api.localhost
WEB_DOMAIN=www.localhost
```

```{caption="Definition einer Produktivumgebung mittels Umgebungsvariablen" .env}
TRAEFIK_DOMAIN=traefik.contrude.eu
API_DOMAIN=api.contrude.eu
WEB_DOMAIN=www.contrude.eu
```

Alle Services haben die gleiche Struktur und gewisse Ähnlichkeiten im Aufbau. Bei jedem Service wird das Attribut `restart` auf `unless-stopped` gesetzt. Dies bewirkt, dass bei einem schwerwiegenden Fehler, welcher den Container zum Absturz bringt, sich ein neuer Container hochfährt und Anfragen weiterhin entgegengenommen werden können. Somit ist der Grundstein für eine Self-Healing-Architecture gelegt. Wenn Volumes gemountet werden, wird zur besseren Kontrolle auch spezifiziert, ob dieser Mount Read-Only oder Read-Write Rechte im Container selbst haben soll. Die Sektion `deploy` ist noch ein Überbleibsel aus der Phase des Projekts, als wir Docker Swarm verwendet haben, wird aber auch unter der alleinigen Nutzung von Docker Compose, zwar weniger effektiv, aber doch, verwendet.

##### MySQL

Die MySQL Datenbank Services sind so konfiguriert, dass sie alle dasselbe Admin (root) Passwort, welches nach der Erstanmeldung geändert werden muss, haben. Dies dient zur leichteren Erstkonfiguration und bringt aufgrund des Einmalpassworts einen gewissen Sicherheitsfaktor mit. Es werden immer zwei Volume-Mounts vollzogen. Einmal die Datenbank selbst, welche im Container unter dem Pfad `/var/lib/mysql` erreichbar ist und zum anderen die Datenbankskripte zur Initialisierung der DB. Der Standardport einer MySQL Instanz ist 3306, aber da bei uns davon vier verschiedene Instanzen exesiteren, wurden die Ports inkremental geändert. Hier ein Beispiel der Container DB:

```{caption="Definition eines MySQL Services" .yml}
db_container:
  image: mysql:8.0.29
  environment:
    MYSQL_ROOT_PASSWORD: 123
    MYSQL_ONETIME_PASSWORD: "yes"
  restart: unless-stopped
  volumes:
    - ./databases/container/mysql:/var/lib/mysql:rw
    - ./databases/container/scripts:/docker-entrypoint-initdb.d/:ro
  ports:
    - "3308:3306"
  deploy:
    mode: global
```

##### Node.js

In Docker Compose gibt es ein Attribut `command`, in dem man Shell-Commands angeben kann, die beim Starten des Containers ausgeführt werden sollen. Node.js benötigt viele Packages im Hintergrund, welche im Ordner `node_modules` geladen werden. Die Packages können sich aber je nach Betriebssystem und / oder Kernel unterscheiden. Somit ist es am sinnvollsten, wenn man sie jedes Mal frisch installiert. Dies kann mit dem Command `sh -c 'npm install && npm run build && npm run dev -- --host'` erzielt werden.

##### Traefik

Traefik ist ein Open-Source Reverse Proxy und Load Balancer. Ein großer Vorteil von Traefik zu anderen Konkurrenten ist, dass man nicht viel konfigurieren muss, da es aufgrund eines eigenen Service-Discovery-Modus die zu routenden Anwendungen automatisch erkennt. Außerdem muss man sich nicht mehr mühselig SSL-Zertifikate kaufen, sondern kann diese sich generieren lassen. Ein kleines Kontra bringt dieses Feature aber mit sich: Da die Zertifikate nicht von einer offiziellen Autorität ausgestellt werden, werden diese in den Browsern und von manchen Libraries als unsicher geflaggt. [@traefik-overview]

![Traefik Übersicht [@traefik-overview]](img/Schrempf/traefik-overview.png){width=100%}

Um unsere Services sicher im Internet freizuschalten, verwenden wir die automatisierte Generierung von TLS Zertifikaten von Traefik, welches mit Let's Encrypt, einer Zertifizierungsauthorität, interagiert. Somit upgraden wir von HTTP zu HTTPS. [@traefik-lets-encrypt] Des Weiteren haben wir Traefik so konfiguriert, dass jeglicher HTTP-Traffic auf HTTPS umgeleitet wird. Dem Benutzer wird faktisch ein verschlüsselter Datentransfer im Sinne des größeren Wohls aufgezwungen. Außerdem wird zur Sicherheitssteigerung auch noch konfiguriert, dass nicht jeder Service ins Web geschaltet werden soll, sondern nur jene, welche explizit erwähnt werden. Zusätzlich bietet Traefik ein Web-Dashboard an, mit welchem man eine gute Übersicht über die verwalteten Services erhält. Wir haben zwei API-Server. Einen zur Authentifizierung und einen, um die Daten der Schiffe, Container, Grenz- und Messwerte zu erhalten. Um eine logische und (sicherheits-) technische Abgrenzung zu ermöglichen, werden diese zwei seprat von einander betrieben. Um auch einen Unterschied beim Aufrufen dieser im WWW^[World Wide Web] zu ermöglichen, gibt es eine Domain, aber verschiedene Path-Prefixes unter denen man die Services erreichen kann. Der Prefix für die Authentifizierungsstelle lautet `/auth` und für die restlichen Angelegenheiten `/rest`. Da es mit der internen API Struktur der Server beim weiterleiten der Anfragen Probleme gibt, wenn davor etwas steht, was aber nicht im API-Server selbst angegeben wurde, wird nach der Verarbeitung der Anfrage durch Traefik der Path-Prefix wieder weggeschnitten. [@gpt-traefik] Wichtig anzumerken ist auch noch, dass wenn man Environment-Files für Traefik verwendet, diese im exakt gleichen Ordner sein müssen wie die Docker-Compose-Datei in welcher Traefik definiert ist, da ansonsten der Service die Datei nicht lesen/interpretieren kann. Dies ist ein Sonderfall und trifft nur auf den hier behandelten Dienst zu.

```{caption="Definition eines Traefik Services" .yml}
traefik:
  image: traefik:v3.1.5
  env_file: .env
  restart: unless-stopped
  command:
    - "--api.dashboard=true"
    - "--providers.docker=true"
    - "--providers.docker.exposedByDefault=false"
    - "--entrypoints.websecure.address=:443"
    - "--certificatesresolvers.myresolver.acme.httpchallenge.entrypoint=websecure"
    - "--certificatesresolvers.myresolver.acme.httpchallenge=true"
    - "--certificatesresolvers.myresolver.acme.email=${CERT_EMAIL}"
    - "--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json"
  ports:
    - "443:443" # only HTTPS traffic
  volumes:
    - "/var/run/docker.sock:/var/run/docker.sock:ro"
    - "./letsencrypt:/letsencrypt:rw" # storage for Let's Encrypt certificates
  labels:
    traefik.enable: true
    traefik.http.routers.api.rule: Host(`${TRAEFIK_DOMAIN}`) # hostname for dashboard
    traefik.http.routers.api.service: api@internal
    traefik.http.routers.api.entrypoints: websecure # reroute all traffic to https
    traefik.http.routers.api.tls.certresolver: myresolver
    traefik.http.routers.api.middlewares: traefik-auth
    traefik.http.middlewares.traefik-auth.digestauth.users: ${DASHBOARD_AUTH} # secure dashboard with login
    traefik.http.middlewares.traefik-auth.digestauth.removeheader: true
    traefik.http.middlewares.strip-prefixes.stripPrefix.prefixes: ${AUTH_PREFIX}, ${REST_PREFIX}
  deploy:
    mode: global
```

Den Diensten, welche freigeschaltet werden sollen, müssen nun Labels hinzugefügt werden, welche dem Auto-Discovery von Traefik gewisse Grundeinstellungen mitteilen.

```{caption="Traefik Labels um einen Service zu konfigurieren" .yml}
traefik.enable: true
traefik.http.routers.web.rule: Host(`${DOMAIN}`) # hostname
traefik.http.services.web.loadbalancer.server.port: ${PORT} # port
traefik.http.routers.web.entrypoints: websecure # reroute to https
traefik.http.routers.web.tls.certresolver: myresolver
```

#### Server

Um unsere Services öffentlich zugänglich machen zu können, wurde ein simpler headless Ubuntu Server mit der Version 24.04 auf einem Raspberry Pi Model B mit 4GB RAM aufgesetzt. Dieses Gerät wurde dann mittels einer öffentlichen IP^[Internet Protocol]-Adresse und einer damit assoziierten Domain im Internet zugänglich gemacht. Ein verlässlicher Remotezugriff wird mithilfe der Installation von SSH^[Secure Shell] ermöglicht. Da unsere gesamte Architektur auf Docker basiert, wurde auch diese Software dort installiert.

![Server auf einem Raspberry Pi](img/Schrempf/physical-server.png){width=100%}

#### GitHub Action

Wir verwenden GitHub als VCS. Die durch diese Entscheidung ermöglichten Automatisierungsmöglichkeiten haben wir sehr zu unserem Vorteil genutzt. Es existieren zwei verschiedene Workflows, um unser Leben zu erleichtern.

##### Server deploy

Da sämtliche Anwendungen ihren eigenen Docker Container bzw. Eintrag im Docker Compose haben, fällt es sehr leicht, unsere Arbeit zu deployen. Es gibt verschiedene Ansätze solch eine Aufgabe zu realisieren, doch wir haben uns dafür entschieden, eine SSH Verbindung zu unserem Server aufzubauen, den geänderten Code von dort aus zu pullen und um sicherzustellen, dass alle Dienste up to date sind die Docker Container komplett herunter- und wieder hochzufahren. Dies bringt eine für uns vernachlässigbare Downtime von 30 Sekunden mit sich. Der angegebene Prozess muss seitens Docker so ablaufen, da Codeänderungen sonst nicht direkt im Container übernommen werden würden. Außerdem muss noch eine Änderung beim Server vorgenommen werden, um diese Art des deployens zu ermöglichen. Wenn man Docker Container auf Ubuntu starten bzw. stoppen will, muss man dies mit erhöten Rechten, sprich `sudo`, machen, was das eingeben eines Passworts voraussetzt. Dieser Prozess beinhaltet eine Benutzerinteraktion und lässt sich sehr schwer automatisieren. Das Benutzen einer GitHub Action wird erschwert. Um das Problem zu umgehen, nutzen wir eine Datei des Linuxsystems die es ermöglicht, gewisse Befehle ohne Sudo-Rechte auszuführen. Sie befindet sich in `/etc/sudoers` und man muss folgende Zeile anfügen, um ein Docker Compose Skript ohne Adminrechte ausführen zu können, wobei `pi` der ausführende Benutzer ist: `pi ALL=(ALL) NOPASSWD: /usr/bin/docker compose up -d, /usr/bin/docker compose down`. [@sudo-no-pass] Der vollständige Workflow besteht aus zwei Teilen, die jeweils die entsprechenden Shellanweisungen ausführen..

1. Das SSH Zertifikat des Servers zu den trusted Hosts in der GitHub Action VM hinzufügen.
2. Sich in den Server mittels SSH einloggen, den aktuellsten Stand pullen und die Docker Container herunter- und hochfahren.

```{caption="Updaten der Docker Container am Server" .yml}
sshpass -p '${{ secrets.SSH_PWD }}' ssh -v -o StrictHostKeyChecking=no ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} <<'ENDSSH'
cd ${{ secrets.SSH_WORKDIR }}
git pull https://${{ secrets.SSH_GITHUB_PAT }}@github.com/BitSneak/Contrude.git
cd ./Server
sudo docker compose down
sudo docker compose up -d
ENDSSH
```

##### Super-Linter

Ein Linter ist eine Software, die den Code analysiert und den Programmierer auf Formatierungsfehler und Codekonsistenz hinweist. Seine Aufgabe ist es, dich bei der Implementierung von Best-Practice-Strategien zu unterstützen und Programmfehler vorzubeugen. Für verschiedene Programmiersprachen gibt es spezialisierte Linter. Ein Super-Linter ist nun eine Sammlung von Lintern und dient als Gesamtpaket. Somit muss man nicht mehr für jede verwendete Programmiersprache einen implementieren, sondern kann diese Collection verwenden, um gleichzeitig mehrere Sprachen abzudecken. Die zugehörige GitHub Action ist sehr simpel und sieht folgendermaßen aus: [@superlinter]

```{caption="GitHub Superlinter" .yml}
name: Super-Linter

on:
  push:

jobs:
  super-lint:
    name: Lint code base
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Lint Codebase
        uses: github/super-linter@v4
        env:
          DEFAULT_BRANCH: main
          GITHUB_TOKEN: $({ secrets.GITHUB_TOKEN })
```

Die Verbesserungsmöglichkeiten die der Super-Linter liefert, können dann entweder mittels eine Auto-Commit Pipeline automatisch oder erst nach einem Review der Vorschläge mit den Zuständigen Fachleuten manuell in den Code übernommen werden.

### REST API

Bei der Umsetzung der Backend-Server haben wir uns für eine Trennung der Authentifizierung und der Datenabfrage entschieden, da bei einer Kompromittierung einer dieser Komponenten die jeweils andere funktionsfähig bleibt und sie auch getrennt von einander betrieben werden können, was eine zusätzliche Sicherheitskomponente einführt. Außerdem verwenden wir JavaScript als Programmiersprache und Node.js, da es zahlreiche für uns sehr nützliche Libraries bietet. Trotz der logischen Trennung sind beide gleich aufgebaut: [@medium-rest-api]

\dirtree{%
.1 src.
.2 db.
.3 connect.js.
.3 helper.js.
.2 errors.
.3 customErrors.js.
.2 middlewares.
.3 handleError.js.
.3 notFound.js.
.3 tryCatchWrapper.js.
.3 validateRouteParameter.js.
.2 resources.
.3 db.
.4 controller.js.
.4 routes.js.
.1 ssl.
.1 .env.
.1 app.js.
.1 package.json.
}

In der Datei `package.json` werden die Grundzüge des Projekts beschrieben, wie z.B. die verwendeten Packages, die Metadaten und der Einsprungspunkt. Da, aufgrund der besseren Lesbarkeit, entschieden wurde, modular JavaScript (ES Module) zu verwenden und dies auch spezifiziert werden muss, wurde `'type': 'module'` in der oben angesprochenen Datei eingegeben. Dies ermöglicht nun z.B. `import` anstatt der CommonJS Variante `require()` zu nutzen.

`app.js` ist der Einstiegspunkt der Applikation. In ihr werden alle Routen importiert und Express mitgeteilt, diese zu benutzten. Zusätzlich werden die Standard-Error-Handler für die HTTP-Codes 404 und 500 initialisiert, und der Server wird auf Port 80 gestartet.

#### Datenbanken

Im Ordner `db` werden die Connection-Pools zu den jeweiligen Datenbanken definiert. Ab der MySQL Version 8.0.16 sind SSL-Zertifikate Pflicht zum Angeben beim Verbinden zur DB. Die Zertifikate werden im gleichnamigen Ordner `ssl/db` aufbewahrt. Mit diesen Informationen im Hinterkopf, sieht ein Connection-Pool mit maximal 100 gleichzeitigen Verbindungen wie folgt aus: [@medium-rest-api]

```{caption="MySQL Connection Pool für die Container DB" .js}
export const container = mysql
  .createPool({
    host: "db_container",
    port: 3306,
    database: "configuration",
    database: "certificate",
    database: "corporation",
    database: "dimension",
    user: "rest",
    password: process.env.DB_CONTAINER_PASSWORD,
    waitForConnections: true,
    connectionLimit: 100,
    ssl: {
      sslmode: "verify-full",
      ca: fs.readFileSync("./ssl/db/container/ca.pem"),
      cert: fs.readFileSync("./ssl/db/container/cert.pem"),
      key: fs.readFileSync("./ssl/db/container/key.pem"),
    }
  }).promise();
```

Hingegen solch eines Connection-Pools ist das Prozedere um einen für eine InfluxDB herzustellen um einiges simpler, da man nur die Datenbank URL und den passenden Token angeben muss: [@influxdb-javascript]

```{caption="InfluxDB Connection Pool für die Sensor DB" .js}
export const sensor = new InfluxDB({url: process.env.DB_SENSOR_URL, token: process.env.DB_SENSOR_TOKEN});
```

Alle Connection-Pools werden in der `helper.js` genutzt. Dort sind Methoden definiert, welche einmal pro Datenbankanfrage aufgerufen werden, sich für die Dauer der Anfrage eine Connection aus dem Pool holen und nach Beendigung der Aufgabe diese wieder freigeben. Dieses Prinzip kann für alle SQL-Datenbanken verwendet und bei Bedarf erweitert werden. Man erstellt eine Map aus den Namen, Datentyp String, der Datenbanken in Kombination mit den Imports der jeweiigen Datenbanken. In einer Funktion stellt man die Verbindung zur DB her, formatiert mögliche Eingabeparameter des SQL Statements, führt dieses in der Zugeteilten Datenbank aus und schließt die Connection. Auf diese Weise erhält man einen Session Manager.

```{caption="SQL Session Manager" .js}
import { container } from "./connect.js";

// Map from database name to database connection pool import
const dbMap = {
    "container": container,
};

// Generalized session function
const session = async function(sql, params, db) {    
    const con = await dbMap[db].getConnection();
    sql = params !== undefined ? dbMap[db].format(sql, params) : sql;
    
    const result = await con.query(sql);
    con.release();
    return result;
};

// Used general session to make a specific database session
export const container_session = async function(sql, params) {
    return session(sql, params, "container");
};
```

Eine No-SQL-Datenbank ist schwieriger zu generalisieren und erfordert oft eine spezifische Anpassung an den jeweiligen Anwendungsfall. Der grundlegende Ansatz bleibt aber der Gleiche. Man übergiebt die auszuführende Query und bekommt die Daten zurück. In InfluxDB gibt es pro Datensatz mehrere Spalten mit verschiedensten Informationen. Jedoch werden nicht alle davon benötigt und können der Einfachheit halber nicht übernommen werden. Außerdem können Daten in InfluxDB auch wieder über eine REST-Schnittstelle abgefragt werden, welche eine vorteilhafte Ebene an Abstraktion mti sich bringt. In folgendem Beispiel wurde die Session auch gleich dazu genutzt, Timestamps auf das richtige Format zu kriegen und gewisse Datafields noch zu manipulieren / umzubenennen.

```{caption="Flux Session Manager" .js}
export const sensor_session = async function(flux) {
    const api = sensor.getQueryApi(process.env.DB_SENSOR_ORG);

    return await new Promise((resolve, reject) => {
        const results = [];

        api.queryRows(flux, {
            next(row, tableMeta) {
                const result = tableMeta.toObject(row);

                // remove unnecessary fields
                delete result["result"];
                delete result["table"];
                delete result["_start"];
                delete result["_stop"];
                delete result["_field"];
                delete result["_measurement"];
                delete result["topic"];
                delete result["host"];

                // rename field _time to time
                result["time"] = result["_time"];
                delete result["_time"];
                // rename field _value to value
                result["value"] = result["_value"];
                delete result["_value"];

                // strip away unnecessary seconds
                result["time"] = result["time"].split('.')[0] + 'Z';
                // strip away unnecessary decimals
                result["value"] = parseFloat(result["value"]).toFixed(2);
                
                results.push(result); // add each row to the final results
            },
            error(error) {
                reject(error); // reject on error
            },
            complete() {
                resolve(results); // resolve with all collected results
            },
        });
    });
};
```

#### Middleware

Eine Middleware ist prinzipiell dafür konzipiert, Daten zu transformieren, überprüfen oder Fehler zu beheben oder zu werfen. Im `middlewares` Ordner wird primär Error handling und parameter checking betrieben. Mit `handleError.js` wird eine Möglichkeit geboten, individuelle Fehlermeldungen mit den korrespondierenden HTTP-Codes zu werfen. Dies wird mit der Klasse `CustomError` realisiert. Der `tryCatchWrapper.js` ist eine Funktion, die einen try-catch Block beinhaltet und als Argument eine auszuführende Funktion bietet. Wenn in der auszuführenden Funktion Fehler geworfen werden, die dort nicht schon behandelt werden, schafft diese Funktion sozusagen ein Schutzgitter, welches selbst bei critical Errors die weitere Exekution des Programms ermöglicht. Es wird als Wrapper um die auszuführende Funktion angewendet. [@medium-rest-api] URIs können Variablen in ihren Pathsegmenten beinhalten. Wenn solche vom REST Endpoint benötigt werden, kann es zu schwerwiegenden Problemen führen, wenn diese Variablen nicht gesetzt sind. Um dies vorzubeugen, wurde `validateRouteParameter.js` geschrieben. Es bietet eine Funktion, welche bei der Routendefinition als Middleware eingespeist werden kann, um im Vorhinein zu überprüfen, ob die Variablen gesetzt sind und wenn nicht, die Anfrage vorzeitig zu beenden. Queryparameter und Routebodies muss man jedoch in der von der Routedefinition aufgerufenen Funktion selbst nach Vorhandenheit prüfen.

```{caption="Erstellen einer individuellen Error Klasse" .js}
export class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
};
  
export const createCustomError = (message, statusCode) => {
  return new CustomError(message, statusCode);
};
```

```{caption="Überprüfen der Vorhandenheit von Path Variablen bei REST Endpoints" .js}
const validateRouteParams = function(req, res, next) {
    // search for route parameters that are not set
    for (const [key, value] of Object.entries(req.params)) {
      // if a route parameter is not set, it starts with the place holder :
      if (value.startsWith(":")) {
        return next(createCustomError(`${key} parameter is required`, 400));
      }
    }
    next();
};
```

#### Routing

Endpoints werden mittels Express in dem File `routes.js` angefertigt. In dieser Datei werden alle von den Routen benötigten Funktionen von `controller.js` importiert. In Letzterer wird beschrieben, was die jeweiligen Route auführen soll. In `routes.js` erfolgt hingegen ausschließlich die Definition der Routen. Anzumerken ist hierbei, dass Pathvariablen mit einem Dopppelpunkt und dem darauffolgenden Variablennamen gekennzeichnet werden. Man kann auch direkt im Pathnamen RegEx Ausdrücke anwenden.

```{caption="Routing mittels Express" .js}
import express from "express";

import {
    getContainerById,
} from "./controller.js";
import validateToken from "../../middlewares/validateToken.js";
import validateRouteParams from "../../middlewares/validateRouteParameter.js";

const router = express.Router();

// execute the in the controller defined function when a request to this URI is sent
router.route("/container/:id").get(validateRouteParams, validateToken("select"), getContainerById);

export default router;
```

#### Authentifizierung

Es gibt verschiedene Möglichkeiten eine API zugänglich zu machen. Sie kann entweder für alle oder eingeschränkt verfügbar sein. Da in unserem Anwendungsfall auch sensible Daten verarbeitet werden, haben wir uns für eine beschränkte API entschieden. Wie schützt man sie nun? Mittels Tokens. Was sind Tokens? Tokens sind zufällig generierte Schlüsselpaare, welche Nutzerinformationen beinhalten. Diese darin gespeicherten Informationen können nur dann ausgelesen werden, wenn man den Schlüssel dekodieren kann. Deswegen ist es essenziell, um die Integrität des Systems zu bewahren, dass man eine gute Verschlüsselung verwendet. In diesem Fall hier werden die Libraries `bcryptjs` zur Hash Erstellung und `jsonwebtoken` zur Token Erstellung verwendet. Prinzipiell kann man auch nur einen JWT benutzen, doch hier wird ein Zugriff- und Aktualisierungsprinzip verfolgt. Es gibt nun zwei Token. Einer, welcher jemanden Zugriff zu den Ressourcen ermöglicht und einen, welcher den Access Token nach Ablauf verlängern kann. Somit kann ein Auto-Logout System implementiert werden. In dieser Ausarbeitung ist der Access Token 15 Minuten und der Refresh Token 20 Minuten gültig. Solang eine Aktivität des Benutzers festgestellt wird, werden immer wieder neue Tokenpaare generiert. Doch nach 20 Minuten Inaktivität verliert der Benutzer seinen Zugang und muss sich neu einloggen. Pro Tokenart gibt es verschiedene Salts, welche mittels `require("crypto").randomBytes(64).toString("hex")` in Node.js generiert werden können. Die Passwörter der Benutzer werden natürlich nicht im Reintext in den Datenbanken persistiert, sondern von `bcryptjs` gehasht. [@medium-auth-simple] Die Funktion `bcryptjs.hash(input, n)` nimmt zwei Parameter an. Den zu hashenden Inputstring und die Anzahl der Hashdurchläufe n. In dieser Ausarbeitung wurden zehn Durchläufe festgelegt. Es gibt auch die Möglichkeit, einen Input mittels der `bcryptjs.compare(input, hashedInput)` Funktion zu prüfen, ob er gleich dem zweiten schon gehashten Input ist. Die wichtigsten Funktionen beim Authentifizierungssystem sind Login, Validate Token, Refresh Token und Logout.

Die Login-Funktion gibt einen Access- und Refresh Token als Response zurück und nimmt im Route-Body die ID des Benutzers und dessen Passwort entgegen. Sie überprüft in der Datenbank, ob der Benutzer überhaupt existiert, dann vergleicht sie anschließend das angegebene Passwort und das aus der DB und speist schließlich die Token mit den Benutzerdaten ein. [@medium-auth-mysql]

```{caption="Login Funktion" .js}
export const login = tryCatchWrapper(async function (req, res, next) {
  // extract data from request body
  const user = req.body.user;
  const pwd = req.body.password;

  // check if request body is present
  if (user === undefined) return next(createCustomError("user is required", 409));
  if (pwd === undefined) return next(createCustomError("password is required", 409));

  // sql statements
  const searchSql = "SELECT u.password, u.role, u.disabled FROM user.user u WHERE u.id = ? LIMIT 1";
  const insertSql = "INSERT INTO user.token VALUES (?, ?)";

  // check if user exists
  const [rows] = await session(searchSql, user);
  if (rows.length === 0) return next(createCustomError("User does not exist", 404));
  // check if user is disabled
  if (rows[0].disabled) return next(createCustomError("User is disabled", 401));

  const hashedPwd = rows[0].password;
  // check if the given password is correct
  if (await bcryptjs.compare(pwd, hashedPwd)) {
    // generate tokens
    const accessToken = generateAccessToken(user, rows[0].role);
    const refreshToken = generateRefreshToken(user, rows[0].role);

    // insert tokens into the database and send them back
    await session(insertSql, [accessToken, refreshToken]);
    return res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken});
  } else {
    return next(createCustomError("Password incorrect", 401));
  }
});
```

```{caption="Access Token Generierung" .js}
export const generateAccessToken = function(user, role) {
    return jwt.sign({user, role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
};
```

```{caption="Refresh Token Generierung" .js}
export const generateRefreshToken = function(user, role) {
    return jwt.sign({user, role}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"})
};
```

Die `validateToken` Funktion prüft, ob ein Token, der im Authorization-Header mitgeführt wird, valide ist. Dies beinhaltet, das Nachschauen, ob der Token in der Datenbank vorhanden ist, ob er noch eine zeitliche Gültigkeit aufweist und das Überprüfen, dass der Benutzer die für die Ressource benötigten Rechte besitzt und auch nicht gesperrt ist. Ein zusätzlicher Parameter `isMiddleware` wird aufgrund der Rückgabewerte benötigt, um zu unterscheiden, ob die Funktion innerhalb des Authentifizierungsservers oder durch eine REST-Abfrage aufgerufen wird. Als Route-Parameter nimmt sie die benötigte Rechtsstufe entgegen und gibt entweder die HTTP-Codes 200 für valide (Zugriff gewährt) oder 403 (Zugriff verweigert) zurück.

```{caption="Token-Verifizierung Funktion" .js}
export const validateToken = (requiredPermission, isMiddleware = true) => {
  return tryCatchWrapper(async (req, res, next) => {
    // retrieve token from authorization header
    const authHeader = req.headers["authorization"];

    if (authHeader == null) return next(createCustomError("Token not present", 400));
  
    const token = authHeader.split(" ")[1];
    if (token == null) return next(createCustomError("Token not present", 400));

    if (requiredPermission === null || requiredPermission === "") return next(createCustomError("Permission not present", 400));

    // sql statements
    const searchUserSql = "SELECT u.disabled FROM user.user u WHERE u.id = ? LIMIT 1";
    const searchTokenSql = "SELECT 1 FROM user.token t WHERE t.access = ? LIMIT 1";
    // query to check if the role has the required permission
    const searchRolePermissionSql = `
      SELECT 1
        FROM privilege.role_permission rp
        INNER JOIN privilege.role r
          ON rp.role = r.id
        INNER JOIN privilege.permission p
          ON rp.permission = p.id
        WHERE r.id = ? AND p.name = ? LIMIT 1`;

    // check if token is valid
    let [rows] = await session(searchTokenSql, token);
    if (rows.length === 0) return next(createCustomError("Token invalid", 401));

    // verify token
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return next(createCustomError("Token expired", 403));
      req.user = user;
      return user;
    });

    // extract name and role from token
    const user = payload.user;
    const userRole = payload.role;

    // check if user is disabled
    [rows] = await session(searchUserSql, user);
    if (rows[0].disabled) return next(createCustomError("User is disabled", 401));

    [rows] = await session(searchRolePermissionSql, [userRole, requiredPermission]);

    // if there are any entries the user has the required permission
    if (rows.length > 0) {
      if (isMiddleware) return next();
      else return res.status(200).json({ message: "ok" });
    } else return next(createCustomError("Permission denied", 403)); 
  });
};
```

Die `refreshToken`-Funktion ist dafür gedacht, dass man ihr im Route-Body den Refresh-Token übergibt und wenn dieser noch nicht abgelaufen ist, wird einem ein neues Paar an Access- und Refresh-Tokens übergeben und das alte Paar aus der Datenbank entfernt.

```{caption="Refresh-Token Funktion" .js}
export const refreshToken = tryCatchWrapper(async function (req, res, next) {
  // extract data from request body
  const refreshTokenOld = req.body.refreshToken;

  // check if request body is present
  if (refreshTokenOld === undefined) return next(createCustomError("refreshToken is required", 409));

  // sql statements
  const searchTokenSql = "SELECT 1 FROM user.token t WHERE t.refresh = ? LIMIT 1";
  const searchUserSql = "SELECT u.disabled FROM user.user u WHERE u.id = ? LIMIT 1";
  const updateSql = "UPDATE user.token t SET t.access = ?, t.refresh = ? WHERE t.refresh = ?";

  // check if token is valid
  let [rows] = await session(searchTokenSql, refreshTokenOld);
  if (rows.length === 0) return next(createCustomError("Refresh token invalid", 400));

  // check if refresh token is expired
  const payload = jwt.verify(refreshTokenOld, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return next(createCustomError("Token expired", 403));
    else return user;
  });

  // retrieve user name from token
  const user = payload.user;
  const userRole = payload.role;

  // check if user is disabled
  [rows] = await session(searchUserSql, user);
  if (rows[0].disabled) return next(createCustomError("User is disabled", 401));

  // generate tokens
  const accessTokenNew = generateAccessToken(user, userRole);
  const refreshTokenNew = generateRefreshToken(user, userRole);

  await session(updateSql, [accessTokenNew, refreshTokenNew, refreshTokenOld]);
  return res.status(201).json({ accessToken: accessTokenNew, refreshToken: refreshTokenNew });
});
```

Um den Prozess der Benutzerabwicklung zu vervollständigen, existiert noch der Logout. Hier wird im Route-Body wieder der Refresh-Token übergeben und die Token-Paare des Nutzers aus der Datenbank entfernt.

```{caption="Logout Funktion" .js}
export const logout = tryCatchWrapper(async function (req, res, next) {
  // extract data from request body
  const refreshToken = req.body.refreshToken;

  // check if request body is present
  if (refreshToken === undefined) return next(createCustomError("refreshToken is required", 409));

  // sql statements
  const searchSql = "SELECT 1 FROM user.token t WHERE t.refresh = ? LIMIT 1";
  const deleteSql = "DELETE FROM user.token t WHERE t.refresh = ?";

  // check if token is valid
  const [rows] = await session(searchSql, refreshToken);
  if (rows.length === 0) return next(createCustomError("Token invalid", 400));

  // check if refresh token is expired
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return next(createCustomError("Token expired", 403));
  });

  // delete old token
  await session(deleteSql, refreshToken);
  return res.status(201).json({ message: "Logged out"});
});
```

Um diese Funktionen auch tatsächlich benutzen zu können, müssen sie mittels Express in einer URI bereitgestellt werden können.

```{caption="Authentifizierungsroutes" .js}
router.route("/login").post(login);
router.route("/logout").delete(logout);
router.route("/token/:permission").get(validateRouteParams, (req, res, next) => validateToken(req.params.permission, false)(req, res, next));
router.route("/token/refresh").post(refreshToken);
```

#### Datenabfrage

Im Vergleich zur allgemeinen Struktur gibt es beim Datenabfrageserver noch eine weitere Datei namens `middlewares/validateToken.js`. Diese bietet eine Schnittstelle zum Authentifizierungsserver, um die im Header mitgeführten Token zu prüfen. Sie leitet einfach die Anfrage weiter und verarbeitet sie erst dann, wenn von `auth/token/:permission` ein Statuscode 200 zurückgegeben wird. Die Struktur bleibt aber ansonten erhalten. Damit ist gemeint, dass in `resources` nun weitere Ordner für die jeweiligen Datenbanken gemacht wurden.

\dirtree{%
.1 resources.
.2 container.
.2 sensor.
.2 ship.
.2 threshold.
}

Vom Aufbau und der Funktionsweise gibt es kaum Unterschiede. Das Einzige, was hier verschieden ist, ist die Sensordatenbank, die mit InfluxDB funktioniert. In `helper.js` wurden die Methoden `fluxQueryTimeRange` für Sensordaten in einem bestimmten Zeitraum, `fluxQueryLatest` für die neuesten Sensordaten und `checkParams` zum Überprüfen der richtigen Zeitstempeleinheit (ISO 8601, UTC) definiert. Im Controller ist eine Map definiert, welche den Sensortypen ihren Bucket zuweist.  Ein Sensortyp kann z.B. Temperatur (temperature) oder Luftfeuchtigkeit (humidity) sein. Mit dieser Map wird der Code signifikant reduziert, da man nur noch eine `getSensorData(sensorType)` Funktion mit dem Sensortyp als Parameter haben muss. Als Pathvariablen werden die IDs des Containers und seines aktuellen Schiffes angegeben. Als Queryparameter fungieren die Start- und Stopzeit sowie ein boolscher Wert, der angibt, ob nur der neueste Wert des Sensors ausgegeben werden soll.

```{caption="Allgemeine Sensordaten Funktion" .js}
export const getSensorData = (sensorType) => {
  return tryCatchWrapper(async function (req, res, next) {
    // extract data from request parameters
    const ship = req.params.ship;
    const container = req.params.container;
    // extract data from request query
    const start = req.query.start;
    const stop = req.query.stop;
    const latest = req.query.latest;

    // get the configuration for the given sensor type
    const config = SENSOR_CONFIG[sensorType];
    if (!config) return next(createCustomError("Invalid sensor type", 400));

    // validate query parameters
    let flux;
    if (latest) {
      // build query for the latest data
      flux = fluxQueryLatest(config.bucket, ship, container);
    } else if (start && stop) {
      // validate start and stop
      const checked = checkParams(start, stop);
      if (checked) return next(createCustomError(checked, 400));

      // build query for the time range
      flux = fluxQueryTimeRange(config.bucket, ship, container, start, stop);
    } else {
      // invalid query parameters
      return next(createCustomError("No valid query parameters", 400));
    }

    // execute query
    const rows = await sensor_session(flux);
    return res.status(200).json({ [config.responseKey]: rows });
  });
};
```

Um eine erhöhte Praktikabilität bieten zu können, gibt es auch die Möglichkeit, alle neuesten Sensorwerte eines gesamten Containers aufzurufen. Hierbei werden nur die Schiffs- und Container-ID als Pathvariable benötigt.

```{caption="Funktion um alle Sensordaten eines Container zu bekommen" .js}
export const getAllSensorDataPerContainer = tryCatchWrapper(async function (req, res, next) {
  // extract data from request parameters
  const ship = req.params.ship;
  const container = req.params.container;

  // get data for all sensors
  const sensorDataPromises = Object.keys(SENSOR_CONFIG).map(async (sensorType) => {
    const config = SENSOR_CONFIG[sensorType];
    const flux = fluxQueryLatest(config.bucket, ship, container);
    const rows = await sensor_session(flux);
    return { [config.responseKey]: rows };
  });

  // resolve all promises
  const sensorDataArray = await Promise.all(sensorDataPromises);

  // combine results into a single object
  const sensorData = sensorDataArray.reduce((acc, data) => ({ ...acc, ...data }), {});

  return res.status(200).json({ sensor_data: sensorData });
});
```

#### Anwendung

Um nun die Daten mit den bereitgestellten Schnitstellen abzufragen, kann man cURL Anfragen stellen. Als erstes muss man sich einen Access Token mit seiner BenutzerID und dem zugehörigen Passwort holen.

```{caption="Access und Refresh Token vom Server abrufen" .sh}
curl --location 'https://api.contrude.eu/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "user": "1",
    "password": "Hello!23"
}'
```

Die darauffolgende JSON Response sieht wie folgt aus:

```{caption="Access und Refresh Token Response" .json}
{
    "accessToken": "aaa.bbb.ccc",
    "refreshToken": "xxx.yyy.zzz"
}
```

Um z.B. die Temperaturdaten für einen Container mit dem Access Token abfragen zu können, benötigt man folgende cURL Anfrage:

```{caption="Temperaturdaten eines Containers abfragen" .sh}
curl --location 'https://api.contrude.eu/rest/sensor/2/3/temperature?start=2025-03-25T10%3A30%3A00Z&stop=2025-03-25T10%3A31%3A00Z' \
--header 'Authorization: Bearer aaa.bbb.ccc'
```

Die gelieferten Temperaturdaten sind folgendermaßen formatiert:

```{caption="Temperaturdaten Response" .json}
{
    "temperature": [
        {
            "container": "3",
            "sensor": "temperature",
            "ship": "2",
            "time": "2025-03-25T10:30:17Z",
            "value": "44.27"
        }
    ]
}
```
