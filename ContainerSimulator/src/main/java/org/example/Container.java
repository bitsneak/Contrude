package org.example;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

public class Container {

    private String name;
    private List<Container> shortestPath = new LinkedList<>();
    private Double distance = Double.MAX_VALUE;
    Map<Container, Double> adjacentContainers = new HashMap<>();

    private double signalMinimum;

    public void addDestination(Container con, double distance){
        adjacentContainers.put(con, distance);
    }

    public Container(String name){
        this.name = name;
        this.signalMinimum = ThreadLocalRandom.current().nextDouble(10, 25);

    }

    // Copy constructor
    public Container(Container container) {
        this.name = container.name;
        this.distance = container.distance;
        this.shortestPath = new LinkedList<>(container.shortestPath);
        this.adjacentContainers = new HashMap<>(container.adjacentContainers);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LinkedList<Container> getShortestPath() {
        return (LinkedList<Container>) shortestPath;
    }

    public void setShortestPath(LinkedList<Container> shortestPath) {
        this.shortestPath = shortestPath;
    }

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    public Map<Container, Double> getAdjacentContainers() {
        return adjacentContainers;
    }

    public void setAdjacentContainers(Map<Container, Double> adjacentContainers) {
        this.adjacentContainers = adjacentContainers;
    }

    public double getSignalMinimum() {
        return signalMinimum;
    }

    public void redoSignalMinimum() {
        this.signalMinimum = ThreadLocalRandom.current().nextDouble(10, 25);
    }

    @Override
    public String toString() {
        StringBuilder adjacent = new StringBuilder();

        // Print only the names of adjacent containers to avoid recursion
        for (Container container : adjacentContainers.keySet()) {
            adjacent.append(container.getName()).append(", ");
        }

        // Print the container details, but avoid printing the entire object recursively
        return "Container{" +
                "name='" + name + '\'' +
                ", shortestPath=" + getShortestPathNames() +  // Call helper method to print shortest path names
                ", distance=" + distance +
                ", adjacentContainers=" + adjacent +
                ", signalMinimum=" + signalMinimum +
                '}';
    }

    // Helper method to get names of containers in the shortestPath
    private String getShortestPathNames() {
        StringBuilder pathNames = new StringBuilder();

        for (Container container : shortestPath) {
            pathNames.append(container.getName()).append(" -> ");
        }

        if (pathNames.length() > 0) {
            pathNames.setLength(pathNames.length() - 4);  // Remove the last arrow
        }

        return pathNames.toString();
    }
}
