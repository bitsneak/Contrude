# Teilaufgabe Schüler Gekle

\textauthor{Luca Alexander Gekle}

## Theorie

### Java Container Simulator

#### Warum wird er benötigt

Ein zentraler Aspekt der Diplomarbeit ist das ungefähre Identifizieren der Position eines bestimmten Containers auf einem Containerschiff.

Die Kapazität eines Schiffes wird in der Regel mit TEUs (Twenty Foot Equivalent Units) angegeben. Jeder Container ist also 20 Fuß (6,1 m) oder ca. 6 Meter lang. Containerschiffe können von weniger als tausend TEUs bis hin zu 24000 TEUs haben. [vgl. @Pfeiffer-Containerschiffe] + [vgl. @IngenieurDE-Containershiffe]

Im Rahmen der Diplomarbeit werden aber nur 3 Prototypen angefertigt, welche einerseits die benötigten Umweltdaten liefern, andererseits aber auch miteinander kommunizieren. Die Komplexität eines "Containergeflechts" bestehend aus nur 3 Containern hält sich daher in Grenzen und um den vollen Umfang unserer Diplomarbeit zu veranschaulichen ist ein anderer Weg vonnöten. Dies ist, wo der Simulator ins Spiel kommt: Er übernimmt die Aufgabe, ein System an Containern ohne hunderten oder gar tausenden Prototypen darzustellen.

#### Graphentheorie

Das Endergebnis des Simulators sollt ein Graph sein, welcher dabei hilft, die Verbindungen zwischen den einzelnen Containern zu visualisieren. Die Graphentheorie, ein Teilgebiet der Mathematik, spielt hierbei eine essenzielle Rolle.

Allgemein gilt folgendes:

>Ein **Graph** G besteht aus einer Menge V von **Knoten** und einer Menge E von Knotenpaaren, welche als **Kanten** bezeichnet werden. Die Notation für einen Graphen lautet G=(V,E)G=(V,E). E und V stehen dabei für _edges_ und _vertices_, also die englischen Begriffe für Kanten und Knoten. Eine Kante {u, v} ELEMENT E verbindet die Knoten u und v. [vgl. @Uni-Bremen-Graphentheorie]

Zusätzlich muss man innerhalb der Graphentheorie zwischen Ungerichteten und Gerichteten Graphen unterscheiden. Der primäre Unterschied liegt darin, ob die Kanten als einfache Striche (ungerichtet) oder Pfeile (gerichtet) dargestellt werden. [vgl. @Studyflix-Graphentheorie] 
Bei einem gerichteten Graph ist daher die Richtung der Kante/ Beziehung zu beachten. Gilt z.B. A -> B -> C mit V={A, B, C} und E={{A,B}, {B,C}}, dann ist es nicht erlaubt, etwa von C zu B zu gehen, sondern nur von B nach C. Bei einem ungerichteten Graph gilt diese Regel nicht. Selbiges Beispiel nur ungerichtet: A - B - C; hier darf man sowohl von B nach C als auch umgekehrt von C nach B gehe.

Abschließend muss man noch auf den Zusammenhang der einzelnen Knoten schauen. Ein ungerichteter Graph ist dann zusammenhängend, wenn alle Knoten erreichbar, also es zu jedem Knoten einen Weg gibt. Ist dies nicht der Fall, gibt es sogenannte isolierte Knoten und der Graph ist nicht zusammenhängend. Bei gerichteten Graphen unterscheidet man zusätzlich zwischen schwach und stark zusammenhängenden Graphen. [vgl. @Studyflix-Graphentheorie] 
In dem Beispiel A -> B mit V={A, B} und E={A,B}, ist der Knoten A nur erreichbar, wenn man die Richtung außer Acht lässt, man spricht von einem schwach zusammenhängenden Graph. Für einen stark zusammenhängenden Graph müsste zusätzlich noch ein Knoten {B, A} bestehen.

Der Containersimulator hat als Endergebnis einen **ungerichteten** Graphen wie im folgenden Bild zu sehen ist:

![GraphExample](img/Gekle/GraphExample.png)

Anhand des beispielhaften Graphs, lässt sich also folgendes herauslesen:

- Es gibt insgesamt 4 Knoten: V = {con0, con1, con2, con3}
- Es gibt insgesamt 4 Kanten: E = {{cont0, cont1}, {cont0, cont2}, {cont1, cont2}, {cont2, cont3}}

Die Beziehungen der Knoten im ungerichteten Graphen zueinander werden mittels Adjazenzen und Inzidenzen beschrieben werden. Man spricht von inzident, wenn bei einem Knoten V und einer Kante E folgendes gilt: V ELEMENT E. In anderen Worten: Eine Kante E verbindet den Knoten V mit einem anderen Knoten im Graph. Zwei Knoten V und W sind miteinander adjazent bzw. benachbart, falls mit einer Kante E ELEMENT {V, W} eine direkte Verbindung zwischen den beiden Knoten existiert. Auch Kanten können inzident sein, wenn sie beide zu einem gemeinsamen (benachbarten) Knoten gehören. [vgl. @Uni-Bremen-Graphentheorie]

##### Inzidenzmatrix

Unter einer Inzidenzmatrix versteht man eine n x m Matrix (n... Anzahl der Knoten V und m... Anzahl der Kanten E). Durch die Erstellung der Inzidenzmatrix lassen sich die Inzidenzen abbilden, also man erkennt, ob der jeweilige Knoten an einer Kante anliegt oder nicht. [vgl. @BWL-Lexikon-Inzidenzmatrix]

Als Beispiel eine Erweiterung des Graphs von oben:

![GraphExampleExtended](img/Gekle/GraphExampleExtended.png)

