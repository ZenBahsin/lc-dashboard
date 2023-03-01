import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { format } from "date-fns";

const getTextPosition = (printFullPage) => {
  if (printFullPage) {
    return { fontSize: 10 };
  } else {
    return { fontSize: 15 };
  }
};

export const exportPDF = ({
  elementId,
  startDate,
  endDate,
  periodic,
  printFullPage,
  notes,
}) => {
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

    // Add header
    pdf.addImage("lightWeight2.png", "PNG", 5, 5, 20, 20);

    const formattedStartDate =
      periodic === "Month"
        ? format(new Date(startDate), "MMMM yyyy")
        : format(new Date(startDate), "d MMMM yyyy");
    const formattedEndDate =
      periodic === "Month"
        ? format(new Date(endDate), "MMMM yyyy")
        : format(new Date(endDate), "d MMMM yyyy");

    const headerText = `Start Date: ${formattedStartDate}\nEnd Date: ${formattedEndDate}\nGroup By: ${periodic}`;
    const { fontSize: headerFontSize } = getTextPosition(printFullPage);
    const textWidth = pdf.getStringUnitWidth(headerText) * headerFontSize * 0.1;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const x = pageWidth - textWidth - 20;
    const y = 12;
    pdf.setFontSize(headerFontSize);
    pdf.text(headerText, x, y);

    // Add title
    const title = notes ? `${notes}` : `${elementId}`;
    const titleX = 30;
    const titleY = 17;
    pdf.setFontSize(20);
    pdf.text(title, titleX, titleY);

    // Add content
    const pageHeight = pdf.internal.pageSize.getHeight();
    const contentX = (pageWidth - imgWidth) / 2;
    const contentY = (pageHeight - imgHeight) / 2 + headerFontSize * 1.5;
    pdf.addImage(imgData, "PNG", contentX, contentY, imgWidth, imgHeight);
    const fileName = notes
      ? `${notes.replace(/ /g, "_")}.pdf`
      : `${elementId}.pdf`;
    pdf.save(fileName);
  });
};
