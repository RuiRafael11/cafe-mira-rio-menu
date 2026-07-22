"use client";

import { useEffect, useRef, useState } from "react";

type Language = "pt" | "en";

const bolaData = [
  {
    image: "/images/bola-mista-real.webp",
    name: { pt: "Mista", en: "Mixed meats" },
    alt: { pt: "Bôla mista cortada em porções", en: "Mixed-meat bôla cut into portions" },
    description: {
      pt: "Massa dourada com um recheio generoso de enchidos, preparada com o sabor caseiro que distingue o Mira Rio.",
      en: "Golden dough with a generous cured-meat filling, made with the homemade flavour that sets Mira Rio apart.",
    },
    ingredients: { pt: "Salpicão, chouriço e bacon", en: "Salpicão cured sausage, chorizo and bacon" },
    availability: { pt: "Diariamente · por fornadas", en: "Daily · baked in batches" },
    note: { pt: "Preparada em diferentes momentos ao longo do dia.", en: "Fresh batches are prepared throughout the day." },
  },
  {
    image: "/images/bola-frango-real.webp",
    name: { pt: "Frango", en: "Chicken" },
    alt: { pt: "Bôla de frango cortada em porções", en: "Chicken bôla cut into portions" },
    description: {
      pt: "Uma versão reconfortante, recheada com frango e um refogado de cebola, sempre com o mesmo espírito caseiro.",
      en: "A comforting version filled with chicken and slow-cooked onion, always made with the same homemade spirit.",
    },
    ingredients: { pt: "Frango e refogado de cebola", en: "Chicken and slow-cooked onion" },
    availability: { pt: "Diariamente · por fornadas", en: "Daily · baked in batches" },
    note: { pt: "Preparada em diferentes momentos ao longo do dia.", en: "Fresh batches are prepared throughout the day." },
  },
  {
    image: "/images/bola-bacalhau-real.webp",
    name: { pt: "Bacalhau", en: "Codfish" },
    alt: { pt: "Bôla de bacalhau cortada em porções", en: "Codfish bôla cut into portions" },
    description: {
      pt: "Bacalhau em lascas com refogado de cebola, envolvido pela massa dourada da casa.",
      en: "Flaked codfish with slow-cooked onion, wrapped in our golden house dough.",
    },
    ingredients: { pt: "Bacalhau e refogado de cebola", en: "Codfish and slow-cooked onion" },
    availability: { pt: "Apenas por encomenda", en: "Pre-order only" },
    note: { pt: "Encomenda com pelo menos 1 hora de antecedência, sujeita a disponibilidade.", en: "Order at least 1 hour in advance, subject to availability." },
  },
];