Hier wurden die Kanten durchnummeriert um die **Inzidenzmatrix** zu erstellen:

| **V/ E**  | **1** | **2** | **3** | **4** |
| --------- | ----- | ----- | ----- | ----- |
| **cont0** | 0     | 1     | 1     | 0     |
| **cont1** | 0     | 0     | 1     | 1     |
| **cont2** | 1     | 1     | 0     | 1     |
| **cont3** | 1     | 0     | 0     | 0     |

(1... Verbindung; 0... keine Verbindung) (V... Knoten) (E... Kanten)

##### Adjazenzmatrix

Wie für Inzidenzen gibt es auch für Adjazenzen eine Matrix, hierbei werden also die Nachbarschaften der einzelnen Knoten V abgebildet. Die Matrix ist bei einer Anzahl N an Knoten V also n x m groß. Ein Vorteil der Adjazenzmatrix ist, dass die Anzahl der Kanten E keine Rolle spielt und sie sich somit sehr gut als Rechenbasis für rechnerische Verarbeitungen des dazugehörigen Graphen eignet. Auch für die Durchführung von Analysen eignet sie sich sehr gut, so kann die Matrix etwa für folgendes hergezogen werden:
- Ermittlung erreichbarer Knoten
- Errechnen von Pfadlängen
- Analyse von Schleifenfreiheit
[vgl. @BigDataInsider]

Auch hier wird wieder das Beispiel aus dem Kapitel Indizenzmatrix verwendet und so folgende Adjazenzmatrix erstellt:

| V/ W      | cont0 | cont1 | cont2 | cont3 |
| --------- | ----- | ----- | ----- | ----- |
| **cont0** | **0** | 1     | 1     | 0     |
| **cont1** | 1     | **0** | 1     | 0     |
| **cont2** | 1     | 1     | **0** | 1     |
| **cont3** | 0     | 0     | 1     | **0** |

(1... Verbindung; 0... keine Verbindung) (V... Knoten) (W... 2. Knoten)

Wenn ein Knote V = Knote W ist, also bei einer Verbindung zu sich selbst wird 0 eingetragen. Dadurch entsteht in jeder Adjazenzmatrix eines ungerichteten Graph eine 0-Diagonale, welche oben auch gekennzeichnet wurde.

#### Visualisierung von Graphen

##### DOT Sprache

Mithilfe der DOT Sprache, welche Teil von Graphviz ist, lassen sich sehr einfach gerichtete und ungerichtete Graphen darstellen. Dies erfolgt mit sogenannten "edgeloops", wobei "->" für gerichtete und "--" für ungerichtete Graphen steht. Diese können innerhalb eines Graphen benutzt werden, welcher durch `graph{}` für einen ungerichtete oder `diagraph{}` für einen gerichteten gekennzeichnet wird. Fügt man davor ein `strict` hinzu (also z.B. `strict graph{}`) so kann man bestimmen, dass zwischen zwei Knoten immer nur eine Verbindung besteht. [vgl. @GraphViz-Documentation] 
Basierend auf der Adjazenzmatrix kann man etwa so einen einfachen Graph erstellen:

```txt
strict graph G {
    
  cont0 -- cont1;
  cont0 -- cont2;
  
  cont1 -- cont2;
  cont1 -- cont0;
  
  cont2 -- cont0;
  cont2 -- cont1;
  cont2 -- cont3;
  
  cont3 -- cont2;
}
```

Dieser Code würde folgendem entsprechen:

![DOTGraph](img/Gekle/DotGraph.png)

##### Dragable Graph

Der große Vorteil des Dragable Graphs besteht darin, dass er interaktiv ist. Ein User kann also mit dem Mauszeiger die einzelnen Knoten hin und her bewegen, wobei auch die Kanten sich mit bewegen. Dies hilft besonders bei der Benutzerfreundlichkeit, da sich der User den Graphen so richten kann, wie es ihm gefällt, wodurch sie sich sehr gut für Datenvisualisierung eignen. Eine JavaScript Bibliothek um so einem Graph zu ermöglichen ist z.B. D3.js., welcher auch in der Diplomarbeit verwendet wurde. [CHATGPT]

### Website

#### React

Bei React handelt es sich anders als bei z.B. Angular nicht tatsächlich um ein Framework im herkömmlichen Sinne. Vielmehr ist es eine Bibliothek zum Rendern graphischer Oberflächen. React setzt sehr stark auf Komponentenorientierung, wobei zwischen klassenbasierten und funktionalen Komponenten unterschieden wird. Die Tendenz geht allerdings immer mehr in Richtung funktioneller Komponente. [vgl. @Heise-React]

Auch hier im folgenden Beispiel ist eine funktionelle Komponente der Diplomarbeits-Website zu sehen. Dies lässt sich u.a. an dem für JavaScript typischen Syntax wie das "=>" erkennen, aber auch daran, dass sogenannte Hooks (z.B. useStates) verwendet werden:

```js
const LoginField = ({ placeholder, value, onChange, isPassword = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {(...)}
  return (
    <div className="relative mb-4"> 
    (...)
    </div>
  );
};
export default LoginField;
```

`LoginField` kann rein theoretisch überall eingesetzt werden, da diese Komponente an und für sich nur eine spezielle Funktion übernimmt, jedoch kann man Komponenten aber auch so gestalten, dass sie sich je nach Einsatzgebiet sich unterschiedlich verhalten (z.B. anders aussehen, verschiedene andere Komponente übernehmen etc.).

