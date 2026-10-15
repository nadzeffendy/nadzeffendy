import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Search,
  HardDrive,
  Database,
  Layers,
  CheckCircle,
  ExternalLink,
  Download,
} from 'lucide-react';
import { TEACHING_COURSES } from '../data/nadzEffendyData';
import { PageId } from '../types';

interface TeachingPageProps {
  onNavigate: (page: PageId) => void;
}

export const TeachingPage: React.FC<TeachingPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');

  const filtered = TEACHING_COURSES.filter(c => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Title & Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Portfolio Akademik & Kurikulum</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1">Pengajaran & Kursus Pengajian</h1>
          <p className="text-sm text-slate-500">
            Kursus-kursus yang dipertanggungjawabkan di bawah Jabatan Teknologi Maklumat dan Komunikasi (JTMK) & Asasi TVET PTSS.
          </p>
        </div>

        {/* Action button to Drive or Database */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => onNavigate('drive')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs cursor-pointer transition-all"
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Folder Bahan Kuliah di Drive</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari kursus (cth: Network, Cybersecurity, Multimedia)..."
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 shadow-2xs"
        />
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(course => (
          <div
            key={course.id}
            className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  {course.code}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {course.materialsCount} Bahan Muat Turun
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {course.name}
              </h3>

              <p className="text-xs text-slate-500 font-semibold">{course.level}</p>

              <p className="text-xs text-slate-600 leading-relaxed">{course.description}</p>
            </div>

            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap gap-1.5">
                {course.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigate('drive')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition-all border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <HardDrive className="w-3.5 h-3.5 text-amber-500" />
                  <span>Buka di Drive</span>
                </button>
                <button
                  onClick={() => onNavigate('database')}
                  className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-bold transition-all border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Lihat Nota & Tugasan di Pangkalan Data"
                >
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Teaching Philosophy Callout */}
      <div className="p-6 rounded-2xl bg-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-base font-bold flex items-center justify-center md:justify-start gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Pendekatan Pengajaran Berteraskan TVET & Pembelajaran Sepanjang Hayat</span>
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Menekankan amali hands-on (praktikal makmal), simulasi senario sebenar industri, pematuhan keselamatan siber, serta pengintegrasian alat bantu pintar Generative AI untuk melahirkan graduan TVET berkemahiran tinggi.
          </p>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-4 py-2 text-xs font-bold bg-white text-indigo-950 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer flex-shrink-0"
        >
          Hubungi Penyelia Akademik
        </button>
      </div>
    </div>
  );
};
