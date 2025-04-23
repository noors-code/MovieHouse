import { useRouter } from 'next/router';

const HelpPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const helpData = {
    faqs: {
      title: "Frequently Asked Questions",
      content: [
        { question: "What is Movie House?", answer: "Movie House is an app to explore movies, genres, and directors." },
        { question: "How do I browse movies?", answer: "You can browse movies by genre or search for a specific movie." },
      ],
    },
    contact: {
      title: "Contact Us",
      content: [
        { method: "Email", info: "support@moviehouse.com" },
        { method: "Phone", info: "+1 234 567 890" },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      content: [
        { section: "Data Collection", details: "We collect basic user data to improve your experience." },
        { section: "Data Usage", details: "Your data is used to personalize your recommendations." },
      ],
    },
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ textAlign: 'center', color: '#1e40af' }}>📘 Help Center</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem', fontStyle: 'italic' }}>
        Current Path: <code>/help{slug ? '/' + slug.join('/') : ''}</code>
      </p>

      {slug ? (
        <div>
          <h2 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>
            🔍 Information about: <em>{slug.join(' > ')}</em>
          </h2>

          {helpData[slug[0]] ? (
            <div>
              <h3 style={{ marginBottom: '1rem' }}>{helpData[slug[0]].title}</h3>
              {helpData[slug[0]].content.map((item, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                  {item.question && (
                    <p><strong>❓ {item.question}</strong><br />{item.answer}</p>
                  )}
                  {item.method && (
                    <p><strong>📞 {item.method}:</strong> {item.info}</p>
                  )}
                  {item.section && (
                    <p><strong>🔐 {item.section}:</strong> {item.details}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'red' }}>⚠️ No information available for this section.</p>
          )}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>
          Welcome to the help section. Please choose a topic: <strong>FAQs</strong>, <strong>Contact</strong>, or <strong>Privacy</strong>.
        </p>
      )}
    </div>
  );
};

export default HelpPage;
