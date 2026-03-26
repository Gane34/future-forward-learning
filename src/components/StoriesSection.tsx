import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";
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

  const featured = stories[0];
  const rest = stories.slice(1);

  return (
    <section id="stories" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4"
        >
          <div>
            <span className="section-label mb-5 inline-flex">Our Journey</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Stories of{" "}
              <span className="text-gradient">Achievement</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light md:text-right">
            Milestones, breakthroughs, and proud moments from our learning community.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Featured (large) */}
          <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 group rounded-3xl overflow-hidden bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.14] transition-all duration-500 hover:-translate-y-1"
          >
            {featured.image_url && (
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src={featured.image_url}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060F]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/50 bg-white/10 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                    Featured Story
                  </span>
                </div>
              </div>
            )}
            <div className="p-7">
              <div className="flex items-center gap-2 text-xs text-white/35 mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={featured.story_date}>
                  {new Date(featured.story_date).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </time>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300 leading-snug">
                {featured.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed font-light line-clamp-3">
                {featured.content}
              </p>
            </div>
          </motion.article>

          {/* Secondary stories */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {rest.slice(0, 3).map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.14] hover:bg-white/[0.04] transition-all duration-400 cursor-default"
              >
                {story.image_url && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={story.image_url}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] text-white/30 mb-2">
                    <Calendar className="w-3 h-3" />
                    <time dateTime={story.story_date}>
                      {new Date(story.story_date).toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric",
                      })}
                    </time>
                  </div>
                  <h3 className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors leading-snug line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-xs text-white/35 mt-1.5 line-clamp-2 font-light">
                    {story.content}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 shrink-0 mt-1 transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200" />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
