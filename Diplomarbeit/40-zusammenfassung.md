# Zusammenfassung

## Allgemein

 Die fehlerhafte Identifikation von Containern beim Verladen führt häufig zu falschen Platzierungen und Verlusten während des Transports, die erst im Zielhafen bemerkt werden. Zudem ist der Zustand des Containerinhalts schwer nachverfolgbar, was problematisch für sensible Güter sein kann.

## Arbeit

In unserer Diplomarbeit wird ein Prototyp entwickelt, welcher Umweltdaten erfasst und diese dann an einen Server schickt. Der Protoyp besteht aus einem Mikrocontroller und Sensoren zur Erfassung der Temperatur, des Luftdrucks, der Koordinaten und der Beschleunigung. Mithilfe eines auf dem Halbleiterchip dauerhaft laufenden C++ Programmes können mehrere Controller ein Mesh-Netzewerk aufbauen und miteinander kommunizieren. Die Daten werden dann an einen selbst geschriebenen JavaScript Server geschickt, welcher diese verarbeitet und in die passenden Datenbanken persistiert. Für die Bereitstellung der Daten stehen REST-Schnittstellen zur Verfügung.
Eine grafische Oberfläche, welche mit React kreiert wurde, greift auf diese Schnittstellen zu, um Schiffe, Container und deren umweltspezifischen Eigenschaften darzustellen.
Des weiteren können die für einzelne Container festgelegten Grenzwerte eingesehen werden. Wenn einzelne Werte, die von den Grenzwerten festgelegten Bedingungen auslösen, so wird dies dem Benutzer visualisiert.

## Probleme

Der verwendete Lötkolben hatte aufgrund seiner Erstbenutzung noch keine Zinnschicht an der Spitz, das führte zu einer verminderten Wärmeleitfähigkeit, wodurch der gesamte Lötvorgang mehr Zeit in Anspruch genommen hat als angenommen.

Aufgrund mangelnder Sorgfalt während des Lötvorgangs wurden einige Komponenten beschädigt oder unbrauchbar gemacht. Dies führte dazu, dass sie ausgetauscht werden mussten.
 
In den frühen Stadien des Projektes wurde eine MySQL-Version verwendet, welche den Check-Constraint zwar bereits im Syntax  akzepierte aber nicht funktional implementierte. Deswegen wurde auf eine neuere Version gewechselt.

Wenn keine konkrete Version eines Images in Docker angebene ist, dann sucht sich die Engine automatisch eine aus den neuesten verfügbaren Versionen aus. 

Da es Umstruckturierungen im Projekt gab, musste der anfänglich geplante Positionierungsalgorithmus gestrichen werden. Erstezt wurde durch die Containersimulator Anwendung.

Die Anbindung des Backends and die grafische Oberfläche stellte sich als besonders schwierig da, weil das selbstgenerierte SSL-Zertifikat nicht vom Browser akzeptiert wurde. Des weiteren wird es in einigen Fällen auch nicht von einigen Bibliotheken, wie etwa Axios, akzeptiert.
Dies führt dazu, dass die Webseite keine Daten aus den Datenbanken abrufen konnte.
Um dieses Problem zu lösen, wurde Google Chrome mit speziellen Startparameter geöffnet um die Sicherheitsfeatures zu umgehen. In der Industrie würde man sich solche SSL-Zertifikate von gewissen Authentifizierungsstellen prüfen lassen damit man sie verwenden kann.

## Ausblick

### Hülle

Um den Prototypen vor äußeren Umwelteinflüssen wie Salzwasser, Staub und anderen widrigen Bedingungen zu schützen, soll eine schützende Hülle entwickelt werden. Diese Hülle soll dafür sorgen, dass der Prototyp auch unter schwierigen Bedingungen zuverlässig funktioniert.

### Batterie-/Akkusystem

Ein Batterie- oder Akkusystem soll entwickelt werden, um den Prototypen unabhängig und zuverlässig mit Energie zu versorgen. Dabei wird auf eine ausreichende Kapazität und Langlebigkeit geachtet, damit der Prototyp auch über längere Zeiträume ohne externe Stromquelle betrieben werden kann.

### Docker Compose zu Kubernetes

Um die Skalierbarkeit und Flexibilität der Infrastruktur zu verbessern, soll Kubernetes anstatt von Docker Compose verwendet werden. Kubernetes ermöglicht es, die verschiedenen Services auf mehrere Hosts zu verteilen und sorgt durch Load-Balancing für eine effizientere Ressourcennutzung und Ausfallsicherheit.

### Schiffsdatenbank

Die bestehende Schiffsdatenbank soll ausgebaut werden, sodass es nicht nur die Möglickeit gibt die grundlegendsten Informationen, sondern auch detailliertere Daten von den Schiffen zu speichern.

### Webseite erweitern

Die Webseite soll so erweitert werden, dass Nutzer in der Lage sind, Daten hinzuzufügen. Dies umfasst unter anderem die Möglichkeit, Favoriten zu speichern sowie Grenzwerte für Container und deren Umweltdaten zu definieren und zu verwalten. Außerdem soll es möglich sein, neue Schiffe und Container zum System hinzuzufügen.

### Konfiguration der Mikrocontroller

Es wird angestrebt, die Webseite so weiterzuentwickeln, dass darüber die Mikrocontroller direkt konfiguriert werden können. Dies umfasst die Einstellung von Parametern zur Bestimmung des WLAN-Netzwerks wie der Name und das Passwort.

### Security Features

Die Sicherheitsfunktionen sollen ausgebaut werden, um eine sichere Datenverarbeitung und -speicherung zu gewährleisten. Dazu gehört unter anderem, dass lokaler Speicher vermieden wird, um das Risiko von Datenverlust und unbefugtem Zugriff zu minimieren.
