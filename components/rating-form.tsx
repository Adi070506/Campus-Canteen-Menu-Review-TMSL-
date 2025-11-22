'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Star } from 'lucide-react'
import { submitRating } from '@/app/actions/rating'
import { toast } from 'sonner'

const TAGS = ['Too Oily', 'Spicy', 'Cold', 'Fresh', 'Tasty', 'Good Portion', 'Overpriced']

export function RatingForm({ dishId }: { dishId: string }) {
    const [rating, setRating] = useState(0)
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag))
        } else {
            setSelectedTags([...selectedTags, tag])
        }
    }

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true)
        try {
            formData.append('rating', rating.toString())
            selectedTags.forEach(tag => formData.append('tags', tag))
            formData.append('dishId', dishId)

            await submitRating(formData)
            toast.success('Rating submitted successfully!')
        } catch (error) {
            toast.error('Failed to submit rating. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label>Your Rating</Label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`p-1 transition-colors ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                        >
                            <Star className="w-8 h-8 fill-current" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <Label>Quick Tags</Label>
                <div className="flex flex-wrap gap-2">
                    {TAGS.map(tag => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1 rounded-full text-sm border transition-colors ${selectedTags.includes(tag)
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-background hover:bg-muted'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="comment">Comments (Optional)</Label>
                <Textarea
                    id="comment"
                    name="comment"
                    placeholder="Tell us what you liked or didn't like..."
                    className="resize-none"
                />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || rating === 0}>
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
        </form>
    )
}
