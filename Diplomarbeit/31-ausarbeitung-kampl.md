# Teilaufgabe Schüler Kampl

\textauthor{Maximilian Silvester Kampl}

## Theorie

### Eingebettete Systeme

Ein Eingebettetes System ist Teil eines viel größeren Systems wie z.B.: Handys, Autos, Waschmaschinen, usw..

Solche Systeme gibt es bereits seit den 1960. Damals baute der amerikanische Ingenieur Charles Stark Draper während des Apollo Raumprogrammes die erste integrierte Schaltung. Diese wurde dann auf dem Apollo Guidance Computer installiert um Flugdaten in Echtzeit sammeln zu können.
Später wurden Mikroprozessoren in der 1600 Serie von Volkswagen verwendet um das Kraftstoffeinspritzsystem zu steuern.
In den 70ern konnte Intel den ersten Prozessor entwickeln, welcher der Öffentlichkeit zugänglich war: den Intel 4004. Ein 4-Bit-Mikroprozessor, wlecher in Taschenrechnern und anderen kleineren elektronischen Geräte verwendet wurde.

Im Allgemeinen kann man sagen, dass ein Embedded System die Kombination von Software und Hardware ist für einen speziell programmierte Aufgabe. Obwohl man ein ES mit einem Computer gleichstellen kann, haben sie des öfteren keine Graphische Oberfläche für Benutzer.
[vgl. @EmbeddedSystems]

#### Komponenten

Die Hauptkomponenten eines Embedded Systems sind ein Mikroprozessor oder ein Mikrocontroller. Während ein Mikroprozessor lediglich eine CPU enthält, umfasst ein Mikrocontroller zusätzlich Speicher, Peripheriegeräte, GPIOs, Flash-Speicher und viele weitere Komponenten.

![Aufbau](img/Kampl/AufbauES.jpg){width=300px}

##### CPU

Die CPU (Central Processing Unit) ist die primäre Steuereinheit eines Systems. Sie besteht aus der ALU und der CU. Die ALU (Arithmetic Logic Unit) ist der Teil der CPU, der arithmetisch-logische Operationen mit binären Daten ausführt. Die CU (Control Unit) steuert mithilfe des internen Oszillators die Abläufe im System. Nachdem ein Befehl decodiert wurde, gibt die CU selbst weitere Befehle aus, um die korrekten Aktionen zu starten. Diese Befehle werden dann über den Bus aus dem Arbeitsspeicher abgerufen.

##### Bus

Der Bus verbindet die CPU mit den anderen Komponenten. Es gibt daher verschiedene Arten von Bussen, wie z. B. den Datenbus, den Adressbus und den Steuerbus. Je nach Prozessor können unterschiedlich viele Bits gleichzeitig übertragen werden.

	
Des weiteren kann mann Busse noch in 

2 Typen nach der Breite aufteilen:

1. Parallel: Beim parallelen System gibt es mehrere Leitungen welche gleichzeitig Daten verschicken wodurch die Breite viel höher ist.
2. Seriell: Serielle Systeme verschicken über eine Leitung Bitweise also nacheinander ihre Daten. Das bedeutet auch wenn ein Datenfluss stopt, stoppen alle. Aus diesem Grund ist ein serieller Bus meist langsamer und günstiger als ein paralleler. Außerdem kann man Serielle Busse noch in synchron, also taktbasiert mit einer Clock damit Sender und Empfänger *synchron* arbeiten und asynchron, also durch Steurerleitungen und Protokolle koordiniert, einteilen.
 

##### Schnittstellen

- **SPI:**^[Serial Peripheral Interface] Eine synchrone serielle Schnittstelle, ideal für die Verbindung von Peripherigeräten.

    Es besteht aus den drei Leitungen POCI^[Peripheral Out/Controller In] oder auch MISO^[Master In/Slave Out], PICO/MOSI^[Peripheral In/Controller Out | Master Out/Slave In] und der Serial Clock. Außerdem dem gibt es noch den Slave-Select, aber da dies ein äußert problematischer Außdruck ist wurde es zu Chip-Select umbenannt. Die Chip-Select Leitung sorgt dafür, dass der Controller ein Peripherigerät zur Kommuniaktion auswählt.

    Bei der SPI-Kommunikation gibt es keinen klaren Sender oder Empfänger, sondern einen kontinuierlichen Austausch, da sowohl die Peripherie als auch der Controller gleichzeitig ein Bit übertragen. Die Peripherie steuert die Kommunikation, indem sie die SCK-Impulse generiert, während der Controller das Signal annimmt und verarbeitet. Selbst wenn noch kein Ergebnis vorliegt, misst die Peripherie die Polarität der PICO/MOSI-Leitung und bestimmt daraus das nächste Bit.

