import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, Mail } from "lucide-react";
import { ReviewModal } from "./ReviewModal";
import { ContactModal } from "./ContactModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  rating: number;
  content: string;
  author_name: string;
  created_at: string;
}

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setReviews(data);
    };

    fetchReviews();
  }, []);

  // Create duplicated reviews array for infinite scroll
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-secondary to-[#0A0A0A] overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-0 animate-fade-in">
            Отзывы наших студентов
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => setIsReviewModalOpen(true)}
              className="flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Оставить отзыв
            </Button>
            <Button
              onClick={() => setIsContactModalOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Написать директору
            </Button>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div 
            className="flex gap-6"
            style={{
              animation: `slide ${isMobile ? 10 : 30}s linear infinite`,
              width: "fit-content"
            }}
          >
            {duplicatedReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-shrink-0 w-[300px] md:w-[400px] p-6 rounded-2xl bg-secondary-hover border border-white/10"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">{review.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>{review.author_name}</span>
                  <span>{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <style>
        {`
          @keyframes slide {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-33.33%);
            }
          }
        `}
      </style>
    </section>
  );
};