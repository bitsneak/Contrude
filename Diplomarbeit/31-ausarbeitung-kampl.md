# Teilaufgabe Schüler Kampl

\textauthor{Maximilian Silvester Kampl}

## Theorie

### Benötigte Hardwarekomponenten

Um ein Projekt zu realisieren, bei dem Umweltdaten ausgelesen werden, benötigt man geeignete Komponenten, auf denen die Software zuverlässig läuft. Bei der Auswahl dieser Komponenten spielten mehrere Faktoren eine Rolle, darunter die Kosten, die Größe sowie die Anzahl der verfügbaren Funktionen.

Unser finaler Prototyp sollte folgende Messungen ermöglichen:

- Temperatur
- Luftfeuchtigkeit
- Luftdruck
- Beschleunigung und Geschwindigkeit
- Standortbestimmung mittels GPS

Nach sorgfältiger Abwägung haben wir uns schließlich für die folgenden Komponenten entschieden:

1. ***ESP32***
   - **Grund**: Der ESP32 ist ein leistungsstarker und kostengünstiger Mikrocontroller mit integrierter WLAN- und Bluetooth Funktionalität. Er bietet eine höhere Rechenleistung als ein Arduino und ist im durchschnitt auch kleiner als jener, was für die mobile Nutzung vom Vorteil ist.
2. ***BME280***
   - **Grund**: Der BME280 ist ein vielseitiger Sensor, welcher sowohl die Temperatur, die Luftfeuchtigkeit als auch den Luftdruck messen kann. Außerdem ist er kompakt und kostengünstig.
3. ***MPU6050***
   - **Grund**: Der MPU6050 ist eine Kombination aus Beschleungiungssensor und Gyroskop. Damit können Bewegungen auf der X, der Y und der Z-Achse erfasst werden.
4. ***GY-GPSMV2***
   - **Grund**: Das GY-GPSMV2-Modul ermöglicht die Standortbestimmung über GPS. Es bietet eine hohe Genauigkeit und eine stabile Leistung, wodurch die Postion präzise erfasst werden kann.

#### Kosten

| Anzahl | Ort        | Produkt             | Einzelpreis | Lieferkosten | Preis gesamt |
|--------|-----------|----------------------|------------:|------------:|-------------:|
| 3      | Ali-Express | GY-NEO6MV2         | 3,19 €      | 2,46 €      | 12,03 €      |
| 3      | AZ         | BME280              | 3,47 €      | 5,98 €      | 16,39 €      |
| 32     | Reichelt   | Lochrasterplatinen  | 13,21 €     | 6,65 €      | 19,86 €      |
| 3      | AZ         | GY-521              | 2,50 €      | 5,30 €      | 12,79 €      |
| 1      | Amazon     | ET-Starterkit       | 16,13 €     | 3,99 €      | 20,12 €      |

| Preis Hardware insgesamt |
|--------|
|  81,19 € |

### Eingebettete Systeme

Um zu verstehen wie die Hardware nun funktioniert muss man ersteinmal wissen was ein Embedded System ist. Ein Eingebettetes System ist Teil eines viel größeren Systems wie z.B.: Handys, Autos, Waschmaschinen, usw..


Solche Systeme gibt es bereits seit den 1960. Damals baute der amerikanische Ingenieur Charles Stark Draper während des Apollo Raumprogrammes die erste integrierte Schaltung. Diese wurde dann auf dem Apollo Guidance Computer installiert um Flugdaten in Echtzeit sammeln zu können.
Später wurden dann solche Mikroprozessoren in der 1600 Serie von Volkswagen verwendet um das Kraftstoffeinspritzsystem zu steuern.
In den 70ern konnte Intel den ersten Prozessor entwickeln, welcher der Öffentlichkeit zugänglich war: den Intel 4004. Ein 4-Bit-Mikroprozessor, wlecher in Taschenrechnern und anderen kleineren elektronischen Geräte verwendet wurde.


Im Allgemeinen kann man sagen, dass ein Embedded System die Kombination von Software und Hardware ist für einen speziell programmierte Aufgabe. Obwohl man ein ES mit einem Computer gleichstellen kann, haben sie des öfteren keine Graphische Oberfläche für Benutzer.
[@EmbeddedSystems]

#### Komponenten

Die Hauptkomponenten eines Embedded Systems sind ein Mikroprozessor oder ein Mikrocontroller. Während ein Mikroprozessor lediglich eine CPU enthält, umfasst ein Mikrocontroller zusätzlich Speicher, Peripheriegeräte, GPIOs, Flash-Speicher und viele weitere Komponenten.

##### CPU

