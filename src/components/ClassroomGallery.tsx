import { motion } from "framer-motion";
import { Camera, ImageIcon } from "lucide-react";
import childCoding from "@/assets/child-coding.jpg";
import childrenRobotics from "@/assets/children-robotics.jpg";
import heroImage from "@/assets/hero-children-learning.jpg";
import studentPresenting from "@/assets/student-presenting.jpg";

const photos = [
  { src: childCoding,       alt: "Student learning coding at MVR AI Robotics Academy",     caption: "Coding Session",       span: "col-span-1 row-span-1" },
  { src: heroImage,         alt: "Children learning AI at MVR AI Robotics Academy",         caption: "AI Learning",          span: "col-span-1 row-span-2" },
  { src: childrenRobotics,  alt: "Robotics hands-on activity at MVR AI Robotics Academy",   caption: "Robotics Activity",    span: "col-span-1 row-span-1" },
  { src: studentPresenting, alt: "Student presenting project at MVR AI Robotics Academy",   caption: "Student Presentation", span: "col-span-1 row-span-1" },
];

const ClassroomGallery = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-label mb-5 inline-flex">
            <Camera className="w-3.5 h-3.5" />
            Inside Our Classroom
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            A Space Built for<br />
            <span className="text-gradient">Curious Minds</span>
          </h2>
          <p className="text-white/45 font-light max-w-xl mx-auto text-base leading-relaxed">
            A warm, practical, and future-focused learning space designed to help children
            feel comfortable, curious, and confident.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ gridTemplateRows: "auto" }}
        >
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative overflow-hidden rounded-2xl border border-white/[0.08] group ${i === 1 ? "row-span-2" : ""}`}
              style={{ minHeight: i === 1 ? "340px" : "180px" }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: "inherit" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {photo.caption}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Placeholder slot for future photos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center"
            style={{ minHeight: "180px" }}
          >
            <div className="text-center p-6">
              <ImageIcon className="w-8 h-8 text-white/15 mx-auto mb-2" />
              <p className="text-xs text-white/20 font-light">More photos coming soon</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/25 text-sm font-light italic mt-8"
        >
          We are building a learning space where children can see, think, build, speak, and grow with confidence.
        </motion.p>
      </div>
    </section>
  );
};

export default ClassroomGallery;
