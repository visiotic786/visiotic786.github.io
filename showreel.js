/* Graphic Design Showreel: drop-in section.
   Use:  <graphic-showreel sticky-top="72"></graphic-showreel>  +  <script src="showreel.js" defer></script>
   Images live in assets/My Designs/. Styles are isolated (Shadow DOM) so they cannot clash with the site CSS. */
(function(){
if(customElements.get('graphic-showreel'))return;
var DATA=[{"k": "impact", "f": "assets/My Designs/impact.jpg", "t": "Make an Impact", "s": "", "c": "lettering", "w": 564, "h": 423, "bg": "#29aae3"}, {"k": "awkward", "f": "assets/My Designs/awkward.jpg", "t": "Awkward", "s": "", "c": "lettering", "w": 564, "h": 564, "bg": "#6599ff"}, {"k": "rise", "f": "assets/My Designs/rise.jpg", "t": "Rise & Grind", "s": "", "c": "lettering", "w": 736, "h": 552, "bg": "#f48c89"}, {"k": "graffiti", "f": "assets/My Designs/graffiti.jpg", "t": "Madiotech Custom Graffiti", "s": "Graffiti lettering on a brick wall", "c": "lettering", "w": 1278, "h": 740, "bg": "#c1c1c1"}, {"k": "riseshine", "f": "assets/My Designs/riseshine.jpg", "t": "Rise and Shine", "s": "Lettering with colour palette and the Rise & Grind badge", "c": "lettering", "w": 1138, "h": 740, "bg": "#ffffff"}, {"k": "graffiti4", "f": "assets/My Designs/graffiti4.jpg", "t": "Madiotech Custom Graffiti: Four Colourways", "s": "Purple, red, yellow and blue on brick walls", "c": "lettering", "w": 1278, "h": 740, "bg": "#2b2b2b"}, {"k": "goodluck", "f": "assets/My Designs/goodluck.jpg", "t": "Good Luck", "s": "Layered script lettering", "c": "lettering", "w": 1278, "h": 740, "bg": "#9df01a"}, {"k": "placeorder", "f": "assets/My Designs/placeorder.jpg", "t": "Place Your Order Now", "s": "Drip lettering in four colours", "c": "lettering", "w": 1600, "h": 1020, "bg": "#ffe1ad"}, {"k": "sooper", "f": "assets/My Designs/sooper.jpg", "t": "Sooper Deluxe", "s": "Script lettering with a dark shadow", "c": "lettering", "w": 1100, "h": 740, "bg": "#ff4d4d"}, {"k": "mad1", "f": "assets/My Designs/mad1.jpg", "t": "Madiotech: Lettering and Shadow", "s": "Step 1 of 4", "c": "madiotech", "w": 1138, "h": 740, "bg": "#f3746b"}, {"k": "mad2", "f": "assets/My Designs/mad2.jpg", "t": "Madiotech: Colour and Gloss", "s": "Step 2 of 4", "c": "madiotech", "w": 1138, "h": 740, "bg": "#f0f0f0"}, {"k": "mad3", "f": "assets/My Designs/mad3.jpg", "t": "Madiotech: Drips and Puddles", "s": "Step 3 of 4", "c": "madiotech", "w": 1138, "h": 740, "bg": "#f0f0f0"}, {"k": "mad4", "f": "assets/My Designs/mad4.jpg", "t": "Madiotech: Toppings and Finish", "s": "Step 4 of 4", "c": "madiotech", "w": 1138, "h": 740, "bg": "#f0f0f0"}, {"k": "collect1", "f": "assets/My Designs/collect1.jpg", "t": "Lettering Collection One", "s": "Yesterday You Said Tomorrow, Madiotech, Good Luck, Best of Life, Place Your Order Now", "c": "collections", "w": 1600, "h": 1020, "bg": "#ffffff"}, {"k": "collect2", "f": "assets/My Designs/collect2.jpg", "t": "Lettering Collection Two", "s": "Just Do It, All Colors Are Beautiful, Face Your Fear, Chaos, Day of the Dead and more", "c": "collections", "w": 1138, "h": 740, "bg": "#ffffff"}, {"k": "collect3", "f": "assets/My Designs/collect3.jpg", "t": "Lettering Collection Three", "s": "Stoney Bologna Boys, Good Stuff, Kauzie, CrossFit Amberg, Into the Wind, Please Leave By 10pm", "c": "collections", "w": 1138, "h": 740, "bg": "#ffffff"}, {"k": "collect4", "f": "assets/My Designs/collect4.jpg", "t": "Lettering Collection Four", "s": "Sneakerhead, Milky, Healthy Down the Road, Wear What You Are, Trippy Wiz, La Prime, Hustle Ambition", "c": "collections", "w": 1138, "h": 740, "bg": "#ffffff"}, {"k": "youth", "f": "assets/My Designs/youth.jpg", "t": "Youth Style", "s": "Script text effect", "c": "texteffects", "w": 338, "h": 338, "bg": "#32a6bd"}, {"k": "bulbulay", "f": "assets/My Designs/bulbulay.jpg", "t": "Bulbulay", "s": "Script wordmark with bubbles", "c": "texteffects", "w": 1600, "h": 1280, "bg": "#313131"}, {"k": "texteffects", "f": "assets/My Designs/texteffects.jpg", "t": "3D Text Effects", "s": "Hyper, Honey!, Cats and Dogs, Extra Ordinary, Bananas Jungle, Children's Party, Fresh!, Rock, Knight Guardian", "c": "texteffects", "w": 1278, "h": 740, "bg": "#1b1626"}, {"k": "logos-a", "f": "assets/My Designs/logos-a.jpg", "t": "Logo Set One", "s": "Home River, Snaillo, Magic Candle, Pumpkin Laboratory", "c": "logos", "w": 1280, "h": 769, "bg": "#ffffff"}, {"k": "logos-b", "f": "assets/My Designs/logos-b.jpg", "t": "Logo Set Two", "s": "Apple Castle, Ghost Capsule, Foxmail, Rabbichat, Snake, First Coffee, Astrobaby, Feather Shoes", "c": "logos", "w": 1600, "h": 963, "bg": "#ffffff"}, {"k": "bee", "f": "assets/My Designs/bee.jpg", "t": "Bee Honey", "s": "Script wordmark with mascot", "c": "logos", "w": 1600, "h": 1280, "bg": "#ffc606"}, {"k": "bigapple", "f": "assets/My Designs/bigapple.jpg", "t": "Big Apple Castle", "s": "Logo on white, colour and dark fields, plus an app icon on a phone", "c": "logos", "w": 1280, "h": 769, "bg": "#ffffff"}, {"k": "stars", "f": "assets/My Designs/stars.jpg", "t": "Stars & Stripes", "s": "Mascot logo with candy lettering", "c": "logos", "w": 1600, "h": 919, "bg": "#fe724e"}, {"k": "snack", "f": "assets/My Designs/snack.jpg", "t": "Snack Shack", "s": "Retro sign-style wordmark with palms", "c": "logos", "w": 325, "h": 260, "bg": "#fff4d6"}, {"k": "epic", "f": "assets/My Designs/epic.jpg", "t": "Epic Tech", "s": "Neon sign mockup", "c": "neon", "w": 1600, "h": 929, "bg": "#0b011d"}, {"k": "miami", "f": "assets/My Designs/miami.jpg", "t": "Miami Street Lawyer", "s": "Neon sign mockup, South Beach", "c": "neon", "w": 1600, "h": 929, "bg": "#0b011d"}, {"k": "elepaint", "f": "assets/My Designs/elepaint.jpg", "t": "Elepaint Brand Identity", "s": "Logo, social posts, cap, tee, colour palette and type", "c": "branding", "w": 1600, "h": 963, "bg": "#ffffff"}, {"k": "cards", "f": "assets/My Designs/cards.jpg", "t": "Elepaint Business Cards", "s": "Print mockup", "c": "branding", "w": 1600, "h": 900, "bg": "#eb7953"}, {"k": "cards2", "f": "assets/My Designs/cards2.jpg", "t": "Elepaint Business Cards: Orange", "s": "Print mockup, second colourway", "c": "branding", "w": 1600, "h": 900, "bg": "#eaab47"}, {"k": "bookcovers", "f": "assets/My Designs/bookcovers.jpg", "t": "Professional Book Cover Design", "s": "Cover layouts across genres", "c": "print", "w": 1600, "h": 1020, "bg": "#feebca"}, {"k": "tshirts", "f": "assets/My Designs/tshirts.jpg", "t": "Retro & Trendy T-Shirt Designs", "s": "Twelve vintage badge and illustration designs", "c": "print", "w": 1100, "h": 740, "bg": "#f1eef6"}, {"k": "landing", "f": "assets/My Designs/landing.jpg", "t": "Landing Page Layouts", "s": "Tablet, phone and full-page views", "c": "web", "w": 1600, "h": 1463, "bg": "#aaafb2"}, {"k": "myshop", "f": "assets/My Designs/myshop.jpg", "t": "Myshop Responsive Website", "s": "Desktop, tablet and phone layouts", "c": "web", "w": 1280, "h": 769, "bg": "#565656"}, {"k": "webdev", "f": "assets/My Designs/webdev.jpg", "t": "Responsive Website Design", "s": "Five page layouts", "c": "web", "w": 1278, "h": 740, "bg": "#bd3796"}, {"k": "redesign", "f": "assets/My Designs/redesign.jpg", "t": "Design & Redesign Responsive Websites", "s": "Website and landing page layouts with app screens", "c": "web", "w": 1278, "h": 740, "bg": "#ffffff"}, {"k": "florist", "f": "assets/My Designs/florist.jpg", "t": "Florist Website Pages", "s": "Home, Blog, Contact, About and Services layouts", "c": "web", "w": 1278, "h": 740, "bg": "#117050"}];
var CSS="\n/* Layout: a projection room. The reel plays in a 16:9 stage at the top, a chapter rail underneath, then each category laid out as its own gallery. */\n:host{all:initial;display:block;position:relative;color:var(--text);font:400 16px/1.55 var(--body);\n  --ink:#0e0b17;\n  --panel:#171222;\n  --line:#2b2340;\n  --text:#f3effa;\n  --mute:#a198b5;\n  --accent:#7c3aed;\n  --accent-hi:#a78bfa;\n  --amber:#ffb020;\n  --display:\"Space Grotesk\",\"Segoe UI\",system-ui,sans-serif;\n  --body:\"Inter\",\"Segoe UI\",system-ui,-apple-system,sans-serif;\n  color-scheme:dark;\n}\n[hidden]{display:none!important}\n*{box-sizing:border-box}\n\n\n\n.wrap{max-width:1240px;margin:0 auto;padding-inline:16px}\na{color:var(--accent-hi)}\nbutton{font:inherit;color:inherit;cursor:pointer}\n:focus-visible{outline:2px solid var(--accent-hi);outline-offset:3px}\nh1,h2,h3{font-family:var(--display);text-wrap:balance;margin:0}\n\n/* top bar */\n.top{position:sticky;top:var(--sr-top,72px);z-index:20;background:rgba(14,11,23,.92);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}\n.top .wrap{display:flex;align-items:center;gap:20px;padding:10px 0}\n.brand{font:700 17px var(--display);letter-spacing:-.01em;white-space:nowrap}\n.brand small{display:block;font:500 11px var(--body);letter-spacing:.12em;text-transform:uppercase;color:var(--mute)}\n.chips{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;min-width:0}\n.chips::-webkit-scrollbar{display:none}\n.chips a{flex:none;text-decoration:none;color:var(--mute);font:500 13px var(--body);padding:7px 12px;border-radius:99px;border:1px solid transparent}\n.chips a:hover{color:var(--text)}\n.chips a.on{color:var(--text);border-color:var(--accent);background:rgba(124,58,237,.16)}\n\n/* hero */\n.hero{padding-block:24px 12px}\n.player{width:min(100%,max(560px,calc((100svh - 250px) * 16 / 9)));margin-inline:auto}\n.hero-head{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:12px 24px;margin-bottom:16px}\n.hero-head .h1{font-size:clamp(28px,5vw,52px);line-height:1;letter-spacing:-.03em}\n.hero-head p{margin:0;color:var(--mute);font-size:14px;max-width:46ch}\n.stage{position:relative;aspect-ratio:16/9;container-type:inline-size;background:var(--ink);border:1px solid var(--line);border-radius:14px;overflow:hidden;cursor:pointer;isolation:isolate}\n.sc{position:absolute;inset:0;overflow:hidden;color:var(--text)}\n@keyframes wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}\n@keyframes rise{from{transform:translateY(115%)}to{transform:none}}\n@keyframes fadeUp{from{opacity:0;transform:translateY(1.4cqw)}to{opacity:1;transform:none}}\n@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}\n@keyframes kb1{from{transform:scale(1)}to{transform:scale(1.04)}}\n@keyframes kb2{from{transform:scale(1.04)}to{transform:scale(1)}}\n@keyframes drift{from{transform:translate(0,0) scale(1)}to{transform:translate(7cqw,-5cqw) scale(1.2)}}\n@keyframes pop{from{opacity:0;transform:scale(.86)}to{opacity:1;transform:none}}\n.sc.enter{animation:wipe .7s cubic-bezier(.7,0,.2,1) both}\n.blobs{position:absolute;inset:0;z-index:0}\n.blobs i{position:absolute;left:var(--x);top:var(--y);width:34cqw;height:34cqw;margin:-17cqw 0 0 -17cqw;border-radius:50%;background:var(--c);filter:blur(7cqw);opacity:.5;animation:drift 8s ease-in-out infinite alternate;animation-delay:var(--dl)}\n.sc-intro,.sc-title,.sc-outro{background:var(--ink)}\n.sc-intro>*:not(.blobs),.sc-title>*:not(.blobs),.sc-outro>*:not(.blobs){position:relative;z-index:1}\n.kick{position:absolute!important;left:6cqw;top:5.5cqw;margin:0;font:600 clamp(9px,1.5cqw,16px) var(--body);letter-spacing:.18em;text-transform:uppercase;color:var(--text);opacity:.85;animation:fadeUp .8s .3s both}\n.kin,.big{position:absolute!important;left:6cqw;right:6cqw;top:50%;transform:translateY(-52%);display:flex;flex-wrap:wrap;column-gap:2cqw;font-weight:700;letter-spacing:-.04em;line-height:.98}\n.kin{font-size:10.5cqw}\n.big{font-size:8.6cqw;top:44%}\n.w{display:inline-flex;overflow:hidden;padding:0 .04em .1em;margin-bottom:-.1em}\n.l{display:inline-block;animation:rise .8s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--d)}\n.sub{position:absolute!important;left:6cqw;right:6cqw;bottom:5.5cqw;margin:0;font:500 clamp(11px,2cqw,22px) var(--body);color:var(--text);opacity:.9;animation:fadeUp .8s 1.3s both}\n.sub b{color:var(--amber);font-weight:600}\n.count{position:absolute!important;left:6cqw;top:66%;margin:0;font:600 clamp(11px,2.1cqw,24px) var(--display);color:var(--amber);animation:fadeUp .7s .8s both;display:flex;align-items:center;gap:1.4cqw}\n.count::before{content:\"\";display:block;width:6cqw;height:.35cqw;background:var(--amber);transform-origin:left;animation:grow .8s .7s both}\n.tthumbs{position:absolute!important;left:6cqw;right:6cqw;bottom:4.5cqw;display:flex;gap:1.2cqw;align-items:flex-end}\n.tthumbs img{height:8.5cqw;width:auto;max-width:18cqw;object-fit:cover;border-radius:.8cqw;animation:pop .5s both;animation-delay:calc(.9s + var(--i) * .12s)}\n.sc-img{background:var(--bg)}\n.pic{position:absolute;inset:6cqw 7cqw;display:grid;place-items:center}\n.pic img{width:auto;height:auto;max-width:100%;max-height:100%;object-fit:contain;animation-duration:var(--dur);animation-timing-function:linear;animation-fill-mode:both}\n.pic img.k1{animation-name:kb1}\n.pic img.k2{animation-name:kb2}\n.cap{position:absolute;left:4cqw;right:4cqw;bottom:3cqw;display:flex;align-items:flex-end;justify-content:space-between;gap:3cqw;background:rgba(14,11,23,.82);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-radius:10px;padding:1.6cqw 2.4cqw;color:var(--cc);animation:fadeUp .6s .35s both}\n.cap div{min-width:0}\n.cap small{display:block;font:600 clamp(8px,1.25cqw,13px) var(--body);letter-spacing:.16em;text-transform:uppercase;opacity:.75}\n.cap strong{display:block;font:700 clamp(12px,2.3cqw,26px)/1.1 var(--display);letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.cap span{flex:none;font:600 clamp(10px,1.6cqw,17px) var(--display);font-variant-numeric:tabular-nums;opacity:.8}\n.sc-outro .big{font-size:9cqw;top:42%}\n.contact-lines{position:absolute!important;left:6cqw;bottom:5.5cqw;margin:0;font:500 clamp(11px,2cqw,22px)/1.5 var(--body);animation:fadeUp .8s 1s both}\n.contact-lines b{color:var(--amber);font-weight:600}\n.stage.paused *,.stage.paused{animation-play-state:paused!important}\n.stage.settle .sc,.stage.settle .sc *{animation-duration:.001s!important;animation-delay:0s!important}\n.bigplay{position:absolute;inset:0;z-index:5;display:none;place-items:center;background:rgba(14,11,23,.35);pointer-events:none}\n.stage.userpaused .bigplay{display:grid}\n.bigplay span{width:max(52px,9cqw);aspect-ratio:1;border-radius:50%;background:var(--accent);display:grid;place-items:center}\n.bigplay svg{width:42%;fill:#fff;margin-left:6%}\n\n/* controls */\n.controls{display:flex;align-items:center;gap:10px;margin-top:12px}\n.ib{flex:none;width:40px;height:40px;border-radius:50%;border:1px solid var(--line);background:var(--panel);display:grid;place-items:center;padding:0}\n.ib:hover{border-color:var(--accent-hi)}\n.ib svg{width:16px;height:16px;fill:currentColor}\n.ib.main{background:var(--accent);border-color:var(--accent)}\n.time{flex:none;font:500 13px var(--display);font-variant-numeric:tabular-nums;color:var(--mute);min-width:5.4em;text-align:right}\n#seek{flex:1;min-width:0;height:20px;-webkit-appearance:none;appearance:none;background:transparent;margin:0;cursor:pointer}\n#seek::-webkit-slider-runnable-track{height:5px;border-radius:3px;background:linear-gradient(90deg,var(--accent-hi) var(--p,0%),var(--line) var(--p,0%))}\n#seek::-moz-range-track{height:5px;border-radius:3px;background:var(--line)}\n#seek::-moz-range-progress{height:5px;border-radius:3px;background:var(--accent-hi)}\n#seek::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#fff;margin-top:-4.5px;border:0}\n#seek::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:#fff;border:0}\n.rail{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-top:12px}\n.chap{position:relative;text-align:left;padding:10px 12px 12px;border:1px solid var(--line);border-radius:8px;background:var(--panel);overflow:hidden;min-width:0}\n.chap:hover{border-color:var(--accent-hi)}\n.chap.on{border-color:var(--accent)}\n.chap .nm{display:block;font:600 13px/1.25 var(--display);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.chap .ct{display:block;font:500 12px var(--body);color:var(--mute);margin-top:2px}\n.chap .fill{position:absolute;left:0;bottom:0;height:3px;width:calc(var(--p,0) * 100%);background:var(--accent-hi)}\n\n/* showcase */\n.cat{padding-top:72px;scroll-margin-top:calc(var(--sr-top,72px) + 70px)}\n.cat-head{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:8px 24px;margin-bottom:22px;padding-bottom:16px;border-bottom:1px solid var(--line)}\n.cat-head h2{font-size:clamp(26px,4vw,44px);letter-spacing:-.03em;line-height:1.05}\n.cat-head p{margin:6px 0 0;color:var(--mute);max-width:56ch;font-size:15px}\n.cat-head .n{font:600 14px var(--display);color:var(--amber);font-variant-numeric:tabular-nums;white-space:nowrap}\n.mason{column-count:3;column-gap:16px}\n.mason.two{column-count:2}\n.card{display:block;width:100%;break-inside:avoid;margin:0 0 16px;padding:0;border:0;background:none;text-align:left}\n.card .im{display:block;border-radius:10px;overflow:hidden;background:var(--panel);border:1px solid var(--line);transition:transform .35s cubic-bezier(.2,.8,.2,1),border-color .25s}\n.card img{display:block;width:100%;height:auto;transition:transform .6s cubic-bezier(.2,.8,.2,1)}\n.card:hover .im,.card:focus-visible .im{transform:translateY(-3px);border-color:var(--accent-hi)}\n.card:hover img{transform:scale(1.025)}\n.card .t{display:block;margin-top:9px;font:600 15px var(--display);letter-spacing:-.01em}\n.card .s{display:block;margin-top:1px;font-size:13px;color:var(--mute);line-height:1.4}\n\n/* madiotech build */\n.build{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:24px;align-items:start}\n.bstage{position:relative;border-radius:12px;overflow:hidden;border:1px solid var(--line);background:#f0f0f0;aspect-ratio:1138/740}\n.bstage img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}\n.bstage .open{position:absolute;right:12px;bottom:12px;padding:8px 14px;border-radius:99px;border:0;background:rgba(14,11,23,.82);color:#fff;font:500 13px var(--body)}\n.bstage .open:hover{background:var(--accent)}\n.bcontrol{margin-top:14px;display:flex;align-items:center;gap:14px}\n.bcontrol label{font:600 13px var(--display);color:var(--mute);white-space:nowrap}\n#brange{flex:1;min-width:0;-webkit-appearance:none;appearance:none;background:transparent;height:20px;margin:0;cursor:pointer}\n#brange::-webkit-slider-runnable-track{height:5px;border-radius:3px;background:linear-gradient(90deg,var(--amber) var(--p,0%),var(--line) var(--p,0%))}\n#brange::-moz-range-track{height:5px;border-radius:3px;background:var(--line)}\n#brange::-moz-range-progress{height:5px;border-radius:3px;background:var(--amber)}\n#brange::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#fff;margin-top:-6.5px;border:0}\n#brange::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#fff;border:0}\n.steps{display:grid;gap:10px}\n.step{display:grid;grid-template-columns:96px minmax(0,1fr);gap:12px;align-items:center;text-align:left;padding:8px;border:1px solid var(--line);border-radius:10px;background:var(--panel)}\n.step img{width:96px;height:auto;border-radius:6px;display:block}\n.step b{display:block;font:600 14px/1.25 var(--display)}\n.step span{display:block;font-size:12px;color:var(--mute);margin-bottom:2px;letter-spacing:.08em;text-transform:uppercase}\n.step:hover{border-color:var(--accent-hi)}\n.step.on{border-color:var(--amber)}\n\n/* contact */\n.contact{margin-top:96px;padding:40px 0 56px;border-top:1px solid var(--line);display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:32px}\n.contact h2{font-size:clamp(30px,5vw,56px);letter-spacing:-.035em;line-height:1}\n.contact p{color:var(--mute);margin:12px 0 0;max-width:46ch}\n.clist{display:grid;gap:14px;align-content:start}\n.clist div{display:flex;flex-wrap:wrap;gap:4px 12px;align-items:center;padding-bottom:14px;border-bottom:1px solid var(--line)}\n.clist dt{flex:0 0 100%;font:600 11px var(--body);letter-spacing:.16em;text-transform:uppercase;color:var(--mute)}\n.clist dd{margin:0;font:500 17px var(--display);overflow-wrap:anywhere}\n.clist{margin:0}\n.copyx{padding:6px 12px;border-radius:99px;border:1px solid var(--line);background:var(--panel);font:500 12px var(--body)}\n.copy:hover{border-color:var(--accent-hi)}\n\n@media (max-width:900px){\n  .mason{column-count:2}\n  .rail{grid-template-columns:repeat(3,minmax(0,1fr))}\n  .build{grid-template-columns:minmax(0,1fr)}\n  .steps{grid-template-columns:repeat(2,minmax(0,1fr))}\n  .contact{grid-template-columns:minmax(0,1fr)}\n}\n@media (max-width:560px){\n  .mason,.mason.two{column-count:1}\n  .rail{grid-template-columns:repeat(2,minmax(0,1fr))}\n  .steps{grid-template-columns:minmax(0,1fr)}\n  .brand small{display:none}\n  .time{display:none}\n  .cat{padding-top:56px}\n}\n@media (prefers-reduced-motion:reduce){\n  *,*::before,*::after{animation-duration:.001s!important;animation-delay:0s!important;transition-duration:.001s!important;scroll-behavior:auto!important}\n}\n";
var HTML="<div class=\"rootbox\"><div class=\"top\"><div class=\"wrap\"><nav class=\"chips\" id=\"chips\" aria-label=\"Showreel categories\"></nav></div></div>\n\n<main class=\"wrap\">\n  <section class=\"hero\" aria-label=\"Showreel\">\n    <div class=\"player\">\n    <div class=\"hero-head\">\n      <h2 class=\"h1\">Graphic Design<br>Showreel</h2>\n      <p id=\"heroMeta\"></p>\n    </div>\n    <div class=\"stage\" id=\"stage\" tabindex=\"0\" role=\"group\" aria-label=\"Showreel player. Press space to play or pause.\">\n      <div id=\"layer\"></div>\n      <div class=\"bigplay\" aria-hidden=\"true\"><span><svg viewBox=\"0 0 24 24\"><path d=\"M6 4l14 8-14 8z\"/></svg></span></div>\n    </div>\n    <div class=\"controls\">\n      <button class=\"ib\" id=\"bPrev\" aria-label=\"Previous scene\"><svg viewBox=\"0 0 24 24\"><path d=\"M6 5h2v14H6zM20 5v14L9 12z\"/></svg></button>\n      <button class=\"ib main\" id=\"bPlay\" aria-label=\"Pause\"><svg id=\"icoPause\" viewBox=\"0 0 24 24\"><path d=\"M6 4h4v16H6zM14 4h4v16h-4z\"/></svg><svg id=\"icoPlay\" viewBox=\"0 0 24 24\" hidden><path d=\"M6 4l14 8-14 8z\"/></svg></button>\n      <button class=\"ib\" id=\"bNext\" aria-label=\"Next scene\"><svg viewBox=\"0 0 24 24\"><path d=\"M16 5h2v14h-2zM4 5l11 7L4 19z\"/></svg></button>\n      <input type=\"range\" id=\"seek\" min=\"0\" max=\"1000\" value=\"0\" aria-label=\"Reel position\">\n      <span class=\"time\" id=\"time\">0:00 / 0:00</span>\n    </div>\n    <div class=\"rail\" id=\"rail\"></div>\n    </div>\n  </section>\n\n  <div id=\"showcase\"></div>\n\n  </main></div>";
var LBCSS=":host{all:initial;color:var(--text);font:400 16px/1.55 var(--body);\n  --ink:#0e0b17;\n  --panel:#171222;\n  --line:#2b2340;\n  --text:#f3effa;\n  --mute:#a198b5;\n  --accent:#7c3aed;\n  --accent-hi:#a78bfa;\n  --amber:#ffb020;\n  --display:\"Space Grotesk\",\"Segoe UI\",system-ui,sans-serif;\n  --body:\"Inter\",\"Segoe UI\",system-ui,-apple-system,sans-serif;\n  color-scheme:dark;\n}[hidden]{display:none!important}*{box-sizing:border-box}button{font:inherit;color:inherit;cursor:pointer}:focus-visible{outline:2px solid var(--accent-hi);outline-offset:3px}/* lightbox */\n#lb{position:fixed;inset:0;z-index:2147483000;background:rgba(8,6,13,.94);display:grid;grid-template-rows:minmax(0,1fr) auto;padding:max(16px,env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) max(16px,env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));gap:12px}\n#lb figure{margin:0;display:contents}\n#lb .pane{min-height:0;display:grid;place-items:center}\n#lb img{max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;border-radius:8px}\n#lb figcaption{display:flex;flex-wrap:wrap;gap:4px 16px;align-items:baseline;justify-content:center;text-align:center}\n#lb figcaption strong{font:700 18px var(--display)}\n#lb figcaption span{color:var(--mute);font-size:14px}\n#lb .no{font:600 13px var(--display);font-variant-numeric:tabular-nums;color:var(--amber)}\n.lbb{position:absolute;width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--panel);display:grid;place-items:center;padding:0;z-index:2}\n.lbb:hover{border-color:var(--accent-hi)}\n.lbb svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\n#lb-x{top:max(16px,env(safe-area-inset-top,0px));right:max(16px,env(safe-area-inset-right,0px))}\n#lb-p{left:max(12px,env(safe-area-inset-left,0px));top:50%;margin-top:-22px}\n#lb-n{right:max(12px,env(safe-area-inset-right,0px));top:50%;margin-top:-22px}\n\n";
var LBHTML="<div id=\"lb\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Image viewer\" hidden>\n  <button class=\"lbb\" id=\"lb-x\" aria-label=\"Close\"><svg viewBox=\"0 0 24 24\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg></button>\n  <button class=\"lbb\" id=\"lb-p\" aria-label=\"Previous image\"><svg viewBox=\"0 0 24 24\"><path d=\"M15 5l-7 7 7 7\"/></svg></button>\n  <button class=\"lbb\" id=\"lb-n\" aria-label=\"Next image\"><svg viewBox=\"0 0 24 24\"><path d=\"M9 5l7 7-7 7\"/></svg></button>\n  <figure>\n    <div class=\"pane\"><img id=\"lb-img\" alt=\"\"></div>\n    <figcaption><strong id=\"lb-t\"></strong><span id=\"lb-s\"></span><span class=\"no\" id=\"lb-c\"></span></figcaption>\n  </figure>\n</div>\n";
function ensureFonts(){
  if(document.querySelector('link[data-sr-fonts]'))return;
  if(document.fonts&&document.fonts.check&&document.fonts.check('16px "Space Grotesk"')&&document.fonts.check('16px Inter'))return;
  var l=document.createElement('link');l.rel='stylesheet';l.setAttribute('data-sr-fonts','');
  l.href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap';
  document.head.appendChild(l);
}
function run(root,host,lbRoot){


const CATS=[
  {id:'lettering',name:'Lettering & Graffiti',blurb:'Script lettering, bold type treatments and graffiti pieces.'},
  {id:'madiotech',name:'Madiotech Lettering',blurb:'One wordmark built up in four stages, from flat lettering to the finished piece with drips and toppings.'},
  {id:'collections',name:'Lettering Collections',blurb:'Boards that bring many lettering pieces together in one view.',cols:2,long:true},
  {id:'texteffects',name:'Text Effects & 3D Type',blurb:'Layered script and 3D text effects in bright colour.'},
  {id:'logos',name:'Logo Design',blurb:'Mascot, icon and wordmark logos, shown on colour fields and in use.'},
  {id:'neon',name:'Neon Signs',blurb:'Logos shown as glowing neon on a dark brick wall.'},
  {id:'branding',name:'Branding & Mockups',blurb:'Identity systems and print mockups.'},
  {id:'print',name:'Print & Cover Design',blurb:'T-shirt artwork and book cover layouts.',cols:2},
  {id:'web',name:'Web & UI Design',blurb:'Responsive website and app interface layouts, from landing pages to multi-page sites.'}
];
const $=(s,r=root)=>r.querySelector(s);const L=s=>lbRoot.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const IDX={};DATA.forEach((d,i)=>IDX[d.k]=i);
CATS.forEach(c=>c.items=DATA.filter(d=>d.c===c.id));

/* ---------- header, hero meta, chips, rail ---------- */
$('#heroMeta').textContent=DATA.length+' designs in '+CATS.length+' categories. Lettering, text effects, logos, neon, branding, print and web, played as a reel and laid out below.';
$('#chips').innerHTML=CATS.map(c=>'<a href="#'+c.id+'" data-id="'+c.id+'">'+esc(c.name)+'</a>').join('');

$('#chips').addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;e.preventDefault();const s=$('#'+a.dataset.id);if(s)s.scrollIntoView({behavior:'smooth',block:'start'})});
$('#rail').innerHTML=CATS.map((c,i)=>'<button class="chap" type="button" data-c="'+i+'"><span class="nm">'+esc(c.name)+'</span><span class="ct">'+pad(c.items.length)+' works</span><span class="fill"></span></button>').join('');

/* ---------- showcase ---------- */
const show=$('#showcase');
function cardHTML(d){
  return '<button class="card" type="button" data-i="'+IDX[d.k]+'"><span class="im"><img src="'+d.f+'" width="'+d.w+'" height="'+d.h+'" loading="lazy" alt="'+esc(d.t+(d.s?'. '+d.s:''))+'"></span><span class="t">'+esc(d.t)+'</span>'+(d.s?'<span class="s">'+esc(d.s)+'</span>':'')+'</button>';
}
show.innerHTML=CATS.map(c=>{
  let body;
  if(c.id==='madiotech'){
    const st=c.items;
    body='<div class="build"><div><div class="bstage" id="bstage">'+st.map((d,i)=>'<img src="'+d.f+'" alt="'+esc(d.t)+'" data-l="'+i+'" loading="lazy">').join('')+'<button class="open" id="bopen" type="button">View full size</button></div>'
      +'<div class="bcontrol"><label for="brange">Drag to build</label><input type="range" id="brange" min="0" max="3" step="0.01" value="0"></div></div>'
      +'<div class="steps">'+st.map((d,i)=>'<button class="step" type="button" data-s="'+i+'"><img src="'+d.f+'" alt="" loading="lazy"><div><span>'+esc(d.s)+'</span><b>'+esc(d.t.split(': ')[1])+'</b></div></button>').join('')+'</div></div>';
  }else{
    body='<div class="mason'+(c.cols===2||c.items.length<=2?' two':'')+'">'+c.items.map(cardHTML).join('')+'</div>';
  }
  return '<section class="cat" id="'+c.id+'"><div class="cat-head"><div><h2>'+esc(c.name)+'</h2><p>'+esc(c.blurb)+'</p></div><span class="n">'+pad(c.items.length)+' works</span></div>'+body+'</section>';
}).join('');

/* ---------- lightbox ---------- */
const lb=L('#lb'),lbImg=L('#lb-img');let lbI=0,lastFocus=null;
function lbShow(i){
  lbI=(i+DATA.length)%DATA.length;const d=DATA[lbI];
  lbImg.src=d.f;lbImg.alt=d.t;
  L('#lb-t').textContent=d.t;L('#lb-s').textContent=d.s||'';
  L('#lb-c').textContent=pad(lbI+1)+' / '+pad(DATA.length);
}
function lbOpen(i){lastFocus=document.activeElement;lbShow(i);lb.hidden=false;document.body.style.overflow='hidden';L('#lb-x').focus()}
function lbClose(){lb.hidden=true;document.body.style.overflow='';if(lastFocus&&lastFocus.focus)lastFocus.focus()}
L('#lb-x').onclick=lbClose;L('#lb-p').onclick=()=>lbShow(lbI-1);L('#lb-n').onclick=()=>lbShow(lbI+1);
lb.addEventListener('click',e=>{if(e.target===lb||e.target.classList.contains('pane'))lbClose()});
document.addEventListener('keydown',e=>{
  if(lb.hidden)return;
  if(e.key==='Escape')lbClose();
  else if(e.key==='ArrowLeft')lbShow(lbI-1);
  else if(e.key==='ArrowRight')lbShow(lbI+1);
});
show.addEventListener('click',e=>{const c=e.target.closest('.card');if(c)lbOpen(+c.dataset.i)});

/* ---------- Madiotech build slider ---------- */
const brange=$('#brange'),bimgs=[...root.querySelectorAll('#bstage img')],steps=[...root.querySelectorAll('.step')];
function setBuild(v){
  v=Math.max(0,Math.min(3,v));
  bimgs.forEach((im,i)=>{im.style.opacity=i===0?1:Math.max(0,Math.min(1,v-(i-1)))});
  brange.value=v;brange.style.setProperty('--p',(v/3*100)+'%');
  const n=Math.round(v);steps.forEach((s,i)=>s.classList.toggle('on',i===n));
}
let bTween=0;
function tweenBuild(to,ms){
  cancelAnimationFrame(bTween);
  const from=+brange.value,t0=performance.now();
  const f=now=>{const p=Math.min(1,(now-t0)/ms),e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;setBuild(from+(to-from)*e);if(p<1)bTween=requestAnimationFrame(f)};
  bTween=requestAnimationFrame(f);
}
brange.addEventListener('input',()=>{cancelAnimationFrame(bTween);setBuild(+brange.value)});
steps.forEach((s,i)=>s.onclick=()=>tweenBuild(i,700));
$('#bopen').onclick=()=>lbOpen(IDX['mad'+(Math.round(+brange.value)+1)]);
setBuild(0);
new IntersectionObserver((en,ob)=>{if(en[0].isIntersecting){ob.disconnect();if(+brange.value===0)tweenBuild(3,4200)}},{threshold:.5}).observe($('#bstage'));

/* ---------- scroll spy ---------- */
const chipEls=[...root.querySelectorAll('.chips a')];
const spy=new IntersectionObserver(en=>{en.forEach(x=>{if(x.isIntersecting){chipEls.forEach(a=>a.classList.toggle('on',a.dataset.id===x.target.id));const a=chipEls.find(a=>a.dataset.id===x.target.id);if(a&&a.scrollIntoView)a.parentElement.scrollTo({left:a.offsetLeft-16,behavior:'smooth'})}})},{rootMargin:'-30% 0px -60% 0px'});
root.querySelectorAll('.cat').forEach(s=>spy.observe(s));

/* ---------- reel ---------- */
const stage=$('#stage'),layer=$('#layer'),seek=$('#seek');
const BLOBS=['#ffbe3d','#ff4d4d','#14e0ff','#e891ff','#6fd946'];
const blobsHTML='<div class="blobs">'+BLOBS.map((c,i)=>'<i style="--c:'+c+';--x:'+[12,82,48,26,90][i]+'%;--y:'+[20,28,92,86,84][i]+'%;--dl:-'+(i*1.7)+'s"></i>').join('')+'</div>';
const scenes=[{type:'intro',dur:3400}];
CATS.forEach((c,ci)=>{
  scenes.push({type:'title',ci,dur:1700});
  c.items.forEach((d,j)=>scenes.push({type:'img',ci,d,j,dur:c.id==='madiotech'?1500:(c.long?2700:2000)}));
});
scenes.push({type:'outro',dur:3600});
let total=0;scenes.forEach(s=>{s.start=total;total+=s.dur});
const chapters=CATS.map((c,ci)=>{const a=scenes.find(s=>s.ci===ci&&s.type==='title');const b=scenes.filter(s=>s.ci===ci).pop();return{start:a.start,end:b.start+b.dur,idx:scenes.indexOf(a)}});
const rail=[...root.querySelectorAll('.chap')];
const fmt=ms=>{const s=Math.floor(ms/1000);return Math.floor(s/60)+':'+pad(s%60)};

function words(text,base){
  let n=0;
  return text.split(' ').map(w=>'<span class="w">'+[...w].map(ch=>'<span class="l" style="--d:'+(base+(n++)*0.035).toFixed(3)+'s">'+esc(ch)+'</span>').join('')+'</span>').join('');
}
function lum(hex){const n=parseInt(hex.slice(1),16),r=n>>16,g=(n>>8)&255,b=n&255;return(0.299*r+0.587*g+0.114*b)/255}

let t=0,cur=-1,last=performance.now(),want=!matchMedia('(prefers-reduced-motion: reduce)').matches,onScreen=true,dragging=false;
let playing=want;

function render(i){
  cur=i;const s=scenes[i];const el=document.createElement('div');
  el.className='sc sc-'+s.type;el.style.setProperty('--dur',s.dur+'ms');
  if(s.type==='intro'){
    el.innerHTML=blobsHTML+'<p class="kick">Muhammad Anas &middot; Muzaffarabad, Pakistan</p><h2 class="kin" role="presentation">'+words('Graphic Design Showreel',.15)+'</h2><p class="sub">Lettering <b>/</b> Logos <b>/</b> Neon <b>/</b> Branding <b>/</b> Print <b>/</b> Web</p>';
  }else if(s.type==='title'){
    const c=CATS[s.ci];
    el.innerHTML=blobsHTML+'<p class="kick">Chapter '+(s.ci+1)+' of '+CATS.length+'</p><h2 class="big">'+words(c.name,.1)+'</h2><p class="count">'+pad(c.items.length)+' works</p><div class="tthumbs">'+c.items.map((d,k)=>'<img style="--i:'+k+'" src="'+d.f+'" alt="">').join('')+'</div>';
  }else if(s.type==='img'){
    const d=s.d,c=CATS[s.ci];
    el.style.setProperty('--bg',d.bg);el.style.setProperty('--cc',lum(d.bg)>.55?'#15101f':'#ffffff');
    el.innerHTML='<div class="pic"><img class="'+(i%2?'k1':'k2')+'" src="'+d.f+'" alt=""></div><div class="cap"><div><small>'+esc(c.name)+(d.s&&c.id==='madiotech'?' &middot; '+esc(d.s):'')+'</small><strong>'+esc(d.t)+'</strong></div><span>'+pad(IDX[d.k]+1)+' / '+pad(DATA.length)+'</span></div>';
  }else{
    el.innerHTML=blobsHTML+'<p class="kick">Thanks for watching</p><h2 class="big">'+words("Let's work together",.1)+'</h2><p class="contact-lines">visiospectra786@gmail.com<br><b>WhatsApp</b> +92 317 5251823</p>';
  }
  const first=!layer.firstChild;
  if(!first&&playing)el.classList.add('enter');
  stage.classList.toggle('settle',!playing&&!onHold());
  layer.appendChild(el);el.style.zIndex=2;
  [...layer.children].forEach(o=>{if(o!==el){o.style.zIndex=1;setTimeout(()=>o.remove(),850)}});
}
function onHold(){return false}
function sceneAt(ms){let i=0;while(i<scenes.length-1&&ms>=scenes[i].start+scenes[i].dur)i++;return i}
function setPlaying(p){
  playing=p&&onScreen&&!document.hidden;
  stage.classList.toggle('paused',!playing);
  stage.classList.toggle('userpaused',!want);
  $('#icoPause').hidden=!want;$('#icoPlay').hidden=want;
  $('#bPlay').setAttribute('aria-label',want?'Pause':'Play');
}
function seekTo(ms,force){
  t=Math.max(0,Math.min(total-1,ms));cur=-1;
  const i=sceneAt(t);
  // restart the scene from its first frame so its animation plays from the start
  t=scenes[i].start;
  render(i);
}
function tick(now){
  const dt=Math.min(now-last,100);last=now;
  if(playing&&!dragging){t+=dt;if(t>=total)t-=total}
  const i=sceneAt(t);
  if(i!==cur)render(i);
  if(!dragging){seek.value=Math.round(t/total*1000);seek.style.setProperty('--p',(t/total*100)+'%')}
  $('#time').textContent=fmt(t)+' / '+fmt(total);
  chapters.forEach((c,k)=>{
    const p=Math.max(0,Math.min(1,(t-c.start)/(c.end-c.start)));
    rail[k].style.setProperty('--p',p);rail[k].classList.toggle('on',t>=c.start&&t<c.end);
  });
  requestAnimationFrame(tick);
}
$('#bPlay').onclick=()=>{want=!want;setPlaying(want);if(want&&!stage.querySelector('.sc'))render(sceneAt(t))};
stage.addEventListener('click',()=>{want=!want;setPlaying(want)});
stage.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();want=!want;setPlaying(want)}});
$('#bNext').onclick=()=>{const i=Math.min(scenes.length-1,sceneAt(t)+1);seekTo(scenes[i].start)};
$('#bPrev').onclick=()=>{const i=sceneAt(t);const into=t-scenes[i].start;seekTo(scenes[into>900?i:Math.max(0,i-1)].start)};
rail.forEach((b,k)=>b.onclick=()=>seekTo(chapters[k].start));
seek.addEventListener('input',()=>{dragging=true;seekTo(seek.value/1000*total)});
seek.addEventListener('change',()=>{dragging=false});
seek.addEventListener('pointerup',()=>{dragging=false});
document.addEventListener('visibilitychange',()=>setPlaying(want));
new IntersectionObserver(en=>{onScreen=en[0].isIntersecting;setPlaying(want)},{threshold:.3}).observe(stage);
setPlaying(want);
requestAnimationFrame(now=>{last=now;tick(now)});

}
class GraphicShowreel extends HTMLElement{
  connectedCallback(){
    if(this._sr)return;this._sr=true;
    ensureFonts();
    var st=this.getAttribute('sticky-top');if(st)this.style.setProperty('--sr-top',parseInt(st,10)+'px');
    var root=this.attachShadow({mode:'open'});
    root.innerHTML='<style>'+CSS+'</style>'+HTML;
    var lbHost=document.createElement('div');lbHost.setAttribute('data-sr-lightbox','');
    document.body.appendChild(lbHost);
    var lbRoot=lbHost.attachShadow({mode:'open'});
    lbRoot.innerHTML='<style>'+LBCSS+'</style>'+LBHTML;
    run(root,this,lbRoot);
  }
}
customElements.define('graphic-showreel',GraphicShowreel);
})();
