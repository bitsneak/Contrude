package org.example;

import java.util.*;

public class Container{

    private String name;
    private List<Container> shortestPath = new LinkedList<>();
    private Double distance = Double.MAX_VALUE;
    Map<Container, Double> adjacentContainers = new HashMap<>();

    public void addDestination(Container con, double distance){
        adjacentContainers.put(con, distance);
    }

    public Container(String name){
        this.name = name;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Container container = (Container) o;
        return name.equals(container.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

}