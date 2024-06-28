import { PDFDocument, rgb } from 'pdf-lib'

export const generatePDF = async (text: string) => {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create()

  // Add a page to the document
  const page = pdfDoc.addPage([600, 400])

  // Get the width and height of the page
  const { width, height } = page.getSize()

  // Draw a string of text diagonally across the first page
  page.drawText(text, {
    x: width - 200,
    y: height - 50,
    size: 30,
    color: rgb(0, 0, 0),
  })

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  // Create a Blob from the PDF bytes
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob)

  return url
}
