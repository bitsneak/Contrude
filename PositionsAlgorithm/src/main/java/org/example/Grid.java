package org.example;

import java.util.ArrayList;

public class Grid {

    private static String[][] grid;
    private static int[][] weights;
    private static ArrayList<String> coordinates = new ArrayList<>();
    private int size;

    public Grid (int size){
        if (size == 6){
            grid = new String[2][3];
            weights = setWeights(2, 3);
        } else if (size == 9) {
            grid = new String[3][3];
            weights = setWeights(3, 3);
        }
        this.size = size;
   }

    public void outputGrid(){
        System.out.println("<------------------>");
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                if(grid[i][j] == null){
                    System.out.print(0 + " ");

                }else{
                    System.out.print(grid[i][j] + " ");

                }


            }
            System.out.println();
        }
        System.out.println("<------------------>\n");

    }
    public boolean checkGridPosition(int x, int y){
        if (x > grid.length || y > grid[0].length) {
            System.out.println("Invalid x y");
            return false;
        }

        if(grid[x][y] != null){
            return false;

        }
        return true;
    }
    public void putContainerOnGrid(int x, int y, String containerName){
        if(checkGridPosition(x, y) != false){
            grid[x][y] = containerName;

        }

    }
    public void putOriginAndFarthestonGrid(String origin, String farthest){
        grid[0][0] = origin;
        grid[grid.length-1][grid[1].length-1] = farthest;

    }

    public boolean checkIfFull(){
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                if(grid[i][j] == null){
                    return false;

                }


            }
        }
        return true;
    }

    public static int[][] setWeights(int rows, int cols){
        int w[][] = new int[rows][cols];
        for(int i = 0; i < rows; i++){
            for(int j = 0; j < cols; j++){
                if (j < i) {
                    w[i][j] = i;
                } else {
                    w[i][j] = j;
                }
            }

        }
        //ChatGPT Beginn
        int[][] wInverted = new int[rows][cols];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                wInverted[i][j] = w[rows - 1 - i][cols - 1 - j];
            }
        }
        // ChatGPT Ende

        for(int i = 0; i < rows; i++){
            for(int j = 0; j < cols; j++){
                w[i][j] = w[i][j] + wInverted[i][j];
            }

        }
        w[0][0] = 0;
        w[rows-1][cols-1] = 0;

        return w;
    }



    public void setCoordinateOrder(int rows, int cols){
        int minDiagonal = 1; // Skip the smallest diagonal (sum 0)
        int maxDiagonal = (rows - 1) + (cols - 1) - 1; // Skip the largest diagonal (sum rows + cols - 2)

        // Iterate over each diagonal sum
        for (int sum = minDiagonal; sum <= maxDiagonal; sum++) {
            // Iterate over possible x coordinates
            for (int x = 0; x < rows; x++) {
                int y = sum - x;
                // Check if the coordinate is within matrix bounds
                if (y >= 0 && y < cols) {
                    coordinates.add(x + "" + y);
                }
            }
        }

    }

    public String getNextXCoordinates(){
        String nextCoord = coordinates.get(0);
        coordinates.remove(0);
        return nextCoord;
    }

    public int getSize() {
        return size;
    }

    public int getWeight(int x, int y) {
        return weights[x][y];
    }
}
