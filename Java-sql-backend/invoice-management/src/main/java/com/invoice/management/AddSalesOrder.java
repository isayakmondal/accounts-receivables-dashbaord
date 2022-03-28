package com.invoice.management;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;


import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;


/**
 * Servlet implementation class AddInvoice
 */
@WebServlet("/AddSalesOrder")
public class AddSalesOrder extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddSalesOrder() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String invoice = null;
		
		try {
			BufferedReader reader = request.getReader();
			invoice = reader.readLine();
			System.out.println(invoice);
//			System.out.println(invoice.getClass().getName());
			
//			System.out.println(invoice.split(","));
//			System.out.println(invoice.split("\"\""));
//			System.out.println(invoice.split(","));
			
			invoice =  invoice.substring(1, invoice.length() - 1);
			String final_values[] = invoice.split(",");
			
			for(int i = 0; i < final_values.length; ++i) {
				final_values[i] = final_values[i].split(":")[1];
				final_values[i] = final_values[i].substring(1, final_values[i].length() - 1);
				System.out.println(final_values[i]);
			}
			
			String customerName = final_values[0];
			String customerNumber = final_values[1];
			String invoiceNumber = final_values[2];
			String invoiceAmount = final_values[3];
			String dueDate = final_values[4];
			String notes = final_values[5];
			
			Connection conn = GetConnection.connectToDB();
			String sql_statement = "INSERT INTO winter_internship (name_customer, cust_number, doc_id, total_open_amount, due_in_date, notes) values (?, ?, ?, ?, ?, ?)";
			
			PreparedStatement st = conn.prepareStatement(sql_statement);
			st.setString(1, customerName);
			st.setString(2, customerNumber);
			st.setString(3, invoiceNumber);
			st.setString(4, invoiceAmount);
			st.setString(5,  dueDate);
			st.setString(6, notes);
			
			st.executeUpdate();
//			conn.commit();
			conn.close();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

}