Im folgenden Code lässt sich dies auch gut erkennen. Der Code entspringt eine "Page", also einer Seite, welche der User sieht. Der Code wird aber nicht von oben bis unten durch in dieser einen Page (ebenfalls eine funktionelle Komponente) geschrieben, sondern in mehrere Komponenten aufgebrochen. Diese können dann ganz einfach in die Page eingefügt werden. (z.B. `Sidebar`, `Topbar`, `Detailspace` usw.). Betrachtet man die `Topbar` Komponente, so sieht man, dass ihr weitere Komponenten übergeben werden, welche sie dann nutzen kann. Wie eben erwähnt können die Parameter oder Komponenten welche übergeben werden von Anwendungsfall zu Anwendungsfall komplett unterschiedlich sein:

```js
<div className="flex h-screen">
  <Sidebar selectedShip={selectedShip} />
  <div className="flex-grow flex flex-col">
    <Topbar // Topbar in der MainPage
      leftComponents={[
        <SearchBar key="searchbar" selectedShip={selectedShip} onSearchSubmit=
        {handleSearchSubmit}
        />,
        <ShipSelect key="shipButton" ships={ships} selectedShip={selectedShip}
          onShipChange={setSelectedShip}
        />,
      ]}
      rightComponents={[
        <GridDropDown key="gridDropdown" gridSize={gridSize} setGridSize={setGridSize}
        />,
      ]}
    />
  </div>
</div>
```

Die `Topbar`-Komponente übernimmt in einer anderen Page etwa ganz andere Komponenten wie hier zu sehen ist:

```js
// Topbar in der DetailPage
<Topbar
  leftComponents={[<SearchBar key="searchbar" />]}
  rightComponents={[
    <DetailControl
    onGoAlertClick={handleThreshholdViewerToggle} // Pass handler
  />
  ]}
/>
```

Anders als im ersten Code, wo eine `Searchbar`-, `ShipSelect`- und `GridDropDown`-Komponente übergeben wird, wird hier etwa eine `DetailControl`-Komponente übergeben. Die Funktionalität als auch das Aussehen der `Topbar` ändert sich so. Dieses Komponenten-basierte programmieren ist das Herz von React Development.

##### Use-State & Hooks

Mit der Verwendung von funktionellen Komponenten geht jedoch folgendes verloren:
- ein dedizierter Zustand (State), welcher durch die Render-Aufrufe bestehen bleibt
- die Verwendung von Lifecycle-Funktionen, welche das Verhalten des Komponents je nach Phase des Lifecycle steuern 
[vgl. @GeeksForGeeks-useState]

Der `useState`-Hook erlaubt es nun aber, dass State zu den funktionellen Komponenten hinzugefügt wird. [vgl. @GeeksForGeeks-useState]
Es können auch mehrere State-Variablen in einer Komponente definiert werden. Ein `useState` sieht in der Regel in etwa so aus:

```js
const [username, setUsername] = useState('User');
```

- username = aktueller Zustand
- setUsername = Funktion um den Zustand zu aktualisieren
- 'User' = Anfangswert

Mit "Hooks" kann man sich also in die jeweilige Variable "einklinken".

Es gibt in React neben der useState auch noch andere Hooks. React selbst unterteilt diese in ihrer Dokumentation wiefolgt:
- Basic Hooks
- Additional Hooks
- Library Hooks

Die 3 "Basic Hooks" sind hierbei allerdings die wichtigsten. Neben dem bereits erwähnten `useState()` gibt es auch noch:
- `useEffect()` --> für Ausführung von Side-Effects wie das Laden von Daten via API, Event-Handler oder die Konsolen Ausgabe
- `useContext()` --> ermöglicht es Daten aus einem Context-Provider zu konsumieren
[vgl. @DoubleSlash-ReactHooks]

##### React Router

Viele Webanwendungen sind sogenannte "Single-Page-Webanwendungen". Sie bestehen also aus nur einem HTML-Dokument, wobei der Inhalt dynamisch nachgeladen wird. Sogenannte SPA (Single Page Applications) beinhalten also Komponenten, welche sich wie Seiten verhalten. Um so etwas zu erstellen, muss React-Router und das Routing verwendet werden. Mithilfe des Routings werden Komponenten Routen zugeordnet. Dies stellt `react-router-dom` zur Verfügung [vgl. @FreeCodeCamp-Routing] 

Dies erfolgt über das "Route" Element:

```js
<Route path="/main" element={<MainPage />} />
```

Hierbei wird über die URL ".../main" auf die MainPage verwiesen. Gibt man in der Adresszeile eines Browsers die URL ein, würde man rein theoretisch auf der MainPage landen.

Es ist wichtig anzumerken, dass alle Routes logischerweise Teil eines Routers sein müssen. Dies würde in etwa so aussehen:

```js
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    {/* Hier kommen die Routes hin */}
    </>
  )
);
```

#### Frontend Build Tool - Vite

Bei der Verwendung von React ist es empfehlenswert ein sogenanntes Build Tool zu verwenden. Dieses übernimmt die Aufgabe des "Building", worunter man den Prozess versteht, in welchem der eigene Source Code so transformiert und gebündelt wird, dass er von Browsern interpretiert werden kann. [vgl. @CodeParrot-BuildTools]

Die zentralen Aufgaben eines Build Tools sind:
- konvertieren des JavaScript/ TypeScript Codes in eine für Browser kompatible Version
- bündeln von Komponenten und Files um die Anzahl an HTTP Requests für das Laden der App zu verringern
- unnütze Zeichen (z.B. Whitespaces) löschen um Ladezeiten zu verbessern
- allgemein die Performance des Codes verbessern (z.B. mit "Tree Shaking", welches unbenutzten Code eliminiert)
[vgl. @CodeParrot-BuildTools]

