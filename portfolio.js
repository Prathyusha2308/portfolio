'use strict';
(async()=>{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const theme=$('.theme');try{if(localStorage.getItem('portfolio-theme')==='light')document.documentElement.classList.add('light')}catch{}
theme.onclick=()=>{const light=document.documentElement.classList.toggle('light');theme.setAttribute('aria-label',light?'Switch to dark theme':'Switch to light theme');try{localStorage.setItem('portfolio-theme',light?'light':'dark')}catch{}};
const progress=$('.progress');window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%'},{passive:true});
const toast=$('.toast');let timer;function notice(t){toast.textContent=t;toast.hidden=false;clearTimeout(timer);timer=setTimeout(()=>toast.hidden=true,2500)}
const tools=document.createElement('div');tools.className='contacttools';const copy=document.createElement('button');copy.className='copy';copy.textContent='Copy email address';copy.onclick=async()=>{try{await navigator.clipboard.writeText('tprathyusha0559@gmail.com');notice('Email address copied')}catch{notice('Email: tprathyusha0559@gmail.com')}};tools.append(copy);$('#contact > div').append(tools);
let cases;try{const r=await fetch('cases.json');if(!r.ok)throw Error();cases=await r.json()}catch{notice('Case studies could not load. Please refresh.');return}
const dialog=$('.dialog'),panel=$('#casecontent'),tabs=$('.tabs');let current=0,active='Overview',opener,walkTimer;
const names=['Overview','Architecture','Quality & operations','Outcomes','Example logic','Project questions','Explain this project'];
function el(tag,text,cls){const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n}
function box(title,text){const n=el('div',null,'casebox');n.append(el('h3',title),el('p',text));return n}
function listbox(title,items){const n=el('div',null,'casebox');n.append(el('h3',title));const ul=el('ul');items.forEach(t=>ul.append(el('li',t)));n.append(ul);return n}
function render(){clearInterval(walkTimer);const d=cases[current];panel.replaceChildren();$$('.tabs button').forEach(b=>{b.setAttribute('aria-selected',String(b.textContent===active));b.tabIndex=b.textContent===active?0:-1});panel.setAttribute('aria-labelledby','tab-'+names.indexOf(active));
if(active==='Overview'){const grid=el('div',null,'casegrid');grid.append(box('The business challenge',d.problem),box('My contribution',d.role));const img=el('img');img.className='modalart';img.src='assets/'+['healthcare','cards','lending'][current]+'.webp';img.alt='Conceptual illustration for '+d.company+' project';panel.append(img);panel.append(grid,el('p','These are resume-based professional project summaries. The architecture is a conceptual explanation, not a production system diagram. No proprietary records or code are included.','pipelinefooter'))}
if(active==='Architecture'){
const flows=[[['AWS S3','Pharmacy & claims sources'],['Glue / PySpark','Ingest & transform'],['Delta Lake','Bronze / Silver / Gold'],['Snowflake / dbt','Analytics models'],['Reporting','Clinical quality & utilization']],[['Kafka / ADLS','Streaming & batch sources'],['Databricks','Structured Streaming / PySpark'],['Delta Lake','Bronze / Silver / Gold'],['ADF / Synapse','Curated analytics loads'],['Power BI','Rewards & merchant reporting']],[['PostgreSQL','Loan & borrower sources'],['AWS Glue / S3','Extract & stage'],['Python','Validate & reconcile'],['Redshift','Kimball dimensional models'],['Power BI','Portfolio & credit-risk reports']]];
const diagram=el('div',null,'architecture-flow');diagram.setAttribute('role','group');diagram.setAttribute('aria-label',d.company+' conceptual architecture');flows[current].forEach(([title,note])=>{const node=el('div',null,'architecture-node');node.append(el('strong',title),el('span',note));diagram.append(node)});panel.append(diagram,el('p',current===0?'Airflow orchestrates the workflow; Great Expectations, dbt tests, and PHI controls apply across the relevant layers.':current===1?'Kafka streaming and ADLS batch ingestion are complementary inputs. The diagram summarizes the tools and data layers, not a single production job.':'Airflow orchestrates Glue extraction and Redshift loading; Jenkins supports ETL deployments. Reconciliation compares source and warehouse records.','architecture-caption'));
panel.append(el('p','Select a stage to explore its responsibility, data flow, and tools.','casecopy'));const stages=el('div',null,'stagebuttons'),info=el('div',null,'stageinfo');let selectedStage=0;function select(i){selectedStage=i;[...stages.children].forEach((b,j)=>{b.classList.toggle('active',i===j);b.setAttribute('aria-pressed',String(i===j))});const s=d.stages[i];info.replaceChildren(el('span','STAGE '+(i+1)+' / '+s[0].toUpperCase(),'eyebrow'),el('h3',s[1]),el('p',s[2]));const tags=el('div',null,'tags');s[3].forEach(t=>tags.append(el('span',t)));info.append(tags)}d.stages.forEach((s,i)=>{const b=el('button',null,'stagebtn');b.append(el('small','0'+(i+1)),el('span',s[0]));b.onclick=()=>select(i);stages.append(b)});const controls=el('div',null,'pipelinecontrols');const prev=el('button','← Previous');const next=el('button','Next →');const play=el('button','Play walkthrough','primary');const status=el('span','Explore at your own pace');prev.onclick=()=>select((selectedStage+4)%5);next.onclick=()=>select((selectedStage+1)%5);play.onclick=()=>{if(walkTimer){clearInterval(walkTimer);walkTimer=null;play.textContent='Play walkthrough';status.textContent='Paused';return}if(selectedStage===4)select(0);play.textContent='Pause';status.textContent='Guided architecture tour';walkTimer=setInterval(()=>{if(selectedStage===4){clearInterval(walkTimer);walkTimer=null;play.textContent='Play again';status.textContent='Walkthrough complete'}else select(selectedStage+1)},5000)};controls.append(prev,play,next,status);panel.append(stages,controls,info,el('p','Conceptual flow based on the resume. Streaming may complement batch processing rather than follow it sequentially.','pipelinefooter'));select(0)}
if(active==='Quality & operations'){const grid=el('div',null,'casegrid');grid.append(listbox('Data quality & governance',d.quality),listbox('Orchestration & delivery',d.operations));panel.append(grid)}
if(active==='Outcomes'){
if(current===0){const compare=el('div',null,'resultcompare');compare.append(el('h3','Pharmacy refresh SLA compliance'));[['Before',88],['After',99.2]].forEach(([label,value])=>{const row=el('div',null,'barrow'),track=el('div',null,'bartrack'),fill=el('div',null,'barfill');fill.style.width=value+'%';track.append(fill);row.append(el('span',label),track,el('strong',value+'%'));compare.append(row)});compare.append(el('p','88% → 99.2% = an 11.2 percentage-point increase. Reported in the current resume.'));panel.append(compare)}
const grid=el('div',null,'casegrid');grid.append(listbox('Reported results',d.outcomes),listbox('Design choices explained',d.tradeoffs));panel.append(grid,el('p','Numeric outcomes are included only where stated in the resume. Other results are described qualitatively.','pipelinefooter'))}
if(active==='Example logic'){
const examples=[
`# Illustrative pseudocode — not employer source code

raw = read_pharmacy_batch()
standardized = normalize_types_and_drug_codes(raw)
validated = run_schema_and_business_rule_checks(standardized)

if validated.has_failures:
    notify_pipeline_owner(validated.failure_summary)
else:
    write_curated_dataset(validated.records)
    run_dbt_models_and_tests()
    record_refresh_status()`,
`# Illustrative pseudocode — not employer source code

transactions = read_transaction_increment()
cleaned = remove_duplicates_and_apply_business_rules(transactions)
silver = standardize_transaction_fields(cleaned)
gold = aggregate_daily_spend_and_rewards(silver)

write_delta_layers(silver, gold)
load_curated_analytics_tables(gold)
refresh_reporting_datasets()`,
`# Illustrative pseudocode — not employer source code

source = read_loan_and_performance_data()
warehouse = transform_and_load_redshift(source)

checks = compare(
    source_count=source.loan_count,
    target_count=warehouse.loan_count,
    source_balance=source.outstanding_balance,
    target_balance=warehouse.outstanding_balance
)

record_reconciliation_results(checks)
notify_owner_if_mismatched(checks)`];
panel.append(el('p','Example logic that illustrates the workflow. This is explanatory pseudocode, not a runnable implementation or a copy of employer code.','casecopy'),el('pre',examples[current],'codepanel'));
}
if(active==='Project questions'){
const questions=[['What was your role?',d.role],['How did data move through the platform?',d.stages.map(x=>x[0]+': '+x[1]).join(' → ')],['How did you keep the data reliable?',d.quality.join('. ')+'.'],['How did you operate and deliver the pipelines?',d.operations.join('. ')+'.'],['What changed as a result?',d.outcomes.join('. ')+'.']];questions.forEach(([q,a])=>{const item=el('details',null,'interviewq');item.append(el('summary',q),el('p',a));panel.append(item)});
}
if(active==='Explain this project'){panel.append(el('p','A first-person walkthrough you can use to explain the work.','eyebrow'));const reading=el('div',null,'reading');d.explain.forEach(t=>reading.append(el('p',t)));panel.append(reading);const b=el('button','Copy walkthrough','btn secondary');b.onclick=async()=>{try{await navigator.clipboard.writeText(d.explain.join('\n\n'));notice('Project walkthrough copied')}catch{notice('Select and copy the walkthrough text.')}};panel.append(b)}
}
names.forEach((name,i)=>{const b=el('button',name);b.id='tab-'+i;b.setAttribute('role','tab');b.setAttribute('aria-controls','casecontent');b.onclick=()=>{active=name;render()};b.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();let k=e.key==='Home'?0:e.key==='End'?names.length-1:(i+(e.key==='ArrowRight'?1:-1)+names.length)%names.length;active=names[k];render();tabs.children[k].focus()}};tabs.append(b)});
const slugs=['bcbs-pharmacy','amex-streaming','bhg-lending'];
function openProject(i,button){current=i;active='Overview';opener=button;$('#casecompany').textContent=cases[i].company;$('#casetitle').textContent=cases[i].title;$('#casesub').textContent=cases[i].subtitle;render();if(!dialog.open)dialog.showModal();document.body.style.overflow='hidden'}
$$('.project').forEach((card,i)=>{card.dataset.category=cases[i].category;const b=el('button','Explore interactive case study ↗','projectopen');card.querySelector('details').replaceWith(b);b.onclick=()=>openProject(i,b)});
$('#share-project').onclick=async()=>{const url=new URL(location.href);url.searchParams.set('project',slugs[current]);url.hash='';try{await navigator.clipboard.writeText(url.href);notice('Project link copied')}catch{notice('Project link: '+url.href)}};
const requested=slugs.indexOf(new URL(location.href).searchParams.get('project'));if(requested>=0)openProject(requested,$$('.projectopen')[requested]);
$('.close').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{clearInterval(walkTimer);document.body.style.overflow='';opener?.focus()});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
$$('.filter').forEach(b=>b.onclick=()=>{$$('.filter').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});$$('.project').forEach(c=>c.hidden=b.dataset.filter!=='all'&&c.dataset.category!==b.dataset.filter)});
})();
