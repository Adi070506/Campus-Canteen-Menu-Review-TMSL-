'use server'

import { createServerClient } from '@/lib/supabase-server'

export interface AIInsight {
    type: 'positive' | 'negative' | 'neutral'
    dish: string
    message: string
    severity?: 'high' | 'medium' | 'low'
}

export interface AIRecommendation {
    priority: 'high' | 'medium' | 'low'
    action: string
    reason: string
}

export interface AIAnalytics {
    insights: AIInsight[]
    recommendations: AIRecommendation[]
    summary: {
        totalReviews: number
        averageRating: number
        positivePercentage: number
    }
}

// Keywords for sentiment analysis
const NEGATIVE_KEYWORDS = {
    // Food-specific
    temperature: ['cold', 'warm', 'lukewarm', 'not hot'],
    taste: ['bland', 'tasteless', 'no flavor', 'boring'],
    spice: ['too spicy', 'very spicy', 'spicy', 'hot'],
    quality: ['stale', 'old', 'not fresh', 'bad quality', 'overcooked', 'undercooked', 'burnt'],
    portion: ['small', 'tiny', 'less', 'not enough'],
    texture: ['dry', 'oily', 'greasy', 'soggy', 'mushy'],
    // Beverage-specific
    consistency: ['watery', 'thin', 'diluted', 'weak'],
    sweetness: ['too sweet', 'not sweet enough', 'bland'],
    temperature_bev: ['not cold enough', 'warm', 'not hot enough']
}

const POSITIVE_KEYWORDS = ['delicious', 'amazing', 'perfect', 'love', 'excellent', 'fresh', 'tasty', 'great', 'wonderful', 'best', 'favorite', 'awesome', 'fantastic']

const BEVERAGE_CATEGORIES = ['Beverages', 'Shakes', 'Drinks']

