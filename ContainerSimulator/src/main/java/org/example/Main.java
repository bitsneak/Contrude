package org.example;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);

        int count = -1;

        System.out.println("-------------------------------------------------");
        System.out.println("Welcome to the CONTRUDE Container Simulator v1.1");
        System.out.println("-------------------------------------------------\n");

        while(count < 0){
            System.out.println("Container Count: 2-99?");
            int inInt = Integer.parseInt(sc.nextLine());
            if(inInt <= 99 && inInt >= 2){
                count = inInt;
            }

        }

        Graph graph = new Graph(count);

        // creating container
        for(int i = 0; i < count; i++){
            String containerName = "cont" + i;
            graph.addContainer(new Container(containerName));

        }
        System.out.print("Creating Containers --> Done!");

        //sending signals
        for(Container cont: graph.getContainers()){
            graph.sendSetSignals(cont);


        }

        graph.fillAdjMatrix();

        String in = " ";
        while(!in.equals("q")){
            System.out.println("\nChoose an option:\n" +
                    "(a) View single Container\n" +
                    "(b) View Matrix\n" +
                    "(c) Print Connection List\n" +
                    "(d) Export to Json Format\n" +
                    "(q) Quit Simulator");
            in = sc.nextLine();

            switch(in){
                case "a":
                    int a = count-1;
                    System.out.println("Which Container should be viewed: cont# (# = 0-" + a + ")");
                    String b = sc.nextLine();
                    System.out.println(graph.getSingleContainer(b).toString());
                    break;
                case "b":
                    graph.printAdjMatrix();
                    break;
                case "c":
                    graph.printContConList();
                    break;
                case "d":
                    graph.exportToJSONFile();
            }


        }

        System.out.println("--------------------------------------------------------");
        System.out.println("Thank you for using the CONTRUDE Container Simulator!!");
        System.out.println("--------------------------------------------------------");

    }

}