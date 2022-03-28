package com.invoice.management;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class SearchSalesOrder
 */
@WebServlet("/SearchSalesOrder")
public class SearchSalesOrder extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchSalesOrder() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		PrintWriter out = response.getWriter();
		
		int NO_OF_ROWS_TO_GET = 12;
		
		try {
			Connection conn = GetConnection.connectToDB();
			
			String searchKeyword = request.getParameter("searchKeyword");
			String page = request.getParameter("page");
//			int key = Integer.parseInt(searchKeyword);
			
			Statement st = conn.createStatement();
//			String sql_statement = "SELECT * FROM invoice_details ORDER BY doc_id LIMIT " + page + ", 10";
			String sql_statement = "SELECT * FROM winter_internship WHERE doc_id LIKE '" + searchKeyword + "%' LIMIT " + page +"," + NO_OF_ROWS_TO_GET;
			ResultSet rs = st.executeQuery(sql_statement);
//			PreparedStatement st = conn.prepareStatement(sql_statement);
//			st.setString(1, searchKeyword);
//			System.out.println(st);
			
			ArrayList<InvoicePojo> data = new ArrayList<>();
			while(rs.next()) {
				InvoicePojo inv = new InvoicePojo();
//				inv.setBusinessCode(rs.getString("business_code"));
				inv.setNameCustomer(rs.getString("name_customer"));
				inv.setCustNumber(rs.getString("cust_number"));
//				inv.setClearDate(rs.getString("clear_date"));
//				inv.setBusinessYear(rs.getInt("business_year"));
				inv.setDocID(rs.getLong("doc_id"));
//				inv.setPostingDate(rs.getString("posting_date"));
//				inv.setDocumentCreateDate(rs.getString("document_create_date"));
				inv.setDueInDate(rs.getString("due_in_date"));
//				inv.setInvoiceCurrency(rs.getString("invoice_currency"));
//				inv.setDocumentType(rs.getString("document_type"));
//				inv.setPostingID(rs.getInt("posting_id"));
				inv.setTotalOpenAmount(rs.getFloat("total_open_amount"));
//				inv.setBaselineCreateDate(rs.getString("baseline_create_date"));
//				inv.setCustPaymentTerms(rs.getString("cust_payment_terms"));
//				inv.setInvoiceID(rs.getLong("invoice_id"));
//				inv.setIsOpen(rs.getInt("isOpen"));
				
//				System.out.println(inv);
				
				data.add(inv);
			}
			
			Gson gson = new GsonBuilder().serializeNulls().create();
			String invoices = gson.toJson(data);
			
//			System.out.println(invoices);
			out.print(invoices);
			response.setStatus(200);
			out.flush();
		}
		catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
		catch(SQLException e) {
			e.printStackTrace();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
