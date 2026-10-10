'use strict';
// Real branded products; sample CAD prices for this portfolio demo.
const products = [
  {
    "id": "gpu-apex",
    "name": "NVIDIA GeForce RTX 4090",
    "category": "GPUs",
    "price": 89900,
    "image": "assets/products/gpu.png",
    "tag": "FLAGSHIP",
    "subtitle": "Founders Edition graphics card",
    "description": "A flagship NVIDIA graphics card for ambitious desktop builds.",
    "specs": [
      "24 GB GDDR6X memory",
      "Founders Edition",
      "Check case and power-supply compatibility"
    ],
    "source": "https://www.amazon.ca/s?k=NVIDIA%20GeForce%20RTX%204090",
    "sourceLabel": "Find on Amazon ↗"
  },
  {
    "id": "cpu-core",
    "name": "AMD Ryzen 7 7800X3D",
    "category": "CPUs",
    "price": 42900,
    "image": "assets/products/cpu.png",
    "tag": "POWER PICK",
    "subtitle": "Desktop gaming processor",
    "description": "An eight-core, sixteen-thread desktop processor for an AM5 gaming build.",
    "specs": [
      "8 cores / 16 threads",
      "Socket AM5",
      "Check motherboard compatibility"
    ],
    "source": "https://www.amazon.ca/dp/B0BTZB7F88",
    "sourceLabel": "View Amazon listing ↗"
  },
  {
    "id": "audio-phantom",
    "name": "Razer BlackShark V2 Pro (2023)",
    "category": "Headphones",
    "price": 14900,
    "image": "assets/products/headset.png",
    "tag": "FEATURED",
    "subtitle": "Wireless headset · 2023 PC edition",
    "description": "A wireless gaming headset with a detachable microphone, titanium-coated drivers and USB-C charging.",
    "specs": [
      "50 mm drivers",
      "2.4 GHz wireless",
      "Up to 70 hours battery life"
    ],
    "source": "https://www.amazon.ca/dp/B0BY1FXC9N",
    "sourceLabel": "View Amazon listing ↗"
  },
  {
    "id": "keyboard-strike",
    "name": "Razer Huntsman V3 Pro TKL",
    "category": "Accessories",
    "price": 11900,
    "image": "assets/products/keyboard.png",
    "tag": "DESK ESSENTIAL",
    "subtitle": "Tenkeyless esports keyboard",
    "description": "A compact wired keyboard with adjustable key actuation and Rapid Trigger for responsive play.",
    "specs": [
      "Tenkeyless layout",
      "Gen-2 analog optical switches",
      "Adjustable actuation and Rapid Trigger"
    ],
    "source": "https://www.amazon.ca/dp/B0CG7BWG7J",
    "sourceLabel": "View Amazon listing ↗"
  },
  {
    "id": "mouse-ghost",
    "name": "Razer DeathAdder V3 Pro",
    "category": "Accessories",
    "price": 7900,
    "image": "assets/products/mouse.png",
    "tag": "PRECISION",
    "subtitle": "Wireless ergonomic gaming mouse",
    "description": "A lightweight ergonomic wireless mouse with a high-resolution sensor and USB-C charging.",
    "specs": [
      "63 g design",
      "Focus Pro 30K optical sensor",
      "Up to 90 hours battery life"
    ],
    "source": "https://www.amazon.ca/dp/B0B6XZLNHQ",
    "sourceLabel": "View Amazon listing ↗"
  },
  {
    "id": "monitor-horizon",
    "name": "Razer Raptor 27",
    "category": "Accessories",
    "price": 32900,
    "image": "assets/products/monitor.png",
    "tag": "WIDE OPEN",
    "subtitle": "27-inch gaming monitor",
    "description": "A Razer gaming display with a distinctive desktop stand.",
    "specs": [
      "27-inch display",
      "QHD resolution",
      "Gaming monitor"
    ],
    "source": "https://www.amazon.ca/s?k=Razer%20Raptor%2027",
    "sourceLabel": "Find on Amazon ↗"
  }
];
const money = cents => new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(cents/100);
function normalizeCart(value){const out={};if(!value||typeof value!=='object'||Array.isArray(value))return out;for(const p of products){const count=value[p.id];if(Number.isInteger(count)&&count>0)out[p.id]=Math.min(count,99);}return out;}
function totals(cart){const clean=normalizeCart(cart);return products.reduce((acc,p)=>{acc.count+=clean[p.id]||0;acc.subtotal+=(clean[p.id]||0)*p.price;return acc;},{count:0,subtotal:0});}
function filterProducts(category,query,sort){let list=products.filter(p=>(category==='All'||p.category===category)&&[p.name,p.category,p.subtitle].join(' ').toLowerCase().includes(query.trim().toLowerCase()));if(sort==='low')list.sort((a,b)=>a.price-b.price);if(sort==='high')list.sort((a,b)=>b.price-a.price);if(sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name));return list;}
if(typeof module!=='undefined')module.exports={products,normalizeCart,totals,filterProducts};
if(typeof document!=='undefined'){
 const $=selector=>document.querySelector(selector),grid=$('#product-grid'),cartDialog=$('#cart-dialog'),detailDialog=$('#product-dialog'),orderDialog=$('#order-dialog');
 let cart={},category='All',toastTimer;const storageKey='torico-branded-cart-v2';
 try{cart=normalizeCart(JSON.parse(localStorage.getItem(storageKey)||'{}'));}catch{cart={};}
 function notify(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2500);}
 function persist(){try{localStorage.setItem(storageKey,JSON.stringify(cart));}catch{notify('Cart works for this visit; browser storage is unavailable.');}renderCart();}
 function selectCategory(next){category=next;document.querySelectorAll('.tabs button').forEach(button=>{const active=button.dataset.category===category;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});renderProducts();}
 function renderProducts(){const list=filterProducts(category,$('#search').value,$('#sort').value);$('#result-count').textContent=list.length+' products';$('#empty').hidden=list.length>0;grid.innerHTML=list.map(p=>`<article class="product-card"><button class="product-picture" data-detail="${p.id}" aria-label="View ${p.name} details"><span class="badge">${p.tag}</span><img src="${p.image}" alt="${p.name} product photo" loading="lazy"></button><div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p>${p.subtitle}</p><div class="price-row"><span class="price">${money(p.price)} <small>CAD</small></span><button class="add-button" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button></div></div></article>`).join('');}
 function add(id){if(!products.some(p=>p.id===id))return;if((cart[id]||0)>=99){notify('Maximum 99 of each item.');return;}cart[id]=(cart[id]||0)+1;persist();notify(products.find(p=>p.id===id).name+' added to your bag');}
 function renderCart(){const {count,subtotal}=totals(cart);$('#cart-count').textContent=count;$('#open-cart').setAttribute('aria-label','Open shopping bag, '+count+' items');$('#checkout').disabled=count===0;$('#cart-items').innerHTML=count?products.filter(p=>cart[p.id]).map(p=>`<div class="cart-item"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><p>${money(p.price)} each</p><div class="quantity"><button data-change="${p.id}" data-delta="-1" aria-label="Decrease ${p.name} quantity">−</button><span aria-label="Quantity">${cart[p.id]}</span><button data-change="${p.id}" data-delta="1" aria-label="Increase ${p.name} quantity" ${cart[p.id]>=99?'disabled':''}>+</button></div></div><div><p>${money(p.price*cart[p.id])}</p><button class="remove" data-remove="${p.id}" aria-label="Remove ${p.name}">Remove</button></div></div>`).join(''):'<div class="empty"><h3>Your bag is waiting.</h3><p>Explore the gear and start building your loadout.</p></div>';$('#cart-summary').innerHTML=count?`<div class="summary-line"><span>Items (${count})</span><span>${money(subtotal)}</span></div><div class="summary-line"><span>Shipping</span><span>Demo — no delivery</span></div><div class="summary-line summary-total"><span>Demo subtotal</span><span>${money(subtotal)}</span></div>`:'';}
 function detail(id){const p=products.find(p=>p.id===id);if(!p)return;$('#product-detail').innerHTML=`<img class="detail-image" src="${p.image}" alt="${p.name} product photo"><div class="detail-copy"><div class="eyebrow">${p.category.toUpperCase()} / DEMO LISTING</div><h2 id="detail-title">${p.name}</h2><p>${p.description}</p><ul>${p.specs.map(s=>`<li>${s}</li>`).join('')}</ul><div class="price">${money(p.price)} <small>CAD</small></div><a class="retailer-link" href="${p.source}" target="_blank" rel="noopener noreferrer">${p.sourceLabel}</a><button class="primary full" data-add="${p.id}">Add to bag <span>+</span></button></div>`;detailDialog.showModal();}
 document.addEventListener('click',event=>{const button=event.target.closest('button,a');if(!button)return;if(button.dataset.add)add(button.dataset.add);if(button.dataset.detail)detail(button.dataset.detail);if(button.dataset.category)selectCategory(button.dataset.category);if(button.dataset.change){const id=button.dataset.change;cart[id]=Math.max(0,Math.min(99,(cart[id]||0)+Number(button.dataset.delta)));if(!cart[id])delete cart[id];persist();}if(button.dataset.remove){delete cart[button.dataset.remove];persist();}});
 $('#search').addEventListener('input',renderProducts);$('#sort').addEventListener('change',renderProducts);
 function resetFilters(){$('#search').value='';$('#sort').value='featured';selectCategory('All');}
 $('#clear-filters').addEventListener('click',resetFilters);$('#browse-all').addEventListener('click',resetFilters);
 $('#open-cart').addEventListener('click',()=>cartDialog.showModal());$('#close-cart').addEventListener('click',()=>cartDialog.close());$('#close-product').addEventListener('click',()=>detailDialog.close());$('#close-order').addEventListener('click',()=>orderDialog.close());
 [cartDialog,detailDialog,orderDialog].forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}));
 $('#checkout').addEventListener('click',()=>{const {count,subtotal}=totals(cart);if(!count)return;$('#order-message').textContent='Demo order confirmed: '+count+' item'+(count===1?'':'s')+' · '+money(subtotal)+' CAD subtotal.';cart={};persist();cartDialog.close();orderDialog.showModal();});
 renderProducts();renderCart();
}
