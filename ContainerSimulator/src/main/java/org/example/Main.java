package org.example;

import java.util.Scanner;

public class Main {

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        int count = -1;

        System.out.println("-------------------------------------------------");
        System.out.println("Welcome to the CONTRUDE Container Simulator");
        System.out.println("-------------------------------------------------\n");

        while(count < 0){
            System.out.println("Container Count: >=2?");
            int inInt = Integer.parseInt(sc.nextLine());
            String warning = "YES";
            if(inInt > 99){
                System.out.println("Warning: Container Count above 99 might cause certain issues! To continue type YES; To change type anything else");
                warning = sc.nextLine();
            }
            if(warning.equals("YES")){
                count = inInt;
            }

        }

        Ship ship = new Ship(count);

        // creating container
        for(int i = 0; i < count; i++){
            String containerName = "cont" + i;
            ship.addContainer(new Container(containerName));

        }
        System.out.print("Creating Containers --> Done!");

        //sending signals
        for(Container cont: ship.getContainers()){
            ship.sendSetSignals(cont);


        }

        ship.fillAdjMatrix();

        String in = " ";
        while(!in.equals("q")){
            System.out.println("\nChoose an option:\n" +
                    "(a) View single Container\n" +
                    "(b) View Matrix\n" +
                    "(c) Print Connection List\n" +
                    "(d) Export to Json Format (all Containers)\n" +
                    "(e) Export to Json Format (specific Container)\n" +
                    "(q) Quit Simulator");
            in = sc.nextLine();

            int correctCount = count-1;

            switch(in){
                case "a":
                    System.out.println("Which Container should be viewed: cont# (# = 0-" + correctCount + ")");
                    String b = sc.nextLine();
                    if(ship.checkIfContainerWithNameExists(b)){
                        System.out.println(ship.getSingleContainer(b).toString());
                    }else {
                        System.out.println("No such container: " + b + "\nPlease try again.");
                    }
                    break;
                case "b":
                    ship.printAdjMatrix();
                    break;
                case "c":
                    ship.printContConList();
                    break;
                case "d":
                    ship.exportToJSONFile(false, 0, null);
                    break;
                case "e":
                    Container choosen = null;
                    while(choosen == null || !ship.checkIfContainerWithNameExists(choosen.getName())){
                        System.out.println("Which Container should be choosen: cont# (# = 0-" + correctCount + ")");
                        choosen = ship.getSingleContainer(sc.nextLine());
                    }

                    int depth = 0;
                    while(depth <= 0){
                        System.out.println("What should be the depth (1-6)? e.g depth of 2 = subs of choosen container + subs of the subs");
                        depth = Integer.parseInt(sc.nextLine());
                    }
                    ship.exportToJSONFile(true, depth, choosen);
                    break;

            }


        }

        System.out.println("--------------------------------------------------------");
        System.out.println("Thank you for using the CONTRUDE Container Simulator!!");
        System.out.println("--------------------------------------------------------");

    }

}