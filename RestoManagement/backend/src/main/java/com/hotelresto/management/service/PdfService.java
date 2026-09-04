package com.hotelresto.management.service;

import com.hotelresto.management.model.Booking;
import com.hotelresto.management.model.Order;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.UnitValue;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfService {

    public byte[] generateBookingInvoice(Booking booking) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("HOTEL & RESTO MANAGEMENT SYSTEM")
                .setFontSize(20).setBold());
        document.add(new Paragraph("Invoice for Booking #" + booking.getId()));
        document.add(new Paragraph("Customer: " + booking.getUser().getFullName()));
        document.add(new Paragraph("Room: " + booking.getRoom().getRoomNumber() + " (" + booking.getRoom().getRoomType() + ")"));
        document.add(new Paragraph("Dates: " + booking.getCheckInDate() + " to " + booking.getCheckOutDate()));

        Table table = new Table(UnitValue.createPercentArray(new float[]{3, 1}));
        table.setWidth(UnitValue.createPercentValue(100));
        table.addHeaderCell("Description");
        table.addHeaderCell("Amount");
        table.addCell("Room Charges (" + booking.getRoom().getPricePerNight() + " / night)");
        table.addCell(booking.getTotalPrice().toString());
        document.add(table);

        document.add(new Paragraph("Total: $" + booking.getTotalPrice()));
        document.add(new Paragraph("Status: " + booking.getStatus()));
        document.close();

        return out.toByteArray();
    }

    public byte[] generateOrderInvoice(Order order) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("HOTEL & RESTO MANAGEMENT SYSTEM")
                .setFontSize(20).setBold());
        document.add(new Paragraph("Invoice for Order #" + order.getId()));
        document.add(new Paragraph("Table: " + order.getTableNumber()));
        document.add(new Paragraph("Date: " + order.getCreatedAt()));

        Table table = new Table(UnitValue.createPercentArray(new float[]{3, 1, 1}));
        table.setWidth(UnitValue.createPercentValue(100));
        table.addHeaderCell("Item");
        table.addHeaderCell("Qty");
        table.addHeaderCell("Price");

        order.getItems().forEach(item -> {
            table.addCell(item.getMenuItem().getName());
            table.addCell(String.valueOf(item.getQuantity()));
            table.addCell(item.getPrice().toString());
        });
        document.add(table);

        document.add(new Paragraph("Total: $" + order.getTotalAmount()));
        document.add(new Paragraph("Status: " + order.getStatus()));
        document.close();

        return out.toByteArray();
    }
}
