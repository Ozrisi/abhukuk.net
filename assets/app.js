
(() => {
  'use strict';
  const en = document.documentElement.lang === 'en';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const menu = $('.menu-toggle');
  function closeMenu() { document.body.classList.remove('menu-open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label',en?'Open menu':'Menüyü aç'); }
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';document.body.classList.toggle('menu-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',en?(open?'Close menu':'Open menu'):(open?'Menüyü kapat':'Menüyü aç'));});
  $$('.main-nav a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open')){closeMenu();menu.focus();}});
  window.matchMedia('(min-width:681px)').addEventListener('change',closeMenu);
  const items=$$('.practice-item');
  let activeFilter='all';
  const normalize = value => value.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i');
  function filterServices() {
    const query=normalize($('#practice-search').value.trim());
    let count=0;
    items.forEach(item=>{const show=(activeFilter==='all'||item.dataset.category.split(' ').includes(activeFilter))&&normalize(item.textContent).includes(query);item.hidden=!show;if(show)count++;});
    $('#no-results').hidden=count!==0;
    $('#search-status').textContent=en?count+' practice areas shown':count+' çalışma alanı gösteriliyor';
  }
  $$('.filter').forEach(button=>button.addEventListener('click',()=>{
    activeFilter=button.dataset.filter;
    $$('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
    filterServices();
  }));
  $('#practice-search').addEventListener('input',filterServices);
  $('#clear-search').addEventListener('click',()=>{$('#practice-search').value='';$('.filter[data-filter="all"]').click();$('#practice-search').focus();});
  items.forEach(item=>item.addEventListener('toggle',()=>{if(item.open)items.forEach(other=>{if(other!==item)other.open=false;});}));
  const tabs=$$('[role="tab"]');
  function setTab(tab,focus=false){
    tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active;});
    if(focus)tab.focus();
    const panel=document.getElementById(tab.getAttribute('aria-controls'));
    if(window.gsap&&!reduced.matches)gsap.fromTo(panel,{opacity:.35,y:8},{opacity:1,y:0,duration:.4,overwrite:true});
  }
  tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>setTab(tab));tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight')next=(index+1)%tabs.length;
    else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
    else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;
    if(next!==undefined){event.preventDefault();setTab(tabs[next],true);}
  });});
  const documents = en ? {
    general:['Relevant agreements and correspondence','Any notices and case reference numbers','A brief, chronological account of events','Questions you would like to discuss'],
    debt:['Documents supporting the debt and any agreements','Payment records and bank statements','Any enforcement notices or case references','Relevant correspondence between the parties'],
    criminal:['Any summons, notices or case references','Statements and records already available to you','A chronological account of the events','Information about relevant documents and witnesses'],
    maritime:['Vessel registration and ownership documents','Sale, charter or operating agreements','Insurance policies and relevant correspondence','Any reports or notices relating to the dispute'],
    property:['Lease or sale agreement','Available title deed and property details','Payment records and notices','Correspondence relating to the property'],
    employment:['Employment agreement and related correspondence','Payslips and available payment records','Any termination notices','Information about employment dates and working conditions'],
    family:['Available case documents and notices','Relevant family or inheritance documents','Information about assets and agreements','A brief account of the matters you wish to discuss']
  } : {
    general:['Konuyla ilgili sözleşmeler ve yazışmalar','Varsa tebligatlar ve dosya bilgileri','Olayları tarih sırasıyla özetleyen kısa bir not','Görüşmede yanıtını aradığınız sorular'],
    debt:['Alacağın dayanağı olan belgeler ve sözleşmeler','Ödeme kayıtları ve hesap hareketleri','Varsa ödeme emri ve icra dosyası bilgileri','Taraflar arasındaki ilgili yazışmalar'],
    criminal:['Varsa çağrı kâğıdı, tebligat veya dosya numarası','Elinizde bulunan ifade ve tutanaklar','Olayların tarih sırasına göre kısa özeti','İlgili belge ve tanıklara ilişkin bilgiler'],
    maritime:['Tekne tescil ve mülkiyet belgeleri','Satış, kiralama veya işletme sözleşmeleri','Sigorta poliçeleri ve ilgili yazışmalar','Uyuşmazlığa ilişkin tutanak ve bildirimler'],
    property:['Kira veya satış sözleşmesi','Elinizdeki tapu ve taşınmaz bilgileri','Ödeme kayıtları ve ihtarnameler','Taşınmazla ilgili yazışmalar'],
    employment:['İş sözleşmesi ve ilgili yazışmalar','Bordrolar ve mevcut ödeme kayıtları','Varsa fesih bildirimi ve tebligatlar','Çalışma dönemi ve koşullarına ilişkin bilgiler'],
    family:['Varsa dava belgeleri ve tebligatlar','İlgili aile veya miras belgeleri','Malvarlığı ve anlaşmalara ilişkin bilgiler','Görüşmek istediğiniz konuların kısa özeti']
  };
  $('#preparation-topic').addEventListener('change',event=>{$('#preparation-docs').replaceChildren(...documents[event.target.value].map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));});
  $$('[data-topic]').forEach(a=>a.addEventListener('click',()=>{const topic=a.dataset.topic;$('#selected-topic').hidden=false;$('#selected-topic').textContent=(en?'Subject: ':'Görüşme konusu: ')+topic;$('#contact-email').href='mailto:info@abhukuk.net?subject='+encodeURIComponent(topic);}));
  $('.copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('info@abhukuk.net');$('#copy-status').textContent=en?'Email address copied.':'E-posta adresi kopyalandı.';}catch{$('#copy-status').textContent=en?'Copy this address: info@abhukuk.net':'Kopyalanacak adres: info@abhukuk.net';}});
  $('#load-map').addEventListener('click',()=>{
    const frame=document.createElement('iframe');frame.title=en?'AB Hukuk office location':'AB Hukuk Bürosu konumu';frame.referrerPolicy='no-referrer';frame.loading='lazy';
    frame.src='https://maps.google.com/maps?q=Kale%20%C4%B0%C5%9F%20Merkezi%2C%20Gazderesi%20Caddesi%2C%20Konac%C4%B1k%2C%20Bodrum%2C%20Mu%C4%9Fla&z=16&output=embed';
    $('#map-container').replaceChildren(frame);
  });
  $$('[data-dialog]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.dialog).showModal()));
  $$('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});});
  $('#year').textContent=new Date().getFullYear();
  $$('.language-switch a').forEach(a=>a.addEventListener('click',()=>{const url=new URL(a.href);url.hash=location.hash;a.href=url.href;}));
  if(window.gsap&&!reduced.matches){
    gsap.timeline({defaults:{ease:'power2.out'}}).from('.hero-location',{opacity:0,y:10,duration:.7}).from('h1',{opacity:0,y:20,duration:1},.1).from('.hero-description,.hero-actions',{opacity:0,y:12,duration:.8,stagger:.12},.4);
  }
})();


