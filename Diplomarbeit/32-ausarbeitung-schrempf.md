# Teilaufgabe Schüler Schrempf

\textauthor{Marko Daniel Schrempf}

## Theorie

### Datenspeicherung- und Visualisierung

Eine Datenbank ermöglicht die Speicherung und Verwaltung von zusammenhängenden Daten. Hier können große Datenmengen übersichtlich dargestellt werden. Es gibt verschiedenste Datenbankkonzepte, welche auf ihre eigene Art und Weise Vor- und Nachteile bringen. In dieser Ausarbeitung wird sich auf zwei funktional unterschiedliche Arten fokussiert.

#### Relational

In einem relationalen Datenbanksystem werden Daten in Form von Tabellen gespeichert. Jede Tabelle hat eine Relation zu einer anderen Tabelle, entweder inhaltich oder strukturell. Durch diese Beziehungen, wenn sie richtig definiert sind, werden Redundanzen vermieden. Um solche Beziehungen richtig aufzubauen gibt es das Konzept der Normalisierung.

@Nachhilfe-Team
> Die Normalisierung von relationalen Datenbanken ist ein Vorgehen, bei dem die Ausgangstabelle in mehrere kleine Tabellen zerlegt wird. Dann werden sie über Fremdschlüssel in Beziehung gesetzt. Ziel einer solchen Normalisierung ist das Erschaffen einer redundanzfreien Datenspeicherung, die Vermeidung von Anomalien, sowie die Erstellung eines klar strukturierten Datenbankmodells.

Der entscheidende Vorteil von RDBs ist, dass sie eine gemeinsame standardisierte Sprache für die Datenabfrage- und verarbeitung besitzen - SQL. In relationalen Datenbanken werden primär Informationen persistiert, welche auf längere Zeit vorhanden bleiben und auf die nicht in kurzen Zeitintervallen zugegriffen wird.

#### Zeitreihe

In einem zeitreihen basierten Datenbanksystem werden Daten mit einem korrespondierenden Zeitstempel versehen. In anderen DBs ist das Speichern einer Zeitmarke per Wert zwar auch möglich, jedoch weist eine TSDB jedem einzelnen Wert automatisch einen eindeutigen Timestamp zu und vermerkt den daraus resultierenden Datensatz in einer Historie. In dieser ist der gesamte zeitliche Verlauf des Attributs festgehalten.

Zeitreihen DBs sind optimiert auf viele schreib und lese Operationen und sind nicht auf das verändern bzw. löschen der Datensätze ausgelegt. Je nach DBMS können verschiedene Erfassungszeiträume und somit auch die Granularitiät des Timestamps definiert werden. Dies kann von Millisekunden bis hin zu Tagen gehen. Außerdem gibt es keine einheitliche Query-Sprache. In TSDBs werden Metriken, Sensordaten und generell Werte mit hoher Änderungsrate persistiert.

Ein Sonderfall der TSDB ist die Round Robin Database (RRD). Diese löscht alte Datensets nach einer definierten Zeit und / oder aggregiert sie auf einen Wert zusammen.

#### Visualisierungsarten

@aws
> Datenvisualisierung ist der Prozess der Verwendung visueller Elemente wie Diagramme, Grafiken oder Karten zur Darstellung von Daten. Sie übersetzt komplexe, umfangreiche oder numerische Daten in eine visuelle Darstellung, die leichter zu verarbeiten ist.

Um Rohdaten verständlich zu machen, im Kontext betrachten zu können und etwaige Korrelationen zwischen verschiedenen Datensets sichtbar zu machen, ist es notwendig, die oben genannten Methoden anzuwenden. Hierbei ist eine unkomplizierte Grafik als Endprodukt das Ziel.

Um solch ein Ergebnis zu erreichen, müssen vorhandene Daten bereinigt, gefiltert und ausgewählt werden. Beim Erstellen der Visualisierungen muss eine Verzerrung der Daten hinsichtlich Trivialisierung, Überspitzung und menschlichen Vorurteilen vermeiden werden.

### CI/CD

#### Server

#### Docker

#### Pipeline

### REST API

#### Design

#### JavaScript

## Praktische Arbeit

### Datenspeicherung- und Visualisierung

#### MySQL

#### InfluxDB

#### Grafana

### CI/CD

#### Server

#### Docker

#### GitHub Action

### REST API

#### JavaScript
