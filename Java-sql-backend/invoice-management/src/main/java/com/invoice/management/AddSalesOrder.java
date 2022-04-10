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
@WebServlet("/addSalesOrder")
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
			
			String businessCode= final_values[0];
			String customerNumber = final_values[1];
			String clearDate = final_values[2];
			String businessYear = final_values[3];
			String docId = final_values[4];
			String postingDate = final_values[5];
			String documentCreateDate = final_values[6];
			String dueDate = final_values[7];
			String invoiceCurrency = final_values[8];
			String documentType = final_values[9];
			String postingId = final_values[10];
			String totalOpenAmount = final_values[11];
			String baselineCreateDate = final_values[12];
			String custPaymentTerms = final_values[13];
			String invoiceId = final_values[14];
			System.out.println(businessCode);
			
			Connection conn = GetConnection.connectToDB();
			String sql_statement = "INSERT INTO winter_internship (business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			
			PreparedStatement st = conn.prepareStatement(sql_statement);
			st.setString(1, businessCode);
			st.setString(2, customerNumber);
			st.setString(3, clearDate);
			st.setString(4, businessYear);
			st.setString(5, docId);
			st.setString(6, postingDate);
			st.setString(7, documentCreateDate);
			st.setString(8, dueDate);
			st.setString(9, invoiceCurrency);
			st.setString(10, documentType);
			st.setString(11, postingId);
			st.setString(12, totalOpenAmount);
			st.setString(13, baselineCreateDate);
			st.setString(14, custPaymentTerms);
			st.setString(15, invoiceId);
			
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