export async function getAIAnalytics(): Promise<AIAnalytics> {
    const supabase = await createServerClient()

    // Get ratings from last 7 days with comments and tags
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: ratings } = await supabase
        .from('ratings')
        .select(`
            rating,
            comment,
            tags,
            created_at,
            dishes (
                name,
                category
            )
        `)
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: false })

    if (!ratings || ratings.length === 0) {
        return {
            insights: [{
                type: 'neutral',
                dish: 'No data',
                message: 'Not enough recent reviews to generate insights. Encourage students to leave feedback!'
            }],
            recommendations: [{
                priority: 'medium',
                action: 'Promote the rating system to students',
                reason: 'More feedback will help improve menu quality'
            }],
            summary: {
                totalReviews: 0,
                averageRating: 0,
                positivePercentage: 0
            }
        }
    }

    // Calculate summary stats
    const totalReviews = ratings.length
    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    const positiveCount = ratings.filter(r => r.rating >= 4).length
    const positivePercentage = Math.round((positiveCount / totalReviews) * 100)

    // Group ratings by dish
    const dishAnalysis = new Map<string, {
        name: string
        ratings: number[]
        comments: string[]
        tags: string[]
        category: string
    }>()

    ratings.forEach(r => {
        const dishName = r.dishes && typeof r.dishes === 'object' && 'name' in r.dishes
            ? (r.dishes as any).name
            : 'Unknown'
        const category = r.dishes && typeof r.dishes === 'object' && 'category' in r.dishes
            ? (r.dishes as any).category
            : 'Unknown'

        if (!dishAnalysis.has(dishName)) {
            dishAnalysis.set(dishName, {
                name: dishName,
                ratings: [],
                comments: [],
                tags: [],
                category
            })
        }

        const dish = dishAnalysis.get(dishName)!
        dish.ratings.push(r.rating)
        if (r.comment) dish.comments.push(r.comment.toLowerCase())
        if (r.tags) dish.tags.push(...r.tags.map((t: string) => t.toLowerCase()))
    })

    // Generate insights
    const insights: AIInsight[] = []
    const recommendations: AIRecommendation[] = []

    // Analyze each dish
    dishAnalysis.forEach((dish, dishName) => {
        const avgRating = dish.ratings.reduce((a, b) => a + b, 0) / dish.ratings.length
        const reviewCount = dish.ratings.length
        const allText = [...dish.comments, ...dish.tags].join(' ')
        const isBeverage = BEVERAGE_CATEGORIES.includes(dish.category)

        // BESTSELLERS & HIGH PERFORMERS (Prioritize positive insights)
        if (avgRating >= 4.5 && reviewCount >= 3) {
            const positiveCount = POSITIVE_KEYWORDS.filter(keyword => allText.includes(keyword)).length

            insights.push({
                type: 'positive',
                dish: dishName,
                message: `🌟 ${dishName} is a BESTSELLER! ${avgRating.toFixed(1)}★ from ${reviewCount} reviews${positiveCount >= 2 ? ' with glowing feedback' : ''}.`,
                severity: 'low'
            })

            if (reviewCount >= 5) {
                recommendations.push({
                    priority: 'high',
                    action: `🔥 Increase ${dishName} quantity - High Demand!`,
                    reason: `Bestseller with ${reviewCount} positive reviews. Students love this ${isBeverage ? 'beverage' : 'dish'}!`
                })
            } else if (reviewCount >= 3) {
                recommendations.push({
                    priority: 'medium',
                    action: `Consider preparing more ${dishName}`,
                    reason: `Popular ${isBeverage ? 'beverage' : 'item'} with excellent ${avgRating.toFixed(1)}★ rating`
                })
            }
        }

        // GOOD PERFORMERS (4.0-4.4 stars)
        if (avgRating >= 4.0 && avgRating < 4.5 && reviewCount >= 3) {
            insights.push({
                type: 'positive',
                dish: dishName,
                message: `✅ ${dishName} is performing well with ${avgRating.toFixed(1)}★ rating. Students enjoy this ${isBeverage ? 'beverage' : 'dish'}.`,
                severity: 'low'
            })
        }

        // Low performing dishes - Add detailed recommendations
        if (avgRating < 3 && reviewCount >= 2) {
            insights.push({
                type: 'negative',
                dish: dishName,
                message: `⚠️ ${dishName} needs attention - only ${avgRating.toFixed(1)}★ from ${reviewCount} reviews.`,
                severity: 'high'
            })

            // Analyze what's wrong and suggest specific changes
            const hasTemperatureIssue = allText.includes('cold') || allText.includes('warm')
            const hasTasteIssue = allText.includes('bland') || allText.includes('tasteless')
            const hasSpiceIssue = allText.includes('spicy')
            const hasQualityIssue = allText.includes('stale') || allText.includes('old')
            const hasConsistencyIssue = allText.includes('watery') || allText.includes('thin')

            let specificChanges = []
            if (hasTemperatureIssue) {
                specificChanges.push(isBeverage ? 'ensure proper chilling/heating' : 'serve immediately while hot')
            }
            if (hasTasteIssue) {
                specificChanges.push(isBeverage ? 'increase flavor concentration' : 'add more seasoning and spices')
            }
            if (hasSpiceIssue) {
                specificChanges.push('reduce spice levels or offer mild variant')
            }
            if (hasQualityIssue) {
                specificChanges.push('use fresher ingredients, check storage')
            }
            if (hasConsistencyIssue && isBeverage) {
                specificChanges.push('use less water, increase ingredient ratio')
            }

            const changesList = specificChanges.length > 0
                ? specificChanges.join(', ')
                : isBeverage ? 'review recipe ratios and preparation method' : 'review cooking method and ingredients'

            recommendations.push({
                priority: 'high',
                action: `🔧 Revamp ${dishName} - Specific Changes Needed`,
                reason: `Low ${avgRating.toFixed(1)}★ rating. Suggested improvements: ${changesList}`
            })

            // Consider removing if consistently poor
            if (avgRating < 2.5 && reviewCount >= 5) {
                recommendations.push({
                    priority: 'high',
                    action: `Consider temporarily removing ${dishName} from menu`,
                    reason: `Consistently poor performance (${avgRating.toFixed(1)}★ from ${reviewCount} reviews). Revamp recipe before reintroducing.`
                })
            }
        }

        // Detect specific issues (category-aware)
        Object.entries(NEGATIVE_KEYWORDS).forEach(([category, keywords]) => {
            // Skip beverage-specific checks for food and vice versa
            if (isBeverage && ['spice', 'texture', 'portion'].includes(category)) return
            if (!isBeverage && ['consistency', 'temperature_bev'].includes(category)) return

            const mentions = keywords.filter(keyword => allText.includes(keyword))

            if (mentions.length >= 2) {
                insights.push({
                    type: 'negative',
                    dish: dishName,
                    message: `${dishName} has complaints about ${category.replace('_bev', '')} (${mentions.length} mentions).`,
                    severity: 'medium'
                })

                // Generate category-specific recommendations
                if (category === 'temperature' || category === 'temperature_bev') {
                    recommendations.push({
                        priority: 'high',
                        action: `Check ${isBeverage ? 'storage temperature' : 'heating equipment'} for ${dishName}`,
                        reason: `Multiple students report temperature issues with this ${isBeverage ? 'beverage' : 'dish'}`
                    })
                } else if (category === 'consistency') {
                    recommendations.push({
                        priority: 'high',
                        action: `Adjust ${dishName} consistency - use less water/more ingredients`,
                        reason: 'Students report it\'s too watery or diluted'
                    })
                } else if (category === 'spice') {
                    recommendations.push({
                        priority: 'medium',
                        action: `Adjust spice levels in ${dishName}`,
                        reason: 'Students find it too spicy - consider offering mild option'
                    })
                } else if (category === 'taste') {
                    recommendations.push({
                        priority: 'high',
                        action: `Improve seasoning in ${dishName}`,
                        reason: `Students report bland taste - review ${isBeverage ? 'ingredients ratio' : 'recipe'}`
                    })
                } else if (category === 'quality') {
                    recommendations.push({
                        priority: 'high',
                        action: `Review ingredient freshness for ${dishName}`,
                        reason: 'Quality concerns raised by students'
                    })
                } else if (category === 'portion') {
                    recommendations.push({
                        priority: 'medium',
                        action: `Review portion sizes for ${dishName}`,
                        reason: 'Students report small portions'
                    })
                } else if (category === 'texture') {
                    recommendations.push({
                        priority: 'medium',
                        action: `Adjust cooking method for ${dishName}`,
                        reason: `Students report texture issues (${mentions.join(', ')})`
                    })
                } else if (category === 'sweetness') {
                    recommendations.push({
                        priority: 'medium',
                        action: `Adjust sweetness level in ${dishName}`,
                        reason: 'Students report sweetness imbalance'
                    })
                }
            }
        })

        // Detect strong positive trends
        const positiveCount = POSITIVE_KEYWORDS.filter(keyword => allText.includes(keyword)).length
        if (positiveCount >= 3 && avgRating >= 4 && reviewCount >= 2) {
            insights.push({
                type: 'positive',
                dish: dishName,
                message: `💚 Students are loving ${dishName}! Positive keywords mentioned ${positiveCount} times.`,
                severity: 'low'
            })
        }
    })

    // Sort insights by severity
    insights.sort((a, b) => {
        const severityOrder = { high: 0, medium: 1, low: 2 }
        const aSeverity = a.severity || 'low'
        const bSeverity = b.severity || 'low'
        return severityOrder[aSeverity] - severityOrder[bSeverity]
    })

    // Sort recommendations by priority
    recommendations.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
    })

    // DETECT LOW DEMAND ITEMS (few reviews = low interest)
    // Get all dishes to find ones with no/few reviews
    const { data: allDishes } = await supabase
        .from('dishes')
        .select('id, name, category')

    if (allDishes) {
        const reviewedDishIds = new Set(Array.from(dishAnalysis.keys()))

        allDishes.forEach(dish => {
            const dishData = dishAnalysis.get(dish.name)
            const reviewCount = dishData ? dishData.ratings.length : 0
            const isBeverage = BEVERAGE_CATEGORIES.includes(dish.category)

            // No reviews in 7 days = very low demand
            if (reviewCount === 0) {
                insights.push({
                    type: 'neutral',
                    dish: dish.name,
                    message: `📊 ${dish.name} has received no reviews in the last 7 days. Low student interest detected.`,
                    severity: 'medium'
                })

                recommendations.push({
                    priority: 'medium',
                    action: `⬇️ Reduce ${dish.name} quantity or consider removing`,
                    reason: `No reviews in 7 days indicates very low demand. Consider replacing with more popular ${isBeverage ? 'beverages' : 'items'}.`
                })
            }
            // 1-2 reviews in 7 days = low demand
            else if (reviewCount >= 1 && reviewCount <= 2) {
                const avgRating = dishData ? dishData.ratings.reduce((a, b) => a + b, 0) / dishData.ratings.length : 0

                // Only flag if rating is also mediocre (< 4.0)
                if (avgRating < 4.0) {
                    insights.push({
                        type: 'neutral',
                        dish: dish.name,
                        message: `📊 ${dish.name} has low demand (only ${reviewCount} review${reviewCount > 1 ? 's' : ''}) with ${avgRating.toFixed(1)}★ rating.`,
                        severity: 'low'
                    })

                    recommendations.push({
                        priority: 'low',
                        action: `Consider reducing ${dish.name} preparation quantity`,
                        reason: `Low demand (${reviewCount} reviews) and mediocre rating (${avgRating.toFixed(1)}★). Not a student favorite.`
                    })
                }
            }
        })
    }

    // Limit to top insights and recommendations
    const topInsights = insights.slice(0, 5)
    const topRecommendations = recommendations.slice(0, 5)

    return {
        insights: topInsights.length > 0 ? topInsights : [{
            type: 'neutral',
            dish: 'All dishes',
            message: 'No significant patterns detected. Keep monitoring student feedback!'
        }],
        recommendations: topRecommendations.length > 0 ? topRecommendations : [{
            priority: 'low',
            action: 'Continue monitoring feedback',
            reason: 'No urgent issues detected'
        }],
        summary: {
            totalReviews,
            averageRating: Number(averageRating.toFixed(1)),
            positivePercentage
        }
    }
}
