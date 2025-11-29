import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft,
  Plus,
  Pencil, 
  Trash2,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { User, Lead } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';

interface AdminManagementPageProps {
  user: User;
  onBack: () => void;
}

export function AdminManagementPage({ user, onBack }: AdminManagementPageProps) {
  const { t } = useLanguage();
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Budi Santoso',
      age: 45,
      job: 'entrepreneur',
      marital: 'married',
      education: 'tertiary',
      balance: 125000000,
      phone: '+62 812-3456-7890',
      email: 'budi.santoso@email.com',
      lastContact: '2024-10-15',
      campaign: 1,
      previousOutcome: 'success',
      predictedScore: 0.89,
      status: 'pending',
      housing: 'yes',
      loan: 'no',
      notes: 'Nasabah prioritas tinggi dengan riwayat campaign yang baik'
    },
    {
      id: '2',
      name: 'Siti Nurhaliza',
      age: 38,
      job: 'technician',
      marital: 'married',
      education: 'tertiary',
      balance: 95000000,
      phone: '+62 813-2345-6789',
      email: 'siti.nurhaliza@email.com',
      lastContact: '2024-09-20',
      campaign: 2,
      previousOutcome: 'success',
      predictedScore: 0.85,
      status: 'pending',
      housing: 'yes',
      loan: 'no'
    },
    {
      id: '3',
      name: 'Ahmad Hidayat',
      age: 55,
      job: 'management',
      marital: 'married',
      education: 'secondary',
      balance: 250000000,
      phone: '+62 811-9876-5432',
      email: 'ahmad.hidayat@email.com',
      lastContact: '2024-08-10',
      campaign: 1,
      previousOutcome: 'none',
      predictedScore: 0.82,
      status: 'pending',
      housing: 'yes',
      loan: 'yes'
    },
    {
      id: '4',
      name: 'Dewi Lestari',
      age: 35,
      job: 'admin',
      marital: 'single',
      education: 'tertiary',
      balance: 75000000,
      phone: '+62 812-5555-4444',
      email: 'dewi.lestari@email.com',
      lastContact: '2024-10-01',
      campaign: 3,
      previousOutcome: 'failure',
      predictedScore: 0.78,
      status: 'contacted',
      housing: 'no',
      loan: 'no'
    },
    {
      id: '5',
      name: 'Rudi Hartono',
      age: 48,
      job: 'services',
      marital: 'divorced',
      education: 'secondary',
      balance: 110000000,
      phone: '+62 813-7777-8888',
      email: 'rudi.hartono@email.com',
      lastContact: '2024-09-15',
      campaign: 2,
      previousOutcome: 'success',
      predictedScore: 0.76,
      status: 'pending',
      housing: 'yes',
      loan: 'no'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    job: '',
    marital: '',
    education: '',
    balance: '',
    housing: '',
    loan: '',
    campaign: '',
    lastContact: '',
    previousOutcome: '',
    notes: ''
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getJobLabel = (job: string) => {
    const jobLabels: Record<string, string> = {
      'management': 'Management',
      'technician': 'Teknisi',
      'entrepreneur': 'Pengusaha',
      'admin': 'Admin',
      'services': 'Layanan',
      'blue-collar': 'Buruh',
      'student': 'Mahasiswa',
      'unemployed': 'Tidak Bekerja'
    };
    return jobLabels[job] || job;
  };

  const getOutcomeBadge = (outcome: string) => {
    const configs: Record<string, { label: string; className: string }> = {
      'success': { label: 'Sukses', className: 'bg-green-100 text-green-800' },
      'failure': { label: 'Gagal', className: 'bg-red-100 text-red-800' },
      'none': { label: 'Belum Ada', className: 'bg-gray-100 text-gray-800' }
    };
    const config = configs[outcome] || configs['none'];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleOpenAddModal = () => {
    setModalMode('add');
    setCurrentLead(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      job: '',
      marital: '',
      education: '',
      balance: '',
      housing: '',
      loan: '',
      campaign: '',
      lastContact: '',
      previousOutcome: '',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lead: Lead) => {
    setModalMode('edit');
    setCurrentLead(lead);
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      age: lead.age.toString(),
      job: lead.job,
      marital: lead.marital,
      education: lead.education,
      balance: lead.balance.toString(),
      housing: lead.housing,
      loan: lead.loan,
      campaign: lead.campaign.toString(),
      lastContact: lead.lastContact,
      previousOutcome: lead.previousOutcome,
      notes: lead.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (leadId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data nasabah ini?')) {
      setLeads(leads.filter(lead => lead.id !== leadId));
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Mohon lengkapi data yang wajib diisi (Nama, Email, Telepon)');
      return;
    }

    if (modalMode === 'add') {
      const newLead: Lead = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: parseInt(formData.age) || 0,
        job: formData.job || 'admin',
        marital: formData.marital || 'single',
        education: formData.education || 'secondary',
        balance: parseInt(formData.balance) || 0,
        housing: formData.housing || 'no',
        loan: formData.loan || 'no',
        campaign: parseInt(formData.campaign) || 1,
        lastContact: formData.lastContact || new Date().toISOString().split('T')[0],
        previousOutcome: formData.previousOutcome || 'none',
        predictedScore: 0.5,
        status: 'pending',
        notes: formData.notes
      };
      setLeads([...leads, newLead]);
    } else if (modalMode === 'edit' && currentLead) {
      setLeads(leads.map(lead => 
        lead.id === currentLead.id
          ? {
              ...lead,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              age: parseInt(formData.age) || lead.age,
              job: formData.job || lead.job,
              marital: formData.marital || lead.marital,
              education: formData.education || lead.education,
              balance: parseInt(formData.balance) || lead.balance,
              housing: formData.housing || lead.housing,
              loan: formData.loan || lead.loan,
              campaign: parseInt(formData.campaign) || lead.campaign,
              lastContact: formData.lastContact || lead.lastContact,
              previousOutcome: formData.previousOutcome || lead.previousOutcome,
              notes: formData.notes
            }
          : lead
      ));
    }

    setIsModalOpen(false);
  };

  // Pagination
  const totalPages = Math.ceil(leads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLeads = leads.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <Button 
                  variant="outline" 
                  onClick={onBack}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </Button>
              </div>
              <h1 className="text-gray-900 mb-1">Manajemen Data Nasabah</h1>
              <p className="text-gray-600">
                Kelola data profil, finansial, dan riwayat kampanye nasabah secara lengkap.
              </p>
            </div>
            <Button 
              onClick={handleOpenAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              Tambah Nasabah
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Daftar Nasabah ({leads.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-700">Nama</th>
                    <th className="px-4 py-3 text-left text-gray-700">Pekerjaan</th>
                    <th className="px-4 py-3 text-left text-gray-700">Umur</th>
                    <th className="px-4 py-3 text-left text-gray-700">Saldo</th>
                    <th className="px-4 py-3 text-left text-gray-700">Campaign Info</th>
                    <th className="px-4 py-3 text-left text-gray-700">Prev Outcome</th>
                    <th className="px-4 py-3 text-center text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="text-gray-900">{lead.name}</div>
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        {getJobLabel(lead.job)}
                      </td>
                      <td className="px-4 py-4 text-gray-700">{lead.age}</td>
                      <td className="px-4 py-4 text-gray-900">
                        {formatCurrency(lead.balance)}
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-blue-100 text-blue-800">
                          Campaign #{lead.campaign}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        {getOutcomeBadge(lead.previousOutcome)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenEditModal(lead)}
                            className="gap-1"
                          >
                            <Pencil className="w-3 h-3" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(lead.id)}
                            className="gap-1 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {leads.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Belum ada data nasabah</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Halaman {currentPage} dari {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg"
          onClick={handleOpenAddModal}
        >
          <Settings className="w-6 h-6" />
        </Button>
      </div>

      {/* Modal Form */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {modalMode === 'add' ? 'Tambah Nasabah Baru' : 'Edit Data Nasabah'}
            </DialogTitle>
            <DialogDescription>
              {modalMode === 'add' 
                ? 'Lengkapi form di bawah untuk menambahkan nasabah baru ke dalam sistem.'
                : 'Perbarui informasi nasabah sesuai kebutuhan.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Section 1: Data Pribadi */}
            <div>
              <h3 className="text-gray-900 mb-4 pb-2 border-b border-gray-200">Data Pribadi</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama lengkap"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Nomor Telepon *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+62 812-xxxx-xxxx"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Umur</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="25"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="job">Pekerjaan</Label>
                  <Select value={formData.job} onValueChange={(value) => setFormData({ ...formData, job: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih pekerjaan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="management">Management</SelectItem>
                      <SelectItem value="technician">Teknisi</SelectItem>
                      <SelectItem value="entrepreneur">Pengusaha</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="services">Layanan</SelectItem>
                      <SelectItem value="blue-collar">Buruh</SelectItem>
                      <SelectItem value="student">Mahasiswa</SelectItem>
                      <SelectItem value="unemployed">Tidak Bekerja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="marital">Status Pernikahan</Label>
                  <Select value={formData.marital} onValueChange={(value) => setFormData({ ...formData, marital: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Lajang</SelectItem>
                      <SelectItem value="married">Menikah</SelectItem>
                      <SelectItem value="divorced">Cerai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="education">Pendidikan</Label>
                  <Select value={formData.education} onValueChange={(value) => setFormData({ ...formData, education: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih pendidikan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">SD</SelectItem>
                      <SelectItem value="secondary">SMP/SMA</SelectItem>
                      <SelectItem value="tertiary">Perguruan Tinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section 2: Data Finansial */}
            <div>
              <h3 className="text-gray-900 mb-4 pb-2 border-b border-gray-200">Data Finansial</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="balance">Saldo (Rp)</Label>
                  <Input
                    id="balance"
                    type="number"
                    value={formData.balance}
                    onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                    placeholder="50000000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="housing">Kredit Rumah</Label>
                  <Select value={formData.housing} onValueChange={(value) => setFormData({ ...formData, housing: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Ya</SelectItem>
                      <SelectItem value="no">Tidak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="loan">Pinjaman Pribadi</Label>
                  <Select value={formData.loan} onValueChange={(value) => setFormData({ ...formData, loan: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Ya</SelectItem>
                      <SelectItem value="no">Tidak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section 3: Campaign & Teknis */}
            <div>
              <h3 className="text-gray-900 mb-4 pb-2 border-b border-gray-200">Campaign & Teknis</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="campaign">Jumlah Campaign</Label>
                  <Input
                    id="campaign"
                    type="number"
                    value={formData.campaign}
                    onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
                    placeholder="1"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastContact">Tanggal Kontak Terakhir</Label>
                  <Input
                    id="lastContact"
                    type="date"
                    value={formData.lastContact}
                    onChange={(e) => setFormData({ ...formData, lastContact: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="previousOutcome">Hasil Campaign Sebelumnya</Label>
                  <Select value={formData.previousOutcome} onValueChange={(value) => setFormData({ ...formData, previousOutcome: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih hasil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="success">Sukses</SelectItem>
                      <SelectItem value="failure">Gagal</SelectItem>
                      <SelectItem value="none">Belum Ada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section 4: Notes */}
            <div>
              <h3 className="text-gray-900 mb-4 pb-2 border-b border-gray-200">Catatan Tambahan</h3>
              <div>
                <Label htmlFor="notes">Catatan</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tambahkan catatan penting tentang nasabah ini..."
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Simpan Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