- **UART:**^[Universal Asynchronous Receiver Transmitter] Asynchrone serielle Verbindung, die ohne externen Taktgeber arbeitet.

    UART ist eine serielle  Schnittstelle, die asynchron arbeitet. Sie wurde entwickelt,  um die Kommunikation zwischen digitalen Geräten zu ermöglichen, und wird häufig in  Mikrocontrollern, Computern und anderen elektronischen Geräten verwendet. Im Gegensatz zu synchronen Schnittstellen wie SPI oder I2C benötigt UART keine zusätzliche Taktleitung, sondern synchronisiert sich durch Start- und Stop-Bits. Der Datenaustausch erfolgt über zwei Leitungen, wobei ein Gerät als Sender und das andere als Empfänger fungiert.

    UART verwendet in der Regel zwei Hauptleitungen: TX^[Transmit] zum Senden und RX^[Receive] zum Empfangen von Daten. Zusätzlich können für die Hardware-Flow-Control weitere Leitungen genutzt werden, wie RTS^[Request to Send], mit dem der Sender signalisiert, dass er bereit ist, Daten zu übertragen, und CTS^[Clear to Send], das dem Sender anzeigt, dass der Empfänger bereit ist. 

- **I2C:**^[Inter-Integrated Circuit] Serieller Zweidraht-Bus mit Master-Slave-Kommunikation.
        
    In einem I2C-Bus gibt es mindestens einen Master und bis zu 127 Slaves. Ein Bus mit mehreren Mastern wird als Multi-Master-Bus bezeichnet. Jeder Slave benötigt eine eigene 7- oder 10-Bit-Adresse, um individuell mit einem Master kommunizieren zu können. Zusätzlich gibt es eine Broadcast-Adresse, über die alle Slaves gleichzeitig angesprochen werden können. Wie bei SPI beginnt die Kommunikation erst, wenn der Master einen Slave adressiert. Anders als bei SPI wird jedoch festgelegt, ob gesendet oder empfangen wird. Die Übertragung erfolgt durch Start- und Stopp-Bedingungen, die der Master über die Zustände der Takt- und Datenleitung steuert. Nach einer erfolgreichen Kommunikation senden die Slaves ihre Adresse und im Schreibfall ein Acknowledge.

##### RAM

RAM ist eine Art Speichertyp, in welchem die Speicherzellen direkt angesprochen werden. In
diesem Zusammenhang spricht man dann von *Speicher mit wahlfreiem Zugriff*. Das heißt RAM
erlaubt den Zugriff jede Speicherzelle.
RAM wird in Computer als Arbeitsspeicher verwendet, weil es eine schnelle Verarbeitung vom
Prozessor garantiert. Im Grunde unterscheidet man zwischen zwei Arten von RAMs:

- **SRAM:**^[Static RAM] Der schnellere der zwei Ram-Typen. Er speichert seine Inahlte mittels Flip-Flops und benötigt deshalb auch keine Refreshes. Jedoch ist der Einsatz von Flip-Flops äußerst Stromaufwendig und zu dem auch noch teuer. Trotzdem wird aufgrund eben dieser Kippglieder der SRAM häufig als Cache oder Puffer eingesetzt, da der Inhalt nach dem Abruf immer noch erhalten bleibt.
- **DRAM:**^[Dynamic RAM] Die einfache und billigere Variante. Der DRAM benutzt Kondensatoren als Speicherelement. Dabei muss über sogenannte Refreshes immer wieder die Spannung neugeladen werden wodurch der komplette Prozess langsamer wird. Jedoch hat er ingegensatz zum SRAM einen geringeren Stromverbrauch.

##### ROM

