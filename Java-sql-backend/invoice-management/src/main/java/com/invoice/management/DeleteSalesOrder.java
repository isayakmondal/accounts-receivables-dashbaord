package com.invoice.management;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

/**
 * Servlet implementation class EditSalesOrder
 */
@WebServlet("/deleteSalesOrder")
public class DeleteSalesOrder extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteSalesOrder() {
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
		// TODO Auto-generated method stub
		String salesOrder = null;
		
		try {
			BufferedReader reader = request.getReader();
			salesOrder = reader.readLine();
			System.out.println(salesOrder);
			
			salesOrder = salesOrder.split(":")[1];
			salesOrder = salesOrder.substring(1,  salesOrder.length() - 2);
			
			String final_values[] = salesOrder.split(",");
			
			Connection conn = GetConnection.connectToDB();
			String sql_statement = "DELETE FROM invoice_details WHERE doc_id = ?";
			
			for(int i = 0; i < final_values.length; ++i) {
//				System.out.println(final_values[i]);
				PreparedStatement st = conn.prepareStatement(sql_statement);
				st.setString(1, final_values[i]);
				System.out.println(st);
				st.executeUpdate();
			}
//			
//			String salesOrderNumber = final_values[0];
//			String salesOrderAmount = final_values[1];
//			String notes = final_values[2];
//			
//			
//			String sql_statement = "UPDATE invoice_details SET total_open_amount = ?, notes = ? WHERE doc_id = ?";
//			
//			PreparedStatement st = conn.prepareStatement(sql_statement);
//			st.setString(3, salesOrderNumber);
//			st.setString(1, salesOrderAmount);
//			st.setString(2, notes.isEmpty() ? null : notes);
//			
//			System.out.println(st);
//			
//			st.executeUpdate();
			conn.close();
		}
		catch(Exception e) {
			
		}
	}

}

