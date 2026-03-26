import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X, Send, Bot, User, Sparkles, ExternalLink } from "lucide-react";

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
  actionLink?: { label: string; href: string };
}

const ACADEMY_QA: { patterns: string[]; answer: string }[] = [
  {
    patterns: ["hello", "hi", "hey", "good morning", "good evening", "namaste"],
    answer:
      "Hello! 👋 Welcome to MVR AI Academy! I'm your AI tutor assistant. I can help you learn about our programs, enrollment, curriculum, and more. What would you like to know?",
  },
  {
    patterns: ["what is mvr", "about mvr", "about the academy", "what do you do", "tell me about"],
    answer:
      "MVR AI Academy is a future-forward learning center based in Wyra, Khammam, Telangana. We empower children aged 9–13 with cutting-edge skills in AI, Coding, Robotics, and Innovation. Our vision: 'A Father's Dream. A Scientist's Vision.' — bringing world-class STEM education to every child. 🚀",
  },
  {
    patterns: ["curriculum", "what do you teach", "subjects", "courses", "what we learn"],
    answer:
      "We teach 4 core areas:\n\n🤖 **AI Fundamentals** – Visual experiments & machine learning basics\n💻 **Coding & Logic** – Block-based coding to Python\n🔧 **Robotics** – Engineering, sensors & hands-on building\n💡 **Innovation Lab** – Real-world problem-solving projects\n\nWould you like details on any specific subject?",
  },
  {
    patterns: ["age", "who can join", "eligibility", "children", "kids"],
    answer:
      "Our programs are designed for children aged **9 to 13 years**. Whether your child is a complete beginner or already curious about technology, we have the right level for them! We start from Level 0 (Foundation) and go up to advanced robotics. 🌟",
  },
  {
    patterns: ["level 0", "foundation", "beginner", "starter"],
    answer:
      "Level 0 – Foundation is our beginner program! 🌱 It covers:\n• Introduction to AI concepts\n• Block-based visual coding\n• Basic robotics and sensors\n• Fun hands-on activities\n\nIt's perfect for children with no prior experience. They'll build their first robot and run their first AI experiment!",
  },
  {
    patterns: ["level 1", "robotics level", "advanced"],
    answer:
      "Level 1 – Robotics dives deeper! 🔩 Students learn:\n• Building and programming autonomous robots\n• Sensor integration (ultrasonic, IR, color)\n• Line follower and obstacle-avoidance bots\n• Introduction to Python for robotics\n\nStudents like 9-year-old Kovidha have already built line-follower robots at this level!",
  },
  {
    patterns: ["enroll", "admission", "register", "join", "how to start", "get started"],
    answer:
      "Enrolling is easy! 🎉 Here's how:\n\n1. Visit our **Get Started** page on the website\n2. Fill in your name, email, phone, and role\n3. Our team will contact you within 24 hours\n\nOr reach us directly:\n📧 muggu@mmkaisolutions.com\n📞 +91 9502952770\n\nWould you like me to guide you to the enrollment form?",
  },
  {
    patterns: ["internship", "intern", "junior ai", "ai innovator", "school internship", "student internship", "internship form", "internship registration"],
    answer:
      "🚀 Exciting! We offer the **Junior AI Innovator Internship** for school students!\n\nMentored by **Dr. Murali Krishna (PhD)** at MVR AI Robotics Academy, this program covers:\n\n🤖 AI Basics\n🔧 Robotics\n💻 Coding\n💡 Innovation Projects\n\nClick the button below to fill out the Internship Registration Form right now!",
  },
  {
    patterns: ["contact", "phone", "email", "reach", "address", "location", "where are you"],
    answer:
      "You can reach us at:\n\n📧 **Email:** muggu@mmkaisolutions.com\n📞 **Phone:** +91 9502952770\n📍 **Location:** Wyra, Khammam, Telangana – 507165, India\n\nWe're happy to answer any questions!",
  },
  {
    patterns: ["founder", "who started", "who created", "dr", "teacher"],
    answer:
      "MVR AI Academy was founded by **Dr. Murali Krishna** — a PhD researcher and passionate educator who dreamed of bringing quality AI and robotics education to children in rural India. His journey from a small village to cutting-edge research inspired him to create this academy. 🌍",
  },
  {
    patterns: ["olympiad", "exam", "test", "competition", "practice"],
    answer:
      "🏆 Exciting news! We're building an **AI-powered Olympiad & Testing platform** for MVR Academy students! It will feature:\n\n• Practice tests for AI, Coding & Robotics\n• Olympiad-level challenge problems\n• Instant AI feedback on your answers\n• Progress tracking & leaderboards\n\nThis feature is coming soon — stay tuned! 🚀",
  },
  {
    patterns: ["fee", "cost", "price", "charges", "how much", "payment"],
    answer:
      "For detailed fee information and available batches, please contact us directly:\n\n📞 +91 9502952770\n📧 muggu@mmkaisolutions.com\n\nWe believe in making quality education accessible, and we have flexible options available!",
  },
  {
    patterns: ["project", "student project", "showcase", "demo"],
    answer:
      "Our students build amazing real-world projects! 🌟\n\n🚗 **Automated Pilot Rover** – by Samath (Robotics & Automation)\n🤖 **Line Follower Robot** – by Kovidha, age 9 (Sensors & Engineering)\n\nVisit our Projects page to see all student work and get inspired!",
  },
  {
    patterns: ["thank", "thanks", "thank you", "awesome", "great", "helpful"],
    answer:
      "You're welcome! 😊 It was my pleasure helping you. If you have more questions about MVR AI Academy, feel free to ask anytime. Happy learning! 🚀✨",
  },
  {
    patterns: ["bye", "goodbye", "see you", "exit", "quit"],
    answer:
      "Goodbye! 👋 Remember — the future belongs to curious minds. Keep exploring, keep building! See you at MVR AI Academy! 🌟",
  },
];

