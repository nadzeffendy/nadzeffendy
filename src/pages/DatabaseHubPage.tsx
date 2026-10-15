import React, { useState, useEffect } from 'react';
import {
  Database,
  Plus,
  Trash2,
  Edit2,
  Search,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  Clock,
  Archive,
  Layers,
  Sparkles,
  ExternalLink,
  Filter,
  FileCode,
} from 'lucide-react';
import { DatabaseRecord } from '../types';
import {
  getDatabaseRecords,
  addDatabaseRecord,
  updateDatabaseRecord,
  deleteDatabaseRecord,
  subscribeToDatabase,
  exportDatabaseAsJSON,
  importDatabaseFromJSON,
  resetDatabaseToDefault,
} from '../services/databaseService';
import { ConfirmModal } from '../components/ConfirmModal';

export const DatabaseHubPage: React.FC = () => {
  const [records, setRecords] = useState<DatabaseRecord[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DatabaseRecord | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Form State
  const [formCategory, setFormCategory] = useState<DatabaseRecord['category']>('bahan_kuliah');
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formAuthor, setFormAuthor] = useState('En. Nasrul Effendy');
  const [formEmail, setFormEmail] = useState('nasrul.effendy@ptss.edu.my');
  const [formStatus, setFormStatus] = useState<DatabaseRecord['status']>('Baru');
  const [formTags, setFormTags] = useState('');
  const [formLink, setFormLink] = useState('');

  useEffect(() => {
    setRecords(getDatabaseRecords());
    const unsubscribe = subscribeToDatabase(updated => {
      setRecords(updated);
    });
    return () => unsubscribe();
  }, []);

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const categories = [
    { id: 'all', label: 'Semua Rekod', count: records.length },
    { id: 'bahan_kuliah', label: 'Bahan Kuliah & Nota', count: records.filter(r => r.category === 'bahan_kuliah').length },
    { id: 'inovasi', label: 'Inovasi & Projek', count: records.filter(r => r.category === 'inovasi').length },
    { id: 'tempahan_penceramah', label: 'Tempahan Ceramah', count: records.filter(r => r.category === 'tempahan_penceramah').length },
    { id: 'pelajar', label: 'Pelajar & Bimbingan', count: records.filter(r => r.category === 'pelajar').length },
  ];

  const filteredRecords = records.filter(rec => {
    const matchCat = activeCategory === 'all' || rec.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch =
      rec.title.toLowerCase().includes(q) ||
      rec.description.toLowerCase().includes(q) ||
      rec.authorOrSubmitter.toLowerCase().includes(q) ||
      (rec.tags && rec.tags.some(t => t.toLowerCase().includes(q)));
    return matchCat && matchSearch;
  });

  const handleOpenAddModal = () => {
    setEditingRecord(null);
    setFormCategory('bahan_kuliah');
    setFormTitle('');
    setFormDescription('');
    setFormAuthor('En. Nasrul Effendy');
    setFormEmail('nasrul.effendy@ptss.edu.my');
    setFormStatus('Baru');
    setFormTags('');
    setFormLink('');
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (rec: DatabaseRecord) => {
    setEditingRecord(rec);
    setFormCategory(rec.category);
    setFormTitle(rec.title);
    setFormDescription(rec.description);
    setFormAuthor(rec.authorOrSubmitter);
    setFormEmail(rec.email || '');
    setFormStatus(rec.status);
    setFormTags((rec.tags || []).join(', '));
    setFormLink(rec.link || '');
    setIsAddModalOpen(true);
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const tagsArray = formTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (editingRecord) {
      updateDatabaseRecord(editingRecord.id, {
        category: formCategory,
        title: formTitle.trim(),
        description: formDescription.trim(),
        authorOrSubmitter: formAuthor.trim(),
        email: formEmail.trim(),
        status: formStatus,
        tags: tagsArray,
        link: formLink.trim(),
      });
      showNotification('Rekod berjaya dikemaskini dalam pangkalan data.');
    } else {
      addDatabaseRecord({
        category: formCategory,
        title: formTitle.trim(),
        description: formDescription.trim(),
        authorOrSubmitter: formAuthor.trim(),
        email: formEmail.trim(),
        status: formStatus,
        tags: tagsArray,
        link: formLink.trim(),
      });
      showNotification('Rekod baru berjaya disimpan dalam pangkalan data!');
    }

    setIsAddModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      deleteDatabaseRecord(deleteTargetId);
      showNotification('Rekod telah dipadam dari pangkalan data.');
      setDeleteTargetId(null);
    }
  };

  const handleExportJSON = () => {
    const jsonStr = exportDatabaseAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nadzeffendy_portal_database_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Fail sandaran JSON pangkalan data berjaya dimuat turun.');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      const content = ev.target?.result as string;
      const success = importDatabaseFromJSON(content);
      if (success) {
        showNotification('Data berjaya diimport ke dalam pangkalan data!');
      } else {
        alert('Format fail JSON tidak sah. Sila pastikan fail mengandungi struktur rekod yang betul.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>Penyimpanan Dinamik & Pengurusan Rekod</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1">Pangkalan Data Portal</h1>
          <p className="text-sm text-slate-500">
            Sistem pengurusan data dinamik untuk bahan kuliah, log projek inovasi, rekod bimbingan pelajar, dan tempahan ceramah.
          </p>
        </div>

        {/* Global Action Bar */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
            title="Eksport data ke format JSON"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Eksport JSON</span>
          </button>

          <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-slate-600" />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Rekod Baru</span>
          </button>
        </div>
      </div>

      {/* Status Alert Notification */}
      {statusMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{statusMessage}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-emerald-700 hover:underline">
            Tutup
          </button>
        </div>
      )}

      {/* Database Status Monitor Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">Pangkalan Data Aktif & Tersimpan</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs text-slate-400">
              Menampung {records.length} entri rekod dengan sokongan sandaran JSON dan sinkronisasi segera.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (confirm('Set semula data pangkalan data kepada data rujukan asal? Semua data tersuai akan dipulihkan.')) {
              resetDatabaseToDefault();
              showNotification('Pangkalan data telah diset semula kepada data lalai.');
            }
          }}
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Set Semula Data</span>
        </button>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat.id ? 'bg-indigo-800 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari rekod dalam pangkalan data mengikut tajuk, kata kunci atau nama penghantar..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Records Table / Cards */}
      <div className="space-y-3">
        {filteredRecords.map(rec => {
          const categoryLabels: Record<string, { label: string; color: string }> = {
            bahan_kuliah: { label: 'Bahan Kuliah', color: 'bg-blue-50 text-blue-700 border-blue-200' },
            inovasi: { label: 'Inovasi / Projek', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
            tempahan_penceramah: { label: 'Tempahan Ceramah', color: 'bg-amber-50 text-amber-800 border-amber-200' },
            pelajar: { label: 'Pelajar / Bimbingan', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
          };

          const statusColors: Record<string, string> = {
            Baru: 'bg-sky-100 text-sky-800',
            'Dalam Proses': 'bg-amber-100 text-amber-800',
            Selesai: 'bg-emerald-100 text-emerald-800',
            Arkib: 'bg-slate-100 text-slate-700',
          };

          const catBadge = categoryLabels[rec.category] || { label: rec.category, color: 'bg-slate-100 text-slate-700' };

          return (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${catBadge.color}`}>
                    {catBadge.label}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${statusColors[rec.status] || 'bg-slate-100'}`}>
                    • {rec.status}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {rec.dateAdded}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {rec.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {rec.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span>Didaftarkan oleh: <strong className="text-slate-700">{rec.authorOrSubmitter}</strong></span>
                  {rec.email && (
                    <span className="text-indigo-600 underline">{rec.email}</span>
                  )}
                </div>

                {rec.tags && rec.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rec.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-200/60">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 self-end md:self-start flex-shrink-0">
                <button
                  onClick={() => handleOpenEditModal(rec)}
                  className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer border border-slate-200"
                  title="Kemaskini Rekod"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTargetId(rec.id)}
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border border-slate-200"
                  title="Padam Rekod"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredRecords.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-500">
            <p className="text-base font-bold text-slate-700">Tiada rekod dijumpai dalam kategori ini</p>
            <p className="text-xs text-slate-400 mt-1">Gunakan butang "Tambah Rekod Baru" untuk mendaftar data.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Record Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              {editingRecord ? 'Kemaskini Rekod Pangkalan Data' : 'Tambah Rekod Baru ke Database'}
            </h3>

            <form onSubmit={handleSaveRecord} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                  >
                    <option value="bahan_kuliah">Bahan Kuliah & Nota</option>
                    <option value="inovasi">Inovasi & Projek</option>
                    <option value="tempahan_penceramah">Tempahan Ceramah</option>
                    <option value="pelajar">Pelajar & Bimbingan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                  >
                    <option value="Baru">Baru</option>
                    <option value="Dalam Proses">Dalam Proses</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Arkib">Arkib</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tajuk Rekod / Item *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="Contoh: Modul Amali Wireshark Semester 4"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Penerangan Ringkas</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="Huraian lanjut tentang nota, inovasi, atau butiran tempahan..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Penghantar / Pemilik</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={e => setFormAuthor(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Emel Hubungan</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kata Kunci / Tag (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={e => setFormTags(e.target.value)}
                  placeholder="Cybersecurity, JTMK, 2026"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs cursor-pointer"
                >
                  {editingRecord ? 'Simpan Kemaskini' : 'Tambah ke Database'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Record Deletion */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Padam Rekod Pangkalan Data?"
        message="Adakah anda pasti ingin memadam rekod ini secara kekal daripada pangkalan data portal? Tindakan ini tidak boleh diundur."
        confirmLabel="Ya, Padam Rekod"
        cancelLabel="Batal"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
