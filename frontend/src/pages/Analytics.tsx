import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Eye, Globe, Smartphone, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";

const Analytics = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalSubscribers: 0,
    totalArticles: 0,
    contactsThisWeek: 0,
    subscribersThisWeek: 0,
    articlesThisMonth: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        fetchStats();
      } else {
        navigate("/impala-admin-secure-login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      // Get date ranges
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Fetch all contacts
      const contactsSnapshot = await getDocs(collection(db, "contacts"));
      const totalContacts = contactsSnapshot.size;
      
      // Count contacts this week
      const contactsThisWeek = contactsSnapshot.docs.filter(doc => {
        const timestamp = doc.data().timestamp;
        if (!timestamp) return false;
        const date = new Date(timestamp);
        return date >= weekAgo;
      }).length;

      // Fetch all subscriptions
      const subsSnapshot = await getDocs(collection(db, "subscriptions"));
      const totalSubscribers = subsSnapshot.size;
      
      // Count subscriptions this week
      const subscribersThisWeek = subsSnapshot.docs.filter(doc => {
        const timestamp = doc.data().subscribedAt || doc.data().subscribed_at;
        if (!timestamp) return false;
        const date = new Date(timestamp);
        return date >= weekAgo;
      }).length;

      // Fetch all articles
      const articlesSnapshot = await getDocs(collection(db, "articles"));
      const totalArticles = articlesSnapshot.size;
      
      // Count articles this month
      const articlesThisMonth = articlesSnapshot.docs.filter(doc => {
        const timestamp = doc.data().created_at;
        if (!timestamp) return false;
        const date = new Date(timestamp);
        return date >= monthAgo;
      }).length;

      setStats({
        totalContacts,
        totalSubscribers,
        totalArticles,
        contactsThisWeek,
        subscribersThisWeek,
        articlesThisMonth,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Contacts",
      value: stats.totalContacts,
      change: `+${stats.contactsThisWeek} this week`,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Newsletter Subscribers",
      value: stats.totalSubscribers,
      change: `+${stats.subscribersThisWeek} this week`,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Published Updates",
      value: stats.totalArticles,
      change: `+${stats.articlesThisMonth} this month`,
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your website performance and engagement metrics
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3 text-green-600" />
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Google Analytics Embed Section */}
          <div className="grid grid-cols-1 gap-6">
            {/* Instructions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-accent" />
                  Google Analytics Integration
                </CardTitle>
                <CardDescription>
                  View detailed website analytics and visitor insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">How to View Analytics:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                    <li>
                      Visit{" "}
                      <a 
                        href="https://analytics.google.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline font-medium hover:text-blue-600"
                      >
                        Google Analytics Dashboard
                      </a>
                    </li>
                    <li>Sign in with your Google account</li>
                    <li>Select "Impala Website" property</li>
                    <li>Explore reports: Realtime, Acquisition, Engagement, Demographics</li>
                  </ol>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <a
                    href="https://analytics.google.com/analytics/web/#/report-home/a~p~"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-4 border-2 border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Eye className="h-5 w-5" />
                    <span className="font-medium">View Realtime Report</span>
                  </a>
                  <a
                    href="https://analytics.google.com/analytics/web/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-4 border-2 border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-medium">Full Analytics Dashboard</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics Overview */}
            <Card>
              <CardHeader>
                <CardTitle>What You Can Track</CardTitle>
                <CardDescription>
                  Comprehensive insights available in Google Analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Visitor Demographics</h4>
                        <p className="text-xs text-muted-foreground">
                          Countries, cities, languages, age groups
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Traffic Sources</h4>
                        <p className="text-xs text-muted-foreground">
                          Google search, social media, direct visits, referrals
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Eye className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Page Performance</h4>
                        <p className="text-xs text-muted-foreground">
                          Most viewed pages, time on page, bounce rates
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <Smartphone className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Device Breakdown</h4>
                        <p className="text-xs text-muted-foreground">
                          Mobile, desktop, tablet usage statistics
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-pink-50 rounded-lg">
                        <Calendar className="h-4 w-4 text-pink-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Time Analysis</h4>
                        <p className="text-xs text-muted-foreground">
                          Peak hours, daily trends, weekly patterns
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <BarChart3 className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Engagement Metrics</h4>
                        <p className="text-xs text-muted-foreground">
                          Session duration, pages per session, conversions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats from Firestore */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
                <CardDescription>
                  Real-time data from your database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Contact Inquiries</p>
                      <p className="text-2xl font-bold text-blue-900">{stats.totalContacts}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-600 font-medium">+{stats.contactsThisWeek}</p>
                      <p className="text-xs text-muted-foreground">Last 7 days</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Newsletter Subscribers</p>
                      <p className="text-2xl font-bold text-green-900">{stats.totalSubscribers}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-600 font-medium">+{stats.subscribersThisWeek}</p>
                      <p className="text-xs text-muted-foreground">Last 7 days</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Published Updates</p>
                      <p className="text-2xl font-bold text-purple-900">{stats.totalArticles}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-600 font-medium">+{stats.articlesThisMonth}</p>
                      <p className="text-xs text-muted-foreground">Last 30 days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
