const addons = [
  { emoji: "🎭", title: "Entertainment", items: "DJ • Magic • Puppet • Live Singer" },
  { emoji: "🎨", title: "Kids Activities", items: "Slime • Nail Art • Tattoo • DIY" },
  { emoji: "🎂", title: "Cakes & Gifts", items: "Theme cakes • Return gifts" },
  { emoji: "🎈", title: "Decoration", items: "Balloons • Flowers • Themes" },
  { emoji: "🍽️", title: "Catering", items: "Snacks • Mains • Desserts" },
  { emoji: "🪔", title: "Puja Essentials", items: "Pandit ji • Samagri • Prasad" },
];

export const AddOns = () => (
  <section className="py-20 md:py-28 bg-gradient-warm" id="alacarte">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.2em] text-rose font-semibold mb-3">Customize your celebration</p>
          <h2 className="font-display text-3xl md:text-5xl">Make it yours with add-ons</h2>
        </div>
        <p className="text-muted-foreground md:max-w-xs">Mix, match and personalize every detail of your event.</p>
      </div>

      <div className="flex gap-4 md:gap-5 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x">
        {addons.map(a => (
          <div key={a.title} className="snap-start shrink-0 w-64 md:w-72 bg-card rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all cursor-pointer">
            <div className="text-4xl mb-3">{a.emoji}</div>
            <h3 className="font-display text-xl mb-2">{a.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{a.items}</p>
            <span className="text-rose text-sm font-semibold">Add to celebration →</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