- **PROM** ^[Programmable Read-Only Memory]: Dieser Speichertyp kann nur einmal beschrieben werden. Beim Programmieren werden selektiv Sicherungen durchgebrannt, sodass die gespeicherten Daten nicht mehr verändert werden können.  

- **EPROM** ^[Erasable Programmable Read-Only Memory]: Dieser Speicher kann mit UV-Licht gelöscht werden. Dazu ist ein spezielles Quarzfenster erforderlich, durch das das UV-Licht die Speicherzellen erreicht und löscht, sodass der Speicher erneut beschrieben werden kann.  

- **OTP-EPROM** ^[One-Time Programmable EPROM]: Eine spezielle Variante des EPROM, die nicht mit UV-Licht gelöscht werden kann. Das liegt daran, dass der Speicher in ein lichtundurchlässiges Gehäuse eingeschweißt ist, wodurch ein erneutes Löschen verhindert wird.  

- **Flash**: Elektronisch lösch- und beschreibbarer Speicher, der in Blöcken oder einzelnen Sektoren selektiv gelöscht werden kann. Während das Schreiben und Löschen relativ langsam ist, erfolgt das Lesen sehr schnell. Flash-Speicher ersetzt zunehmend traditionelle ROM-Typen.  

- **EEPROM** ^[Electrically Erasable Programmable Read-Only Memory]: Dieser Speicher kann elektrisch gelöscht und erneut beschrieben werden. Er wird oft für kleine, nichtflüchtige Datenspeicher wie Seriennummern oder MAC-Adressen in elektrischen Geräten verwendet. EEPROMs benötigen im Vergleich zu Flash-Speichern weniger Pins und werden meist seriell beschrieben.  
[vgl. @EmbeddedSystems]

##### Register

Register sind temporäre Speicher, die teils festgelegte Verwendungszwecke (z. B. Befehls- oder Statusregister) haben und teils für allgemeine Aufgaben genutzt werden.

##### Peripherie
- **GPIO** ^[General Purpose Input/Output]: GPIO-Pins sind flexibel nutzbare Ein- und Ausgänge eines Mikrocontrollers. Sie können als digitale Eingänge zur Erfassung von Tasterzuständen oder Sensordaten sowie als digitale Ausgänge zur Steuerung von LEDs, Motoren oder anderen Komponenten genutzt werden. Manche GPIOs verfügen über zusätzliche Funktionen, wie ADC-Eingänge oder Timer-Steuerung.  

- **Timer:** Das Timer-Modul dient zur Überwachung und Steuerung zeitkritischer Prozesse. Es kann als einfacher Zähler, zur Erzeugung von PWM-Signalen oder zur Zeitmessung verwendet werden. Timer-Interrupts ermöglichen präzise Steuerungen in Echtzeitanwendungen.  

- **Watchdog:** Der Watchdog-Timer erhöht die Sicherheit eines Systems, indem er einen automatischen Neustart auslöst, wenn das System nicht in regelmäßigen Abständen auf ihn reagiert. Dies verhindert ein Hängenbleiben oder Blockieren der Software und sorgt für eine höhere Zuverlässigkeit in Embedded-Systemen. Umgangssprachlich wird er als Todmansschalter bezeichnet.

- **DMA** ^[Direct Memory Access]: Der Direct Memory Access ermöglicht es Peripheriegeräten, Daten direkt mit dem Speicher auszutauschen, ohne die CPU zu belasten. Dies beschleunigt den Datentransfer erheblich, insbesondere bei großen Datenmengen wie Audio- oder Videodaten, und verbessert die Gesamtleistung des Systems.  
[vgl. @EmbeddedSystems]

##### Firmware

Die Firmware ist eine softwarebasierte Komponente, die fest in einem elektronischen Gerät implementiert ist und auf einem nicht-flüchtigen Speicher abgelegt wird (z. B. Flash oder EEPROM). Sie verbindet Hardware mit der Anwendungssoftware.

##### Recheneinheit

- **General-Purpose-Prozessoren:** Vielseitig einsetzbar und mit hoher Rechengeschwindigkeit ausgestattet. Sie verfügen über mehrschichtige Caches und sind für allgemeine Anwendungen optimiert, weisen jedoch keine integrierte Peripherie (wie Timer oder umfangreichen Speicher) auf, was sie weniger spezialisiert macht.

