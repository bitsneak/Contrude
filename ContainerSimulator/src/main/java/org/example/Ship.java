package org.example;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.FileWriter;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

public class Ship {

    private Set<Container> containers = new HashSet<>();
    private ArrayList<String> contConList = new ArrayList<>();
    private int[][] adjMatrix;

    public Ship(int size){
        adjMatrix = new int[size][size];
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                adjMatrix[i][j] = 0;
            }
        }

    }

    public void addContainer(Container cont) {
        boolean lbefw = true;
        for (Container c : containers){
            if(c.equals(cont)){
                lbefw = false;
            }

        }

        if(lbefw){
            containers.add(cont);
        }
    }

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
                if(cont.getSignalMinimum() <= signal && checkContConList(origin.getName(), cont.getName())){
                    origin.addDestination(cont);
                    contConList.add(extractId(origin.getName()) + ";" + extractId(cont.getName()));

                }
            }

        }
        redoAllMinSignals();
    }

    public boolean checkContConList(String a, String b){
        int aId = extractId(a);
        int bId = extractId(b);
        for(String s : contConList) {
            String[] parts = s.split(";");
            if( (parts[0].equals(aId) && parts[1].equals(bId)) || (parts[0].equals(bId) && parts[1].equals(aId)) ){
                return false;
            }

        }
        return true;
    }

    public void fillAdjMatrix(){
        for(Container origin : containers){
            for(Container destination : origin.getAdjacentContainers()){
                int oId = extractId(origin.getName());
                int dId = extractId(destination.getName());
                adjMatrix[oId][dId] = 1;


            }
        }
    }

    //ChatGPT
    public int extractId(String name) {
        // Entferne "cont" und parse die restliche Zahl als Integer
        String idString = name.replace("cont", "");
        return Integer.parseInt(idString);
    }

    public void printAdjMatrix(){
        for(int k = 0; k < containers.size(); k++){
            if(k == 0){
                System.out.print("c  " + k + "  ");
            }else{
                System.out.print(k + "  ");
            }
        }
        System.out.println();
        for (int i = 0; i < adjMatrix.length; i++) {
                System.out.print (i + " ");


            for (int j = 0; j < adjMatrix[i].length; j++) {
                if(j>=10){
                    System.out.print("  " + adjMatrix[i][j] + " ");
                }else{
                    System.out.print(" " + adjMatrix[i][j] + " ");
                }


            }
            System.out.println();
        }
    }

    public void printContConList(){
        for(String s : contConList){
            System.out.println(s);
        }

    }

    //ChatGPT -editiert (removed unneeded if)
    public JSONObject parseSpecificToJSON(Container origin, int depth){
        // Erstelle das JSON-Objekt für den Ursprung-Container
        JSONObject originJSONObject = new JSONObject();
        originJSONObject.put("contId", origin.getName());

        // Wenn die Tiefe größer als 0 ist, rekursiv die Subcontainer hinzufügen
        if (depth > 0) {
            JSONArray subsArray = new JSONArray();
            // Hole alle Subcontainer des aktuellen Containers
            JSONArray subsOfOrigin = getAllSubs(origin);

            // Wenn es Subcontainer gibt, füge sie rekursiv hinzu
            if (subsOfOrigin != null) {
                for (Object sub : subsOfOrigin) {
                    JSONObject subJSONObject = (JSONObject) sub;
                    Container subContainer = convertJSONToContainer(subJSONObject);

                    // Rufe rekursiv die Methode für den Subcontainer auf
                    JSONObject subContainerJSON = parseSpecificToJSON(subContainer, depth - 1);
                    subsArray.put(subContainerJSON);
                }
                originJSONObject.put("subs", subsArray);
            }
        }

        return originJSONObject;
    }

    // Hilfsmethode zum Umwandeln eines JSONObject in einen Container
    private Container convertJSONToContainer(JSONObject json) {
        // Hier kannst du die Umwandlung von einem JSONObject zu einem Container anpassen
        String name = json.getString("contId");
        return new Container(name);  // Beispiel für eine einfache Umwandlung
    }

    public JSONObject parseAllContainersToJSON(){
        Container[] containersArray = containers.toArray(new Container[0]);
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

    public JSONArray getAllSubs(Container container){
        JSONArray subsArray = new JSONArray();
        int contId = extractId(container.getName());
        for(int i = 0; i < containers.size(); i++){
            if(adjMatrix[contId][i] > 0 && i != contId){
                JSONObject subJson = new JSONObject();
                subJson.put("contId", getSingleContainer("cont" + i).getName());
                subsArray.put(subJson);
            }

        }
        if(subsArray.length() == 0){
            return null;
        }

        return subsArray;
    }

    //ChatGPT (editiert - kommentare entfernt)
    public void exportToJSONFile(boolean specific, int depth, Container spc) {
        JSONObject jsonToExport;
        if (specific) {
            jsonToExport = parseSpecificToJSON(spc, depth);
            try (FileWriter file = new FileWriter("graphSpecific.json")) {
                file.write(jsonToExport.toString(4));  // 4 ist die Indentation für das Format
            } catch (IOException e) {
                e.printStackTrace();
            }

        } else {
            jsonToExport = parseAllContainersToJSON();
            try (FileWriter file = new FileWriter("graph.json")) {
                file.write(jsonToExport.toString(4));  // 4 ist die Indentation für das Format
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public boolean checkIfContainerWithNameExists(String name){
        for(int i = 0; i < containers.size(); i++){
            if(getSingleContainer("cont" + i).getName().equals(name)){
                return true;
            }
        }
        return false;
    }

    public void redoAllMinSignals(){
        for(Container cont : containers){
            cont.redoSignalMinimum();
        }
    }

    public Set<Container> getContainers() {
        return containers;
    }

    public void setContainers(Set<Container> containers) {
        this.containers = containers;
    }

    public Container getSingleContainer(String name){
        for(Container c : containers){
            if(c.getName().equals(name)){
                return c;
            }
        }
        return null;
    }
}
