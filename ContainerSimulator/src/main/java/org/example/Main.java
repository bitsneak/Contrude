package org.example;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        Graph graph = new Graph();
        int count = -1;

        System.out.println("-------------------------------------------------");
        System.out.println("Welcome to the CONTRUDE Container Simulator v1.");
        System.out.println("-------------------------------------------------\n");

        while(count < 0){
            System.out.println("Container Count: 2-9?");
            int inInt = Integer.parseInt(sc.nextLine());
            if(inInt <= 9 && inInt >= 2){
                count = inInt;
            }

        }

        // creating container
        for(int i = 0; i < count; i++){
            int a = i+1;
            String containerName = "cont" + a;
            graph.addContainer(new Container(containerName));

        }
        System.out.print("Creating Containers --> Done!");

        //sending signals
        for(Container cont: graph.getContainers()){
            graph.sendSetSignals(cont);

        }

        String in = " ";
        while(!in.equals("q")){
            System.out.println("\nChoose an option:\n" +
                    "(a) View single Container\n" +
                    "(b) View Matrix\n" +
                    "(c) Print Connection List\n" +
                    "(q) Quit Simulator");
            in = sc.nextLine();

            switch(in){
                case "a":
                    System.out.println("Which Container should be viewed: cont# (# = 1-" + count + ")");
                    String b = sc.nextLine();
                    System.out.println(graph.getSingleContainer(b).toString());
                    break;
                case "b":
                    break;
                case "c":
                    graph.printContConList();
                    break;
            }


        }

        System.out.println("--------------------------------------------------------");
        System.out.println("Thank you for using the CONTRUDE Container Simulator!!");
        System.out.println("--------------------------------------------------------");

    }

}