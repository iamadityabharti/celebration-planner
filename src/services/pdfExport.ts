import { jsPDF } from 'jspdf';
import { EventPlan } from '../types';

export function exportEventPlanToPDF(plan: EventPlan) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  let y = margin;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 42, 'F');

  // App & Event Title
  doc.setTextColor(217, 70, 239); // fuchsia-500
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('CELEBRAI — GENAI CELEBRATION & EVENT MASTERPLAN', margin, 14);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(plan.title, margin, 24);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(`Type: ${plan.eventType.toUpperCase()}  |  Date: ${plan.date}  |  Location: ${plan.location}`, margin, 32);
  doc.text(`Guests: ${plan.guestCount}  |  Budget: ${plan.budget.currencySymbol}${plan.budget.totalBudget.toLocaleString()} ${plan.budget.currency}`, margin, 37);

  y = 50;

  // Function to check page overflow
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // Section: Theme & Concept
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Theme, Concept & Color Palette', margin, y);
  y += 6;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text(`"${plan.theme.tagline}"`, margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const themeDescLines = doc.splitTextToSize(plan.theme.description, pageWidth - margin * 2);
  doc.text(themeDescLines, margin, y);
  y += themeDescLines.length * 4.5 + 4;

  // Swatches preview
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Color Palette:', margin, y);
  let swatchX = margin + 24;
  plan.theme.palette.forEach(swatch => {
    // parse hex to RGB
    const hex = swatch.hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) || 100;
    const g = parseInt(hex.substring(2, 4), 16) || 100;
    const b = parseInt(hex.substring(4, 6), 16) || 100;

    doc.setFillColor(r, g, b);
    doc.roundedRect(swatchX, y - 3.5, 6, 4.5, 1, 1, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(swatch.name, swatchX + 8, y);
    swatchX += 30;
  });
  y += 10;

  // Section: Budget Breakdown
  checkPageBreak(30);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Budget Allocations & Expenses', margin, y);
  y += 6;

  // Table header
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, pageWidth - margin * 2, 7, 'F');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Item / Category', margin + 3, y + 4.8);
  doc.text('Estimated', margin + 95, y + 4.8);
  doc.text('Actual', margin + 125, y + 4.8);
  doc.text('Status', margin + 155, y + 4.8);
  y += 9;

  plan.budget.items.forEach(item => {
    checkPageBreak(8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(item.name.substring(0, 48), margin + 3, y);
    doc.text(`${plan.budget.currencySymbol}${item.estimatedCost.toLocaleString()}`, margin + 95, y);
    doc.text(`${plan.budget.currencySymbol}${item.actualCost.toLocaleString()}`, margin + 125, y);
    doc.setTextColor(item.paid ? 16 : 220, item.paid ? 185 : 38, item.paid ? 129 : 38);
    doc.text(item.paid ? 'PAID' : 'PENDING', margin + 155, y);
    y += 6;
  });
  y += 6;

  // Section: Day-of Run of Show
  checkPageBreak(30);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Day-of Run of Show (Agenda)', margin, y);
  y += 6;

  plan.runOfShow.forEach(ros => {
    checkPageBreak(12);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(192, 38, 211); // fuchsia-600
    doc.text(ros.time, margin, y);

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.text(`${ros.title} (Owner: ${ros.owner})`, margin + 22, y);
    y += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(8);
    const descLines = doc.splitTextToSize(ros.description, pageWidth - margin * 2 - 24);
    doc.text(descLines, margin + 22, y);
    y += descLines.length * 3.8 + 3;
  });
  y += 4;

  // Section: Vendors
  checkPageBreak(25);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('4. Vendor Team & Status', margin, y);
  y += 6;

  plan.vendors.forEach(v => {
    checkPageBreak(14);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`[${v.category}] ${v.name} — Status: ${v.status.toUpperCase()}`, margin, y);
    y += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Contact: ${v.contact}  |  Allocated: ${plan.budget.currencySymbol}${v.cost.toLocaleString()}`, margin + 3, y);
    y += 4;
    doc.text(`Notes: ${v.notes}`, margin + 3, y);
    y += 5;
  });

  // Footer on all pages
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Generated by Celebrai AI Planner  |  Page ${i} of ${totalPages}  |  celebration.app`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  // Save the PDF
  const filename = `${plan.title.replace(/[^a-zA-Z0-9]/g, '_')}_Plan.pdf`;
  doc.save(filename);
}

