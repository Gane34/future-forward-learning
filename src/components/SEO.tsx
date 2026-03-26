import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogImageAlt?: string;
    ogUrl?: string;
    ogType?: string;
    twitterCard?: string;
    canonicalUrl?: string;
    structuredData?: object;
    noIndex?: boolean;
}

const SEO = ({
    title = "MVR AI & Robotics Academy — AI & Robotics Education for Children",
    description = "Future-ready AI, robotics, and coding education for children aged 9–13. Project-based learning that builds confidence, creativity, and logical thinking.",
    keywords = "AI education, robotics for kids, coding for children, STEM education, project-based learning, artificial intelligence courses, robotics classes, programming for kids",
    ogImage = "/og-image.jpg",
    ogImageAlt = "MVR AI & Robotics Academy – AI & Robotics Education for Children",
    ogUrl = "https://mmkaisolutions.com",
    ogType = "website",
    twitterCard = "summary_large_image",
    canonicalUrl,
    structuredData,
    noIndex = false,
}: SEOProps) => {
    const fullTitle = title.includes('MVR AI & Robotics Academy') ? title : `${title} — MVR AI & Robotics Academy`;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `https://mmkaisolutions.com${ogImage}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="MVR AI & Robotics Academy" />

            {/* Robots */}
            <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
            <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />

            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Open Graph Tags */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:image" content={fullOgImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={ogImageAlt} />
            <meta property="og:site_name" content="MVR AI & Robotics Academy" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullOgImage} />
            <meta name="twitter:image:alt" content={ogImageAlt} />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
