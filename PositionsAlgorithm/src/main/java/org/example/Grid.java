package org.example;

public class Grid {

    private static String[][] grid;

    public Grid (int size){
        if (size == 6){
            grid = new String[2][3];
        }

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

    //temporary
    public int getWeight(int x, int y) {
        int[][] w = {
                {0, 2, 3},
                {3, 2, 0}
        };
        int ww = w[x][y];
        return ww;
    }




}
