import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, Trash2, Check, User } from 'lucide-react';
import { getCustomAvatar, setCustomAvatar, resetCustomAvatar, subscribeToAvatar } from '../services/avatarService';

interface AvatarDisplayProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  allowUpload?: boolean;
  className?: string;
  showBadge?: boolean;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  size = 'md',
  allowUpload = true,
  className = '',
  showBadge = true,
}) => {
  const [avatar, setAvatar] = useState<string | null>(getCustomAvatar());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = subscribeToAvatar(newAvatar => {
      setAvatar(newAvatar);
    });
    return () => unsub();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Sila pilih fail imej (PNG atau JPG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = ev => {
      const dataUrl = ev.target?.result as string;
      if (dataUrl) {
        setCustomAvatar(dataUrl);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-24 h-24 rounded-2xl',
    lg: 'w-36 h-36 rounded-2xl',
    xl: 'w-44 h-44 sm:w-52 sm:h-52 rounded-3xl',
  };

  return (
    <div className={`relative group inline-block ${className}`}>
      <div
        className={`${sizeClasses[size]} overflow-hidden bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-900 border-2 border-indigo-400/40 shadow-xl relative flex items-center justify-center`}
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Nadz Effendy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-3 text-white select-none">
            <div className="w-12 h-12 rounded-full bg-indigo-600/50 flex items-center justify-center text-white font-extrabold text-xl mb-1 border border-white/20">
              NE
            </div>
            {size === 'xl' && (
              <span className="text-[10px] text-cyan-300 font-bold tracking-wide">
                Ts. / En. Nasrul Effendy
              </span>
            )}
          </div>
        )}

        {/* Upload Overlay on Hover (if allowed) */}
        {allowUpload && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer p-2 text-center backdrop-blur-2xs"
            title="Klik untuk memilih foto asal NADZ.png"
          >
            <Camera className="w-6 h-6 text-cyan-300 mb-1" />
            <span className="text-[11px] font-bold text-white leading-tight">
              {avatar ? 'Tukar Foto' : 'Pilih NADZ.png'}
            </span>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      {allowUpload && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      )}

      {/* Quick Upload Button on bottom-right */}
      {allowUpload && size === 'xl' && (
        <div className="absolute -bottom-3 -right-2 flex items-center gap-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-full border-2 border-white shadow-md flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
            title="Pilih fail NADZ.png dari peranti anda"
          >
            <Upload className="w-3 h-3" />
            <span>{avatar ? 'Tukar' : 'Muat Naik NADZ.png'}</span>
          </button>

          {avatar && (
            <button
              type="button"
              onClick={() => {
                if (confirm('Padam foto profil tersuai dan pulihkan gambar asal?')) {
                  resetCustomAvatar();
                }
              }}
              className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-full border-2 border-white shadow-md cursor-pointer transition-colors"
              title="Padam foto tersuai"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