- **Mikrocontroller:** In einem einzigen Chip vereint ein Mikrocontroller CPU, Speicher und Peripherieelemente (wie Bus-Treiber, PWM-Units, A/D- und D/A-Wandler). Diese enge Integration ermöglicht eine optimale Anpassung an spezifische Aufgaben in Embedded Systems, oft sogar ohne die Notwendigkeit eines externen Taktgebers, da interne Taktgeneratoren zur Verfügung stehen.

- **Digitale Signalprozessoren (DSPs)** ^[Digitale Signalprozessoren]: Optimiert für die Echtzeit-Signalverarbeitung, bieten DSPs einen erweiterten Befehlssatz und spezielle Hardwareeinheiten – etwa Multiply-Accumulate-Einheiten (MAC) – zur effizienten Durchführung rechenintensiver Operationen, was sie ideal für Audio-, Video- und Kommunikationsanwendungen macht.

- **ASICs** ^[Application Specific Integrated Circuits]: Diese speziell für bestimmte Anwendungen entwickelten Chips sind hinsichtlich Geschwindigkeit, Energieeffizienz, Baugröße und Zuverlässigkeit hoch optimiert. Ihre unflexible Natur und die hohen Kosten bei Entwicklung und Fertigung in kleinen Stückzahlen machen sie vor allem für Massenfertigung wirtschaftlich.

- **FPGAs** ^[Field-Programmable Gate Arrays]: Programmierbare Hardwarebausteine, die vor der Verwendung nicht auf ein konkretes Verhalten festgelegt sind. FPGAs lassen sich mehrfach rekonfigurieren, was sie besonders in der Entwicklung (z. B. als Testumgebung für ASICs) attraktiv macht – wenngleich sie im Vergleich zu spezialisierten Mikrocontrollern oft teurer sind und bei gleicher Technologie eine etwas geringere Performance bieten.
[vgl. @EmbeddedSystems]

#### Zusätzliche Module

- **A/D- und D/A-Wandler:**^[Analog/Digital & Digital/Analog Wandler] Ermöglichen die Umwandlung zwischen analogen und digitalen Signalen. Wichtig für Sensoranwendungen.
- **PWM:**^[Pulsweitenmodulation] Steuerung von LEDs, Motoren oder anderen Aktoren durch variable Einschaltdauer eines Signals.

### Der Prototyp
	
#### IDE

Um ein Programm erfolgreich auf dem ESP32 ausführen zu können, benötigt man eine geeignete IDE^[Integrated Development Environment]. Aber was genau ist eine IDE?

>Eine integrierte Entwicklungsumgebung (IDE) ist Software für eine optimierte Anwendungsentwicklung, die gängige Entwicklertools in einer zentralen grafischen Oberfläche vereint.
[@RedHatIDE]

Jede IDE enthält in der Regel ähnliche Standardkomponenten, darunter einen integrierten Code-Editor – also einen Texteditor mit Syntax-Highlighting und gegebenenfalls Autovervollständigung –, ein Programm zum Bauen und Kompilieren des Codes sowie einen Debugge. [vgl. @RedHatIDE]

##### Vorteile

**IDEs bieten viele Vorteile, die beim Schreiben von Code unterstützen.**

Während intelligente Code-Vervollständigung und -Generierung eher als *Nice-to-have*-Features gelten, gibt es echte Zeitersparnisse. Besonders das **Echtzeit-Parsen von Code** spart erheblich Zeit bei der Fehlersuche. Zudem beinhalten IDEs häufig Funktionen, die speziell auf eine Programmiersprache zugeschnitten sind.

Ein Beispiel dafür ist **IntelliJ**, eine von der Firma JetBrains entwickelte IDE, die speziell für Java konzipiert wurde. Sie bietet unter anderem folgende Funktionen:

- **Generierung ganzer POJO-Klassen** per Knopfdruck
- **Herunterladen von JDKs**^[Java Development Kit]
- **Darstellung von Dokumentationen** als Kommentaren im Fließtext


#### PlatformIO

Eine der bekanntesten und am weitesten verbreiteten Entwicklungsumgebungen für Mikrocontroller ist die Arduino IDE. Allerdings stießen wir bei unserem Projekt auf Anforderungen, die mehr Kontrolle über den Entwicklungs- und Upload-Prozess erforderten. Daher entschieden wir uns für eine professionellere und flexiblere Lösung: PlatformIO.

