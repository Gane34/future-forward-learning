import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Story {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  story_date: string;
}

const StoriesSection = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      const { data } = await supabase
        .from("stories")
        .select("id, title, content, image_url, story_date")
        .eq("published", true)
        .order("story_date", { ascending: false })
        .limit(6);

      if (data) setStories(data);
      setLoading(false);
    };

    fetchStories();
  }, []);

  if (loading) return null;
  if (stories.length === 0) return null;

  return (
    <section id="stories" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-accent text-secondary mb-4">
            Our Journey
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Stories of Achievement
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Milestones, breakthroughs, and proud moments from our learning community.
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {story.image_url && (
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={story.image_url}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={story.story_date}>
                    {new Date(story.story_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {story.content}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