Die CPU (Central Processing Unit) ist die primäre Steuereinheit eines Systems. Sie besteht aus der ALU und der CU. Die ALU (Arithmetic Logic Unit) ist der Teil der CPU, der arithmetisch-logische Operationen mit binären Daten ausführt. Die CU (Control Unit) steuert mithilfe des internen Oszillators die Abläufe im System. Nachdem ein Befehl decodiert wurde, gibt die CU selbst weitere Befehle aus, um die korrekten Aktionen zu starten. Diese Befehle werden dann über den Bus aus dem Arbeitsspeicher abgerufen.

##### Bus

Der Bus verbindet die CPU mit den anderen Komponenten. Es gibt daher verschiedene Arten von Bussen, wie z. B. den Datenbus, den Adressbus und den Steuerbus. Je nach Prozessor können unterschiedlich viele Bits gleichzeitig übertragen werden. 
- **SPI (Serial Peripheral Interface):** Synchrone serielle Schnittstelle, ideal für die Verbindung von Peripheriegeräten. Verwendet MOSI, MISO und SCK Leitungen. 
- **I²C (Inter-Integrated Circuit):** Zweidraht-Bus mit Master-Slave-Kommunikation.
- **UART (Universal Asynchronous Receiver Transmitter):** Asynchrone serielle Verbindung, die ohne externen Taktgeber arbeitet.

##### RAM

Der Arbeitsspeicher wird RAM genannt, was für Random Access Memory steht. Der RAM speichert die auszuführenden Programmbefehle. Es gibt verschiedene Arten von RAM:
- **SRAM (Static RAM):** Schneller, benötigt keinen Refresh, verbraucht jedoch mehr Energie.
- **DRAM (Dynamic RAM):** Benötigt Refresh, ist langsamer und günstiger.

##### ROM

- **PROM:** Nur einmal programmierbar.
- **EPROM:** Kann mit UV-Licht gelöscht werden.
- **OTP-EPROM:** Einmal programmierbar und nicht löschbar.
- **Flash:** Elektronisch lösch- und beschreibbar, mit selektiven Löschmöglichkeiten.
- **EEPROM:** Elektrisch löschbar und neu beschreibbar, häufig zur Speicherung kleiner Datenmengen wie Seriennummern genutzt.

##### Register

Register sind temporäre Speicher, die teils festgelegte Verwendungszwecke (z. B. Befehls- oder Statusregister) haben und teils für allgemeine Aufgaben genutzt werden.

##### Peripherie

- **GPIO (General Purpose Input/Output):** Konfigurierbar als digitale Ein- oder Ausgänge.
- **Timer:** Überwachung und Steuerung zeitkritischer Prozesse.
- **Watchdog:** Sicherheit durch Neustart bei Fehlfunktionen.
- **DMA (Direct Memory Access):** Direkter Datentransfer zwischen Speicher und Peripherie ohne CPU-Beteiligung.

##### Firmware

Die Firmware ist eine softwarebasierte Komponente, die fest in einem elektronischen Gerät implementiert ist und auf einem nicht-flüchtigen Speicher abgelegt wird (z. B. Flash oder EEPROM). Sie verbindet Hardware mit der Anwendungssoftware.

##### Recheneinheit

- **General-Purpose-Prozessoren:** Vielseitig einsetzbar, aber weniger spezialisiert.
- **Mikrocontroller:** Integrieren CPU, Speicher und Peripherie in einem Chip.
- **Digitale Signalprozessoren (DSPs):** Für Echtzeit-Signalverarbeitung optimiert.
- **ASICs:** Für spezifische Anwendungen entwickelte Chips, mit hoher Effizienz und begrenzter Flexibilität.
- **FPGAs:** Programmierbare Hardware, flexibel und rekonfigurierbar, besonders in der Entwicklung von ASICs nützlich.

#### Zusätzliche Module

- **A/D- und D/A-Wandler:** Ermöglichen die Umwandlung zwischen analogen und digitalen Signalen. Wichtig für Sensoranwendungen.
- **PWM (Pulsweitenmodulation):** Steuerung von LEDs, Motoren oder anderen Aktoren durch variable Einschaltdauer eines Signals.


### Aufbau des Prototypen

#### PlatformIO

Um ein Programm erfolgreich auf dem ESP32 ausführen zu können, benötigt man eine geeignete IDE (Integrated Development Environment). Eine der bekanntesten und am weitesten verbreiteten Entwicklungsumgebungen für Mikrocontroller ist die Arduino IDE. Allerdings stießen wir bei unserem Projekt auf Anforderungen, die mehr Kontrolle über den Entwicklungs- und Upload-Prozess erforderten. Daher entschieden wir uns für eine professionellere und flexiblere Lösung: PlatformIO.

<img src="img/Kampl/ArduinoIDE.png" alt="ArduinoIDE" width="500"/>

