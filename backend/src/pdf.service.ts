/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';

@Injectable()
export class PdfService {
  async generatePdf(elementId: string): Promise<Buffer> {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    // Navigasi ke halaman web yang ingin diambil screenshot-nya
    await page.goto('http://localhost:3000/ownshopcorner');

    await page.waitForSelector(`#${elementId}`); // menunggu hingga elemen dengan ID yang diberikan muncul di dalam DOM

    await page.type(`#${elementId}`, 'test', { delay: 1000 });

    // Mendapatkan handle untuk elemen tertentu berdasarkan elementId-nya
    const elementHandle = await page.$(`#${elementId}`);
    if (!elementHandle) {
      throw new Error(`Cannot find element with ID ${elementId}`);
    }

    // Get the bounding box of the chart
    const boundingBox = await page.evaluate((id) => {
      const element = document.getElementById(id);
      const { x, y, width, height } = element.getBoundingClientRect();
      return { x, y, width, height };
    }, elementId);

    const screenshotBuffer: Buffer | string = await elementHandle.screenshot({
      clip: {
        x: boundingBox.x,
        y: boundingBox.y,
        width: boundingBox.width,
        height: boundingBox.height,
      },
      encoding: 'base64',
    });

    const pdfDoc = await PDFDocument.create();
    const image = await pdfDoc.embedPng(screenshotBuffer);

    // Membaca image dari file local
    const logoImageBytes = await fs.promises.readFile(
      './public/images/lightWeight2.png',
    );
    const logoImage = await pdfDoc.embedPng(logoImageBytes);

    const page1 = pdfDoc.addPage([595.28, 841.89]); // set page size to A4

    // Draw logo on page
    const logoWidth = 50; // Ukuran lebar logo dalam halaman PDF
    const logoHeight = logoWidth * (logoImage.height / logoImage.width); // Sesuaikan ukuran tinggi logo agar rasio aspeknya tetap
    const logoX = 50; // Letak horizontal logo di dalam halaman PDF
    const logoY = page1.getHeight() - logoHeight - 50; // Letak vertikal logo di dalam halaman PDF
    page1.drawImage(logoImage, {
      x: logoX,
      y: logoY,
      width: logoWidth,
      height: logoHeight,
    });

    // Draw screenshot on page
    const imageWidth = image.width;
    const imageHeight = image.height;
    const centerX = page1.getWidth() / 2;
    const centerY = page1.getHeight() / 2;
    page1.drawImage(image, {
      x: centerX - imageWidth / 2,
      y: centerY - imageHeight / 2,
      width: imageWidth,
      height: imageHeight,
    });

    // Serialize the PDF document to a buffer
    const pdfBytes: Uint8Array = await pdfDoc.save();
    const pdfBuffer: Buffer = Buffer.from(pdfBytes);
    await browser.close();

    return pdfBuffer;
  }
}