Eines dieser Build Tools ist Vite, welches sich besonders durch seine Geschwindigkeit auszeichnet (vite = französisch für schnell). Zu den Gründen warum Vite mittlerweile so beliebt ist zählen u.a.:
- Geschwindigkeit --> benutzt ES, um Quellcode direkt im Browser bereitzustellen
- out-of-the-box Support für React/TypeScript/...
- optimierter Build durch die Verwendung von Rollup als Bundler 
[vgl @CodeParrot-BuildTools]

Selbst aber mit dem sogenannten HMR (Hot Module Replacement --> Änderungen im Code werden sofort im Browser angezeigt) tendieren Build Tools dazu, mit wachsendem JavaScript langsamer zu werden. Hierbei ist Vite jedoch besonders. Es nutzt eine Kombination aus ES Modulen und einem virtuellen Modulsystem: [vgl. @Telerik-BuildTools]

> Wenn Sie ein Modul importieren, behandelt Vite es als virtuelles Modul. Während der Entwicklung bündelt es nicht Ihren gesamten Code in eine einzelne Datei. Stattdessen erstellt es bei Bedarf Builds für jedes Modul und stellt sie in separaten Dateien bereit. Dieser Ansatz eliminiert die Notwendigkeit eines vollständigen Bündelungsprozesses bei jeder Änderung, führt zu schnelleren Reloads und – natürlich – zu einem zufriedenen Entwickler. [vgl. @Telerik-BuildTools]

##### Erstellen eines React-Projekt mit Vite

Text

#### Tailwind CSS

Tailwind CSS ist ein CSS Framework, welches darauf abzielt das Designen von Webanwendungen zu vereinfachen, indem vordefinierte Utility Klassen benutzt werden. [vgl. @GeeksForGeeks-TailwindCSS]

Der Unterschied zwischen Tailwind CSS und traditionellen CSS könnte z.B. so aussehen (in React):
Ohne Tailwind CSS:

```html
<div class="search-container"> CODE </div>
```

```css
.search-container {
    width: 18rem; /* w-72 */
    padding-left: 0.75rem; /* pl-3 */
    height: 2.25rem; /* h-9 */
    background-color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 2px solid black;
    border-top-left-radius: 9999px; /* rounded-l-full */
}
```

Mit Tailwind CSS:

```js
<div className='w-72 pl-3 h-9 bg-white flex justify-start items-center border-2 border-black rounded-l-full'>
  CODE
</div>
```

Tailwind CSS scannt alle HTML-Dateien, JavaScript-Komponenten und andere Templates nach Klassenbezeichnern. Diese Bezeichner, die du in deinem Code verwendest (z. B. `w-72`, `bg-white`, `flex`), repräsentieren bestimmte Stileigenschaften. Nachdem Tailwind alle genutzten Klassen gefunden hat, generiert es die entsprechenden CSS-Regeln und schreibt sie in eine statische CSS-Datei. [vgl. @TailwindCSS-Docs]

Es ist auch möglich, Tailwind CSS mit bestimmten Ereignissen zu verknüpfen. So ist es z.B. möglich folgendes zu tun:

```js
<button className='bg-red-400 hover:bg-red-600'>BUTTON</button>
```

Dies sagt aus, dass im Zustand "hover", also wenn der User mit dem Mauszeiger über den Knopf hovert, der Farbton von `red-400` auf den dunkleren Rotton `red-600` geändert werden soll.

Tailwind nennt dies Pseudo Klassen. Die 3 wichtigsten sind folgende:
- Hover --> aktiviert, wenn der User über das Element hovert
- Focus --> aktiviert, wenn der User das Element z.B. durch einen Klick in Fokus nimmt
- Active --> aktiviert, wenn der User das Element durch User aktiviert wird
[vgl. @TailwindCSS-DocsV1]

All diese Pseudo Klassen können auch mit "group-" verbunden werden, um mehrere Code-Teile gleichzeitig zu manipulieren. [vgl. @TailwindCSS-DocsV1]

Die großen Vorteile von Tailwind CSS sind also, dass keine externen CSS Files erstellt werden müssen und man sich nicht immer komplexere Klassen-Namen ausdenken muss. Auch die eingebaute Reaktionsfähigkeit spricht für das Framework. Zusätzlich bietet Tailwind eine umfassende Dokumentation, was das programmieren viel einfacher und effizienter macht. [vgl. @GeeksForGeeks-TailwindCSS]

#### REST und Axios

Die Webanwendung benötigt, damit sie ordentlich und sinnvoll funktioniert Daten aus dem Backend. Diese Daten werden über die REST (Representational State Transfer) API in das Frontend (sprich die Website) geholt.

##### REST

Die API, welche aufgrund ihrer Flexibilität, Schnelligkeit und Einfachheit berühmt wurde benutzt in der Regel das HTTP-Protokoll und überträgt die Daten mithilfe von JSON. Im Kontext einer Website wird mit dem Eingeben/Aufrufen einer URL, eine HTTP Anfrage gesendet. Die wichtigsten HTTP Befehle hierbei sind:
- GET (Abrufen)
- POST (Erstellen)
- PUT (Aktualisieren)
- DELETE (Löschen)
[vgl. @Talend-REST]

Die Anfrage geht dann beim Server ein und die REST API kümmert sich darum, dass eine Antwort gesucht und sofort zurückgeliefert wird. Die Antworten sind in der Regel im JSON (JavaScript Object Notation) Format. [vgl. @Talend-REST]

##### Kriterien für REST

