package org.example;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

public class Graph {

    private Set<Container> containers = new HashSet<>();
    private ArrayList<String> contConList = new ArrayList<>();
    private int[][] adjMatrix;

    public Graph(int size){
        adjMatrix = new int[size][size];
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                adjMatrix[i][j] = 0;
            }
        }

    }

    public void resetContainers() {
        for (Container container : containers) {
            container.setDistance(Double.MAX_VALUE);
            container.setShortestPath(new LinkedList<>());
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
                    origin.addDestination(cont, signal);
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
            for(Container destination : origin.getAdjacentContainers().keySet()){
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

    //ChatGPT (editiert)
    public JSONObject toJSON() {
        JSONArray nodesArray = new JSONArray();
        Container[] containerArray = containers.toArray(new Container[0]);

        for (Container container : containerArray) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("contId", container.getName());

            JSONArray subsArray = getAllSubs(container);
            if (subsArray.length() > 0) {
                jsonObject.put("subs", subsArray);
            }

            nodesArray.put(jsonObject);
        }

        JSONObject graphJson = new JSONObject();
        graphJson.put("nodes", nodesArray);
        return graphJson;
    }

    //ChatGPT (editiert)
    public JSONObject toSpecificJSON(Container origin, int depth) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("contId", origin.getName());

        JSONArray subsArray = getAllSubs(origin);
        if (depth > 1) {
            for (int i = 0; i < subsArray.length(); i++) {
                JSONObject subJson = subsArray.getJSONObject(i);
                String subContainerName = subJson.getString("contId");
                Container subContainer = getSingleContainer(subContainerName);

                // Recursively add subs for this sub-container, decreasing depth by 1
                JSONObject subContainerJson = toSpecificJSON(subContainer, depth - 1);

                // Add the subs of this sub-container to the current subJson object
                if (subContainerJson.has("subs")) {
                    subJson.put("subs", subContainerJson.getJSONArray("subs"));
                }
            }
        }

        // Add the subs to the current container's JSON object
        jsonObject.put("subs", subsArray);
        return jsonObject;
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

        return subsArray;
    }

    //ChatGPT (editiert)
    public void exportToJSONFile(boolean specific, int depth, Container spc) {

        if(specific){
            try (BufferedWriter writer = new BufferedWriter(new FileWriter("graphSpecific.json"))) {
                writer.write(toSpecificJSON(spc, depth).toString(4));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }else{
            try (BufferedWriter writer = new BufferedWriter(new FileWriter("graph.json"))) {
                writer.write(toJSON().toString(4));  // 4 für eine schön formatierte Ausgabe
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
