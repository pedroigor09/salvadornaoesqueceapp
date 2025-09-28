"use client";

import { useState, useRef } from "react";
import { X, Upload, Calendar, MapPin, Heart, User, FileText, Image as ImageIcon } from "lucide-react";

interface AddVictimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (victim: VictimData) => Promise<void>;
}

interface VictimData {
  id: string;
  name: string;
  age: number;
  date: string;
  location: string;
  description: string;
  image?: string;
  author: string;
}

export function AddVictimModal({ isOpen, onClose, onAdd }: AddVictimModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    date: '',
    location: '',
    description: '',
    author: '',
    image: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.date || !formData.location || !formData.description || !formData.author) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const newVictim: VictimData = {
      id: Date.now().toString(),
      name: formData.name,
      age: parseInt(formData.age),
      date: formData.date,
      location: formData.location,
      description: formData.description,
      author: formData.author,
      image: imagePreview || undefined
    };

    await onAdd(newVictim);
    
    // Reset form
    setFormData({
      name: '',
      age: '',
      date: '',
      location: '',
      description: '',
      author: '',
      image: null
    });
    setImagePreview(null);
    onClose();
  };

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <Heart className="h-6 w-6 text-red-400" fill="currentColor" />
            <h2 className="text-white text-xl font-bold">Adicionar Memorial</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lado esquerdo - Preview */}
            <div className="space-y-6">
              <h3 className="text-white text-lg font-semibold flex items-center space-x-2">
                <ImageIcon className="h-5 w-5 text-purple-400" />
                <span>Preview do Memorial</span>
              </h3>
              
              {/* Preview do card */}
              <div className="relative">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 transform rotate-1 shadow-xl">
                  {/* Imagem de fundo com degradê */}
                  {imagePreview && (
                    <div 
                      className="absolute inset-0 rounded-xl opacity-30"
                      style={{
                        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%), url(${imagePreview})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  )}
                  
                  <div className="relative z-10">
                    {/* Header do card */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-white text-xl font-bold">
                          {formData.name || 'Nome da Vítima'}
                        </h3>
                        <div className="flex items-center space-x-4 text-gray-300 text-sm mt-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formData.date || 'Data'}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{formData.location || 'Local'}</span>
                          </div>
                        </div>
                      </div>
                      {formData.age && (
                        <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {formData.age} anos
                        </div>
                      )}
                    </div>

                    {/* Descrição */}
                    <div className="mb-4">
                      <p className="text-gray-200 text-sm italic leading-relaxed">
                        "{formData.description || 'Descrição da pessoa, suas qualidades, sonhos e como será lembrada...'}"
                      </p>
                    </div>

                    {/* Autor */}
                    <div className="flex items-center justify-between">
                      <div className="text-gray-400 text-xs">
                        — {formData.author || 'Autor da homenagem'}
                      </div>
                      <Heart className="h-5 w-5 text-red-400 hover:text-red-300 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload de imagem */}
              <div className="space-y-3">
                <label className="text-white text-sm font-medium">Foto (Opcional)</label>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    isDragging 
                      ? 'border-purple-400 bg-purple-400/10' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  {imagePreview ? (
                    <div className="space-y-3">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-24 h-24 object-cover rounded-lg mx-auto"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, image: null }));
                        }}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remover imagem
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-gray-300 text-sm">
                          Arraste uma imagem aqui ou
                        </p>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                        >
                          clique para selecionar
                        </button>
                      </div>
                      <p className="text-gray-500 text-xs">
                        JPG, PNG ou GIF até 5MB
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  className="hidden"
                />
              </div>
            </div>

            {/* Lado direito - Formulário */}
            <div className="space-y-6">
              <h3 className="text-white text-lg font-semibold flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-400" />
                <span>Informações do Memorial</span>
              </h3>

              {/* Nome */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Nome Completo *</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Nome da pessoa"
                  required
                />
              </div>

              {/* Idade */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Idade *</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Idade"
                  required
                />
              </div>

              {/* Data */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Data *</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Local */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Local *</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Bairro ou local em Salvador"
                  required
                />
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Homenagem *</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                  placeholder="Conte sobre esta pessoa: suas qualidades, sonhos, como será lembrada..."
                  rows={4}
                  required
                />
              </div>

              {/* Autor */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Autor da Homenagem *</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Seu nome ou 'Família Silva', 'Amigos', etc."
                  required
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2"
            >
              <Heart className="h-4 w-4" fill="currentColor" />
              <span>Adicionar Memorial</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}