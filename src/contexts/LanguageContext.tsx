import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Login Page
    'login.title': 'Bank Sales Lead Scoring',
    'login.subtitle': 'Login to access predictive lead scoring system',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.emailPlaceholder': 'Enter your email',
    'login.passwordPlaceholder': 'Enter your password',
    'login.button': 'Login',
    'login.demo': 'Demo: admin@bank.com / admin123',
    
    // Dashboard
    'dashboard.title': 'Sales Lead Dashboard',
    'dashboard.welcome': 'Welcome',
    'dashboard.logout': 'Logout',
    'dashboard.adminPanel': 'Admin Panel',
    'dashboard.totalLeads': 'Total Leads',
    'dashboard.highPotential': 'High Potential',
    'dashboard.contacted': 'Contacted',
    'dashboard.conversionRate': 'Conversion Rate',
    'dashboard.filterTitle': 'Filter Leads',
    'dashboard.search': 'Search by name...',
    'dashboard.minScore': 'Min Score',
    'dashboard.status': 'Status',
    'dashboard.statusAll': 'All Status',
    'dashboard.statusPending': 'Pending',
    'dashboard.statusContacted': 'Contacted',
    'dashboard.statusConverted': 'Converted',
    'dashboard.statusRejected': 'Rejected',
    'dashboard.sortBy': 'Sort By',
    'dashboard.sortScoreDesc': 'Score: High to Low',
    'dashboard.sortScoreAsc': 'Score: Low to High',
    'dashboard.sortNameAsc': 'Name: A-Z',
    'dashboard.sortNameDesc': 'Name: Z-A',
    'dashboard.applyFilters': 'Apply Filters',
    'dashboard.resetFilters': 'Reset Filters',
    'dashboard.name': 'Name',
    'dashboard.job': 'Job',
    'dashboard.score': 'Score',
    'dashboard.contact': 'Contact',
    'dashboard.statusLabel': 'Status',
    'dashboard.actions': 'Actions',
    'dashboard.viewDetails': 'View Details',
    
    // Detail Page
    'detail.backToDashboard': 'Back to Dashboard',
    'detail.leadDetails': 'Lead Details',
    'detail.personalInfo': 'Personal Information',
    'detail.age': 'Age',
    'detail.yearsOld': 'years old',
    'detail.marital': 'Marital Status',
    'detail.education': 'Education',
    'detail.financialInfo': 'Financial Information',
    'detail.balance': 'Balance',
    'detail.housing': 'Housing Loan',
    'detail.loan': 'Personal Loan',
    'detail.contactInfo': 'Contact Information',
    'detail.phone': 'Phone',
    'detail.email': 'Email',
    'detail.lastContact': 'Last Contact',
    'detail.campaignHistory': 'Campaign History',
    'detail.totalCampaigns': 'Total Campaigns',
    'detail.previousOutcome': 'Previous Outcome',
    'detail.mlPrediction': 'ML Prediction',
    'detail.conversionScore': 'Conversion Score',
    'detail.recommendation': 'Recommendation',
    'detail.highPriority': 'High Priority - Contact Immediately',
    'detail.mediumPriority': 'Medium Priority - Schedule Follow-up',
    'detail.lowPriority': 'Low Priority - Consider Alternative Approach',
    'detail.updateStatus': 'Update Lead Status',
    'detail.currentStatus': 'Current Status',
    'detail.addNotes': 'Add Notes',
    'detail.notesPlaceholder': 'Enter notes about this lead...',
    'detail.saveChanges': 'Save Changes',
    'detail.statusUpdated': 'Lead status updated successfully',
    
    // Admin Management
    'admin.title': 'Admin Lead Management',
    'admin.addNewLead': 'Add New Lead',
    'admin.search': 'Search leads...',
    'admin.filterStatus': 'Filter by Status',
    'admin.allStatuses': 'All Statuses',
    'admin.name': 'Name',
    'admin.job': 'Job',
    'admin.age': 'Age',
    'admin.score': 'ML Score',
    'admin.status': 'Status',
    'admin.actions': 'Actions',
    'admin.edit': 'Edit',
    'admin.delete': 'Delete',
    'admin.showing': 'Showing',
    'admin.to': 'to',
    'admin.of': 'of',
    'admin.entries': 'entries',
    'admin.previous': 'Previous',
    'admin.next': 'Next',
    'admin.addLeadTitle': 'Add New Lead',
    'admin.editLeadTitle': 'Edit Lead',
    'admin.personalInfo': 'Personal Information',
    'admin.fullName': 'Full Name',
    'admin.email': 'Email',
    'admin.phone': 'Phone Number',
    'admin.ageLabel': 'Age',
    'admin.jobTitle': 'Job Title',
    'admin.maritalStatus': 'Marital Status',
    'admin.maritalSingle': 'Single',
    'admin.maritalMarried': 'Married',
    'admin.maritalDivorced': 'Divorced',
    'admin.educationLevel': 'Education Level',
    'admin.educationPrimary': 'Primary',
    'admin.educationSecondary': 'Secondary',
    'admin.educationTertiary': 'Tertiary',
    'admin.financialInfo': 'Financial Information',
    'admin.accountBalance': 'Account Balance',
    'admin.housingLoan': 'Housing Loan',
    'admin.housingYes': 'Yes',
    'admin.housingNo': 'No',
    'admin.personalLoan': 'Personal Loan',
    'admin.personalLoanYes': 'Yes',
    'admin.personalLoanNo': 'No',
    'admin.campaignInfo': 'Campaign Information',
    'admin.lastContactDate': 'Last Contact Date',
    'admin.totalCampaigns': 'Total Campaigns',
    'admin.previousOutcome': 'Previous Outcome',
    'admin.outcomeSuccess': 'Success',
    'admin.outcomeFailure': 'Failure',
    'admin.outcomeOther': 'Other',
    'admin.mlScore': 'ML Prediction Score (0-100)',
    'admin.leadStatus': 'Lead Status',
    'admin.cancel': 'Cancel',
    'admin.save': 'Save Lead',
    'admin.deleteConfirmTitle': 'Delete Lead',
    'admin.deleteConfirmDesc': 'Are you sure you want to delete this lead? This action cannot be undone.',
    'admin.deleteCancel': 'Cancel',
    'admin.deleteConfirm': 'Delete',
    'admin.leadAdded': 'Lead added successfully',
    'admin.leadUpdated': 'Lead updated successfully',
    'admin.leadDeleted': 'Lead deleted successfully',
    
    // Common
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.pending': 'Pending',
    'common.contacted': 'Contacted',
    'common.converted': 'Converted',
    'common.rejected': 'Rejected',
  },
  id: {
    // Login Page
    'login.title': 'Bank Sales Lead Scoring',
    'login.subtitle': 'Masuk untuk mengakses sistem prediksi lead penjualan',
    'login.email': 'Email',
    'login.password': 'Kata Sandi',
    'login.emailPlaceholder': 'Masukkan email Anda',
    'login.passwordPlaceholder': 'Masukkan kata sandi Anda',
    'login.button': 'Masuk',
    'login.demo': 'Demo: admin@bank.com / admin123',
    
    // Dashboard
    'dashboard.title': 'Dashboard Lead Penjualan',
    'dashboard.welcome': 'Selamat Datang',
    'dashboard.logout': 'Keluar',
    'dashboard.adminPanel': 'Panel Admin',
    'dashboard.totalLeads': 'Total Lead',
    'dashboard.highPotential': 'Potensi Tinggi',
    'dashboard.contacted': 'Telah Dihubungi',
    'dashboard.conversionRate': 'Tingkat Konversi',
    'dashboard.filterTitle': 'Filter Lead',
    'dashboard.search': 'Cari berdasarkan nama...',
    'dashboard.minScore': 'Skor Minimum',
    'dashboard.status': 'Status',
    'dashboard.statusAll': 'Semua Status',
    'dashboard.statusPending': 'Menunggu',
    'dashboard.statusContacted': 'Telah Dihubungi',
    'dashboard.statusConverted': 'Terkonversi',
    'dashboard.statusRejected': 'Ditolak',
    'dashboard.sortBy': 'Urutkan Berdasarkan',
    'dashboard.sortScoreDesc': 'Skor: Tinggi ke Rendah',
    'dashboard.sortScoreAsc': 'Skor: Rendah ke Tinggi',
    'dashboard.sortNameAsc': 'Nama: A-Z',
    'dashboard.sortNameDesc': 'Nama: Z-A',
    'dashboard.applyFilters': 'Terapkan Filter',
    'dashboard.resetFilters': 'Reset Filter',
    'dashboard.name': 'Nama',
    'dashboard.job': 'Pekerjaan',
    'dashboard.score': 'Skor',
    'dashboard.contact': 'Kontak',
    'dashboard.statusLabel': 'Status',
    'dashboard.actions': 'Aksi',
    'dashboard.viewDetails': 'Lihat Detail',
    
    // Detail Page
    'detail.backToDashboard': 'Kembali ke Dashboard',
    'detail.leadDetails': 'Detail Lead',
    'detail.personalInfo': 'Informasi Pribadi',
    'detail.age': 'Usia',
    'detail.yearsOld': 'tahun',
    'detail.marital': 'Status Pernikahan',
    'detail.education': 'Pendidikan',
    'detail.financialInfo': 'Informasi Keuangan',
    'detail.balance': 'Saldo',
    'detail.housing': 'Pinjaman Rumah',
    'detail.loan': 'Pinjaman Pribadi',
    'detail.contactInfo': 'Informasi Kontak',
    'detail.phone': 'Telepon',
    'detail.email': 'Email',
    'detail.lastContact': 'Kontak Terakhir',
    'detail.campaignHistory': 'Riwayat Kampanye',
    'detail.totalCampaigns': 'Total Kampanye',
    'detail.previousOutcome': 'Hasil Sebelumnya',
    'detail.mlPrediction': 'Prediksi ML',
    'detail.conversionScore': 'Skor Konversi',
    'detail.recommendation': 'Rekomendasi',
    'detail.highPriority': 'Prioritas Tinggi - Hubungi Segera',
    'detail.mediumPriority': 'Prioritas Sedang - Jadwalkan Tindak Lanjut',
    'detail.lowPriority': 'Prioritas Rendah - Pertimbangkan Pendekatan Alternatif',
    'detail.updateStatus': 'Perbarui Status Lead',
    'detail.currentStatus': 'Status Saat Ini',
    'detail.addNotes': 'Tambah Catatan',
    'detail.notesPlaceholder': 'Masukkan catatan tentang lead ini...',
    'detail.saveChanges': 'Simpan Perubahan',
    'detail.statusUpdated': 'Status lead berhasil diperbarui',
    
    // Admin Management
    'admin.title': 'Manajemen Lead Admin',
    'admin.addNewLead': 'Tambah Lead Baru',
    'admin.search': 'Cari lead...',
    'admin.filterStatus': 'Filter berdasarkan Status',
    'admin.allStatuses': 'Semua Status',
    'admin.name': 'Nama',
    'admin.job': 'Pekerjaan',
    'admin.age': 'Usia',
    'admin.score': 'Skor ML',
    'admin.status': 'Status',
    'admin.actions': 'Aksi',
    'admin.edit': 'Edit',
    'admin.delete': 'Hapus',
    'admin.showing': 'Menampilkan',
    'admin.to': 'sampai',
    'admin.of': 'dari',
    'admin.entries': 'entri',
    'admin.previous': 'Sebelumnya',
    'admin.next': 'Berikutnya',
    'admin.addLeadTitle': 'Tambah Lead Baru',
    'admin.editLeadTitle': 'Edit Lead',
    'admin.personalInfo': 'Informasi Pribadi',
    'admin.fullName': 'Nama Lengkap',
    'admin.email': 'Email',
    'admin.phone': 'Nomor Telepon',
    'admin.ageLabel': 'Usia',
    'admin.jobTitle': 'Jabatan Pekerjaan',
    'admin.maritalStatus': 'Status Pernikahan',
    'admin.maritalSingle': 'Lajang',
    'admin.maritalMarried': 'Menikah',
    'admin.maritalDivorced': 'Cerai',
    'admin.educationLevel': 'Tingkat Pendidikan',
    'admin.educationPrimary': 'SD',
    'admin.educationSecondary': 'SMP/SMA',
    'admin.educationTertiary': 'Perguruan Tinggi',
    'admin.financialInfo': 'Informasi Keuangan',
    'admin.accountBalance': 'Saldo Rekening',
    'admin.housingLoan': 'Pinjaman Rumah',
    'admin.housingYes': 'Ya',
    'admin.housingNo': 'Tidak',
    'admin.personalLoan': 'Pinjaman Pribadi',
    'admin.personalLoanYes': 'Ya',
    'admin.personalLoanNo': 'Tidak',
    'admin.campaignInfo': 'Informasi Kampanye',
    'admin.lastContactDate': 'Tanggal Kontak Terakhir',
    'admin.totalCampaigns': 'Total Kampanye',
    'admin.previousOutcome': 'Hasil Sebelumnya',
    'admin.outcomeSuccess': 'Sukses',
    'admin.outcomeFailure': 'Gagal',
    'admin.outcomeOther': 'Lainnya',
    'admin.mlScore': 'Skor Prediksi ML (0-100)',
    'admin.leadStatus': 'Status Lead',
    'admin.cancel': 'Batal',
    'admin.save': 'Simpan Lead',
    'admin.deleteConfirmTitle': 'Hapus Lead',
    'admin.deleteConfirmDesc': 'Apakah Anda yakin ingin menghapus lead ini? Tindakan ini tidak dapat dibatalkan.',
    'admin.deleteCancel': 'Batal',
    'admin.deleteConfirm': 'Hapus',
    'admin.leadAdded': 'Lead berhasil ditambahkan',
    'admin.leadUpdated': 'Lead berhasil diperbarui',
    'admin.leadDeleted': 'Lead berhasil dihapus',
    
    // Common
    'common.yes': 'Ya',
    'common.no': 'Tidak',
    'common.pending': 'Menunggu',
    'common.contacted': 'Telah Dihubungi',
    'common.converted': 'Terkonversi',
    'common.rejected': 'Ditolak',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'id') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
