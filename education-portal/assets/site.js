(function(){
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const params=new URLSearchParams(location.search);
  const base=location.pathname.endsWith('/course.html')||location.pathname.endsWith('course.html')?'':'./';
  fetch(base+'courses/catalog.json').then(r=>{if(!r.ok)throw Error('Không tải được danh mục');return r.json()}).then(init).catch(e=>{const el=document.querySelector('#course-grid,#markdown');if(el)el.innerHTML=`<p>${esc(e.message)}. Hãy chạy website qua HTTP thay vì mở file trực tiếp.</p>`});

  function init(data){ document.getElementById('course-grid')?catalog(data.courses):reader(data.courses); }
  function catalog(courses){
    const grid=document.getElementById('course-grid'), input=document.getElementById('search');
    const render=()=>{const q=input.value.toLocaleLowerCase('vi');const rows=courses.filter(c=>c.title.toLocaleLowerCase('vi').includes(q));grid.innerHTML=rows.map((c,i)=>`<article class="course-card"><span class="num">KHÓA ${(i+1).toString().padStart(2,'0')}</span><h3>${esc(c.title)}</h3><p>${c.lessonCount} bài · Lesson → Presentation → Exercise → Code → Project</p><a href="course.html?course=${encodeURIComponent(c.id)}">Xem nội dung →</a></article>`).join('')||'<p>Không tìm thấy khóa học phù hợp.</p>'};
    input.addEventListener('input',render);render();
  }
  function reader(courses){
    const course=courses.find(c=>c.id===params.get('course'))||courses[0];
    if(!course)return;
    document.getElementById('course-title').textContent=course.title;document.title=course.title+' — Graphics & HCI';
    const requested=params.get('doc'), selected=course.documents.find(d=>d.path===requested)||course.documents[0];
    document.getElementById('file-name').textContent=selected.path;
    document.getElementById('doc-code').textContent='DOC://'+selected.path.split('/').pop().toUpperCase();
    document.getElementById('view-source').href='https://github.com/aerovfx/Graphic_Hci/blob/main/education-portal/'+selected.path;
    const list=document.getElementById('doc-list'), search=document.getElementById('doc-search');
    const render=()=>{const q=search.value.toLocaleLowerCase('vi');let kind='';list.innerHTML=course.documents.filter(d=>d.title.toLocaleLowerCase('vi').includes(q)).map(d=>{const heading=d.kind!==kind?`<span class="doc-kind">${esc(kind=d.kind)}</span>`:'';return heading+`<a class="doc-link ${d.path===selected.path?'active':''}" href="?course=${encodeURIComponent(course.id)}&doc=${encodeURIComponent(d.path)}">${esc(d.title)}</a>`}).join('')};
    search.addEventListener('input',render);render();renderResources(course,selected);loadDocument(selected);
  }
  function renderResources(course,selected){
    const nav=document.getElementById('resource-nav');if(!nav)return;
    const kinds=['1. Lesson','2. Presentation','3. Exercise','4. Code','5. Project'];
    const labels=['Lesson','Presentation','Exercise','Code','Project'];
    const week=(selected.path.match(/week\d+/)||[])[0];
    nav.innerHTML=kinds.map((kind,index)=>{const docs=course.documents.filter(d=>d.kind===kind);const target=docs.find(d=>week&&d.path.includes(week))||docs[0];if(!target)return'';return `<a class="${selected.kind===kind?'active':''}" href="?course=${encodeURIComponent(course.id)}&doc=${encodeURIComponent(target.path)}"><b>0${index+1}</b><span>${labels[index]}</span><i>↗</i></a>`}).join('');
  }
  function loadDocument(doc){fetch(base+doc.path).then(r=>{if(!r.ok)throw Error('Không tải được tài liệu');return r.text()}).then(text=>{document.getElementById('markdown').innerHTML=doc.format==='md'?markdown(text,doc.path):codeDocument(text,doc);enhanceReader()}).catch(e=>document.getElementById('markdown').innerHTML=`<p>${esc(e.message)}</p>`)}
  function enhanceReader(){
    const content=document.getElementById('markdown'),toc=document.getElementById('toc');if(!content||!toc)return;
    toc.querySelectorAll('a').forEach(a=>a.remove());
    const slug=(s,i)=>s.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')||`section-${i+1}`;
    const headings=[...content.querySelectorAll('h2,h3')];
    headings.forEach((h,i)=>{h.id=h.id||slug(h.textContent,i);const a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;if(h.tagName==='H3')a.className='subheading';toc.appendChild(a)});
    const children=[...content.children],first=children.findIndex(n=>n.tagName==='H2');
    if(first>0){const hero=document.createElement('header');hero.className='doc-hero';content.insertBefore(hero,children[0]);children.slice(0,first).forEach(n=>hero.appendChild(n))}
    [...content.children].forEach(node=>{if(node.tagName!=='H2')return;const section=document.createElement('section');section.className='doc-section';content.insertBefore(section,node);let current=node;while(current&&!(current!==node&&current.tagName==='H2')){const next=current.nextElementSibling;section.appendChild(current);current=next}});
    const copy=document.getElementById('copy-link');if(copy)copy.onclick=async()=>{await navigator.clipboard.writeText(location.href);const old=copy.innerHTML;copy.innerHTML='COPIED <span>✓</span>';setTimeout(()=>copy.innerHTML=old,1400)};
  }
  addEventListener('scroll',()=>{const bar=document.getElementById('reading-progress');if(!bar)return;const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=`${max?scrollY/max*100:0}%`},{passive:true});
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduceMotion){
    const reveal=()=>document.querySelectorAll('.hero-copy,.hero-console,.hero-rail,.tools-heading,.tool-grid>a,.section-head,.course-card,.doc-hero,.doc-section').forEach(el=>el.classList.add('motion-reveal'));
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -5%'});
    const observe=()=>{reveal();document.querySelectorAll('.motion-reveal:not(.motion-ready)').forEach((el,index)=>{el.classList.add('motion-ready');el.style.setProperty('--reveal-delay',`${Math.min(index%4,3)*70}ms`);observer.observe(el)})};
    observe();
    new MutationObserver(observe).observe(document.body,{childList:true,subtree:true});
    addEventListener('pointermove',event=>{document.documentElement.style.setProperty('--pointer-x',`${event.clientX}px`);document.documentElement.style.setProperty('--pointer-y',`${event.clientY}px`)},{passive:true});
  }
  function codeDocument(source,doc){return `<h1>${esc(doc.title)}</h1><p><strong>4. Code</strong> · ${esc((doc.format||'text').toUpperCase())}</p><pre><code class="language-${esc(doc.format||'text')}">${esc(source)}</code></pre>`}
  function markdown(md,path){
    const dir=path.slice(0,path.lastIndexOf('/')+1);let code=[];
    md=md.replace(/```([\w+-]*)\n([\s\S]*?)```/g,(_,lang,src)=>`@@CODE${code.push(`<pre><code class="language-${esc(lang)}">${esc(src)}</code></pre>`)-1}@@`);
    const lines=md.split('\n'),out=[];let list=false,table=false;
    const inline=s=>esc(s).replace(/!\[([^\]]*)\]\(([^)]+)\)/g,(_,a,u)=>`<img alt="${a}" src="${/^(https?:|\/)/.test(u)?u:dir+u}">`).replace(/\[([^\]]+)\]\(([^)]+)\)/g,(_,a,u)=>`<a href="${u.endsWith('.md')?'course.html?course='+encodeURIComponent(params.get('course'))+'&doc='+encodeURIComponent(dir+u):u}">${a}</a>`).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
    for(let i=0;i<lines.length;i++){let l=lines[i];if(/^@@CODE\d+@@$/.test(l)){if(list){out.push('</ul>');list=false}out.push(l);continue}if(/^\|.+\|\s*$/.test(l)&&i+1<lines.length&&/^\|?\s*:?-+/.test(lines[i+1])){if(list){out.push('</ul>');list=false}const heads=l.split('|').slice(1,-1);out.push('<table><thead><tr>'+heads.map(x=>`<th>${inline(x.trim())}</th>`).join('')+'</tr></thead><tbody>');table=true;i++;continue}if(table&&/^\|.+\|\s*$/.test(l)){const cells=l.split('|').slice(1,-1);out.push('<tr>'+cells.map(x=>`<td>${inline(x.trim())}</td>`).join('')+'</tr>');continue}if(table){out.push('</tbody></table>');table=false}const h=l.match(/^(#{1,4})\s+(.+)/);if(h){if(list){out.push('</ul>');list=false}out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`)}else if(/^[-*]\s+/.test(l)){if(!list){out.push('<ul>');list=true}out.push(`<li>${inline(l.replace(/^[-*]\s+/,''))}</li>`)}else if(/^>\s?/.test(l)){if(list){out.push('</ul>');list=false}out.push(`<blockquote>${inline(l.replace(/^>\s?/,''))}</blockquote>`)}else if(l.trim()){if(list){out.push('</ul>');list=false}out.push(`<p>${inline(l)}</p>`)}else if(list){out.push('</ul>');list=false}}
    if(list)out.push('</ul>');if(table)out.push('</tbody></table>');return out.join('\n').replace(/@@CODE(\d+)@@/g,(_,n)=>code[+n]);
  }
})();
