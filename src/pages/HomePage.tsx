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
  MessageCircle,
  Clock,
  Layers,
  Building,
  UserCheck,
} from 'lucide-react';
import { PageId } from '../types';
import {
  PERSONAL_INFO,
  INNOVATIONS,
  PUBLICATIONS,
  TEACHING_COURSES,
  EDUCATIONS,
  SERVICE_HISTORY,
  MEMBERSHIPS,
  EXPERTISE_SERVICES,
  REFERENCES,
} from '../data/nadzEffendyData';
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
  const latestInno = INNOVATIONS;
  const latestPubs = PUBLICATIONS.slice(0, 4);

  const whatsappUrl = `https://wa.me/60194090902?text=${encodeURIComponent(
    'Assalamualaikum En. Nasrul Effendy, saya ingin berhubung berkenaan kolaborasi/jemputan ceramah/akademik.'
  )}`;

  return (
    <div className="space-y-20 pb-20 -mt-2">
      {/* Hero Section (Matching amirulhelmi.my layout) */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-black tracking-widest text-amber-500 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PEGAWAI PENDIDIKAN PENGAJIAN TINGGI (DH12)</span>
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-slate-900 tracking-tight leading-[1.05]">
                Nasrul Effendy
                <br />
                <span className="text-slate-400 font-bold text-3xl sm:text-5xl xl:text-6xl">
                  Bin Mat Nasir
                </span>
              </h1>

              <p className="text-xs sm:text-sm font-bold text-amber-700 tracking-wide uppercase">
                Pensyarah Kanan <span className="text-slate-300">•</span> Pakar Keselamatan Siber & Rangkaian <span className="text-slate-300">•</span> Penyelidik AI & TVET <span className="text-slate-300">•</span> Penceramah CIDB & NCER
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                Pensyarah Kanan dan Pegawai Pendidikan Pengajian Tinggi (Gred DH12) di Jabatan Teknologi Maklumat dan Komunikasi, Politeknik Tuanku Syed Sirajuddin dengan lebih 20 tahun pengalaman merentas keselamatan siber, komunikasi data rangkaian, kecerdasan buatan kreatif (AI), inovasi pengurusan kertas kerja digital, dan keusahawanan digital.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => onNavigate('profile')}
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-black text-white bg-slate-950 hover:bg-slate-800 shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Lihat CV Lengkap</span>
                </button>

                <button
                  onClick={() => onNavigate('publications')}
                  className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 shadow-2xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Teroka Penyelidikan</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => onNavigate('drive')}
                  className="px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span className="font-mono text-sm">▣</span>
                  <span>Google Drive</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Visual Column (Matching amirulhelmi.my portrait visual frame) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <AvatarDisplay size="hero" allowUpload={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker (Exact feature from amirulhelmi.my) */}
      <section className="bg-slate-950 text-white py-3 border-y border-slate-800 overflow-hidden shadow-inner">
        <div className="animate-ticker flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-300 whitespace-nowrap">
          <span>Cybersecurity Fundamentals</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>Network & Data Communication</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>TVET 360° & Lifelong Learning</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>Creative AI & ChatGPT Heroes</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>Google Workspace & Cloud Automation</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>CIDB Malaysia Certified Trainer</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>Persekutuan Pengakap Malaysia</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>iPMAS & Intelligent Assessment System</span>
          <i className="text-amber-400 not-italic">✦</i>
          {/* Duplicate set for seamless continuous marquee loop */}
          <span>Cybersecurity Fundamentals</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>Network & Data Communication</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>TVET 360° & Lifelong Learning</span>
          <i className="text-amber-400 not-italic">✦</i>
          <span>Creative AI & ChatGPT Heroes</span>
          <i className="text-amber-400 not-italic">✦</i>
        </div>
      </section>

      {/* Quick Hub (Bento Grid matching amirulhelmi.my) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black tracking-widest text-amber-600 uppercase">
              QUICK HUB
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Ringkasan utama, satu langkah ke hadapan.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Akses pantas ke penyelidikan, inovasi, pangkalan data, dan storan Google Drive.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Penyelidikan */}
          <div
            onClick={() => onNavigate('publications')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-lg group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
              ⌁
            </div>
            <div>
              <strong className="block text-base font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                Penyelidikan
              </strong>
              <small className="text-xs text-slate-500">
                Penerbitan jurnal JACoIT, persidangan SPSH & buku
              </small>
            </div>
            <span className="text-xs font-bold text-amber-600 flex items-center gap-1 pt-1">
              <span>Buka Penerbitan</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Card 2: Inovasi */}
          <div
            onClick={() => onNavigate('innovations')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-400 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              ✦
            </div>
            <div>
              <strong className="block text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Sistem Inovasi
              </strong>
              <small className="text-xs text-slate-500">
                iPMAS, IAS, iCERT & Dr. Froats
              </small>
            </div>
            <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 pt-1">
              <span>Lihat Projek Inovasi</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Card 3: Google Drive */}
          <div
            onClick={() => onNavigate('drive')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              ▣
            </div>
            <div>
              <strong className="block text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                Google Drive Storan
              </strong>
              <small className="text-xs text-slate-500">
                Akses & muat naik fail dokumen awan
              </small>
            </div>
            <span className="text-xs font-bold text-blue-600 flex items-center gap-1 pt-1">
              <span>Buka Google Drive</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Card 4: Pangkalan Data */}
          <div
            onClick={() => onNavigate('database')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              🗄️
            </div>
            <div>
              <strong className="block text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Pangkalan Data
              </strong>
              <small className="text-xs text-slate-500">
                Sistem rekod, CRUD nota & tempahan
              </small>
            </div>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 pt-1">
              <span>Buka Database Hub</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </section>

      {/* Section 01 / Profil (Academic & Professional Roles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-black tracking-widest text-amber-600 uppercase">
              01 / PROFIL
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Akademik, teknologi dan kepimpinan perkhidmatan awam.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Aktif sebagai penyelidik, pembangun sistem inovasi, penceramah pakar, dan ketua unit latihan TVET.
            </p>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="text-xs font-bold text-amber-600 hover:text-amber-800 transition-colors cursor-pointer flex items-center gap-1 self-start md:self-auto"
          >
            <span>Biodata Penuh</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kelayakan Akademik Box */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
              <span className="text-xl">🎓</span>
              <h3>Kelayakan Akademik</h3>
            </div>
            <div className="space-y-4 pt-2 border-t border-slate-100">
              {EDUCATIONS.map(edu => (
                <div key={edu.id} className="flex items-start gap-4 text-xs sm:text-sm">
                  <span className="font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                    {edu.year}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-slate-900">{edu.degree}</h4>
                    <p className="text-slate-600 text-xs">{edu.field}</p>
                    <p className="text-slate-400 text-xs font-semibold">{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peranan Profesional Box */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
              <span className="text-xl">🧭</span>
              <h3>Peranan Profesional & Keahlian</h3>
            </div>
            <ul className="space-y-3 pt-2 border-t border-slate-100 text-xs sm:text-sm">
              <li className="flex items-start gap-2 text-slate-700">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Pensyarah Kanan (DH12)</strong> — Jabatan Teknologi Maklumat dan Komunikasi, PTSS.</span>
              </li>
              <li className="flex items-start gap-2 text-slate-700">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Lantikan Perkhidmatan Awam</strong> — 15 Ogos 2005 | Sah Jawatan 29 Mei 2009.</span>
              </li>
              <li className="flex items-start gap-2 text-slate-700">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Persekutuan Pengakap Malaysia</strong> — No. Ahli M2026-0002 & Penerima Pingat Megat Panji Alam.</span>
              </li>
              <li className="flex items-start gap-2 text-slate-700">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Association for Information Systems (MyAIS)</strong> — No. Ahli A281.</span>
              </li>
              <li className="flex items-start gap-2 text-slate-700">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Persatuan Kreatif AI Malaysia (PKAM)</strong> — No. Ahli PRO0010.</span>
              </li>
              <li className="flex items-start gap-2 text-slate-700">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Penceramah Pakar CIDB Malaysia & NCER</strong> — Latihan Keusahawanan dan AI Generatif.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sejarah Perkhidmatan Timeline Preview */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black tracking-widest text-slate-500 uppercase">
                SEJARAH PERKHIDMATAN
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Pengalaman kerjaya dan pembangunan TVET (2005 – kini).
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {SERVICE_HISTORY.slice(0, 3).map(srv => (
              <div key={srv.id} className="p-4 rounded-xl bg-white border border-slate-200/70 text-xs space-y-1.5">
                <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm">
                  {srv.period}
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm">{srv.role}</h4>
                <p className="text-slate-600 font-medium">{srv.institution}</p>
                {srv.department && <p className="text-slate-400">{srv.department}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 02 / Kepakaran (Dark section matching amirulhelmi.my) */}
      <section className="bg-slate-950 text-white py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto space-y-10">
          <div>
            <span className="text-xs font-black tracking-widest text-amber-400 uppercase">
              02 / KEPAKARAN
            </span>
            <h2 className="text-3xl font-black text-white mt-1">
              Merentas keselamatan siber, AI, latihan kontraktor dan TVET.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Kompetensi profesional dan kepakaran terbukti berlandaskan pengalaman industri dan akademik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-amber-400 transition-all">
              <span className="text-3xl">🛡️</span>
              <h3 className="text-base font-extrabold text-white">Keselamatan Siber</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prinsip CIA Triad, analisis serangan malware, mitigasi kerentanan, etika siber, dan pertahanan rangkaian sistem maklumat.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-amber-400 transition-all">
              <span className="text-3xl">🌐</span>
              <h3 className="text-base font-extrabold text-white">Komunikasi Data & Rangkaian</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seni bina TCP/IP, Cisco Packet Tracer, penganalisisan paket data Wireshark, penghalaan (routing), dan subnetting praktikal.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-amber-400 transition-all">
              <span className="text-3xl">🤖</span>
              <h3 className="text-base font-extrabold text-white">AI Kreatif & Keusahawanan</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Penceramah jemputan ViralPreneur AI Mastery Zon Utara & latihan ChatGPT untuk produktiviti pelajar dan usahawan PKS.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-amber-400 transition-all">
              <span className="text-3xl">🏗️</span>
              <h3 className="text-base font-extrabold text-white">Penceramah Pakar CIDB</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Penceramah Pusat Khidmat Kontraktor Malaysia di bawah program CIDB Malaysia dan latihan pensijilan keusahawanan NCER.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03 / Penyelidikan & Penerbitan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-black tracking-widest text-amber-600 uppercase">
              03 / PENYELIDIKAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Penerbitan berwasit, persidangan antarabangsa dan buku panduan.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Kajian empirikal dalam bidang kecerdasan buatan, TVET 360°, dan literasi teknologi maklumat.
            </p>
          </div>
          <button
            onClick={() => onNavigate('publications')}
            className="text-xs font-bold text-amber-600 hover:text-amber-800 transition-colors cursor-pointer flex items-center gap-1 self-start md:self-auto"
          >
            <span>Semua Penerbitan (12)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestPubs.map(pub => (
            <div
              key={pub.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-amber-400 transition-all space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                    {pub.year}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {pub.type}
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                  {pub.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {pub.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 italic text-[11px] truncate max-w-[200px]">
                  {pub.venue || 'Prosiding Rasmi'}
                </span>
                <button
                  onClick={() => onNavigate('publications')}
                  className="font-bold text-amber-600 hover:underline cursor-pointer"
                >
                  Butiran ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 04 / Sistem Inovasi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-black tracking-widest text-amber-600 uppercase">
              04 / SISTEM INOVASI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Penyelesaian digital pintar untuk ekosistem TVET.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Sistem berimpak tinggi yang memperkasa operasi akademik dan pentadbiran politeknik.
            </p>
          </div>
          <button
            onClick={() => onNavigate('innovations')}
            className="text-xs font-bold text-amber-600 hover:text-amber-800 transition-colors cursor-pointer flex items-center gap-1 self-start md:self-auto"
          >
            <span>Semua Inovasi (4)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INNOVATIONS.map(inv => (
            <div
              key={inv.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-slate-950 text-amber-400">
                    {inv.acronym}
                  </span>
                  <span className="text-xs font-bold text-slate-400">{inv.year}</span>
                </div>
                <h4 className="text-base font-extrabold text-slate-900">{inv.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {inv.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className={inv.status === 'Completed' ? 'text-emerald-600' : 'text-amber-600'}>
                  • {inv.status === 'Completed' ? 'Selesai' : 'Aktif Dibangunkan'}
                </span>
                <button
                  onClick={() => onNavigate('innovations')}
                  className="text-amber-700 hover:underline cursor-pointer"
                >
                  Teroka ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 05 / Arkib Rujukan Rasmi (Matching amirulhelmi.my) */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <span className="text-xs font-black tracking-widest text-amber-600 uppercase">
              ARKIB RUJUKAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Profil rujukan profesional.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Rujukan akademik dan pengurusan tertinggi untuk pengesahan rekod dan kolaborasi rasmi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REFERENCES.map((ref, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-extrabold text-slate-900">{ref.name}</h4>
                  <p className="text-xs font-bold text-amber-700">{ref.title}</p>
                  <p className="text-xs text-slate-600">{ref.department}</p>
                  <p className="text-xs text-slate-500">{ref.institution}, {ref.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
