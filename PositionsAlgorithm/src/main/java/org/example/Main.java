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

        try {
            // reading and formatting the lines of the .dot file
            List<String> lines = readDot();
            printLines(lines);

            // adding containers only
            for (String l : lines) {
                Container newCon = new Container(l.split(";")[0]);
                graph.addContainer(newCon);

            }

            // adding adjacent Containers to previously added Container in Graph
            for (Container c : graph.getContainers()) {
                for (String l : lines) {
                    if (l.split(";")[0].equals(c.getName())) {
                        for (Container cc : graph.getContainers()) {
                            if (l.split(";")[1].equals(cc.getName())) {
                                c.addDestination(cc, Double.parseDouble(l.split(";")[2]));
                                break;
                            }
                        }
                    }
                }
            }
            System.out.println("Adding Neighbors Done");

            //checkSimilarity(containersByA, containersByF, containersByA.get(1));
            doPositioning(graph);

        } catch (IOException e) {
            e.printStackTrace();
        }


    }

    private static int x = 0;
    private static int y = 0;

    // this method reads in the dot file and formats it correctly
    private static List<String> readDot() throws IOException {

        Scanner sc = new Scanner(System.in);
        BufferedReader br;

        System.out.println("Which test file should be used?");
        int in = Integer.parseInt(sc.nextLine());
        switch (in) {
            case 1:
                br = new BufferedReader(new FileReader("C:\\Users\\Luca\\iCloudDrive\\PositionsAlgorithm\\testOne.dot"));
                break;
            case 2:
                br = new BufferedReader(new FileReader("C:\\Users\\Luca\\iCloudDrive\\PositionsAlgorithm\\testTwo.dot"));
                break;
            case 3:
                br = new BufferedReader(new FileReader("C:\\Users\\Luca\\iCloudDrive\\PositionsAlgorithm\\testThree.dot"));
                break;
            default:
                System.out.println("Default selected.");
                br = new BufferedReader(new FileReader("C:\\Users\\Luca\\iCloudDrive\\PositionsAlgorithm\\testOne.dot"));
        }


        List<String> rawLines = new LinkedList<>();
        List<String> formattedLines = new LinkedList<>();

        String line;

        while ((line = br.readLine()) != null) {
            rawLines.add(line);
        }

        // removes: diagraph{}
        rawLines.remove(0);
        rawLines.remove(rawLines.size() - 1);

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

    private static void printLines(List<String> lines) {
        for (String l : lines) {
            System.out.println(l);
        }
    }

    public static List<Container> calculateShortestPath(Graph graph, Container source) {
        source.setDistance(0.00);

        Set<Container> settledContainers = new HashSet<>();
        Set<Container> unsettledContainers = new HashSet<>();

        unsettledContainers.add(source);

        while (unsettledContainers.size() != 0) {
            Container currentContainer = getLowestDistanceNode(unsettledContainers);
            unsettledContainers.remove(currentContainer);
            for (Map.Entry<Container, Double> adjacencyPair : currentContainer.getAdjacentContainers().entrySet()) {
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
        for (Container con : settledContainers) {
            System.out.println(con.getName() + " " + con.getDistance());
        }
        System.out.println("---------------------------------------------------");

        // Create and return deep copies of the containers
        List<Container> result = new ArrayList<>();
        for (Container con : settledContainers) {
            result.add(new Container(con));
        }
        return result;

    }

    private static Container getLowestDistanceNode(Set<Container> unsettledContainers) {
        Container lowestDistanceContainer = null;
        double lowestDistance = Double.MAX_VALUE;
        for (Container container : unsettledContainers) {
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


    private static void doPositioning(Graph graph) {
        Map<Container, int[]> conMap = new HashMap<>();
        //graph.resetContainers();
        List<Container> containersByOrigin = calculateShortestPath(graph, graph.getSingleContainer("A"));

        graph.resetContainers();
        List<Container> containersByFarthest = calculateShortestPath(graph, graph.getSingleContainer(containersByOrigin.get(containersByOrigin.size()-1).getName()));

        Grid grid = new Grid(containersByOrigin.size());

        //conMap.put(origin, new int[]{0, 0});

        grid.putOriginAndFarthestonGrid(containersByOrigin.get(0).getName(), containersByFarthest.get(containersByFarthest.size() - 1).getName());
        containersByOrigin.remove(containersByOrigin.get(0));
        containersByFarthest.remove(containersByFarthest.get(0));

        containersByOrigin.remove(containersByOrigin.get(containersByFarthest.size() - 1));
        containersByFarthest.remove(containersByFarthest.get(containersByFarthest.size() - 1));

        //temporary
        if(grid.getSize() == 9){
            grid.setCoordinateOrder(3, 3);
        } else if (grid.getSize() == 6){
            grid.setCoordinateOrder(2, 3);
        }else {
            grid.setCoordinateOrder(1, 1);
        }

        while (!grid.checkIfFull()) {
            String nc = grid.getNextXCoordinates();

            Container conWithLowestDistance = new Container("filler");
            Container conLowestDistByFarthest = null;
            conWithLowestDistance.setDistance(Double.MAX_VALUE);

            int i;
            int j = -1;
            boolean similarityCheck = false;

            for (i = 0; i < containersByOrigin.size(); i++) {
                if (containersByOrigin.get(i).getDistance() < conWithLowestDistance.getDistance()) {
                    conWithLowestDistance = containersByOrigin.get(i);
                    conLowestDistByFarthest = containersByFarthest.get(i);
                    similarityCheck = checkSimilaritySimple(containersByOrigin, conWithLowestDistance.getDistance());
                }


            }

            Container tobedeleted = null;
            if (similarityCheck) {
                for (j = 0; j < containersByFarthest.size(); j++) {
                    if (containersByFarthest.get(j).getName() != conLowestDistByFarthest.getName() && containersByFarthest.get(j).getDistance().intValue() == conLowestDistByFarthest.getDistance().intValue()) {
                        tobedeleted = containersByOrigin.get(j);
                        break;
                    }

                }

            }

            int a = conWithLowestDistance.getShortestPath().size();
            int b = conLowestDistByFarthest.getShortestPath().size();

            x = nc.charAt(0) - '0';
            y = nc.charAt(1) - '0';

            if (grid.getWeight(x, y) == conWithLowestDistance.getShortestPath().size() + conLowestDistByFarthest.getShortestPath().size()) {
                grid.putContainerOnGrid(x, y, conWithLowestDistance.getName());
                containersByOrigin.remove(conWithLowestDistance);
                containersByFarthest.remove(conLowestDistByFarthest);

            } else if (similarityCheck && grid.getWeight(x, y) == containersByOrigin.get(j).getShortestPath().size() + containersByFarthest.get(j).getShortestPath().size()) {
                grid.putContainerOnGrid(x, y, containersByOrigin.get(j).getName());
                containersByOrigin.remove(containersByOrigin.get(j));
                containersByFarthest.remove(containersByFarthest.get(j));

            }
            //grid.outputGrid();
        }
        grid.outputGrid();

    }

    private static boolean checkSimilaritySimple(List<Container> list, double distance) {
        int count = 0;
        for (Container c : list) {
            if (c.getDistance() == distance) {
                count++;
            }
        }
        if (count > 1) {
            return true;

        }
        return false;
    }


}

