package com.su2;

import java.util.Scanner;

public class App 
{
    public static boolean check_prime(int n)
    {
        if (n <= 1)
            return false;

        for (int i = 2; i <= Math.sqrt(n); i++)
        {
            if (n % i == 0)
                return false;
        }
        return true;
    }

    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter a number:"); 
        int a = sc.nextInt();
        System.out.println("Enter a number:"); 
        int b = sc.nextInt(); 
        System.out.println("The prime numbers between "+" "+a+" "+"and "+b+" are :");
        for(int i=a;i<b;i++){
        if (check_prime(i))
            System.out.println(i + " ");
        
        }
        sc.close();
    }
}
