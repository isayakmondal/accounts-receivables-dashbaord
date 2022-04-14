package com.invoice.management;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
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

/**
 * Servlet implementation class SendData
 */
@WebServlet("/advanceSearch")
public class AdvanceSearch extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AdvanceSearch() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub

		String salesOrder = null;
		PrintWriter out = response.getWriter();
		try {
			BufferedReader reader = request.getReader();
			salesOrder = reader.readLine();
			System.out.println(salesOrder);

			salesOrder = salesOrder.substring(1, salesOrder.length() - 1);
			String final_values[] = salesOrder.split(",");

			for (int i = 0; i < final_values.length; ++i) {
				final_values[i] = final_values[i].split(":")[1];
				if (final_values[i].charAt(0) == '\"') {
					final_values[i] = final_values[i].substring(1, final_values[i].length() - 1);
				}
				System.out.println(final_values[i]);
			}

			String doc_id = final_values[0];
			String invoice_id = final_values[1];
			String cust_number = final_values[2];
			String business_year = final_values[3];

			Connection conn = GetConnection.connectToDB();
			String sql_statement = "select * FROM winter_internship where doc_id = ? and invoice_id = ? and cust_number =? and buisness_year =?";

			PreparedStatement st = conn.prepareStatement(sql_statement);
			st.setString(1, doc_id);
			st.setString(2, invoice_id);
			st.setString(3, cust_number);
			st.setString(4, business_year);

			System.out.println(st);

			ResultSet rs = st.executeQuery();
			ArrayList<InvoicePojo> data = new ArrayList<>();
			while (rs.next()) {
				InvoicePojo inv = new InvoicePojo();
				inv.setSl_no(rs.getLong("sl_no"));
				inv.setBusinessCode(rs.getString("business_code"));
//				inv.setNameCustomer(rs.getString("name_customer"));
				inv.setCustNumber(rs.getString("cust_number"));
				inv.setClearDate(rs.getString("clear_date") == null ? "" : rs.getString("clear_date").substring(0, 10));
				inv.setBusinessYear(rs.getInt("buisness_year"));
				inv.setDocID(rs.getLong("doc_id"));
				inv.setPostingDate(rs.getString("posting_date"));
				inv.setDocumentCreateDate(rs.getString("document_create_date"));
				inv.setDueInDate(rs.getString("due_in_date"));
				inv.setInvoiceCurrency(rs.getString("invoice_currency"));
				inv.setDocumentType(rs.getString("document_type"));
				inv.setPostingID(rs.getInt("posting_id"));
				inv.setTotalOpenAmount(rs.getFloat("total_open_amount"));
				inv.setBaselineCreateDate(rs.getString("baseline_create_date"));
				inv.setCustPaymentTerms(rs.getString("cust_payment_terms"));
				inv.setInvoiceID(rs.getLong("invoice_id"));
				inv.setAging_bucket(rs.getString("aging_bucket"));
//				inv.setIsOpen(rs.getInt("isOpen"));
//				inv.setNotes(rs.getString("notes"));

//				System.out.println(inv);

				data.add(inv);
			}

			Gson gson = new GsonBuilder().serializeNulls().create();
			String invoices = gson.toJson(data);

//			System.out.println(invoices);
			out.print(invoices);
			response.setStatus(200);
//			response.addHeader("Access-Control-Allow-Origin", "*");
//			 response.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
//			 response.addHeader("Access-Control-Allow-Headers", "Content-Type");

			out.flush();

			conn.close();
		} catch (Exception e) {

		}
	}

}