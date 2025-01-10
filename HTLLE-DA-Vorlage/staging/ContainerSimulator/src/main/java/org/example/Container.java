package org.example;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

public class Container {

    private String name;
    List<Container> adjacentContainers = new ArrayList<>();

    private double signalMinimum;

    public void addDestination(Container con){
        adjacentContainers.add(con);
    }

    public Container(String name){
        this.name = name;
        this.signalMinimum = ThreadLocalRandom.current().nextDouble(10, 25);

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Container> getAdjacentContainers() {
        return adjacentContainers;
    }

    public void setAdjacentContainers(List<Container> adjacentContainers) {
        this.adjacentContainers = adjacentContainers;
    }

    public void setSignalMinimum(double signalMinimum) {
        this.signalMinimum = signalMinimum;
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
        for (Container container : adjacentContainers) {
            adjacent.append(container.getName()).append(", ");
        }

        return "Container{" +
                "name='" + name + '\'' +
                ", adjacentContainers=" + adjacent +
                ", signalMinimum=" + signalMinimum +
                '}';
    }
}
