'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, TrendingUp, Lightbulb, Loader2, CheckCircle, AlertTriangle } from 'lucide-react'
import { getAIAnalytics, AIAnalytics } from '@/app/actions/ai-analytics'
import { motion, AnimatePresence } from 'framer-motion'

export function AIInsights() {
    const [analytics, setAnalytics] = useState<AIAnalytics | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        loadAnalytics()
        // Refresh every 5 minutes for real-time updates
        const interval = setInterval(loadAnalytics, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    async function loadAnalytics() {
        try {
            setLoading(true)
            setError(null)
            const data = await getAIAnalytics()
            setAnalytics(data)
        } catch (err) {
            setError('Failed to load AI insights. Please try again.')
            console.error('AI Analytics Error:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading && !analytics) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>AI-Powered Insights</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Analyzing student feedback and ratings...
                    </p>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center space-y-3">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                        <p className="text-sm text-muted-foreground">Generating insights...</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card className="border-destructive">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-5 w-5" />
                        <p>{error}</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!analytics) return null

    const getInsightIcon = (type: string) => {
        switch (type) {
            case 'positive':
                return <CheckCircle className="h-5 w-5 text-green-500" />
            case 'negative':
                return <AlertTriangle className="h-5 w-5 text-orange-500" />
            default:
                return <TrendingUp className="h-5 w-5 text-blue-500" />
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30'
            case 'medium':
                return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30'
            default:
                return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30'
        }
    }

    const getPriorityBadge = (priority: string) => {
        const colors = {
            high: 'bg-red-500 text-white',
            medium: 'bg-yellow-500 text-white',
            low: 'bg-blue-500 text-white'
        }
        return (
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${colors[priority as keyof typeof colors]}`}>
                {priority.toUpperCase()}
            </span>
        )
    }

    return (
        <div className="space-y-4">
            {/* Summary Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-4"
            >
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Reviews (7 days)</p>
                            <p className="text-3xl font-bold text-primary">{analytics.summary.totalReviews}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Avg Rating</p>
                            <p className="text-3xl font-bold text-yellow-500">{analytics.summary.averageRating}★</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Positive</p>
                            <p className="text-3xl font-bold text-green-500">{analytics.summary.positivePercentage}%</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* AI Insights */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            ✨ AI Analysis
                        </CardTitle>
                        {loading && (
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Based on {analytics.summary.totalReviews} reviews from the last 7 days
                    </p>
                </CardHeader>
                <CardContent>
                    <AnimatePresence mode="popLayout">
                        <div className="space-y-3">
                            {analytics.insights.map((insight, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border"
                                >
                                    <div className="mt-0.5">
                                        {getInsightIcon(insight.type)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{insight.dish}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{insight.message}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        Smart Recommendations
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Actionable steps to improve student satisfaction
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {analytics.recommendations.map((rec, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}
                            >
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <h4 className="font-semibold text-sm">{rec.action}</h4>
                                    {getPriorityBadge(rec.priority)}
                                </div>
                                <p className="text-sm text-muted-foreground">{rec.reason}</p>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Auto-refresh indicator */}
            <p className="text-xs text-center text-muted-foreground">
                Auto-refreshes every 5 minutes • Last updated: {new Date().toLocaleTimeString()}
            </p>
        </div>
    )
}