---

<img src="img/Kampl/PlatformIO.png" alt="PlatformIO" width="700"/>

PlatformIO ist eine Entwicklungsumgebung, die als Erweiterung für den Texteditor Visual Studio Code genutzt wird. Sie bietet eine bessere Projektstruktur, eine fortschrittlichere Konfigurationsverwaltung und umfangreiche Unterstützung für verschiedene Mikrocontroller. Zwei zentrale Elemente sorgen dabei für einen reibungslosen Ablauf: die Hauptdatei (Main-File) und die Plattform-Konfigurationsdatei (.ini-File). Besonders die .ini-Datei spielt eine entscheidende Rolle, da sie die Projektkonfiguration festlegt und sicherstellt, dass der Upload-Prozess auf den Mikrocontroller zuverlässig und ohne Komplikationen funktioniert.

```{caption="Beispiel einer .ini Datei" .ini}
    ; PlatformIO Project Configuration File
    ;
    ;   Build options: build flags, source filter
    ;   Upload options: custom upload port, speed and extra flags
    ;   Library options: dependencies, extra library storages
    ;   Advanced options: extra scripting
    ;
    ; Please visit documentation for the other options and examples
    ; https://docs.platformio.org/page/projectconf.html

    [env:board_name]
    platform = platform_name
    board = board_name
    framework = framework_name

    ; Zusätzliche Konfigurationsoptionen
    monitor_speed = 115200   ; Serielle Monitor-Geschwindigkeit
    upload_speed = 115200    ; Upload-Geschwindigkeit
    build_flags = -DDEBUG    ; Build-Flags hinzufügen
    lib_deps =               ; Bibliotheken hinzufügen
        library1
        library2
```

[@gpt-inifile]

##### Aufsetzen

Um PlatformIO benutzen zu können muss man ganz einfach die PlatformIO IDE in Visual Studio installieren. Nach der Installation und einem schnellen Neustart kann man ein erstes Projekt erstellen.

Um nun ein erstes Projekt zu erstellen muss mann einfach nur auf den PlatformIO Home Knopf drücken. Danach drückt man auf "New Project" und wähl das passende Board aus. [@PlatformIO-firststeps]

##### Tools

<img src="img/Kampl/platformio-ide-vscode-toolbar.png" alt="Toolbar" width="500"/>

<br>

1. **Home**: sorgt dafür, dass das Home Menü von PlatformIO. In diesem kann man seine Projekte verwalten sowie Bibiliothekten für das aktuelle hinzufügen.
2. **Build**: Kompiliert den Code des Projekts und erstellt eine Datei welche auf den Mikrocontroller hochgeladen werden kann.
3. **Upload**: Lädt die erstellte Datei von der Build Funktion auf das Festgelegte Zielgerät, in unseren Fall ein ESP32, hoch.
   1. Zuerst sucht PlatformIO nach richtigen Port. Entweder in der .ini-Datei festgelegt oder er wird automatisch erkannt.
   2. Die Firmware (.bin oder .hex Datei) wird auf das Gerät über den Port hochgeladen.
   3. Während des Uploads wird jeglicher Fortschritt im Terminal angezeigt.
4. **Clean**: Löscht alle temporären Dateien, welche  beim Build-Prozess erstellt wurden. (z.B.: kompilierte Objektdateien, die Firmware-Datei). Im Grunde wird der /.pio Ordner gelöscht.
5. **Serial Port Monitor**: Öffnet eine Konsole innerhalb von Visual Studio, welche die Kommunikation zwischen dem ESP32 und dem Computer überwacht. Wichtig dabei ist zu beachten das die Baudrate richtig eingestellt ist. Normale Baudraten sind 9600 sowie 115200.
6. **Core (CLI)**: Ist eine Kommandozeilen-Toolbox, welche die vorher genannten Funktionen anbietet.
7. **Project Environment Switcher**: Erlaubt es zwischen verschiedenen Umgebungen innerhalb eines Projektes zu wechseln, falls sie vorhanden sind. Diese Umgebungen werden in der platformio.ini Datei angelegt. Das könnte ungefähr so aussehen:

```{caption="BeispielVonMehrerenUmgebungen" .ini}
[env:esp32]
platform = espressif32
board = esp32dev
framework = arduino

[env:stm32]
platform = ststm32
board = nucleo_f401re
framework = mbed
```

[@PlatformIO-firststeps]

### C++

### Datenübertragung

#### MQTT

#### Miscalanious

## Praktische Arbeit

### Zusammensetzen und Löten des Prototypen

### Schreiben eines MQTT Programmes

### Durchführung der Tests (kontinuirlich)

### Erzeugen von Java Quellcode
