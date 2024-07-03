# HTLLE-DA-Vorlage

Diese Vorlage ist zur Erstellung der Diplomarbeiten an der HTL Leoben gedacht. 
**Bitte sprechen Sie mit Ihren Betreuern ab, ob Sie Ihre Arbeit mit Hilfe dieses Templates verfassen dürfen.**


Das hier vorliegende Template sollte die Erstellung von Diplomarbeiten in Teams soweit wie möglich vereinfachen.
Deshalb setzen wir auf die Verwendung von freien Technologien welche ohne Lizenzkosten auf jedem Rechner installiert werden dürfen:

* [GIT](https://git-scm.com/) zur Verwaltung und Versionierung der Diplomarbeit. 
* [Make](https://www.gnu.org/software/make/) sowie einige Linux Standardtools zum Aufruf und zur Orchestrierung der Werkzeuge
* [Pandoc](https://pandoc.org/) zur Transformation von [Markdown](https://pandoc.org/MANUAL.html#pandocs-markdown) Dateien zu LaTex Dateien, sowie 
* [BibTex](http://www.bibtex.org/) zur Erstellung von Literaturverzeichnissen und Referenzen innerhalb des Dokuments  
* [TexLive](https://www.tug.org/texlive/) zur erstellung des fertigen PDFs aus dem generierten LaTex Dokument
* [Hunspell](https://hunspell.github.io/) als Rechtschreibüberprüfung


Zur Erstellung der Arbeit sollte immer das neuest Template aus dem Repository https://itsp.htl-leoben.at/git/Hg/HTLLE-DA-Vorlage.git verwendet werden. Das dort abgelegte Template wird von hg gepflegt und enthält die jeweils letztgültige (und mit der Direktion abestimmte) Fassung. 

Wenn Sie Änderungen an diesem Template wünschen, dann erstellen Sie bitte ein [Issue](https://itsp.htl-leoben.at/git/Hg/HTLLE-DA-Vorlage/issues) in dem sie auf einen ebenfalls von Ihnen aufgegebenen [Pull Request](https://itsp.htl-leoben.at/git/Hg/HTLLE-DA-Vorlage/pulls) verweisen der Ihen Änderungswunsch dokumentiert.  

# Vorbereitung des eigenen Rechners

Damit die DA gebaut werden kann müssen mehrere Programme installiert sein. Theoretisch funktioniert das auch mit 'purem' Windows, aber einfacher ist es die Arbeit mit Hilfe von Linux zu erstellen. Aus diesem Grund finden Sie hier nur die Anweisungen die sich auf einem **Ubuntu 18.04 LTS**  beziehen.

Wenn der HTL eigene GIT-Server verwendet wird, brauchen Sie die Tools nicht unbedingt installieren und Sie können sich die Arbeit als PDF per E-Mail zuschicken lassen. Mehr dazu weiter [unten](#remote)

## Windows

Wenn man Windows 10 als primäres Betriebssystem verwendet hat man zwei Möglichkeiten um zu einer Linux Umgebung zu kommen:

### VM installieren
Installation einer virtuellen Maschine auf der ein Linux läuft (z.B: mit [HyperV](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v), [VmWare](https://www.vmware.com/at/products/workstation-player.html), [VirtualBox](https://www.virtualbox.org/) oder einem anderen Virtualisierer) -> Dann erhält man eine VM welche man zum bearbeiten der VM extra starten muss

### Windows Subsystem for Linux
Aktivierung des [Windows Subsystem für Linux](https://docs.microsoft.com/en-us/windows/wsl/about) anhand [dieser Anleitung](https://docs.microsoft.com/en-us/windows/wsl/install-win10) welches genau so eine Umgebung erzeugt und bei der die Windows und Linux Welt miteinenader zusammenwachsen.

Es ist egal für welche der beiden Varianten man sich entscheidet - funktionieren werden technisch gesehen beide gleich gut ... wobei die WSL Variante sicherlich mehr Comfort bietet weil damit [direkt auf das Windows Dateisystem zugegriffen](https://docs.microsoft.com/en-us/windows/wsl/faq#how-do-i-access-my-c-drive) werden kann.

Das Dateisystem der `C:`-Festplatte von Windows ist im WSL unter folgendem Pfad erreichbar `/mnt/c/`. Die Festplatte `D:` unter dem Pfad `/mnt/d` usw. Es macht also sinn seine Diplomarbeit gleich auf dem C: Laufwerk anzulegen weil man dann von beiden Welten aus Zugriff auf die Dateien hat. 

Damit diese Anleitung für Windows und Linux passt habe ich angenommen dass sie in Windows einen Ordner `c:\Diplomarbeit` haben der mit folgendem Befehl in das WSL home Verzeichnis verlinkt ist:

```
$ ln -s /mnt/c/Diplomarbeit ~/Diplomarbeit
```


## Linux

Zuerst müssen (einmalig) die notwendigen Pakete in der Linux Umgebung installiert werden. Dieser Vorgang kann einige Zeit in Anspruch nehmen weil ca. 3-4 GB an Daten installiert werden.

```
$ sudo apt-get update
$ sudo apt-get install git build-essential make-guile texlive-full pandoc pandoc-citeproc tree rsync hunspell hunspell-de-at
```

Bei einer englischen Diplomarbeit muss außerdem entweder das Paket `hunspell-en-gb` oder `hunspell-en-us` installiert werden.

# Grundlegende Schritte

## Automatisches erstellen einer Diplomarbeit

Um ein privates GIT-Repository mit der HTLLE-DA-Vorlage anzulegen oder diese zu einem bereits bestehenden GIT-Repository in einem Unterverzeichnis hinzuzufügen, können Sie folgenden [Link](https://itsp.htl-leoben.at/ci/job/HTLLE-Diplomarbeit%20Erstelle%20Repository%20mit%20Template/build?delay=0sec) verwenden (ggf. mit LDAP Benutzername und Passwort z.B.: "1911wit00" anmelden).

Das Repository muss dem eingeloggten Benutzer gehören bzw. wird es für diesen erstellt. 

- `REPOSITORY_NAME` setzen Sie bitte den Namen Ihres bereits bestehenden oder neuen Repositories (z.B.: "Diplomarbeit")
- `GIT_PATH` hier können Sie ein Unterverzeichnis in GIT für Ihre Arbeit angeben

Sie bekommen anschließend eine E-Mail an Ihre Office365 Adresse mit weiteren Informationen und Links zu Ihrem Repository.

Fahren Sie bitte mit dem [Befüllen der speziellen Dateien](#befüllen-der-speziellen-dateien) fort.

### Build on Commit

Möchten Sie Ihre Diplomarbeit bei jedem GIT-Commit erstellen und an die - in der `metadata.yaml` genannten - E-Mail-Adressen zuschicken lassen, dann befolgen Sie diese Schritte:
- E-Mail an <hg@htl-leoben.at> oder <lcle@htl-leoben.at>
    - Betreff: [Jenkins] Add Build-Job DA
    - Body:
        - Name: [Kürzel von Besitzer]-DA-remote-trigger (z.B.: *199wit99-DA-remote-trigger*)
        - Repository: z.B.: *https://itsp.htl-leoben.at/git/199wit99/test_da.git*
        - GIT Path: z.B.: *./text*
        - GIT Branch: z.B.: *\*/master*
- Webhook in Gitea
    - Einen **Gogs**-Webhook zum Repository hinzufügen (*Repository -> Settings -> Webhooks -> Add Webhook*)
    - Target URL:  https://itsp.htl-leoben.at/ci/gogs-webhook/?job=\[job-name\] (z.B.: *https://itsp.htl-leoben.at/ci/gogs-webhook/?job=199wit99-DA-remote-trigger*)
    - Secret: **secureStudent**

## Manuelles erstellen einer Diplomarbeit

Wenn Sie mit einer neuen Diplomarbeit beginnen, dann gehen Sie am besten wie folgt vor:

### Erstellen eines leeren GIT Repositories in dem Sie Ihre DA Daten verwalten werden.

Es ist prinzipiell egal auf welchem GIT Server sie Ihr Repository hosten. Wir empfehlen dies aber auf dem HTL eigenen `https://itsp.htl-leoben.at/git` Server zu machen. **Sollten Sie Ihre Arbeit auf einem anderen Server hosten, dann achten Sie darauf dass sie ein privates Repository verwenden** denn sonst wäre der Inhalt der Arbeit bereits (unabsichtlich) veröffentlicht und beim Plagiatscheck würde Ihre gesamte Arbeit als Plagiat aufscheinen - und in weiterer Folge dann abgelehnt werden. Auch am HTL eigenen GIT-Server kann es aus Plagiats-Gründen ratsam sein, für die Diplomarbeit ein privates Repository zu verwenden.


#### Fall 1: Sie beginnen mit einem komplett neuen Repository

Das hier gezeigte Beispiel legt ein neues lokales Repository an und verknüpft es mit einem (zuvor uninitialisiert angelegtem) Repository im Internet.

```
~/Diplomarbeit$ git init
~/Diplomarbeit$ echo "Meine Diplomarbeit" > README.md
~/Diplomarbeit$ git add README.md
~/Diplomarbeit$ git commit -m "first commit"
~/Diplomarbeit$ git remote add origin https://itsp.htl-leoben.at/git/schueler/Diplomarbeit_JAHR.git
~/Diplomarbeit$ git push -u origin master
```

#### Fall 2: Sie haben bereits ein eigenes DA Repository mit Daten drinnen

Dieser Befehl klont Ihr bestehendes Repository in das aktuelle verzeichnis.

```
~/Diplomarbeit$ git clone https://itsp.htl-leoben.at/git/schueler/Diplomarbeit_JAHR.git .
```


### Hinzufügen des Templates als git-submodul
Wenn Sie ein lokales Repo haben, dann wird dieses Repository als [git-submodule](https://git-scm.com/docs/git-submodule) dazugeklont:

```
~/Diplomarbeit$ git config core.filemode false
~/Diplomarbeit$ git submodule add https://itsp.htl-leoben.at/git/Hg/HTLLE-DA-Vorlage.git
```

Der erste Befehl verhindert dass Änderungen an Berechtigungen (wie sie WSL im Hintergrund durchführt) dazu führen dass die Datei als modifiziert angesehen wird. Der zweite Befehl holt das Submodul dazu.  

Falls das Template durch hg geändert wird können Sie mit Hilfe des Befehls `git submodule update --remote` ihre derzeitige Version durch die jeweils aktuellste Version des Templates ersetzen. Damit die Änderungen sichtbar werden müssen Sie natürlich die Diplomarbeit vorher neu bauen. 

### Auschecken eines Diplomarbeitsrepositories eines anderen Teammitgliedes

Sollten die ganzen obigen Schritte bereits durch eines Ihrer Teammitglieder erledigt worden sein, dann reicht es aus wenn sie sich das Repository inklusive der Submodule einfach klonen.

```
~/Diplomarbeit$ git clone --recursive https://itsp.htl-leoben.at/git/schueler/Diplomarbeit_JAHR.git .
```

falls man irgendwann später die Submodule dazuklonen möchte (weil man z.B: den parameter `recursive` vergessen hat) dann kann man das einfach nachholen indem man folgende Befehle nachschießt:

```
~/Diplomarbeit$ git submodule init
~/Diplomarbeit$ git submodule update
```

### Erstellen der Inhaltsfiles für die DA

Die Inhaltsdateien legen Sie in Ihrem Repository ab. Am besten Sie beginnen damit, die Inhlatsdateien aus dem Template als Grundlage für Ihre DA zu verwenden. Sie können diese aus dem Template ganz einfach herkopieren und anschließend bearbeiten.

```
~/Diplomarbeit$ cp -R ./HTLLE-DA-Vorlage/example/* .
```

Damit sollten sie am Ende dann in etwa so eine Verzeichnisstruktur haben

```
$ tree ~/Diplomarbeit
.
├── 10-einleitung.md               <= Kapitel: Einleitung
├── 20-zielsetzung.md              <= Kapitel: Zielsetzung
├── 30-ausarbeitungen.md           <= Kapitel: Ausarbeitungen
├── 31-ausarbeitung_schueler1.md   <=          Ausarbeitung Schueler A
├── 32-ausarbeitung_schueler2.md   <=          Ausarbeitung Schueler B
├── 40-zusammenfassung.md          <= Kapitel: Zusammenfassung
│
├── literatur.bib                  <= Das ist das Literaturverzeichnis
├── metadata.yaml                  <= Grundlegende Informationen zur Diplomarbeit
│
├── .vscode                        <= Einstellungen und hilfreiche Dateien für VS Code
│   ├── bibtex.code-snippets          
│   ├── extensions.json
│   ├── markdown.code-snippets
│   ├── settings.json
│   └── tasks.json                 
├── img                            <= Hier kommen alle Ihre Bilder rein
│   ├── graph.png
│   └── screenshot_eclipse.png
│
├── pdfs                           <= PDFs für den Anhang (referenziert in metadata.yaml)
│   ├── begleitprotokolle.pdf
│   ├── HTL-DA-Vereinbarung.pdf
│   └── projekthandbuch.pdf
│
│  
└── HTLLE-DA-Vorlage
    ├──                            ... Inhalte aus der DA Vorlage
    └──                            ... wurden hier ausgeblendet


```

Es ist wichtig dass diese Verzeichnisstruktur so beibehalten wird, weil sonst der Build-prozess schief gehen kann. Achten Sie auf Groß und Kleinschreibung der Dateien und verzeichnisse. 

Normalerweise sollten sie mit diesen Dateien auskommen. Sie können den Inhalt dieser Dateien (unter Einhaltung der entsprechenden Formatierungsvorschriften) durch Ihren Inhalt ersetzen. Es ist normalerseise nicht notwendig weitere Dateien einzufügen, denn Dinge wie das Deckblatt, Eidesstattliche Erklärung, div. Verzeichnisse werden automatisch erstellt und gleich korrekt fomatiert.


Hier nochmals eine Erklärung der verschiedenen Dateien:

* Die `*.md` Dateien im Basisverzeichnis bilden den eigentlichen Inhalt Ihrer Diplomarbeit. Sie können diese Dateien mit jedem handelsüblichen Editor (zur Not auch direkt in Gitea) bearbeiten. Als Sytnax verwenden Sie [Markdown mit einigen Spezialfeatures für pandoc](https://pandoc.org/MANUAL.html#pandocs-markdown). Die Nummerierung am Anfang dient dazu, dass die Reihenfolge in der Diplomarbeit passt. So erscheint z.B: der Inhalt der Datei __20-zielsetzung.md__ nach __10-einleitung.md__ und vor __30*.md__. Die im Template angebotene Reihenfolge ist jene wie sie in der Diplomarbeit gewünscht ist. Mit dieser Technik kann die Nummerierung der Dateinamen nicht mehr mit der Nummerierung der Abschnitte / Kapitel im Text übereinstimmen, aber das ist in Ordnung. Sie sollten sich im Allgemeinen auf die Namen / Bezeichnungen von Kapiteln / Abschnitten als Bezeichner verlassen und Pandoc selbst, LaTeX die eigentliche Abschnittsnummerierung übernehmen lassen. Die Nummern in den Dateinamen sind Dateinummern in einem für die Shell guten Format und so benutzerfreundlich wie möglich.
* Das `/img` Verzeichnis beinhaltet alle Grafiken zur Diplomarbeit. Die können hier zur besseren Strukturierung auch gerne Unterverzeichnisse erstellen. Folgendes ist bei der Verwendung von Grafiken zu beachten:
    * Achten Sie darauf dass sie dort nur `*.jpg` und `*.png` Dateien ablegen 
    * Groß und Kleinschreibung müssen beachtet werden. So werden unter Linux die Datein `Hallo.jpg` und `hallo.jpg` als zwei unterschiedliche Dateien angesehen. Unter Windows hingegen nicht.
* Das `/pdfs` Verzeichnis beinhaltet Dateien welche im Appendix (auszugsweise oder ganz) eingefügt werden. Damit dies geschieht müssen sie aber im `metadata.yaml` korrekt referenziert werden. Es ist keine Schande hier viele Dateien abzulegen - sofern diese einen Bezug zur Diplomarbeit haben.
* Das Verzeichnisse `.vscode` enthält Einstellungen, Snippets und eine Liste von empfohlenen Erweiterungen für VS Code. VS Code sollte selbständig eine Benachrichtigung rechts unten einblenden, ob die Empfohlenen Erweiterungen installiert werden sollen. Wenn das nicht passiert kann man auch in den Tab Erweiterungen gehen und nach `@recommended:workspace` suchen. Dort kann man dann alle empfohlenen Erweiterungen installieren. Die Erweiterungen beinhalten eine simple Rechtschreibüberprüfung in Deutsch und Englisch (Code Spell Checker), einige nützliche git-Tools (Git Graph, Blame & Merge), die Möglichkeit PDFs direkt in VS Code anzuzeigen (vscode-pdf) und ein Tool womit vereinfacht Literatur Referenzen eingefügt werden können (Pandoc Citer).   

### Befüllen der speziellen Dateien

#### metadata.yaml

In dieser Datei befinden sich alle Informationen rund um Ihre Diplomarbeit. Das Dateiformat ist [YAML](https://yaml.org/spec/1.2/spec.html) in welchem folgende Felder befüllt sein müssen:

```
---

# Informationen für das Titelblatt
da-titel: Titel lt. DA Portal
da-jahr: 2020/21 

# Schlüsselwörter werden im PDF als Schlüsselwörter hinterlegt
da-keywords: HTLLE, Keyword1, Keyword2, Keyword3

# Sprache in der die Diplomarbeit verfasst wird. 
# Je nach dem wird dann das Template übersetzt. Die Übersetzung des Inhaltes
# ist Aufgabe der Schüler. Mögliche Werte: <lang_nicht_setzen> oder english
# lang: english

# Autoren der Diplomarbeit (=Schüler)
# Je Autor sind alle felder asuzufüllen
# Information wird am Titelblatt und bei der Eidesstattlichen Erklärung verwendet
da-author:
- vorname: Joltawan 
  nachname: Barodscheff
  klasse: 5IT
  thema: Subthema des Schülers 1

- vorname: Craig 
  nachname: Tester
  klasse: 5IT
  thema: Subthema des Schülers 2 

# Diplomarbeitsbetreuer
# Je Betreuer sind alle Felder auszufüllen
# Information wird am Titelblatt und bei den PDF Metadaten verwendet
da-betreuer:
- paraffe: hg
  name: Ing. DI(FH) Günther Hutter, Msc.

- paraffe: me
  name: DI Dr. mont Thomas Messner

# Eine Kurzfassung in Deutsch
da-kurzfassung-de: Hier kommt eine deutsche Kurzfassung hin.

# Eine Kurzfassung in Englisch
da-kurzfassung-en: Hier kommt eine englische Kurzfassung hin.

# PDF Dateien die im Anhang zur Diplomarbeit entweder ganz oder nur seitenweise einkopiert werden
# Das Pflichtattribut 'abschnitt' bezeichnet hier die Überschrift für desen Anhang
# Das Pflichtattribut 'pdf-file' ist der Dateiname des PDFs welches im pdfs Ordner zu finden ist (ohne Pfadangabe)
# Wenn man nur einige Seiten aus einem großen PDF einfügen will dann kann man das optionale Attribut 'seiten' verwenden
# in dem man entweder durch Beistrich getrennt szezifische Seiten aufzälen kann oder mittels Bindestrich einen Bereich.  
# Sollte gar kein Appendix erzeugt werden kann dieser Abschnitt auch gelöscht werden. Am besten verwenden Sie als
# Dateinamen ohne Sonderzeichen als Eingabedateien.

da-appendix:
- abschnitt: Begleitprotokolle
  pdf-file: begleitprotokolle.pdf    

- abschnitt: Projekthandbuch
  pdf-file: projekthandbuch.pdf

- abschnitt: Technische Dokumentation
  pdf-file: pandoc-manual.pdf
  seiten: 53-73

- abschnitt: Diplomatbeitsvereinbarung
  pdf-file: HTL-DA-Vereinbarung.pdf

# Eigenschaften für den Buildserver der HTL Leoben
# build-notification wird dazu verwendet um eine Emailadresse zu hinterlegen wohin das fertig gebaute
# File und alle anderen Artefakte dann versandt werden soll. Hier könnte man z.B: die eigene Emailadresse
# oder die des Diplomarbeitenteams angeben. Damit bekommt man die neusten Versionen automatisch zugestellt.
da-build-properties:
- build-notification: Diplomarbeit - DA_2021_Thema <269bc6a5.O365.htl-leoben.at@emea.teams.ms>
- build-notification: mytesms@adress.com
---
```

#### literatur.bib

Aus dieser Datei wird als Literaturverzeichnis erstellt. Wann immer sie Informationen aus anderen Quellen beziehen oder daraus Wissen ableiten sollten sie diese Quelle zitieren. Alle Informationen zu direkten und auch indirekten Quellen sollten hier möglichst genau dokumentiert werden. Sobald die Quellenangabe dann in der DA verwendet wird, erstellt das Framework einen entsprechenden Literaturverweis.

Egal ob die Quellenangabe aus einem Buch, einer Zeitschrift order irgend einer anderen wissenschaftlichen Arbeit stammt, versuchen sie immer möglichst alle Felder zu befüllen. In diesen [bibtex style examples](https://verbosus.com/bibtex-style-examples.html?lang=de) sieht man wie solch eine korrekt befüllter Quelleneintrag aussieht. 

Um das Zusammensuchen der Quellenangaben für Bücher zu vereinfachen kann man in vielen Fällen den Bibliographiedienst [OttoBib](https://www.ottobib.com) verwenden, in dem alleine durch Angabe der [ISBN Nummer](https://en.wikipedia.org/wiki/International_Standard_Book_Number) eines Buches in vielen Fällen schon einen fertigen BibTex Block bekommt. Einen ähnlichen Dienst bietet die Internetseite [bibtexsearch](https://www.bibtexsearch.com/) an - wo man durch die Eingabe von Schlüsselwörtern nach BibTexeinträgen suchen kann. Wenn man wirklich nichts im Internet findet, dann kann man sich die Einträge auch selbst basteln - wobei sich die Software [JabRef](https://www.jabref.org/) als besonders nützlichlicher Editor dafür herauskristallisiert hat.

## Arbeiten im Rahmen der Diplomarbeit

### Bauen der Diplomarbeit als PDF Datei

#### **Lokal**
Damit das PDF für die Diplomarbeit erstellt wird muss (aus Ihrem Basisverzeichnis heraus) folgender Befehl abgesetzt werden:

```
make pdf -C HTLLE-DA-Vorlage SOURCEDIR=$(pwd)
```

Danach erscheint (sofern alles gut geht) die Datei `./diplomarbeit.pdf`. Sollte die Datei bereits von einem früheren Lauf her existiert haben wird sie einfach überschrieben. Sollte die Arbeit nicht erfolgreich gebaut werden können, dann kann in der Datei `pandoc.log` der Grund dafür herausgefunden werden.

Damit Sie nicht immer den gesamten Befehl schreiben müssen können Sie sich auch einen Alias setzen:

```
alias da="make pdf -C HTLLE-DA-Vorlage SOURCEDIR=$(pwd)"
```
Damit beschränkt sich Ihre eigentliche Arbeit darauf, die Markdown Files zu editieren (nicht veressen zu speichern) und anschließend den neuen Alias `da` aufzurufen. Danach haben Sie immer die neuste Diplomarbeit gebaut.

Mit den mitgelieferten Tasks kann in VS Code das Bauen entweder über das Ausführen der Tasks geschehen oder mittels Hotkeys. Standardmäßig ist `Strg + Shift + B` für den Standarttask vorgesehen. Dieser ist bei den angegebenen Tasks `Build PDF`, welcher, wie der Name sagt, die PDF für die Diplomarbeit baut. Dazu gibt es auch einen Task, um die Rechtschreibprüfung zu starten.

Noch einfacher ist das Starten der Tasks mit der Erweiterung "Task Explorer". Dort können beide Tasks in einem separaten Fenster gefunden und gestartet werden. Die Tasks funktionieren jedoch nur wenn im Lokalen wsl alle benötigten Pakete installiert sind.

#### **Remote**
Sollten Sie die notwendigen Tools (pandoc, LaTeX, etc.) nicht lokal installieren wollen und Sie haben Ihre Diplomarbeit am GIT-Server der HTL versioniert, dann können Sie Ihre PDF auch am [Jenkins](https://itsp.htl-leoben.at/ci) bauen und sich per E-Mail zuschicken lassen. Es wird dabei immer das aktuellste Template verwendet.

Öffnen Sie dazu den [Jenkins-Job](https://itsp.htl-leoben.at/ci/job/HTLLE-Diplomarbeit/build?delay=0sec) und melden Sie sich ggf. mit Ihren Benutzerdaten (z.B.: `1911wit00`) an.

- `REPOSITORY` Ihre Repository-URL z.B: `https://itsp.htl-leoben.at/git/1911wit00/Diplomarbeit.git`
- `GIT_PATH` Ggf. der Unterordner in dem sich Ihre Diplomarbeit auf GIT befindet z.B.: `diplomarbeit/`
- `GIT_BRANCH` Wenn Sie nicht wissen, was in GIT `branches` sind, brauchen Sie den Parameter nicht anpassen
- `ARCHIVE_FORMAT` Wählen Sie aus, ob die fertige Arbeit als `.zip` oder `.tar.gz` Datei versendet wird

Beispiel: `GIT_PATH` ist `"text"` 
```
$ tree ~/Diplomarbeit
.
├── source
└── text
    ├── 10-einleitung.md
    ├── 20-zielsetzung.md
    ├── 30-ausarbeitungen.md
    ├── 31-ausarbeitung_schueler1.md
    ├── 32-ausarbeitung_schueler2.md
    ├── 40-zusammenfassung.md
    ├── HTLLE-DA-Vorlage
    │   ├──                           ... Inhalte aus der DA Vorlage
    │   └──                           ... wurden hier ausgeblendet
    ├── img
    │   └── graph.png
    ├── literatur.bib
    ├── metadata.yaml
    └── pdfs
        ├── HTL-DA-Vereinbarung.pdf
        ├── README
        ├── begleitprotokolle.pdf
        ├── pandoc-manual.pdf
        └── projekthandbuch.pdf
```

Beispiel: `GIT_PATH` ist default `"./"`
```
$ tree ~/Diplomarbeit
.
├── 10-einleitung.md
├── 20-zielsetzung.md
├── 30-ausarbeitungen.md
├── 31-ausarbeitung_schueler1.md
├── 32-ausarbeitung_schueler2.md
├── 40-zusammenfassung.md
├── HTLLE-DA-Vorlage
│   ├──                           ... Inhalte aus der DA Vorlage
│   └──                           ... wurden hier ausgeblendet
├── img
│   └── graph.png
├── literatur.bib
├── metadata.yaml
└── pdfs
    ├── HTL-DA-Vereinbarung.pdf
    ├── README
    ├── begleitprotokolle.pdf
    ├── pandoc-manual.pdf
    └── projekthandbuch.pdf
```

**Wichtig:** Das fertige PDF wird an die E-Mail Adressen aus `metadata.yaml` verschickt! Die E-Mail Adressen müssen mit `"- build-notification"` gekennzeichnet sein ([siehe oben](#befüllen-der-speziellen-dateien)).

Es muss nicht einmal die Vorlage als GIT submodule im Repository eingecheckt sein, weil hier während des Build Prozesses die aktuelle verwendet wird.

**Wichtig:** Sie bekommen eine Archiv-Datei (`.zip` oder `.tar.gz`) via E-Mail zugeschickt. Dieses Archiv lässt sich mit gängigen Tools entpacken (z.B.: [7-zip](https://www.7-zip.org/)). Darin befinet sich:
- `diplomarbeit.pdf`          Ihre fertige Diplomarbeit
- `diplomarbeit.pdf.log`      Der Log Output von pandoc
- `spellcheck-results.txt`    Die vermeintlich falsch geschriebenen Begriffe

### Übertragen des aktuellen Standes nach GIT

Es mach Sinn, die Diplomarbeit (auch nach kleinen Änderungen) immer wieder nach GIT zu übertragen. Damit ist sie optimal gesichert und falls Ihre Teammitglieder auch an der DA Arbeiten bekommen sie auch Zugang zum aktuellsten Stand. Falls Sie noch nicht mit GIT gearbeitet haben, stellen die folgenden Absätze eine (ultra-) [Kurzeinführung](https://rogerdudler.github.io/git-guide/) dar.

Git ist ein dezentrales Quellcodeverwaltungssystem bei dem jeder Entwickler eine volständige eigene Kopie der Daten (=Repository) haben kann. Normalerweise holt man sich einen Initialstand von einem GIT Server indem man mittels `git clone https://itsp.htl-leoben.at/git/schueler/diplomarbeit.git` das entsprechende Repositoiry lokal herkopiert.

Diesen kann man dann lokal bearbeiten und wenn man fertig ist, überprüft man mit `git status` welche Dateien sich geändert haben. Die geänderten Dateien (und auch solche die neu hinzukommen sollen) markiert man mittels `git add` gefolgt von den Dateinamen zur Übertragung.

Der Befehl `git commit -m "Aussagekräftige Commitmessage damit die anderen sehen was getan wurde"` speichert die zuvor markierten Änderungen in das lokale git Repository. Damit sind diese Daten für Sie erstmal gesichert. 

Um diese Dateien dann noch an den Server (auf den nach korrekter Einstellung der Berechtigungen alle Zugriff haben) zu übertragen wendet man den folgenden Befehl an `git push origin master`. Damit werden alle lokalen Änderungen an den Server gesendet.

Jetzt kann es auch vorkommen, dass jemand anders ihnen zuvor gekommen ist, schon Änderungen an den Dateien vorgenommen hat, und diese für Sie am Server bereit liegen. (Anders betrachtet haben sie in diesem Moment eine 'alte' Version Ihrer Diplomarbeit). Diese neueste Version können Sie ganz einfach mit dem Befehl `git pull` in Ihr Repository übernehmen. Dabei werden sofort alle geänderten Dateien durch die neueren übersetzt und sie können von da weg weiterarbeiten.

Wenn Ihnen die Arbeit mit der Kommandozeile nicht so geheuer ist, dann können Sie (so Ihre Diplomarbeit unter Windows über das WLS erreichbar ist) auch einen grafischen GIT Client wie z.B: [TortoiseGit](https://tortoisegit.org/docs/tortoisegit/) verwenden. 

Bei speziellen Fragen zu diesem Vorgehen wenden Sie sich bitte an den Programmierlehrer Ihres Vertrauens. 

## Tipps & Tricks

### Generell
* Man kann ToDo Blöcke in die DA einfügen indem man folgenden Block verwendet `\todo{Was noch zu tun wäre}`. Diese erscheinen dann als Textblasen am Rand der Arbeit.


### Versionsverwaltung

* Vor dem Schreiben: Neuesten Stand vom Server holen
* Nach dem Schreiben: Sofort einchecken und zum Server übertragen
* Verwenden Sie sinnvolle commit Kommentare (Nachrichten)


### Text

* Grammatik + Rechtschreibung beachten (Markdown hat keinen Spell-checker integriert). ggf. `aspell` installieren und durch die Markdown files suchen lassen. Lassen Sie die Dateien remote bauen, so bekommen Sie den Output einer Rechtschreibprüfung mit übermittelt
* Irgendwie sollte man ein (einheitliches) Bild vom Leser haben. Negativbeispiel:
    * Einerseits ein Dummy dem man `mdir` erklären muss
    * andererseits kann er Python-Pakete installieren
* Formulierungen
    * keine romanartigen Erzählungen
    * keine seitenlange Installationsanweisungen (besser: Link auf Anleitung im Web)
* Es sollte einen roten Faden durch die Diplomarbeit geben. Dazu erklärt man zuerst die Grundlagen und Inhalte die ein gewöhnlicher Leser braucht um sich in Ihrer Arbeit zurchtzufinden (= zumeist Literaturrrecherche). Danach bauen Sie auf diesen Gurndlagen ihren praktischen Teil auf, welche dann zu einem Ergebnis führt. Aus diesem grund ist die DA üblicherweise wie folgt gegliedert:
    * Aufgabenstellung
    * Grundlagen
    * Praktischer Teil
    * Zusammenfassung
* Bei unterschiedlichen Teilaufgabenstellungen (die womöglich aufeinander aufbauen) ist die Reihenfolge der Ausarbeitungen so zu wählen dass der Leser diesen roten Faden nicht verliert ... Grundlagen zuerst !
 
### Quellcode

* mit Java/Python/*-doc
* Sinnvolle Namen verwenden
* Coderichtlinien einhalten 
    * Klassen haben einen Outlline Kommentar (JavaDoc) in dem der Name des Autors und der Zweck der Klasse beschrieben wird
    * Funktionen / Methoden haben einen Outline Kommentar (JavaDoc) in dem beschrieben wird was die Methode macht und was die Parameter sowie der Rückgabetyp bedeuten
    * Gross & Kleinschreibung beachten
        * (final) Konstanten: GROSSBUCHSTABEN
        * packages: immer.mit.kleinbuchstaben
        * variablen: klein
        * Klassen: ErsterBuchstabeGross
    * Benennungen:
        * Funktionen: anhand eines verbs
        * Getter / Setter verwenden 
        * Klassen: Einzahl

### Listings

* Wenige (aber dafür aussagekräftige) Listings verwenden
* am besten ohne Kommentare
    * dafür mit Erklärung im Text darüber oder darunter
    * mit Verweis auf File
* UML Diagramme als Ergänzung

### Bilder

* Machen Sie Grafiken in guter Auflösung (> 72 dpi) und Achten Sie darauf dass diese nicht zu viel oder zu wenig Inhalt zeigen weil die Grafiken auf max. Seitenbreite skaliert werden können und dann entweder zu klein oder zu pixelig erscheinen.
* Orientieren sie die Grafiken so wie sie selbige in der Arbeit haben wollen. Wenn sie Grafiken um 90 Grad drehen, dann drehen Sie alle Grafiken in die selbe Richtung !
* Quellenangaben nicht vergessen (bei selbst erstellen Bildern: 'Eigene Darstellung')

### Quellenangaben

* alle Tools inkl. Versionsnummer
* alle Zitate bzw. übernommene Meinungen
* Datenblätter usw. können auch zitiert werden-

## Checkliste

Abschließend noch eine kurze Liste der wichtigsten Punkte, an denen erfahrungsgemäß die häufigsten Fehler auftreten. Diese Punkte bilden auch die Grundlage der routine-mäßigen Formbegutachtung an Universitäten.
 

* Titelseite: Länge des Titels (Zeilenumbrüche), Name, Studiengang, Datum -> Ausbessern in metadata.yaml
* Erklärung: vollständig mit Unterschrift.
* Inhaltsverzeichnis: balancierte Struktur, Tiefe, Länge der Überschriften.
* Kurzfassung/Abstract: präzise Zusammenfassung, passende Länge, gleiche Inhalte und Struktur.
* Überschriften:Länge, Stil, Aussagekraft.
* Typographie: sauberes Schriftbild, keine manuellen Abstände zwischen Absätzen oder Einrückungen, keine überlangen Zeilen, Hervorhebungen, Schriftgröße, Platzierung von Fußnoten.
* Interpunktion: Binde- und Gedankenstriche richtig gesetzt, Abstände nach Punkten (v. a. nach Abkürzungen)
* Abbildungen: Qualität der Grafiken und Bilder, Schriftgröße und -typ in Abbildungen, Platzierung von Abbildungen und Tabellen, Captions. Sind alle Abbildungen (und Tabellen) im Text referenziert?
* Gleichungen/Formeln:mathem. Elemente auch im Fließtext richtig gesetzt, explizite Gleichungen richtig verwendet, Verwendung von mathem. Symbolen.
* Quellenangaben:Zitate richtig referenziert, Seiten- oder Kapitelangaben bei gedruckten Medien
* Literaturverzeichnis: mehrfach zitierte Quellen nur einmal angeführt, Art der Publikation muss in jedem Fall klar sein, konsistente Einträge, Online-Quellen(URLs) sauber angeführt inkl. letztem Betrachtungszeitpunkt
* Sonstiges: ungültige Querverweise (??), Anhang, Papiergröße der PDF-Datei (A4=8.27×11.69Zoll), Druckgröße und -qualität.
