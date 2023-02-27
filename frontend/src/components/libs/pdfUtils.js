import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { format } from "date-fns";

const getTextPosition = (printFullPage) => {
  if (printFullPage) {
    return { x: 35, y: 15, fontSize: 10 };
  } else {
    return { x: 10, y: 40, fontSize: 15 };
  }
};

export const exportPDF = ({ elementId, startDate, endDate, printFullPage }) => {
  const input = document.getElementById(elementId);
  html2canvas(input, {
    logging: true,
    letterRendering: 1,
    useCORS: true,
  }).then((canvas) => {
    const imgWidth = 200;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const imgData = canvas.toDataURL("img/png");
    const pdf = new jsPDF("l", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;
    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    // Add logo
    pdf.addImage("lightWeight2.png", "PNG", 10, 10, 20, 20);
    // Add text
    const formattedStartDate = format(new Date(startDate), "d MMMM yyyy");
    const formattedEndDate = format(new Date(endDate), "d MMMM yyyy");
    const text = `Start Date: ${formattedStartDate}\nEnd Date: ${formattedEndDate}`;
    const { x: textX, y: textY, fontSize } = getTextPosition(printFullPage);
    pdf.setFontSize(fontSize);
    pdf.text(text, textX, textY);
    pdf.save(`${elementId}.pdf`);
  });
};
