import React, { useState } from 'react';
import {
  Lightbulb,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Database,
  HardDrive,
  FileText,
} from 'lucide-react';
import { INNOVATIONS } from '../data/nadzEffendyData';
import { PageId } from '../types';

interface InnovationsPageProps {
  onNavigate: (page: PageId) => void;
}

export const InnovationsPage: React.FC<InnovationsPageProps> = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState(INNOVATIONS[0]);

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>Kreativiti & Penyelidikan Gunaan</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1">Sistem & Inovasi Digital</h1>
          <p className="text-sm text-slate-500">
            Koleksi sistem pintar dan inovasi digital berimpak tinggi yang dibangunkan untuk memperkasa pengurusan politeknik.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => onNavigate('database')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs cursor-pointer transition-all"
          >
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>Rekod Inovasi di Database</span>
          </button>
        </div>
      </div>

      {/* Hero Spotlight Project (iPMAS or selected) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-cyan-400 text-slate-950">
                {selectedProject.acronym}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/90">
                Tahun {selectedProject.year}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  selectedProject.status === 'Completed'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {selectedProject.status === 'Completed' ? 'Selesai & Beroperasi' : 'Sedang Dibangunkan (Aktif)'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {selectedProject.title}
            </h2>

            <p className="text-xs sm:text-sm text-cyan-300 font-semibold">{selectedProject.category}</p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {selectedProject.description}
            </p>

            {/* Key features of the selected innovation */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Ciri-ciri Utama Inovasi:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProject.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-start gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('drive')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <HardDrive className="w-4 h-4 text-amber-600" />
                <span>Dokumentasi di Google Drive</span>
              </button>
              <button
                onClick={() => onNavigate('database')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Database className="w-4 h-4 text-emerald-300" />
                <span>Urus Log Inovasi</span>
              </button>
            </div>
          </div>

          {/* Side Box Tech Architecture */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-4 text-center lg:text-left">
            <div className="w-12 h-12 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center font-bold text-xl mx-auto lg:mx-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">Arkitektur & Kesan Sistem</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Direka khas untuk meminimumkan birokrasi fizikal dan mengautomasikan semakan standard kualiti institusi dengan pantas dan selamat.
            </p>
            <div className="pt-2 border-t border-white/10 text-xs text-cyan-200 flex items-center justify-center lg:justify-start gap-2">
              <Award className="w-4 h-4" />
              <span>Inovasi Rasmi Politeknik Malaysia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of All Innovation Projects */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Senarai Penuh Projek Inovasi ({INNOVATIONS.length})</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INNOVATIONS.map(inv => {
            const isSelected = selectedProject.id === inv.id;
            return (
              <div
                key={inv.id}
                onClick={() => setSelectedProject(inv)}
                className={`p-6 rounded-2xl transition-all cursor-pointer border flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-indigo-50/70 border-indigo-400 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800">
                      {inv.acronym}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{inv.year}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{inv.title}</h4>
                  <p className="text-xs text-indigo-600 font-semibold">{inv.category}</p>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {inv.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span
                    className={
                      inv.status === 'Completed' ? 'text-emerald-600' : 'text-amber-600'
                    }
                  >
                    • {inv.status === 'Completed' ? 'Selesai' : 'Sedang Dibangunkan'}
                  </span>
                  <span className="text-indigo-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    {isSelected ? 'Sedang Dipapar' : 'Papar Butiran'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
