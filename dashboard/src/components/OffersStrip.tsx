export default function OffersStrip() {
  const offers = [
    { text: "خصم 30% على تكلفة المصنعية عند الاتصال الأول" },
    { text: "خصم 15% للعملاء القدامى على جميع الخدمات" },
    { text: "3 ساعات أقصى وقت انتظار لوصول مهندس الصيانة" },
    { text: "ضمان على جميع قطع الغيار والأعمال المنجزة" },
  ];

  return (
    <section className="offers-strip" aria-label="العروض">
      <div className="offers-track">
        {[...offers, ...offers].map((offer, i) => (
          <span key={i} className="offer-item">
            <span className="offer-badge">{offer.text}</span>
            <span className="offer-divider">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
