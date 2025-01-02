// app/admin/newsletter/page.js
"use client";
import { useState, useEffect } from "react";
import {
  AlertCircle,
  Trash2,
  Download,
  Search,
  RefreshCcw,
  Mail,
  Users,
  BarChart2,
  Tags,
  Filter,
  Send,
  ChevronDown,
  Settings,
  PlusCircle,
  Plus,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedSubscribers, setSelectedSubscribers] = useState(new Set());
  const [activeTab, setActiveTab] = useState("subscribers");
  const [campaigns, setCampaigns] = useState([]);
  const [segments, setSegments] = useState([]);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    activeSubscribers: 0,
    openRate: 0,
    clickRate: 0,
  });

  const fetchSubscribers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/get_subs");
      if (!response.ok) throw new Error("Failed to fetch subscribers");
      const data = await response.json();
      setSubscribers(data.subscribers);
      setStats((prev) => ({
        ...prev,
        totalSubscribers: data.subscribers.length,
        activeSubscribers: data.subscribers.filter((s) => s.isActive).length,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;
    setIsDeleting(true);
    try {
      const response = await fetch("/api/get_subs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete subscriber");
      setSubscribers(subscribers.filter((sub) => sub.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExport = () => {
    const csvContent = [
      ["Email", "Subscribed Date", "Status", "Tags"],
      ...subscribers.map((sub) => [
        sub.email,
        new Date(sub.subscribedAt).toLocaleString(),
        sub.isActive ? "Active" : "Inactive",
        sub.tags?.join(", ") || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [analyticsData, setAnalyticsData] = useState([
    { month: "Jan", subscribers: 120, openRate: 68, clickRate: 23 },
    { month: "Feb", subscribers: 150, openRate: 72, clickRate: 25 },
    { month: "Mar", subscribers: 200, openRate: 65, clickRate: 21 },
    { month: "Apr", subscribers: 250, openRate: 70, clickRate: 24 },
  ]);

  const [newSegment, setNewSegment] = useState({
    name: "",
    conditions: [{ field: "email", operator: "contains", value: "" }],
  });

  // Previous useEffect and handler functions remain the same...

  const addSegmentCondition = () => {
    setNewSegment((prev) => ({
      ...prev,
      conditions: [
        ...prev.conditions,
        { field: "email", operator: "contains", value: "" },
      ],
    }));
  };

  const removeSegmentCondition = (index) => {
    setNewSegment((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-[#fffbf7] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Newsletter Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your newsletter, subscribers, and campaigns
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Subscribers
                  </p>
                  <p className="text-2xl font-bold">{stats.totalSubscribers}</p>
                </div>
                <Users className="h-8 w-8 text-primary-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Active Subscribers
                  </p>
                  <p className="text-2xl font-bold">
                    {stats.activeSubscribers}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Avg. Open Rate
                  </p>
                  <p className="text-2xl font-bold">{stats.openRate}%</p>
                </div>
                <Mail className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Avg. Click Rate
                  </p>
                  <p className="text-2xl font-bold">{stats.clickRate}%</p>
                </div>
                <BarChart2 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          defaultValue="subscribers"
          className="bg-[#fffbf7] rounded-lg shadow-sm"
        >
          <div className="border-b border-gray-200 drop-shadow-md">
            <div className="p-4">
              <TabsList className="flex space-x-4 bg-[#fffbf7]">
                <TabsTrigger value="subscribers" className="px-3 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  Subscribers
                </TabsTrigger>
                <TabsTrigger value="campaigns" className="px-3 py-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Campaigns
                </TabsTrigger>
                <TabsTrigger value="segments" className="px-3 py-2">
                  <Tags className="w-4 h-4 mr-2" />
                  Segments
                </TabsTrigger>
                <TabsTrigger value="analytics" className="px-3 py-2">
                  <BarChart2 className="w-4 h-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers" className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-96">
                <input
                  type="text"
                  placeholder="Search subscribers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primaryMain focus:border-primaryMain"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNewCampaign(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#fffbf7] bg-primaryMain hover:bg-primaryMain/90"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Campaign
                </button>
                <button
                  onClick={handleExport}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-[#fffbf7] hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
                <button
                  onClick={fetchSubscribers}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-[#fffbf7] hover:bg-gray-50"
                  disabled={isLoading}
                >
                  <RefreshCcw
                    className={`h-4 w-4 mr-2 ${
                      isLoading ? "animate-spin" : ""
                    }`}
                  />
                  Refresh
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <p className="ml-3 text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-[#fffbf7] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 bg-[#fffbf7] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-[#fffbf7] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-3 bg-[#fffbf7] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subscribed Date
                    </th>
                    <th className="px-6 py-3 bg-[#fffbf7] text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#fffbf7] divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        Loading subscribers...
                      </td>
                    </tr>
                  ) : filteredSubscribers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No subscribers found
                      </td>
                    </tr>
                  ) : (
                    filteredSubscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 [#fffbf7]space-nowrap text-sm font-medium text-gray-900">
                          {subscriber.email}
                        </td>
                        <td className="px-6 py-4 [#fffbf7]space-nowrap text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              subscriber.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {subscriber.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 [#fffbf7]space-nowrap text-sm text-gray-500">
                          {subscriber.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2"
                            >
                              {tag}
                            </span>
                          ))}
                        </td>
                        <td className="px-6 py-4 [#fffbf7]space-nowrap text-sm text-gray-500">
                          {new Date(subscriber.subscribedAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 [#fffbf7]space-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDelete(subscriber.id)}
                            disabled={isDeleting}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="p-6">
            <div className="text-center py-8">
              <Mail className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Create your first campaign
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new email campaign.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowNewCampaign(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#fffbf7] bg-primaryMain hover:bg-primaryMain/90"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Campaign
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Segments Tab Content */}
          <TabsContent value="segments" className="p-6">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-lg font-medium">Subscriber Segments</h3>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#fffbf7] bg-primaryMain hover:bg-primaryMain/90"
                onClick={() => setShowNewSegment(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Segment
              </button>
            </div>

            {/* New Segment Form */}
            {newSegment && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Create New Segment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Segment Name
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primaryMain focus:ring-primaryMain"
                        value={newSegment.name}
                        onChange={(e) =>
                          setNewSegment((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="e.g., Active Subscribers"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Conditions
                      </label>
                      {newSegment.conditions.map((condition, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 mb-2"
                        >
                          <select
                            className="rounded-md border-gray-300 shadow-sm focus:border-primaryMain focus:ring-primaryMain"
                            value={condition.field}
                            onChange={(e) => {
                              const newConditions = [...newSegment.conditions];
                              newConditions[index].field = e.target.value;
                              setNewSegment((prev) => ({
                                ...prev,
                                conditions: newConditions,
                              }));
                            }}
                          >
                            <option value="email">Email</option>
                            <option value="subscriptionDate">
                              Subscription Date
                            </option>
                            <option value="status">Status</option>
                          </select>
                          <select
                            className="rounded-md border-gray-300 shadow-sm focus:border-primaryMain focus:ring-primaryMain"
                            value={condition.operator}
                            onChange={(e) => {
                              const newConditions = [...newSegment.conditions];
                              newConditions[index].operator = e.target.value;
                              setNewSegment((prev) => ({
                                ...prev,
                                conditions: newConditions,
                              }));
                            }}
                          >
                            <option value="contains">Contains</option>
                            <option value="equals">Equals</option>
                            <option value="startsWith">Starts with</option>
                          </select>
                          <input
                            type="text"
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primaryMain focus:ring-primaryMain"
                            value={condition.value}
                            onChange={(e) => {
                              const newConditions = [...newSegment.conditions];
                              newConditions[index].value = e.target.value;
                              setNewSegment((prev) => ({
                                ...prev,
                                conditions: newConditions,
                              }));
                            }}
                          />
                          <button
                            onClick={() => removeSegmentCondition(index)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addSegmentCondition}
                        className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Condition
                      </button>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowNewSegment(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          // Handle segment creation
                          setShowNewSegment(false);
                        }}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#fffbf7] bg-primaryMain hover:bg-primaryMain/90"
                      >
                        Create Segment
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Existing Segments List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {segments.map((segment) => (
                <Card key={segment.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{segment.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {segment.subscriberCount} subscribers
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Settings className="h-5 w-5" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab Content */}
          <TabsContent value="analytics" className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Subscriber Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="subscribers"
                          stroke="#2563eb"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="openRate"
                          stroke="#16a34a"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="clickRate"
                          stroke="#9333ea"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
