import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../components/Header/Heading';
import Footer from '../components/Footer/Footer';
import Nav2 from '../components/Header/Nav2';
import { isLoggedIn, getUserRole } from '../util/auth';
import {
  getUserProfile,
  getUserAnalyticsSummary,
  getUserDonationsAnalytics,
  getUserRatingsAnalytics,
  getUserFoodRequestsAnalytics,
  getMyDonations,
  getMyReceivedRequests,
  getStatisticsSummary,
  getTopDonors,
  getYearlyStatistics,
  getAvailableDonations,
  // Add new API imports if needed
} from '../util/api';
import {
    BarChart,
    LineChart,
    PieChart
} from '@mui/x-charts';
import {
    TrendingUp,
    TrendingDown,
    Users,
    Package,
    Star,
    Clock,
    MapPin,
    Calendar,
    Activity,
    Award,
    Heart,
    Target
} from 'lucide-react';

function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);
    const [analyticsSummary, setAnalyticsSummary] = useState({
        myDonations: 0,
        myFoodRequests: 0,
        myRatingsGiven: 0,
        myRatingsReceived: 0
    });
    const [donationsData, setDonationsData] = useState([]);
    const [ratingsData, setRatingsData] = useState([]);
    const [foodRequestsData, setFoodRequestsData] = useState([]);
    const [recentDonations, setRecentDonations] = useState([]);
    const [recentRequests, setRecentRequests] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [ratingStats, setRatingStats] = useState(null);
    const [foodRequests, setFoodRequests] = useState([]);
    const [globalStats, setGlobalStats] = useState(null);
    const [topDonors, setTopDonors] = useState([]);
    const [availableDonations, setAvailableDonations] = useState([]);
    const [availableDonationsLoading, setAvailableDonationsLoading] = useState(false);
    const [availableDonationsError, setAvailableDonationsError] = useState(null);
    const [loadingExtras, setLoadingExtras] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        if (!isLoggedIn()) {
            navigate('/signin');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // Fetch all dashboard data in parallel
                const [
                    profileData,
                    summaryData,
                    donationsAnalytics,
                    ratingsAnalytics,
                    foodRequestsAnalytics,
                    myDonations,
                    myRequests
                ] = await Promise.all([
                    getUserProfile(),
                    getUserAnalyticsSummary(),
                    getUserDonationsAnalytics(),
                    getUserRatingsAnalytics(),
                    getUserFoodRequestsAnalytics(),
                    getMyDonations(),
                    getMyReceivedRequests()
                ]);

                setUserProfile(profileData);
                setAnalyticsSummary(summaryData);
                setDonationsData(donationsAnalytics);
                setRatingsData(ratingsAnalytics);
                setFoodRequestsData(foodRequestsAnalytics);
                setRecentDonations(myDonations.slice(0, 5)); // Show last 5 donations
                setRecentRequests(myRequests.slice(0, 5)); // Show last 5 requests

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                alert('Failed to load dashboard data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    useEffect(() => {
        const fetchExtraDashboardData = async () => {
            try {
                setLoadingExtras(true);
                // Fetch all extra dashboard data in parallel
                const [
                    ratingStatsData,
                    foodRequestsData,
                    globalStatsData,
                    topDonorsData,
                    // availableDonationsData, // Uncomment and implement if API utility exists
                ] = await Promise.all([
                    // Implement getRatingsStatistics in api.js if not present
                    (typeof getRatingsStatistics === 'function' ? getRatingsStatistics() : Promise.resolve(null)),
                    (typeof getMyFoodRequests === 'function' ? getMyFoodRequests() : Promise.resolve([])),
                    getStatisticsSummary({ region: 'India', year: new Date().getFullYear() }),
                    getTopDonors({}),
                    // (typeof getAvailableDonations === 'function' ? getAvailableDonations() : Promise.resolve([])),
                ]);
                setRatingStats(ratingStatsData);
                setFoodRequests(foodRequestsData);
                setGlobalStats(globalStatsData);
                setTopDonors(topDonorsData);
                // setAvailableDonations(availableDonationsData);
            } catch (error) {
                console.error('Error fetching extra dashboard data:', error);
            } finally {
                setLoadingExtras(false);
            }
        };
        fetchExtraDashboardData();
    }, []);

    useEffect(() => {
        // Fetch available donations for the new tab
        const fetchAvailableDonations = async () => {
            try {
                setAvailableDonationsLoading(true);
                setAvailableDonationsError(null);
                const data = await getAvailableDonations();
                setAvailableDonations(data);
            } catch (error) {
                setAvailableDonationsError('Failed to load available donations.');
            } finally {
                setAvailableDonationsLoading(false);
            }
        };
        if (activeTab === 'availableDonations') {
            fetchAvailableDonations();
        }
    }, [activeTab]);

    if (loading) {
        return (
            <>
                <Heading />
                <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex items-center justify-center">
                    <div className="text-white text-xl">Loading your dashboard...</div>
                </div>
            </>
        );
    }

    // Prepare chart data
    const donationsChartData = donationsData.map(item => ({
        month: item.month,
        donations: item.donations
    }));

    const ratingsChartData = [
        { type: 'Given', count: analyticsSummary?.myRatingsGiven || 0 },
        { type: 'Received', count: analyticsSummary?.myRatingsReceived || 0 }
    ];

    const foodRequestsChartData = foodRequestsData.map(item => ({
        month: item.month,
        requests: item.requests
    }));

    const pieChartData = [
        { label: 'Donations', value: analyticsSummary?.myDonations || 0, color: '#E87730' },
        { label: 'Requests', value: analyticsSummary?.myFoodRequests || 0, color: '#2ECC71' },
        { label: 'Ratings Given', value: analyticsSummary?.myRatingsGiven || 0, color: '#F4D03F' },
        { label: 'Ratings Received', value: analyticsSummary?.myRatingsReceived || 0, color: '#3498DB' }
    ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'AVAILABLE': return 'text-green-500';
            case 'PENDING': return 'text-yellow-500';
            case 'COMPLETED': return 'text-blue-500';
            case 'REJECTED': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <>
            <Heading />
            <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen">
                <Nav2 />

                {/* Dashboard Header */}
                <div className="px-6 sm:px-10 md:px-20 pt-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h1 className="text-white text-2xl sm:text-3xl font-bold">
                                Welcome back, {userProfile?.fullName || 'User'}! 👋
                            </h1>
                            <p className="text-gray-300 mt-2">
                                Here's your activity overview and important insights
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center space-x-2 text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span>{userProfile?.location || 'Location not set'}</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="px-6 sm:px-10 md:px-20 mb-6">
                    <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
                        {[
                            { id: 'overview', label: 'Overview', icon: Activity },
                            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                            { id: 'activities', label: 'Activities', icon: Clock },
                            { id: 'achievements', label: 'Achievements', icon: Award },
                            { id: 'ratingStats', label: 'Rating Stats', icon: Star },
                            { id: 'foodRequests', label: 'Food Requests', icon: Package },
                            { id: 'globalStats', label: 'Global Impact', icon: Activity },
                            { id: 'topDonors', label: 'Top Donors', icon: Award },
                            { id: 'availableDonations', label: 'Available Donations', icon: Package },
                        ].map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${activeTab === tab.id
                                        ? 'bg-[#E87730] text-white'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                        }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="px-6 sm:px-10 md:px-20 pb-20">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">Total Donations</p>
                                            <p className="text-2xl font-bold text-[#E87730]">
                                                {analyticsSummary?.myDonations || 0}
                                            </p>
                                        </div>
                                        <Package className="w-8 h-8 text-[#E87730]" />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">Food Requests</p>
                                            <p className="text-2xl font-bold text-green-600">
                                                {analyticsSummary?.myFoodRequests || 0}
                                            </p>
                                        </div>
                                        <Heart className="w-8 h-8 text-green-600" />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">Ratings Given</p>
                                            <p className="text-2xl font-bold text-yellow-600">
                                                {analyticsSummary?.myRatingsGiven || 0}
                                            </p>
                                        </div>
                                        <Star className="w-8 h-8 text-yellow-600" />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">Ratings Received</p>
                                            <p className="text-2xl font-bold text-blue-600">
                                                {analyticsSummary?.myRatingsReceived || 0}
                                            </p>
                                        </div>
                                        <Users className="w-8 h-8 text-blue-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Charts Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Activity Distribution */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-semibold mb-4">Activity Distribution</h3>
                                    <div className="h-64">
                                        <PieChart
                                            series={[
                                                {
                                                    data: pieChartData,
                                                    innerRadius: 60,
                                                    outerRadius: 100,
                                                    paddingAngle: 2,
                                                    cornerRadius: 5,
                                                    cx: 150,
                                                    color: pieChartData.map((item) => item.color),
                                                },
                                            ]}
                                            width={300}
                                            height={250}
                                            slotProps={{
                                                legend: { hidden: true },
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        {pieChartData.map((item) => (
                                            <div key={item.label} className="flex items-center space-x-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: item.color }}
                                                ></div>
                                                <span className="text-sm text-gray-600">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Donations Trend */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-semibold mb-4">Donations Trend</h3>
                                    <div className="h-64">
                                        {donationsChartData.length > 0 ? (
                                            <LineChart
                                                xAxis={[
                                                    {
                                                        data: donationsChartData.map((_, index) => index),
                                                        valueFormatter: (index) => donationsChartData[index]?.month || '',
                                                    },
                                                ]}
                                                series={[
                                                    {
                                                        data: donationsChartData.map(item => item.donations),
                                                        area: true,
                                                        color: '#E87730',
                                                    },
                                                ]}
                                                width={300}
                                                height={250}
                                            />
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-500">
                                                No donation data available
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activities */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Recent Donations */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-semibold mb-4">Recent Donations</h3>
                                    <div className="space-y-3">
                                        {recentDonations.length > 0 ? (
                                            recentDonations.map((donation) => (
                                                <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div>
                                                        <p className="font-medium">{donation.foodName}</p>
                                                        <p className="text-sm text-gray-500">{donation.quantity}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className={`text-sm font-medium ${getStatusColor(donation.status)}`}>
                                                            {donation.status}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {formatDate(donation.createdDateTime)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">No donations yet</p>
                                        )}
                                    </div>
                                </div>

                                {/* Recent Requests */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-semibold mb-4">Recent Requests</h3>
                                    <div className="space-y-3">
                                        {recentRequests.length > 0 ? (
                                            recentRequests.map((request) => (
                                                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div>
                                                        <p className="font-medium">{request.foodName}</p>
                                                        <p className="text-sm text-gray-500">Requested from {request.donorName}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className={`text-sm font-medium ${getStatusColor(request.status)}`}>
                                                            {request.status}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {formatDate(request.requestDate)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">No requests yet</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="space-y-6">
                            {/* Detailed Analytics */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Donations Analytics */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-semibold mb-4">Donations Analytics</h3>
                                    <div className="h-64">
                                        {donationsChartData.length > 0 ? (
                                            <BarChart
                                                xAxis={[
                                                    {
                                                        data: donationsChartData.map((_, index) => index),
                                                        valueFormatter: (index) => donationsChartData[index]?.month || '',
                                                        scaleType: 'band',
                                                    },
                                                ]}
                                                series={[
                                                    {
                                                        data: donationsChartData.map(item => item.donations),
                                                        color: '#E87730',
                                                    },
                                                ]}
                                                width={300}
                                                height={250}
                                            />
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-500">
                                                No donation data available
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Food Requests Analytics */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-semibold mb-4">Food Requests Analytics</h3>
                                    <div className="h-64">
                                        {foodRequestsChartData.length > 0 ? (
                                            <LineChart
                                                xAxis={[
                                                    {
                                                        data: foodRequestsChartData.map((_, index) => index),
                                                        valueFormatter: (index) => foodRequestsChartData[index]?.month || '',
                                                    },
                                                ]}
                                                series={[
                                                    {
                                                        data: foodRequestsChartData.map(item => item.requests),
                                                        area: true,
                                                        color: '#2ECC71',
                                                    },
                                                ]}
                                                width={300}
                                                height={250}
                                            />
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-500">
                                                No request data available
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Ratings Analytics */}
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-lg font-semibold mb-4">Ratings Analytics</h3>
                                <div className="h-64">
                                    <BarChart
                                        xAxis={[
                                            {
                                                data: ratingsChartData.map((_, index) => index),
                                                valueFormatter: (index) => ratingsChartData[index]?.type || '',
                                                scaleType: 'band',
                                            },
                                        ]}
                                        series={[
                                            {
                                                data: ratingsChartData.map(item => item.count),
                                                color: '#F4D03F',
                                            },
                                        ]}
                                        width={600}
                                        height={250}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'activities' && (
                        <div className="space-y-6">
                            {/* All Donations */}
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-lg font-semibold mb-4">All My Donations</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2">Food Name</th>
                                                <th className="text-left py-2">Quantity</th>
                                                <th className="text-left py-2">Status</th>
                                                <th className="text-left py-2">Created</th>
                                                <th className="text-left py-2">Location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentDonations.map((donation) => (
                                                <tr key={donation.id} className="border-b">
                                                    <td className="py-2">{donation.foodName}</td>
                                                    <td className="py-2">{donation.quantity}</td>
                                                    <td className="py-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(donation.status)}`}>
                                                            {donation.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-2">{formatDate(donation.createdDateTime)}</td>
                                                    <td className="py-2">{donation.location}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* All Requests */}
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-lg font-semibold mb-4">All My Requests</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2">Food Name</th>
                                                <th className="text-left py-2">Donor</th>
                                                <th className="text-left py-2">Status</th>
                                                <th className="text-left py-2">Requested</th>
                                                <th className="text-left py-2">Payment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentRequests.map((request) => (
                                                <tr key={request.id} className="border-b">
                                                    <td className="py-2">{request.foodName}</td>
                                                    <td className="py-2">{request.donorName}</td>
                                                    <td className="py-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
                                                            {request.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-2">{formatDate(request.requestDate)}</td>
                                                    <td className="py-2">{request.paymentMethod}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'achievements' && (
                        <div className="space-y-6">
                            {/* Achievement Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* First Donation */}
                                <div className={`bg-white rounded-xl p-6 shadow-lg border-2 ${analyticsSummary?.myDonations > 0 ? 'border-green-500' : 'border-gray-300'
                                    }`}>
                                    <div className="text-center">
                                        <Target className={`w-12 h-12 mx-auto mb-3 ${analyticsSummary?.myDonations > 0 ? 'text-green-500' : 'text-gray-400'
                                            }`} />
                                        <h4 className="font-semibold">First Donation</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myDonations > 0 ? 'Achieved!' : 'Donate your first food item'}
                                        </p>
                                    </div>
                                </div>

                                {/* Helping Hand */}
                                <div className={`bg-white rounded-xl p-6 shadow-lg border-2 ${analyticsSummary?.myDonations >= 5 ? 'border-green-500' : 'border-gray-300'
                                    }`}>
                                    <div className="text-center">
                                        <Heart className={`w-12 h-12 mx-auto mb-3 ${analyticsSummary?.myDonations >= 5 ? 'text-green-500' : 'text-gray-400'
                                            }`} />
                                        <h4 className="font-semibold">Helping Hand</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myDonations >= 5 ? 'Achieved!' : 'Donate 5 food items'}
                                        </p>
                                    </div>
                                </div>

                                {/* Community Builder */}
                                <div className={`bg-white rounded-xl p-6 shadow-lg border-2 ${analyticsSummary?.myDonations >= 10 ? 'border-green-500' : 'border-gray-300'
                                    }`}>
                                    <div className="text-center">
                                        <Users className={`w-12 h-12 mx-auto mb-3 ${analyticsSummary?.myDonations >= 10 ? 'text-green-500' : 'text-gray-400'
                                            }`} />
                                        <h4 className="font-semibold">Community Builder</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myDonations >= 10 ? 'Achieved!' : 'Donate 10 food items'}
                                        </p>
                                    </div>
                                </div>

                                {/* Active Rater */}
                                <div className={`bg-white rounded-xl p-6 shadow-lg border-2 ${analyticsSummary?.myRatingsGiven >= 3 ? 'border-green-500' : 'border-gray-300'
                                    }`}>
                                    <div className="text-center">
                                        <Star className={`w-12 h-12 mx-auto mb-3 ${analyticsSummary?.myRatingsGiven >= 3 ? 'text-green-500' : 'text-gray-400'
                                            }`} />
                                        <h4 className="font-semibold">Active Rater</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myRatingsGiven >= 3 ? 'Achieved!' : 'Give 3 ratings'}
                                        </p>
                                    </div>
                                </div>

                                {/* Food Explorer */}
                                <div className={`bg-white rounded-xl p-6 shadow-lg border-2 ${analyticsSummary?.myFoodRequests >= 2 ? 'border-green-500' : 'border-gray-300'
                                    }`}>
                                    <div className="text-center">
                                        <Package className={`w-12 h-12 mx-auto mb-3 ${analyticsSummary?.myFoodRequests >= 2 ? 'text-green-500' : 'text-gray-400'
                                            }`} />
                                        <h4 className="font-semibold">Food Explorer</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myFoodRequests >= 2 ? 'Achieved!' : 'Request 2 food items'}
                                        </p>
                                    </div>
                                </div>

                                {/* Consistent Helper */}
                                <div className={`bg-white rounded-xl p-6 shadow-lg border-2 ${analyticsSummary?.myDonations >= 20 ? 'border-green-500' : 'border-gray-300'
                                    }`}>
                                    <div className="text-center">
                                        <Award className={`w-12 h-12 mx-auto mb-3 ${analyticsSummary?.myDonations >= 20 ? 'text-green-500' : 'text-gray-400'
                                            }`} />
                                        <h4 className="font-semibold">Consistent Helper</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myDonations >= 20 ? 'Achieved!' : 'Donate 20 food items'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Summary */}
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium mb-2">Donations Progress</h4>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-[#E87730] h-2 rounded-full"
                                                style={{ width: `${Math.min((analyticsSummary?.myDonations || 0) * 5, 100)}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myDonations || 0} donations made
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">Community Engagement</h4>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-500 h-2 rounded-full"
                                                style={{ width: `${Math.min(((analyticsSummary?.myRatingsGiven || 0) + (analyticsSummary?.myFoodRequests || 0)) * 10, 100)}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myRatingsGiven || 0} ratings + {analyticsSummary?.myFoodRequests || 0} requests
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'ratingStats' && (
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold mb-4">Rating Statistics</h3>
                            {loadingExtras ? (
                                <div>Loading...</div>
                            ) : ratingStats ? (
                                <div>
                                    <p>Average Rating: {ratingStats.averageRating}</p>
                                    <p>Total Ratings: {ratingStats.totalRatings}</p>
                                    <div className="flex space-x-4 mt-2">
                                        <div>5★: {ratingStats.fiveStarRatings}</div>
                                        <div>4★: {ratingStats.fourStarRatings}</div>
                                        <div>3★: {ratingStats.threeStarRatings}</div>
                                        <div>2★: {ratingStats.twoStarRatings}</div>
                                        <div>1★: {ratingStats.oneStarRatings}</div>
                                    </div>
                                </div>
                            ) : (
                                <div>No rating statistics available.</div>
                            )}
                        </div>
                    )}

                    {activeTab === 'foodRequests' && (
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold mb-4">My Food Requests</h3>
                            {loadingExtras ? (
                                <div>Loading...</div>
                            ) : foodRequests && foodRequests.length > 0 ? (
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2">Food Type</th>
                                            <th className="text-left py-2">People</th>
                                            <th className="text-left py-2">Status</th>
                                            <th className="text-left py-2">Location</th>
                                            <th className="text-left py-2">Created</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {foodRequests.map((req) => (
                                            <tr key={req.id} className="border-b">
                                                <td className="py-2">{req.foodType}</td>
                                                <td className="py-2">{req.numberOfPeople}</td>
                                                <td className="py-2">{req.status}</td>
                                                <td className="py-2">{req.location}</td>
                                                <td className="py-2">{formatDate(req.createdAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div>No food requests found.</div>
                            )}
                        </div>
                    )}

                    {activeTab === 'globalStats' && (
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold mb-4">Global Impact Stats (India)</h3>
                            {loadingExtras ? (
                                <div>Loading...</div>
                            ) : globalStats ? (
                                <div>
                                    <p>Year: {globalStats.year}</p>
                                    <p>Hunger: {globalStats.hunger} million</p>
                                    <p>Food Waste: {globalStats.foodWaste} {globalStats.foodWasteUnit}</p>
                                    <p>People Fed: {globalStats.peopleFed}</p>
                                    <p>Daily Hungry: {globalStats.dailyHungry}</p>
                                    <p>Enough Food: {globalStats.enoughFood ? 'Yes' : 'No'}</p>
                                    <p>Short By: {globalStats.shortBy}</p>
                                    <div className="mt-2">
                                        <h4 className="font-medium">Food Waste Source Breakdown</h4>
                                        <ul>
                                            {globalStats.foodWasteSourceBreakdown && Object.entries(globalStats.foodWasteSourceBreakdown).map(([src, val]) => (
                                                <li key={src}>{src}: {val}%</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div>No global stats available.</div>
                            )}
                        </div>
                    )}

                    {activeTab === 'topDonors' && (
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold mb-4">Top Donors</h3>
                            {loadingExtras ? (
                                <div>Loading...</div>
                            ) : topDonors && topDonors.length > 0 ? (
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2">Name</th>
                                            <th className="text-left py-2">Donations</th>
                                            <th className="text-left py-2">Location</th>
                                            <th className="text-left py-2">Available</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topDonors.map((donor) => (
                                            <tr key={donor.userId} className="border-b">
                                                <td className="py-2">{donor.name}</td>
                                                <td className="py-2">{donor.donations}</td>
                                                <td className="py-2">{donor.location}</td>
                                                <td className="py-2">{donor.available ? 'Yes' : 'No'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div>No top donors found.</div>
                            )}
                        </div>
                    )}

                    {activeTab === 'availableDonations' && (
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold mb-4">Available Donations</h3>
                            {availableDonationsLoading ? (
                                <div>Loading...</div>
                            ) : availableDonationsError ? (
                                <div className="text-red-500">{availableDonationsError}</div>
                            ) : availableDonations && availableDonations.length > 0 ? (
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2">Food Name</th>
                                            <th className="text-left py-2">Description</th>
                                            <th className="text-left py-2">Quantity</th>
                                            <th className="text-left py-2">Location</th>
                                            <th className="text-left py-2">Status</th>
                                            <th className="text-left py-2">Created</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {availableDonations.map((donation) => (
                                            <tr key={donation.id} className="border-b">
                                                <td className="py-2">{donation.foodName}</td>
                                                <td className="py-2">{donation.description}</td>
                                                <td className="py-2">{donation.quantity}</td>
                                                <td className="py-2">{donation.location}</td>
                                                <td className="py-2">{donation.status}</td>
                                                <td className="py-2">{formatDate(donation.createdDateTime)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div>No available donations found.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Dashboard; 