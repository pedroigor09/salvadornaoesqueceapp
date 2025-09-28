import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const victims = await prisma.victim.findMany({
      where: {
        isApproved: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(victims);
  } catch (error) {
    console.error('Erro ao buscar vítimas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      age,
      date,
      location,
      description,
      author,
      image
    } = body;

    // Validação básica
    if (!name || !age || !date || !location || !description || !author) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      );
    }

    const victim = await prisma.victim.create({
      data: {
        name,
        age: parseInt(age),
        neighborhood: location,
        date: new Date(date),
        tribute: description,
        submittedBy: author,
        image,
        isApproved: true // Auto-aprovar por enquanto - em produção seria false
      }
    });

    return NextResponse.json(victim, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar vítima:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}