"use client";

import React from "react";

const STYS: any = {
  royal_rajput: { l:'Royal Rajput Archway', bg:'#4a0e17', tC:'#fdfbf7', aC:'#d4a843', sC:'#d4a843', dk:true, cf:'"Playfair Display",serif', bf:'"Cormorant Garamond",serif' },
  golden_mandala: { l:'Golden Mandala', bg:'linear-gradient(180deg,#fcf4f2,#f8e8e6)', tC:'#3a2626', aC:'#c49a6c', sC:'#9c734b', dk:false, cf:'"Playfair Display",serif', bf:'"DM Sans",sans-serif' },
  watercolor_florals: { l:'Watercolor Florals', bg:'#ffffff', tC:'#2c3e50', aC:'#e8a5a5', sC:'#a8bba2', dk:false, cf:'"Great Vibes",cursive', bf:'"DM Sans",sans-serif' },
  emerald_foil: { l:'Emerald & Gold Foil', bg:'#0f2922', tC:'#f4f7f6', aC:'#d4af37', sC:'#a38d2f', dk:true, cf:'"Playfair Display",serif', bf:'"DM Sans",sans-serif' },
  tropical_palm: { l:'Tropical Palm', bg:'#fafdfb', tC:'#1b3b2b', aC:'#2d6a4f', sC:'#52b788', dk:false, cf:'"Playfair Display",serif', bf:'"DM Sans",sans-serif' },
  classic_damask: { l:'Classic Damask', bg:'#fdfbf7', tC:'#2c3e50', aC:'#bdc3c7', sC:'#7f8c8d', dk:false, cf:'"Playfair Display",serif', bf:'"Cormorant Garamond",serif' },
  peacock_majesty: { l:'Peacock Majesty', bg:'linear-gradient(135deg,#0a1b2a,#0f3c4c)', tC:'#e8f4f8', aC:'#ffd700', sC:'#20b2aa', dk:true, cf:'"Cinzel",serif', bf:'"Cormorant Garamond",serif' },
  vintage_lace: { l:'Vintage Lace', bg:'#fff0f5', tC:'#4a2e35', aC:'#d8bfd8', sC:'#c7a4c7', dk:false, cf:'"Parisienne",cursive', bf:'"Cormorant Garamond",serif' },
  art_deco: { l:'Art Deco Gatsby', bg:'#111111', tC:'#fdfbf7', aC:'#c9a55c', sC:'#8b7344', dk:true, cf:'"Marcellus",serif', bf:'"DM Sans",sans-serif' },
  celestial: { l:'Celestial Night', bg:'linear-gradient(180deg,#02040f,#0a1128)', tC:'#f4f6fc', aC:'#f7d08a', sC:'#8390fa', dk:true, cf:'"Cinzel",serif', bf:'"DM Sans",sans-serif' },
  minimalist_botanical: { l:'Minimalist Botanical', bg:'#ffffff', tC:'#2c3e50', aC:'#5f7a61', sC:'#7f8c8d', dk:false, cf:'"DM Sans",sans-serif', bf:'"DM Sans",sans-serif' },
  rose_gold_brush: { l:'Rose Gold Brushstrokes', bg:'#fcfcfc', tC:'#333333', aC:'#b76e79', sC:'#e0bfb8', dk:false, cf:'"Playfair Display",serif', bf:'"DM Sans",sans-serif' },
  haldi_marigold: { l:'Traditional Haldi', bg:'linear-gradient(180deg,#fffae6,#fff2b2)', tC:'#5c2c06', aC:'#f25c05', sC:'#f2a007', dk:false, cf:'"Playfair Display",serif', bf:'"DM Sans",sans-serif' },
  gothic_romance: { l:'Gothic Romance', bg:'#1f0e1c', tC:'#f0e6ed', aC:'#8c1c3f', sC:'#6b1b36', dk:true, cf:'"Cinzel",serif', bf:'"Cormorant Garamond",serif' },
  rustic_wood: { l:'Rustic Wood & Lights', bg:'linear-gradient(90deg,#3e2723,#4e342e,#3e2723)', tC:'#fdfbf7', aC:'#ffeb3b', sC:'#d7ccc8', dk:true, cf:'"Playfair Display",serif', bf:'"Cormorant Garamond",serif' },
  modern_clean: { l:'Modern Clean', bg:'#ffffff', tC:'#111111', aC:'#111111', sC:'#666666', dk:false, cf:'"DM Sans",sans-serif', bf:'"DM Sans",sans-serif' },
  boho_pampas: { l:'Boho Pampas Grass', bg:'#faf7f2', tC:'#5c4d43', aC:'#d4a373', sC:'#e9edc9', dk:false, cf:'"Playfair Display",serif', bf:'"DM Sans",sans-serif' },
  lotus_pond: { l:'Lotus Pond', bg:'#f2f9f9', tC:'#1a3c40', aC:'#ff8fab', sC:'#457b9d', dk:false, cf:'"Playfair Display",serif', bf:'"DM Sans",sans-serif' },
  pearl_ribbon: { l:'Pearl & Ribbon', bg:'#fdfdfc', tC:'#4a4a4a', aC:'#e2e2e2', sC:'#a8a8a8', dk:false, cf:'"Playfair Display",serif', bf:'"Cormorant Garamond",serif' },
  geometric_marble: { l:'Geometric Marble', bg:'#ffffff', tC:'#2c3e50', aC:'#d4af37', sC:'#bdc3c7', dk:false, cf:'"Playfair Display",serif', bf:'"DM Sans",sans-serif' },
};