![ArduinoIDE](img/Kampl/ArduinoIDE.png){width=400px}

---

![PlatformIO](img/Kampl/PlatformIO.png){width=400px}


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

Um PlatformIO benutzen zu können muss man die *PlatformIO IDE* in Visual Studio installieren. Nach der Installation und einem Neustart kann man ein erstes Projekt erstellen.

Um nun ein erstes Projekt zu erstellen muss mann einfach nur auf den PlatformIO Home Knopf drücken. Danach drückt man auf *New Project* und wähl das passende Board aus. [@PlatformIO-firststeps]

##### Tools

![Toolbar [@PlatformIO-firststeps]](img/Kampl/platformio-ide-vscode-toolbar.png){width=500px}

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

```{caption="Beispiel Von Mehreren Umgebungen" .ini}
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

### Programmieren

Da wir nun eine vollständig funktionsfähige Entwicklungsumgebung besitzen und auch wissen, wie man diese einsetzt, können wir mit der tatsächlichen Programmierung starten. Wir verbinden den ESP32 mit unserem Computer oder Laptop über ein USB-Kabel und schreiben unsere ersten Code-Snippets, um zu testen, ob der Mikrocontroller ordnungsgemäß funktioniert.


```{caption="BME Testprogramm" .cpp}
// TestProgramm
void setup() {
  // Seriellen Monitor mit Baudrate 115200 starten
  Serial.begin(115200);
  Serial.println("ESP32 LED-Blinktest gestartet!");

  // LED-Setup (Standardmäßig GPIO 2 für die Onboard-LED)
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  // LED ein
  Serial.println("LED AN");
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);

  // LED aus
  Serial.println("LED AUS");
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
```


Jetzt, da wir wissen, dass unser Gerät funktioniert, können wir mit der weiteren Entwicklung beginnen. Zuerst sollten wir jeden einzelnen Sensor separat ansprechen, um auch hier zu testen, ob die Sensoren funktionieren. Ein Schritt nach dem anderen.

#### BME280

Zuvor müssen wir jedoch einige Bibliotheken hinzufügen damit wir den BME280 einfacher ansprechen können. Die verbreitetste Bibliothek ist die **Adafruit BME280 Library**. Man fügt sie dem Projekt hinzu indem man etweder man die folgende Zeile ```adafruit/Adafruit BME280 Library@^2.2.4``` unter dem Punkt **lib_deps** in der .ini-Datei hinzufügt, oder indem man PlatformIO verwendet, um die Library automatisch hinzuzufügen. 

![BME-Library](img/Kampl/BME-Library.png){width=300px}

Außerdem benötigt man noch die ```adafruit/Adafruit BME280 Library@^2.2.4```, welche als Schnittstelle für die Sensoren dient.

Am Ende verwenden wir folgenden Code für unseren Sensor:

```{caption="BME Testprogramm" .cpp}
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME280 bme; 

unsigned long delayTime;

void printValues();

void setup() {
    Serial.begin(115200);
    Serial.println(F("BME280 test"));

    
    if (!bme.begin(0x76)) {
        Serial.println("Could not find a valid BME280 sensor, check wiring, address, sensor ID!");
        Serial.print("SensorID was: 0x"); Serial.println(bme.sensorID(),16);
        Serial.print("        ID of 0xFF probably means a bad address, a BMP 180 or BMP 085\n");
        Serial.print("   ID of 0x56-0x58 represents a BMP 280,\n");
        Serial.print("        ID of 0x60 represents a BME 280.\n");
        Serial.print("        ID of 0x61 represents a BME 680.\n");
        while (1) delay(10);
    }
    
    Serial.println("-- Default Test --");
    delayTime = 1000;

    Serial.println();
}


void loop() { 
    printValues();
    delay(delayTime);
}


void printValues() {
    Serial.print("Temperature = ");
    Serial.print(bme.readTemperature());
    Serial.println(" C");

    Serial.print("Pressure = ");

    Serial.print(bme.readPressure() / 100.0F);
    Serial.println(" hPa");

    Serial.print("Approx. Altitude = ");
    Serial.print(bme.readAltitude(SEALEVELPRESSURE_HPA));
    Serial.println(" m");

    Serial.print("Humidity = ");
    Serial.print(bme.readHumidity());
    Serial.println(" %");

    Serial.println();
}

