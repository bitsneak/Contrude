package org.example;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {

        Graph graph = new Graph();

        try{
            // reading and formatting the lines of the .dot file
            List<String> lines = readDot();
            printLines(lines);

            // adding containers only
            for(String l : lines){
                Container newCon = new Container(l.split(";")[0]);
                graph.addContainer(newCon);

            }

            // adding adjacent Containers to previously added Container in Graph
            for(Container c : graph.getContainers()){
                for(String l : lines){
                    if(l.split(";")[0].equals(c.getName())){
                        for(Container cc : graph.getContainers()){
                            if(l.split(";")[1].equals(cc.getName())){
                                c.addDestination(cc, Double.parseDouble(l.split(";")[2]));
                                break;
                            }
                        }
                    }
                }
            }
            System.out.println("Adding Neighbors Done");


            Set<Container> settledForA = calculateShortestPath(graph, graph.getSingleContainer("A"));
        }catch (IOException e){
            e.printStackTrace();
        }


    }

    private static List<String> readDot() throws IOException {
        BufferedReader br = new BufferedReader(new FileReader("/Users/luca/Documents/Diplomarbeit/PositionsAlgorithm/testOne.dot"));
        List<String> rawLines = new LinkedList<>();
        List<String> formattedLines = new LinkedList<>();

        String line;

        while ((line = br.readLine()) != null) {
            rawLines.add(line);
        }

        // removes: diagraph{}
        rawLines.remove(0);
        rawLines.remove(rawLines.size()-1);

        String regex = "(\\w+) -> (\\w+) \\[label=\"([\\d.]+)\"\\]";
        Pattern pattern = Pattern.compile(regex);

        String name = null;
        String neighbor = null;
        String distanceToNeighbor = null;

        for (String l : rawLines) {
            Matcher matcher = pattern.matcher(l);
            if (matcher.find()) {
                name = matcher.group(1);
                neighbor = matcher.group(2);
                distanceToNeighbor = matcher.group(3);

            }
            formattedLines.add(name + ";" + neighbor + ";" + distanceToNeighbor);
        }

        return formattedLines;
    }
    private static void printLines(List<String>lines){
        for(String l : lines ){
            System.out.println(l);
        }
    }

    public static Set<Container> calculateShortestPath(Graph graph, Container source){
        source.setDistance(0.00);

        Set<Container> settledContainers = new HashSet<>();
        Set<Container> unsettledContainers = new HashSet<>();

        unsettledContainers.add(source);

        while (unsettledContainers.size() != 0) {
            Container currentContainer = getLowestDistanceNode(unsettledContainers);
            unsettledContainers.remove(currentContainer);
            for (Map.Entry< Container, Double> adjacencyPair : currentContainer.getAdjacentContainers().entrySet()) {
                Container adjacentContainer = adjacencyPair.getKey();
                Double edgeWeight = adjacencyPair.getValue();
                if (!settledContainers.contains(adjacentContainer)) {
                    CalculateMinimumDistance(adjacentContainer, edgeWeight, currentContainer);
                    unsettledContainers.add(adjacentContainer);
                }
            }
            settledContainers.add(currentContainer);
        }

        System.out.println("---------------------------------------------------");
        System.out.println("Source Container: " + source.getName());
        System.out.println("Distances to other containers: ");
        for(Container con : settledContainers){
            System.out.println(con.getName() + " " + con.getDistance());
        }
        System.out.println("---------------------------------------------------");

        return settledContainers;

    }

    private static Container getLowestDistanceNode(Set <Container> unsettledContainers) {
        Container lowestDistanceContainer = null;
        double lowestDistance = Double.MAX_VALUE;
        for (Container container: unsettledContainers) {
            double containerDistance = container.getDistance();
            if (containerDistance < lowestDistance) {
                lowestDistance = containerDistance;
                lowestDistanceContainer = container;
            }
        }
        return lowestDistanceContainer;
    }

    private static void CalculateMinimumDistance(Container evaluationContainer, Double edgeWeigh, Container sourceContainer) {
        Double sourceDistance = sourceContainer.getDistance();
        if (sourceDistance + edgeWeigh < evaluationContainer.getDistance()) {
            evaluationContainer.setDistance(sourceDistance + edgeWeigh);
            LinkedList<Container> shortestPath = new LinkedList<>(sourceContainer.getShortestPath());
            shortestPath.add(sourceContainer);
            evaluationContainer.setShortestPath(shortestPath);
        }
    }



}