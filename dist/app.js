'use strict';
// Real branded products; sample CAD prices for this portfolio demo.
const products = [
  {
    "id": "gpu-apex",
    "name": "NVIDIA GeForce RTX 4090",
    "category": "GPUs",
    "price": 89900,
    "image": "https://images.nvidia.com/aem-dam/Solutions/geforce/ada/rtx-4090/geforce-rtx-4090-product-gallery-inline-850-1.jpg",
    "tag": "FLAGSHIP",
    "subtitle": "Founders Edition graphics card",
    "description": "A flagship NVIDIA graphics card for ambitious desktop builds.",
    "specs": [
      "24 GB GDDR6X memory",
      "Founders Edition",
      "Check case and power-supply compatibility"
    ]
  },
  {
    "id": "cpu-core",
    "name": "AMD Ryzen 7 7800X3D",
    "category": "CPUs",
    "price": 42900,
    "image": "https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-7-7800x3d-og.jpg",
    "tag": "POWER PICK",
    "subtitle": "Desktop gaming processor",
    "description": "AMD desktop processor with 3D V-Cache technology.",
    "specs": [
      "Ryzen 7 desktop processor",
      "AM5 platform",
      "Check motherboard compatibility"
    ]
  },
  {
    "id": "audio-phantom",
    "name": "Razer BlackShark V2 Pro",
    "category": "Headphones",
    "price": 14900,
    "image": "https://media.hifi.lu/sys-master/products/9458894176286/2160x2160.61007879_10.webp",
    "tag": "FEATURED",
    "subtitle": "Wireless gaming headset",
    "description": "A wireless esports headset with cushioned earcups and a boom microphone.",
    "specs": [
      "Over-ear design",
      "Wireless connectivity",
      "Boom microphone"
    ]
  },
  {
    "id": "keyboard-strike",
    "name": "Razer Huntsman V3 Pro TKL",
    "category": "Accessories",
    "price": 11900,
    "image": "https://assets3.razerzone.com/hX5FTTxuLq08WzPrp5TbJuX-BhY%3D/1920x1280/https%3A%2F%2Fmedias-p1.phoenix.razer.com%2Fsys-master-phoenix-images-container%2Fhf6%2Fh65%2F9705254191134%2Fhuntsman-v3-pro-tkl-2-500x500.png",
    "tag": "DESK ESSENTIAL",
    "subtitle": "Tenkeyless esports keyboard",
    "description": "An analog optical gaming keyboard in a compact tenkeyless layout.",
    "specs": [
      "Tenkeyless layout",
      "Analog optical switches",
      "Wrist rest"
    ]
  },
  {
    "id": "mouse-ghost",
    "name": "Razer DeathAdder V3 Pro",
    "category": "Accessories",
    "price": 7900,
    "image": "https://wo.ua/upload/resize_cache/iblock/99c/790_790_1/4ncl7clul4cdfdcjc819me0gv8yfjdqp.jpg",
    "tag": "PRECISION",
    "subtitle": "Wireless ergonomic gaming mouse",
    "description": "A wireless gaming mouse with a right-handed ergonomic shape.",
    "specs": [
      "Right-handed design",
      "Wireless connectivity",
      "Focus Pro optical sensor"
    ]
  },
  {
    "id": "monitor-horizon",
    "name": "Razer Raptor 27",
    "category": "Accessories",
    "price": 32900,
    "image": "https://www.canex.ca/media/catalog/product/6/6/663166_539817_01_front_zoom.jpg",
    "tag": "WIDE OPEN",
    "subtitle": "27-inch gaming monitor",
    "description": "A Razer gaming display with a distinctive desktop stand.",
    "specs": [
      "27-inch display",
      "QHD resolution",
      "Gaming monitor"
    ]
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
 function detail(id){const p=products.find(p=>p.id===id);if(!p)return;$('#product-detail').innerHTML=`<img class="detail-image" src="${p.image}" alt="${p.name} product photo"><div class="detail-copy"><div class="eyebrow">${p.category.toUpperCase()} / DEMO LISTING</div><h2 id="detail-title">${p.name}</h2><p>${p.description}</p><ul>${p.specs.map(s=>`<li>${s}</li>`).join('')}</ul><div class="price">${money(p.price)} <small>CAD</small></div><button class="primary full" data-add="${p.id}">Add to bag <span>+</span></button></div>`;detailDialog.showModal();}
 document.addEventListener('click',event=>{const button=event.target.closest('button,a');if(!button)return;if(button.dataset.add)add(button.dataset.add);if(button.dataset.detail)detail(button.dataset.detail);if(button.dataset.category)selectCategory(button.dataset.category);if(button.dataset.change){const id=button.dataset.change;cart[id]=Math.max(0,Math.min(99,(cart[id]||0)+Number(button.dataset.delta)));if(!cart[id])delete cart[id];persist();}if(button.dataset.remove){delete cart[button.dataset.remove];persist();}});
 $('#search').addEventListener('input',renderProducts);$('#sort').addEventListener('change',renderProducts);
 function resetFilters(){$('#search').value='';$('#sort').value='featured';selectCategory('All');}
 $('#clear-filters').addEventListener('click',resetFilters);$('#browse-all').addEventListener('click',resetFilters);
 $('#open-cart').addEventListener('click',()=>cartDialog.showModal());$('#close-cart').addEventListener('click',()=>cartDialog.close());$('#close-product').addEventListener('click',()=>detailDialog.close());$('#close-order').addEventListener('click',()=>orderDialog.close());
 [cartDialog,detailDialog,orderDialog].forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}));
 $('#checkout').addEventListener('click',()=>{const {count,subtotal}=totals(cart);if(!count)return;$('#order-message').textContent='Demo order confirmed: '+count+' item'+(count===1?'':'s')+' · '+money(subtotal)+' CAD subtotal.';cart={};persist();cartDialog.close();orderDialog.showModal();});
 renderProducts();renderCart();
}