const FALLBACK =
  "I'm not sure about that yet, but I'm learning! 😊 For detailed help, please contact us at 📞 +91 9502952770 or 📧 muggu@mmkaisolutions.com. You can also ask me about our **courses**, **enrollment**, **curriculum**, or **contact info**!";

const INTERNSHIP_PATTERNS = ["internship", "intern", "junior ai", "ai innovator", "school internship", "student internship", "internship form", "internship registration"];

function getBotReply(input: string): { text: string; actionLink?: { label: string; href: string } } {
  const lower = input.toLowerCase();
  if (INTERNSHIP_PATTERNS.some((p) => lower.includes(p))) {
    const qa = ACADEMY_QA.find((q) => q.patterns.includes("internship"))!;
    return { text: qa.answer, actionLink: { label: "Open Internship Registration Form", href: "/internship" } };
  }
  for (const qa of ACADEMY_QA) {
    if (qa.patterns.some((p) => lower.includes(p))) {
      return { text: qa.answer };
    }
  }
  return { text: FALLBACK };
}

const SUGGESTIONS = [
  "What do you teach?",
  "How do I enroll?",
  "Internship registration",
  "What age can join?",
];

export default function ChatBot() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "Hi there! 👋 I'm **Sparky**, your MVR AI Academy assistant. Ask me anything about our courses, enrollment, internship, or upcoming Olympiad platform! 🚀",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(
      () => {
        const reply = getBotReply(text);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: "bot", text: reply.text, actionLink: reply.actionLink },
        ]);
        setIsTyping(false);
      },
      700 + Math.random() * 400,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage(input);
  };

  // Render text with **bold** markdown support
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: "linear-gradient(135deg, hsl(263,90%,65%), hsl(180,100%,40%))",
          boxShadow: "0 0 20px hsl(263,90%,65%/0.5)",
        }}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{
            height: "520px",
            background: "hsl(240,10%,6%)",
            border: "1px solid hsl(263,90%,65%/0.3)",
            boxShadow: "0 0 40px hsl(263,90%,65%/0.2)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{
              background: "linear-gradient(90deg, hsl(263,90%,20%), hsl(180,100%,15%))",
              borderBottom: "1px solid hsl(263,90%,65%/0.2)",
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(263,90%,65%), hsl(180,100%,40%))" }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-none">Sparky</p>
              <p className="text-xs mt-0.5" style={{ color: "hsl(180,100%,70%)" }}>
                MVR AI Academy Assistant
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "hsl(120,100%,50%)" }}
              />
              <span className="text-xs" style={{ color: "hsl(120,100%,70%)" }}>
                Online
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: "thin" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    background:
                      msg.role === "bot"
                        ? "linear-gradient(135deg, hsl(263,90%,65%), hsl(180,100%,40%))"
                        : "hsl(240,10%,20%)",
                  }}
                >
                  {msg.role === "bot" ? (
                    <Bot className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                {/* Bubble */}
                <div
                  className="max-w-[75%] rounded-2xl text-sm leading-relaxed whitespace-pre-line overflow-hidden"
                  style={{
                    background:
                      msg.role === "bot"
                        ? "hsl(240,10%,12%)"
                        : "linear-gradient(135deg, hsl(263,90%,55%), hsl(263,90%,45%))",
                    color: "hsl(0,0%,95%)",
                    borderBottomLeftRadius: msg.role === "bot" ? "4px" : undefined,
                    borderBottomRightRadius: msg.role === "user" ? "4px" : undefined,
                    border: msg.role === "bot" ? "1px solid hsl(263,90%,65%/0.15)" : "none",
                  }}
                >
                  <div className="px-3 py-2">{renderText(msg.text)}</div>
                  {msg.actionLink && (
                    <button
                      onClick={() => { setOpen(false); navigate(msg.actionLink!.href); }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold transition-all hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg, hsl(263,90%,65%), hsl(180,100%,40%))",
                        color: "white",
                      }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {msg.actionLink.label}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div
                  className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, hsl(263,90%,65%), hsl(180,100%,40%))",
                  }}
                >
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div
                  className="px-4 py-3 rounded-2xl rounded-bl-[4px] flex gap-1.5 items-center"
                  style={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.15)" }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{
                        background: "hsl(263,90%,65%)",
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestion chips (only show if only 1 message) */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105"
                  style={{
                    background: "hsl(263,90%,65%/0.15)",
                    border: "1px solid hsl(263,90%,65%/0.3)",
                    color: "hsl(263,90%,85%)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            className="px-4 py-3 flex gap-2 items-center"
            style={{ borderTop: "1px solid hsl(263,90%,65%/0.15)" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 text-sm px-4 py-2 rounded-full outline-none"
              style={{
                background: "hsl(240,10%,12%)",
                border: "1px solid hsl(263,90%,65%/0.25)",
                color: "hsl(0,0%,95%)",
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-110 disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, hsl(263,90%,65%), hsl(180,100%,40%))",
              }}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
