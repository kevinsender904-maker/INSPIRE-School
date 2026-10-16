import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApplicationsList } from '@/services/admissions';
import { getMessagesList } from '@/services/messages';
import { getNewsList } from '@/services/news';
import { getEventsList } from '@/services/events';
import { AdmissionApplication, ContactMessage, News, Event } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table, Column } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import {
  GraduationCap,
  Mail,
  Newspaper,
  Calendar,
  Plus,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      getApplicationsList(),
      getMessagesList(),
      getNewsList(),
      getEventsList(),
    ]).then(([appData, msgData, newsData, eventData]) => {
      if (mounted) {
        setApplications(appData);
        setMessages(msgData);
        setNews(newsData);
        setEvents(eventData);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const pendingAppsCount = applications.filter((a) => a.status === 'pending').length;
  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;
  const publishedNewsCount = news.filter((n) => n.status === 'published').length;
  const upcomingEventsCount = events.length;

  const appColumns: Column<AdmissionApplication>[] = [
    {
      key: 'reference_no',
      header: 'Reference No',
      render: (item) => (
        <span className="font-mono text-xs font-semibold text-[#1E3A8A]">
          {item.reference_no}
        </span>
      ),
    },
    {
      key: 'student_name',
      header: 'Student Name',
      render: (item) => (
        <div>
          <span className="font-medium text-slate-900 block">{item.student_name}</span>
          <span className="text-xs text-slate-400">S/D/O {item.father_name}</span>
        </div>
      ),
    },
    {
      key: 'class_applying',
      header: 'Class',
      render: (item) => <span className="text-xs font-medium">{item.class_applying}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <Badge variant={item.status} size="sm">
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      header: 'Date',
      render: (item) => (
        <span className="text-xs text-slate-500">
          {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}
        </span>
      ),
    },
  ];

  const msgColumns: Column<ContactMessage>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (item) => (
        <div>
          <span className="font-medium text-slate-900 block">{item.name}</span>
          <span className="text-xs text-slate-400">{item.phone}</span>
        </div>
      ),
    },
    {
      key: 'subject',
      header: 'Subject',
      render: (item) => (
        <span className="text-xs font-medium text-slate-700 max-w-xs truncate block" title={item.subject}>
          {item.subject}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <Badge variant={item.status} size="sm">
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      header: 'Date',
      render: (item) => (
        <span className="text-xs text-slate-500">
          {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900">Administrative Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">
            Welcome to the INSPIRE School institutional management portal.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <Link to="/admin/news">
            <Button variant="outline" size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>
              New News
            </Button>
          </Link>
          <Link to="/admin/events">
            <Button variant="outline" size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>
              New Event
            </Button>
          </Link>
          <Link to="/admin/admissions">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              View Admissions
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: New Applications */}
        <Card variant="elevated" className="p-5 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                New Applications
              </p>
              <h3 className="text-3xl font-bold font-heading text-slate-900 mt-1">
                {loading ? '...' : pendingAppsCount}
              </h3>
              <p className="text-[11px] text-amber-600 font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>{applications.length} Total Registered</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <GraduationCap className="h-6 w-6" />
            </div>
          </div>
        </Card>

        {/* Card 2: Unread Messages */}
        <Card variant="elevated" className="p-5 border-l-4 border-l-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Unread Messages
              </p>
              <h3 className="text-3xl font-bold font-heading text-slate-900 mt-1">
                {loading ? '...' : unreadMessagesCount}
              </h3>
              <p className="text-[11px] text-blue-600 font-medium mt-1">
                {messages.length} Total Inquiries
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Mail className="h-6 w-6" />
            </div>
          </div>
        </Card>

        {/* Card 3: Published News */}
        <Card variant="elevated" className="p-5 border-l-4 border-l-emerald-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Published News
              </p>
              <h3 className="text-3xl font-bold font-heading text-slate-900 mt-1">
                {loading ? '...' : publishedNewsCount}
              </h3>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">
                Active announcements
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Newspaper className="h-6 w-6" />
            </div>
          </div>
        </Card>

        {/* Card 4: Upcoming Events */}
        <Card variant="elevated" className="p-5 border-l-4 border-l-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Upcoming Events
              </p>
              <h3 className="text-3xl font-bold font-heading text-slate-900 mt-1">
                {loading ? '...' : upcomingEventsCount}
              </h3>
              <p className="text-[11px] text-purple-600 font-medium mt-1">
                Scheduled activities
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Two Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latest 5 Applications */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-900">Latest 5 Applications</h2>
              <Badge variant="primary" size="sm">
                {applications.length}
              </Badge>
            </div>
            <Link
              to="/admin/admissions"
              className="text-xs font-semibold text-[#1E3A8A] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <Table
            columns={appColumns as unknown as Column<Record<string, unknown>>[]}
            data={applications.slice(0, 5) as unknown as Record<string, unknown>[]}
            loading={loading}
            emptyMessage="No admission applications received yet."
          />
        </div>

        {/* Latest 5 Messages */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-900">Latest 5 Messages</h2>
              <Badge variant="accent" size="sm">
                {messages.length}
              </Badge>
            </div>
            <Link
              to="/admin/messages"
              className="text-xs font-semibold text-[#1E3A8A] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <Table
            columns={msgColumns as unknown as Column<Record<string, unknown>>[]}
            data={messages.slice(0, 5) as unknown as Record<string, unknown>[]}
            loading={loading}
            emptyMessage="No contact messages received yet."
          />
        </div>
      </div>
    </div>
  );
};
