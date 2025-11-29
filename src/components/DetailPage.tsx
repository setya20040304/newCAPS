import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Calendar,
  DollarSign,
  TrendingUp,
  Home,
  CreditCard,
  Target,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Activity,
} from "lucide-react";
import type { User as AppUser, Lead } from "../App";

interface DetailPageProps {
  leadId: string;
  user: AppUser;
  onBack: () => void;
}

export function DetailPage({
  leadId,
  user,
  onBack,
}: DetailPageProps) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi fetch data detail dari API
    setTimeout(() => {
      const mockLeads: Lead[] = [
        {
          id: "1",
          name: "Budi Santoso",
          age: 42,
          job: "management",
          marital: "married",
          education: "tertiary",
          balance: 125000000,
          phone: "+62 812-3456-7890",
          email: "budi.santoso@email.com",
          lastContact: "2024-10-15",
          campaign: 1,
          previousOutcome: "success",
          predictedScore: 0.89,
          status: "pending",
          housing: "yes",
          loan: "no",
          notes:
            "Nasabah potensial tinggi. Memiliki riwayat deposito sebelumnya.",
        },
        {
          id: "2",
          name: "Siti Nurhaliza",
          age: 38,
          job: "technician",
          marital: "married",
          education: "tertiary",
          balance: 95000000,
          phone: "+62 813-2345-6789",
          email: "siti.nurhaliza@email.com",
          lastContact: "2024-09-20",
          campaign: 2,
          previousOutcome: "success",
          predictedScore: 0.85,
          status: "pending",
          housing: "yes",
          loan: "no",
        },
        {
          id: "11",
          name: "Bambang Sutrisno",
          age: 50,
          job: "management",
          marital: "married",
          education: "tertiary",
          balance: 320000000,
          phone: "+62 811-2222-3333",
          email: "bambang.sutrisno@email.com",
          lastContact: "2024-09-05",
          campaign: 1,
          previousOutcome: "success",
          predictedScore: 0.92,
          status: "pending",
          housing: "yes",
          loan: "no",
          notes: "VIP customer dengan balance tinggi.",
        },
        {
          id: "12",
          name: "Maya Kusuma",
          age: 36,
          job: "entrepreneur",
          marital: "married",
          education: "tertiary",
          balance: 145000000,
          phone: "+62 812-8888-9999",
          email: "maya.kusuma@email.com",
          lastContact: "2024-10-10",
          campaign: 2,
          previousOutcome: "success",
          predictedScore: 0.87,
          status: "contacted",
          housing: "yes",
          loan: "no",
        },
      ];

      const foundLead = mockLeads.find((l) => l.id === leadId);
      setLead(foundLead || null);
      setNotes(foundLead?.notes || "");
      setIsLoading(false);
    }, 500);
  }, [leadId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-8 h-8 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">
            Memuat detail nasabah...
          </p>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">
            Data nasabah tidak ditemukan
          </p>
          <Button onClick={onBack} className="mt-4">
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus: Lead["status"]) => {
    setLead({ ...lead, status: newStatus });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8)
      return "bg-green-100 text-green-800 border-green-300";
    if (score >= 0.6)
      return "bg-blue-100 text-blue-800 border-blue-300";
    if (score >= 0.4)
      return "bg-orange-100 text-orange-800 border-orange-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.8) return "Sangat Tinggi";
    if (score >= 0.6) return "Tinggi";
    if (score >= 0.4) return "Sedang";
    return "Rendah";
  };

  const getStatusBadge = (status: Lead["status"]) => {
    const configs = {
      pending: {
        label: "Belum Dihubungi",
        className: "bg-gray-100 text-gray-800",
      },
      contacted: {
        label: "Sudah Dihubungi",
        className: "bg-blue-100 text-blue-800",
      },
      converted: {
        label: "Terkonversi",
        className: "bg-green-100 text-green-800",
      },
      rejected: {
        label: "Ditolak",
        className: "bg-red-100 text-red-800",
      },
    };
    return (
      <Badge className={configs[status].className}>
        {configs[status].label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <div>
              <h1 className="text-gray-900">Detail Nasabah</h1>
              <p className="text-gray-600">
                Informasi lengkap dan skor prediksi ML
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">
                    Profil Nasabah
                  </CardTitle>
                  {getStatusBadge(lead.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center pb-4 border-b border-gray-200">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-gray-900 mb-1">
                    {lead.name}
                  </h2>
                  <p className="text-gray-600">
                    {lead.age} tahun
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="text-gray-900">
                        {lead.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500">Telepon</p>
                      <p className="text-gray-900">
                        {lead.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500">Pekerjaan</p>
                      <p className="text-gray-900 capitalize">
                        {lead.job}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500">
                        Pendidikan
                      </p>
                      <p className="text-gray-900 capitalize">
                        {lead.education}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500">
                        Saldo Rekening
                      </p>
                      <p className="text-gray-900">
                        {formatCurrency(lead.balance)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ML Score Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <TrendingUp className="w-5 h-5" />
                  Skor Prediksi ML
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div
                    className={`inline-flex flex-col items-center px-6 py-4 rounded-xl border-2 ${getScoreColor(lead.predictedScore)}`}
                  >
                    <div className="mb-2">
                      {(lead.predictedScore * 100).toFixed(0)}%
                    </div>
                    <p className="text-current">
                      {getScoreLabel(lead.predictedScore)}
                    </p>
                  </div>
                  <p className="text-gray-600 mt-4">
                    Probabilitas konversi berdasarkan model
                    Machine Learning
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">
                  Informasi Tambahan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500">
                        Kepemilikan Rumah
                      </p>
                      <p className="text-gray-900">
                        {lead.housing === "yes"
                          ? "Ya"
                          : "Tidak"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500">
                        Pinjaman Aktif
                      </p>
                      <p className="text-gray-900">
                        {lead.loan === "yes" ? "Ya" : "Tidak"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500">
                        Kontak Terakhir
                      </p>
                      <p className="text-gray-900">
                        {lead.lastContact}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500">
                        Kampanye Ke-
                      </p>
                      <p className="text-gray-900">
                        {lead.campaign}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500">
                        Status Pernikahan
                      </p>
                      <p className="text-gray-900 capitalize">
                        {lead.marital}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500">
                        Hasil Kampanye Sebelumnya
                      </p>
                      <p className="text-gray-900 capitalize">
                        {lead.previousOutcome}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <MessageSquare className="w-5 h-5" />
                  Catatan Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Tambahkan catatan tentang nasabah ini..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={6}
                  className="mb-4"
                />
                <Button>Simpan Catatan</Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">
                  Aksi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lead.status === "pending" && (
                    <div className="flex gap-3">
                      <Button
                        onClick={() =>
                          handleStatusChange("contacted")
                        }
                        className="flex-1"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Tandai Sudah Dihubungi
                      </Button>
                    </div>
                  )}

                  {lead.status === "contacted" && (
                    <div className="flex gap-3">
                      <Button
                        onClick={() =>
                          handleStatusChange("converted")
                        }
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Berhasil Dikonversi
                      </Button>
                      <Button
                        onClick={() =>
                          handleStatusChange("rejected")
                        }
                        variant="outline"
                        className="flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Ditolak
                      </Button>
                    </div>
                  )}

                  {(lead.status === "converted" ||
                    lead.status === "rejected") && (
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-gray-700">
                        Status:{" "}
                        {lead.status === "converted"
                          ? "Berhasil dikonversi ✓"
                          : "Ditolak ✗"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}