const categories = {
  pt: [
    { id: "cafetaria", index: "01", title: "Cafetaria", items: [["Café", "0,90 €"], ["Descafeinado", "0,90 €"], ["Carioca", "0,80 €"], ["Pingo", "0,90 €"], ["Meia de leite", "1,20 €"], ["Galão", "1,20 €"], ["Cevada", "0,80 €"], ["Chá", "1,00 €"], ["Copo de leite", "0,50 €"], ["Cappuccino", "1,50 €"], ["Café com cheirinho", "1,00 €"], ["Leite achocolatado Agros", "1,00 €"], ["Leite achocolatado UCAL", "1,30 €"], ["Cacaolat garrafa", "1,00 €"], ["Cacaolat pacote", "0,75 €"]] },
    { id: "pastelaria", index: "02", title: "Pastelaria & snacks", items: [["Pastel de nata", "0,80 €"], ["Torrada", "1,30 €"], ["Meia torrada", "0,80 €"], ["Folhado misto", "1,30 €"], ["Folhado de creme", "1,30 €"], ["Croissant de fiambre", "1,80 €"], ["Tosta mista", "2,50 €"], ["Sandes de fiambre", "1,30 €"], ["Sandes de queijo", "1,30 €"], ["Sandes mista", "1,80 €"], ["Sandes de presunto", "3,50 €"], ["Pão com chouriço", "1,50 €"], ["Chamuça", "1,00 €"], ["Rissol de leitão", "1,00 €"], ["Rissóis", "0,80 €"], ["Pastel de bacalhau", "0,60 €"], ["Cachorrinho", "1,00 €"], ["Pão com manteiga", "0,50 €"], ["Bollycao", "1,10 €"], ["Chipicao", "1,40 €"], ["Amendoim", "1,00 €"], ["Tremoços", "0,80 €"], ["Pizza inteira", "12,50 €"], ["Fatia de pizza", "1,50 €"]] },
    { id: "bebidas", index: "03", title: "Refrigerantes & águas", items: [["Compal", "1,50 €"], ["Santal", "1,50 €"], ["Coca-Cola garrafa", "1,50 €"], ["Coca-Cola lata", "1,50 €"], ["Coca-Cola 0,50 L", "1,80 €"], ["7UP garrafa", "1,30 €"], ["7UP lata", "1,50 €"], ["Pepsi", "1,50 €"], ["Fanta", "1,50 €"], ["Sumol 0,33 L", "1,30 €"], ["Trina", "1,50 €"], ["Fuze Tea", "1,50 €"], ["Lipton Ice Tea", "1,50 €"], ["Lipton Chá Verde", "1,60 €"], ["Frize sabores", "1,20 €"], ["Luso sabores", "1,30 €"], ["Ginger Ale", "1,50 €"], ["Água tónica", "1,50 €"], ["Red Bull", "2,00 €"], ["Monster", "2,00 €"], ["Água sem gás 0,33 L", "0,80 €"], ["Água sem gás 0,50 L", "1,00 €"], ["Água sem gás 1,50 L", "1,50 €"], ["Água das Pedras", "1,00 €"], ["Pedras Sabores", "1,20 €"]] },
    { id: "cervejas", index: "04", title: "Cervejas & sidras", items: [["Fino", "1,20 €"], ["Príncipe 0,33 L", "2,00 €"], ["Caneca de cerveja", "2,50 €"], ["Super Bock 0,20 L", "1,10 €"], ["Super Bock 0,33 L", "1,30 €"], ["Super Bock Stout", "1,30 €"], ["Mini Super Bock", "1,20 €"], ["Sagres 0,20 L", "1,10 €"], ["Sagres 0,33 L", "1,30 €"], ["Cristal 0,20 L", "0,80 €"], ["Cristal 0,33 L", "1,00 €"], ["Heineken", "1,30 €"], ["Carlsberg", "1,20 €"], ["Somersby", "2,00 €"]] },
    { id: "vinhos", index: "05", title: "Vinhos & aperitivos", items: [["Taça de vinho", "0,60 €"], ["Copo de vinho", "1,20 €"], ["Caneca de vinho", "3,50 €"], ["Croft · vinho do Porto", "1,50 €"], ["Vinho Claustru’s", "6,00 €"], ["Vinho Cotto Tinto", "8,50 €"], ["Casal Garcia", "6,00 €"], ["Espumante", "10,00 €"], ["Vinho Verde", "7,50 €"], ["Vinho Verde Felgueiras", "6,50 €"], ["Vinho Rede", "7,00 €"]] },
    { id: "espirituosas", index: "06", title: "Espirituosas & cocktails", items: [["Licor Beirão", "3,50 €"], ["Vodka", "3,50 €"], ["Macieira", "1,50 €"], ["Bushmills", "4,00 €"], ["CRF", "3,50 €"], ["Amêndoa amarga", "2,50 €"], ["Gin Nordés", "6,50 €"], ["Baileys", "3,50 €"], ["Jameson", "4,00 €"], ["Ponche", "2,00 €"], ["Jack Daniel’s", "5,50 €"], ["Red Label", "3,00 €"], ["William Lawson’s", "3,00 €"], ["Sourz", "3,00 €"], ["Absolut Sprite", "3,50 €"], ["Bacardi Coca-Cola", "3,50 €"], ["Porto tónico", "4,50 €"], ["Gin Bombay", "4,50 €"], ["Gin Gordon Pink", "5,50 €"], ["Gin Hendrick’s", "8,50 €"]] },
  ],
  en: [
    { id: "cafetaria", index: "01", title: "Coffee", items: [["Espresso", "0,90 €"], ["Decaf", "0,90 €"], ["Carioca coffee", "0,80 €"], ["Espresso with a dash of milk", "0,90 €"], ["Milky coffee", "1,20 €"], ["Galão · Portuguese latte", "1,20 €"], ["Barley coffee", "0,80 €"], ["Tea", "1,00 €"], ["Glass of milk", "0,50 €"], ["Cappuccino", "1,50 €"], ["Espresso with a dash of brandy", "1,00 €"], ["Agros chocolate milk", "1,00 €"], ["UCAL chocolate milk", "1,30 €"], ["Cacaolat bottle", "1,00 €"], ["Cacaolat carton", "0,75 €"]] },
    { id: "pastelaria", index: "02", title: "Pastries & snacks", items: [["Pastel de nata · custard tart", "0,80 €"], ["Toast", "1,30 €"], ["Half toast", "0,80 €"], ["Ham & cheese pastry", "1,30 €"], ["Cream pastry", "1,30 €"], ["Ham croissant", "1,80 €"], ["Ham & cheese toastie", "2,50 €"], ["Ham sandwich", "1,30 €"], ["Cheese sandwich", "1,30 €"], ["Ham & cheese sandwich", "1,80 €"], ["Cured ham sandwich", "3,50 €"], ["Chorizo bread", "1,50 €"], ["Samosa", "1,00 €"], ["Suckling pig rissole", "1,00 €"], ["Rissoles", "0,80 €"], ["Codfish cake", "0,60 €"], ["Mini hot dog", "1,00 €"], ["Bread with butter", "0,50 €"], ["Bollycao", "1,10 €"], ["Chipicao", "1,40 €"], ["Peanuts", "1,00 €"], ["Lupin beans", "0,80 €"], ["Whole pizza", "12,50 €"], ["Pizza slice", "1,50 €"]] },
    { id: "bebidas", index: "03", title: "Soft drinks & water", items: [["Compal juice", "1,50 €"], ["Santal juice", "1,50 €"], ["Coca-Cola bottle", "1,50 €"], ["Coca-Cola can", "1,50 €"], ["Coca-Cola 0.50 L", "1,80 €"], ["7UP bottle", "1,30 €"], ["7UP can", "1,50 €"], ["Pepsi", "1,50 €"], ["Fanta", "1,50 €"], ["Sumol 0.33 L", "1,30 €"], ["Trina", "1,50 €"], ["Fuze Tea", "1,50 €"], ["Lipton Ice Tea", "1,50 €"], ["Lipton Green Tea", "1,60 €"], ["Flavoured Frize", "1,20 €"], ["Flavoured Luso", "1,30 €"], ["Ginger Ale", "1,50 €"], ["Tonic water", "1,50 €"], ["Red Bull", "2,00 €"], ["Monster", "2,00 €"], ["Still water 0.33 L", "0,80 €"], ["Still water 0.50 L", "1,00 €"], ["Still water 1.50 L", "1,50 €"], ["Água das Pedras", "1,00 €"], ["Flavoured Pedras", "1,20 €"]] },
    { id: "cervejas", index: "04", title: "Beer & cider", items: [["Fino · small draught beer", "1,20 €"], ["Príncipe · 0.33 L draught beer", "2,00 €"], ["Beer mug", "2,50 €"], ["Super Bock 0.20 L", "1,10 €"], ["Super Bock 0.33 L", "1,30 €"], ["Super Bock Stout", "1,30 €"], ["Mini Super Bock", "1,20 €"], ["Sagres 0.20 L", "1,10 €"], ["Sagres 0.33 L", "1,30 €"], ["Cristal 0.20 L", "0,80 €"], ["Cristal 0.33 L", "1,00 €"], ["Heineken", "1,30 €"], ["Carlsberg", "1,20 €"], ["Somersby cider", "2,00 €"]] },
    { id: "vinhos", index: "05", title: "Wine & aperitifs", items: [["Small glass of wine", "0,60 €"], ["Glass of wine", "1,20 €"], ["Wine jug", "3,50 €"], ["Croft · Port wine", "1,50 €"], ["Claustru’s wine", "6,00 €"], ["Cotto red wine", "8,50 €"], ["Casal Garcia", "6,00 €"], ["Sparkling wine", "10,00 €"], ["Vinho Verde", "7,50 €"], ["Felgueiras Vinho Verde", "6,50 €"], ["Rede wine", "7,00 €"]] },
    { id: "espirituosas", index: "06", title: "Spirits & cocktails", items: [["Licor Beirão", "3,50 €"], ["Vodka", "3,50 €"], ["Macieira brandy", "1,50 €"], ["Bushmills", "4,00 €"], ["CRF brandy", "3,50 €"], ["Bitter almond liqueur", "2,50 €"], ["Nordés gin", "6,50 €"], ["Baileys", "3,50 €"], ["Jameson", "4,00 €"], ["Ponche", "2,00 €"], ["Jack Daniel’s", "5,50 €"], ["Red Label", "3,00 €"], ["William Lawson’s", "3,00 €"], ["Sourz", "3,00 €"], ["Absolut Sprite", "3,50 €"], ["Bacardi Coca-Cola", "3,50 €"], ["Port tonic", "4,50 €"], ["Bombay gin", "4,50 €"], ["Gordon’s Pink gin", "5,50 €"], ["Hendrick’s gin", "8,50 €"]] },
  ],
};

