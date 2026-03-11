import type { APIRoute } from 'astro';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Email inválido'),
  description: z.string().min(1, 'La descripción es obligatoria'),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validate payload
    const parsedData = leadSchema.parse(data);

    // Initialize Google Auth
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth);

    // Load document properties and worksheets
    await doc.loadInfo(); 
    
    // Assuming the first sheet is the one we want to write to
    const sheet = doc.sheetsByIndex[0]; 

    // Append standard row
    await sheet.addRow({
      Nombre: parsedData.name,
      Email: parsedData.email,
      Descripción: parsedData.description,
      Fecha: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error saving lead:', error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: error.errors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
