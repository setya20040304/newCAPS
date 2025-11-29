import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  LogOut, 
  Search, 
  TrendingUp, 
  Users, 
  Phone, 
  Target,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  RefreshCw,
  Settings
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { User, Lead } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
  onViewDetail: (leadId: string) => void;
  onNavigateToAdmin?: () => void;
}

export function DashboardPage({ user, onLogout, onViewDetail, onNavigateToAdmin }: DashboardPageProps) {
  const { t } = useLanguage();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'balance'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(true);

  // Simulasi fetch data dari API tim ML
  useEffect(() => {
    fetchLeadsWithMLScores();
  }, []);

  const fetchLeadsWithMLScores = async () => {
    setIsLoading(true);
    
    // Simulasi API call ke endpoint ML team
    setTimeout(() => {
      const mockLeads: Lead[] = [
        {
          id: '1',
          name: 'Budi Santoso',
          age: 42,
          job: 'management',
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
          loan: 'no'
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
          job: 'entrepreneur',
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
        },
        {
          id: '6',
          name: 'Linda Wijaya',
          age: 31,
          job: 'technician',
          marital: 'single',
          education: 'tertiary',
          balance: 68000000,
          phone: '+62 812-1111-2222',
          email: 'linda.wijaya@email.com',
          lastContact: '2024-10-20',
          campaign: 1,
          previousOutcome: 'none',
          predictedScore: 0.73,
          status: 'pending',
          housing: 'no',
          loan: 'yes'
        },
        {
          id: '7',
          name: 'Hendra Gunawan',
          age: 52,
          job: 'management',
          marital: 'married',
          education: 'tertiary',
          balance: 180000000,
          phone: '+62 811-3333-4444',
          email: 'hendra.gunawan@email.com',
          lastContact: '2024-07-25',
          campaign: 4,
          previousOutcome: 'success',
          predictedScore: 0.71,
          status: 'converted',
          housing: 'yes',
          loan: 'no'
        },
        {
          id: '8',
          name: 'Ratna Sari',
          age: 29,
          job: 'student',
          marital: 'single',
          education: 'tertiary',
          balance: 35000000,
          phone: '+62 813-9999-0000',
          email: 'ratna.sari@email.com',
          lastContact: '2024-10-18',
          campaign: 2,
          previousOutcome: 'none',
          predictedScore: 0.45,
          status: 'pending',
          housing: 'no',
          loan: 'no'
        },
        {
          id: '9',
          name: 'Teguh Prasetyo',
          age: 44,
          job: 'blue-collar',
          marital: 'married',
          education: 'primary',
          balance: 52000000,
          phone: '+62 812-6666-7777',
          email: 'teguh.prasetyo@email.com',
          lastContact: '2024-09-30',
          campaign: 5,
          previousOutcome: 'failure',
          predictedScore: 0.38,
          status: 'rejected',
          housing: 'yes',
          loan: 'yes'
        },
        {
          id: '10',
          name: 'Indah Permata',
          age: 26,
          job: 'unemployed',
          marital: 'single',
          education: 'secondary',
          balance: 18000000,
          phone: '+62 813-4444-5555',
          email: 'indah.permata@email.com',
          lastContact: '2024-10-22',
          campaign: 1,
          previousOutcome: 'none',
          predictedScore: 0.32,
          status: 'pending',
          housing: 'no',
          loan: 'no'
        },
        {
          id: '11',
          name: 'Bambang Sutrisno',
          age: 50,
          job: 'management',
          marital: 'married',
          education: 'tertiary',
          balance: 320000000,
          phone: '+62 811-2222-3333',
          email: 'bambang.sutrisno@email.com',
          lastContact: '2024-09-05',
          campaign: 1,
          previousOutcome: 'success',
          predictedScore: 0.92,
          status: 'pending',
          housing: 'yes',
          loan: 'no'
        },
        {
          id: '12',
          name: 'Maya Kusuma',
          age: 36,
          job: 'entrepreneur',
          marital: 'married',
          education: 'tertiary',
          balance: 145000000,
          phone: '+62 812-8888-9999',
          email: 'maya.kusuma@email.com',
          lastContact: '2024-10-10',
          campaign: 2,
          previousOutcome: 'success',
          predictedScore: 0.87,
          status: 'contacted',
          housing: 'yes',
          loan: 'no'
        }
      ];

      setLeads(mockLeads);
      setFilteredLeads(mockLeads);
      setIsLoading(false);
    }, 1500);
  };

  // Filter dan Sort
  useEffect(() => {
    let result = [...leads];

    // Filter by search
    if (searchTerm) {
      result = result.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm)
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(lead => lead.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case 'score':
          compareValue = a.predictedScore - b.predictedScore;
          break;
        case 'name':
          compareValue = a.name.localeCompare(b.name);
          break;
        case 'balance':
          compareValue = a.balance - b.balance;
          break;
      }

      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    setFilteredLeads(result);
  }, [leads, searchTerm, statusFilter, sortBy, sortOrder]);

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: newStatus, contactedAt: new Date() }
        : lead
    ));
  };

  const toggleSort = (field: 'score' | 'name' | 'balance') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-100 text-green-800 border-green-300';
    if (score >= 0.6) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (score >= 0.4) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getStatusBadge = (status: Lead['status']) => {
    const configs = {
      pending: { label: t('common.pending'), className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100' },
      contacted: { label: t('common.contacted'), className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' },
      converted: { label: t('common.converted'), className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' },
      rejected: { label: t('common.rejected'), className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' }
    };
    return <Badge className={configs[status].className}>{configs[status].label}</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Metrics
  const totalLeads = leads.length;
  const highPriorityLeads = leads.filter(l => l.predictedScore >= 0.7 && l.status === 'pending').length;
  const contacted = leads.filter(l => l.status === 'contacted' || l.status === 'converted' || l.status === 'rejected').length;
  const converted = leads.filter(l => l.status === 'converted').length;
  const conversionRate = contacted > 0 ? (converted / contacted) * 100 : 0;

  const SortIcon = ({ field }: { field: 'score' | 'name' | 'balance' }) => {
    if (sortBy !== field) return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    return sortOrder === 'asc' 
      ? <ArrowUp className="w-4 h-4 text-blue-600" />
      : <ArrowDown className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900 dark:text-white">{t('dashboard.title')}</h1>
                <p className="text-gray-600 dark:text-gray-400">{t('login.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-gray-500 dark:text-gray-400">{user.role}</p>
              </div>
              <LanguageToggle />
              <ThemeToggle />
              {onNavigateToAdmin && (
                <Button variant="outline" onClick={onNavigateToAdmin}>
                  <Settings className="w-4 h-4 mr-2" />
                  {t('dashboard.adminPanel')}
                </Button>
              )}
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                {t('dashboard.logout')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-700 dark:text-gray-300">{t('dashboard.totalLeads')}</CardTitle>
              <Users className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-gray-900 dark:text-white">{totalLeads}</div>
              <p className="text-gray-500 dark:text-gray-400">Nasabah potensial</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-700 dark:text-gray-300">{t('dashboard.highPotential')}</CardTitle>
              <Target className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-gray-900 dark:text-white">{highPriorityLeads}</div>
              <p className="text-gray-500 dark:text-gray-400">Skor ML ≥ 70%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-700 dark:text-gray-300">{t('dashboard.conversionRate')}</CardTitle>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-gray-900 dark:text-white">{conversionRate.toFixed(1)}%</div>
              <p className="text-gray-500 dark:text-gray-400">{converted} dari {contacted} kontak</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-700 dark:text-gray-300">{t('dashboard.contacted')}</CardTitle>
              <Phone className="w-5 h-5 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-gray-900 dark:text-white">{contacted}</div>
              <p className="text-gray-500 dark:text-gray-400">{((contacted / totalLeads) * 100).toFixed(0)}% dari total</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder={t('dashboard.search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('dashboard.status')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('dashboard.statusAll')}</SelectItem>
                    <SelectItem value="pending">{t('dashboard.statusPending')}</SelectItem>
                    <SelectItem value="contacted">{t('dashboard.statusContacted')}</SelectItem>
                    <SelectItem value="converted">{t('dashboard.statusConverted')}</SelectItem>
                    <SelectItem value="rejected">{t('dashboard.statusRejected')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => fetchLeadsWithMLScores()}
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh ML
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-white">
                {t('dashboard.totalLeads')} ({filteredLeads.length})
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400">Diurutkan berdasarkan skor ML</p>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Memuat data dari API tim ML...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">#</th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => toggleSort('name')}
                          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                          {t('dashboard.name')}
                          <SortIcon field="name" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">{t('dashboard.contact')}</th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => toggleSort('balance')}
                          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                          Balance
                          <SortIcon field="balance" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleSort('score')}
                          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                          {t('dashboard.score')}
                          <SortIcon field="score" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{t('dashboard.statusLabel')}</th>
                      <th className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{t('dashboard.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredLeads.map((lead, index) => (
                      <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-4 text-gray-700 dark:text-gray-300">{index + 1}</td>
                        <td className="px-4 py-4">
                          <div>
                            <div className="text-gray-900 dark:text-white">{lead.name}</div>
                            <div className="text-gray-500 dark:text-gray-400">{lead.age} tahun • {lead.job}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-gray-700 dark:text-gray-300">{lead.phone}</div>
                          <div className="text-gray-500 dark:text-gray-400">{lead.email}</div>
                        </td>
                        <td className="px-4 py-4 text-gray-900 dark:text-white">
                          {formatCurrency(lead.balance)}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full border ${getScoreColor(lead.predictedScore)}`}>
                            {(lead.predictedScore * 100).toFixed(0)}%
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {getStatusBadge(lead.status)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {lead.status === 'pending' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(lead.id, 'contacted')}
                              >
                                <Phone className="w-4 h-4 mr-1" />
                                {t('dashboard.contact')}
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onViewDetail(lead.id)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              {t('dashboard.viewDetails')}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredLeads.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">Tidak ada data yang sesuai dengan filter</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