function seededRandom(seed: number) {
  let s = seed;
  return function() { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

function getBgSVG(id: string, a: string, dk: boolean, W: number = 680, H: number = 960) {
  const rng = seededRandom(id.charCodeAt(0) * 1000 + id.charCodeAt(id.length-1));
  const cx = W/2, cy = H/2, m = Math.min(W, H);

  // Reusable massive strings
  const P: any = {
    royal_rajput: (() => {
      const gC = a;
      return `<defs>
        <linearGradient id="rp1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${gC}"/><stop offset="50%" stop-color="#fff" stop-opacity="0.8"/><stop offset="100%" stop-color="${gC}"/></linearGradient>
      </defs>
      <path d="M40,40 L${W-40},40 L${W-40},${H-40} L40,${H-40} Z" fill="none" stroke="url(#rp1)" stroke-width="6"/>
      <path d="M60,60 L${W-60},60 L${W-60},${H-60} L60,${H-60} Z" fill="none" stroke="url(#rp1)" stroke-width="1.5" stroke-dasharray="10 5"/>
      <g fill="none" stroke="url(#rp1)" stroke-width="3">
        <!-- Top Arch -->
        <path d="M60,180 Q${cx},40 ${W-60},180" />
        <path d="M60,195 Q${cx},55 ${W-60},195" />
        <circle cx="${cx}" cy="100" r="15" fill="url(#rp1)"/>
      </g>
      <g fill="url(#rp1)">
        <!-- Pillars -->
        <rect x="60" y="180" width="12" height="${H-240}" />
        <rect x="${W-72}" y="180" width="12" height="${H-240}" />
      </g>
      `;
    })(),

    golden_mandala: (() => {
      const drawPetals = (cx:number, cy:number, r:number, count:number) => {
        let p = '';
        for(let i=0;i<count;i++){
          const a1 = (i*360/count)*Math.PI/180, a2 = ((i+0.5)*360/count)*Math.PI/180;
          p += `<path d="M${cx},${cy} Q${cx+Math.cos(a1)*r*1.5},${cy+Math.sin(a1)*r*1.5} ${cx+Math.cos(a2)*r},${cy+Math.sin(a2)*r} Q${cx+Math.cos((i+1)*360/count*Math.PI/180)*r*1.5},${cy+Math.sin((i+1)*360/count*Math.PI/180)*r*1.5} ${cx},${cy}" fill="none" stroke="${a}" stroke-width="1.5" opacity="0.6"/>`;
        }
        return p;
      };
      return `<g opacity="0.8">
        ${drawPetals(cx, -100, 300, 24)}
        ${drawPetals(cx, -100, 200, 16)}
        ${drawPetals(cx, -100, 100, 12)}
        ${drawPetals(cx, H+100, 300, 24)}
        ${drawPetals(cx, H+100, 200, 16)}
        ${drawPetals(cx, H+100, 100, 12)}
        <circle cx="${cx}" cy="-100" r="300" fill="none" stroke="${a}" stroke-width="2" stroke-dasharray="4 8"/>
        <circle cx="${cx}" cy="${H+100}" r="300" fill="none" stroke="${a}" stroke-width="2" stroke-dasharray="4 8"/>
      </g>`;
    })(),

    watercolor_florals: (() => {
      return `<defs>
        <filter id="blur"><feGaussianBlur stdDeviation="30" /></filter>
        <radialGradient id="wc1" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="#ffb6c1" stop-opacity="0.8"/><stop offset="100%" stop-color="#ffb6c1" stop-opacity="0"/></radialGradient>
        <radialGradient id="wc2" cx="70%" cy="70%" r="70%"><stop offset="0%" stop-color="#ffdab9" stop-opacity="0.8"/><stop offset="100%" stop-color="#ffdab9" stop-opacity="0"/></radialGradient>
        <radialGradient id="wc3" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#98fb98" stop-opacity="0.6"/><stop offset="100%" stop-color="#98fb98" stop-opacity="0"/></radialGradient>
      </defs>
      <g filter="url(#blur)">
        <circle cx="50" cy="50" r="250" fill="url(#wc1)"/>
        <circle cx="200" cy="-50" r="200" fill="url(#wc2)"/>
        <circle cx="-50" cy="200" r="200" fill="url(#wc3)"/>

        <circle cx="${W-50}" cy="${H-50}" r="250" fill="url(#wc1)"/>
        <circle cx="${W-200}" cy="${H+50}" r="200" fill="url(#wc2)"/>
        <circle cx="${W+50}" cy="${H-200}" r="200" fill="url(#wc3)"/>
      </g>
      <g fill="none" stroke="#2c3e50" stroke-width="0.8" opacity="0.3">
        <!-- Delicate sketched leaves overlay -->
        <path d="M0,0 Q100,100 150,50 Q100,0 0,0" transform="translate(40,40) rotate(45) scale(0.8)"/>
        <path d="M0,0 Q100,100 150,50 Q100,0 0,0" transform="translate(${W-40},${H-40}) rotate(225) scale(0.8)"/>
      </g>
      `;
    })(),

    emerald_foil: (() => {
      let g = `<defs><linearGradient id="eg1" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="${a}"/><stop offset="50%" stop-color="#fffe" /><stop offset="100%" stop-color="${a}"/></linearGradient></defs>`;
      g += `<rect width="${W}" height="${H}" fill="none" stroke="url(#eg1)" stroke-width="8" />
            <rect x="20" y="20" width="${W-40}" height="${H-40}" fill="none" stroke="url(#eg1)" stroke-width="1" />
            <rect x="30" y="30" width="${W-60}" height="${H-60}" fill="none" stroke="url(#eg1)" stroke-width="1" />`;
      
      const drawTriangles = (x:number, y:number, s:number) => {
        return `<polygon points="${x},${y-s} ${x+s},${y} ${x},${y+s} ${x-s},${y}" fill="none" stroke="url(#eg1)" stroke-width="2"/>
                <polygon points="${x},${y-s*0.6} ${x+s*0.6},${y} ${x},${y+s*0.6} ${x-s*0.6},${y}" fill="url(#eg1)" opacity="0.2"/>`;
      };

      g += drawTriangles(W/2, 100, 60) + drawTriangles(W/2, H-100, 60);
      g += drawTriangles(100, H/2, 60) + drawTriangles(W-100, H/2, 60);
      return g;
    })(),

    tropical_palm: (() => {
      let g = `<defs><linearGradient id="tp1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2d6a4f"/><stop offset="100%" stop-color="#52b788"/></linearGradient></defs>`;
      
      const leaf = `<path d="M0,0 C50,-50 150,-20 200,50 C150,100 50,120 0,0 Z" fill="url(#tp1)" opacity="0.7"/>
                    <path d="M0,0 L200,50" stroke="#fff" stroke-width="2" opacity="0.4"/>`;
      
      g += `<g transform="translate(-50,-50) rotate(45)">${leaf}</g>
            <g transform="translate(150,-80) rotate(75) scale(0.8)">${leaf}</g>
            <g transform="translate(-80,150) rotate(15) scale(0.9)">${leaf}</g>
            <g transform="translate(${W+50},${H+50}) rotate(225)">${leaf}</g>
            <g transform="translate(${W-150},${H+80}) rotate(255) scale(0.8)">${leaf}</g>
            <g transform="translate(${W+80},${H-150}) rotate(195) scale(0.9)">${leaf}</g>`;
      
      return g;
    })(),

    classic_damask: (() => {
      return `<defs>
        <pattern id="damask" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M60,10 C70,40 100,50 60,110 C20,50 50,40 60,10 Z M60,30 C75,50 80,70 60,90 C40,70 45,50 60,30 Z" fill="${a}" opacity="0.15"/>
          <circle cx="60" cy="60" r="5" fill="${a}" opacity="0.15"/>
          <path d="M10,60 C40,70 50,100 110,60 C50,20 40,50 10,60 Z" fill="${a}" opacity="0.08"/>
        </pattern>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#damask)"/>
      <rect x="40" y="40" width="${W-80}" height="${H-80}" fill="#fdfbf7" opacity="0.9"/>
      <rect x="50" y="50" width="${W-100}" height="${H-100}" fill="none" stroke="${a}" stroke-width="2" opacity="0.5"/>
      `;
    })(),

    peacock_majesty: (() => {
      let g = `<defs>
        <radialGradient id="peaEye" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#0a1b2a"/><stop offset="30%" stop-color="#ffd700"/><stop offset="60%" stop-color="#20b2aa"/><stop offset="100%" stop-color="transparent"/></radialGradient>
      </defs>`;
      
      for(let i=0; i<8; i++) {
        g += `<path d="M${-100},${H} Q${W/4 + i*40},${H/2} ${W/2 + i*30},${-100}" fill="none" stroke="#20b2aa" stroke-width="2" opacity="0.3"/>`;
        g += `<circle cx="${W/2 + i*30}" cy="${200 + i*40}" r="30" fill="url(#peaEye)" opacity="0.8"/>`;
      }
      for(let i=0; i<8; i++) {
        g += `<path d="M${W+100},${H} Q${W*0.75 - i*40},${H/2} ${W/2 - i*30},${-100}" fill="none" stroke="#20b2aa" stroke-width="2" opacity="0.3"/>`;
        g += `<circle cx="${W/2 - i*30}" cy="${200 + i*40}" r="30" fill="url(#peaEye)" opacity="0.8"/>`;
      }

      g += `<rect x="40" y="40" width="${W-80}" height="${H-80}" fill="none" stroke="#ffd700" stroke-width="3" opacity="0.7"/>`;
      return g;
    })(),

    vintage_lace: (() => {
      let g = `<g fill="none" stroke="${a}" opacity="0.4" stroke-width="1.5">`;
      // Draw scalloped lace borders
      for(let x=20; x<W; x+=40) {
        g += `<path d="M${x},20 A20,20 0 0,1 ${x+40},20" />`;
        g += `<path d="M${x},${H-20} A20,20 0 0,0 ${x+40},${H-20}" />`;
        g += `<circle cx="${x+20}" cy="30" r="3" fill="${a}"/>`;
        g += `<circle cx="${x+20}" cy="${H-30}" r="3" fill="${a}"/>`;
      }
      for(let y=20; y<H; y+=40) {
        g += `<path d="M20,${y} A20,20 0 0,0 20,${y+40}" />`;
        g += `<path d="M${W-20},${y} A20,20 0 0,1 ${W-20},${y+40}" />`;
        g += `<circle cx="30" cy="${y+20}" r="3" fill="${a}"/>`;
        g += `<circle cx="${W-30}" cy="${y+20}" r="3" fill="${a}"/>`;
      }
      g += `</g>`;
      g += `<rect x="40" y="40" width="${W-80}" height="${H-80}" fill="none" stroke="${a}" stroke-width="1" stroke-dasharray="6 4" opacity="0.6"/>`;
      return g;
    })(),

    art_deco: (() => {
      const gC = a;
      return `<g fill="none" stroke="${gC}" stroke-width="2">
        <rect x="20" y="20" width="${W-40}" height="${H-40}" />
        <rect x="35" y="35" width="${W-70}" height="${H-70}" stroke-width="1"/>
        
        <!-- Corner Fans -->
        <path d="M20,100 Q80,80 100,20 M20,120 Q100,100 120,20 M20,140 Q120,120 140,20" />
        <path d="M${W-20},100 Q${W-80},80 ${W-100},20 M${W-20},120 Q${W-100},100 ${W-120},20 M${W-20},140 Q${W-120},120 ${W-140},20" />
        
        <path d="M20,${H-100} Q80,${H-80} 100,${H-20} M20,${H-120} Q100,${H-100} 120,${H-20} M20,${H-140} Q120,${H-120} 140,${H-20}" />
        <path d="M${W-20},${H-100} Q${W-80},${H-80} ${W-100},${H-20} M${W-20},${H-120} Q${W-100},${H-100} ${W-120},${H-20} M${W-20},${H-140} Q${W-120},${H-120} ${W-140},${H-20}" />
      </g>
      <circle cx="${cx}" cy="80" r="40" fill="none" stroke="${gC}" stroke-width="2"/>
      <circle cx="${cx}" cy="80" r="30" fill="none" stroke="${gC}" stroke-width="1"/>
      <path d="M${cx},20 L${cx},140 M${cx-60},80 L${cx+60},80" stroke="${gC}" stroke-width="2"/>
      `;
    })(),

    celestial: (() => {
      let g = `<defs><radialGradient id="moon" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff" stop-opacity="1"/><stop offset="50%" stop-color="${a}" stop-opacity="0.8"/><stop offset="100%" stop-color="${a}" stop-opacity="0"/></radialGradient></defs>`;
      
      // Stars
      g += `<g fill="#fff">`;
      for(let i=0;i<100;i++){
        const x=rng()*W, y=rng()*H, r=rng()*1.5+0.5, o=rng()*0.8+0.2;
        g+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" opacity="${o.toFixed(2)}"/>`;
      }
      g += `</g>`;

      // Moon
      g += `<circle cx="${W*0.8}" cy="${H*0.15}" r="60" fill="url(#moon)" opacity="0.6"/>
            <path d="M${W*0.8},${H*0.15-40} A40,40 0 1,0 ${W*0.8+20},${H*0.15+30} A50,50 0 1,1 ${W*0.8},${H*0.15-40}" fill="#fff"/>`;
      
      // Constellations
      g += `<g fill="none" stroke="${a}" stroke-width="0.5" opacity="0.4">
              <polyline points="50,100 120,80 180,150 140,220" />
              <polyline points="${W-100},${H-200} ${W-150},${H-120} ${W-80},${H-80}" />
              <circle cx="50" cy="100" r="3" fill="${a}"/><circle cx="120" cy="80" r="3" fill="${a}"/><circle cx="180" cy="150" r="3" fill="${a}"/><circle cx="140" cy="220" r="3" fill="${a}"/>
              <circle cx="${W-100}" cy="${H-200}" r="3" fill="${a}"/><circle cx="${W-150}" cy="${H-120}" r="3" fill="${a}"/><circle cx="${W-80}" cy="${H-80}" r="3" fill="${a}"/>
            </g>`;
      
      return g;
    })(),

    minimalist_botanical: (() => {
      return `<g fill="none" stroke="${a}" stroke-width="1.5" opacity="0.7">
        <rect x="30" y="30" width="${W-60}" height="${H-60}" stroke-width="0.5"/>
        <path d="M10,${H/2} Q50,${H/2-100} 30,30" />
        <path d="M${W-10},${H/2} Q${W-50},${H/2+100} ${W-30},${H-30}" />
        <!-- Leaves -->
        <path d="M25,200 Q40,180 35,160 Q15,180 25,200" fill="${a}" opacity="0.4"/>
        <path d="M40,300 Q60,280 50,260 Q30,280 40,300" fill="${a}" opacity="0.4"/>
        <path d="M${W-25},${H-200} Q${W-40},${H-180} ${W-35},${H-160} Q${W-15},${H-180} ${W-25},${H-200}" fill="${a}" opacity="0.4"/>
        <path d="M${W-40},${H-300} Q${W-60},${H-280} ${W-50},${H-260} Q${W-30},${H-280} ${W-40},${H-300}" fill="${a}" opacity="0.4"/>
      </g>`;
    })(),

    rose_gold_brush: (() => {
      let g = `<defs>
        <linearGradient id="rgb1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#b76e79"/><stop offset="50%" stop-color="#e0bfb8"/><stop offset="100%" stop-color="#b76e79"/></linearGradient>
      </defs>`;
      
      const brush = (x:number,y:number, rot:number) => {
        return `<path d="M${x},${y} Q${x+50},${y-20} ${x+100},${y+10} T${x+200},${y-10} Q${x+180},${y+20} ${x+100},${y+40} T${x},${y+10} Z" fill="url(#rgb1)" opacity="0.7" transform="rotate(${rot} ${x} ${y})"/>`;
      };

      g += brush(-50, 100, 15);
      g += brush(-20, 150, 20);
      g += brush(W-150, H-150, 195);
      g += brush(W-180, H-100, 190);
      
      g += `<rect x="40" y="40" width="${W-80}" height="${H-80}" fill="none" stroke="#b76e79" stroke-width="1" opacity="0.5"/>`;
      return g;
    })(),

    haldi_marigold: (() => {
      let g = `<defs>
        <radialGradient id="mari" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f25c05"/><stop offset="60%" stop-color="#f2a007"/><stop offset="100%" stop-color="transparent"/></radialGradient>
      </defs>`;
      
      const drawMarigold = (x:number,y:number, r:number) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#mari)" opacity="0.9"/>`;

      for(let i=0; i<30; i++) {
        g += drawMarigold(rng()*W, rng()*150 - 50, rng()*20+15);
        g += drawMarigold(rng()*150 - 50, rng()*H, rng()*20+15);
        g += drawMarigold(W - rng()*150 + 50, rng()*H, rng()*20+15);
      }
      g += `<rect x="50" y="50" width="${W-100}" height="${H-100}" fill="#fffae6" opacity="0.85" rx="20"/>`;
      g += `<rect x="60" y="60" width="${W-120}" height="${H-120}" fill="none" stroke="#f25c05" stroke-width="1.5" stroke-dasharray="4 4" rx="10"/>`;
      return g;
    })(),

    gothic_romance: (() => {
      const gC = a;
      return `<g fill="none" stroke="${gC}">
        <rect x="25" y="25" width="${W-50}" height="${H-50}" stroke-width="3" opacity="0.8"/>
        <rect x="35" y="35" width="${W-70}" height="${H-70}" stroke-width="1" opacity="0.5"/>
        <!-- Ornate Corners -->
        <path d="M25,100 C80,100 100,80 100,25" stroke-width="4"/>
        <path d="M35,120 C90,120 120,90 120,35" stroke-width="1"/>
        <path d="M${W-25},100 C${W-80},100 ${W-100},80 ${W-100},25" stroke-width="4"/>
        <path d="M${W-35},120 C${W-90},120 ${W-120},90 ${W-120},35" stroke-width="1"/>
        <path d="M25,${H-100} C80,${H-100} 100,${H-80} 100,${H-25}" stroke-width="4"/>
        <path d="M${W-25},${H-100} C${W-80},${H-100} ${W-100},${H-80} ${W-100},${H-25}" stroke-width="4"/>
      </g>
      <!-- Blood drop gems -->
      <circle cx="100" cy="100" r="6" fill="#c0392b"/>
      <circle cx="${W-100}" cy="100" r="6" fill="#c0392b"/>
      <circle cx="100" cy="${H-100}" r="6" fill="#c0392b"/>
      <circle cx="${W-100}" cy="${H-100}" r="6" fill="#c0392b"/>
      `;
    })(),

    rustic_wood: (() => {
      let g = `<g stroke="#000" opacity="0.1" stroke-width="2">`;
      for(let x=0; x<W; x+=20) {
        g += `<path d="M${x},0 Q${x+rng()*20},${H/2} ${x},${H}" />`;
      }
      g += `</g>`;

      // Fairy lights
      g += `<path d="M0,80 Q${W/2},150 ${W},80" fill="none" stroke="#222" stroke-width="1" opacity="0.5"/>`;
      g += `<path d="M0,120 Q${W/2},190 ${W},120" fill="none" stroke="#222" stroke-width="1" opacity="0.5"/>`;
      
      g += `<defs><radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff" /><stop offset="30%" stop-color="#ffeb3b"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>`;
      
      for(let x=20; x<W; x+=60) {
        g += `<circle cx="${x}" cy="${80 + Math.sin(x/W*Math.PI)*70}" r="15" fill="url(#glow)" opacity="0.8"/>`;
        g += `<circle cx="${x+30}" cy="${120 + Math.sin((x+30)/W*Math.PI)*70}" r="15" fill="url(#glow)" opacity="0.8"/>`;
      }

      g += `<rect x="50" y="200" width="${W-100}" height="${H-250}" fill="#fdfbf7" opacity="0.9" rx="10"/>`;
      g += `<rect x="60" y="210" width="${W-120}" height="${H-270}" fill="none" stroke="#5c4d43" stroke-width="1" stroke-dasharray="8 4" rx="5"/>`;
      
      return g;
    })(),

    modern_clean: (() => {
      return `
        <rect x="30" y="30" width="${W-60}" height="${H-60}" fill="none" stroke="${a}" stroke-width="8"/>
        <rect x="50" y="50" width="${W-100}" height="${H-100}" fill="none" stroke="${a}" stroke-width="1"/>
        <!-- Corner blocks -->
        <rect x="20" y="20" width="30" height="30" fill="#fff"/>
        <rect x="${W-50}" y="20" width="30" height="30" fill="#fff"/>
        <rect x="20" y="${H-50}" width="30" height="30" fill="#fff"/>
        <rect x="${W-50}" y="${H-50}" width="30" height="30" fill="#fff"/>
        <circle cx="35" cy="35" r="4" fill="${a}"/>
        <circle cx="${W-35}" cy="35" r="4" fill="${a}"/>
        <circle cx="35" cy="${H-35}" r="4" fill="${a}"/>
        <circle cx="${W-35}" cy="${H-35}" r="4" fill="${a}"/>
      `;
    })(),

    boho_pampas: (() => {
      let g = ``;
      const pampas = (x:number, y:number, sx:number, sy:number) => {
        return `<g transform="translate(${x},${y}) scale(${sx},${sy})" fill="none" stroke="#d4a373" opacity="0.6">
          <path d="M0,0 Q50,-150 150,-200" stroke-width="4"/>
          ${Array.from({length:20}, (_,i) => {
            const dy = i*10;
            return `<path d="M${dy*0.5},${-dy*1.2} Q${dy*1.5},${-dy*1.2 - 30} ${dy*1.5 + 40},${-dy*1.2 - 20}" stroke-width="1.5"/>
                    <path d="M${dy*0.5},${-dy*1.2} Q${dy*0.5 - 30},${-dy*1.2 - 30} ${dy*0.5 - 40},${-dy*1.2 - 10}" stroke-width="1.5"/>`;
          }).join('')}
        </g>`;
      };

      g += pampas(0, H, 1, 1);
      g += pampas(W, H, -1, 1);
      g += pampas(0, 0, 0.8, -0.8);
      
      g += `<rect x="40" y="40" width="${W-80}" height="${H-80}" fill="none" stroke="#e9edc9" stroke-width="2"/>`;
      return g;
    })(),

    lotus_pond: (() => {
      let g = `<g fill="none" stroke="#457b9d" stroke-width="1" opacity="0.3">`;
      // Water ripples
      for(let i=0; i<15; i++) {
        g += `<ellipse cx="${rng()*W}" cy="${H*0.7 + rng()*H*0.3}" rx="${rng()*60+40}" ry="${rng()*15+5}" />`;
      }
      g += `</g>`;

      const lotus = (x:number, y:number, s:number) => {
        return `<g transform="translate(${x},${y}) scale(${s})" fill="#ff8fab" stroke="#c9184a" stroke-width="1.5" opacity="0.9">
          <path d="M0,0 C30,-50 50,-20 0,30 C-50,-20 -30,-50 0,0 Z" />
          <path d="M0,5 C20,-40 40,-10 0,25 C-40,-10 -20,-40 0,5 Z" fill="#ffb3c6"/>
        </g>`;
      };

      g += lotus(W*0.2, H*0.85, 1.5);
      g += lotus(W*0.8, H*0.9, 1.2);
      g += lotus(W*0.5, H*0.95, 2);

      g += `<rect x="30" y="30" width="${W-60}" height="${H-60}" fill="none" stroke="#ff8fab" stroke-width="3" opacity="0.5"/>`;
      return g;
    })(),

    pearl_ribbon: (() => {
      let g = `<defs>
        <filter id="shadow"><feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.2"/></filter>
      </defs>`;
      
      g += `<path d="M-50,200 C200,100 400,300 ${W+50},150" fill="none" stroke="#f0e6e6" stroke-width="40" filter="url(#shadow)"/>`;
      g += `<path d="M-50,${H-150} C200,${H-300} 400,${H-100} ${W+50},${H-200}" fill="none" stroke="#f0e6e6" stroke-width="40" filter="url(#shadow)"/>`;
      
      g += `<rect x="40" y="40" width="${W-80}" height="${H-80}" fill="none" stroke="#d4af37" stroke-width="1"/>`;
      
      const pearl = (x:number,y:number) => `<circle cx="${x}" cy="${y}" r="8" fill="#fff" filter="url(#shadow)"/><circle cx="${x-2}" cy="${y-2}" r="3" fill="#fff" opacity="0.8"/>`;
      
      g += pearl(40,40) + pearl(W-40,40) + pearl(40,H-40) + pearl(W-40,H-40);
      g += pearl(cx, 40) + pearl(cx, H-40);

      return g;
    })(),

    geometric_marble: (() => {
      let g = `<g fill="none" stroke="#bdc3c7" stroke-width="1" opacity="0.4">`;
      // Marble veins
      for(let i=0; i<10; i++) {
        g += `<path d="M${rng()*W},0 Q${rng()*W},${H/2} ${rng()*W},${H}" />`;
        g += `<path d="M0,${rng()*H} Q${W/2},${rng()*H} ${W},${rng()*H}" />`;
      }
      g += `</g>`;

      // Gold Triangles
      g += `<polygon points="0,0 ${W/2},0 0,${H/4}" fill="#d4af37" opacity="0.8"/>`;
      g += `<polygon points="${W},${H} ${W/2},${H} ${W},${H*0.75}" fill="#d4af37" opacity="0.8"/>`;
      
      g += `<rect x="50" y="50" width="${W-100}" height="${H-100}" fill="#ffffff" opacity="0.95"/>`;
      g += `<rect x="60" y="60" width="${W-120}" height="${H-120}" fill="none" stroke="#d4af37" stroke-width="2"/>`;

      return g;
    })()
  };

  return (P[id] || P.royal_rajput) + '';
}

export function InvitationCard({ themeId = "royal_rajput", title, subtitle, date, venue }: any) {
  const s = STYS[themeId] || STYS.royal_rajput;
  const a = s.aC;
  const bg = getBgSVG(themeId, a, s.dk);
  const cornerColor = s.dk ? a : a + '60';

  return (
    <div 
      className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-in-out" 
      style={{ background: s.bg, fontFamily: s.bf, color: s.tC }}
    >
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 680 960" 
        preserveAspectRatio="xMidYMid slice"
        dangerouslySetInnerHTML={{ __html: bg }}
      />
      
      {/* Decorative corners (fallback logic for simple themes) */}
      {!['geometric_marble', 'modern_clean', 'gothic_romance'].includes(themeId) && (
        <>
          <div className="absolute top-6 left-6 w-10 h-10 border-t-[1.5px] border-l-[1.5px] z-10 pointer-events-none transition-colors duration-700" style={{ borderColor: cornerColor }} />
          <div className="absolute top-6 right-6 w-10 h-10 border-t-[1.5px] border-r-[1.5px] z-10 pointer-events-none transition-colors duration-700" style={{ borderColor: cornerColor }} />
          <div className="absolute bottom-6 left-6 w-10 h-10 border-b-[1.5px] border-l-[1.5px] z-10 pointer-events-none transition-colors duration-700" style={{ borderColor: cornerColor }} />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-b-[1.5px] border-r-[1.5px] z-10 pointer-events-none transition-colors duration-700" style={{ borderColor: cornerColor }} />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 p-10 flex flex-col items-center justify-center h-full text-center transition-all duration-700">
        <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-4 drop-shadow-sm font-bold" style={{ color: a }}>{subtitle || "Together with their families"}</p>
        
        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-4 w-full">
          <div className="h-[1px] flex-1 max-w-[60px]" style={{ background: `linear-gradient(90deg, transparent, ${a})` }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: a, boxShadow: `0 0 8px ${a}40` }} />
          <div className="h-[1px] flex-1 max-w-[60px]" style={{ background: `linear-gradient(90deg, ${a}, transparent)` }} />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 mt-4 leading-tight drop-shadow-lg" style={{ fontFamily: s.cf, color: s.tC }}>
          {title.split('&').map((part: string, i: number, arr: any[]) => (
            <React.Fragment key={i}>
              {part.trim()}
              {i < arr.length - 1 && <><br /><span style={{ fontSize: '0.6em', opacity: 0.8, color: a }}>&</span><br /></>}
            </React.Fragment>
          ))}
        </h1>

        <div className="flex items-center justify-center gap-3 my-4 w-full">
          <div className="h-[1px] flex-1 max-w-[60px]" style={{ background: `linear-gradient(90deg, transparent, ${a})` }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: a, boxShadow: `0 0 8px ${a}40` }} />
          <div className="h-[1px] flex-1 max-w-[60px]" style={{ background: `linear-gradient(90deg, ${a}, transparent)` }} />
        </div>

        <p className="text-[10px] sm:text-xs tracking-widest mt-4 mb-6 uppercase opacity-90 font-bold" style={{ color: s.sC }}>Invite you to celebrate</p>
        
        <div className="px-6 py-4 rounded-xl backdrop-blur-sm border border-transparent mt-2 inline-block transition-colors duration-700" style={{ backgroundColor: `${s.bg}40`, borderColor: `${a}20` }}>
          <p className="text-base sm:text-lg font-bold mb-2" style={{ color: a }}>{date || "December 20th, 2026"}</p>
          <p className="text-xs sm:text-sm font-semibold opacity-90" style={{ color: s.tC }}>{venue || "The Grand Hotel, Delhi"}</p>
        </div>
      </div>
    </div>
  );
}
