export default function BlogTips() {
  const tips = [
    {
      tag: "🧊 الثلاجات",
      title: "5 علامات تنبهك أن ثلاجتك تحتاج صيانة فورية",
      excerpt:
        "كثير من الأعطال يمكن تفاديها لو انتبهت لها مبكراً. تعرف على أهم العلامات التحذيرية قبل أن يتفاقم العطل ويكلفك أكثر.",
    },
    {
      tag: "👕 الغسالات",
      title: "كيف تحافظ على غسالتك وتطيل عمرها لأكثر من 10 سنوات؟",
      excerpt:
        "بعض العادات البسيطة في الاستخدام اليومي يمكنها مضاعفة عمر غسالتك وتوفير آلاف الجنيهات في الصيانة.",
    },
    {
      tag: "❄️ الديب فريزر",
      title: "لماذا يتوقف ديب الفريزر عن التبريد؟ الأسباب والحلول",
      excerpt:
        "توقف التبريد مشكلة شائعة لها أسباب متعددة. تعرف على أكثر الأسباب شيوعاً وكيفية التعامل معها بشكل صحيح.",
    },
  ];

  return (
    <section className="section" aria-labelledby="tips-heading">
      <div className="container">
        <div className="reveal revealed" style={{ textAlign: "center" }}>
          <p className="section-label">نصائح مجانية</p>
          <h2 className="section-title" id="tips-heading">
            نصائح <span>الصيانة والاستخدام الصحيح</span>
          </h2>
        </div>

        <div className="blog-grid">
          {tips.map((tip, i) => (
            <article
              key={i}
              className={`glass-card blog-card reveal revealed delay-${i + 1}`}
            >
              <span className="blog-tag">{tip.tag}</span>
              <h3 className="blog-title">{tip.title}</h3>
              <p className="blog-excerpt">{tip.excerpt}</p>
              <a href="tel:16481" className="blog-read-more">
                اتصل لتشخيص مجاني ←
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
