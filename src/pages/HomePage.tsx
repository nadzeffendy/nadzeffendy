import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Lightbulb,
  GraduationCap,
  HardDrive,
  Database,
  Award,
  Sparkles,
  Shield,
  FileText,
  Mail,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { PageId } from '../types';
import { PERSONAL_INFO, INNOVATIONS, PUBLICATIONS, TEACHING_COURSES } from '../data/nadzEffendyData';
import { AvatarDisplay } from '../components/AvatarDisplay';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenSearch: () => void;
  googleConnected: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenSearch,
  googleConnected,
}) => {
  const latestInno = INNOVATIONS.slice(0, 3);
  const latestPubs = PUBLICATIONS.slice(0, 3);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900/10 via-slate-50 to-white pt-10 sm:pt-16 pb-12 rounded-3xl border border-slate-200/70 shadow-xs">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            {/* Profile Avatar / Badge */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <AvatarDisplay size="xl" allowUpload={true} />

              {/* Status pill under image */}
              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>JTMK PTSS Pauh Putra</span>
              </div>
            </div>

            {/* Intro Copy */}
            <div className="text-center md:text-left flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-bold text-indigo-700">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Portal Akademik, Inovasi & Pengurusan Storan</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Nasrul Effendy <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600">
                  bin Mat Nasir
                </span>
              </h1>

              <p className="text-base sm:text-lg font-medium text-slate-700">
                {PERSONAL_INFO.title}
              </p>

              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                {PERSONAL_INFO.bio}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => onNavigate('drive')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all cursor-pointer group"
                >
                  <HardDrive className="w-4 h-4" />
                  <span>Integrasi Google Drive</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('database')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all cursor-pointer"
                >
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>Pusat Database Dinamik</span>
                </button>

                <button
                  onClick={() => onNavigate('profile')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span>Lihat Biodata Penuh</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Stats Bar */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs text-center md:text-left">
              <span className="text-2xl sm:text-3xl font-black text-indigo-600 block">20+</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Tahun Perkhidmatan TVET
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs text-center md:text-left">
              <span className="text-2xl sm:text-3xl font-black text-blue-600 block">12+</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Penerbitan & Prosiding
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs text-center md:text-left">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 block">4</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Sistem Inovasi (iPMAS, IAS)
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs text-center md:text-left">
              <span className="text-2xl sm:text-3xl font-black text-amber-600 block">6</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Anugerah & Pingat Kebangsaan
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Connectivity Hub Card */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ciri Khas Sambungan Dinamik</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Ketersambungan Pangkalan Data & Google Drive
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Portal ini disambungkan terus kepada pangkalan data rekod akademik serta storan Google Drive (menggunakan Google Drive REST API). Anda boleh mengakses, mengurus fail, menyimpan rekod, dan berinteraksi merentasi pelbagai halaman secara langsung.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onNavigate('database')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Database className="w-4 h-4" />
              <span>Buka Pangkalan Data</span>
            </button>
            <button
              onClick={() => onNavigate('drive')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <HardDrive className="w-4 h-4 text-amber-400" />
              <span>{googleConnected ? 'Drive Tersambung' : 'Buka Google Drive'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Inovasi Terkini Showcase */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" />
              <span>Penyelesaian & Sistem</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Inovasi Digital & Projek Terkini</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Inovasi praktikal yang dibangunkan untuk memacu kecekapan pentadbiran dan akademik di PTSS.
            </p>
          </div>
          <button
            onClick={() => onNavigate('innovations')}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Lihat Semua Inovasi (4)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestInno.map(item => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {item.acronym}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{item.year}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">{item.category}</span>
                <button
                  onClick={() => onNavigate('innovations')}
                  className="text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform cursor-pointer flex items-center gap-1"
                >
                  <span>Teroka</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Penerbitan & Penyelidikan */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Kesarjanaan & Penyelidikan</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Penerbitan & Kertas Kerja Terkini</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Sorotan artikel berwasit, kertas persidangan antarabangsa (JACoIT, SPSH, ICOCI), serta buku panduan AI.
            </p>
          </div>
          <button
            onClick={() => onNavigate('publications')}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Semua Penerbitan (12)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {latestPubs.map(pub => (
            <div
              key={pub.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {pub.year}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {pub.type}
                  </span>
                  {pub.venue && (
                    <span className="text-xs text-slate-500 italic hidden sm:inline">
                      • {pub.venue}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {pub.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {pub.summary}
                </p>
              </div>

              <div className="flex-shrink-0 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('publications')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition-all cursor-pointer"
                >
                  Butiran
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Khidmat Kepakaran Banner */}
      <section className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 rounded-3xl p-6 sm:p-8 border border-indigo-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Khidmat Kepakaran & Penceramah Pakar</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Jemputan Bengkel AI Mastery, Google Workspace & Latihan CIDB
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tersedia untuk sesi ceramah pakar keusahawanan digital, pensijilan profesional, dan latihan pembangunan kapasiti TVET di seluruh negara.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Tempah Ceramah / Konsultasi</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