Damit eine REST API gültig ist, müssen 6 Kriterien erfüllt sein:
1. Architektur --> Clients, Servern und Ressourcen bei welcher Anfragen über HTTP laufen
2. "Statelessness" --> es werden keine Client-Informationen zwischen Anfragen gespeichert
3. Cachefähige Daten --> optimiert Interaktion zwischen Client und Server
4. einheitliche Schnittstelle zwischen Komponenten --> von überall kann auf Ressourcen gleich zugegriffen werden
5. mehrschichtiges System --> organisiert einzelne Servertypen und macht Struktur für Client unsichtbar
6. Code-On-Dmand --> auf Anforderungen ausführbaren Code von Server an Client senden (optional)
[vgl. @RedHat-REST]

##### REST in REACT - Axios

Es ist durchaus möglich, HTTP Abfragen innerhalb von React ohne externer Library zu benutzen. Allerdings hat eine benutzerfreundliche externe API wie Axios durchaus seine Vorteile. Axios verwendet Promises (JavaScript Objekte welche den zukünftigen Wert einer asynchronen Funktion repräsentiert), wodurch es einfacher ist mit "asnyc functions" zu arbeiten. Auch die Tatsache, dass Axios automatisch JSON Objekte in JavaScript Objekte überführt spricht für die Verwendung davon. Zusätzliche Vorteile von Axios sind:
- eingebaute Funktionen zum Abbrechen von Abfragen
- interzeptieren (vor Senden einer Abfrage/ nach Erhalten einer Antwort logische Operationen durchführen)
- hat CSRF (Cross Site Request Forgery) Schutz
- breite Community + Support
[vgl. @GeeksForGeeks-Axios]

Weiters ist der Code mit Axios um etwas simpler zu lesen:
Ohne:

```js
const response = await fetch('localhost:8000/login', { 
  method: 'POST', 
  headers: { 'Content-Type': 'application/json', }, 
  body: JSON.stringify(loginData), });
```

Mit:

```js
const response = await axios.post('localhost:8000/login', loginData, { 
headers: { 'Content-Type': 'application/json', }, });
```

Die BaseURL und der Header sind bei jedem Call über die gesamte Website hinweg die gleichen, daher kann man in einem separaten JavaScript File eine sogenannte Axios Instanz [CHATGPT] erstellen:
```JS
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.contrude.eu',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
```

Diese wird dann in allen Komponenten eingebunden, in welchen man REST-Abfrage durchführt: `import axiosInstance from '../api/AxiosInstance';`

Ein Call würde dann noch vereinfachter aussehen:
```JS
const response = await axiosinstance.post('localhost:8000/login', loginData);
```

Die Fehlerbehandlung ist durch Axios ebenfalls verbessert. So sieht fetch das Promise bei z.B. HTTP Fehlercodes wie 404 oder 500 trotzdem als erfüllt. Sprich: Der Status Code muss explizit überprüft werden. Ein Fehler wird also nur ausgelöst, wenn es sich um ein Netzwerkproblem handelt (z.B. Server nicht erreichbar). Axios sieht HTTP-Fehler aber automatisch als das, was sie sind, Fehler, und lehnt das Promise ab wodurch die Fehlerbehandlung vereinfacht wird. [CHATGPT]

Alle Abfragen werden innerhalb von asynchronen Funktionen durchgeführt. Dies hat einerseits den Vorteil, dass der Code besser lesbar ist, da ohne `async` mit `.then` und `.catch` gearbeitet werden muss. So wird auch sogenannten "Callback-Hells" vorgebeugt, da man sich nicht in `then` Schleifen verlieren kann. Auch die Fehlerbehandlung ist aufgrund von `try/catch` einfacher und sauberer. [CHATGPT]

## Praktische Arbeit

### Java Container Simulator

#### Klassen

##### Container
Diese Klasse ist eine etwas modifizierte POJO (Plain Old Java Object) Klasse mit folgenden Variablen:
- String `name`
- List\<Container> `adjacentContainers`(ArrayList)
- dounle `signalMinimum`

Die `name`-Variable aller Container ist gleich aufgebaut: "cont#", wobei # für eine beliebige Nummer steht. Dies macht die Namen nicht unnötig kompliziert und hat auch innerhalb der Konsolen-Interaktion mit dem User seinen Vorteil. In `adjacentContainers` werden alle benachbarten Container, also jene, zu welchen der ausgewählte Container eine Verbindung hat bzw. welche in seiner Nähe sind, abgespeichert. Die Variable `signalMinimum` ist eine mithilfe von `ThreadLocalRandom.current()` erstellte zufällige Double-Variable, welche für das generieren der Verbindung zwischen der einzelnen Container noch wichtig wird. `ThreadLocalRandom` wird eigentlich eher für Multithreading-Anwendungen benutzt [vgl. @Baeldung-JavaRandom], jedoch ist der Syntax um eine Zufallszahl mit "von-bis" zu generieren etwas angenehmer zu lesen:
```Java
// Mit Math.random
this.signalMinimum = 10 + (25 - 10) * Math.random();

// Mit ThreadLocalRandom
this.signalMinimum = ThreadLocalRandom.current().nextDouble(10, 25);
```
Der Grund hierfür ist, da `Math.random` nur eine Zahl zwischen 0 & 1 generiert, während man bei `ThreadLocalRandom` den Minimalen und Maximalen Wert einfach angeben kann.

