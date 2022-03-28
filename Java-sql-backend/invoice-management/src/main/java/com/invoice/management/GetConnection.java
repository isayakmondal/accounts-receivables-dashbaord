package com.invoice.management;


//import java.sql.*;  
//public class GetConnection{  
//public static void main(String args[]){  
//try{  
//Class.forName("com.mysql.cj.jdbc.Driver");  
//Connection con=DriverManager.getConnection(  
//"jdbc:mysql://localhost:3306/invoices","root","root");  
// 
//Statement stmt=con.createStatement();  
//ResultSet rs=stmt.executeQuery("select * from dataset");  
//while(rs.next())  
//System.out.println(rs.getString(1));  
//con.close();  
//}catch(Exception e){ System.out.println(e);}  
//}  
//}  

import java.sql.Connection;
import java.sql.DriverManager;

public class GetConnection {
	// JDBC Driver Name and Database URL
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/grey_goose";
	
	// Database credentials
	static final String USER = "root";
	static final String PASS = "root";
	
	public static Connection connectToDB() throws Exception {
		// Register JDBC Driver
		Class.forName(JDBC_DRIVER);
		
		// Open a connection
		Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
		
		return conn;
	}

	
}