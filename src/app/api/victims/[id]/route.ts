import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const victim = await prisma.victim.findUnique({
      where: { id: params.id }
    });

    if (!victim) {
      return NextResponse.json(
        { error: 'Vítima não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(victim);
  } catch (error) {
    console.error('Erro ao buscar vítima:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const victim = await prisma.victim.update({
      where: { id: params.id },
      data: body
    });

    return NextResponse.json(victim);
  } catch (error) {
    console.error('Erro ao atualizar vítima:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.victim.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Vítima removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover vítima:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}