const copy = {
  pt: {
    prototype: "Menu digital · Café Mira Rio", viewMenu: "Ver menu", place: "Mesão Frio · Douro",
    heroFirst: "A melhor", heroSecond: "Bôla", heroText: "A especialidade da casa, preparada regularmente ao longo do dia. Simples, generosa e feita para partilhar.",
    discover: "Conhecer as nossas bôlas", freshTop: "Feita", freshBottom: "ao longo\ndo dia",
    navBolas: "Bôlas", navMenus: "Menus", navCoffee: "Cafetaria", navDrinks: "Bebidas",
    introKicker: "A especialidade do Mira Rio", introTitle: "Uma paragem com sabor a", introEm: "casa.", introText: "No Café Mira Rio, a bôla não é apenas mais um produto da montra. É aquilo que nos distingue — preparada em diferentes momentos do dia para chegar fresca à mesa.",
    signatureKicker: "A nossa assinatura", signatureTitle: "As Bôlas", signatureEm: "da Casa", batches: "Preparadas por fornadas", chooseBola: "Escolher uma variedade de bôla", previous: "Bôla anterior", next: "Bôla seguinte", availability: "Disponibilidade", ingredients: "Ingredientes principais",
    slice: "Fatia", half: "Meia bôla", whole: "Inteira",
    orderKicker: "Encomendas", orderTitle: "Queres uma bôla inteira?", orderText: "Liga com pelo menos 1 hora de antecedência. As encomendas estão sujeitas a disponibilidade.", call: "Ligar para encomendar",
    combosKicker: "Boas combinações", combosTitle: "Menus para qualquer", combosEm: "pausa", combosText: "Combinações simples e rápidas para qualquer momento.", sweet: "Menu doce", classic: "Clássico", house: "Especial da casa", nataCompal: "Nata + Compal", coffeeNata: "Café + Nata", sliceCompal: "Fatia + Compal",
    menuKicker: "Escolhe o que te apetece", menuTitle: "O nosso", menuEm: "menu", menuLead: "Desliza pelas categorias e encontra a tua próxima pausa.",
    visitKicker: "Vem visitar-nos", visitTitle: "Uma mesa com vista para o", visitEm: "Douro.", visitText: "Um espaço informal e familiar à entrada de Mesão Frio, com esplanada e uma vista privilegiada sobre o vale.", viewCaption: "O rio junto ao Mira Rio", address: "Morada", phone: "Telefone", hours: "Horário", everyDay: "Todos os dias · 08:00 — 01:00", map: "Abrir no mapa", back: "Voltar ao início", footer: "A melhor Bôla",
  },
  en: {
    prototype: "Digital menu · Café Mira Rio", viewMenu: "View menu", place: "Mesão Frio · Douro Valley",
    heroFirst: "The best", heroSecond: "Bôla", heroText: "Our house speciality, prepared regularly throughout the day. Simple, generous and made to share.",
    discover: "Discover our bôlas", freshTop: "Made", freshBottom: "throughout\nthe day",
    navBolas: "Bôlas", navMenus: "Combos", navCoffee: "Coffee", navDrinks: "Drinks",
    introKicker: "The Mira Rio speciality", introTitle: "A stop that tastes like", introEm: "home.", introText: "At Café Mira Rio, bôla is much more than another pastry in the display. It is what sets us apart — prepared throughout the day so it reaches your table fresh.",
    signatureKicker: "Our signature", signatureTitle: "Our house", signatureEm: "Bôlas", batches: "Freshly baked in batches", chooseBola: "Choose a bôla variety", previous: "Previous bôla", next: "Next bôla", availability: "Availability", ingredients: "Main ingredients",
    slice: "Slice", half: "Half bôla", whole: "Whole bôla",
    orderKicker: "Pre-orders", orderTitle: "Would you like a whole bôla?", orderText: "Call us at least 1 hour in advance. All orders are subject to availability.", call: "Call to order",
    combosKicker: "Perfect pairings", combosTitle: "Combos for every", combosEm: "break", combosText: "Simple, quick combinations for any moment.", sweet: "Sweet combo", classic: "Classic", house: "House speciality", nataCompal: "Custard tart + Compal", coffeeNata: "Espresso + custard tart", sliceCompal: "Bôla slice + Compal",
    menuKicker: "Choose what you fancy", menuTitle: "Our", menuEm: "menu", menuLead: "Browse the categories and find your next treat.",
    visitKicker: "Come and visit", visitTitle: "A table overlooking the", visitEm: "Douro.", visitText: "A relaxed, family-friendly café at the entrance to Mesão Frio, with outdoor seating and a privileged view over the valley.", viewCaption: "The river beside Mira Rio", address: "Address", phone: "Phone", hours: "Opening hours", everyDay: "Every day · 08:00 — 01:00", map: "Open in Maps", back: "Back to top", footer: "The best Bôla",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("pt");
  const [activeBola, setActiveBola] = useState(0);
  const touchStart = useRef<number | null>(null);
  const t = copy[language];
  const bola = bolaData[activeBola];
  const prices = [[t.slice, "1,30 €"], [t.half, "7,00 €"], [t.whole, "13,50 €"]];

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  function changeBola(direction: number) {
    setActiveBola((current) => (current + direction + bolaData.length) % bolaData.length);
  }

  return (
    <main id="inicio">
      <div className="prototype">{t.prototype}</div>

      <section className="hero">
        <header>
          <a href="#inicio" aria-label="Café Mira Rio"><img className="logo" src="/images/mira-rio-logo.png" alt="Café Mira Rio" /></a>
          <div className="header-actions">
            <div className="language-toggle" role="group" aria-label="Language / Idioma">
              <button type="button" aria-pressed={language === "pt"} onClick={() => setLanguage("pt")}>PT</button>
              <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
            </div>
            <a className="ghost-button" href="#menu">{t.viewMenu}</a>
          </div>
        </header>
        <div className="hero-copy">
          <p className="kicker">{t.place}</p>
          <h1>{t.heroFirst}<br /><em>{t.heroSecond}</em></h1>
          <p>{t.heroText}</p>
          <a className="cta" href="#bolas">{t.discover} <span>↓</span></a>
        </div>
        <div className="fresh"><i>{t.freshTop}</i><b>{t.freshBottom.split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</b></div>
      </section>

      <nav className="sticky-nav" aria-label="Categories"><a href="#bolas">✦ <span>{t.navBolas}</span></a><a href="#combos">＋ <span>{t.navMenus}</span></a><a href="#cafetaria">☕ <span>{t.navCoffee}</span></a><a href="#bebidas">◉ <span>{t.navDrinks}</span></a></nav>

      <section className="intro shell">
        <p className="kicker rust">{t.introKicker}</p>
        <div><h2>{t.introTitle}<br /><em>{t.introEm}</em></h2><p>{t.introText}</p></div>
      </section>

      <section className="bolas" id="bolas">
        <div className="shell">
          <div className="heading"><div><p className="kicker rust">{t.signatureKicker}</p><h2>{t.signatureTitle} <em>{t.signatureEm}</em></h2></div><span className="pill">{t.batches}</span></div>
          <div className="bola-tabs" role="tablist" aria-label={t.chooseBola}>
            {bolaData.map((slide, index) => <button key={slide.name.pt} type="button" role="tab" aria-selected={activeBola === index} onClick={() => setActiveBola(index)}><span>0{index + 1}</span>{slide.name[language]}</button>)}
          </div>
          <article className="signature" key={`${bola.name.pt}-${language}`} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 45) changeBola(distance > 0 ? -1 : 1); touchStart.current = null; }}>
            <div className="signature-image"><img src={bola.image} alt={bola.alt[language]} /><button type="button" className="slide-arrow previous" onClick={() => changeBola(-1)} aria-label={t.previous}>←</button><button type="button" className="slide-arrow next" onClick={() => changeBola(1)} aria-label={t.next}>→</button></div>
            <div className="signature-copy"><span className="tiny-index">0{activeBola + 1} / 03</span><h3 aria-live="polite">{bola.name[language]}</h3><p>{bola.description[language]}</p><div className="ingredients"><span>{t.ingredients}</span><b>{bola.ingredients[language]}</b></div><div className="availability"><span>{t.availability}</span><b>{bola.availability[language]}</b></div><ul>{prices.map(([size, price]) => <li key={size}><span>{size}</span><b>{price}</b></li>)}</ul><small>{bola.note[language]}</small></div>
          </article>
          <aside className="order-box"><div><p className="kicker">{t.orderKicker}</p><h3>{t.orderTitle}</h3><p>{t.orderText}</p></div><a href="tel:+351254891332"><span>{t.call}</span><b>254 891 332</b></a></aside>
        </div>
      </section>

      <section className="combos shell" id="combos">
        <div className="heading"><div><p className="kicker rust">{t.combosKicker}</p><h2>{t.combosTitle} <em>{t.combosEm}</em></h2></div><p>{t.combosText}</p></div>
        <div className="cards"><article className="combo red"><span>☀</span><div><small>{t.sweet}</small><h3>{t.nataCompal}</h3><p>0,80 € + 1,50 €</p><b>2,30 €</b></div></article><article className="combo cream"><span>☕</span><div><small>{t.classic}</small><h3>{t.coffeeNata}</h3><p>0,90 € + 0,80 €</p><b>1,70 €</b></div></article><article className="combo photo"><img src="/images/bola-inteira.webp" alt="Bôla" /><div><small>{t.house}</small><h3>{t.sliceCompal}</h3><p>1,30 € + 1,50 €</p><b>2,80 €</b></div></article></div>
      </section>

      <section className="menu" id="menu">
        <div className="shell">
          <p className="kicker gold">{t.menuKicker}</p>
          <h2>{t.menuTitle} <em>{t.menuEm}</em></h2>
          <p className="menu-lead">{t.menuLead}</p>
          <nav className="category-chips" aria-label={language === "pt" ? "Categorias do menu" : "Menu categories"}>
            {categories[language].map((category) => <a href={`#${category.id}`} key={category.id}>{category.title}</a>)}
          </nav>
          <div className="menu-grid">
            {categories[language].map((category) => <article id={category.id} key={category.id}><div className="menu-title"><span>{category.index}</span><h3>{category.title}</h3></div>{category.items.map(([name, price]) => <div className="menu-row" key={name}><span>{name}</span><i /><b>{price}</b></div>)}</article>)}
          </div>
        </div>
      </section>

      <section className="visit shell"><figure className="view-photo"><img src="/images/vista-rio-ponte.webp" alt={language === "pt" ? "Rio e ponte junto ao Café Mira Rio" : "River and footbridge beside Café Mira Rio"} /><img className="interior-inset" src="/images/cafe-interior.webp" alt={language === "pt" ? "Interior do Café Mira Rio" : "Inside Café Mira Rio"} /><figcaption>{t.viewCaption}</figcaption></figure><div><p className="kicker rust">{t.visitKicker}</p><h2>{t.visitTitle} <em>{t.visitEm}</em></h2><p>{t.visitText}</p><dl><div><dt>{t.address}</dt><dd>Urbanização Quinta da Granja<br />Mesão Frio</dd></div><div><dt>{t.phone}</dt><dd><a href="tel:+351254891332">254 891 332</a></dd></div><div><dt>{t.hours}</dt><dd>{t.everyDay}</dd></div></dl><a className="map" href="https://maps.google.com/?q=Café+Mira+Rio+Mesão+Frio">{t.map} ↗</a></div></section>

      <footer><img src="/images/mira-rio-logo.png" alt="Café Mira Rio" /><span>{t.footer}</span><a href="#inicio">{t.back} ↑</a></footer>
    </main>
  );
}
