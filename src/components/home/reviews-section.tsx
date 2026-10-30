import { MessageCircle, Quote, Star } from "lucide-react";
import { VoiceNotePlayer } from "@/components/home/voice-note-player";
import { REVIEWS } from "@/lib/reviews";
import { whatsappLink } from "@/lib/site";

export function ReviewsSection() {
  if (REVIEWS.length === 0) return null;

  return (
    <section id="reviews" className="section-pad scroll-mt-16">
      <div className="container-ng">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Customer Reviews</p>
          <h2 className="heading-section mt-3">What our customers say</h2>
          <p className="body-muted mt-3 text-sm sm:text-base">
            Real feedback and voice notes from people who eat NutriGhar meals.
          </p>
        </div>

        {/* Phone: swipe sideways. Bigger screens: a grid. */}
        <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <figure
              key={`${review.name}-${i}`}
              className="card-ng flex w-[19rem] shrink-0 snap-start flex-col p-5 sm:w-auto sm:p-6"
            >
              <Quote className="h-6 w-6 text-ng-soft" aria-hidden="true" />
              {review.rating ? (
                <div className="mt-3 flex gap-0.5" role="img" aria-label={`${review.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className={`h-4 w-4 ${n <= review.rating! ? "fill-amber-400 text-amber-400" : "text-ng-line"}`}
                    />
                  ))}
                </div>
              ) : null}
              {review.text ? (
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ng-ink">{review.text}</blockquote>
              ) : (
                <div className="flex-1" />
              )}
              {review.audio ? (
                <VoiceNotePlayer
                  src={review.audio}
                  label={`Voice note from ${review.name}`}
                  className="mt-4"
                />
              ) : null}
              <figcaption className="mt-4 border-t border-ng-line/60 pt-3">
                <p className="text-sm font-semibold text-ng-forest">{review.name}</p>
                <p className="text-xs text-ng-muted">{[review.plan, review.city].filter(Boolean).join(" · ")}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        {REVIEWS.length > 1 ? (
          <p className="mt-2 text-center text-xs text-ng-muted sm:hidden">Swipe to see more →</p>
        ) : null}

        <div className="mt-8 text-center">
          <a
            href={whatsappLink("Hi NutriGhar! I'd like to share my feedback.")}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary inline-flex min-h-12 w-full touch-manipulation items-center justify-center sm:w-auto"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Share your feedback or send a voice note
          </a>
        </div>
      </div>
    </section>
  );
}
