import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing URL parameter', { status: 400 });
  }

  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();

    const convertedImage = await sharp(Buffer.from(arrayBuffer))
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .jpeg({
        quality: 80,
        progressive: true,
      })
      .toBuffer();

    return new NextResponse(convertedImage, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return new NextResponse('Error processing image', { status: 500 });
  }
}
