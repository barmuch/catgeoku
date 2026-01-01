import { NextResponse } from 'next/server';

// GET all categories - static data
export async function GET() {
  try {
    const categories = [
      { id: '1', name: 'Geology', slug: 'geology', description: 'Geological sciences and studies', icon: '🪨', count: 0 },
      { id: '2', name: 'Geophysics', slug: 'geophysics', description: 'Geophysical exploration and methods', icon: '🌊', count: 0 },
      { id: '3', name: 'Drilling Engineering', slug: 'drilling-engineering', description: 'Well drilling and completion', icon: '⚙️', count: 0 },
      { id: '4', name: 'Reservoir Engineering', slug: 'reservoir-engineering', description: 'Reservoir management and production', icon: '🛢️', count: 0 },
      { id: '5', name: 'Petrophysics', slug: 'petrophysics', description: 'Rock and fluid properties', icon: '📊', count: 0 },
    ];

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
