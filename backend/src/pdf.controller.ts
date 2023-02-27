/* eslint-disable prettier/prettier */
import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller()
export class PdfController {
  constructor(private readonly screenshotService: PdfService) {}

  @Get('/screenshot')
  async takeScreenshot(
    @Query('elementId') elementId: string,
    @Res() response: Response,
  ): Promise<void> {
    const screenshotBuffer = await this.screenshotService.generatePdf(elementId);

    // Set header content type
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${elementId}.pdf`,
    );

    // Mengirimkan hasil screenshot dalam bentuk binary
    response.send(screenshotBuffer);
  }
}
