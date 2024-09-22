package org.example;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

public class Graph {

    private Set<Container> containers = new HashSet<>();
    private ArrayList<String> contConList = new ArrayList<>();

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
                    contConList.add(origin.getName().charAt(4) + ";" + cont.getName().charAt(4));

                }
            }

        }
        redoAllMinSignals();
    }

    public boolean checkContConList(String a, String b){
        for(String s : contConList) {
            String[] parts = s.split(";");
            if( (parts[0].equals(a.charAt(4)) && parts[1].equals(b.charAt(4))) || (parts[0].equals(b.charAt(4)) && parts[1].equals(a.charAt(4))) ){
                return false;
            }

        }
        return true;
    }
    public void printContConList(){
        for(String s : contConList){
            System.out.println(s);
        }

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