Bezüglich Methoden hat `Container` für alle Variablen Getter und Setter und einen Konstruktor, mit welchem `name` und `signalMinimum` gesetzt werden. Mithilfe von `void addDestination(Container con)` kann ein benachbarter Container zur Liste hinzugefügt werden (die Liste wird außerhalb des Konstruktors initialisiert . Auch die `toString` wurde etwas angepasst, um die Ausgabe in der Konsole etwas besser aussehen zu lassen:
```JAVA
@Override
public String toString() {
    StringBuilder adjacent = new StringBuilder();
    for (Container container : adjacentContainers) {
        adjacent.append(container.getName()).append(", ");
    }
  
    return "Container{" +
            "name='" + name + '\'' +
            ", adjacentContainers=" + adjacent +
            ", signalMinimum=" + signalMinimum +
            '}';
}
```
Entspricht:
```
Container{name='cont1', adjacentContainers=cont0, , signalMinimum=10.753991237010691}
```
##### Ship
Dies ist die zweite Klasse, in welcher alle für den Simulator notwendigen Funktionen implementiert sind. Die Klasse selbst verwaltet drei Variablen:
- Set\<Container> `containers` (HashSet)
- ArrayList\<String> `contConList`
- int[][] `adjMatrix`
In dem HashSet werden alle in der Main Klasse generierten Container abgespeichert. In der `contConList` werden alle Verbindungen zeischen Containern im Format "A;B" abgespeichert, wobei A für Container (= Knoten im Graphen) und das Semicolon für die Verbindung (=Kante im Graphen) stehen. Das 2d-Array repräsentiert eine Adjazenzmatrix, welche u.a für das schreiben in JSON Files benötigt wird.

Mit `void addContainer (Container con)` können Container in das Set hinzugefügt werden. Weitere Methoden sind diejenigen zum Schreiben in JSON Files oder jene, welche für das Konsolen-Programm benötigt werden (z.B. `printAdjMatrix` zum Schreiben der Adjazenz Matrix). Außerdem erledigt die die Aufgabe der Erstellung der Verbindungen zwischen den einzelnen Container-Objekten.
##### Main
Der Container Simulator ist an und für sich ein Konsolen-Programm. Die Interaktion zwischen dem User und dem Simulator passiert also (fast) rein in der Konsole. Die `Main`-Klasse regelt diese. Sie erstellt die Container, basierend auf der vom User eingegebenen Menge und übergibt diese an die ebenfalls von ihr erstellten `Ship`-Klasse. Die User-Interaktion wird dann innerhalb einer `while`-Schleife fortgesetzt. Hier kann der User mehrere Buchstaben eingeben, welche für verschiedene Aktionen stehen:
```JAVA
System.out.println("\nChoose an option:\n" +
        "(a) View single Container\n" +
        "(b) View Matrix\n" +
        "(c) Print Connection List\n" +
        "(d) Export to Json Format (all Containers)\n" +
        "(e) Export to Json Format (specific Container)\n" +
        "(q) Quit Simulator");
in = sc.nextLine();
```
Über einen `Scanner` wird diese Eingabe dann geprüft. Das Ausführen der passenden Aktionen regelt ein `switch-case`, wobei auf ein `default` gesetzt ist, sollte die User-Eingabe inkorrekt sein. Sobald der User "q" eingibt bricht die `while`-Schleife ab, dies wird durch folgenden Ausdruck ermöglich:
```
while(!in.equals("q")){}
```
#### Wie die Dummy-Daten + Verbindungen generiert werden
 Startet man das Programm so wird man als erstes zu folgendem aufgefordert:
![SimulatorConsole1](img/Gekle/SimulatorConsole1.png)

Der User bestimmt also, wie viele Container für die Simulation erstellt werden sollen. ">=2" wurde deshalb als Bedingung eingeführt, da ein Simuliertes Schiff mit nur einem Container keinen Graph mit Knoten und Kanten entsprechen würde. Da es ja das Ziel ist, die Kommunikationsstruktur mit Kanten darzustellen, mach die Auswahl 1 wenig Sinn.

Bestätigt der User seine Eingabe mit Enter, so wird ein `Ship` Objekt erstellt. Dieses hat als Zentrale Variable ein `Container`-Set namens `containers`, worin alle Container gespeichert werden. Das Erstellen und Speichern der Container selbst passiert in der `Main` mit folgendem Code:
```JAVA
for(int i = 0; i < count; i++){
    String containerName = "cont" + i;
    ship.addContainer(new Container(containerName));
}
```
Die `count` Variable ist zu Beginn auf -1 gesetzt. Dies hat den Hintergrund, da die Namen der Container bei 0 anfangen (also mit "cont0"), der User aber die tatsächliche Anzahl eingeben soll (z.B.: Eingabe = 7 --> Container Namen: cont0 bis cont6 = 7 Stk). Wichtig ist auch anzumerken, dass nur der Container Name in `ship` gespeichert wird, da `signalMinimum` einfach dann von den Methoden selbst geholt wird, welche diese brauchen.

Nachdem die Container erstellt sind müssen noch die Verbindungen bzw. Nachbarschaften der Container bestimmt werden. Dies übernimmt folgende Methode:
```JAVA
public void sendSetSignals(Container container){
    double signal = 15;
    double randomNum = ThreadLocalRandom.current().nextDouble(0.1, 1.0);
    boolean add = ThreadLocalRandom.current().nextBoolean();
  
    if(add){
        signal = signal + randomNum;
    }else{
        signal = signal - randomNum;
    }
  
    Container origin = container;
    for(Container cont : this.containers){
        if(!cont.getName().equals(origin.getName())){
            if(cont.getSignalMinimum() <= signal && checkContConList(origin.getName(),
             cont.getName())){
                origin.addDestination(cont);
                contConList.add(extractId(origin.getName()) + ";" +
                extractId(cont.getName()));
            }
        }
    }
    redoAllMinSignals();
}
```
Als Basis-Signal wurde willkürlich 15 hergenommen, dieser Wert wird dann um einen zufälligen Wert zwischen 0.1 und 1 ebenfalls zufällig verkleinert oder vergrößert. Dann wird der momentan übergebene Container (z.B. cont5) auf `origin` gesetzt. Innerhalb der `for`-Schleife wird dann solange werden dann alle Container durchgegangen. Entspricht `cont` nicht `origin`, so wird geprüft ob das abgewandelte `signal` kleiner-gleich dem Minimum-Signal von `cont` ist. Sollte dies der Fall sein und besteht noch keine Verbindung zwischen den beiden (`checkContConList`), so gilt `cont` als Nachbar von `origin` und wird dementsprechend auch als solcher festgehalten. Es ist wichtig anzumerken, dass diese Methode von der `main` innerhalb einer `for-each` Schleife aufgerufen wird, also jeder erstellte Container einmal `origin` ist.

Was würde es nun bewirken, wenn `randomNum` weiter verstreut wird (z.B, 0.1 bis 10)? Würde man diese Umstellung im Simulator umsetzten, dann steigt der Wert um welchen das Basis-Signal (15) erhöht werden KANN (auch eine Verringerung ist natürlich möglich). Dies bedeutet, dass der Wahrscheinlichkeit, dass folgender Fall entritt: `cont.getSignalMinimum() <= signal => TRUE` steigt, was wiederum bedeutet, dass die Vernetzung zwischen den Containern dichter wird. Anders sinkt die Eintritts-Wahrscheinlichkeit des Ausdrucks, wenn `randomNum` verringert wird (z.B. auf 0.01 bis 0.1).

#### Verwendung der Daten (Funktionen des Simulators)
Ist die Anzahl der Container erst einmal eingegeben, so wird der User mit folgendem konfrontiert:
![SimulatorConsole2](img/Gekle/SimulatorConsole2.png)

Der User hat nun also die Wahl zwischen sechs verschiedenen Funktionalitäten des Containers.

##### View single Container
Möchte man zu einem Container die Details einsehen, wie etwa welche Nachbar-Container dieser besitzt kann mit (a) dies gemacht werden. Der User wird gefragt, welchen Container er einsehen möchte, hierbei wird auch deutlich gemacht, dass die Eingabe des Users `cont#` sein sollte wobei der Hashtag für eine Zahl steht. Der Eingelesene Name wird dann mit der `checkIfContainerWithNameExists`-Methode des `ship` überprüft, gibt diese NULL zurück, so wird dem User mitgeteilt, dass für den eingegebenen Namen kein Container existiert, ansonsten wird wird über die `getSingleContainer` (ebenfalls von `ship`) das gesamte Container Objekt zurückgegeben und mithilfe der Veränderten `.toString` ausgegeben.
##### View Matrix
Teil des `ship` ist ebenfalls eine Adjazenzmatrix, welche nach dem Erstellen der Container und deren Vernetzungen in der `void fillAdjMatrix()` von `ship` angelegt wird. Dies geschieht durch zwei `for-each`-Schleifen:
- Die Erste geht alle Container der `containers`-Set durch (=`origin`)
- Die Zweite geht alle benachbarten Container von `origin` durch, welche mittels dem Getter von `adjacentContainers` hergeholt werden (=`destination`)
Von diesen beiden Variablen werden dann eine 1 in ein 2d-Array an der Position \[ID-origin]\[ID-destination]gespeichert. Was ist die ID? Die ID ist jene Zahl, welche nach dem "cont" des Namens steht (z.B: name="cont2"; ID = 2). Dies wird über eine separate Methode namens `extractID` gemacht. [CHATGPT] 

Wählt der User nun "View Matrix" aus so wird sie folgendermaßen ausgegeben:
```
c  0  1  2  3
0  0  1  0  0 
1  0  0  1  0 
2  0  1  0  1 
3  0  0  1  0 
```
(Beispiel mit 4 Containern)

Für die Ausgabe ist eine weitere Methode von `ship` verantwortlich: `void AdjMatrix()`. Diese gibt zuerst die erste Zeile beginnend mit dem "c" aus, wobei die Länge der `for`-Schleife in welcher dies passiert, auf `containers.size()` beschränkt ist. Danach geht eine verschachtelte `for`-Schleife das 2d-Array der Adjazenzmatrix durch und gibt entwerder 0 (keine Verbindung) oder 1 (Verbindung) aus.

##### Print Connection List
Möchte der User sich über die "primitivste" Weiße, alle Verbindungen zwischen den Containern haben, so kann er sich die `contConList` von `ship` ausgeben lassen. Dies passiert über die Methode `void printContConList()`, welch die eben erwähnte Variable mit einer `for`-Schleife durchgeht und printet. Dies könnte in etwa so aussehen:
```
cont0;cont1
cont0;cont3
cont1;cont2
cont2:cont0
```
(Beispiel mit 4 Containern)

Besonders aber in der Entwicklungsphase des Simulators war dies sehr nützlich um schnell zu sehen welcher Container von sich aus die meisten Verbindungen hatte. Dies war besonders später beim Erstellen der Dragable Graphs sehr nützlich, da dieser immer einen Container als Ausgangspunkt nimmt. Die Liste ist auch bis zu einem gewissen Grad sortiert, da beim Muster "A;B" A sich erste ändert, wenn alle Bs durch sind.
#### Exportieren in JSON files
 Es gibt zwei mögliche JSON Files, welche erstellt werden können:
- `graph.json`
- `graphSpecific.json`
Beide sind in ihrem Aufbau sehr ähnlich, dienen aber unterschiedlichen Zwecken. 

`graph.json` entspringt folgender Methode:
```JS
public JSONObject parseAllContainersToJSON(){
    JSONArray containersJSON = new JSONArray();
  
    for(Container c : containers){
        JSONObject containerJSONObject = new JSONObject();
        containerJSONObject.put("contId", c.getName());
  
        if(getAllSubs(c) != null){
            JSONArray subsOfC = getAllSubs(c);
            containerJSONObject.put("subs", subsOfC);
        }  
        containersJSON.put(containerJSONObject);
  
    }
  
    JSONObject finalJSON = new JSONObject();
    finalJSON.put("containers", containersJSON);
    return finalJSON;
}
```

Diese Methode geht alle bestehenden Container durch. Es wird jeweils ein neues `JSONObject` erstellt und mit `.put` der Name des momentanen Containers zusammen mit "contId" in das neu erstellte JSON-Objekt hinzugefügt. Nun kommt die `getAllSubs`-Methode in das Spiel: Dieser wird der aktuelle Container übergeben und sie checkt dann anhand der **Adjazenz-Matrix**, ob es "1", also Verbindungen zu anderen Container gibt. Ist dies der Fall, gibt sie ein `JSONArray` zurück, ist dies nicht der Fall, NULL. Im Fall, ein `JSON`-Array vorhanden ist, fügt die `parseAllContainersToJSON`-Methode dieses mit dem Key "subs" (Sub-Container = benachbarte Container) ebenfalls zum JSON-Objekt hinzu , bevor dieses dann selbst in das `containersJSON`-Array hinzugefügt wird. Da die Methode ein `JSONObject` zurückgeben soll (Grund: da die Export-Methode dies verlangt), wird ein abschließendes `JSONObject` erstellt, welches das Array mit dem key "containers" abspeicher.
[vgl. @HowToDoInJava-JSON & @MavenRepository-JSON]

Das zweite File, entstammt einer anderen Funktion namens `parseSpecificToJSON`:
```JAVA
public JSONObject parseSpecificToJSON(Container origin, int depth){ 
    JSONObject originJSONObject = new JSONObject();
    originJSONObject.put("contId", origin.getName());
    
    if (depth > 0) {
        JSONArray subsArray = new JSONArray();
        JSONArray subsOfOrigin = getAllSubs(origin);
  
        if (subsOfOrigin != null) {
            for (Object sub : subsOfOrigin) {
                JSONObject subJSONObject = (JSONObject) sub;
                Container subContainer = convertJSONToContainer(subJSONObject);
  
                JSONObject subContainerJSON = parseSpecificToJSON(subContainer, depth -1);
                subsArray.put(subContainerJSON);
            }
            originJSONObject.put("subs", subsArray);
        }
    }
 return originJSONObject;
}
```
[CHATGPT21]
Diese Methode übernimmt einen Ausgangscontainer `origin` und eine Tiefe `depth`. Zeil dieser Methode ist es, bis zu einer gewissen Tiefe die Sub-Container eines Ausgangscontainers in ein JSON-Objekt zu schreiben. Angenommen der Ausgangscontainer ist "cont0" und die Tiefe ist 3, dann wird der Ausgangscontainer (Tiefe 0), seine Verbindungs-Container (Tiefe 1) und deren Verbindungs-Container (Tiefe 2) in ein JSON-File geschrieben. Es ist diese Methode, welches die Grundlage für das JSON File liefert, welches später im Dragable Graph ebenfalls verwendet wird.

Zur  Erklärung dieser Methode: Sollte eine passende Tiefe (>0) übergeben worden sein und besitzt der Ausgangs-Container Verbindungen zu Anderen, so wird eine `For`-Schleife ausgelöst, welche alle Sub-Container des `origin` durchgeht. Jedes dieser "sub Objects" wird dann in ein `JSOBObject` gecastet und daraufhin mit einer Hilfsmethode (=`convertJSONToContainer` [CHATGPT21]) in ein `Container`-Objekt umgewandelt. Nun beginnt das rekursive Aufrufen der Methode, wobei `depth` immer um eins verringert wird. Durch dieses rekursive Aufrufen wird immer einer der `subs` von dem ursprünglichen `origin`, das neue `origin` bis eben die Tiefe 0 erreicht hat und die Methode zu Ende ist. 

Das eigentliche Schreiben in die jeweiligen JSON Files übernimmt die Methode `exportToJsonFile` ([CHATGPT21]), welche folgende drei Variablen übernimmt:
- boolean `sepcific`
- int `depth`
- Container `spc`
Ist `sepcifc = false`, dann ruft die Methode `parseAllContainersToJSON` auf, ist sie TRUE `parseSpecificToJSON(spc, depth)`. Mithilfe eines `FileWriters` wird dann entweder in `graph.json` (bei `sepcifc = false`) oder in `graphSpecific.json` (bei `sepcifc = true`) geschrieben.

Das Aufrufen dieser Methode geschieht in der `Main`, wobei der User den Ausgangscontainer und die Tiefe angeben muss, sollte er "specific" wählen.

Unter folgender Annahme:
```
Container Anzahl = 4
Adjazenz Matrix =
c  0  1  2  3
0  0  1  1  1 
1  1  0  0  0 
2  0  0  0  0 
3  0  0  1  0 

Origin = cont1
Tiefe = 2
```
... würden folgende 2 Files entstehen:

**graph.json**:
```JSON
{"containers": [
    {"contId": "cont2"},
    {
        "contId": "cont1",
        "subs": [{"contId": "cont0"}]
    },
    {
        "contId": "cont0",
        "subs": [
            {"contId": "cont1"},
            {"contId": "cont2"},
            {"contId": "cont3"}
        ]
    },
    {
        "contId": "cont3",
        "subs": [{"contId": "cont2"}]
    }]}
```

**graphSpecific.json**:
```JSON
{
    "contId": "cont1",
    "subs": [{
        "contId": "cont0",
        "subs": [
            {"contId": "cont1"},
            {"contId": "cont2"},
            {"contId": "cont3"}
        ]
    }]
}
```

#### Zustandekommen des Directed Dragable Graphs
## Website
