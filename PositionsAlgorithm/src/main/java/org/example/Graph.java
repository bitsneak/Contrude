package org.example;

import java.util.HashSet;
import java.util.Set;

public class Graph {

    private Set<Container> containers = new HashSet<>();

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