```
[@BME280-Test]

##### Erklärung

Dieses Programm liest die Daten welche der BME280 Sensor bekommt aus der I2C Schnittstelle aus und bereit sie über Print-Statements schnön leserlich auf.

***Bibliotheken***

```{caption="Dependencies BME" .cpp}
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
```

[@BME280-Test]

Dieser Teil zeigt die bereits vorhin Beschriebenen Bibliotheken mit einer zusätzlichen der **Wire-Library**. Dies ist eine Standardmäßige enthaltene Bibliothek und ermöglicht erst die I2C Kommunikation.

***Definitionen und Variablen***

```{caption="Definition und Variablen BME" .cpp}
#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME280 bme; 

unsigned long delayTime;

void printValues();
```

[@BME280-Test]

1. **SEALEVELPRESSURE_HPA**: Ist eine Konstante welche den Standardluftdruck auf Meereshöhe annimmt.
2. **bme**: ist ein Instanz des Objektes Adafruit_BME280 und stellt den Sensor dar.
3. **delayTime**: Ist eine Varible welche für einen delay verwendet wird.
4. **void printValues()**: Ist eine Vorwärtsdeklarierte Funktion. 

***Setup***

```{caption="Setup BME" .cpp}
void setup() {
    Serial.begin(115200);
    Serial.println(F("BME280 test"));

    
    if (!bme.begin(0x76)) {
        Serial.println("Could not find a valid BME280 sensor, check wiring, address, sensor ID!");
        Serial.print("SensorID was: 0x"); Serial.println(bme.sensorID(),16);
        Serial.print("        ID of 0xFF probably means a bad address, a BMP 180 or BMP 085\n");
        Serial.print("   ID of 0x56-0x58 represents a BMP 280,\n");
        Serial.print("        ID of 0x60 represents a BME 280.\n");
        Serial.print("        ID of 0x61 represents a BME 680.\n");
        while (1) delay(10);
    }
    
    Serial.println("-- Default Test --");
    delayTime = 1000;

    Serial.println();
}
```

[@BME280-Test]

Das Setup ist im Grunde der wichtigste Teil, da es alle wichtigen Variablen, Modi usw. intialisiert. Es selbst ist hier in drei Teile eingeteilt:

1. **Serial.beginn(115200)**: Hier wird die auf 115200 gestellt damit der serielle Monitor und der Sensor kommunizieren können.
2. **if(!bme.begin(0x76))**: Hier wird der Sensor mit der Adresse 0x76 , wie im Datenblatt beschrieben, initialisiert. [@BME280-Datasheet]
3. **Fehlerbehandlung**: Falls der BME280 nicht gefunden wird oder nicht initialisiert werden kann kommt es zur Fehlerbehandlung und wenn nicht dann geht es weiter in den

***Loop***

```{caption="Loop BME" .cpp}
void loop() { 
    printValues();
    delay(delayTime);
}
```

[@BME280-Test]

Wie der Name schon verrät wird der Loop immer wieder ausgeführt. In diesem Fall hat der Loop die Funktionen `printValues()` welche nach jedem Durchlauf aufgerufen wird und `delay()`, mit der vorher erwähnten `delayTime`, welche nach jedem Loop eine Pause von einer Sekunde einlegt.

***Ausgabe***

```{caption="Ausgabe BME" .cpp}
void printValues() {
    Serial.print("Temperature = ");
    Serial.print(bme.readTemperature());
    Serial.println(" C");

    Serial.print("Pressure = ");
    Serial.print(bme.readPressure() / 100.0F);
    Serial.println(" hPa");

    Serial.print("Approx. Altitude = ");
    Serial.print(bme.readAltitude(SEALEVELPRESSURE_HPA));
    Serial.println(" m");

    Serial.print("Humidity = ");
    Serial.print(bme.readHumidity());
    Serial.println(" %");

    Serial.println();
}
```

[@BME280-Test]

Dieser Teil des Codes gibt die Messwerter auf dem Serial Monitor, in einer aufpolierten Version aus. Der Grund für die Ausgabe is meist Debugging.

#### MPU6050

##### Erklärung

#### GY-GPSMV2

##### Erklärung

### Datenübertragung

#### MQTT

### Mesh

### Sonstiges

## Praktische Arbeit

### Bau des Prototypen

#### Benötigte Hardwarekomponenten

Um ein Projekt zu realisieren, bei dem Umweltdaten ausgelesen werden, benötigt man geeignete Komponenten, auf denen die Software zuverlässig läuft. Bei der Auswahl dieser Komponenten spielten mehrere Faktoren eine Rolle, darunter die Kosten, die Größe sowie die Anzahl der verfügbaren Funktionen.

Unser finaler Prototyp sollte folgende physikalischen Messwerte erfassen können.

- Temperatur
- Luftfeuchtigkeit
- Luftdruck
- Beschleunigung und Geschwindigkeit
- Standortbestimmung mittels GPS

Nach sorgfältiger Abwägung haben wir uns schließlich für die folgenden Komponenten entschieden:

##### ESP32***
  **Grund**: Der ESP32 ist ein leistungsstarker und kostengünstiger Mikrocontroller mit integrierter WLAN- und Bluetooth Funktionalität. Er bietet eine höhere Rechenleistung als ein Arduino und ist im durchschnitt auch kleiner als jener, was für die mobile Nutzung vom Vorteil ist.
  **Spezifikationen**:
  
     - Größe: $39mm  *  28mm  *  6mm$
     - 34 I/O Pins
     - SoC: ESP32-WROOM-32
     - Netzspannung: 5V

![ArduinoPins [@ESP32-Datenblatt]](img/Kampl/ESP32-Pins.png){width=500px}

##### BME280
  **Grund**: Der BME280 ist ein vielseitiger Sensor, welcher sowohl die Temperatur, die Luftfeuchtigkeit als auch den Luftdruck messen kann. Außerdem ist er kompakt und kostengünstig.
  **Spezifikationen**:
  
     - Größe: $9mm  *  11mm  *  2mm$
     - 4 Pins
     - Schnittstelle I2C
     - Spannung: 3.3V bis 5V

![BMEPins [@BME280-Datenblatt]](img/Kampl/BME280-Pins.png){width=300px}

##### MPU6050
  **Grund**: Der MPU6050 ist eine Kombination aus Beschleungiungssensor und Gyroskop. Damit können Bewegungen auf der X, der Y und der Z-Achse erfasst werden.
  **Spezifikationen**:
     - Größe: $25mm  *  20mm  *  7mm$
     - 8 Pins
     - Schnittstelle I2C
     - Spannung: 3.3V bis 5V

![MPUPins [@MPU6050-Datenblatt]](img/Kampl/MPU6050-Pins.png){width=500px}

##### GY-GPSMV2
  **Grund**: Das GY-GPSMV2-Modul ermöglicht die Standortbestimmung über GPS. Es bietet eine hohe Genauigkeit und eine stabile Leistung, wodurch die Postion präzise erfasst werden kann.
  **Spezifikationen**:
  
     - Größe: $16mm  *  12.2mm  *  2.4mm$
     - 3 Pins
     - Schnittstelle UART
     - Spannung: 3.3V

![GYPINS](img/Kampl/GPS-Module-Pins.png){width=300px}

#### Kosten

| Anzahl | Ort        | Produkt             | Einzelpreis | Lieferkosten | Preis gesamt |
|--------|-----------|----------------------|------------:|------------:|-------------:|
| 3      | Ali-Express | GY-NEO6MV2         | 3.19 €      | 2.46 €      | 12.03 €      |
| 3      | AZ         | BME280              | 3.47 €      | 5.98 €      | 16.39 €      |
| 32     | Reichelt   | Lochrasterplatinen  | 13.21 €     | 6.65 €      | 19.86 €      |
| 3      | AZ         | GY-521              | 2.50 €      | 5.30 €      | 12.79 €      |
| 1      | Amazon     | ET-Starterkit       | 16.13 €     | 3.99 €      | 20.12 €      |

| Preis Hardware insgesamt |
|--------|
|  81.19 € |


#### Grundaufbau

#### Endprodukt

### Programmierung des Prototypen

#### Sensoren

#### WLAN

##### Mesh

#### Datenübertragung

#### MQTT

#### Deployment